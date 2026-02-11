import SendIcon from '@/icons/SendIcon';
import { useEffect, useRef, useState } from 'react';

interface PostFooterProps {
  onSubmitComment: (content: string) => void;
  value?: string;
  mode: 'create' | 'reply' | 'edit';
}

const PostFooter = ({
  onSubmitComment,
  value: externalValue,
  mode,
}: PostFooterProps) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  useEffect(() => {
    if (mode === 'reply' || mode === 'edit') {
      textareaRef.current?.focus();
    }
  }, [mode]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmitComment(value);
    setValue('');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-125 h-25 bg-screen-0 flex justify-between items-center px-5 pb-5 shadow-[0_-4px_10px_rgba(85,85,85,0.1)] rounded-t-lg">
        <textarea
          ref={textareaRef}
          className="w-7/8 h-10 px-4 py-2.5 bg-gray-100 rounded-full text-[14px] text-gray-900 outline-none"
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            mode === 'reply' ? '대댓글을 남겨보세요.' : '댓글을 남겨보세요.'
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          className="flex w-9 h-9 items-center justify-center rounded-full bg-primary-50"
          onClick={handleSubmit}
        >
          <SendIcon className="flex w-4 h-4 text-screen-0" />
        </button>
      </div>
    </div>
  );
};

export default PostFooter;
