import {makeAutoObservable, runInAction} from "mobx";
import { User, UserResponse } from "../services/user.service";
import contactDataService, { Contact } from '../services/contact.service';



class ContactStore {
  contacts: Contact[] = [];
  state = 'done';
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
  editContact = async (id: string, name: string, phone: string, email: string) => {
    this.state = 'pending';
    try {
      const response = await contactDataService.editContact(id, name, phone, email);
      console.log(response)
      runInAction(() => {
        //this.contacts = response;
        this.state = "done";
      })
    } catch(err) {
      runInAction(() => {
        this.state = 'error'
        console.log(err)
      })
    }
  }
  deleteContact = async (id: string) => {
    this.state = 'pending';
    try {
      const response = await contactDataService.deleteContact(id);
      console.log(response)
      runInAction(() => {
        this.state = "done";
      })
    } catch(err) {
      runInAction(() => {
        this.state = 'error'
        console.log(err)
      })
    }
  }
  addContact = async (name: string, phone: string, email: string) => {
    this.state = 'pending';
    try {
      const response = await contactDataService.addContact(name, phone, email);
      runInAction(() => {
        this.state = "done";
      })
      return response
    } catch(err) {
      runInAction(() => {
        this.state = 'error'
        console.log(err)
      })
      
    }
   
  }

  setContacts = (list: Contact[]) => {
    this.contacts = list;
  }
  
}

export default ContactStore;