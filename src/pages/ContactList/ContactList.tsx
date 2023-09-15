import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Spin, Table, Typography } from 'antd';
import { useStore } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';

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
              message: `Please Input ${title}!`,
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
  const {contactStore} = useStore();
  const {contacts, state, getContactlist, setContacts, editContact} = contactStore;

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

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
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
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Сохранить
            </Typography.Link>
            <Popconfirm title="Хотите отменить?" onConfirm={cancel}>
              <a>Отмена</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
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

  return (
    <Spin
      spinning={state==='pending'}
    >
      <Form form={form} component={false}>
        <Table
        rowKey="id"
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
            onChange: cancel,
          }}
        />
      </Form>
    </Spin>
  );
};

export default observer(ContactList);