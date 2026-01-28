import Wheel from "../commons/Wheel";

type TimeWheelProps<T extends string> = {
  items: T[];
  value: T;
  onChange: (v: T) => void;
  width?: string;
};

const TimeWheel = <T extends string>({
  items,
  value,
  onChange,
  width = "60px",
}: TimeWheelProps<T>) => {
  const isTwo = items.length === 2;

  return (
    <Wheel
      items={items}
      value={value}
      onChange={onChange}
      width={width}
      itemHeight={56}
      visibleRows={3}
      loop={!isTwo}
      snapDelay={isTwo ? 220 : 150}
    />
  );
};

export default TimeWheel;
