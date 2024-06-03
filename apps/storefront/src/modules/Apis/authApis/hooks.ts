import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from 'src/modules';
import { initLogin, initRegister } from './apis';
import { AuthResponse, InitSignIn, InitSignUp } from './types';

export function useInitSignIn(
  options?: UseMutationOptions<
    ApiResponseType<AuthResponse>,
    Error,
    InitSignIn
  >,
) {
  const { data, mutate, error, reset, isPending } = useMutation<
    ApiResponseType<AuthResponse>,
    Error,
    InitSignIn
  >({
    mutationFn: (payload) =>
      responseWrapper<ApiResponseType<AuthResponse>>(initLogin, [payload]),
    ...options,
  });
  return {
    data,
    signIn: mutate,
    isPending,
    error,
    reset,
  };
}

export function useInitSignUp(
  options?: UseMutationOptions<void, Error, InitSignUp>,
) {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    InitSignUp
  >({
    mutationFn: (payload) => responseWrapper<void>(initRegister, [payload]),
    ...options,
  });
  return {
    data,
    signUp: mutate,
    isPending,
    error,
    reset,
  };
}
