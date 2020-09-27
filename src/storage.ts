import { StorageType } from "./types/types";
import Cookie from "js-cookie";

export class Storage {
  private static readonly base64TokenName = btoa("teapot");
  public static hasToken: boolean;

  constructor() {
    Storage.hasToken =
      !!localStorage.getItem(Storage.base64TokenName) ||
      !!Cookie.get(Storage.base64TokenName);
  }

  static setToken(tokens: any, type: StorageType) {
    tokens = btoa(JSON.stringify(tokens));
    if (type === "cookies") Cookie.set(this.base64TokenName, tokens);
    localStorage.setItem(this.base64TokenName, tokens);
  }

  static getToken(type: StorageType) {
    let tokens: any;
    if (type === "cookies") tokens = Cookie.get(this.base64TokenName);
    tokens = localStorage.getItem(this.base64TokenName);

    return JSON.parse(atob(tokens));
  }
}
