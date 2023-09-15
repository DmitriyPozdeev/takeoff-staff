import style from'./app.module.css';
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Login from './pages/Login/Login';
import {Logo} from './components/Logo/Logo'
import PageRouter from './components/PageRouter/PageRouter';
import { useStore } from './stores/rootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';

function App() {
  const {userStore} = useStore();
  const { check } = userStore;

  useEffect(() => {
    const checkLogin = async () => {
      return await check();
    }
    checkLogin();
  }, [])

  return (
    <Layout className={style.layout}>
      <Header
        className={style.header}
      >
        <Logo/>
        <HeaderMenu/>
      </Header>
        <Layout className={style.content}>
          <Content className={style.content}>
            <PageRouter/>
          </Content>
        </Layout>
      <Footer 
        className={style.footer}
      >
        dmitriyweb@inbox.ru 89823444850 &copy;2023
      </Footer>
    </Layout>
  );
}

export default observer(App);
