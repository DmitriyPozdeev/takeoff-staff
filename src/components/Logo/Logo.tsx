import { FC } from "react";
import { ContactsOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";

const Logo: FC = () => {
  return (
    <Link to="/contacts">
      <ContactsOutlined 
        rev={undefined} 
        style={{fontSize: '32x'}}
      />
    </Link>
  );
}
export {Logo}
