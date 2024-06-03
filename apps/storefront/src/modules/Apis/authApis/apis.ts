import { httpService, newCancelToken } from 'src/modules';
import { AuthResponse, InitSignIn, InitSignUp } from './types';

const initLogin = (payload: Readonly<InitSignIn>) =>
  httpService.post<AuthResponse>('/users/login', payload, newCancelToken());

const initRegister = (payload: Readonly<InitSignUp>) =>
  httpService.post('/users', payload, newCancelToken());

export { initLogin, initRegister };
