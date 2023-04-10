export default function menu() {
  const burger = document.querySelector<HTMLButtonElement>(
    ".page-header__burger"
  );

  if (burger) {
    burger.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      document.body.classList.toggle("menu-open");
    });
  }
}
