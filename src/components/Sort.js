import { useEffect, useState } from "react";
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaCalendarDay,
  FaLongArrowAltDown,
} from "react-icons/fa";
import { MdPlayArrow, MdSort } from "react-icons/md";
import { Transition } from "react-transition-group";
import { transitionsLeft } from "../utils/Transitions";

const Sort = ({ data, setSortedData }) => {
  // const size = 1;
  const [show, setShow] = useState(false);
  const [sortMethod, setSortMethod] = useState("none");

  useEffect(() => setSortMethod(localStorage.getItem("sortMethod")), []);

  useEffect(() => {
    const data2 = [...data];
    if (sortMethod === "ascending") {
      data2.sort((a, b) => (a.title > b.title ? 1 : -1));
    }
    if (sortMethod === "descending") {
      data2.sort((a, b) => (a.title < b.title ? 1 : -1));
    }
    if (sortMethod === "oldest") {
      data2.sort((a, b) => (a.releaseDate > b.releaseDate ? 1 : -1));
    }
    if (sortMethod === "latest") {
      data2.sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1));
    }
    setSortedData(data2);
    localStorage.setItem("sortMethod", sortMethod);
  }, [sortMethod, data, setSortedData]);

  return (
    <div className="flex flex-row justify-start items-center">
      <MdSort
        size={`5rem`}
        className={`cursor-pointer ${
          show
            ? "text-black hover:text-gray-600"
            : "text-gray-600 hover:text-black"
        } transition-all duration-200`}
        onClick={() => setShow((s) => !s)}
      />
      <Transition in={show} timeout={100}>
        {(state) => (
          <div
            style={{
              transition: "all .2s",
              transform: "scale(0)",
              display: "flex",
              ...transitionsLeft[state],
            }}
            className="flex flex-row w-full justify-start items-center origin-left"
          >
            <MdPlayArrow
              size={`5rem`}
              color="black"
              className={`rotate-180 -mr-[2.2rem] -ml-[1rem]`}
            />
            <div className="bg-black max-w-fit flex flex-row flex-wrap justify-center items-center z-10">
              <div
                onClick={() =>
                  sortMethod === "ascending"
                    ? setSortMethod("none")
                    : setSortMethod("ascending")
                }
                className={`p-[1rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[0.5rem] transition-all duration-200 ${
                  sortMethod === "ascending"
                    ? "p-[14px] border-2 border-orange-600"
                    : ""
                }`}
              >
                <FaSortAlphaDown size={`3rem`} color="gray" />
              </div>
              <div
                onClick={() =>
                  sortMethod === "descending"
                    ? setSortMethod("none")
                    : setSortMethod("descending")
                }
                className={`p-[1rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[0.5rem] transition-all duration-200 ${
                  sortMethod === "descending"
                    ? "p-[14px] border-2 border-orange-600"
                    : ""
                }`}
              >
                <FaSortAlphaDownAlt size={`3rem`} color="gray" />
              </div>
              <div
                onClick={() =>
                  sortMethod === "oldest"
                    ? setSortMethod("none")
                    : setSortMethod("oldest")
                }
                className={`p-[0.75rem] py-[1.125rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[0.5rem] transition-all duration-200 ${
                  sortMethod === "oldest"
                    ? "p-[10px] py-[16px] border-2 border-orange-600"
                    : ""
                }`}
              >
                <div className="flex flex-row justify-center items-center">
                  <FaCalendarDay size={`2.5rem`} color="gray" />
                  <FaLongArrowAltDown
                    size={`2rem`}
                    color="gray"
                    className={`-mx-[0.5rem] mt-[0.75rem]`}
                  />
                </div>
              </div>
              <div
                onClick={() =>
                  sortMethod === "latest"
                    ? setSortMethod("none")
                    : setSortMethod("latest")
                }
                className={`p-[0.75rem] py-[1.125rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[0.5rem] transition-all duration-200 ${
                  sortMethod === "latest"
                    ? "p-[10px] py-[16px] border-2 border-orange-600"
                    : ""
                }`}
              >
                <div className="flex flex-row justify-center items-center">
                  <FaCalendarDay size={`2.5rem`} color="gray" />
                  <FaLongArrowAltDown
                    size={`2rem`}
                    color="gray"
                    className={`-mx-[0.5rem] mt-[0.75rem] rotate-180`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};
export default Sort;
