import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useStore } from "../../stores/rootStore";
import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';

const ContactsSearch: FC = () => {
  const {contactStore} = useStore();
  const {
    searchValue, isEdit, setSearchValue, setTablePage
  } = contactStore;

    return (
      <Input
        allowClear
        size='small'
        disabled={isEdit}
        placeholder='Поиск'
        onChange={(e) => {
          const {value} = e.target;
          setSearchValue(value);
          if(value.trim()){
            setTablePage(1);
          }
        }}
        value={searchValue}
        addonBefore={<SearchOutlined/>} 
      />
    );
}

export default observer(ContactsSearch)
