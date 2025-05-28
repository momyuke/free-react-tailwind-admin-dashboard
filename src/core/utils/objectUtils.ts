/* eslint-disable @typescript-eslint/no-explicit-any */
interface GetTypedFormDataOpts {
  /**
   * The keys that included would not verified as a number or not.
   * And would be return as is
   */
  allowAsIsKey?: Array<string>;
}

export const getTypedFormData = <T extends Record<string, any>>(
  formData: FormData,
  props?: GetTypedFormDataOpts
): T => {
  const entries = Array.from(formData.entries());
  const data = {} as T;
  const { allowAsIsKey } = props ?? { allowAsIsKey: [] };

  for (const [key, value] of entries) {
    const isAllow = allowAsIsKey?.includes(key);
    if (typeof value === "string" && !isAllow) {
      const num = Number(value);
      (data as any)[key] = isNaN(num) ? value : num;
    } else {
      (data as any)[key] = value;
    }
  }

  return data;
};

export const convertKeys = (
  obj: any[] | null,
  converter: (str: string) => string
): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeys(item, converter));
  }
  return Object.keys(obj).reduce((acc, key) => {
    return {
      ...acc,
      [converter(key)]: convertKeys(obj[key], converter),
    };
  }, {});
};
