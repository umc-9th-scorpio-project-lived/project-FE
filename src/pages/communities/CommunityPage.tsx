import Category from "@/components/communities/Category";
import PostList from "@/components/communities/PostList";
import WritingButton from "@/components/communities/WritingButton";
import { useState } from "react";

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  return (
    <div className="flex flex-col mx-4 pb-[100px]">
      <div className="flex justify-between items-center">
        <h1 className="my-2 typo-h2 font-bold text-[#080808]">커뮤니티</h1>
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              viewBox="-4 -4 24 24"
              className="w-full h-full text-gray-600"
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d="M12.3104 11.5607L16.4244 15.6757L15.5764 16.5237L11.4534 12.4007C10.0611 13.5487 8.27934 14.1147 6.4798 13.9806C4.68026 13.8465 3.00203 13.0227 1.79533 11.681C0.588628 10.3392 -0.0533137 8.58336 0.00347006 6.77973C0.0602539 4.97609 0.811376 3.26407 2.10009 2.00092C3.3888 0.737771 5.11553 0.021098 6.91994 0.000458431C8.72435 -0.0201812 10.467 0.656808 11.7843 1.89015C13.1016 3.12349 13.8916 4.81789 13.9897 6.61975C14.0877 8.42161 13.4861 10.1917 12.3104 11.5607ZM12.8004 6.99968C12.8004 5.46143 12.1893 3.98618 11.1016 2.89846C10.0139 1.81075 8.53864 1.19968 7.00039 1.19968C5.46213 1.19968 3.98688 1.81075 2.89917 2.89846C1.81146 3.98618 1.20039 5.46143 1.20039 6.99968C1.20039 8.53794 1.81146 10.0132 2.89917 11.1009C3.98688 12.1886 5.46213 12.7997 7.00039 12.7997C8.53864 12.7997 10.0139 12.1886 11.1016 11.1009C12.1893 10.0132 12.8004 8.53794 12.8004 6.99968Z" />
            </svg>
          </div>

          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              viewBox="4 4 24 24"
              className="w-full h-full text-gray-600"
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d="M16 17.2222C18.6622 17.2222 21.0833 17.9933 22.8644 19.0788C23.7533 19.6233 24.5133 20.2622 25.0622 20.9566C25.6022 21.6411 26 22.4588 26 23.3333C26 24.2722 25.5433 25.0122 24.8856 25.5399C24.2633 26.0399 23.4422 26.3711 22.57 26.6022C20.8167 27.0655 18.4767 27.2222 16 27.2222C13.5233 27.2222 11.1833 27.0666 9.43 26.6022C8.55778 26.3711 7.73667 26.0399 7.11444 25.5399C6.45556 25.0111 6 24.2722 6 23.3333C6 22.4588 6.39778 21.6411 6.93778 20.9566C7.48667 20.2622 8.24556 19.6233 9.13556 19.0788C10.9167 17.9933 13.3389 17.2222 16 17.2222Z" />
              <path d="M16.0084 5C20.2851 5 22.9584 9.63 20.8195 13.3333C20.3319 14.1779 19.6306 14.8792 18.7861 15.3668C17.9416 15.8544 16.9836 16.1111 16.0084 16.1111C11.7317 16.1111 9.05841 11.4811 11.1973 7.77778C11.6849 6.93325 12.3862 6.23194 13.2307 5.74434C14.0752 5.25674 15.0332 5.00002 16.0084 5Z" />
            </svg>
          </div>
        </div>
      </div>
      <Category selected={selectedCategory} onSelect={setSelectedCategory} />
      <PostList />
      <WritingButton />
    </div>
  );
};

export default CommunityPage;
