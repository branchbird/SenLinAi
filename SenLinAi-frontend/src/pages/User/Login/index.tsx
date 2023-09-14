import Footer from '@/components/Footer';
import {userLoginUsingPOST, userRegisterUsingPOST} from '@/services/Mockingbird/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, message, Tabs} from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  /*
   * 登陆成功，获取用户登录信息
   * */
  const fetchUserInfo = async () => {
    // @ts-ignore
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const LoginMessage: React.FC<{
    content: string;
  }> = ({ content }) => {
    return (
      <Alert
        style={{marginBottom: 24,}}
        message={content}
        type="error"
        showIcon
      />
    );
  };
  const submitLogin = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPOST(values);
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const submitRegister = async (values: API.UserRegisterRequest) => {
    // 登录
    const msg = await userRegisterUsingPOST({
      ...values,
    });
    if (msg.data) {
      message.success('注册成功');
      setType('account');
    }else {
      message.error('注册失败');
    }
  };
  const { status, type: loginType } = userLoginState;
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div style={{flex: '1', padding: '32px 0'}}>
        <LoginForm
          submitter={{searchConfig: {submitText: type === 'account' ? '登录' : '注册'}}}
          contentStyle={{minWidth: 280, maxWidth: '75vw'}}
          logo={<img alt="logo" src="/logo.svg" />}
          title="森林Ai"
          subTitle={'森林Ai—智能AI平台'}
          initialValues={{autoLogin: true}}
          onFinish={async (values) => {
            if (type === 'account') {
              await submitLogin(values as API.LoginParams);
            } else {
              await submitRegister(values as API.RegisterParams);
            }
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              {
                key: 'register',
                label: '新用户注册',
              },
            ]}
          />
          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户账号和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户账号'}
                rules={[
                  {
                    required: true,
                    message: '用户账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          {type === 'register' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户账号'}
                rules={[
                  {
                    required: true,
                    message: '用户账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          {/*<div style={{marginBottom: 24,}}>*/}
          {/*  <Space split={<Divider type="vertical" />}>*/}
          {/*    <Link to="/user/register">新用户注册</Link>*/}
          {/*    <a*/}
          {/*      style={{float: 'left',}}*/}
          {/*      href={"https://docs.qq.com/doc/DUG93dVNHbVZjZXpo"}*/}
          {/*      target="_blank"*/}
          {/*      rel="noreferrer"*/}
          {/*    >*/}
          {/*      忘记密码*/}
          {/*    </a>*/}
          {/*  </Space>*/}
          {/*</div>*/}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
