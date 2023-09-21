import { FC } from "react";
import { ContactsOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import styles from './logo.module.css';

const Logo: FC = () => {
  return (
    <Link to="/contacts">
      <ContactsOutlined 
        className={styles.logoIcon}
        rev={undefined} 
      />
    </Link>
  );
}
export default Logo;
