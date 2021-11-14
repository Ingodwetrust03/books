"use strict";

import { animate } from "./helpers";

const filterBlockOptions = document.querySelector(".filter-option");
let screenWidth = window.screen.width;

const asideBlock = () => {
  const startAnim = () => {
    animate({
      duration: 700,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        if (screenWidth <= 1400) {
          filterBlockOptions.style.left = "0%";
        } else {
          filterBlockOptions.style.left = 365 * progress + "px";
        }

        filterBlockOptions.style.opacity = progress;
      },
    });
  };

  const stopAnim = () => {
    filterBlockOptions.style.left = "";
    filterBlockOptions.style.opacity = 0;
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches("h3")) {
      startAnim();
    } else {
      stopAnim();
    }
  });
};

export default asideBlock;
