import Validator from "./classes/Validator";
import initFileUpload from "./fileUpload";

export default function profile() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".profile")
  );

  elements.forEach((element) => {
    const form = element.querySelector<HTMLFormElement>("form")!;
    if (!form) return;
    const addAddress =
      element.querySelector<HTMLButtonElement>(".js-add-address");
    let validator = new Validator(form);
    initFileUpload();

    addAddress?.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      const addressBlocks = Array.from(
        element.querySelectorAll<HTMLElement>(".profile__form-address-block")
      );
      const lastAddressBlock = addressBlocks[0];

      const newAddressBlock = lastAddressBlock.cloneNode(true) as HTMLElement;
      const inputs = Array.from(
        newAddressBlock.querySelectorAll<HTMLInputElement>("input")
      );

      inputs.forEach((input) => {
        input.value = "";
        input.name = input.name + "-" + (addressBlocks.length + 1);
      });

      const fileUploads = Array.from(
        newAddressBlock.querySelectorAll<HTMLElement>(".profile__form-file")
      );

      fileUploads.forEach((upload) => {
        upload.classList.remove("file-loaded");
        const name = upload.querySelector<HTMLElement>(
          ".profile__form-file-name"
        );
        if (name) {
          name.textContent = "";
        }
      });

      lastAddressBlock.parentElement?.append(newAddressBlock);

      initFileUpload(newAddressBlock);
      validator.destroy();
      validator = new Validator(form);
    });

    form?.addEventListener("submit", (event: SubmitEvent) => {
      validator.validate();
      if (!validator.valid) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
}
