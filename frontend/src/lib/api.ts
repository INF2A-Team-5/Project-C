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

export const getBaseMutateRequest = (): RequestInit => {
  return {
    method: "POST",
    ...baseRequest,
  };
};