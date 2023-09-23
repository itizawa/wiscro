class RestClient {
  static baseHeaders = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Credentials': true,
  };

  async apiGet(url: string, init?: RequestInit | undefined): Promise<Response> {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, { ...RestClient.baseHeaders, ...init });
  }

  async apiPost(url: string, body?: BodyInit | null): Promise<Response> {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, { ...RestClient.baseHeaders, method: 'POST', body });
  }

  async apiPatch(url: string, body?: BodyInit | null): Promise<Response> {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, { ...RestClient.baseHeaders, method: 'PATCH', body });
  }

  async apiDelete(url: string, body?: BodyInit | null): Promise<Response> {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, { ...RestClient.baseHeaders, method: 'DELETE', body });
  }
}

export const restClient = new RestClient();
