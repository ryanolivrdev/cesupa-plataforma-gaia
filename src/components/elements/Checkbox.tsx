import { CheckIcon } from '@heroicons/react/24/outline';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
// import { Check } from 'phosphor-react'

export type CheckboxProps = CheckboxPrimitive.CheckboxProps

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root className="w-6 h-6 p-[2px] bg-gray-100 rounded" {...props}>
      <CheckboxPrimitive.Indicator asChild>
        <CheckIcon className="h-5 w-5 text-green-900" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
