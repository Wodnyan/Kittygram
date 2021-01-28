const getCookieValue = (cookieName: string) => {
  return (document.cookie as any)
    .split("; ")
    .find((cookie: string) => cookie.startsWith(cookieName))
    .split("=")[1];
};

export default getCookieValue;
