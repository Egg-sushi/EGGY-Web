import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

/**
 * APIBase를 상속받는 Class는 super의 인자를 통해 baseURL을 추가한다.
 * 상속받은 Class에서 handleResponse, handleError 인자를 통해서 then - catch 문을 이용하는 형태로 사용한다.
 */
class HTTPInterface {
  readonly baseHTTP: AxiosInstance;

  constructor(url?: string) {
    const baseServerURL =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_SERVER_API
        : 'http://localhost:8080';

    this.baseHTTP = axios.create({
      baseURL: `${baseServerURL}/api/${url ?? ''}`,
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

  protected static _handleResponse<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  protected static _handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      throw new Error(error as any);
    } else {
      // Just a stock error
      throw new Error(error as any);
    }
  }
}

export default HTTPInterface;
