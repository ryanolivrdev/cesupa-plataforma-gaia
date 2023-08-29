import type { InputHTMLAttributes, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

export interface TextInputRootProps {
  children: ReactNode;
  className?: string;
}

function TextInputRoot(props: TextInputRootProps) {
  return (
    <div className={clsx("flex items-center gap-3 h-12 py-4 px-3 rounded bg-gray-100 border border-gray-300 w-full focus-within:ring-2 ring-green-500", {
      [props.className!]: props.className,
    })}>
      {props.children}
    </div>
  )
}

TextInputRoot.displayName = 'TextInput.Root'

export interface TextInputIconProps {
  children: ReactNode;
}

function TextInputIcon(props: TextInputIconProps) {
  return (
    <Slot className="w-6 h-6 text-gray-400">
      {props.children}
    </Slot>
  )
}

TextInputIcon.displayName = 'TextInput.Icon'

export type TextInputInputProps = InputHTMLAttributes<HTMLInputElement>

function TextInputInput(props: TextInputInputProps) {
  return (
    <input
      className="bg-transparent flex-1 text-gray-950 text-base placeholder:text-gray-400 outline-none"
      {...props}
    />
  )
}

TextInputInput.displayName = 'TextInput.Input'

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
}
