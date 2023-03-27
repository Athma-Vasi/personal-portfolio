import { removeMenuModal } from "../functions/removeMenuModal";

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
