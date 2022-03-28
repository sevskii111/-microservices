import axios from "axios";

import { Http } from "./httpService";

let BEARER = "";
let EXP = 0;

export class AuthService {
  static async makeLogin({ username, password }) {
    const params = {
      username,
      password,
    };

    const data = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data,
      url: `/auth/login`,
      withCredentials: true,
    };

    const response = await axios(options);
    if (response.data.success) {
      const accessToken = response.data.data.accessToken;
      _setAuthData({ accessToken, exp: _parseTokenData(accessToken.Expires) });
    }
    return response;
  }

  static async makeLogout() {
    const response = await new Http({ auth: true }).get("auth/logout", {
      withCredentials: true,
    });
    _resetAuthData();
    return response;
  }

  static async refreshTokens() {
    const response = await axios.get(`/auth/refresh`, {
      withCredentials: true,
    });
    const { data } = response;
    if (data.Success) {
      const accessToken = response.data.AccessToken;

      _setAuthData({
        accessToken,
        exp: _parseTokenData(accessToken).Expires,
      });
    } else {
      _resetAuthData();
    }
  }

  static setRefreshToken(status) {
    if (!["", "true"].includes(status)) {
      throw new Error(
        `setRefreshToken: invalid value ${status}; Expect one of ['', 'true']`
      );
    }

    localStorage.setItem("refreshToken", status);
  }

  static isAccessTokenExpired() {
    const accessTokenExpDate = EXP - 10;
    const nowTime = Math.floor(new Date().getTime() / 1000);

    return accessTokenExpDate <= nowTime;
  }

  static getUser() {
    if (BEARER && BEARER !== "Bearer ") {
      return _parseTokenData(BEARER);
    } else {
      return null;
    }
  }

  static getBearer() {
    return BEARER;
  }

  static setBearer(accessToken, exp) {
    BEARER = `Bearer ${accessToken}`;
    EXP = exp;
  }
}

function _parseTokenData(accessToken) {
  let payload = "";
  let tokenData = {};

  try {
    payload = accessToken.split(".")[1];
    tokenData = JSON.parse(atob(payload));
  } catch (error) {
    throw new Error(error);
  }

  return tokenData;
}

function _resetAuthData() {
  AuthService.setRefreshToken("");
  AuthService.setBearer("");
}

function _setAuthData({ accessToken, exp } = {}) {
  AuthService.setRefreshToken("true");
  AuthService.setBearer(accessToken, exp);
}
