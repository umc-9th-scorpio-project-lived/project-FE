import PostCard from "./PostCard";

const PostList = () => {
  return (
    <div>
      <PostCard
        category="자취 일상"
        title="오늘 누워있는데"
        content="갑자기 엄마가 반찬 갖고 온다고 해서 놀랬음...
          진짜 바로 일어나서 방 치우느라 힘들었다..."
        imageCount={0}
        likeCount={2}
        commentCount={4}
        createdAt="24분 전"
      />
      <PostCard
        category="추천템"
        title="브리타 정수기 진짜 좋은듯"
        content="진짜 나 빼고 다 아는 거였긴 한데... 
          브리타 정수기 쓰면 필터만  교체해주면 돼서 좋음!
          2달 주기에 한 번씩만 필터 교체해주면 돼!!"
        imageCount={2}
        likeCount={6}
        commentCount={12}
        createdAt="30분 전"
      />
      <PostCard
        category="자취 꿀팁"
        title="갑자기 날파리 보이면 바로 해야 될 거!"
        content="야 얘들아... 나 보일러 동파된 거 같은데 어떻게 해야돼..?
          자취 1년차라 이런 적 처음이라 너무 당황스러움;;"
        imageCount={0}
        likeCount={2}
        commentCount={12}
        createdAt="1시간 전"
      />
      <PostCard
        category="자취 일상"
        title="이렇게추운날"
        content="보일러 몇 도로 틀고 지내?
          원룸인데 우풍이 너무 심해서 퇴근하고 오면 16도야....."
        imageCount={0}
        likeCount={17}
        commentCount={12}
        createdAt="1일 전"
      />
      <PostCard
        category="고민 상담소"
        title="자취 선택지 고민된다..."
        content="선택지가 2가지 있어
        1. 월세랑 보증금 없음(할머니 건물이라)
        2. 보증금 500에 월세 30만원"
        imageCount={0}
        likeCount={4}
        commentCount={8}
        createdAt="2일 전"
      />
      <PostCard
        category="추천템"
        title="브리타 정수기 진짜 좋은듯"
        content="진짜 나 빼고 다 아는 거였긴 한데... 
          브리타 정수기 쓰면 필터만  교체해주면 돼서 좋음!
          2달 주기에 한 번씩만 필터 교체해주면 돼!!"
        imageCount={2}
        likeCount={6}
        commentCount={12}
        createdAt="2일 전"
      />
    </div>
  );
};

export default PostList;
