import CameraIcon from "@/icons/CameraIcon";
import { useRef } from "react";

type Props = {
  AddImage: (files: FileList | null) => void;
};

const PostWriteFooter = ({ AddImage }: Props) => {
  const ImageInputRef = useRef<HTMLInputElement>(null);
  const handleSvgClick = () => {
    ImageInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    AddImage(e.target.files);
    if (e.target) e.target.value = "";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[500px] h-[100px] bg-screen-0 flex items-center px-5 pb-5 shadow-[0_-4px_10px_rgba(85,85,85,0.1)] rounded-t-lg">
        <CameraIcon className="w-6 h-6 text-gray-400" onClick={handleSvgClick} />
        <input
          type="file"
          accept="image/*"
          multiple
          ref={ImageInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default PostWriteFooter;
