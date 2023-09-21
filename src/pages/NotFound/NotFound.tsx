import { Result } from 'antd';
import {FC} from 'react';

const NotFound: FC = () => {
  return <Result
    status="404"
    title="404"
    subTitle="Данной страницы не существует."
  />
};

export default NotFound;