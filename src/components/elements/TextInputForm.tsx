/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ReactNode } from "react";
import { Controller, type Control } from "react-hook-form";
import { normalizeCPF, normalizePhoneNumber, normalizeRg } from "~/utils/masks";
import { Text } from "./Text";
import { TextInput, type TextInputInputProps } from "./TextInput";

interface TextInputFormProps extends TextInputInputProps {
  label: string;
  id: string;
  icon?: ReactNode;
  control: Control<any, any>;
  mask?: "cpf" | "rg" | "phone";
}

export function TextInputForm({
  label,
  id,
  icon,
  placeholder,
  control,
  ...rest
}: TextInputFormProps) {
  return (
    <Controller
      control={control}
      name={id}
      render={({
        field: { onChange, onBlur, value, ref },
        formState,
        fieldState,
      }) => (
        <div className="flex flex-col gap-1">
          <Text size="lg" asChild>
            <label htmlFor={id}>{label}</label>
          </Text>
          <TextInput.Root
            className={
              formState.errors[id] ? "border-red-500" : "border-gray-300"
            }
          >
            {icon && <TextInput.Icon>{icon}</TextInput.Icon>}
            <TextInput.Input
              placeholder={placeholder}
              id={id}
              value={
                value
                  ? rest.mask === "cpf"
                    ? normalizeCPF(value)
                    : rest.mask === "rg"
                    ? normalizeRg(value)
                    : rest.mask === "phone"
                    ? normalizePhoneNumber(value)
                    : value
                  : ""
              }
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              {...rest}
            />
          </TextInput.Root>

          {formState.errors[id] && (
            <Text size="sm" className="text-red-500">
              {/* @ts-expect-error - will exist */}
              {formState.errors[id].message}
            </Text>
          )}
        </div>
      )}
    />
  );
}
