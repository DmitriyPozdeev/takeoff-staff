import {authHost} from "../http";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

class ContactDataService {
  async getContacts() {
    return (await authHost.get<Contact[]>(`/contacts`)).data;
  }
  async editContact(id: string, name: string, phone: string, email: string) {
    return (await authHost.put<Omit<Contact,'id'>>(`/contacts/${id}`, {name, phone,email})).data;
  }
  async deleteContact(id: string) {
    return (await authHost.delete<{}>(`/contacts/${id}`)).data;
  }
  async addContact(name: string, phone: string, email: string) {
    return (await authHost.post<Contact>(`/contacts`, {name, phone,email})).data;
  }

  searchContacts(data: Contact[], searchValue: string, isSearch: boolean): Contact[]  {
    return isSearch ? 
      data.filter(({id,email,name,phone}) => {
        return email?.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1 ||
        name?.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1 ||
        phone?.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1 ||
        id === 'temp'
      }) : data
  }
};
const contactDataService = new ContactDataService()
export default contactDataService; 