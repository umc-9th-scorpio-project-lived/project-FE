interface ToggleProps {
  checked: boolean;
  handleToggle: () => void;
}

const Toggle = ({ checked, handleToggle }: ToggleProps) => {
  return (
    <button
      onClick={handleToggle}
      className={`w-6 h-3 rounded-md relative transition-colors ${checked ? "bg-primary-50" : "bg-gray-200"} ease-in-out`}
    >
      <div
        className={`w-2 h-2 bg-gray-50 rounded-full absolute transition-all top-0.5 ${checked ? "left-3.5" : "left-0.5"} ease-in-out`}
      ></div>
    </button>
  );
};

export default Toggle;
