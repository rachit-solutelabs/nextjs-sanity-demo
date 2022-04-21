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
  const size = 1;
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-row justify-start items-center">
      <MdSort
        size={`5rem`}
        className={`cursor-pointer ${
          show
            ? "text-black hover:text-gray-600"
            : "text-gray-600 hover:text-black"
        }`}
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
              size={`${5 * size}rem`}
              color="black"
              className={`rotate-180 -mr-[${2.2 * size}rem] -ml-[${
                1 * size
              }rem]`}
            />
            <div className="bg-black max-w-fit flex flex-row flex-wrap justify-center items-center z-10">
              <div
                className={`p-[${
                  1 * size
                }rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[${
                  0.5 * size
                }rem]`}
              >
                <FaSortAlphaDown color="gray" size={`${3 * size}rem`} />
              </div>
              <div
                className={`p-[${
                  1 * size
                }rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[${
                  0.5 * size
                }rem]`}
              >
                <FaSortAlphaDownAlt color="gray" size={`${3 * size}rem`} />
              </div>
              <div
                className={`p-[${0.75 * size}rem] py-[${
                  1.125 * size
                }rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[${
                  0.5 * size
                }rem]`}
              >
                <div className="flex flex-row justify-center items-center">
                  <FaCalendarDay color="gray" size={`${2.5 * size}rem`} />
                  <FaLongArrowAltDown
                    size={`${2 * size}rem`}
                    color="gray"
                    className={`-mx-[${0.5 * size}rem] mt-[${0.75 * size}rem]`}
                  />
                </div>
              </div>
              <div
                className={`p-[${0.75 * size}rem] py-[${
                  1.125 * size
                }rem] hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center gap-[${
                  0.5 * size
                }rem]`}
              >
                <div className="flex flex-row justify-center items-center">
                  <FaCalendarDay color="gray" size={`${2.5 * size}rem`} />
                  <FaLongArrowAltDown
                    size={`${2 * size}rem`}
                    color="gray"
                    className={`-mx-[${0.5 * size}rem] mt-[${
                      0.75 * size
                    }rem] rotate-180`}
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
