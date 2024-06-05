import { ApisauceInstance, CancelToken } from 'apisauce';

type ApiCall = (..._args: any[]) => Promise<any>;

export async function responseWrapper<T>(
  func: ApiCall,
  [...args]: any[] = [],
): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      if (response.ok) res(response.data);
      if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
        console.error(
          'Connection timeout. Please check your network and try again.',
        );
      }
      rej(response.data);
    } catch (err) {
      rej(err);
    }
  });
}

export async function authResponseWrapper<T>(
  func: ApiCall,
  [...args]: any[] = [],
): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      res(response);
    } catch (err) {
      rej(err);
    }
  });
}

export function newCancelToken(timeout = 30000) {
  const source = CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, timeout);

  return { cancelToken: source.token };
}

export const getResponseData = (data: { data: any }) => data.data;

export interface ApiResponseType<T> {
  data: T;
  code: number;
  success: boolean;
  timestamp: string;
}

export interface PaginationResponseType<T> {
  data: T[];
  payloadSize?: number;
  hasNext?: boolean;
  skippedRecords?: number;
  totalRecords?: number;
  skip?: number;
  take?: number;
}

export interface ApiPaginationResponseType<T> {
  data: PaginationResponseType<T>;
  code?: number;
  success?: boolean;
  timestamp?: string;
  query?: Object;
}

export const configApiInstance = (
  api: ApisauceInstance,
  isPrivateApi: boolean,
) => {
  api.axiosInstance.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    if (isPrivateApi) {
      const token = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;

      // config.headers['X-Customer'] = token;
    }
    return Promise.resolve(config);
  });

  api.axiosInstance.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
      // handle call api error, logout user
      // console.log(error.response.data);
    }
    return Promise.reject(error);
  });
};

export const saveToLocalStorage = (key: string, value: any) => {
  if (!value) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(
    key,
    typeof value === 'object' ? JSON.stringify(value) : value.toString(),
  );
};
