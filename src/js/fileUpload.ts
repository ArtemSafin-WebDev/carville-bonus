function initFileUpload(context = document.documentElement) {
  const elements = Array.from(context.querySelectorAll(".js-file-upload"));

  elements.forEach((element) => {
    const input = element.querySelector<HTMLInputElement>('input[type="file"]');
    const label = element.querySelector<HTMLLabelElement>(
      ".js-file-upload-text"
    );
    const form = element.closest<HTMLFormElement>("form");
    if (!input) return;

    input.addEventListener("change", () => {
      if (input.files?.length) {
        element.classList.add("file-loaded");
        if (label) {
          label.textContent = input.files[0].name;
        }
      }
    });

    input.addEventListener("dragenter", () => {
      element.classList.add("dragged");
    });
    input.addEventListener("dragend", () => {
      element.classList.remove("dragged");
    });
    input.addEventListener("dragleave", () => {
      element.classList.remove("dragged");
    });
    input.addEventListener("drop", () => {
      element.classList.remove("dragged");
    });

    if (form) {
      form.addEventListener("reset", () => {
        input.value = "";

        element.classList.remove("file-loaded");
        element.classList.remove("dragged");
      });
    }
  });
}

export default initFileUpload;
