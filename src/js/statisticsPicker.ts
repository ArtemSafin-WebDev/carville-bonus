import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

export default function statisticsPicker() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-statistics-picker")
  );

  elements.forEach((element) => {
    const input = element.querySelector("input");
    if (!input) return;

    new AirDatepicker(input, {
      view: "months",
      minView: "months",
      dateFormat: "MMMM yyyy",
      autoClose: true,
      range: true,
      selectedDates: [new Date()],
      multipleDatesSeparator: " - ",
    });
  });
}
