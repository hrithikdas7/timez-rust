import useSWRImmutable from "swr/immutable";
import useSWRInfinite from "swr/infinite";
import { getAxiosInstance } from "./getAxiosInstance";


const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetcher = async (url: string) => {
  const api = await getAxiosInstance();
  return api.get(url).then((res) => res.data);
};

export const fetcherPost = async ([url, payload]: [string, any]) => {
  const api = await getAxiosInstance();
  return api.post(url, payload).then((res) => res.data);
};

export const useSwrStatic = (path: string | null, options: any = {}) => {
  
  const url = path ? `${baseUrl}${path}` : null;
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable(
    url,
    fetcher,
    {
      onErrorRetry: (error: any, _key: any, _config: any, revalidate: any, { retryCount }: any) => {
        if (
          error.response?.status === 404 ||
          error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 405
        ) {
          return;
        }
        if (retryCount <= 3) {
          setTimeout(() => revalidate({ retryCount }), 5000);
        }
      },
      onError: (error: any) => {
        if (
          error.response?.status === 403||
          error.response?.status === 401 ) {
          console.log("llll")
          }
      },
      ...options,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    isError: error,
    mutate,
  };
};

export const useSwrData = (path: string | null, options: any = {}, payload?: any) => {
  const url = `${baseUrl}${path}${path?.includes('?') ? '&' : '?'}time_zone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable(
    path ? [url, payload] : null,
    async ([url, args]) => {
      const api = await getAxiosInstance();
      return api.post(url, args).then((res) => res.data);
    },
    {
      onErrorRetry: (error: any, _key: any, _config: any, revalidate: any, { retryCount }: any) => {
        if (
          error.response.status === 404 ||
          error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 405 || 
          error.response.status === 422
        ) {
          return;
        }
        if (retryCount <= 3) {
          setTimeout(() => revalidate({ retryCount }), 5000);
        }
      },
      ...options,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    isError: error,
    mutate,
  };
};

export const useSwrInfiniteData = (getPathKey: (pageIndex: number) => string = () => "", options: any = {}) => {
  const getKey = (pageIndex: number) => {
    return `${baseUrl}${getPathKey(pageIndex)}`;
  };
  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite(getKey, fetcher, {
      onErrorRetry: (error: any, _key: any, _config: any, revalidate: any, { retryCount }: any) => {
        if (
          error.response.status === 404 ||
          error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 405
        ) {
          return;
        }
        if (retryCount <= 3) {
          setTimeout(() => revalidate({ retryCount }), 5000);
        }
      },
      ...options,
    });

  return {
    data,
    isLoading,
    isValidating,
    isError: error,
    size,
    setSize,
    mutate,
  };
};
