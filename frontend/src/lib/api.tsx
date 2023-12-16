import { useEffect, useState } from "react";
// import { isError } from "util";

export type ApiRequest<T extends Object> = {
  onSuccess?: () => void;
  onError?: () => void;
  throwOnError?: boolean;
} & T;

// export type ApiQueryRequest<T extends Object> = ApiRequest<T> & {};
// export type ApiMutationRequest<T extends Object> = ApiRequest<T> & {};

export const API_BASE_URL = "http://localhost:5119";

const baseRequest: RequestInit = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "bearer " + localStorage.getItem("Token"),
  },
};

export const getBaseQueryRequest = (): RequestInit => {
  return {
    method: "GET",
    ...baseRequest,
  };
};

export const postBaseMutateRequest = (item: string): RequestInit => {
  return {
    method: "POST",
    ...baseRequest,
    body: item,
  };
};

export const putBaseMutateRequest = (item: string): RequestInit => {
  return {
    method: "PUT",
    ...baseRequest,
    body: item,
  };
};

/**
 * Helpers
 */
export function query(urlHandle: string): Promise<Response> {
  return fetch(API_BASE_URL + urlHandle, getBaseQueryRequest());
}

export function useQuery<T>(url: string, options? : { onSuccess?: () => void; onError?: () => void; throwOnError?: boolean; }) {
  const [state, setState] = useState<{
    data: T | null;
    isFetching: boolean;
    isError: boolean;
  }>({
    data: null,
    isFetching: false,
    isError: false,
  });

  const { data, isFetching, isError} = state;

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isFetching: true }));

    query(url)
      .then((data) => data.json())
      .then((data) =>
        setState((prevState) => ({
          ...prevState,
          data: data,
          isFetching: false,
        })),
      ).catch((error) => {
        if (options?.throwOnError) {
          throw error;
        }
        if (options?.onError) {
          options.onError();
        }
        setState((prevState) => ({
          ...prevState,
          isFetching: false,
        }));
      });
  }, []);

  return {
    data,
    isFetching,
    isError,
  };
}
