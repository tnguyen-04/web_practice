// hero-section----------------------

let headerVideo = document.querySelector(".header--video");
let heroRightPlay = document.querySelector(".hero--right__btn");

headerVideo.addEventListener("click", () => {
  headerVideo.style.opacity = "0";
  headerVideo.style.visibility = "hidden";
  document.body.style.overflowY = "auto";
});

heroRightPlay.addEventListener("click", () => {
  headerVideo.style.opacity = "1";
  headerVideo.style.visibility = "visible";
  headerVideo.style.display = "flex";
  document.body.style.overflowY = "hidden";
});

let menuBar = document.querySelector(".menu--bars");
menuBar.addEventListener("click", () => {
  menuBar.classList.toggle("active");
});

let menuStruggling = document.querySelector(".menu--struggling");
let strugglingDropdown = document.querySelector(".struggling--dropdown");

menuStruggling.addEventListener("click", () => {
  if (menuBar.classList.contains("active")) {
    strugglingDropdown.classList.add("active");
  } else {
    strugglingDropdown.classList.remove("active");
  }
});

let wrapperCurriculumItems = document.querySelectorAll(
  ".wrapper--curriculum__item"
);
wrapperCurriculumItems.forEach((wrapperCurriculum) => {
  let inforDetail = wrapperCurriculum.querySelector(".item--close");

  let isRotated = false;

  wrapperCurriculum.addEventListener("click", () => {
    if (isRotated) {
      inforDetail.style.transform = "rotate(0deg)";
    } else {
      inforDetail.style.transform = "rotate(-45deg)";
    }
    isRotated = !isRotated;
    wrapperCurriculum.classList.toggle("active");
  });
});

// ===============nav=========
const navItems = document.querySelectorAll(".nav--item");
navItems.forEach((nav) => {
  nav.addEventListener("click", () => {
    navItems.forEach((item) => {
      item.classList.remove("active");
    });
    nav.classList.add("active");
  });
});

// ============================================
const elseSection = document.querySelector(".else--section");
const elseMenu = document.querySelector(".else--menu");
const amountScroll = 100;

let transformValue = 0;
let isDragging = false;
let startX, initialTransformX;

const checkViewportWidth = () => window.innerWidth >= 991.98;

elseSection.addEventListener("wheel", (e) => {
  if (!checkViewportWidth()) return;
  e.preventDefault();

  const menuWidth = elseMenu.scrollWidth;
  const visibleWidth = elseMenu.clientWidth;
  const maxScrollLeft = menuWidth - visibleWidth;

  if (e.deltaY > 0) {
    transformValue = Math.max(transformValue - amountScroll, -maxScrollLeft);
  } else {
    transformValue = Math.min(transformValue + amountScroll, 0);
  }

  elseMenu.style.transform = `translateX(${transformValue}px)`;
});

elseMenu.addEventListener("mousedown", (e) => {
  if (!checkViewportWidth()) return;
  isDragging = true;
  startX = e.pageX;

  const transformMatrix = window.getComputedStyle(elseMenu).transform;
  const matrixValues = new DOMMatrix(transformMatrix);
  initialTransformX = matrixValues.m41 || 0; // m41 là giá trị dịch chuyển theo trục X

  elseMenu.style.cursor = "grabbing";
});

elseMenu.addEventListener("mouseup", () => {
  if (!checkViewportWidth()) return;

  isDragging = false;
  elseMenu.style.cursor = "grab";
});

elseMenu.addEventListener("mouseleave", () => {
  if (!checkViewportWidth()) return;

  isDragging = false;
  elseMenu.style.cursor = "grab";
});

elseMenu.addEventListener("mousemove", (e) => {
  if (!checkViewportWidth() || !isDragging) return;

  e.preventDefault();

  const x = e.pageX;
  const walk = (x - startX) * 1.5;
  const newTransformX = initialTransformX + walk;

  const maxTransformX = 0;
  const minTransformX = -elseMenu.scrollWidth + elseMenu.clientWidth;
  const constrainedTransformX = Math.max(
    Math.min(newTransformX, maxTransformX),
    minTransformX
  );

  elseMenu.style.transform = `translateX(${constrainedTransformX}px)`;
});

// ========bonus=========

