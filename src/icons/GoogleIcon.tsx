import type { SVGProps } from "react";

const GoogleGIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M14.19 15.9V12.18H23.55C23.69 12.81 23.8 13.4 23.8 14.23C23.8 19.94 19.97 24 14.2 24C8.68 24 4.2 19.52 4.2 14C4.2 8.48 8.68 4 14.2 4C16.9 4 19.16 4.99 20.89 6.61L18.05 9.37C17.33 8.69 16.07 7.89 14.2 7.89C10.89 7.89 8.19 10.64 8.19 14.01C8.19 17.38 10.89 20.13 14.2 20.13C18.03 20.13 19.44 17.48 19.7 15.91H14.19V15.9Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default GoogleGIcon;
