import React from 'react';

interface EmptyTreeProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const EmptyTree: React.FC<EmptyTreeProps> = ({ size = 110, ...props }) => {
  // 원래 비율 (width: 110, height: 167)을 유지하기 위한 계산
  const width = size;
  const height = typeof size === 'number' ? (size * 167) / 110 : size;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 110 167"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* 나무 기둥 */}
      <path
        d="M41.6945 132.882C41.8089 132.081 42.4949 131.486 43.3039 131.486H65.7568C66.5658 131.486 67.2518 132.081 67.3662 132.882L71.9563 165.012C72.0962 165.992 71.3362 166.868 70.3469 166.868H38.7138C37.7245 166.868 36.9645 165.992 37.1044 165.012L41.6945 132.882Z"
        fill="#866C0B"
      />

      {/* 하단 나뭇잎 층 */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.9024 71.6802C65.0859 71.6802 94.408 84.6437 102.735 96.5122C115.939 111.464 109.01 126.239 98.3936 132.34C89.9941 137.168 79.7179 135.986 72.3487 130.163C68.1459 135.158 61.928 138.322 54.9883 138.322C48.0477 138.322 41.8279 135.158 37.625 130.162C30.2557 135.985 19.9797 137.168 11.5801 132.34C1.16804 126.356 -5.69908 112.027 6.49709 97.3726C13.9512 85.2789 44.4348 71.6802 54.9024 71.6802Z"
        fill="url(#tree_grad_1)"
      />

      {/* 중간 나뭇잎 층 */}
      <path
        d="M54.9343 32.1455C65.1254 32.1455 94.4834 45.1273 102.786 57.0029C115.958 71.9457 109.031 86.7078 98.4207 92.8057C90.0221 97.6326 79.7469 96.4517 72.3777 90.6299C68.1749 95.625 61.9566 98.7871 55.0173 98.7871C48.0825 98.7871 41.8675 95.6293 37.6648 90.6396C30.2965 96.453 20.0284 97.6297 11.6345 92.8057C1.24376 86.8338 -5.61815 72.5501 6.47535 57.9268C13.8343 45.811 44.4412 32.1455 54.9343 32.1455Z"
        fill="url(#tree_grad_2)"
      />

      {/* 상단 나뭇잎 층 */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M55.1636 0C63.0884 0.000188903 85.9114 11.5657 92.3774 22.1484C102.638 35.4729 97.2486 48.6388 88.9927 54.0762C82.4604 58.3781 74.4697 57.3258 68.7378 52.1377C65.4687 56.587 60.6342 59.4043 55.2388 59.4043C49.8367 59.4043 44.9963 56.5807 41.727 52.1221C35.9938 57.3236 27.9934 58.3826 21.4546 54.0762C13.3473 48.7367 8.00373 35.9437 17.5308 22.8672C23.3609 12.096 47.0301 4.19886e-09 55.1636 0Z"
        fill="url(#tree_grad_3)"
      />

      <defs>
        <linearGradient
          id="tree_grad_1"
          x1="54.9862"
          y1="71.6802"
          x2="54.8934"
          y2="144.404"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CEEA84" />
          <stop offset="1" stopColor="#ACD935" />
        </linearGradient>
        <linearGradient
          id="tree_grad_2"
          x1="55.0265"
          y1="32.1455"
          x2="54.9338"
          y2="104.869"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CEEA84" />
          <stop offset="1" stopColor="#ACD935" />
        </linearGradient>
        <linearGradient
          id="tree_grad_3"
          x1="55.2236"
          y1="-9.0071e-08"
          x2="55.1289"
          y2="64.826"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CEEA84" />
          <stop offset="1" stopColor="#ACD935" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default EmptyTree;
