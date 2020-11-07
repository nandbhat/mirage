export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return `${window?.location?.protocol}//${window?.location?.host}`;
  }
};
