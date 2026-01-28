import type { SVGProps } from "react";

const ClockIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.5 6.5C0.5 7.28793 0.655195 8.06815 0.956723 8.7961C1.25825 9.52405 1.70021 10.1855 2.25736 10.7426C2.81451 11.2998 3.47595 11.7417 4.2039 12.0433C4.93185 12.3448 5.71207 12.5 6.5 12.5C7.28793 12.5 8.06815 12.3448 8.7961 12.0433C9.52405 11.7417 10.1855 11.2998 10.7426 10.7426C11.2998 10.1855 11.7417 9.52405 12.0433 8.7961C12.3448 8.06815 12.5 7.28793 12.5 6.5C12.5 4.9087 11.8679 3.38258 10.7426 2.25736C9.61742 1.13214 8.0913 0.5 6.5 0.5C4.9087 0.5 3.38258 1.13214 2.25736 2.25736C1.13214 3.38258 0.5 4.9087 0.5 6.5Z"
        stroke="#7E8286"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.5 3.16602V6.49935L8.5 8.49935"
        stroke="#7E8286"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;
