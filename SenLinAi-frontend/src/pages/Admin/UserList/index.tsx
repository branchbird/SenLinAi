import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {FooterToolbar, ProTable} from '@ant-design/pro-components';
import {Button, Image, notification, Popconfirm} from 'antd';
import {useRef, useState} from 'react';
import EditForm from '@/pages/Admin/UserList/components/EditForm';
import {images} from '../../../constants/index';
import {
  deleteUserUsingPOST,
  listUserByPageUsingPOST,
  updateUserUsingPOST,
} from '@/services/Mockingbird/userController';
import {PlusOutlined} from '@ant-design/icons';
import {ProCoreActionType} from '@ant-design/pro-utils/lib/typing';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const imagesMap = images.reduce((acc, cur) => {
  acc[cur.url] = cur.name;
  return acc;
}, {});

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type FormOptionsType = 'upd';

type FormOptions = {
  visible: boolean;
  options?: FormOptionsType;
};

async function handleDelete(id: number | undefined, action?: ProCoreActionType | undefined) {
  const res = await deleteUserUsingPOST({id});
  if (res) {
    notification.success({
      message: '提示',
      description: '操作成功',
    });
    action?.reload();
  }
}

export default () => {
  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      copyable: true,
    },
    {
      title: '密码',
      dataIndex: 'userPassword',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '用户姓名',
      dataIndex: 'userName',
      copyable: true,
    },
    {
      title: '用户简介',
      dataIndex: 'userProfile',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '用户头像',
      dataIndex: 'userAvatar',
      hideInSearch: true,
      valueEnum: imagesMap,
      render: (_, record) => <Image width={50} src={record.userAvatar}/>,
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueEnum: {
        user: {
          text: '普通用户',
          status: 'Processing',
        },
        admin: {
          text: '管理员',
          status: 'Success',
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
            if (record.userRole !== 'admin') {
              setOpen(true);
              setCurrentRow(record);
            }
          }}
          disabled={record.userRole === 'admin'}
        >
          修改
        </a>,
        <Popconfirm key="del" title="确定要删除?" disabled={record.userRole === 'admin'} onConfirm={() => {
            handleDelete(record.id, action)
        }}>
          <a disabled={record.userRole === 'admin'}>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  const actionRef = useRef<ActionType>();

  const [selectedRowsState, setSelectedRows] = useState<API.User[]>([]);
  // 用户操作
  const [open, setOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.User>();

  const submit = async (values: API.UserUpdateRequest) => {
    try {
      const res = await updateUserUsingPOST({
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
      }
    } catch (e) {
    }
  };

  const cancel = () => {
    setOpen(false);
    // 重置表单
    actionRef.current?.reloadAndRest?.();
  };

  return (
    <>
      <ProTable<API.User, API.UserQueryRequest>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params: API.UserQueryRequest, sort, filter) => {
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          console.log(sort, filter);
          const data = await listUserByPageUsingPOST({
            ...params,
          });
          return {
            data: data?.data?.records,
            // success 返回 true，
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
          onChange(value) {
          },
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
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
        ]}
      />

      <EditForm
        open={open}
        onCancel={cancel}
        onSubmit={submit}
        currentRow={currentRow}
        columns={columns}
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
          <Popconfirm
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
          </Popconfirm>
        </FooterToolbar>
      )}
    </>
  );
};
