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
};
export default new ContactDataService();