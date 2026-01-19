import type { SVGProps } from "react";

const MiniCloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M3.33331 12.6673L7.99998 8.00065M7.99998 8.00065L12.6666 3.33398M7.99998 8.00065L3.33331 3.33398M7.99998 8.00065L12.6666 12.6673"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MiniCloseIcon;
