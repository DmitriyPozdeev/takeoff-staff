import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Popconfirm, Row, Space, Spin, Table, Typography } from 'antd';
import { useStore } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';
import { EditOutlined, DeleteTwoTone, UserAddOutlined} from '@ant-design/icons';
import styles from './contactList.module.css'

interface Item {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  
  
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Пожалуйста введите ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ContactList: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [tablePage, setTablePage] = useState(1)
  const {contactStore} = useStore();
  const {
    contacts, state, getContactlist, setContacts, 
    editContact, deleteContact, addContact
  } = contactStore;

  useEffect(() => {
    if(contacts.length === 0) {
      getContactlist();
    }
  },[])
  
  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({ name: '', phone: '', email: '', ...record });
    setEditingKey(record.id);
  };

  const deleteRow = (record: Item) => {
    const newData = [...contacts];
    const index = newData.findIndex((item) => record.id === item.id);
    deleteContact(record.id);
    newData.splice(index, 1);
    setContacts(newData);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const saveEdit = async (key: string) => {
    try {
      const row = (await form.validateFields()) as Item;
      editContact(key, row.name,row.phone,row.email);
      const newData = [...contacts];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setContacts(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setContacts(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const saveAdd = async () => {
    try {
      const row = (await form.validateFields()) as Item;
      const newContact = await addContact(row.name,row.phone,row.email);
      const index = contacts.findIndex((item) => item.id === 'temp')
      const newData = [...contacts];
      newData[index] = newContact as any
      setContacts(newData as any);
      form.setFieldsValue({ name: '', phone: '', email: '' });
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const cancelAdd = () => {
    const index = contacts.findIndex((item) => item.id === 'temp')
    const newData = [...contacts];
    newData.splice(index,1)
    setContacts(newData)
    setEditingKey('')
  }

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      editable: true,
      width: '180px'
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      editable: true,
      width: '180px'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
      width: '180px'
    },
    {
      title: 'Действие',
      dataIndex: 'operation',
      width: '180px',
      render: (_: any, record: Item) => {
        const editable = isEditing(record) || record.id === 'temp';

        return editable ? (
          <span>
            <Typography.Link onClick={() => record.id !== 'temp' ? saveEdit(record.id) : saveAdd()} style={{ marginRight: 8 }}>
              Сохранить
            </Typography.Link>
            <Popconfirm 
              title="Хотите отменить?" 
              onConfirm={record.id === 'temp' ? cancelAdd : cancel}
            >
              <a>Отмена</a>
            </Popconfirm>
          </span>
        ) : (
          <Space
            size="large"
          >
            <EditOutlined
              disabled={editingKey !== ''} 
              onClick={() => edit(record)}
              style={{fontSize: '16px'}}
            />
            <Popconfirm
              title="Хотите удалить контакт?" 
              onConfirm={() => deleteRow(record)}
            >
              <DeleteTwoTone
              twoToneColor="red"
                disabled={editingKey !== ''}
                style={{fontSize: '16px'}}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const {Search} = Input;
  return (
    <Spin
      spinning={state==='pending'}
      className={styles.content}
    >
      <Row justify="space-around">
        <Col>
          <Search
            size='small'
          />
        </Col>
        <Col>
        <Button
        className={styles.addButton}
        size='small'
        type='primary'
        icon={<UserAddOutlined rev={undefined}/>}
        disabled={editingKey !== ''}
        onClick={() => {
          form.setFieldsValue({ name: '', phone: '', email: '' });
          const newContacts = [
            ...contacts.slice(0, 8 * (tablePage-1)), 
            {id: 'temp', ...form.getFieldsValue()}, 
            ...contacts.slice(8 * (tablePage-1))
          ];
          setContacts(newContacts);
          setEditingKey('temp');
        }}
      >
        Добавить
      </Button>
        </Col>
      
      
      </Row>
    
      <Form form={form} component={false} className={styles.form}>
        <Table
          rowKey="id"
          size='small'
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          
          bordered
          dataSource={contacts}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: (page) => {
              cancel()
              setTablePage(page)
            },
            pageSize: 10,
            current: tablePage
            
          }}
          
        />
      </Form>
    </Spin>
  );
};

export default observer(ContactList);