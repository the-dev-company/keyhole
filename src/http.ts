export type HttpConfig = {
  baseUrl?: string;
};

export interface HttpResponse extends Response {
  data: any;
}

export class Http {
  private baseUrl: string;

  private constructor() {}

  public static init({ baseUrl }: HttpConfig) {
    const http = new Http();
    http.baseUrl = baseUrl;
    return http;
  }

  public get(endpoint: string, headers?: any) {
    return this.baseRequest("GET", endpoint, headers);
  }
  public post(endpoint: string, headers?: any, body?: any) {
    return this.baseRequest("POST", endpoint, headers, body);
  }

  private baseRequest(
    method: string,
    endpoint: string,
    headers?: any,
    body?: any
  ) {
    return new Promise<HttpResponse>(async (resolve) => {
      headers = { "Content-Type": "application/json", ...headers };
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers,
        body: JSON.stringify(body),
      });
      const response: HttpResponse = {
        ...res,
        data: JSON.stringify(res.body),
      };
      resolve(response);
    });
  }
}
