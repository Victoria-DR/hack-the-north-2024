const mod = (k, n) => {
  let res = k % n;
  if (res < 0) {
    return res + n;
  } else {
    return res;
  }
};

const CarousselPane = ({ children, id, numPanes, activePane }) => {
  let style;
  // Active pane
  if (id == activePane) {
    style = "opacity-100 scale-100 z-20 bg-white";

    // Left inactive
  } else if (id == mod(activePane - 1, numPanes)) {
    style = "translate-x-3/4 opacity-90 scale-75 duration-500 z-10 bg-violet-200";

    // Right inactive
  } else if (id == mod(activePane + 1, numPanes)) {
    style = "-translate-x-3/4 opacity-90 scale-75 duration-500 z-10 bg-violet-200";

    // default
  } else {
    style = "opacity-100 opacity-30 scale-50 z-0";
  }

  return (
      <div
        className={`absolute t-0 r-0 b-0 l-0 m-auto h-5/6 w-2/5 max-w-3xl p-3
      duration-500 ${style}`}
      >
        <div>
            <div
            className="w-full p-8 text-black h-fit lg:h-full sm:p-11 bg-gradient-to-b"
            >
            {children}

            <div classname="w-3/4 h-20 text-white bg-black align-center">
                Debate THIS IS white
            </div>
            </div>
        </div>
      </div>
  );
};

export default CarousselPane;