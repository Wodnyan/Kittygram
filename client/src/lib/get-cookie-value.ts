/* eslint-disable @typescript-eslint/no-explicit-any */
const getCookieValue = (cookieName: string): string | undefined => {
  if (!document.cookie) {
    return undefined;
  }
  return (document.cookie as any)
    .split("; ")
    .find((cookie: string) => cookie.startsWith(cookieName))
    .split("=")[1];
};

export default getCookieValue;
