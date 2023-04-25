import "virtual:svg-icons-register";

import menu from "./menu";
import showPassword from "./showPassword";
import forms from "./forms";
import selects from "./selects";
import multistepForm from "./multistepForm";
import profile from "./profile";
import modals from "./modals";
import tableSlider from "./tableSlider";
import accordions from "./accordions";
import buyPicker from "./buyPicker";

import "../css/style.css";
import statisticsPicker from "./statisticsPicker";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello world");
  menu();
  showPassword();
  forms();
  selects();
  multistepForm();
  profile();
  modals();
  tableSlider();
  accordions();
  buyPicker();
  statisticsPicker();
});
