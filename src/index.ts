import localforage from "localforage";

import { handleMainElementClick } from "./eventHandlers/handleMainElementClick";
import {
  handleNavbarBurgerClick,
  removeMenuModal,
} from "./eventHandlers/handleNavbarBurgerClick";
import { handleWindowScroll } from "./eventHandlers/handleWindowScroll";
import { addEvtListener } from "./functions/elementCreators";

/**
 * Main app function. This function is called after the DOM is loaded. It is responsible for adding event listeners to the navbar burger and the main element, adding an event listener to the window to display the header on scroll up and hide on scroll down, and removing the modal display on page load. Finally, it deletes localforage keys upon page exit.
 * @function
 * @async
 * @returns {Promise<void>}
 */
async function mainApp(): Promise<void> {
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

  // delete localforage keys upon page exit
  window.addEventListener("beforeunload", () => {
    localforage.removeItem("previousScrollPosition");
  });
}

document.addEventListener("DOMContentLoaded", mainApp);
