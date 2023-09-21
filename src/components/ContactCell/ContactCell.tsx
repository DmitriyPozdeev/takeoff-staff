import { observer } from "mobx-react-lite";
import { FC } from "react";
import Highlighter from "react-highlight-words";
import { useStore } from "../../stores/rootStore";

interface Props {
  text: string
}
const ContactCell: FC<Props> = ({text}) => {
  const {contactStore} = useStore();
  const {searchValue} = contactStore;
  
  return <Highlighter
    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    searchWords={[searchValue]}
    autoEscape
    textToHighlight={text || ''}
  />;
}
export default observer(ContactCell);