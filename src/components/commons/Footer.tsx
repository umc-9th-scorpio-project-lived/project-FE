import { ICON_URL_MAP } from "@/constants";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedFooterIndex = React.useMemo(() => {
    if (pathname.includes("/notices")) {
      return 0;
    } else if (pathname.includes("/booths")) {
      return 2;
    } else if (pathname.includes("/reserve")) {
      return 3;
    }

    return ICON_URL_MAP.findIndex((item) => pathname === `/${item.router}`);
  }, [pathname]);

  const handleClickFooter = (index: number) => {
    navigate(`/${ICON_URL_MAP[index].router}`);
  };

  return (
    <>
      <div className="w-full h-[100px] bg-white flex items-center fixed bottom-0 justify-between limit-width px-5 pb-5 shadow-footer-shadow rounded-t-2xl gap-[40px]">
        {ICON_URL_MAP.map((item, index) => {
          const IconComponent = item.component;
          const isActive = index === selectedFooterIndex;

          return (
            <div
              key={index}
              className="h-full flex flex-col items-center justify-center cursor-pointer gap-1 w-full"
              onClick={() => handleClickFooter(index)}
            >
              <IconComponent isActive={isActive} />
              <div
                className={`text-button font-semibold ${isActive ? "text-primary-900" : "text-gray-200"}`}
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Footer;
