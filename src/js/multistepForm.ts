import Validator from "./classes/Validator";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

export default function multistepForm() {
  const elements = Array.from(
    document.querySelectorAll<HTMLFormElement>(".js-multistep-form")
  );
  elements.forEach((form) => {
    let activeIndex = 0;
    const validators: Validator[] = [];
    const tabs = Array.from<HTMLElement>(
      form.querySelectorAll(".auth__form-tab")
    );
    const bullets = Array.from<HTMLElement>(
      form.querySelectorAll(".auth__form-pagination-bullet")
    );
    const btnLayers = Array.from<HTMLFormElement>(
      form.querySelectorAll(".auth__form-btn-layer")
    );

    const nextBtns = Array.from(
      form.querySelectorAll<HTMLButtonElement>(".js-next-btn")
    );
    const prevBtns = Array.from(
      form.querySelectorAll<HTMLButtonElement>(".js-prev-btn")
    );

    tabs.forEach((tab) => {
      validators.push(new Validator(form, tab));
    });

    const setActiveIndex = (index: number, initial = false) => {
      let state = null;
      let btnsState = Flip.getState(".auth__form-btn-layers");

      if (window.matchMedia("(max-width: 640px)").matches) {
        state = Flip.getState(".auth__form-mobile-wrapper");
      } else {
        state = Flip.getState(".auth__card");
      }
      tabs.forEach((tab) => tab.classList.remove("active"));
      bullets.forEach((bullet) => bullet.classList.remove("active"));
      btnLayers.forEach((layer) => layer.classList.remove("active"));

      tabs[index]?.classList.add("active");
      bullets[index]?.classList.add("active");
      btnLayers[index]?.classList.add("active");

      activeIndex = index;

      if (!initial) {
        Flip.from(state, {
          ease: "power1.inOut",
          duration: 0.4,
          simple: true,
        });
        Flip.from(btnsState, {
          ease: "power1.inOut",
          duration: 0.4,
          nested: true,
          simple: true,
        });
      }
    };

    const validateCurrentTab = () => {
      const currentTabValidator = validators[activeIndex];
      if (!currentTabValidator) return;
      currentTabValidator.validate();
      return currentTabValidator.valid;
    };

    if (tabs.length) {
      setActiveIndex(activeIndex, true);
    }

    const prev = () => {
      if (activeIndex < 1) return;
      setActiveIndex(activeIndex - 1);
    };

    const next = () => {
      if (activeIndex === tabs.length - 1) return;
      const currentTabIsValid = validateCurrentTab();
      if (currentTabIsValid) {
        setActiveIndex(activeIndex + 1);
      }
    };

    prevBtns.forEach((btn) =>
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        prev();
      })
    );

    nextBtns.forEach((btn) =>
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        next();
      })
    );

    form.addEventListener("submit", (event: SubmitEvent) => {
      validators.forEach((validator) => validator.validate());
      if (!validators.every((validator) => validator.valid)) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
}
