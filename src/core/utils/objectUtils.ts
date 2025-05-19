export const getTypedFormData = <T extends Record<string, any>>(formData: FormData): T => {
    const entries = Array.from(formData.entries());
    const data = {} as T;

    for (const [key, value] of entries) {
        if (typeof value === "string") {
            const num = Number(value);
            (data as any)[key] = isNaN(num) ? value : num;
        } else {
            (data as any)[key] = value;
        }
    }

    return data;
}