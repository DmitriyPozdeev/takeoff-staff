import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Contact } from "../../services/contact.service";
import { FormInstance } from "antd";
import ActiveCellActions from "./components/ActiveCellActions";
import PassiveCellActions from "./components/PassiveCellActions";

interface Props {
  editable: boolean,
  record: Contact,
  form: FormInstance
}
const ContactCellActions: FC<Props> = ({editable, record, form}) => {
  return editable ? 
    <ActiveCellActions
      form={form}
      record={record}
    /> : 
    <PassiveCellActions
      form={form}
      record={record}
    /> 
}

export default observer(ContactCellActions)