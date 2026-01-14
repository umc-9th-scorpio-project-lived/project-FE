import type { SVGProps } from "react";

const RefreshIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M2.72612 4.94228C3.46724 3.6632 4.64794 2.69705 6.04839 2.22373C7.44884 1.7504 8.97358 1.80215 10.3387 2.36935C11.7038 2.93655 12.8163 3.98054 13.469 5.30693C14.1217 6.63331 14.2701 8.1517 13.8866 9.57936C13.5031 11.007 12.6138 12.2467 11.3843 13.0674C10.1548 13.8882 8.66898 14.2342 7.20338 14.041C5.73779 13.8478 4.39236 13.1286 3.4176 12.0172C2.44285 10.9058 1.90521 9.47808 1.90479 7.9998"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.71431 4.9524H2.66669V1.90479"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RefreshIcon;
