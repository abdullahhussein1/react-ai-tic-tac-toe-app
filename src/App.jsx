import { useState } from "react";
import Square from "./components/Square";
import { CgClose } from "react-icons/cg";
import { BiCircle } from "react-icons/bi";
import { VscDebugRestart } from "react-icons/vsc";
import { AiFillRobot } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { Dropdown } from "flowbite-react";

let count = 0;
let restart;

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [aiIsPlaying, setAiIsPlaying] = useState(true);

  const squares = history[history.length - 1];

  const winner = calculateWinner(squares);

  if (!(xIsNext || count || winner) && aiIsPlaying) {
    aiPlayer(squares, xIsNext, setXIsNext);
  }

  if (winner || !squares.includes(null)) {
    restart = <VscDebugRestart />;
  }

  function handleClick(i) {
    if (squares[i] || winner) return;

    let newSquares = squares.slice();

    if (xIsNext) {
      newSquares[i] = "X";
      count = 0;
      setXIsNext(!xIsNext);
    } else {
      if (!aiIsPlaying) {
        newSquares[i] = "O";
        setXIsNext(!xIsNext);
      }
    }

    setHistory([...history, newSquares]);
  }

  let status;

  if (winner) {
    if (xIsNext) {
      status = (
        <div className="flex gap-2 items-center text-green-500  rounded-xl px-3 py-1 scale-110 transition-all delay-200">
          <p>Winner: </p>
          <BiCircle className="stroke-slate-700 scale-110" />
        </div>
      );
    } else {
      status = (
        <div className="flex gap-2 items-center text-green-500  rounded-xl px-3 py-1 scale-110 transition-all">
          <p>Winner: </p>
          <CgClose className="stroke-slate-700 scale-110" />
        </div>
      );
    }
  } else if (!squares.includes(null)) {
    status = "Draw Game";
  } else {
    if (xIsNext) {
      status = (
        <div className="flex gap-2 items-center transition-all">
          <p>Next player: </p>
          <CgClose className="stroke-slate-700 scale-110" />
        </div>
      );
    } else {
      status = (
        <div className="flex gap-2 items-center transition-all">
          <p>Next player: </p>
          <BiCircle className="stroke-slate-700 scale-110" />
        </div>
      );
    }
  }

  return (
    <>
      <div className="relative flex flex-col gap-10 items-center">
        <div className="flex justify-center absolute  z-10 -bottom-12  bg-white rounded-lg ">
          <Dropdown
            className=" p-1 rounded-xl w-40  shadow-2xl shadow-slate-300"
            label={aiIsPlaying ? "vs. Ai" : "vs. Player"}
          >
            <Dropdown.Item
              className="flex gap-4 hover:gap-5 transition-all w-full rounded-md hover:bg-slate-100"
              icon={AiFillRobot}
              onClick={() => {
                if (!aiIsPlaying) {
                  setAiIsPlaying(true);
                  setHistory([Array(9).fill(null)]);
                  setXIsNext(true);
                }
              }}
            >
              vs. Ai
            </Dropdown.Item>
            <Dropdown.Item
              className="flex gap-4 hover:gap-5 transition-all w-full  rounded-md hover:bg-slate-100"
              icon={BsFillPersonFill}
              onClick={() => {
                if (aiIsPlaying) {
                  setAiIsPlaying(false);
                  setHistory([Array(9).fill(null)]);
                  setXIsNext(true);
                }
              }}
            >
              vs. Player
            </Dropdown.Item>
          </Dropdown>
        </div>
        <h1 className="absolute -top-20 lg:-top-24 px-4 py-1 rounded-md text-slate-700 text-4xl lg:text-5xl font-medium">
          {status}
        </h1>

        <div className="grid grid-cols-3 shadow-2xl shadow-slate-300 rounded-3xl overflow-clip gap-1">
          {createSquares(squares, handleClick, winner)}
        </div>
        <button
          onClick={() => onRestart(setHistory, setXIsNext, (restart = null))}
          className="absolute text-slate-700 scale-150 hover:-rotate-[360deg] hover:bg-white/60 rounded-full p-2 transition-transform duration-500 -bottom-24"
        >
          {restart}
        </button>
      </div>
    </>
  );
}

function onRestart(setHistory, setXIsNext) {
  setHistory([Array(9).fill(null)]);
  setXIsNext("X");
}

function aiPlayer(squares, xIsNext, setXIsNext) {
  if (!squares.includes(null)) return;

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  setTimeout(() => {
    for (let [a, b, c] of lines) {
      if (!squares[4]) {
        squares[4] = "O";
        count++;
        setXIsNext(!xIsNext);
      } else if (
        squares[a] == "O" &&
        squares[a] === squares[b] &&
        !squares[c]
      ) {
        squares[c] = "O";
        count++;
        setXIsNext(!xIsNext);
      } else if (
        squares[a] == "O" &&
        squares[a] === squares[c] &&
        !squares[b]
      ) {
        squares[b] = "O";
        count++;
        setXIsNext(!xIsNext);
      } else if (
        squares[b] == "O" &&
        squares[b] === squares[c] &&
        !squares[a]
      ) {
        squares[a] = "O";
        count++;
        setXIsNext(!xIsNext);
      }
      if (count) return;
    }
    if (count) return;

    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && !squares[c]) {
        squares[c] = "O";
        count++;
        setXIsNext(!xIsNext);
      } else if (squares[a] && squares[a] === squares[c] && !squares[b]) {
        squares[b] = "O";
        count++;
        setXIsNext(!xIsNext);
      } else if (squares[b] && squares[b] === squares[c] && !squares[a]) {
        squares[a] = "O";
        count++;
        setXIsNext(!xIsNext);
      }
      if (count) return;
    }
    if (count) return;

    for (let [a, b, c] of lines) {
      if (squares[a] == "O" && !squares[b] && !squares[c]) {
        squares[b] = "O";
        count++;
        setXIsNext(!xIsNext);
      } else if (squares[c] == "O" && !squares[a] && !squares[b]) {
        squares[b] = "O";
        count++;
        setXIsNext(!xIsNext);
      } else if (squares[b] == "O" && !squares[c] && !squares[a]) {
        squares[a] = "O";
        count++;
        setXIsNext(!xIsNext);
      }
      if (count) return;
    }
    if (count) return;

    let randNum;
    do {
      randNum = Math.floor(Math.random() * (8 + 1));
    } while (squares[randNum]);
    squares[randNum] = "O";
    count++;
    setXIsNext(!xIsNext);
  }, 500);
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }

  return null;
}

function createSquares(squares, handleClick, winner) {
  let a, b, c;
  if (winner) {
    [a, b, c] = winner;
  }
  return squares.reduce((arr, value, index) => {
    arr.push(
      <Square
        key={index}
        bgColor={
          winner && (index == a || index == b || index == c)
            ? "bg-green-100 text-green-500"
            : "bg-white hover:bg-white/60"
        }
        value={squares[index]}
        onSquareClick={() => {
          handleClick(index);
        }}
      />
    );

    return arr;
  }, []);
}

export default Board;
