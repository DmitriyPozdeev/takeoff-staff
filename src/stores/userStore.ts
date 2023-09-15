import {makeAutoObservable, runInAction} from "mobx";
import { User, UserResponse } from "../services/user.service";
import userDataService from '../services/user.service';

class UserStore {
  userData: UserResponse = null;
  user: User = undefined;
  state = 'done'
  checkState = 'done'
  accessToken = ''

  constructor () {
    makeAutoObservable(this)
  }

  login = async (name: string, password: string) => {
    this.state = 'pending';
    try {
      const response = await userDataService.login(name, password);
      runInAction(() => {
        this.userData = response;
        localStorage.setItem(
          'accessToken', this.userData ? this.userData.accessToken : ''
        )
        this.user = response?.user
        this.state = "done";
      })
    } catch(err) {
      runInAction(() => {
        this.state = "error";
      })
    }
  }
  check = async () => {
    this.checkState = 'pending';
    try {
      const response = await userDataService.check();
      runInAction(() => {
        this.checkState = "done";
        this.user = response;
      })
      return this.user
    } catch(err) {
      runInAction(() => {
        this.userData = null;
        this.checkState = "error";
      })
    }
  }

  logout= () => {
    this.user = undefined;
    localStorage.removeItem('accessToken')
  }

  get isLogin() {
    return this.user ? true : false;
}
  
}

export default UserStore;