import { Form, Table } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useStore } from "../../stores/rootStore";
import styles from "./contactsTable.module.css"
import { Props } from "../../pages/ContactList/ContactList";
import contactService, { Contact,  } from "../../services/contact.service";
import ContactCell from "../ContactCell/ContactCell";
import ContactCellActions from "../ContactCellActions/ContactCellActions";
import EditableCell from "../ContactEditableCell/ContactEditableCell";



const ContactsTable: FC<Props> = ({form}) => {
  const {contactStore} = useStore();
  const {
    editingKey,  tablePage, contacts, rowsOnPage, 
    searchValue, isSearch, isEdit, getContactlist, 
    setAlertIsVisible, setEditingKey, setTablePage, 
  } = contactStore;

  useEffect(() => {
    setEditingKey('');
    setAlertIsVisible(false);
    getContactlist();
  },[setEditingKey,setAlertIsVisible,getContactlist])
  
  const isEditing = (record: Contact) => record.id === editingKey;

  type Func = (_: number, record: Contact) => JSX.Element;
  interface ContactColumns {
    title: string,
    dataIndex: string,
    editable?: boolean,
    width: string,
    render: Func
  }
  
  const columns: ContactColumns[] = [
    {
      title: 'Имя',
      dataIndex: 'name',
      editable: true,
      width: '170px',
      render: (_: number, record: Contact) => {
        return <ContactCell text={record.name}/>
      }
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      editable: true,
      width: '170px',
      render: (_: number, record: Contact) => {
        return <ContactCell text={record.phone}/>
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
      width: '175px',
      render: (_: number, record: Contact) => {
        return <ContactCell text={record.email}/>
      }
    },
    {
      title: 'Действие',
      dataIndex: 'operation',
      width: '180px',
      render: (_: number, record: Contact) => {
        const editable = isEditing(record) || record.id === 'temp';
        return <ContactCellActions
          record={record}
          editable={editable}
          form={form}
        />
      },
    },
  ];
  const mergedColumns: ContactColumns[] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Contact) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const {searchContacts} = contactService;
  return (
    <Form 
      form={form} 
      component={false} 
      className={styles.form}
    >
      <Table
        rowKey="id"
        size='small'
        bordered
        columns={mergedColumns}
        className={styles.table}
        components={{
          body: {
            cell: EditableCell,
          }
        }}
        dataSource={
          searchContacts(contacts, searchValue,isSearch)
        }
        pagination={{
          onChange: (page) => {
            setEditingKey('')
            setTablePage(page)
          },
          pageSize: rowsOnPage,
          current: tablePage,
          disabled: isEdit,
          position: ['topLeft']
        }}
       
      />
    </Form>
  );
}
export default observer(ContactsTable)
