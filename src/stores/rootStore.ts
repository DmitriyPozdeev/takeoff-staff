import { createContext, useContext } from "react";
import UserStore from "./userStore";
import ContactStore from "./contactStore";

const rootStore = {
  userStore: new UserStore(),
  contactStore: new ContactStore(),
};

export const StoreContext = createContext(rootStore);

export const useStore = () => {
  return useContext<typeof rootStore>(StoreContext);
};

export default rootStore;