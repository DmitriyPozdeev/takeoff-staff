import React from 'react';
import { Alert, Col, Form,  Row, Spin} from 'antd';
import { useStore } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';
import styles from './contactList.module.css'
import ContactsTable from '../../components/ContactsTable/ContactsTable';
import ContactsAddButton from '../../components/ContactsAddButton/ContactsAddButton';
import { FormInstance } from 'antd/lib';
import ContactsSearch from '../../components/ContactsSearch/ContactsSearch';

export interface Props {
  form: FormInstance
}

const ContactList: React.FC = () => {
  const [form] = Form.useForm();
  const {contactStore} = useStore();
  const {
    state, currentOperation, alertIsVisible, stateMessage,
    setAlertIsVisible
  } = contactStore;

  return (
    <>
      {
        alertIsVisible && state !== 'pending' &&
          <Alert
            onClose={() => setAlertIsVisible(false)}
            message= {
              state === 'error' ? 
                `${currentOperation} не выполнено: ${stateMessage}`: 
                `${currentOperation} выполнено`
            }
            type={ state === 'error' ? 'error' : 'success'}
            banner
            closable
            className={styles.stateOperation}
          />
      }
      <Row justify="start">
        <h1>
          Список контактов
        </h1>
      </Row>
      <Spin
        spinning={state==='pending'}
        className={styles.content}
      >
        <Row justify="center" className={styles.searchRow}>
          <Col span={7}>
            <ContactsSearch/>
          </Col>
        </Row>
        <Row justify="end">
          <ContactsAddButton
            form={form}
          />
        </Row>
        <ContactsTable 
          form={form}
        />
      </Spin>
    </>
  );
};

export default observer(ContactList);