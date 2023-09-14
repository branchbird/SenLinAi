import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, ProTable } from '@ant-design/pro-components';
import { Button, notification, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
// import AddUser from './components/AddUser';
import EditForm from '@/pages/Dict/components/EditForm';
import {
  addDictUsingPOST,
  findFathersUsingGET,
  listDictByPageUsingPOST,
  updateDictUsingPOST,
} from '@/services/Mockingbird/dictController';
import { PlusOutlined } from '@ant-design/icons';
import { ProCoreActionType } from '@ant-design/pro-utils/lib/typing';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type FormOptionsType = 'add' | 'upd';

type FormOptions = {
  visible: boolean;
  options?: FormOptionsType;
};

async function handlerStatus(
  id: number | undefined,
  status: string,
  action?: ProCoreActionType | undefined,
) {
  const req: API.DictUpdateRequest = {
    id,
    status,
  };
  const res = await updateDictUsingPOST(req);
  if (res) {
    notification.success({
      message: '提示',
      description: '操作成功',
    });
    action?.reload();
  }
}
export default () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Dict[]>([]);
  // 用户操作， add or update 默认add
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Dict>();
  const [fatherIds, setFatherIds] = useState<{}>();
  const [fatherIdSource, setFatherIdSource] = useState<API.Dict[]>();

  const columns: ProColumns<API.Dict>[] = [
    // 父类从库中获取
    {
      title: '父级',
      tip: '如果不传，当前即为父级',
      dataIndex: 'fid',
      hideInTable: true,
      hideInSearch: true,
      valueEnum: fatherIds,
    },
    {
      title: '字典类型',
      tip: '如：system_user_sex',
      dataIndex: 'dictType',
      copyable: true,
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
      copyable: true,
    },
    {
      title: '字典Label名称',
      dataIndex: 'dictLabel',
      copyable: true,
    },
    {
      title: '字典值',
      dataIndex: 'dictValue',
      copyable: true,
    },
    {
      title: '排序号',
      dataIndex: 'dictSort',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '是否父级',
      dataIndex: 'fid',
      hideInForm: true,
      // hideInSearch: true,
      render: (text, record, _, action) => [record?.fid == 0 ? '是' : '否'],
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        enable: {
          text: '启用',
          status: 'Success',
        },
        disable: {
          text: '禁用',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="upd"
          onClick={() => {
            setOpen(true);
            setIsAdd(false);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        record.status !== 'enable' ? (
          <Popconfirm
            key="enable"
            title="确定要启用?"
            onConfirm={() => {
              handlerStatus(record.id, 'enable', action);
            }}
          >
            <a>启用</a>
          </Popconfirm>
        ) : (
          <Popconfirm
            key="disable"
            title="确定要禁用?"
            onConfirm={() => {
              handlerStatus(record.id, 'disable', action);
            }}
          >
            <a style={{ color: '#d4380d' }}>禁用</a>
          </Popconfirm>
        ),
      ],
    },
  ];

  // 加载父级数据
  const initFathers = async () => {
    const res = await findFathersUsingGET();
    if (res.code === 0) {
      const { data } = res;
      const enumData = {};
      data?.map((e: API.Dict) => {
        enumData[e?.id] = { text: `${e.dictName}【${e.dictType}】` };
      });
      console.log(enumData);
      setFatherIds(enumData);
      setFatherIdSource(data);
    }
  };

  useEffect(() => {
    initFathers();
  }, []);

  const submit = async (values: API.DictAddRequest | API.DictUpdateRequest) => {
    try {
      const res = isAdd
        ? await addDictUsingPOST(values)
        : await updateDictUsingPOST({
            id: currentRow?.id,
            ...values,
          });
      if (res.data) {
        notification.success({
          message: '提示',
          description: '操作成功',
        });
        setOpen(false);
        // 重置表单
        actionRef.current?.reloadAndRest?.();
        initFathers();
      }
    } catch (e) {}
  };

  const cancel = () => {
    setOpen(false);
    // 重置表单
    actionRef.current?.reloadAndRest?.();
  };

  return (
    <>
      <ProTable<API.Dict, API.DictQueryRequest>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params: API.DictQueryRequest, sort, filter) => {
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          const data = await listDictByPageUsingPOST({
            ...params,
          });
          return {
            data: data?.data?.records,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: data?.data?.total,
          };
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {},
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setOpen(true);
              setIsAdd(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />

      <EditForm
        isAdd={isAdd}
        open={open}
        onCancel={cancel}
        onSubmit={submit}
        currentRow={currentRow}
        columns={columns}
        fatherIdSource={fatherIdSource}
      />

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          {/*<Popconfirm
            title="确定要删除?"
            key="batchDel"
            onConfirm={async () => {
              if (!selectedRowsState) return;
              for (const e of selectedRowsState) {
                await deleteUserUsingPOST(e);
              }
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <Button>批量删除</Button>
          </Popconfirm>*/}
        </FooterToolbar>
      )}
    </>
  );
};
