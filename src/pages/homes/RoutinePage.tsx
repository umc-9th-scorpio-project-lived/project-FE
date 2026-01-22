import { WEEK_LABELS } from "@/constants";
import DownChevronIcon from "@/icons/DownChevronIcon";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import MiniCloseIcon from "@/icons/MiniCloseIcon";
import { useRoutineStore } from "@/stores/homes/routineStore";
import useBaseModal from "@/stores/modals/baseModal";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AlarmValue, RepeatValue } from "@/types/homes/Routine.types";
import DeleteIcon from "@/icons/DeleteIcon";
import useCoachModal from "@/hooks/useCoachModal";

const MAX_TITLE_LENGTH = 50;

// 루틴 생성/수정 페이지 통합 관리
type Mode = "create" | "edit";

const RoutinePage = ({ mode = "create" as Mode }) => {
  const { openModal } = useBaseModal();

  const { openCoach: openCoach, close: closeCoach } = useCoachModal("coach:icon");

  const title = useRoutineStore((s) => s.draft.title);
  const icon = useRoutineStore((s) => s.draft.icon);
  const repeat = useRoutineStore((s) => s.draft.repeat);
  const alarm = useRoutineStore((s) => s.draft.alarm);

  const setTitle = useRoutineStore((s) => s.setTitle);
  const setRepeat = useRoutineStore((s) => s.setRepeat);
  const setAlarm = useRoutineStore((s) => s.setAlarm);

  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const hasTitle = title !== null && title.trim().length > 0;

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    if (isTitleFocused) return;
    if (el.innerText !== title && title !== null) el.innerText = title;
  }, [title, isTitleFocused]);

  const repeatLabel = useMemo(() => {
    if (repeat.type === "NONE") return "주기를 선택해주세요.";

    if (repeat.type === "DATE") {
      const parts: string[] = [];
      const dates = repeat.dates ?? [];
      const hasLastDay = !!repeat.isLastDayOfMonth;
      const datesForSummary = hasLastDay ? dates.filter((d) => d !== 31) : dates;

      if (datesForSummary.length > 0) parts.push(`${datesForSummary.join(", ")}일`);
      if (hasLastDay) parts.push("마지막 날");

      if (parts.length === 1 && parts[0] === "마지막 날") return "매달 마지막 날";
      return `매달 ${parts.join(", ")}`;
    }

    const isEveryday = repeat.isEveryday || repeat.days.length === 7;
    if (isEveryday) return "매일";

    const dayText = repeat.days.map((d) => WEEK_LABELS[d]).join(", ");
    return `${dayText}요일 마다`;
  }, [repeat]);

  const alarmTimeLabel = useMemo(() => {
    const fallback = "오후 12:00";
    return alarm.enabled ? alarm.time || fallback : fallback;
  }, [alarm.enabled, alarm.time]);

  const canSubmit = useMemo(() => {
    if (title !== null && !title.trim()) return false;
    if (repeat.type === "NONE") return false;
    if (alarm.enabled && !alarm.time) return false;
    return true;
  }, [title, repeat, alarm]);

  const handleBlur = () => {
    setIsTitleFocused(false);
    if (!titleRef.current) return;
    setTitle(titleRef.current.innerText);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.innerText.length > MAX_TITLE_LENGTH) {
      target.innerText = target.innerText.slice(0, MAX_TITLE_LENGTH);
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(target);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const handleFocus = () => {
    setIsTitleFocused(true);
    setTimeout(() => {
      if (!titleRef.current) return;
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(titleRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const openIconModal = () => {
    openModal("selectIconModal", { position: "bottom" });
  };

  const openDeleteModal = () => {
    openModal("deleteRoutineModal", { position: "bottom" });
  };

  const openRepeatModal = () => {
    openModal("setRepeatCycleModal", {
      position: "bottom",
      props: {
        initialValue: repeat,
        onApply: (_summary: string, value: RepeatValue) => setRepeat(value),
      },
    });
  };

  const openAlarmModal = () => {
    openModal("setAlarmModal", {
      position: "bottom",
      props: {
        initialValue: alarm,
        onApply: (value: AlarmValue) => setAlarm(value),
      },
    });
  };

  const pageTitle = mode === "edit" ? "루틴 수정" : "루틴 추가";
  const ctaLabel = mode === "edit" ? "수정 완료" : "루틴 추가하기";

  return (
    <div className="w-full min-h-dvh px-4 pt-2.5 flex flex-col">
      <div className="relative flex w-full py-1.5 items-center justify-center">
        <LeftChevronIcon
          className="absolute left-0 w-7 h-7 text-gray-900"
          onClick={() => history.back()}
        />
        <span className="typo-h2_bold20 text-gray-900">{pageTitle}</span>

        {mode === "edit" && (
          <DeleteIcon
            className="absolute right-3 w-6 h-6 flex items-center justify-center"
            onClick={openDeleteModal}
          />
        )}
      </div>

      <div className="flex flex-col flex-1 justify-between py-11">
        <div className="flex flex-col gap-11">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div
                ref={titleRef}
                contentEditable
                suppressContentEditableWarning
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                className={`w-[106px] h-[106px] rounded-lg flex items-center justify-center px-2.5 py-2.5 outline-none typo-body_reg14 text-center whitespace-pre-wrap break-all overflow-y-auto transition-colors ${
                  isTitleFocused || hasTitle
                    ? "bg-primary-30 text-gray-900"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {!hasTitle && !isTitleFocused ? "루틴 제목" : title}
              </div>

              <button
                type="button"
                onClick={openIconModal}
                className="absolute -right-4 -bottom-4 w-9 h-9 rounded-full bg-gray-100 border border-screen-0 flex items-center justify-center"
              >
                <span className="typo-body_reg16 leading-none">{icon ?? "👍"}</span>
              </button>

              {openCoach && (
                <>
                  <div className="fixed inset-0 z-40" onClick={closeCoach} />
                  <div className="absolute left-[104px] top-[138px] -translate-x-1/2 z-50">
                    <div className="relative bg-gray-700 text-screen-0 rounded-sm p-4 w-56">
                      <div className="flex gap-3 justify-center items-center ">
                        <div className="typo-body_reg12 text-screen-0 text-center z-10">
                          루틴 완료 시 나타나는 아이콘입니다.
                          <br />
                          탭하여 변경 가능합니다.
                        </div>

                        <MiniCloseIcon className="w-2.5 h-2.5 text-screen-0" onClick={closeCoach} />
                      </div>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                        <div className="w-4 h-4 bg-gray-700 rotate-45 rounded-xs" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2.5">
              <div className="typo-body_reg16 text-gray-900">반복 주기</div>
              <button
                type="button"
                onClick={openRepeatModal}
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
                <DownChevronIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between py-1 pr-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-timer" />
                  <span className="typo-bold_reg16 text-gray-900">알림</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setAlarm(
                        alarm.enabled
                          ? { enabled: false, time: alarm.time ?? "오후 12:00" }
                          : { enabled: true, time: alarm.time ?? "오후 12:00" },
                      )
                    }
                    className={`w-6 h-3 rounded-full relative transition-colors ${
                      alarm.enabled ? "bg-primary-50" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-2 h-2 rounded-full bg-gray-50 transition-transform ${
                        alarm.enabled ? "translate-x-[2px]" : "translate-x-[-10px]"
                      }`}
                    />
                  </button>

                  <span className="typo-body_reg12 text-gray-700">
                    {alarm.enabled ? "있음" : "없음"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={!alarm.enabled}
                onClick={openAlarmModal}
                className="w-full rounded-lg bg-gray-50 flex items-center justify-between px-4 py-[18px]"
              >
                <span
                  className={
                    alarm.enabled
                      ? "typo-body_bold16 text-gray-900"
                      : "typo-body_reg16 text-gray-500"
                  }
                >
                  {alarmTimeLabel}
                </span>
                <DownChevronIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div
          role="button"
          className={`w-full rounded-full typo-body_bold18 py-3 text-center ${
            canSubmit ? "bg-primary-50 text-screen-0" : "bg-gray-100 text-gray-400"
          }`}
          onClick={() => {
            if (!canSubmit) return;
            console.log({ title, icon, repeat, alarm });
          }}
        >
          {ctaLabel}
        </div>
      </div>
    </div>
  );
};

export default RoutinePage;
