import type { SVGProps } from "react";

const SendIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.75 8.13419L8.25 0.75L15.75 8.13419M8.25 1.77605V16.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SendIcon;
