import {makeAutoObservable, runInAction} from "mobx";
import contactDataService, { Contact } from '../services/contact.service';
import errorDataService from "../services/error.service";

class ContactStore {
  contacts: Contact[] = [];
  currentOperation?: string = '';
  searchValue = '';
  state = 'done';
  stateMessage: string = ''
  editingKey = '';
  tablePage = 1;
  rowsOnPage = 10;
  alertIsVisible = false;

  constructor () {
    makeAutoObservable(this)
  }
  
  getContactlist = async() => {
    this.state = 'pending';
    try {
      const response = await contactDataService.getContacts();
      runInAction(() => {
        this.contacts = response;
        this.state = "done";
      })
    } catch(err) {
      runInAction(() => {
        this.state = 'error'
        console.log(err)
      })
    }
  }
  editContact = async (id: string, contact: Contact) => {
    this.state = 'pending';
    this.currentOperation = `Редактирование контакта "${contact.name}" `;

    try {
      const {name, phone, email} = contact
      await contactDataService.editContact(id, name, phone, email);
      runInAction(() => {
        const newContacts = [...this.contacts];
        const index = newContacts.findIndex((item) => id === item.id);
    
        if (index > -1) {
          const editableContact = newContacts[index];
          newContacts.splice(index, 1, {
            ...editableContact,
            ...contact,
          });
          this.contacts = newContacts;
          this.editingKey = '';
        } else {
          newContacts.push(contact);
          this.contacts = newContacts;
          this.editingKey = '';
          
        }
        this.state = 'done';
      })
    } catch(err) {
      runInAction(() => {
        this.state = 'error';
        this.stateMessage = errorDataService.getErrorMessage(err)
        this.editingKey = '';
        console.log(err);
      })
    } finally {
      runInAction(() => {
        this.alertIsVisible = true;
      })
    }
  }
  deleteContact = async (id: string) => {
    const index = this.contacts.findIndex((item) => id === item.id);
    this.currentOperation = `Удаление контакта "${this.contacts[index].name}" `;
    this.state = 'pending';
    try {
      await contactDataService.deleteContact(id);
      const newContacts = [...this.contacts];
      newContacts.splice(index, 1);
      runInAction(() => {
        this.contacts = newContacts;
        this.state = "done";
      })
    } catch(err) {
      runInAction(() => {
        this.state = 'error'
        this.stateMessage = errorDataService.getErrorMessage(err)
        console.log(err)
      })
    } finally {
      runInAction(() => {
        this.alertIsVisible = true;
      })
    }
  }
  addContact = async (contact: Contact) => {
    this.currentOperation = `Добавление контакта "${contact.name}" `;
    this.state = 'pending';
    const {name, phone, email} = contact;
    const newContacts = [...this.contacts];
    const index = this.contacts.findIndex((item) => item.id === 'temp');
    try {
      const newContact = await contactDataService.addContact(name, phone, email);
      newContacts[index] = newContact;
      runInAction(() => {
        this.contacts = newContacts;
        this.state = "done";
      })
    } catch(err) {
      newContacts.splice(index, 1);
      runInAction(() => {
        this.state = 'error';
        this.stateMessage = errorDataService.getErrorMessage(err)
        this.contacts = newContacts;
        console.log(err)
      })
    } finally {
      runInAction(() => {
        this.alertIsVisible = true;
        this.editingKey = '';
      })
    } 
   
  }
  cancelAddContact = () => {
    const index = this.contacts.findIndex((item) => item.id === 'temp')
    const newContacts = [...this.contacts];
    newContacts.splice(index,1)
    runInAction(() => {
      this.contacts = newContacts;
      this.editingKey = '';
    })
  }

  setTablePage = (page: number) => {
    this.tablePage = page;
  }
  setSearchValue = (str: string) => {
    this.searchValue = str;
  }
  setEditingKey = (key: string) => {
    this.editingKey = key;
  }
  setContacts = (list: Contact[]) => {
    this.contacts = list;
  }
  setAlertIsVisible = (bool: boolean) => {
    this.alertIsVisible = bool;
  }
  
  get isSearch() {
    return this.searchValue.trim().length > 0 ? true : false;
  }
  get isEdit() {
    return this.editingKey !== '';
  } 
  get foundContacts(): Contact[]  {
    return this.isSearch ? 
      this.contacts.slice().filter(({id,email,name,phone}) => {
        return email?.toLocaleLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) > -1 ||
        name?.toLocaleLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) > -1 ||
        phone?.toLocaleLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) > -1 ||
        id === 'temp'
      }) : this.contacts
  }
}

export default ContactStore;