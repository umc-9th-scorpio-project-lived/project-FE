import { useNavigate } from "react-router-dom";

const HomeFloatingButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="px-6 py-3 typo-body_bold14 text-screen-0 bg-primary-50 rounded-3xl shadow-mini"
      onClick={() => {
        navigate("/lived/recommend");
      }}
    >
      루틴 추천받기
    </div>
  );
};

export default HomeFloatingButton;
