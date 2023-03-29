import { removeMenuModal } from "../functions/removeMenuModal";

/**
 * Handles the click event on the main element. This is used to close the menu modal when the user clicks outside of the menu modal.
 * @event click
 * @param {HTMLElement} this - Main html element.
 * @param {Event} _event - The click event.
 * @returns {void}
 */
function handleMainElementClick(this: HTMLElement, _event: Event): void {
  // remove modal display
  removeMenuModal();

  // toggle classlist for navbar burger
  const navbarBurger =
    document.querySelector<HTMLDivElement>(".navbar__burger");
  if (navbarBurger) {
    navbarBurger.classList.toggle("is-active");
  }
}

export { handleMainElementClick };