window.addEventListener("scroll", function () {
  const letters = document.querySelectorAll(".letter");
  const triggerPoint = window.innerHeight * 0.98;
  const bonusTitle = document.querySelector(".bonus--title");

  letters.forEach((letter, index) => {
    const letterPosition = letter.getBoundingClientRect().top;

    setTimeout(() => {
      if (letterPosition < triggerPoint) {
        setTimeout(() => {
          letter.classList.add("visible");
        }, index * 20);
        bonusTitle.classList.add("visible");
      } else {
        // Khi cuộn lên, các chữ quay lại trạng thái ban đầu
        letter.classList.remove("visible");
        bonusTitle.classList.remove("visible");
      }
    }, 200);
  });
});

// ==========carousel==========
const startUpPrev = document.querySelector(".arrow--prev");
const startUpNext = document.querySelector(".arrow--next");
const parentCarouselItems = document.querySelector(".carousel--container");
const carouselItems = Array.from(document.querySelectorAll(".carousel--item"));
const startUpDots = document.querySelectorAll(".startup--dot");
let itemWidth = carouselItems[0].offsetWidth; // Chiều rộng của mỗi item
let startPoint = 0;

function updateCarousel(index) {
  console.log("index " + index);
  console.log("start " + startPoint);

  if (index === startPoint) return;
  carouselItems[index].classList.add("active");
  let itemActive = carouselItems.filter((item) => {
    return item.classList.contains("active");
  });

  if (index > startPoint) {
    if (
      (itemActive.length === 3 &&
        carouselItems[3].classList.contains("active") &&
        carouselItems[0].classList.contains("active") &&
        index === 1 &&
        startPoint === 0) ||
      (itemActive.length === 3 &&
        carouselItems[3].classList.contains("active") &&
        carouselItems[0].classList.contains("active") &&
        index === 2 &&
        startPoint === 0) ||
      (itemActive.length === 3 &&
        carouselItems[2].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        index === 2 &&
        startPoint === 1)
    ) {
      console.log("if1");
      itemActive[2].classList.remove("active");
    }
    if (
      (itemActive.length === 3 &&
        carouselItems[1].classList.contains("active") &&
        carouselItems[2].classList.contains("active") &&
        index === 3 &&
        startPoint === 1) ||
      (itemActive.length === 3 &&
        carouselItems[1].classList.contains("active") &&
        carouselItems[0].classList.contains("active") &&
        index === 2 &&
        startPoint === 0) ||
      (itemActive.length === 3 &&
        carouselItems[0].classList.contains("active") &&
        carouselItems[1].classList.contains("active") &&
        index === 3 &&
        startPoint === 0) ||
      (itemActive.length === 3 &&
        carouselItems[0].classList.contains("active") &&
        carouselItems[2].classList.contains("active") &&
        index === 3 &&
        startPoint === 0)
    ) {
      console.log("if3");
      itemActive[1].classList.remove("active");
    }
    if (
      (itemActive.length === 3 &&
        carouselItems[0].classList.contains("active") &&
        carouselItems[2].classList.contains("active") &&
        index === 3 &&
        startPoint === 2) ||
      (itemActive.length === 3 &&
        carouselItems[0].classList.contains("active") &&
        carouselItems[1].classList.contains("active") &&
        index === 2 &&
        startPoint === 1) ||
      (itemActive.length === 3 &&
        carouselItems[0].classList.contains("active") &&
        carouselItems[1].classList.contains("active") &&
        index === 3 &&
        startPoint === 1) ||
      (itemActive.length === 3 &&
        carouselItems[1].classList.contains("active") &&
        carouselItems[2].classList.contains("active") &&
        index === 3 &&
        startPoint === 2)
    ) {
      console.log("if2");
      itemActive[0].classList.remove("active");
    }
  } else {
    if (
      (itemActive.length === 3 &&
        carouselItems[0].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        index === 1) ||
      (itemActive.length === 3 &&
        carouselItems[0].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        index === 2)
    ) {
      console.log("else1");
      itemActive[0].classList.remove("active");
    }
    if (
      (itemActive.length === 3 &&
        carouselItems[1].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        index === 2 &&
        startPoint === 3) ||
      (itemActive.length === 3 &&
        carouselItems[0].classList.contains("active") &&
        carouselItems[2].classList.contains("active") &&
        index === 1 &&
        startPoint === 2)
    ) {
      console.log("else2");
      itemActive[0].classList.remove("active");
    }
    if (
      (itemActive.length === 3 &&
        carouselItems[1].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        index === 0 &&
        startPoint === 1) ||
      (itemActive.length === 3 &&
        carouselItems[2].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        startPoint == 2 &&
        index === 1) ||
      (carouselItems[2].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        startPoint == 2 &&
        index === 0) ||
      (itemActive.length === 3 &&
        carouselItems[1].classList.contains("active") &&
        carouselItems[2].classList.contains("active") &&
        index === 0 &&
        startPoint === 1)
    ) {
      console.log("else3");
      itemActive[2].classList.remove("active");
    }
    if (
      (itemActive.length === 3 &&
        carouselItems[2].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        index == 1 &&
        startPoint == 3) ||
      (itemActive.length === 3 &&
        carouselItems[2].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        index == 0 &&
        startPoint == 3) ||
      (itemActive.length === 3 &&
        carouselItems[1].classList.contains("active") &&
        carouselItems[3].classList.contains("active") &&
        index === 0 &&
        startPoint === 3) ||
      (itemActive.length === 3 &&
        carouselItems[1].classList.contains("active") &&
        carouselItems[2].classList.contains("active") &&
        index === 0 &&
        startPoint === 2)
    ) {
      console.log("else4");

      itemActive[1].classList.remove("active");
    }
  }
  parentCarouselItems.style.transition = "1.5s";
  parentCarouselItems.style.transform = `translateX(-${itemWidth * index}px)`;

  startPoint = index;

  window.addEventListener("resize", () => {
    itemWidth = carouselItems[0].offsetWidth;
    parentCarouselItems.style.transform = `translateX(-${itemWidth * index}px)`;
  });
}

startUpDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    startUpDots.forEach((dotItem) => dotItem.classList.remove("active"));
    dot.classList.add("active");
    updateCarousel(index);
    startUpDots.forEach((dotItem) => {
      dotItem.style.pointerEvents = "none";
    });

    setTimeout(() => {
      startUpDots.forEach((dotItem) => {
        dotItem.style.pointerEvents = "auto";
      });
    }, 1200);
  });
});

// grab===========

// ===============================
startUpNext.addEventListener("click", () => {
  let nextIndex = (startPoint + 1) % carouselItems.length;
  startUpDots.forEach((dot) => dot.classList.remove("active"));
  startUpDots[nextIndex].classList.add("active");
  updateCarousel(nextIndex);
  startUpNext.style.pointerEvents = "none";
  setTimeout(() => {
    startUpNext.style.pointerEvents = "auto";
  }, 1200);
});
startUpPrev.addEventListener("click", () => {
  let prevIndex = (startPoint - 1) % carouselItems.length;
  if (prevIndex < 0) {
    prevIndex = 3;
  }
  startUpDots.forEach((dot) => dot.classList.remove("active"));
  startUpDots[prevIndex].classList.add("active");
  updateCarousel(prevIndex);
  startUpPrev.style.pointerEvents = "none";
  setTimeout(() => {
    startUpPrev.style.pointerEvents = "auto";
  }, 1000);
});

let wrapperVideo = document.querySelector(".startup--wrapper__video");
let carouselBtn = document.querySelectorAll(".carousel--btn");
let startupVideo = document.querySelectorAll(".startup--video");

wrapperVideo.addEventListener("click", () => {
  wrapperVideo.classList.remove("active");
  startupVideo[startPoint].classList.remove("active");
  document.body.style.overflowY = "auto";
});

carouselBtn.forEach((btnPlay) => {
  btnPlay.addEventListener("click", () => {
    wrapperVideo.classList.add("active");
    startupVideo[startPoint].classList.add("active");
    document.body.style.overflowY = "hidden";
  });
});

// ========areyou============
const areYou = document.querySelectorAll(".areyou--item__top");
const areYouContainer = document.querySelectorAll(".areyou--item");

const areYouBtn = document.querySelectorAll(".areyou--item__btn");

areYou.forEach((item, index) => {
  item.addEventListener("click", () => {
    areYouBtn[index].classList.toggle("active");
    areYouContainer[index].classList.toggle("active");
  });
});

