import { ComponentProps } from "react";

import cx from "classnames";

type IconType =
  | "bold"
  | "code"
  | "copy"
  | "italic"
  | "link"
  | "underline"
  | "strike"
  | "check"
  | "trash";

type IconButtonProps = {
  active?: boolean;
  icon?: IconType;
} & ComponentProps<"button">;

export function IconButton({
  icon,
  active,
  className,
  ...props
}: IconButtonProps) {
  if (!icon) return null;

  return (
    <button
      {...props}
      className={cx(
        `py-[1px] px-1 rounded-sm ${active ? "text-slate-900" : ""} ${
          props.disabled
            ? `bg-slate-50 text-slate-400`
            : active
            ? `bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900 cursor-pointer`
            : `bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 cursor-pointer`
        }`,
        className
      )}
    >
      {IconLibrary[icon]}
    </button>
  );
}

const IconLibrary: Record<IconType, JSX.Element> = {
  bold: (
    <svg
      viewBox="0 0 100 100"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <title>Bold</title>
      <path d="M62.73 49.109c5.347-1.103 9.76-5.94 9.76-12.985 0-7.553-5.517-14.428-16.295-14.428H29.011a2.604 2.604 0 0 0-2.604 2.604v51.399a2.604 2.604 0 0 0 2.604 2.604h28.118c10.863 0 16.464-6.79 16.464-15.361.001-7.043-4.752-12.9-10.863-13.833zM38.458 32.305h15.107c4.074 0 6.62 2.461 6.62 5.94 0 3.649-2.546 5.941-6.62 5.941H38.458V32.305zm15.615 35.39H38.458v-12.9h15.616c4.668 0 7.214 2.886 7.214 6.45 0 4.074-2.716 6.45-7.215 6.45z"></path>
    </svg>
  ),
  check: (
    <svg
      viewBox="0 0 20 20"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <title>Check</title>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  code: (
    <svg
      viewBox="0 0 16 16"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <title>Inline Code</title>
      <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"></path>
    </svg>
  ),
  copy: (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
    >
      <title>Copy</title>
      <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
    </svg>
  ),
  italic: (
    <svg
      viewBox="0 0 100 100"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <title>Italic</title>
      <path d="M60.571 24.301a2.604 2.604 0 0 0-2.604-2.604h-4.594a2.598 2.598 0 0 0-2.59 2.463l-.014-.001-11.276 50.978-.015.066-.011.048h.006a2.55 2.55 0 0 0-.045.449 2.595 2.595 0 0 0 2.406 2.584v.02h4.792a2.595 2.595 0 0 0 2.577-2.336l.013.001 11.257-50.972-.008-.001a2.58 2.58 0 0 0 .106-.695z"></path>
    </svg>
  ),
  link: (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[18px] h-[18px]"
    >
      <title>Link</title>
      <path d="m17.657 14.828-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9 1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"></path>
    </svg>
  ),
  underline: (
    <svg
      viewBox="0 0 100 100"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <title>Underline</title>
      <path d="M77.5 75.545c-.036 0-.068.009-.103.01v-.01h-55v.01c-1.608.056-2.897 1.368-2.897 2.99s1.288 2.934 2.897 2.99v.01h55v-.01c.035.001.068.01.103.01a3 3 0 0 0 0-6zM50 72.12c15.829 0 23.581-9.057 23.581-22.521V21.383a2.928 2.928 0 0 0-2.929-2.928h-3.864a2.928 2.928 0 0 0-2.929 2.928c0 .04.01.076.012.116v27.856c0 8.649-4.814 14.28-13.871 14.28s-13.871-5.631-13.871-14.28V21.49c.001-.036.011-.071.011-.107a2.928 2.928 0 0 0-2.928-2.928h-3.865a2.929 2.929 0 0 0-2.929 2.928v28.216c0 13.464 7.834 22.521 23.582 22.521z"></path>
    </svg>
  ),
  strike: (
    <svg
      viewBox="0 0 100 100"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <title>Strikethrough</title>
      <path d="M77.5 49.719c-.035 0-.068.009-.103.01v-.01h-55v.01a2.995 2.995 0 0 0-2.897 2.99 2.996 2.996 0 0 0 2.897 2.99v.01h55v-.01c.035.001.068.01.103.01a3 3 0 1 0 0-6zm-6.572 9.75h-7.14v.011c-.035-.002-.069-.011-.105-.011-.863 0-1.562.699-1.562 1.562 0 .126.019.247.047.365h-.018c.092.393.157.802.157 1.249 0 3.819-3.14 7.808-11.288 7.808-7.741 0-13.842-3.592-17.678-7.653a1.555 1.555 0 0 0-1.237-.617 1.56 1.56 0 0 0-1.275.664l-.001-.002-.01.015a.48.48 0 0 0-.019.029l-3.425 5.212.003.001a1.55 1.55 0 0 0-.398 1.033c0 .515.253.969.637 1.253 5.091 5.205 12.61 8.891 22.978 8.891 15.191 0 21.896-8.147 21.896-17.568 0-.172-.011-.335-.018-.501.007-.06.018-.118.018-.179 0-.863-.699-1.562-1.562-1.562zm-39.06-13.792c.269.471.77.792 1.351.792h23.542a.502.502 0 0 0 0-1.004v-.008c-8.471-2.48-17.2-3.403-17.2-8.866 0-4.159 3.734-7.044 9.505-7.044 5.941 0 11.967 2.037 16.465 6.535l.006-.008c.272.231.62.375 1.005.375.491 0 .923-.231 1.21-.584l.002.003.028-.039c.028-.037.056-.074.081-.114l3.409-4.788-.003-.001a1.55 1.55 0 0 0 .398-1.033c0-.473-.215-.892-.547-1.178l.011-.015C65.956 23.606 58.742 20.72 50 20.72c-12.476 0-20.623 7.214-20.623 16.634 0 3.499.939 6.195 2.491 8.323z"></path>
    </svg>
  ),
  trash: (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      stroke="currentColor"
    >
      <title>Trash</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 7-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"
      ></path>
    </svg>
  ),
};
