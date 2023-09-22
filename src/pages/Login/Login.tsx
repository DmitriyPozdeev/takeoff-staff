import { FC, useEffect } from "react";
import { Alert, Button, Form, Input, Space, Spin } from 'antd';
import styles from './login.module.css'
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/rootStore";
import { useNavigate } from "react-router-dom";

interface LoginValues {
  email: string,
  password: string
}
interface ErrorInfo {
  errorFields: {errors: string[], name: string[], warnings: string[]}[],
  values: {email: string, password: string},
  outOfDate: boolean
}
const {Item} = Form;

const Login: FC = () => {
  const {userStore} = useStore();
  const {login, state, checkState, isLogin, errorMessage, setErrorMessage} = userStore;

  const navigate = useNavigate()

  useEffect(() => {
    if(isLogin) {
      navigate( '/contacts', {replace: true});
    }
  },[])
  
  const onFinishFailed = (errorInfo: ErrorInfo) => {
    setErrorMessage(errorInfo.errorFields[0].errors.join(' '));
    form.resetFields();
  };


  const [form] = Form.useForm()

  const onFinish = (values: LoginValues) => {
    const { email, password } = values;
    login(email, password)
    navigate( '/contacts', {replace: true})
    form.resetFields();
  };

  return (
    <Space align="center" className={styles.wrapper}>
      <Spin 
        spinning={state === 'pending'}
      >
        {
          (state === 'error' || checkState === 'error') && 
            <Alert
              message={errorMessage}
              type='error'
              banner
              className={styles.alertError}
            />
        }
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed as any}
          autoComplete="off"
          className={styles.form}
        >
          <Item
            label="Email"
            name="email"
            rules={[
              { required: true, 
                message: 'Пожалуйста введите email пользователя!',
              },
              {
                type: 'email',
                message: 'Введен некорректный E-mail!',
              },
            ]}
          >
            <Input />
          </Item>
      
          <Item
            label="Пароль"
            name="password"
            rules={[
              { 
                required: true, 
                message: 'Пожалуйста введите пароль!' 
              }
            ]}
          >
            <Input.Password autoComplete="on"/>
          </Item>
      
          <Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Item>
        </Form>
      </Spin>
    </Space>
   
  );
}

export default observer(Login)