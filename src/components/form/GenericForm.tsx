import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { FormEventHandler, HTMLInputTypeAttribute } from "react";

export type IInput<T> = {
  key: keyof T;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  render?: React.ReactNode;
};

type GenericFormProps<T> = {
  data?: T;
  inputs?: IInput<T>[];
  onSubmit: FormEventHandler | undefined;
};

export function GenericForm<T>({
  data,
  inputs,
  onSubmit,
}: GenericFormProps<T>) {
  return (
    <div className="rounded-xl bg-white dark:border-white/[0.05] dark:bg-white/[0.03] max-w-full overflow-x-auto">
      <form  onSubmit={onSubmit} className="flex flex-col gap-5 mt-10">
        {inputs?.map((input) => {
          if (input.render) {
            return input.render;
          }

          return (
            <div>
              <Label htmlFor={String(input.key)}>{input.label}</Label>
              <Input
                type={input.type ?? "text"}
                name={String(input.key)}
                defaultValue={String(data?.[input.key] ?? '')}
                placeholder={input.placeholder ?? 'Input the value here'}
                required
              />
            </div>
          );
        })}
      </form>
    </div>
  );
}
