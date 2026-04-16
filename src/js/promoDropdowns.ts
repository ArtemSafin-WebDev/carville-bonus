export default function promoDropdowns() {
  const CLOSE_DURATION = 250;
  const dropdowns = Array.from(
    document.querySelectorAll<HTMLElement>(".js-promo-dropdown")
  );
  const closeTimers = new WeakMap<HTMLElement, number>();

  if (!dropdowns.length) return;

  const clearCloseTimer = (dropdown: HTMLElement) => {
    const timerId = closeTimers.get(dropdown);

    if (timerId) {
      window.clearTimeout(timerId);
      closeTimers.delete(dropdown);
    }
  };

  const closeDropdown = (dropdown: HTMLElement) => {
    const button = dropdown.querySelector<HTMLElement>(
      ".js-promo-dropdown-button"
    );
    const panel = dropdown.querySelector<HTMLElement>(".js-promo-dropdown-panel");

    if (!button || !panel) return;

    if (
      !dropdown.classList.contains("active") &&
      !dropdown.classList.contains("closing")
    ) {
      return;
    }

    clearCloseTimer(dropdown);

    dropdown.classList.remove("active");
    dropdown.classList.add("closing");
    button.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");

    const timerId = window.setTimeout(() => {
      dropdown.classList.remove("closing");
      closeTimers.delete(dropdown);
    }, CLOSE_DURATION);

    closeTimers.set(dropdown, timerId);
  };

  const openDropdown = (dropdown: HTMLElement) => {
    const button = dropdown.querySelector<HTMLElement>(
      ".js-promo-dropdown-button"
    );
    const panel = dropdown.querySelector<HTMLElement>(".js-promo-dropdown-panel");

    if (!button || !panel) return;

    clearCloseTimer(dropdown);

    dropdown.classList.remove("closing");
    dropdown.classList.add("active");
    button.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
  };

  const closeAll = () => {
    dropdowns.forEach(closeDropdown);
  };

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector<HTMLButtonElement>(
      ".js-promo-dropdown-button"
    );

    if (!button) return;

    button.addEventListener("click", (event) => {
      event.preventDefault();

      const isActive = dropdown.classList.contains("active");

      closeAll();

      if (!isActive) {
        openDropdown(dropdown);
      }
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.closest(".js-promo-dropdown")) return;

    closeAll();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAll();
    }
  });
}
