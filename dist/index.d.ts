import { AxiosError, AxiosResponse } from "axios";
import { KeyHoleOptions, KeyHoleUserInfo, Credentials } from "./types/types";
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
