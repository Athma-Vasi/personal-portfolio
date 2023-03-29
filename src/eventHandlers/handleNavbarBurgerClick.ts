import { displayMenuModal } from "../functions/displayMenuModal";
import { removeMenuModal } from "../functions/removeMenuModal";

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
