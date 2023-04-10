import Validator from "./classes/Validator";

export default function forms() {
  const elements = Array.from(
    document.querySelectorAll<HTMLFormElement>(".js-form")
  );
  elements.forEach((form) => {
    const validator = new Validator(form);
    form.addEventListener("submit", (event: SubmitEvent) => {
      validator.validate();
      if (!validator.valid) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
}
