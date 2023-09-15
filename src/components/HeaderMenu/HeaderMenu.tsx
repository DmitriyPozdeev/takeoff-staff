import React, {FC} from 'react';
import {Menu, Avatar, Popconfirm} from 'antd';
import { observer } from 'mobx-react-lite';
import styles from './headerMenu.module.css';
import { UserOutlined,LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from '../../stores/rootStore';

const { Item } = Menu;

const HeaderMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {userStore} = useStore();
  const {isLogin, user, logout} = userStore;

  return (
    <div className={styles.menuWrapper}>
      <span className={styles.userName}>
        {user?.firstname}
      </span>
      <Menu 
        mode='horizontal' 
        className={styles.menu}
      >   
      <Item
        // onClick={() => isLogin ? ()=>{} : setSelectedKey(['']) }
        className={styles.item}
        style={
          location.pathname === '/login' ? {background: '#1890ff'} : {} 
        }
        key={1} 
      > 
       
        {
          isLogin ?
            <Popconfirm
              placement="bottomRight"
              title="Хотите выйти?"
              onConfirm={() => {
                logout();
                navigate('/login');
              }}
              okText="Да"
              cancelText="Нет"
            >
              <div style={{height:'100%', borderRadius: '6px'}}>
                <Avatar 
                  icon={<UserOutlined style={{ fontSize: '20px' }} rev={undefined} />} 
                  size="small"
                  className={styles.avatar}
                />
                <span className={styles.title}>
                  Выход
                </span>
              </div>
             
            </Popconfirm>
          : 
            <>
              <Avatar 
                icon={<LoginOutlined rev={undefined}/>} 
                size="small"
                className={styles.avatar}
              />
              <span className={styles.title}>
                Вход
              </span>
              <Link to="/login"/>
            </>
        }
      </Item>
    </Menu>
    </div>
   
  ) 
 
}

export default observer(HeaderMenu);