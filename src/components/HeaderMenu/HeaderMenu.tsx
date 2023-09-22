import {FC} from 'react';
import {Menu, Avatar} from 'antd';
import { observer } from 'mobx-react-lite';
import styles from './headerMenu.module.css';
import { useStore } from '../../stores/rootStore';
import type { MenuProps } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined, ContactsOutlined} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../router';

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
      key: RouteNames.LOGIN,
      theme: 'dark',
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
            key: RouteNames.CONTACTS,
            icon: <ContactsOutlined/>,
            onClick: () => {
              navigate(RouteNames.CONTACTS)
            }
          },
          {
            label: 'Выход',
            key: 'exit',
            icon: <LogoutOutlined/>,
            className: styles.menuItem,
            onClick: () => {
              navigate(RouteNames.LOGIN)
              logout()
            }
          }
        ] : []
    }
  ]
 
  return (
    <Menu 
      mode='horizontal' 
      className={styles.menu}
      selectedKeys={[location.pathname]}
      items={menuItems}
    />   
  ) 
 
}

export default observer(HeaderMenu);