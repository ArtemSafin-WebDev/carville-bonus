export default function showPassword() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".js-show-password")
  );
  elements.forEach((element) => {
    const input =
      element.parentElement?.querySelector<HTMLInputElement>("input");
    if (!input) return;
    const originalType = input.type;
    let shown = false;
    element.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      if (shown) {
        element.classList.remove("active");
        input.type = originalType;
        shown = false;
      } else {
        element.classList.add("active");
        input.type = "text";
        shown = true;
      }
    });
  });
}
