import { ComponentProps } from "react";

type ButtonProps = {
  children?: JSX.Element;
} & ComponentProps<"button">;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex justify-center rounded-md border border-transparent px-2 py-1 text-sm font-medium ${
        props.disabled
          ? `bg-slate-50 text-slate-400`
          : `bg-slate-100 text-slate-900 hover:bg-slate-200 cursor-pointer`
      } focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2`}
      {...props}
    >
      {children}
    </button>
  );
}
