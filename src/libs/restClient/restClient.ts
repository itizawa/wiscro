import urlJoin from 'url-join';

class RestClient {
  static baseHeaders = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Credentials': true,
  };
  async handler<T>(
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    options?: {
      body?: object;
      queryParams?: object;
      fileDownload?: {
        isFileDownload: boolean;
        fileName?: string;
      };
    },
  ): Promise<T> {
    const url = urlJoin(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080/', path);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const init: RequestInit = {
      method,
      headers,
    };

    if (options?.body) {
      // NOTE: DATE型の値をJSONに変換すると文字列になってしまうため、JSON.stringifyではなくsuperjson.stringifyを使っている
      init.body = options?.body ? JSON.stringify(options.body) : undefined;
    }

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

  async apiGet<T>(url: string, query?: object): Promise<T> {
    return await this.handler(url, 'GET', query);
  }

  async apiPost<T>(url: string, body?: object): Promise<T> {
    return await this.handler(url, 'POST', { body });
  }

  async apiPatch<T>(url: string, body?: object): Promise<T> {
    return await this.handler(url, 'PATCH', { body });
  }

  async apiDelete<T>(url: string, body?: object): Promise<T> {
    return await this.handler(url, 'DELETE', { body });
  }
}

export const restClient = new RestClient();
