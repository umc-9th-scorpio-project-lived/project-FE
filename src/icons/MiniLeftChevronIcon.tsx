import type { SVGProps } from "react";

const MiniLeftChevronIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M15.0689 17.5499C15.4435 17.9246 15.4435 18.5318 15.0689 18.9065C14.6942 19.2812 14.0869 19.2812 13.7122 18.9065L6.99662 12.1909C6.62196 11.8162 6.62196 11.2089 6.99662 10.8343L13.7122 4.11864C14.0869 3.74398 14.6942 3.74398 15.0689 4.11864C15.4435 4.4933 15.4435 5.1006 15.0689 5.47526L9.03154 11.5126L15.0689 17.5499Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default MiniLeftChevronIcon;
