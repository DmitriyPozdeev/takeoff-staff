import { Button, Result } from 'antd';
import React, {FC} from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: FC = () => {
  const navigate = useNavigate()
  return <Result
    status="404"
    title="404"
    subTitle="Данной страницы не существует."
    // extra={
    //   <Button 
    //     type="primary"
    //     onClick={() => navigate('/home', {replace: true})}
    //   >
    //     На главную
    //   </Button>
    // }
  />
};

export default NotFound;