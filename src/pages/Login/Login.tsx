import { FC, useEffect } from "react";
import { Button, Form, Input, Spin } from 'antd';
import styles from './login.module.css'
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/rootStore";
import { useNavigate } from "react-router-dom";

interface LoginValues {
  email: string,
  password: string
}

const {Item} = Form;

const Login: FC = () => {
  const {userStore} = useStore();
  const {login, user, state, isLogin} = userStore;
  const navigate = useNavigate()

  useEffect(() => {
    if(isLogin) {
      navigate( '/contacts', {replace: true});
    }
  },[isLogin])

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  const [form] = Form.useForm()

  const onFinish = (values: LoginValues) => {
    console.log('Success:', values);
    const { email, password } = values;
    login(email, password)
    navigate( '/contacts', {replace: true})
    form.resetFields();
  };

  return (
    <Spin 
      spinning={state === 'pending'}
      className={styles.border}
    >
      <h3
        className={styles.title}
      >
        Вход
      </h3>
      <Form
        name="login"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Item<LoginValues>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Пожалуйста введите имя пользователя!' }]}
        >
          <Input />
        </Item>
    
        <Item<LoginValues>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
        >
          <Input.Password />
        </Item>
    
        <Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Item>
      </Form>
    </Spin>
  );
}

export default observer(Login)