import { StorageType } from "./types";
export declare class Storage {
    private static readonly base64TokenName;
    static hasToken: boolean;
    constructor();
    static setToken(tokens: any, type: StorageType): void;
    static getToken(type: StorageType): any;
}
