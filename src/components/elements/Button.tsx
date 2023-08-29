/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	asChild?: boolean;
}

export function Button({
	children,
	asChild,
	className,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			className={clsx(
				"w-full rounded bg-green-900 py-3 px-4 text-sm font-semibold text-white ring-white transition-colors hover:bg-green-800 hover:text-gray-100 focus:ring-2",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				className
			)}
			{...props}
		>
			{children}
		</Comp>
	);
}
