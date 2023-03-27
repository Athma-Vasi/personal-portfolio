import { addStylesToElem, pipe, removeStylesFromElem } from "./elementCreators";

function removeMenuModal(): void {
  const modalContainer =
    document.querySelector<HTMLDivElement>(".modal__container");

  if (modalContainer) {
    pipe(
      removeStylesFromElem(["display"]),
      addStylesToElem([["display", "none"]])
    )(modalContainer);
  }

  // remove 'x' icon to be replaced with burger lines
  const navbarBurgerX =
    document.querySelector<HTMLParagraphElement>(".navbar__burger__x");
  if (navbarBurgerX) navbarBurgerX.remove();

  // grab burger container to change the display to block
  const navbarBurger =
    document.querySelector<HTMLDivElement>(".navbar__burger");
  if (navbarBurger) {
    // change display to block and remove flex properties
    pipe(
      removeStylesFromElem(["display", "justify-content", "align-items"]),
      addStylesToElem([["display", "block"]])
    )(navbarBurger);
  }

  // display burger lines again
  const navbarBurgerLines = document.querySelectorAll<HTMLDivElement>(
    ".navbar__burger__line"
  );
  if (navbarBurgerLines) {
    navbarBurgerLines.forEach((line) => {
      pipe(
        removeStylesFromElem(["display"]),
        addStylesToElem([["display", "visible"]])
      )(line);
    });
  }
}

export { removeMenuModal };
