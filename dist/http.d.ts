export declare type HttpConfig = {
    baseUrl?: string;
};
export interface HttpResponse extends Response {
    data: any;
}
export declare class Http {
    private baseUrl;
    private constructor();
    static init({ baseUrl }: HttpConfig): Http;
    get(endpoint: string, headers?: any): Promise<HttpResponse>;
    post(endpoint: string, headers?: any, body?: any): Promise<HttpResponse>;
    private baseRequest;
}
