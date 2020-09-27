import { AxiosRequestConfig } from "axios";

export interface KeyHoleOptions {
  config: AxiosRequestConfig;
  storage?: StorageType; // deafults to localstorage
  autoSync?: boolean;
  syncTime?: number;
}

export type Credentials = {
  email: string;
  password: string;
};

export type KeyHoleTokens = {
  token: string;
  refreshTokenId: string;
};

export type KeyHoleUserInfo = {
  email: string;
  id: number;
};

export type StorageType = "localstorage" | "cookies";
