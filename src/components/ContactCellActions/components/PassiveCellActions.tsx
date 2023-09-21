import { observer } from "mobx-react-lite";
import { FC, Key } from "react";
import { Button, FormInstance, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteTwoTone} from '@ant-design/icons';
import { useStore } from "../../../stores/rootStore";
import { Contact } from "../../../services/contact.service";


interface Props {
  record: Contact,
  form: FormInstance
}
const PassiveCellActions: FC<Props> = ({record, form}) => {
  const {contactStore} = useStore();
  const {setEditingKey, deleteContact, editingKey} = contactStore;

  const edit = (record: Partial<Contact> & { id: Key }) => {
    form.setFieldsValue({ name: '', phone: '', email: '', ...record });
    setEditingKey(record.id);
  };

  const deleteRow = (record: Contact) => {
    deleteContact(record.id);
  };

  return (
    <Space size="large">
      <Button 
        disabled={editingKey !== ''} 
        onClick={() => edit(record)} 
        size="small" 
      >
        <EditOutlined style={{fontSize: '16px'}}/>
      </Button>
      
      <Popconfirm
        title="Удалить контакт?" 
        onConfirm={() => deleteRow(record)}
      >
        <Button size="small">
          <DeleteTwoTone
            twoToneColor="red"
            disabled={editingKey !== ''}
            style={{fontSize: '16px'}}
           /> 
        </Button>
      </Popconfirm>
    </Space>
  )
}
export default observer(PassiveCellActions)