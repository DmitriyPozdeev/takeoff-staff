import {host, authHost} from "../http";
import jwt_decode  from 'jwt-decode';

export type User = {
  id: number,
  firstname: string,
  lastname: string,
  age: string,
  email: string,
} | undefined;

export interface UserResponse {
  user: User,
  accessToken: string;
}
type DecodedToken = {
  email: string,
  exp: number,
  iat: number,
  sub: string
}  | string

class UserDataService {
  async login(email: string, password: string) {
    return (await host.post<UserResponse>("/login", {email, password})).data;
  }
  async check() { 
    const token: string | null = localStorage.getItem('accessToken');
    const decodedToken: DecodedToken = token ? jwt_decode(token) : '';
    const currentUserId = decodedToken.sub;
    return (await authHost.get<User>(`/users/${currentUserId}`)).data;
  }
};
const userDataService = new UserDataService();
export default userDataService;