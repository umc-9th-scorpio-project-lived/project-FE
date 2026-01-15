import { useState } from "react";

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleHandler = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <button
      onClick={toggleHandler}
      className={`w-6 h-3 rounded-md relative transition-colors ${isOn ? "bg-primary-50" : "bg-gray-200"} ease-in-out`}
    >
      <div
        className={`w-2 h-2 bg-gray-50 rounded-full absolute transition-all top-0.5 ${isOn ? "left-3.5" : "left-0.5"} ease-in-out`}
      ></div>
    </button>
  );
};

export default Toggle;
