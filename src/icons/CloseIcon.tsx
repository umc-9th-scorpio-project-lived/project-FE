import type { SVGProps } from "react";

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M3 17L10 10M10 10L17 3M10 10L3 3M10 10L17 17"
        stroke="currentColor"
        strokeWidth={0.909091}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
