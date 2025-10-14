import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M17.5 3h-11A4.5 4.5 0 0 0 2 7.5v6A4.5 4.5 0 0 0 6.5 18H7l4 4v-4h6.5A4.5 4.5 0 0 0 22 13.5v-6A4.5 4.5 0 0 0 17.5 3Z" />
    </svg>
  );
}
