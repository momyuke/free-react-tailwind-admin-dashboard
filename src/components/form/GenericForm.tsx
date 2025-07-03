import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { BoxIcon } from "@/icons";
import { FormEventHandler, HTMLInputTypeAttribute } from "react";

export type IInput<T> = {
  key: keyof T;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  render?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type GenericFormProps<T> = {
  data?: T;
  inputs?: IInput<T>[];
  onSubmit: FormEventHandler | undefined;
  wordingButton?: string;
  classNames?: string;
  isOverflow?: boolean;
};

export function GenericForm<T>({
  data,
  inputs,
  onSubmit,
  classNames,
  isOverflow = true,
  wordingButton = "Submit",
}: GenericFormProps<T>) {
  return (
    <div
      className={`rounded-xl max-w-full ${
        isOverflow && "overflow-x-auto"
      }  ${classNames}`}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-10">
        {inputs?.map((input) => {
          const defaultPlaceholder =
            input.type === "number" ? "1234" : "Input the value here";

          if (input.render) {
            return (
              <div>
                <Label htmlFor={String(input.key)}>{input.label}</Label>
                {input.render}
              </div>
            );
          }

          return (
            <div>
              <Label htmlFor={String(input.key)}>{input.label}</Label>
              <Input
                onChange={input.onChange}
                type={input.type ?? "text"}
                name={String(input.key)}
                defaultValue={String(data?.[input.key] ?? "")}
                placeholder={input.placeholder ?? defaultPlaceholder}
                required
              />
            </div>
          );
        })}

        <div className="flex justify-end mt-10">
          <Button
            size="md"
            type="submit"
            startIcon={<BoxIcon className="size-5" />}
          >
            {wordingButton}
          </Button>
        </div>
      </form>
    </div>
  );
}
