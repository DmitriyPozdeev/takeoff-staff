import {makeAutoObservable, runInAction} from "mobx";
import { User, UserResponse } from "../services/user.service";
import userDataService from '../services/user.service';
import errorDataService from "../services/error.service";

class UserStore {
  userData?: UserResponse;
  user?: User;
  state = 'done';
  checkState = 'done';
  accessToken = '';
  errorMessage: string = '';
  
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
        this.user = response?.user;
        this.state = "done";
      })
    } catch(err: any) {
      runInAction(() => {
        this.state = "error";
        this.errorMessage = errorDataService.getErrorMessage(err.message)
        console.log(err);
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
        this.userData = undefined;
        this.checkState = "error";
        this.errorMessage = errorDataService.getErrorMessage(err)
      })
    }
  }
  logout = () => {
    this.user = undefined;
    localStorage.removeItem('accessToken')
  }

  setUser = (user: User) => {
    this.user = user;
  }
  setErrorMessage = (message: string) => {
    runInAction(() => {
      this.errorMessage = message;
    })
    
  }
  setState = (state: string) => {
    this.state = state;
  }

  get isLogin() {
    return this.user ? true : false;
  }
  
}

export default UserStore;