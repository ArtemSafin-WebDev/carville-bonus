import "virtual:svg-icons-register";
import "../css/style.css";
import menu from "./menu";
import showPassword from "./showPassword";
import forms from "./forms";
import selects from "./selects";
import multistepForm from "./multistepForm";

document.addEventListener("DOMContentLoaded", () => {
  menu();
  showPassword();
  forms();
  selects();
  multistepForm();
});
