import urlJoin from 'url-join';

class RestClient {
  async handler<T>(path: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE', options?: RequestInit): Promise<T> {
    const url = urlJoin(process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.wiscro.app/', path);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Credentials': 'true',
    };

    const init: RequestInit = {
      ...options,
      method,
      headers,
      credentials: 'include',
    };

    const response = await fetch(url, init).catch((error) => {
      console.error(error);
      throw new Error(error);
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    console.error('response.ok:', response.ok);
    console.error('esponse.status:', response.status);
    console.error('esponse.statusText:', response.statusText);
    throw new Error(response.statusText);
  }

  async apiGet<T>(url: string, option?: RequestInit): Promise<T> {
    return await this.handler(url, 'GET', option);
  }

  async apiPost<T>(url: string, option?: RequestInit): Promise<T> {
    return await this.handler(url, 'POST', option);
  }

  async apiPatch<T>(url: string, option?: RequestInit): Promise<T> {
    return await this.handler(url, 'PATCH', option);
  }

  async apiDelete<T>(url: string, option?: RequestInit): Promise<T> {
    return await this.handler(url, 'DELETE', option);
  }
}

export const restClient = new RestClient();
