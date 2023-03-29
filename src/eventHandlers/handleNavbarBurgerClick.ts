import { displayMenuModal } from "../functions/displayMenuModal";
import { removeMenuModal } from "../functions/removeMenuModal";

/**
 * Handles the click event on the navbar burger. It toggles the is-active class on the navbar burger and displays the menu modal.
 * @function
 * @param {HTMLDivElement} this - The navbar burger.
 * @param {Event} _event - The click event.
 * @returns {void}
 */
function handleNavbarBurgerClick(this: HTMLDivElement, _event: Event): void {
  this.classList.toggle("is-active");
  const isBurgerClicked = this.classList.contains("is-active");

  if (isBurgerClicked) {
    displayMenuModal();
  } else {
    removeMenuModal();
  }
}

export { handleNavbarBurgerClick, removeMenuModal };
