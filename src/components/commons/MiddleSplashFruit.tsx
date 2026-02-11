// MiddleSplashFruit.tsx
import * as React from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
};

const MiddleSplashFruit = ({ width = 26, height = 27, ...props }: Props) => {
  // ✅ SVG <defs> id 충돌 방지
  const uid = React.useId();

  const id = {
    filter0: `${uid}-filter0_d_4420_7614`,
    filter1: `${uid}-filter1_f_4420_7614`,
    filter2: `${uid}-filter2_f_4420_7614`,
    filter3: `${uid}-filter3_f_4420_7614`,
    filter4: `${uid}-filter4_f_4420_7614`,
    filter5: `${uid}-filter5_f_4420_7614`,
    paint0: `${uid}-paint0_linear_4420_7614`,
    paint1: `${uid}-paint1_linear_4420_7614`,
    paint2: `${uid}-paint2_linear_4420_7614`,
    paint3: `${uid}-paint3_linear_4420_7614`,
    paint4: `${uid}-paint4_linear_4420_7614`,
    paint5: `${uid}-paint5_linear_4420_7614`,
    paint6: `${uid}-paint6_linear_4420_7614`,
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter={`url(#${id.filter0})`}>
        <path
          d="M17.839 22.3024C15.4503 23.6515 7.92207 23.8257 4.46394 17.806C1.00581 11.7864 3.58812 7.95375 8.12723 5.31996C12.6664 2.68618 17.2799 2.38936 20.7183 8.3746C24.1566 14.3599 20.2275 20.9529 17.839 22.3024Z"
          fill="#F5E100"
        />
        <path
          d="M17.8417 22.3024C15.453 23.6515 7.92207 23.8257 4.46394 17.806C1.00581 11.7864 3.58811 7.95375 8.12723 5.31996C12.6664 2.68618 17.2799 2.38936 20.7183 8.3746C24.1566 14.3599 20.2302 20.9529 17.8417 22.3024Z"
          fill={`url(#${id.paint0})`}
          style={{ mixBlendMode: 'soft-light' }}
        />
      </g>

      <path
        d="M8.24503 6.59853C7.14859 5.65537 6.49493 4.28684 6.28406 2.49292"
        stroke={`url(#${id.paint1})`}
        strokeWidth={0.344533}
        strokeLinecap="round"
      />

      <path
        d="M9.61516 2.50408C9.4169 2.46638 7.34979 3.62353 6.96866 4.71837C6.58752 5.81321 7.26335 6.28411 8.23494 6.46884C9.20653 6.65357 10.106 6.48218 10.4871 5.38734C10.8682 4.2925 9.81342 2.54177 9.61516 2.50408Z"
        fill="#90B448"
      />
      <path
        d="M9.61516 2.50408C9.4169 2.46638 7.34979 3.62353 6.96866 4.71837C6.58752 5.81321 7.26335 6.28411 8.23494 6.46884C9.20653 6.65357 10.106 6.48218 10.4871 5.38734C10.8682 4.2925 9.81342 2.54177 9.61516 2.50408Z"
        fill={`url(#${id.paint2})`}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <path
        d="M3.63421 6.02291C3.70088 5.8314 5.73124 4.60979 6.86487 4.82533C7.99851 5.04088 8.06617 5.86492 7.73945 6.80345C7.41273 7.74198 6.81535 8.43958 5.68171 8.22404C4.54808 8.0085 3.56754 6.21442 3.63421 6.02291Z"
        fill="#7FA436"
      />
      <path
        d="M3.63421 6.02291C3.70088 5.8314 5.73124 4.60979 6.86487 4.82533C7.99851 5.04088 8.06617 5.86492 7.73945 6.80345C7.41273 7.74198 6.81535 8.43958 5.68171 8.22404C4.54808 8.0085 3.56754 6.21442 3.63421 6.02291Z"
        fill={`url(#${id.paint3})`}
        fillOpacity={0.1}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <path
        d="M13.3955 4.4182C13.4545 4.59643 12.6668 6.19438 10.8632 6.90374C9.05954 7.61309 7.45014 7.74367 7.16078 6.87025C6.87142 5.99683 8.18632 4.97731 9.98997 4.26795C11.7936 3.55859 13.3364 4.23998 13.3955 4.4182Z"
        fill="#90B448"
      />
      <path
        d="M13.3955 4.4182C13.4545 4.59643 12.6668 6.19438 10.8632 6.90374C9.05954 7.61309 7.45014 7.74367 7.16078 6.87025C6.87142 5.99683 8.18632 4.97731 9.98997 4.26795C11.7936 3.55859 13.3364 4.23998 13.3955 4.4182Z"
        fill={`url(#${id.paint4})`}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <g
        opacity={0.2}
        filter={`url(#${id.filter1})`}
        style={{ mixBlendMode: 'overlay' }}
      >
        <path
          d="M12.1272 4.96785C12.1903 5.1332 11.5059 5.55106 10.5986 5.90117C9.69119 6.25127 8.90442 6.40104 8.84127 6.23568C8.77812 6.07033 9.4625 5.65246 10.3699 5.30236C11.2773 4.95226 12.064 4.80249 12.1272 4.96785Z"
          fill="white"
        />
      </g>

      <path
        d="M3.78514 9.99292C3.90924 10.1334 5.6802 10.2472 7.19318 9.0322C8.70615 7.81723 9.6232 6.48182 9.01508 5.79311C8.40696 5.10439 6.87099 5.73884 5.35801 6.95381C3.84503 8.16878 3.66106 9.85238 3.78514 9.99292Z"
        fill="#90B448"
      />
      <path
        d="M3.78514 9.99292C3.90924 10.1334 5.6802 10.2472 7.19318 9.0322C8.70615 7.81723 9.6232 6.48182 9.01508 5.79311C8.40696 5.10439 6.87099 5.73884 5.35801 6.95381C3.84503 8.16878 3.66106 9.85238 3.78514 9.99292Z"
        fill={`url(#${id.paint5})`}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <g
        opacity={0.18}
        filter={`url(#${id.filter2})`}
        style={{ mixBlendMode: 'overlay' }}
      >
        <path
          d="M4.68291 9.28479C4.79391 9.42248 5.49625 9.03599 6.25164 8.42152C7.00702 7.80706 7.52939 7.19732 7.41839 7.05962C7.30739 6.92193 6.60505 7.30842 5.84967 7.92289C5.09428 8.53735 4.57191 9.1471 4.68291 9.28479Z"
          fill="white"
        />
      </g>

      <path
        d="M9.78329 9.92353C9.59577 10.0323 7.30205 10.1101 6.46632 8.65521C5.63058 7.20031 6.25054 5.90662 7.16953 5.37334C8.08852 4.84006 9.5132 4.94728 10.3489 6.40218C11.1847 7.85707 9.97082 9.81471 9.78329 9.92353Z"
        fill="#90B448"
      />
      <path
        d="M9.78329 9.92353C9.59577 10.0323 7.30205 10.1101 6.46632 8.65521C5.63058 7.20031 6.25054 5.90662 7.16953 5.37334C8.08852 4.84006 9.5132 4.94728 10.3489 6.40218C11.1847 7.85707 9.97082 9.81471 9.78329 9.92353Z"
        fill={`url(#${id.paint6})`}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <g
        opacity={0.2}
        filter={`url(#${id.filter3})`}
        style={{ mixBlendMode: 'overlay' }}
      >
        <path
          d="M9.40636 9.44207C9.2531 9.53098 8.73517 8.91796 8.24955 8.07286C7.76393 7.22776 7.49451 6.47059 7.64778 6.38169C7.80104 6.29278 8.31897 6.90579 8.80459 7.75089C9.29021 8.596 9.55963 9.35316 9.40636 9.44207Z"
          fill="white"
        />
      </g>

      <g opacity={0.5} filter={`url(#${id.filter4})`}>
        <ellipse
          cx={5.40362}
          cy={2.69587}
          rx={5.40362}
          ry={2.69587}
          transform="matrix(0.498349 0.866976 0.865069 -0.501653 10.9478 8.84595)"
          fill="white"
          fillOpacity={0.7}
        />
      </g>

      <g filter={`url(#${id.filter5})`}>
        <ellipse
          cx={1.50101}
          cy={1.4977}
          rx={1.50101}
          ry={1.4977}
          transform="matrix(0.498349 0.866976 0.865069 -0.501653 14.9528 11.9036)"
          fill="white"
          fillOpacity={0.7}
        />
      </g>

      <defs>
        <filter
          id={id.filter0}
          x="1.48783"
          y="2.15214"
          width="21.96"
          height="22.3"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.689067" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.658598 0 0 0 0 0.658598 0 0 0 0 0.658598 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4420_7614"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4420_7614"
            result="shape"
          />
        </filter>

        <filter
          id={id.filter1}
          x="8.26027"
          y="4.32363"
          width="4.44796"
          height="2.55636"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.288505"
            result="effect1_foregroundBlur_4420_7614"
          />
        </filter>

        <filter
          id={id.filter2}
          x="4.09108"
          y="6.45473"
          width="3.91916"
          height="3.43502"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.288505"
            result="effect1_foregroundBlur_4420_7614"
          />
        </filter>

        <filter
          id={id.filter3}
          x="7.02773"
          y="5.79604"
          width="2.99862"
          height="4.23166"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.288505"
            result="effect1_foregroundBlur_4420_7614"
          />
        </filter>

        <filter
          id={id.filter4}
          x="9.72304"
          y="4.61367"
          width="12.4995"
          height="15.1294"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.34368"
            result="effect1_foregroundBlur_4420_7614"
          />
        </filter>

        <filter
          id={id.filter5}
          x="12.8128"
          y="8.26332"
          width="8.36727"
          height="8.38058"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.34368"
            result="effect1_foregroundBlur_4420_7614"
          />
        </filter>

        <linearGradient
          id={id.paint0}
          x1="21.4241"
          y1="9.60321"
          x2="5.12925"
          y2="18.9642"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.5} />
          <stop offset="1" stopOpacity={0.5} />
        </linearGradient>

        <linearGradient
          id={id.paint1}
          x1="6.00871"
          y1="2.65259"
          x2="7.91115"
          y2="5.93324"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#93B550" />
          <stop offset="1" stopColor="#9BC14E" />
        </linearGradient>

        <linearGradient
          id={id.paint2}
          x1="9.96234"
          y1="0.863159"
          x2="8.28018"
          y2="5.41412"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.5} />
          <stop offset="1" stopOpacity={0.5} />
        </linearGradient>

        <linearGradient
          id={id.paint3}
          x1="1.84643"
          y1="5.17846"
          x2="9.70241"
          y2="7.09625"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity={0.5} />
          <stop offset="1" stopColor="white" stopOpacity={0.5} />
        </linearGradient>

        <linearGradient
          id={id.paint4}
          x1="15.7916"
          y1="3.62326"
          x2="9.06349"
          y2="6.05842"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.5} />
          <stop offset="1" stopOpacity={0.5} />
        </linearGradient>

        <linearGradient
          id={id.paint5}
          x1="2.39565"
          y1="11.2648"
          x2="10.1385"
          y2="4.2513"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity={0.5} />
          <stop offset="0.725962" stopColor="#262626" stopOpacity={0.5} />
          <stop offset="1" stopColor="white" stopOpacity={0.5} />
        </linearGradient>

        <linearGradient
          id={id.paint6}
          x1="13.8433"
          y1="10.8638"
          x2="5.70084"
          y2="7.05647"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.5} />
          <stop offset="1" stopOpacity={0.5} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MiddleSplashFruit;
