import { removeEvtListener } from "../functions/elementCreators";
import { removeMenuModal } from "./handleNavbarBurgerClick";

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
