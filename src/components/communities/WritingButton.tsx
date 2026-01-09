const WritingButton = () => {
  return (
    <div className="relative">
      <button className="fixed bottom-32 right-[calc((100vw-min(500px,100vw))/2+16px)] w-14 h-14 rounded-full bg-[#D4EA80] flex items-center justify-center shadow-lg z-50">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1029_5524)">
            <path
              d="M18.419 0.980103L15.9612 3.43791L22.5627 10.0395L25.0205 7.58167C26.2901 6.31213 26.2901 4.25549 25.0205 2.98596L23.0198 0.980103C21.7502 -0.289429 19.6936 -0.289429 18.4241 0.980103H18.419ZM14.8135 4.58557L2.97641 16.4278C2.44828 16.9559 2.06234 17.611 1.84906 18.327L0.0514059 24.436C-0.0755473 24.8676 0.0412496 25.3297 0.356093 25.6446C0.670937 25.9594 1.13305 26.0762 1.55961 25.9543L7.66859 24.1567C8.38461 23.9434 9.03969 23.5574 9.56781 23.0293L21.4151 11.1871L14.8135 4.58557Z"
              fill="#8FC600"
            />
          </g>
          <defs>
            <clipPath id="clip0_1029_5524">
              <rect width="26" height="26" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default WritingButton;
