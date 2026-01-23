import type { SVGProps } from "react";

const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <line
        x1="2"
        y1="10.375"
        x2="19"
        y2="10.375"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <line
        x1="10.625"
        y1="2"
        x2="10.625"
        y2="19"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PlusIcon;
