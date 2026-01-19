import type { SVGProps } from "react";

const InfoIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <g clipPath="url(#clip0)">
        <path
          d="M8.00001 14.6663C11.6819 14.6663 14.6667 11.6816 14.6667 7.99967C14.6667 4.31778 11.6819 1.33301 8.00001 1.33301C4.31811 1.33301 1.33334 4.31778 1.33334 7.99967C1.33334 11.6816 4.31811 14.6663 8.00001 14.6663Z"
          stroke="currentColor"
        />
        <path
          d="M6.66669 5.65535C7.00002 4.99535 7.33335 4.66602 8.00002 4.66602C8.83069 4.66602 9.33335 5.32535 9.33335 5.98468C9.33335 6.64402 9.00002 6.97335 8.00002 7.63335V8.66602M8.00002 10.9993V11.3327"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InfoIcon;
