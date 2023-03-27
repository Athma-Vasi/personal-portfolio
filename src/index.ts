import { handleMainElementClick } from "./eventHandlers/handleMainElementClick";
import {
  handleNavbarBurgerClick,
  removeMenuModal,
} from "./eventHandlers/handleNavbarBurgerClick";
import { handleWindowScroll } from "./eventHandlers/handleWindowScroll";
import { addEvtListener } from "./functions/elementCreators";

async function mainApp() {
  // remove modal display on page load
  removeMenuModal();

  // add event listener to navbar burger
  const navbarBurger = document.querySelector<HTMLElement>(".navbar__burger");
  if (navbarBurger) {
    addEvtListener("click")(handleNavbarBurgerClick)(navbarBurger);
  }

  // add event listener to main to remove modal display on click
  const main = document.querySelector<HTMLElement>(".main");
  if (main) {
    addEvtListener("click")(handleMainElementClick)(main);
  }

  // add event listener to window to display header on scroll up and hide on scroll down
  window.addEventListener("scroll", handleWindowScroll);
}

document.addEventListener("DOMContentLoaded", mainApp);
