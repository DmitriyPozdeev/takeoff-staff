import { observer } from "mobx-react-lite";
import { FC } from "react";
import { FormInstance, Popconfirm, Typography } from "antd";
import { Contact } from "../../../services/contact.service";
import { useStore } from "../../../stores/rootStore";

interface Props {
  record: Contact,
  form: FormInstance
}
const ActiveCellActions: FC<Props> = ({record, form}) => {
  const {contactStore} = useStore();
  const {
    setEditingKey,addContact, editContact, 
    cancelAddContact
  } = contactStore;

  const cancel = () => {
    setEditingKey('');
  };
  const saveEdit = async (id: string) => {
    try {
      const row = (await form.validateFields()) as Contact;
      editContact(id, row);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const saveAdd = async () => {
    try {
      const row = (await form.validateFields()) as Contact;
      addContact(row);
      form.setFieldsValue({ name: '', phone: '', email: '' });
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const cancelAdd = () => {
    cancelAddContact()
  }

  return (
    <span>
      <Typography.Link 
        onClick={() => {
          record.id !== 'temp' ? saveEdit(record.id) : saveAdd()
        }} 
        style={{ marginRight: 8 }}
      >
        Сохранить
      </Typography.Link>
      <Popconfirm
        title="Отменить?" 
        onConfirm={record.id === 'temp' ? cancelAdd : cancel}
      >
        <Typography.Link>
          Отмена
        </Typography.Link> 
      </Popconfirm>
    </span>
  )
}
export default observer(ActiveCellActions)