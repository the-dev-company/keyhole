import { Http } from "./http";

export type KeyHoleOptions = {
  apiBaseUrl: string;
  autoSync?: boolean;
  syncTime?: number;
};

export type Credentials = {
  email: string;
  password: string;
};

export type KeyHoleTokens = {
  token: string;
  refreshToken: string;
};

export type KeyHoleUserInfo = {
  email: string;
  id: number;
};

export class KeyHole {
  private interval: NodeJS.Timeout;
  private options: KeyHoleOptions;
  private tokens: KeyHoleTokens;
  private http: Http;

  public userInfo: KeyHoleUserInfo;

  private constructor() {}

  public static initialize(options: KeyHoleOptions) {
    const keyhole = new KeyHole();
    keyhole.options = options;
    keyhole.http = Http.init({ baseUrl: options.apiBaseUrl });
    if (options.autoSync) keyhole.startSync();
    return keyhole;
  }

  public async login(credentials: Credentials) {
    const res = await this.http.post("/login", {}, credentials);

    this.tokens = {
      token: res.data.token,
      refreshToken: res.data.refreshToken,
    };
    this.userInfo = res.data.user;
  }

  public async logout() {
    const res = await this.http.post(
      "/logout",
      {},
      { token: this.tokens.token }
    );
    this.userInfo = null;
    return res.data;
  }

  public async refreshToken() {
    if (!this.tokens) return;
    const res = await this.http.post("/token/refresh", {}, this.tokens);
    return res.data;
  }

  public async register(credentials: Credentials) {
    const res = await this.http.post("/register", {}, credentials);
    this.tokens = {
      token: res.data.token,
      refreshToken: res.data.refreshToken,
    };
    this.userInfo = res.data.user;
  }

  public stopSync() {
    clearInterval(this.interval);
  }

  public startSync() {
    this.interval = setInterval(() => {
      this.refreshToken();
    }, this.options.syncTime ?? 3300000); // Default to every 55th minute of token refresh
  }
}
