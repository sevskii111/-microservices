import axios from "axios";

import { AuthService } from "./authService";

export class Http {
  constructor(status) {
    this.isAuth = status && status.auth ? status.auth : false;
    this.instance = axios.create({
      baseURL: "/",
    });

    return this.init();
  }

  init() {
    if (this.isAuth) {
      this.instance.interceptors.request.use(
        (request) => {
          request.headers.authorization = AuthService.getBearer();
          if (
            AuthService.isAccessTokenExpired() &&
            AuthService.hasRefreshToken()
          ) {
            AuthService.refreshTokens().then(() => {
              return request;
            });
          } else {
            return request;
          }
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }

    return this.instance;
  }
}
