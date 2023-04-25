import Swiper, { FreeMode } from "swiper";
import "swiper/css";

export default function tableSlider() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-table-slider")
  );

  elements.forEach((element) => {
    const config = { attributes: false, childList: true, subtree: true };
    const container = element.querySelector<HTMLElement>(".swiper");

    if (!container) return;
    const instance = new Swiper(container, {
      modules: [FreeMode],
      slidesPerView: "auto",
      spaceBetween: 0,
      freeMode: true,
    });

    const callback: MutationCallback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          instance.update();
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(element, config);
  });
}
