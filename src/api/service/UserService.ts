import { SignUpInfo } from '@/types/api';
import HTTPInterface from './core';

class UserService extends HTTPInterface {
  public constructor() {
    super('user');
  }

  public signUp(data: SignUpInfo): Promise<{ message: string }[]> {
    return this.baseHTTP
      .post('signup', {
        ...data,
      })
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public logOut(): Promise<{ message: string }[]> {
    return this.baseHTTP
      .post('logout')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public isLogin(): Promise<{ isLogin: boolean }> {
    return this.baseHTTP
      .get('islogined')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const userService = new UserService();

export default userService;
