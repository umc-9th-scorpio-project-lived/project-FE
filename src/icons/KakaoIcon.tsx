import type { SVGProps } from "react";

const KakaoIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M14 6.5C9.58 6.5 6 9.33 6 12.825C6 15.1 7.52 17.09 9.795 18.205C9.625 18.83 9.19001 20.47 9.10001 20.82C8.99001 21.255 9.26 21.25 9.435 21.135C9.575 21.045 11.625 19.645 12.515 19.045C13.005 19.12 13.505 19.155 14 19.155C18.42 19.155 22 16.325 22 12.83C22 9.335 18.42 6.505 14 6.505"
        fill="currentColor"
      />
    </svg>
  );
};

export default KakaoIcon;
