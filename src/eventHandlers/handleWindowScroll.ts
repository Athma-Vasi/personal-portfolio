import localforage from "localforage";

import {
  addClassesToElem,
  removeClassesFromElem,
} from "../functions/elementCreators";
import { removeMenuModal } from "./handleNavbarBurgerClick";

/**
 * @description Handles window scroll event. Displays header on scroll up and hides on scroll down. Stores current scroll position in localforage.
 * @function handleWindowScroll
 * @param {Window} this - window object
 * @param {Event} _event - window scroll event
 * @returns {Promise<void>} - void
 */
async function handleWindowScroll(this: Window, _event: Event): Promise<void> {
  // grab previous scroll position from localforage
  let previousScrollPosition: number | null = null;
  try {
    previousScrollPosition = await localforage.getItem<number>(
      "previousScrollPosition"
    );
  } catch (error: any) {
    const error_ = new Error(error, {
      cause: "Error getting previousScrollPosition from localforage",
    });

    console.group("Error in handleWindowScroll event handler");
    console.error("name: ", error_.name);
    console.error("message: ", error_.message);
    console.error("cause: ", error_.cause);
    console.groupCollapsed("stack trace");
    console.trace(error_);
    console.error("detailed stack trace", error_.stack);
    console.groupEnd();
  }

  const header = document.querySelector<HTMLElement>(".header");
  const modalContainer =
    document.querySelector<HTMLElement>(".modal__container");

  // get current scroll position
  const currentScrollPosition = this.scrollY;

  // if previousScrollPosition is null, set it to currentScrollPosition
  if (previousScrollPosition === null) {
    previousScrollPosition = currentScrollPosition;
  }

  // determine scroll direction
  const scrollDirection =
    currentScrollPosition > previousScrollPosition ? "down" : "up";

  // if header and modalContainer exist, and modalContainer is not displayed, then add/remove header--hidden class
  // if modalContainer is displayed, then header is stickied to top of page
  if (header && modalContainer && modalContainer.style.display === "none") {
    if (scrollDirection === "down") {
      addClassesToElem(["header--hidden"])(header);
    } else {
      removeClassesFromElem(["header--hidden"])(header);
    }
  }

  // store current scroll position in localforage
  try {
    await localforage.setItem<number>(
      "previousScrollPosition",
      currentScrollPosition
    );
  } catch (error: any) {
    const error_ = new Error(error, {
      cause: "Error setting currentScrollPosition in localforage",
    });

    console.group("Error in handleWindowScroll event handler");
    console.error("name: ", error_.name);
    console.error("message: ", error_.message);
    console.error("cause: ", error_.cause);
    console.groupCollapsed("stack trace");
    console.trace(error_);
    console.error("detailed stack trace", error_.stack);
    console.groupEnd();
  }
}

export { handleWindowScroll };