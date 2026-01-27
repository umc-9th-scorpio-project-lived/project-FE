import SendIcon from "@/icons/SendIcon";
import { useState } from "react";

const PostFooter = () => {
  const [value, setValue] = useState("");
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[500px] h-[100px] bg-screen-0 flex justify-between items-center px-5 pb-5 shadow-[0_-4px_10px_rgba(85,85,85,0.1)] rounded-t-lg">
        <textarea
          className="w-7/8 h-10 px-4 py-2.5 bg-gray-100 rounded-full text-[14px] text-gray-900"
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="댓글을 남겨보세요."
        />
        <button className="flex w-9 h-9 items-center justify-center rounded-full bg-primary-50">
          <SendIcon className="flex w-4 h-4 text-screen-0" />
        </button>
      </div>
    </div>
  );
};

export default PostFooter;
