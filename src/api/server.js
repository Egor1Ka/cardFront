const DEFAULT_TIMEOUT = 10000;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

const buildUrl = (path, queryParams = {}) => {
  const base = new URL(path, BACKEND_URL).toString();
  const queryString = new URLSearchParams(queryParams).toString();

  if (!queryString) return base;

  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}${queryString}`;
};

const serverFetch = async (path, options = {}) => {
  const {
    method = "GET",
    headers = {},
    body,
    queryParams,
    timeout = DEFAULT_TIMEOUT,
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

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      ...(requestBody && {
        body: isFormData ? requestBody : JSON.stringify(requestBody),
      }),
      signal: controller.signal,
    });

    clearTimeout(timerId);

    /// разбраться с ошибками
    if (!response.ok) throw Error("!response.ok");

    const { data, statusCode, status, ...rest } = await response.json();

    console.log("data", data);

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
