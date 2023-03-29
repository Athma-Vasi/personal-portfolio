import { removeEvtListener } from "../functions/elementCreators";
import { removeMenuModal } from "./handleNavbarBurgerClick";

/**
 * Handles the click event on the anchor links in the modal menu. Removes the modal menu and removes the event listeners from the anchor links. This prevents memory leaks.
 * @event click
 * @param {HTMLAnchorElement} this - The anchor element that was clicked
 * @param {Event} _event - The click event
 * @returns {void}
 */
function handleModalAnchorClick(this: HTMLAnchorElement, _event: Event): void {
  // remove modal display
  removeMenuModal();

  // removes event listeners from anchor links to prevent memory leaks
  const modalAnchors =
    document.querySelectorAll<HTMLAnchorElement>(".modal__link");

  if (modalAnchors) {
    modalAnchors.forEach((anchor) => {
      removeEvtListener("click")(handleModalAnchorClick)(anchor);
    });
  }
}

export { handleModalAnchorClick };
