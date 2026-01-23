import type { SVGProps } from "react";

const DownChevronIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M5.25 8.625L12 15.375L18.75 8.625"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownChevronIcon;
