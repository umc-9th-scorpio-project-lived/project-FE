import { ICON_URL_MAP } from "@/constants";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedFooterIndex = React.useMemo(() => {
    const matches = ICON_URL_MAP.map((item, index) => {
      const base = `/${item.router}`;
      const isMatch = pathname === base || pathname.startsWith(`${base}/`);
      return isMatch ? { index, len: base.length } : null;
    }).filter(Boolean) as { index: number; len: number }[];

    if (matches.length === 0) return 0;

    matches.sort((a, b) => b.len - a.len);
    return matches[0].index;
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
              key={item.router}
              className="h-full flex flex-col items-center justify-center cursor-pointer gap-1 w-full"
              onClick={() => handleClickFooter(index)}
            >
              <IconComponent isActive={isActive} />
              <div
                className={`typo-body_reg12 font-semibold ${isActive ? "text-[#8FC600]" : "text-gray-200"}`}
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
