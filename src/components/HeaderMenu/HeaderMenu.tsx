import {FC} from 'react';
import {Menu, Avatar, Popconfirm} from 'antd';
import { observer } from 'mobx-react-lite';
import styles from './headerMenu.module.css';
import { useStore } from '../../stores/rootStore';
import type { MenuProps } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined, ContactsOutlined} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderMenu: FC = () => {
  const location = useLocation();
  const {userStore} = useStore();
  const {isLogin, user, logout} = userStore;
  const navigate = useNavigate()
  const menuItems: MenuProps['items'] = [
    {
      label: isLogin ? 
        <span className={styles.menuTitle}>
          {user?.firstname}
        </span> : 
        <span className={styles.menuTitle}>
          Вход
        </span>,
      key: 'login',
      icon: isLogin ? 
        <Avatar 
          className={styles.avatar}
          icon={
            <UserOutlined 
              style={{ fontSize: '16px'}} 
              rev={undefined} 
            />
          } 
          size="small"
        />
       : 
      <LoginOutlined 
        style={{ fontSize: '16px', color: '#fff' }} 
        rev={undefined}
      />,
        children: isLogin ? [
          {
            label: 'Список контактов',
            key: 'contacts',
            icon: <ContactsOutlined/>,
            onClick: () => {
              navigate('/contacts')
            }
          },
          {
            label: 'Выход',
            key: 'exit',
            icon: <LogoutOutlined/>,
            className: styles.menuItem,
            onClick: () => {
              navigate('/login')
              logout()
            }
          }
        ] : []
    }
  ]
  const isLoginPage = location.pathname === '/' || location.pathname === '/login' ? true : false;
  return (
    <Menu 
      mode='horizontal' 
      className={styles.menu}
      items={menuItems}
      selectedKeys={isLoginPage ? ['login'] : ['']}
    />   
  ) 
 
}

export default observer(HeaderMenu);