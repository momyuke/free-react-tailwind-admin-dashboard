export const toTitleCase = (input: string): string => {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const toCamelCase = (str: string) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

export const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const camelToReadable = (camelCaseString: string) => {
  if (!camelCaseString) return "";
  const result = camelCaseString
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z])([A-Z])/g, "$1 $2");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const formatCurrency = (number: number) => {
  const formatter = new Intl.NumberFormat("id-ID");
  return formatter.format(number);
};

export const parseCurrency = (formatted: string) => {
  return parseInt(formatted.replace(/[^\d]/g, ""), 10) || 0;
};
