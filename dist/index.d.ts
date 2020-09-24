import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
export declare type KeyHoleOptions = {
    config: AxiosRequestConfig;
    autoSync?: boolean;
    syncTime?: number;
};
export declare type Credentials = {
    email: string;
    password: string;
};
export declare type KeyHoleTokens = {
    token: string;
    refreshToken: string;
};
export declare type KeyHoleUserInfo = {
    email: string;
    id: number;
};
export declare class KeyHole {
    private interval;
    private options;
    private tokens;
    private http;
    userInfo: KeyHoleUserInfo;
    private constructor();
    static initialize(options: KeyHoleOptions): KeyHole;
    login(credentials: Credentials): Promise<AxiosResponse | AxiosError>;
    logout(): Promise<AxiosResponse | AxiosError>;
    refreshToken(): Promise<AxiosResponse | AxiosError>;
    register(credentials: Credentials): Promise<AxiosResponse | AxiosError>;
    stopSync(): void;
    startSync(): void;
}
