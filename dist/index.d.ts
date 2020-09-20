export declare type KeyHoleOptions = {
    apiBaseUrl: string;
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
    static initialize(options: KeyHoleOptions): void;
    login(credentials: Credentials): Promise<void>;
    logout(): Promise<any>;
    refreshToken(): Promise<any>;
    register(credentials: Credentials): Promise<void>;
    stopSync(): void;
    startSync(): void;
}
