import { FC, HTMLAttributes } from "react";
import { Contact } from "../../services/contact.service";
import { Form, Input } from "antd";

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: Contact;
  index: number;
  children: React.ReactNode;
}

const EditableCell: FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0}}
          rules={[
            {
              required: true,
              message: `Пожалуйста введите ${title}!`,
            },
          ]}
        >
          <Input/>
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell