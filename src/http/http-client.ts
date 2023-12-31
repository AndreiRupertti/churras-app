const baseHeaders = {
  "Content-Type": "application/json",
};

export const httpClient = {
  post(endpoint: string, body: any, reqConfig: RequestInit = {}) {
    return fetch(endpoint, {
      ...reqConfig,
      headers: { ...baseHeaders, ...reqConfig.headers },
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  get(endpoint: string, reqConfig: RequestInit = {}) {
    return fetch(endpoint, {
      ...reqConfig,
      headers: { ...baseHeaders, ...reqConfig.headers },
      method: "GET",
    });
  },
  put(endpoint: string, body: any, reqConfig: RequestInit = {}) {
    return fetch(endpoint, {
      ...reqConfig,
      headers: { ...baseHeaders, ...reqConfig.headers },
      method: "PUT",
      body: JSON.stringify(body),
    });
  },
  delete(endpoint: string, reqConfig: RequestInit = {}) {
    return fetch(endpoint, {
      ...reqConfig,
      headers: { ...baseHeaders, ...reqConfig.headers },
      method: "DELETE",
    });
  },
};
