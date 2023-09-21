import { Button } from "antd";
import { FC } from "react";
import { UserAddOutlined} from '@ant-design/icons';
import styles from './contactsAddButton.module.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/rootStore";
import { Props } from "../../pages/ContactList/ContactList";



const ContactsAddButton: FC<Props> = ({form}) => {
  const {contactStore} = useStore();
  const {
    contacts, tablePage,isEdit, setEditingKey, 
    setContacts, rowsOnPage
  } = contactStore;
    return (
      <Button
        className={styles.addButton}
        size='small'
        type='primary'
        icon={<UserAddOutlined rev={undefined}/>}
        disabled={isEdit}
        onClick={() => {
          form.setFieldsValue({ name: '', phone: '', email: '' });
          setEditingKey('temp')
          const newContacts = [
            ...contacts.slice(0, rowsOnPage * (tablePage-1)), 
            {id: 'temp', ...form.getFieldsValue()}, 
            ...contacts.slice(rowsOnPage * (tablePage-1))
          ];
          setContacts(newContacts);
        }}
    >
      Добавить
    </Button>
    );
}
export default observer(ContactsAddButton);