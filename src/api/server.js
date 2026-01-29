const DEFAULT_TIMEOUT = 10000;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
const ACCESS_TOKEN_COOKIE = "accessToken";

const getCookieValue = (name) => {
  console.log("document.cookie ", document.cookie);
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.split("=").slice(1).join("="));
};

const buildUrl = (path, queryParams = {}) => {
  const base = new URL(path, BACKEND_URL).toString();
  const queryString = new URLSearchParams(queryParams).toString();

  if (!queryString) return base;

  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}${queryString}`;
};

const refreshAccessToken = async () => {
  const url = buildUrl("/auth/refresh");
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("refresh failed");
  }

  return true;
};

const serverFetch = async (path, options = {}) => {
  const {
    method = "GET",
    headers = {},
    body,
    queryParams,
    timeout = DEFAULT_TIMEOUT,
    credentials = "include",
    skipRefresh = false,
  } = options;

  const url = buildUrl(path, queryParams);

  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), timeout);

  const hasContentType = Object.keys(headers).some(
    (key) => key.toLowerCase() === "content-type",
  );
  const isFormData = body instanceof FormData;
  const shouldWrapData =
    body &&
    !isFormData &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    !("data" in body);

  const requestBody = shouldWrapData ? { data: body } : body;
  const requestHeaders = {
    ...(requestBody && !hasContentType && !isFormData
      ? { "Content-Type": "application/json" }
      : {}),
    ...headers,
  };

  const accessToken = getCookieValue(ACCESS_TOKEN_COOKIE);

  if (accessToken) {
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      ...(requestBody && {
        body: isFormData ? requestBody : JSON.stringify(requestBody),
      }),
      credentials,
      signal: controller.signal,
    });

    clearTimeout(timerId);

    /// разбраться с ошибками
    if (!response.ok) {
      if (response.status === 401 && !skipRefresh) {
        await refreshAccessToken();
        return serverFetch(path, { ...options, skipRefresh: true });
      }
      throw Error("!response.ok");
    }

    const { data, statusCode, status, ...rest } = await response.json();

    if (status && status !== "success") throw Error(status !== "success");

    return data;
  } catch (error) {
    clearTimeout(timerId);

    if (error.name === "AbortError" || controller.signal.aborted) {
      throw new Error("Спробуйте пізніше");
    }
    throw new Error("Помилка мережі");
  }
};

export default serverFetch;
