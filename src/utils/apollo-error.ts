export interface ApolloError {
  message: string;
  field: string;
}

export const isApolloError = (obj: any): boolean => {
  if (obj.hasOwnProperty("errors") && obj["errors"].length > 0) return true;

  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      return isApolloError(obj[key]);
    }
  }

  return false;
};

export const getApolloError = (obj: any): null | ApolloError[] => {
  if (obj.hasOwnProperty("errors") && obj["errors"].length > 0)
    return obj["errors"];

  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      return getApolloError(obj[key]);
    }
  }

  return null;
};
