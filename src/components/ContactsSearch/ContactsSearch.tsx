import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useStore } from "../../stores/rootStore";
import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import useDebounce from "../../hooks/useDebounce";


const ContactsSearch: FC = () => {
  const [value, setValue] = useState('')
  const {contactStore} = useStore();
  const {
    isEdit, foundContacts, setSearchValue, setTablePage
  } = contactStore;

  const debouncedVal = useDebounce(value, 500);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setValue(value);
  };
  useEffect(() => {
    setSearchValue(debouncedVal?.trim())
    if(foundContacts.length > 0){
      setTablePage(1);
    }
  }, [debouncedVal]);
    return (
      <Input
        allowClear
        size='small'
        disabled={isEdit}
        placeholder='Поиск'
        onChange={changeHandler}
        value={value}
        addonBefore={<SearchOutlined/>} 
      />
    );
}

export default observer(ContactsSearch)
