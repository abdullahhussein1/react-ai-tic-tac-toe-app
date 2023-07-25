import { CgClose } from "react-icons/cg";
import { BiCircle } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const Square = ({ value, onSquareClick }) => {
  return (
    <button
      onClick={onSquareClick}
      className="flex justify-center items-center w-28 h-28 text-4xl lg:w-36 lg:h-36 lg:text-5xl text-slate-700 font-bold bg-white hover:bg-white/60 active:scale-95 transition-all"
    >
      {styleValue(value)}
    </button>
  );
};

function styleValue(value) {
  if (value === null) return;

  if (value === "X") {
    return <CgClose className="stroke-slate-700 scale-110" />;
  } else {
    return <BiCircle className="stroke-slate-700 scale-110" />;
  }
}

export default Square;
