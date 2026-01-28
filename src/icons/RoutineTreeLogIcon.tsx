import type { SVGProps } from "react";

const RoutineTreeLogIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="100"
      height="101"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.4715 5.78798C19.8151 3.38261 21.8751 1.59595 24.3049 1.59595H80.3548C82.7846 1.59595 84.8446 3.38261 85.1882 5.78798L96.697 86.3496C97.1172 89.291 94.8348 91.9226 91.8636 91.9226H12.7961C9.82484 91.9226 7.54245 89.291 7.96265 86.3496L19.4715 5.78798Z"
        fill="#866C0B"
      />
      <g filter="url(#filter0_f_2619_900)">
        <path
          d="M21.5784 16.1151C21.922 13.7098 23.982 11.9231 26.4118 11.9231H72.9427C75.3724 11.9231 77.4325 13.7098 77.7761 16.1151L87.3811 83.3501C87.8013 86.2915 85.5189 88.9231 82.5477 88.9231H16.8068C13.8356 88.9231 11.5532 86.2915 11.9734 83.3501L21.5784 16.1151Z"
          fill="#AE8C12"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_2619_900"
          x="0.000152588"
          y="-9.15527e-05"
          width="99.3542"
          height="100.846"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="5.96159" result="effect1_foregroundBlur_2619_900" />
        </filter>
      </defs>
    </svg>
  );
};

export default RoutineTreeLogIcon;
