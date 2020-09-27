import { AxiosRequestConfig } from "axios";
export interface KeyHoleOptions {
    config: AxiosRequestConfig;
    storage?: StorageType;
    autoSync?: boolean;
    syncTime?: number;
}
export declare type Credentials = {
    email: string;
    password: string;
};
export declare type KeyHoleTokens = {
    token: string;
    refreshTokenId: string;
};
export declare type KeyHoleUserInfo = {
    email: string;
    id: number;
};
export declare type StorageType = "localstorage" | "cookies";
