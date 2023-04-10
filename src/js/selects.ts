import Select from "./classes/Select";

export default function selects() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".js-select")
  );
  elements.forEach((element) => new Select(element));
}
