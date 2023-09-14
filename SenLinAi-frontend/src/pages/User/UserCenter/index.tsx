import {
  // genApiKeysUsingPOST,
  getLoginUserUsingGET,
  updateMyUserUsingPOST,
} from '@/services/Mockingbird/userController';
// import { ProColumns } from '@ant-design/pro-components';
// import ProDescriptions from '@ant-design/pro-descriptions';
import '@umijs/max';
import { Button, Card, Divider, Form, Input, message, Select} from 'antd';
import { FormInstance } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import {images} from '../../../constants/index';
const onFinish = async (values: any) => {
  const res = await updateMyUserUsingPOST(values);
  if (res && res?.code === 0) {
    message.success('修改成功');
  }
};

// const columns: ProColumns<API.User>[] = [
//   {
//     title: 'AccessKey',
//     dataIndex: 'accessKey',
//     copyable: true,
//   },
//   {
//     title: 'SercetKey',
//     dataIndex: 'sercetKey',
//     copyable: true,
//   },
// ];

const UserCenter: React.FC = () => {
  const [dataSource, setDataSource] = useState<API.LoginUserVO>();
  const formRef = React.useRef<FormInstance>(null);

  const initData = async () => {
    const data = await getLoginUserUsingGET();
    if (data) {
      setDataSource(data?.data);
      formRef.current?.setFieldsValue({ ...data?.data, id: data?.data?.id });
    }
  };

  // const genApikeys = async () => {
  //   const res = await genApiKeysUsingPOST(dataSource);
  //   if (res && res.code === 0) {
  //     message.success('生成成功');
  //     initData();
  //   }
  // };
  const options: [{ value: string; label: string; }] = images.map((image) => ({
    value: image.url,
    label: image.name,
  }));
  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <Card title="个人中心">
        <Form
          name="basic"
          ref={formRef}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Id" name="id" rules={[{ required: true }]} hidden={true}>
            <Input />
          </Form.Item>

          <Form.Item
            label="用户账号"
            name="userAccount"
            rules={[{ required: true, message: '请输入用户账号!' }]}
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="用户密码"
            name="userPassword"
            rules={[{ required: true, message: '请输入用户密码!' }]}
          >
            <Input.Password autoComplete={'new-password'} />
          </Form.Item>

          <Form.Item
            label="用户昵称"
            name="userName"
            rules={[{ required: true, message: '请输入用户昵称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="用户简介" name="userProfile">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="用户头像" name="userAvatar">
            <Select
              showSearch
              placeholder="选择用户头像"
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={options}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      {/*<Card title="API鉴权" extra={<a onClick={genApikeys}>重新生成</a>}>*/}
      {/*  <ProDescriptions column={1} dataSource={dataSource} columns={columns}></ProDescriptions>*/}
      {/*</Card>*/}
    </>
  );
};
export default UserCenter;
