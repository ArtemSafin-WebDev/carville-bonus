import "virtual:svg-icons-register";
import "../css/style.css";
import menu from "./menu";
import showPassword from "./showPassword";
import forms from "./forms";
import selects from "./selects";
import multistepForm from "./multistepForm";
import profile from "./profile";
import modals from "./modals";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello world");
  menu();
  showPassword();
  forms();
  selects();
  multistepForm();
  profile();
  modals();
});
