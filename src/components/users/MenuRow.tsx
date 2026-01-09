interface MenuRowProps {
  title: string;
  onClick?: () => void;
  value?: string;
  showArrow?: boolean;
}

const MenuRow = ({ title, value = "", showArrow = true, onClick }: MenuRowProps) => {
  return (
    <div className="w-full flex justify-between items-center">
      <span className="typo-body_bold_14 text-gray-900">{title}</span>
      <span className="typo-body_bold_14 text-gray-400">{value}</span>
    </div>
  );
};

export default MenuRow;
