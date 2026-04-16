import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function accordions() {
  const SPEED = 0.3;
  const accordions = Array.from(
    document.querySelectorAll<HTMLElement>(".js-accordion")
  );

  const syncA11yState = (element: HTMLElement, isActive: boolean) => {
    const content = element.querySelector<HTMLElement>(".js-accordion-content");
    const btn = element.querySelector<HTMLElement>(".js-accordion-btn");

    if (!content || !btn) return;

    btn.setAttribute("aria-expanded", String(isActive));
    content.setAttribute("aria-hidden", String(!isActive));
  };

  const openAccordion = (element: HTMLElement) => {
    gsap.to(element, {
      height: "auto",
      duration: SPEED,
      onComplete: () => ScrollTrigger.refresh(),
    });
  };
  const closeAccordion = (element: HTMLElement) => {
    gsap.to(element, {
      height: 0,
      duration: SPEED,
      onComplete: () => ScrollTrigger.refresh(),
    });
  };

  accordions.forEach((element) => {
    const content = element.querySelector<HTMLElement>(".js-accordion-content");
    const isActive = element.classList.contains("active");

    if (content) {
      content.style.height = isActive ? "auto" : "0px";
    }

    syncA11yState(element, isActive);
  });

  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      target.matches(".js-accordion-btn") ||
      target.closest(".js-accordion-btn")
    ) {
      const btn = target.matches(".js-accordion-btn")
        ? target
        : target.closest(".js-accordion-btn");
      if (!btn) return;
      const element = btn.closest<HTMLElement>(".js-accordion")!;
      const content = element.querySelector<HTMLElement>(
        ".js-accordion-content"
      )!;
      const elements: HTMLElement[] = Array.from(
        document.querySelectorAll(".js-accordion")
      );

      event.preventDefault();

      if (element.hasAttribute("data-close-other")) {
        elements.forEach((otherElement) => {
          if (otherElement !== element) {
            if (otherElement.classList.contains("active")) {
              const content = otherElement.querySelector<HTMLElement>(
                ".js-accordion-content"
              )!;
              closeAccordion(content);
              otherElement.classList.remove("active");
              syncA11yState(otherElement, false);
            }
          }
        });
      }

      if (element.classList.contains("active")) {
        closeAccordion(content);
        syncA11yState(element, false);
      } else {
        openAccordion(content);
        syncA11yState(element, true);
      }
      element.classList.toggle("active");
    }
  });
}
