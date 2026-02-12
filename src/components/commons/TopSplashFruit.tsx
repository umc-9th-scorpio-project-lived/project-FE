import * as React from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
};

const TopSplashFruit = ({ width = 25, height = 25, ...props }: Props) => {
  const uid = React.useId();

  const id = {
    filter0: `${uid}-filter0_d_4420_7613`,
    filter1: `${uid}-filter1_f_4420_7613`,
    filter2: `${uid}-filter2_f_4420_7613`,
    filter3: `${uid}-filter3_f_4420_7613`,
    filter4: `${uid}-filter4_f_4420_7613`,
    filter5: `${uid}-filter5_f_4420_7613`,
    paint0: `${uid}-paint0_linear_4420_7613`,
    paint1: `${uid}-paint1_linear_4420_7613`,
    paint2: `${uid}-paint2_linear_4420_7613`,
    paint3: `${uid}-paint3_linear_4420_7613`,
    paint4: `${uid}-paint4_linear_4420_7613`,
    paint5: `${uid}-paint5_linear_4420_7613`,
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter={`url(#${id.filter0})`}>
        <path
          d="M14.6086 4.1681C15.6605 4.7477 16.4926 5.45813 16.8901 6.35115C17.0495 6.64775 17.1678 6.96244 17.2375 7.29496C17.2592 7.29354 17.2809 7.29184 17.3027 7.29081L17.3606 7.28932C18.2959 7.24529 19.2715 7.56673 20.2374 8.09894C21.2929 8.68048 22.1263 9.39436 22.5222 10.2916C23.1072 11.3865 23.1402 12.7283 22.1947 14.2912C21.8858 14.8018 21.5175 15.1822 21.1168 15.4631C21.2204 16.2744 21.0005 17.2108 20.3427 18.2982C18.6166 21.1511 15.3096 20.4516 14.1215 19.8144C14.0122 19.7558 13.8946 19.6789 13.7691 19.59C11.9498 21.58 9.05962 20.9841 8.01052 20.4219C6.97512 19.8668 5.15538 17.8505 5.98899 15.4112C5.90669 15.3749 5.83017 15.3393 5.76162 15.3025C4.5994 14.6794 2.27133 12.2179 3.98702 9.38154C5.0921 7.5549 6.42201 6.95253 7.81843 7.08014C7.90119 6.63044 8.07502 6.15914 8.36903 5.67314C9.39066 3.9846 10.6039 3.34161 11.8846 3.3547C12.7731 3.3502 13.6951 3.66478 14.6086 4.1681Z"
          fill="#FFF15B"
        />
      </g>

      <path
        d="M17.3197 6.85856C17.5225 5.53603 18.2984 4.35149 19.6475 3.30493"
        stroke={`url(#${id.paint0})`}
        strokeWidth={0.336689}
        strokeLinecap="round"
      />

      <path
        d="M14.6769 2.82902C14.9114 2.78562 17.3473 4.07464 17.7913 5.30259C18.2353 6.53054 17.4339 7.06314 16.2847 7.27582C15.1355 7.4885 14.0736 7.30072 13.6296 6.07277C13.1857 4.84482 14.4424 2.87242 14.6769 2.82902Z"
        fill="#90B448"
      />
      <path
        d="M14.6769 2.82902C14.9114 2.78562 17.3473 4.07464 17.7913 5.30259C18.2353 6.53054 17.4339 7.06314 16.2847 7.27582C15.1355 7.4885 14.0736 7.30072 13.6296 6.07277C13.1857 4.84482 14.4424 2.87242 14.6769 2.82902Z"
        fill={`url(#${id.paint1})`}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <path
        d="M21.7215 6.7732C21.6439 6.55861 19.2543 5.19833 17.9148 5.44625C16.5753 5.69417 16.4906 6.61939 16.8708 7.671C17.2509 8.72261 17.9521 9.50239 19.2916 9.25447C20.6311 9.00655 21.7991 6.98778 21.7215 6.7732Z"
        fill="#7FA436"
      />
      <path
        d="M21.7215 6.7732C21.6439 6.55861 19.2543 5.19833 17.9148 5.44625C16.5753 5.69417 16.4906 6.61939 16.8708 7.671C17.2509 8.72261 17.9521 9.50239 19.2916 9.25447C20.6311 9.00655 21.7991 6.98778 21.7215 6.7732Z"
        fill={`url(#${id.paint2})`}
        fillOpacity={0.1}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <path
        d="M10.2312 4.99372C10.1597 5.19721 11.0685 7.00699 13.1835 7.79427C15.2985 8.58155 17.1915 8.71231 17.5422 7.71512C17.8929 6.71793 16.3567 5.57227 14.2417 4.78499C12.1267 3.99771 10.3028 4.79025 10.2312 4.99372Z"
        fill="#90B448"
      />
      <path
        d="M10.2312 4.99372C10.1597 5.19721 11.0685 7.00699 13.1835 7.79427C15.2985 8.58155 17.1915 8.71231 17.5422 7.71512C17.8929 6.71793 16.3567 5.57227 14.2417 4.78499C12.1267 3.99771 10.3028 4.79025 10.2312 4.99372Z"
        fill={`url(#${id.paint3})`}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <g
        opacity={0.2}
        filter={`url(#${id.filter1})`}
        style={{ mixBlendMode: 'overlay' }}
      >
        <path
          d="M11.7149 5.60015C11.6385 5.79004 12.4412 6.26053 13.5077 6.65102C14.5743 7.04151 15.5008 7.20413 15.5772 7.01424C15.6536 6.82435 14.851 6.35386 13.7844 5.96337C12.7179 5.57288 11.7913 5.41026 11.7149 5.60015Z"
          fill="white"
        />
      </g>

      <path
        d="M21.5187 11.2341C21.3703 11.3947 19.2763 11.5445 17.5037 10.187C15.731 8.82952 14.664 7.32858 15.3911 6.54163C16.1182 5.75468 17.9253 6.45469 19.6979 7.8122C21.4705 9.1697 21.667 11.0736 21.5187 11.2341Z"
        fill="#90B448"
      />
      <path
        d="M21.5187 11.2341C21.3703 11.3947 19.2763 11.5445 17.5037 10.187C15.731 8.82952 14.664 7.32858 15.3911 6.54163C16.1182 5.75468 17.9253 6.45469 19.6979 7.8122C21.4705 9.1697 21.667 11.0736 21.5187 11.2341Z"
        fill={`url(#${id.paint4})`}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <g
        opacity={0.18}
        filter={`url(#${id.filter2})`}
        style={{ mixBlendMode: 'overlay' }}
      >
        <path
          d="M20.4731 10.45C20.3401 10.6076 19.513 10.1765 18.6257 9.48718C17.7384 8.79785 17.1269 8.11131 17.2599 7.95375C17.3929 7.79619 18.22 8.22727 19.1073 8.9166C19.9946 9.60593 20.6061 10.2925 20.4731 10.45Z"
          fill="white"
        />
      </g>

      <path
        d="M14.4495 11.1949C14.6681 11.3153 17.3578 11.3746 18.357 9.72274C19.3562 8.07087 18.6457 6.61893 17.5745 6.02866C16.5034 5.43838 14.8307 5.57703 13.8315 7.22891C12.8323 8.88078 14.2309 11.0745 14.4495 11.1949Z"
        fill="#90B448"
      />
      <path
        d="M14.4495 11.1949C14.6681 11.3153 17.3578 11.3746 18.357 9.72274C19.3562 8.07087 18.6457 6.61893 17.5745 6.02866C16.5034 5.43838 14.8307 5.57703 13.8315 7.22891C12.8323 8.88078 14.2309 11.0745 14.4495 11.1949Z"
        fill={`url(#${id.paint5})`}
        style={{ mixBlendMode: 'soft-light' }}
      />

      <g
        opacity={0.2}
        filter={`url(#${id.filter3})`}
        style={{ mixBlendMode: 'overlay' }}
      >
        <path
          d="M14.9096 10.6346C15.087 10.7327 15.697 10.0392 16.2719 9.08569C16.8469 8.13214 17.1691 7.27961 16.9917 7.18152C16.8143 7.08343 16.2043 7.77692 15.6294 8.73047C15.0544 9.68403 14.7321 10.5366 14.9096 10.6346Z"
          fill="white"
        />
      </g>

      <g opacity={0.5} filter={`url(#${id.filter4})`}>
        <ellipse
          cx={4.26092}
          cy={2.21791}
          rx={4.26092}
          ry={2.21791}
          transform="matrix(-0.0604886 0.998169 -0.998442 -0.0557974 11.5389 8.02466)"
          fill="white"
          fillOpacity={0.7}
        />
      </g>

      <g filter={`url(#${id.filter5})`}>
        <ellipse
          cx={1.39992}
          cy={1.42855}
          rx={1.39992}
          ry={1.42855}
          transform="matrix(-0.51526 0.857034 -0.874573 -0.484894 11.8859 12.4026)"
          fill="white"
          fillOpacity={0.7}
        />
      </g>

      <defs>
        <filter
          id={id.filter0}
          x="2.0302"
          y="2.00774"
          width="22.2543"
          height="20.3041"
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
          <feGaussianBlur stdDeviation="0.673378" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.658598 0 0 0 0 0.658598 0 0 0 0 0.658598 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4420_7613"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4420_7613"
            result="shape"
          />
        </filter>

        <filter
          id={id.filter1}
          x="11.146"
          y="4.95688"
          width="5.00018"
          height="2.7005"
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
            stdDeviation="0.281936"
            result="effect1_foregroundBlur_4420_7613"
          />
        </filter>

        <filter
          id={id.filter2}
          x="16.6778"
          y="7.35751"
          width="4.37726"
          height="3.68878"
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
            stdDeviation="0.281936"
            result="effect1_foregroundBlur_4420_7613"
          />
        </filter>

        <filter
          id={id.filter3}
          x="14.297"
          y="6.60849"
          width="3.30731"
          height="4.59918"
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
            stdDeviation="0.281936"
            result="effect1_foregroundBlur_4420_7613"
          />
        </filter>

        <filter
          id={id.filter4}
          x="4.21098"
          y="5.273"
          width="9.71158"
          height="13.7621"
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
            stdDeviation="1.31309"
            result="effect1_foregroundBlur_4420_7613"
          />
        </filter>

        <filter
          id={id.filter5}
          x="5.84612"
          y="8.898"
          width="8.13809"
          height="8.02359"
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
            stdDeviation="1.31309"
            result="effect1_foregroundBlur_4420_7613"
          />
        </filter>

        <linearGradient
          id={id.paint0}
          x1="19.3763"
          y1="3.16761"
          x2="17.7815"
          y2="6.31716"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#93B550" />
          <stop offset="1" stopColor="#9BC14E" />
        </linearGradient>

        <linearGradient
          id={id.paint1}
          x1="14.2762"
          y1="0.987418"
          x2="16.1059"
          y2="6.13789"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.5} />
          <stop offset="1" stopOpacity={0.5} />
        </linearGradient>

        <linearGradient
          id={id.paint2}
          x1="23.8369"
          y1="5.81596"
          x2="14.586"
          y2="8.14569"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity={0.5} />
          <stop offset="1" stopColor="white" stopOpacity={0.5} />
        </linearGradient>

        <linearGradient
          id={id.paint3}
          x1="7.41974"
          y1="4.11561"
          x2="15.2025"
          y2="7.09743"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.5} />
          <stop offset="1" stopOpacity={0.5} />
        </linearGradient>

        <linearGradient
          id={id.paint4}
          x1="23.1447"
          y1="12.6576"
          x2="14.4506"
          y2="4.42131"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity={0.5} />
          <stop offset="0.725962" stopColor="#262626" stopOpacity={0.5} />
          <stop offset="1" stopColor="white" stopOpacity={0.5} />
        </linearGradient>

        <linearGradient
          id={id.paint5}
          x1="9.6746"
          y1="12.3062"
          x2="19.2039"
          y2="7.75915"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.5} />
          <stop offset="1" stopOpacity={0.5} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TopSplashFruit;
