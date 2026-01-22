type Ampm = "오전" | "오후";

type AlarmParts = {
  ampm: Ampm;
  hour: number; // "1" ~ "12"
  minute: string; // "00" ~ "59"
};

export const parseAlarm = (timeText?: string): AlarmParts => {
  // 기본값: 오후 12:00
  if (!timeText) return { ampm: "오후", hour: 12, minute: "00" };

  // 공백을 기준으로 "오전/오후" "HH:mm" 분리
  const [ampmText, hmText] = timeText.split(" ");
  // :을 기준으로 "HH" "mm" 분리
  const [hourText, minuteText] = hmText.split(":");

  const hour = Math.min(12, Math.max(1, Number(hourText || 12)));
  const minute = String(minuteText ?? "00").padStart(2, "0");
  const ampm: Ampm = ampmText === "오전" ? "오전" : "오후";

  return { ampm, hour, minute };
};
