import { useState } from "react";
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaCalendarDay,
  FaLongArrowAltDown,
} from "react-icons/fa";
import { MdPlayArrow, MdSort } from "react-icons/md";
import { Transition } from "react-transition-group";
import { transitionsLeft } from "../utils/Transitions";

const Sort = () => {
  // const size = 1;
  const [show, setShow] = useState(false);

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
                className={`p-[1rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[0.5rem] transition-all duration-200`}
              >
                <FaSortAlphaDown size={`3rem`} color="gray" />
              </div>
              <div
                className={`p-[1rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[0.5rem] transition-all duration-200`}
              >
                <FaSortAlphaDownAlt size={`3rem`} color="gray" />
              </div>
              <div
                className={`p-[0.75rem] py-[1.125rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[0.5rem] transition-all duration-200`}
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
                className={`p-[0.75rem] py-[1.125rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[0.5rem] transition-all duration-200`}
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
