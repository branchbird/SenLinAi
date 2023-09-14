import {listMyChartVOByPageUsingPOST} from '@/services/Mockingbird/chartController';
import { DashboardOutlined, EllipsisOutlined, FrownOutlined } from '@ant-design/icons/lib';
import {useModel} from '@@/exports';
import {Avatar, Result, Tag,} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, {useState} from 'react';
import ProList from '@ant-design/pro-list';

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const [data, setData] = useState<API.Chart>();
  const [total, setTotal] = useState<number>(0);

  const initParams: API.ChartQueryRequest = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const initData = async (params: API.ChartQueryRequest = initParams) => {
    const res = await listMyChartVOByPageUsingPOST(params);
    if (res.code === 0) {
      setData(res?.data?.records);
      setTotal(res?.data?.total);
    }
  };

  return (
      <ProList<API.Chart>
        search={{}}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          total: total,
          defaultCurrent: 1,
          // onShowSizeChange(current: number, size: number) {
          //   setPageNo(1);
          //   setPageSize(size);
          //   console.log(pageNo, pageSize);
          // },
        }}
        // 设置成我们的加载状态
        request={async (params?) => {
          await initData({
            ...params,
          });
        }}
        grid={{gutter: 16, column: 2,}}
        itemLayout={'vertical'}
        rowKey="id"
        headerTitle="历史图表"
        dataSource={data}
        metas={{
          avatar: {
            dataIndex: 'avatar',
            render: (text, record) => <Avatar src={currentUser && currentUser.userAvatar}/>,
          },
          title: {
            dataIndex: 'chartName',
            title: '图表名称',
          },status: {
            dataIndex: 'status',
            title: '状态',
            /*wait,running,succeed,failed*/
            valueEnum: {
              succeed: {
                text: '成功',
                status: 'success',
              },
              running: {
                text: '生成中',
                status: 'processing',
              },
              wait: {
                text: '排队中',
                status: 'default',
              },
              failed: {
                text: '失败',
                status: 'error',
              },
            },
          },
          subTitle: {
            render: (dom, entity) => (
              <>
                <Tag>{entity?.chartType}</Tag>
              </>
            ),
            search: false,
          },
          content: {
            render: (dom, entity,) => {
              return (
                <div style={{ height: '100%', width: '100%' }}>
                 {entity.status === 'succeed' && (
                  <>
                    {entity?.genResult}
                    <div style={{ paddingTop: 5, width: '90%' }}>
                      {entity?.genChart ? (
                        <ReactECharts option={JSON.parse(entity?.genChart ?? '{}')} />
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                )}
                  {entity.status === 'wait' && (
                    <>
                      <Result
                        icon={<EllipsisOutlined />}
                        title="待生成"
                        subTitle={entity.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                      />
                    </>
                  )}
                  {entity.status === 'running' && (
                    <>
                      <Result
                        icon={<DashboardOutlined />}
                        title="图表生成中"
                        subTitle={entity.execMessage}
                      />
                    </>
                  )}
                  {entity.status === 'failed' && (
                    <>
                      <Result
                        icon={<FrownOutlined />}
                        title="图表生成失败"
                        subTitle={entity.execMessage}
                      />
                    </>
                  )}
                </div>
              );
            },
            search: false,
          },
      }}
    />
  );
};
export default MyChartPage;
