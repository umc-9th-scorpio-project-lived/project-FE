import useBaseModal from "@/stores/modals/baseModal";
import { useMemo, useRef, useState } from "react";

/** 반복 설정 타입 */
type RepeatValue =
  | { type: "DATE"; dates: string[]; isLastDayOfMonth?: boolean }
  | { type: "INTERVAL"; every: number; unit: "DAY" | "WEEK" | "MONTH" }
  | { type: "NONE" };

/** 알림 설정 타입 */
type AlarmValue = { enabled: false } | { enabled: true; time: string };

const MAX_TITLE_LENGTH = 50;

const CreateRoutinePage = () => {
  /** 공통 모달 오픈 함수 */
  const { openModal } = useBaseModal();

  /** 루틴 제목 */
  const [title, setTitle] = useState("");

  /** 제목 입력 포커스 여부 */
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);

  /** 반복 설정 */
  const [repeat, setRepeat] = useState<RepeatValue>({ type: "NONE" });

  /** 알림 설정 */
  const [alarm, setAlarm] = useState<AlarmValue>({ enabled: false });

  /** 제목 입력 여부(배경색, 제출 가능 여부 판단용) */
  const hasTitle = title.trim().length > 0;

  /** 반복 설정 요약 텍스트 */
  const repeatLabel = useMemo(() => {
    if (repeat.type === "NONE") return "주기를 선택해주세요.";
    if (repeat.type === "DATE") return `지정 날짜 ${repeat.dates.length}개`;
    return `매 ${repeat.every}${repeat.unit === "DAY" ? "일" : repeat.unit === "WEEK" ? "주" : "개월"}`;
  }, [repeat]);

  /** 알림 시간 표시용 텍스트 */
  const alarmTimeLabel = useMemo(() => {
    if (!alarm.enabled) return "없음";
    return alarm.time;
  }, [alarm]);

  /** 루틴 생성 버튼 활성화 여부 */
  const canSubmit = useMemo(() => {
    if (!title.trim()) return false;
    if (repeat.type === "NONE") return false;
    if (alarm.enabled && !alarm.time) return false;
    return true;
  }, [title, repeat, alarm]);

  /** 편집이 끝났을 때(Blur) 상태 업데이트 */
  const handleBlur = () => {
    setIsTitleFocused(false);
    if (titleRef.current) {
      const currentText = titleRef.current.innerText;
      setTitle(currentText);
    }
  };

  /** 실시간 글자 수 제한만 처리 (렌더링은 방해하지 않음) */
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.innerText.length > MAX_TITLE_LENGTH) {
      target.innerText = target.innerText.slice(0, MAX_TITLE_LENGTH);
      // 커서 끝으로 이동 로직
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(target);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full min-h-dvh px-4 pt-2.5 flex flex-col">
      {/* 상단 헤더 */}
      <div className="relative flex w-full py-1.5 items-center justify-center">
        {/* 뒤로가기 */}
        <button
          type="button"
          className="absolute left-0 w-6 h-6 bg-left_chevron"
          aria-label="뒤로가기"
          onClick={() => history.back()}
        />
        <span className="typo-h2_reg20 text-gray-900">루틴 추가</span>
      </div>

      <div className="flex flex-col flex-1 justify-between py-11">
        <div className="flex flex-col gap-11">
          {/* 루틴 제목 입력 영역 */}
          <div className="flex items-center justify-center">
            <div
              ref={titleRef}
              role="textbox"
              contentEditable
              suppressContentEditableWarning
              onFocus={() => setIsTitleFocused(true)}
              onBlur={handleBlur}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              className={`w-[106px] h-[106px] rounded-lg grid place-items-center px-2.5 py-2.5 outline-none typo-body_bold14 text-center whitespace-pre-wrap break-all overflow-y-auto transition-colors ${
                isTitleFocused || hasTitle
                  ? "bg-[#BEE360] text-gray-900"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {!hasTitle && !isTitleFocused ? "루틴 제목" : title}
            </div>
          </div>

          {/* 반복 / 알림 설정 폼 */}
          <div className="flex flex-col gap-3">
            {/* 반복 주기 */}
            <div className="flex flex-col gap-2.5">
              <div className="typo-body_reg16 text-gray-900">반복 주기</div>

              <button
                type="button"
                onClick={() => openModal("setRepeatCycleModal", { position: "bottom" })}
                className="w-full rounded-lg bg-gray-50 flex items-center justify-between px-4 py-[18px]"
              >
                <span
                  className={
                    repeat.type === "NONE"
                      ? "typo-body_reg16 text-gray-500"
                      : "typo-body_bold16 text-gray-900"
                  }
                >
                  {repeatLabel}
                </span>
                <span className="w-6 h-6 bg-down_chevron" aria-hidden />
              </button>
            </div>

            {/* 알림 설정 */}
            <div className="flex flex-col gap-2.5">
              {/* 알림 토글 */}
              <div className="flex items-center justify-between py-1 pr-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-timer" />
                  <span className="typo-bold_reg16 text-gray-900">알림</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setAlarm((prev) =>
                        prev.enabled ? { enabled: false } : { enabled: true, time: "오후 12:00" },
                      )
                    }
                    className={[
                      "w-6 h-3 rounded-full relative transition-colors",
                      alarm.enabled ? "bg-primary-50" : "bg-gray-200",
                    ].join(" ")}
                    aria-label="알림 토글"
                  >
                    <span
                      className={[
                        "absolute top-0.5 w-2 h-2 rounded-full bg-gray-50 transition-transform",
                        alarm.enabled ? "translate-x-[2px]" : "translate-x-[-10px]",
                      ].join(" ")}
                    />
                  </button>

                  <span className="typo-body_reg12 text-gray-700">
                    {alarm.enabled ? "있음" : "없음"}
                  </span>
                </div>
              </div>

              {/* 알림 시간 선택 */}
              <button
                type="button"
                disabled={!alarm.enabled}
                onClick={() => openModal("setAlarmModal", { position: "bottom" })}
                className="w-full rounded-lg bg-gray-50 flex items-center justify-between px-4 py-[18px]"
              >
                <span className="typo-body_reg16 text-gray-500">{alarmTimeLabel}</span>
                <span className="w-6 h-6 bg-down_chevron" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {/* 루틴 생성 버튼 */}
        <div
          role="button"
          className={[
            "w-full rounded-full typo-body_bold18 py-3 text-center",
            canSubmit ? "bg-primary-50 text-screen-0" : "bg-gray-100 text-gray-300",
          ].join(" ")}
          onClick={() => {
            if (!canSubmit) return;
            console.log({ title, repeat, alarm });
          }}
        >
          루틴 추가하기
        </div>
      </div>
    </div>
  );
};

export default CreateRoutinePage;
