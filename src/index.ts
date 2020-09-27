import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import {
  KeyHoleOptions,
  KeyHoleTokens,
  KeyHoleUserInfo,
  Credentials,
} from "./types/types";
import { Storage } from "./storage";

export class KeyHole {
  private interval: NodeJS.Timeout;
  private options: KeyHoleOptions;
  private tokens: KeyHoleTokens;
  private http: AxiosInstance;

  public userInfo: KeyHoleUserInfo;

  private constructor() {
    if (Storage.hasToken) {
      this.tokens = Storage.getToken(this.options.storage);
      this.refreshToken();
    }
  }

  public static initialize(options: KeyHoleOptions) {
    const keyhole = new KeyHole();
    keyhole.options = options;
    keyhole.http = axios.create(options.config);
    if (options.autoSync) keyhole.startSync();
    return keyhole;
  }

  public async login(
    credentials: Credentials
  ): Promise<AxiosResponse | AxiosError> {
    const res = await this.http.post("/login", credentials);

    this.tokens = {
      token: res.data.token,
      refreshTokenId: res.data.refreshTokenId,
    };

    Storage.setToken(this.tokens, this.options.storage);

    this.userInfo = res.data.user;

    return res;
  }

  public async logout(): Promise<AxiosResponse | AxiosError> {
    const res = await this.http.post("/logout", { token: this.tokens.token });
    this.userInfo = null;
    return res;
  }

  public async refreshToken(): Promise<AxiosResponse | AxiosError> {
    if (!this.tokens) throw new Error("Not logged in yet");
    const res = await this.http.post("/token/refresh", this.tokens);
    this.tokens = {
      token: res.data.token,
      refreshTokenId: res.data.refreshTokenId,
    };
    Storage.setToken(this.tokens, this.options.storage);
    return res;
  }

  public async register(
    credentials: Credentials
  ): Promise<AxiosResponse | AxiosError> {
    const res = await this.http.post("/register", credentials);
    this.tokens = {
      token: res.data.token,
      refreshTokenId: res.data.refreshTokenId,
    };
    Storage.setToken(this.tokens, this.options.storage);
    this.userInfo = res.data.user;
    return res;
  }

  public stopSync() {
    clearInterval(this.interval);
  }

  public startSync() {
    this.interval = setInterval(() => {
      this.refreshToken();
    }, this.options.syncTime ?? 290000); // Default to every ~5th minute of token refresh
  }
}
