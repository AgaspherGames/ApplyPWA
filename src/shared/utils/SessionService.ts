export const SessionService = {
  getToken() {
    return JSON.parse(sessionStorage.getItem("TOKEN") || "");
  },
  setToken(token: string) {
    sessionStorage.setItem("TOKEN", JSON.stringify(token));
    sessionStorage.setItem("AUTHLOADED", "true");
  },
  removeToken() {
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("AUTHLOADED");
  },
};
