import React from 'react';

interface BottomSplashFruitProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const BottomSplashFruit: React.FC<BottomSplashFruitProps> = ({
  size = 25,
  ...props
}) => {
  const width = size;
  const height = typeof size === 'number' ? (size * 27) / 25 : size;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#top_fruit_filter0_d)">
        <path
          d="M13.6892 13.0702C16.2471 14.4604 17.167 17.6451 15.7438 20.1829C14.3205 22.7205 11.0924 23.6508 8.53447 22.2607C5.97655 20.8706 5.05665 17.6858 6.47986 15.148C7.90315 12.6102 11.1312 11.6801 13.6892 13.0702Z"
          fill="#FFF695"
        />
        <path
          d="M19.8146 10.6719C22.533 12.1492 23.5109 15.533 21.9986 18.23C20.4862 20.927 17.0563 21.9157 14.3379 20.4388C11.6193 18.9615 10.6413 15.5777 12.1538 12.8806C13.6664 10.1836 17.0961 9.19464 19.8146 10.6719Z"
          fill="#FFF695"
        />
        <path
          d="M11.9803 7.0359C14.5021 8.40659 15.4087 11.5456 14.0057 14.0478C12.6024 16.5501 9.41982 17.4684 6.89756 16.0978C4.37546 14.7271 3.46849 11.5869 4.87177 9.08458C6.27511 6.58227 9.45804 5.66527 11.9803 7.0359Z"
          fill="#FFF695"
        />
      </g>
      <path
        d="M17.2445 7.42568C17.4583 5.99385 18.2759 4.71142 19.6975 3.57837"
        stroke="url(#top_fruit_paint0_linear)"
        strokeWidth="0.402491"
        strokeLinecap="round"
      />
      <path
        d="M14.4542 3.05789C14.7006 3.01152 17.2665 4.41595 17.7375 5.74844C18.2085 7.08094 17.3676 7.65603 16.1598 7.88328C14.952 8.11054 13.8347 7.90391 13.3637 6.57141C12.8927 5.23892 14.2077 3.10426 14.4542 3.05789Z"
        fill="#90B448"
      />
      <path
        d="M14.4542 3.05789C14.7006 3.01152 17.2665 4.41595 17.7375 5.74844C18.2085 7.08094 17.3676 7.65603 16.1598 7.88328C14.952 8.11054 13.8347 7.90391 13.3637 6.57141C12.8927 5.23892 14.2077 3.10426 14.4542 3.05789Z"
        fill="url(#top_fruit_paint1_linear)"
        style={{ mixBlendMode: 'soft-light' }}
      />
      <path
        d="M21.8778 7.34019C21.7954 7.10721 19.2763 5.62477 17.8676 5.88983C16.459 6.15488 16.3729 7.15825 16.7765 8.30005C17.1801 9.44185 17.9205 10.2897 19.3292 10.0247C20.7378 9.7596 21.9601 7.57318 21.8778 7.34019Z"
        fill="#7FA436"
      />
      <path
        d="M21.8778 7.34019C21.7954 7.10721 19.2763 5.62477 17.8676 5.88983C16.459 6.15488 16.3729 7.15825 16.7765 8.30005C17.1801 9.44185 17.9205 10.2897 19.3292 10.0247C20.7378 9.7596 21.9601 7.57318 21.8778 7.34019Z"
        fill="url(#top_fruit_paint2_linear)"
        fillOpacity="0.1"
        style={{ mixBlendMode: 'soft-light' }}
      />
      <path
        d="M9.76413 5.39484C9.69003 5.61331 10.6597 7.56576 12.8942 8.42556C15.1288 9.28535 17.1251 9.43753 17.4883 8.36691C17.8515 7.29629 16.2249 6.05447 13.9904 5.19467C11.7559 4.33488 9.83826 5.17638 9.76413 5.39484Z"
        fill="#90B448"
      />
      <path
        d="M9.76413 5.39484C9.69003 5.61331 10.6597 7.56576 12.8942 8.42556C15.1288 9.28535 17.1251 9.43753 17.4883 8.36691C17.8515 7.29629 16.2249 6.05447 13.9904 5.19467C11.7559 4.33488 9.83826 5.17638 9.76413 5.39484Z"
        fill="url(#top_fruit_paint3_linear)"
        style={{ mixBlendMode: 'soft-light' }}
      />

      <g
        opacity="0.2"
        filter="url(#top_fruit_filter1_f)"
        style={{ mixBlendMode: 'overlay' }}
      >
        <path
          d="M11.3359 6.05907C11.2567 6.26223 12.1046 6.7716 13.2298 7.19679C14.355 7.62198 15.3314 7.80197 15.4106 7.59881C15.4899 7.39565 14.6419 6.88628 13.5167 6.46109C12.3915 6.0359 11.4151 5.85591 11.3359 6.05907Z"
          fill="white"
        />
      </g>

      <path
        d="M21.6798 12.1746C21.5248 12.3469 19.3236 12.495 17.4498 11.0184C15.576 9.5419 14.4434 7.91518 15.2026 7.07068C15.9618 6.22618 17.8672 6.99339 19.741 8.46992C21.6148 9.94645 21.8347 12.0023 21.6798 12.1746Z"
        fill="#90B448"
      />
      <path
        d="M21.6798 12.1746C21.5248 12.3469 19.3236 12.495 17.4498 11.0184C15.576 9.5419 14.4434 7.91518 15.2026 7.07068C15.9618 6.22618 17.8672 6.99339 19.741 8.46992C21.6148 9.94645 21.8347 12.0023 21.6798 12.1746Z"
        fill="url(#top_fruit_paint4_linear)"
        style={{ mixBlendMode: 'soft-light' }}
      />

      <g
        opacity="0.18"
        filter="url(#top_fruit_filter2_f)"
        style={{ mixBlendMode: 'overlay' }}
      >
        <path
          d="M20.5703 11.3169C20.4316 11.4859 19.56 11.0165 18.6235 10.2685C17.687 9.5206 17.0403 8.77732 17.179 8.60838C17.3177 8.43944 18.1893 8.90882 19.1258 9.65676C20.0623 10.4047 20.709 11.148 20.5703 11.3169Z"
          fill="white"
        />
      </g>

      <path
        d="M14.2352 12.1064C14.467 12.2382 17.3087 12.3207 18.3521 10.5413C19.3956 8.76183 18.6344 7.18684 17.4986 6.54118C16.3628 5.89551 14.5969 6.03397 13.5534 7.81343C12.51 9.59289 14.0035 11.9747 14.2352 12.1064Z"
        fill="#90B448"
      />
      <path
        d="M14.2352 12.1064C14.467 12.2382 17.3087 12.3207 18.3521 10.5413C19.3956 8.76183 18.6344 7.18684 17.4986 6.54118C16.3628 5.89551 14.5969 6.03397 13.5534 7.81343C12.51 9.59289 14.0035 11.9747 14.2352 12.1064Z"
        fill="url(#top_fruit_paint5_linear)"
        style={{ mixBlendMode: 'soft-light' }}
      />

      <defs>
        <filter
          id="top_fruit_filter0_d"
          x="2.60159"
          y="4.7897"
          width="21.7183"
          height="19.7263"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.804981" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.658598 0 0 0 0 0.658598 0 0 0 0 0.658598 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4420_7612"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4420_7612"
            result="shape"
          />
        </filter>
        <filter
          id="top_fruit_filter1_f"
          x="10.6567"
          y="5.30151"
          width="5.43311"
          height="3.05493"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="0.337037" />
        </filter>
        <filter
          id="top_fruit_filter2_f"
          x="16.4862"
          y="7.8999"
          width="4.77686"
          height="4.12549"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="0.337037" />
        </filter>
        <linearGradient
          id="top_fruit_paint0_linear"
          x1="19.4117"
          y1="3.4297"
          x2="17.6578"
          y2="6.80134"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#93B550" />
          <stop offset="1" stopColor="#9BC14E" />
        </linearGradient>
        <linearGradient
          id="top_fruit_paint1_linear"
          x1="14.0267"
          y1="1.06025"
          x2="16.0496"
          y2="6.61943"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="top_fruit_paint2_linear"
          x1="24.1005"
          y1="6.30797"
          x2="14.3516"
          y2="8.71815"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0.5" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="top_fruit_paint3_linear"
          x1="6.79488"
          y1="4.4331"
          x2="15.0866"
          y2="7.50311"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="top_fruit_paint4_linear"
          x1="23.3998"
          y1="13.7214"
          x2="13.969"
          y2="5.02533"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0.5" />
          <stop offset="0.725962" stopColor="#262626" stopOpacity="0.5" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="top_fruit_paint5_linear"
          x1="9.19945"
          y1="13.2754"
          x2="19.2794"
          y2="8.52338"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BottomSplashFruit;