// =======guarantee=====
window.addEventListener("scroll", function () {
  const letters = document.querySelectorAll(".single--letter");
  const triggerPoint = window.innerHeight * 0.98;
  const guaranteeTitle = document.querySelector(".guarantee--letters");

  const words = document.querySelectorAll(".met--single");
  const metTitle = document.querySelector(".met--animaiton");
  const metImg = document.querySelector(".met--img__right");
  const imgTrigger = metImg.getBoundingClientRect().top;

  if (imgTrigger < triggerPoint) {
    metImg.classList.add("active");
  } else {
    metImg.classList.remove("active");
  }
  letters.forEach((letter, index) => {
    const letterPosition = letter.getBoundingClientRect().top;

    setTimeout(() => {
      if (letterPosition < triggerPoint) {
        setTimeout(() => {
          letter.classList.add("active");
        }, index * 20);
        guaranteeTitle.classList.add("active");
      } else {
        letter.classList.remove("active");
        guaranteeTitle.classList.remove("active");
      }
    }, 200);

    words.forEach((word, index) => {
      const letterPosition = word.getBoundingClientRect().top;

      setTimeout(() => {
        if (letterPosition < triggerPoint) {
          setTimeout(() => {
            word.classList.add("active");
          }, index * 60);
          metTitle.classList.add("active");
        } else {
          word.classList.remove("active");
          metTitle.classList.remove("active");
        }
      }, 200);
    });
  });
});

// =======met==============
// window.addEventListener("scroll", function () {
//   const words = document.querySelectorAll(".met--single");
//   const triggerPoint = window.innerHeight * 0.98;
//   const metTitle = document.querySelector(".met--animaiton");

//   words.forEach((word, index) => {
//     const letterPosition = word.getBoundingClientRect().top;

//     setTimeout(() => {
//       if (letterPosition < triggerPoint) {
//         setTimeout(() => {
//           word.classList.add("active");
//         }, index * 60);
//         metTitle.classList.add("active");
//       } else {
//         word.classList.remove("active");
//         metTitle.classList.remove("active");
//       }
//     }, 200);
//   });
// });

// ==========tickclose=====
window.addEventListener("scroll", function () {
  const tickCloseAnimation = document.querySelector(
    ".tickclose--wrapper__titleLeft"
  );
  const triggerPoint = window.innerHeight * 1;
  const letterPosition = tickCloseAnimation.getBoundingClientRect().top;

  setTimeout(() => {
    if (letterPosition < triggerPoint) {
      tickCloseAnimation.classList.add("active");
    } else {
      tickCloseAnimation.classList.remove("active");
    }
  }, 300);
});

// ===========ready---------
const readyContainer = document.querySelector(".ready--container");
const readyBtn = document.querySelector(".ready--btn");

readyBtn.addEventListener("click", (e) => {
  e.stopPropagation();
});

readyContainer.addEventListener("click", () => {
  readyContainer.classList.toggle("active");
});

// ============literally=======
window.addEventListener("scroll", function () {
  const circle = document.querySelector(".circle--word");
  const triggerPoint = window.innerHeight * 0.85;
  const circlePosition = circle.getBoundingClientRect().top;

  if (circlePosition < triggerPoint) {
    circle.classList.add("active");
  } else {
    circle.classList.remove("active");
  }
});

// =========fags======
const fagsDropdown = document.querySelectorAll(".fags--wrapper__item");
const fagsBtn = document.querySelectorAll(".fags--btn");
const fagsDesc = document.querySelectorAll(".fags--wrapper__desc");

fagsDropdown.forEach((el, index) => {
  el.addEventListener("click", () => {
    el.classList.toggle("active");
    fagsBtn[index].classList.toggle("active");
    fagsDesc[index].classList.toggle("hidden");
  });
});

// ============show====
const showSelect = document.querySelectorAll(".show--title");
const showWrapperImg = document.querySelectorAll(".show--wrapper__img");

showSelect.forEach((element, index) => {
  element.addEventListener("mouseover", () => {
    showWrapperImg[index].classList.add("active");
  });

  element.addEventListener("mouseout", () => {
    showWrapperImg[index].classList.remove("active");
  });
});
