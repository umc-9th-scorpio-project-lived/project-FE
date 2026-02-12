interface ToggleProps {
  checked: boolean;
  handleToggle: () => void;
}

const Toggle = ({ checked, handleToggle }: ToggleProps) => {
  return (
    <button
      onClick={handleToggle}
      className={`w-8 h-4 rounded-full relative transition-colors ${checked ? 'bg-primary-50' : 'bg-gray-200'} ease-in-out`}
    >
      <div
        className={`w-2.5 h-2.5 bg-gray-50 rounded-full absolute transition-all top-1/2 -translate-y-1/2 ${checked ? 'left-4.5' : 'left-0.75'} ease-in-out`}
      ></div>
    </button>
  );
};

export default Toggle;
