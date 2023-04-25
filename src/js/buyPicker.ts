import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

export default function buyPicker() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-buy-picker")
  );

  elements.forEach((element) => {
    const input = element.querySelector("input");
    if (!input) return;

    new AirDatepicker(input, {
      view: "months",
      minView: "months",
      dateFormat: "MMMM yyyy",
      autoClose: true,
      selectedDates: [new Date()],
    });
  });
}
