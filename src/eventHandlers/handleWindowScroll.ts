import localforage from "localforage";

import {
  addClassesToElem,
  removeClassesFromElem,
} from "../functions/elementCreators";

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

  // get current scroll position
  const currentScrollPosition = this.scrollY;

  // if previousScrollPosition is null, set it to currentScrollPosition
  if (previousScrollPosition === null) {
    previousScrollPosition = currentScrollPosition;
  }

  // determine scroll direction
  const scrollDirection =
    currentScrollPosition > previousScrollPosition ? "down" : "up";

  const header = document.querySelector<HTMLElement>(".header");

  // if header exists, add or remove header--hidden class based on scroll direction
  if (header) {
    if (scrollDirection === "down") {
      // header.classList.add("header--hidden");
      addClassesToElem(["header--hidden"])(header);
    } else {
      // header.classList.remove("header--hidden");
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
