import { httpService, newCancelToken } from 'src/modules';
import { AuthResponse, InitSignIn, InitSignUp, MyProfile } from './types';

const initLogin = (payload: Readonly<InitSignIn>) =>
  httpService.post<AuthResponse>('/users/login', payload, newCancelToken());

const initRegister = (payload: Readonly<InitSignUp>) =>
  httpService.post('/users', payload, newCancelToken());

const getMyProfile = () =>
  httpService.get<MyProfile>('/users/me', newCancelToken());

export { getMyProfile, initLogin, initRegister };
