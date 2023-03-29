import { handleModalAnchorClick } from "../eventHandlers/handleModalAnchorClick";
import {
  addEvtListener,
  addStylesToElem,
  addTextToElem,
  appendElemToParent,
  elemCreator,
  pipe,
  removeStylesFromElem,
} from "./elementCreators";

/**
 * @description - displays the modal menu on click of the navbar burger. It also changes the burger icon to an 'x' icon and adds event listeners to the modal anchors to close the modal on click.
 * @function
 * @returns {void}
 */
function displayMenuModal(): void {
  const modalContainer =
    document.querySelector<HTMLDivElement>(".modal__container");

  if (modalContainer) {
    pipe(
      removeStylesFromElem(["display"]),
      addStylesToElem([["display", "visible"]])
    )(modalContainer);
  }

  // remove burger lines to be replaced with 'x' icon
  const navbarBurgerLines = document.querySelectorAll<HTMLDivElement>(
    ".navbar__burger__line"
  );
  if (navbarBurgerLines) {
    navbarBurgerLines.forEach((line) => {
      addStylesToElem([["display", "none"]])(line);
    });
  }

  // grab burger container to add 'x' icon and change the display to flex
  const navbarBurger =
    document.querySelector<HTMLDivElement>(".navbar__burger");
  if (navbarBurger) {
    // add 'x' icon
    pipe(
      addTextToElem("⛌"),
      appendElemToParent(navbarBurger)
    )(elemCreator("p")(["navbar__burger__x"]));

    // change display to flex
    pipe(
      removeStylesFromElem(["display"]),
      addStylesToElem([
        ["display", "flex"],
        ["justify-content", "center"],
        ["align-items", "center"],
      ])
    )(navbarBurger);
  }

  // add evt listeners to anchors to not display modal on click
  // and remove evt listeners on click to prevent memory leaks
  const modalAnchors =
    document.querySelectorAll<HTMLAnchorElement>(".modal__link");
  if (modalAnchors) {
    modalAnchors.forEach((anchor) => {
      addEvtListener("click")(handleModalAnchorClick)(anchor);
    });
  }
}

export { displayMenuModal };
