import PopularPostCard from "./PopularPostCard";

const PopularPostList = () => {
  return (
    <div className="flex py-3 px-4 overflow-x-auto gap-2 flex-nowrap -mr-4">
      <PopularPostCard
        title="이렇게 추운날"
        content="보일러 몇 도로 틀고 지내? 
        원룸인데 우풍이 너무 심해서 퇴근하고 오면 16도야..."
        likeCount={17}
        commentCount={12}
      />
      <PopularPostCard
        title="자취 선택지 고민된다..."
        content="선택지가 2가지 있어
        1. 월세랑 보증금 없음(할머니 건물이라)
        2. 보증금 500에 월세 30만원"
        likeCount={4}
        commentCount={8}
      />
    </div>
  );
};

export default PopularPostList;
