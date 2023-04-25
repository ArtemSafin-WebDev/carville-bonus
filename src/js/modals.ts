const closeAllModals = () => {
  const modals = document.querySelectorAll<HTMLElement>(".js-modal");
  modals.forEach((modal) => modal.classList.remove("active"));
  document.body.classList.remove("modal-open");
};

const openModal = (hash: string) => {
  const modal = document.querySelector<HTMLElement>(`.js-modal${hash}`);
  if (!modal) return;
  closeAllModals();
  modal.classList.add("active");
  document.body.classList.add("modal-open");
};

document.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.matches(".js-close-modal") || target.closest(".js-close-modal")) {
    event.preventDefault();
    closeAllModals();
    return;
  }

  if (target.matches(".js-modal")) {
    event.preventDefault();
    closeAllModals();
    return;
  }
});

export default function modals() {
  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.matches("a") || target.closest("a")) {
      const link = target.matches("a") ? target : target.closest("a");
      if (link instanceof HTMLAnchorElement) {
        const hash = link?.hash;
        if (!hash) return;
        console.log("Hash", hash);
        event.preventDefault();
        openModal(hash);
      }
    }
  });
}

export { closeAllModals, openModal };
