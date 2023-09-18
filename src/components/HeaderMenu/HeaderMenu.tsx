import {FC} from 'react';
import {Menu, Avatar, Popconfirm} from 'antd';
import { observer } from 'mobx-react-lite';
import styles from './headerMenu.module.css';
import { useStore } from '../../stores/rootStore';
import type { MenuProps } from 'antd';
import { LoginOutlined, UserOutlined} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderMenu: FC = () => {
  const location = useLocation();
  const {userStore} = useStore();
  const {isLogin, user, logout} = userStore;
  const navigate = useNavigate()
  const menuItems: MenuProps['items'] = [
    {
      label: isLogin ? <span style={{color: '#fff'}}>{user?.firstname}</span> : <span style={{color: '#fff'}}>Вход</span>,
      key: 'login',
      className: styles.item,
      icon: isLogin ? 
        <Avatar 
          className={styles.avatar}
          icon={<UserOutlined 
            style={{ fontSize: '16px', color: 'black' }} 
            rev={undefined} 
          />} 
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
          onClick: () => {
            navigate('/contacts')
          }
        },
        {
          label: 'Выход',
          key: 'exit',
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
      className={isLoginPage ? `${styles.menu} ${styles.menuActive}`: styles.menu }
      items={menuItems}
      selectedKeys={isLoginPage ? ['login'] : ['']}
    />   
  ) 
 
}

export default observer(HeaderMenu);