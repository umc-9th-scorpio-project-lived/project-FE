import type { SVGProps } from "react";

const MiniRightChevronIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M7.95604 5.47526C7.58138 5.1006 7.58138 4.4933 7.95604 4.11864C8.3307 3.74398 8.938 3.74398 9.31266 4.11864L16.0283 10.8343C16.4029 11.2089 16.4029 11.8162 16.0283 12.1909L9.31266 18.9065C8.938 19.2812 8.3307 19.2812 7.95604 18.9065C7.58138 18.5318 7.58138 17.9245 7.95604 17.5499L13.9934 11.5126L7.95604 5.47526Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default MiniRightChevronIcon;
