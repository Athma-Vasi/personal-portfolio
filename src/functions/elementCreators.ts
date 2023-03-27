/**
 * Pipe function that takes variable number of functions and returns a function that takes a value. The returned function passes the value to the first function in the array of functions and passes the result of that function to the next function in the array and so on until the last function in the array is called. The result of the last function in the array is returned, or <void> if its a side effect function (append to DOM, add event listener, etc.) * 
 * 
 * @function
 * @param {...Array<(_: V) => any>} funcs - array of functions
 * @returns {(value: V) => any}
 * @example
 * pipe(
		addTextToElem('Restart'),
		addEvtListener('click')(restartGame),
		appendElemToParent(winnerWrapper)
	)(elemCreator('button')(['bttn-restart']));
 */

const pipe =
  <V>(...funcs: Array<(_: V) => any>) =>
  (value: V) =>
    funcs.reduce((res, func) => func(res), value);

// not ready for prime time
// const asyncPipe =
// 	<V, R>(...funcs: Array<(_: V) => Promise<R>>) =>
// 	async (value: V): Promise<R> =>
// 		funcs.reduce(
// 			async (res: Promise<R>, func) => func(await res),
// 			Promise.resolve(value)
// 		);

/**
 * Map is used to create an array of promises, and then Promise.all is used to resolve in parallel, all the promises in the array. The returned promise is wrapped in an async function that allows the caller to await the results of the parallel execution.
 *
 * @function
 * @param {...Array<(_: V) => Promise<R>>} funcs - array of functions
 * @returns {(value: V) => Promise<R>}
 */
const parallelPipe =
  <V, R>(...funcs: Array<(_: V) => Promise<R>>) =>
  async (value: V) =>
    Promise.all(funcs.map((func) => func(value)));

/**
 * Takes a string and returns a function that takes an array of strings. The returned function creates an HTML element with the string passed to the first function as the element type, and the array of strings passed to the returned function as the classes to add to the element.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} elem - element type
 * @returns {(classes: string[]) => HTMLElement}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * // returns <div class="class1 class2"></div>
 *
 */
const elemCreator =
  (elem: string) =>
  (classes: string[]): HTMLElement => {
    const element = document.createElement(elem);

    return classes.reduce((elem: HTMLElement, currClass: string) => {
      elem.classList.add(currClass);

      return elem;
    }, element);
  };

/**
 * Takes an array of strings and returns a function that takes an HTML element. The returned function adds the classes to the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string[]} classes - array of strings
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addClassesToElem = addClassesToElem(['class3', 'class4'])(divWithClasses);
 * // returns <div class="class1 class2 class3 class4"></div>
 * @example using pipe
 * pipe(
 * addClassesToElem(['class3', 'class4'])
 * )(elemCreator('div')(['class1', 'class2']))
 * // returns <div class="class1 class2 class3 class4"></div>
 */
const addClassesToElem =
  (classes: string[]) =>
  (elem: HTMLElement | null): HTMLElement | null => {
    return classes.reduce((element: HTMLElement | null, currClass: string) => {
      if (element) element.classList.add(currClass);

      return element;
    }, elem);
  };

/**
 * Takes an array of strings and returns a function that takes an HTML element. The returned function removes the classes from the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string[]} classes - array of strings
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const removeClassesFromElem = removeClassesFromElem(['class1', 'class2'])(divWithClasses);
 * // returns <div></div>
 * @example using pipe
 * pipe(
 * removeClassesFromElem(['class1', 'class2'])
 * )(elemCreator('div')(['class1', 'class2']))
 * // returns <div></div>
 */
const removeClassesFromElem =
  (classes: string[]) =>
  (elem: HTMLElement | null): HTMLElement | null => {
    return classes.reduce((element: HTMLElement | null, currClass: string) => {
      if (element && element.classList.contains(currClass)) {
        element.classList.remove(currClass);
      }

      return element;
    }, elem);
  };

/**
 * Takes an array of arrays of attribute name and value, and returns a function that takes an HTML element. The returned function adds the attributes to the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string[]} attrVals - array of arrays of attribute name and value
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addAttrToElem = addAttributeToElem([['id', 'id1'], ['data-test', 'test']])(divWithClasses);
 * @example using pipe
 * pipe(
 * addAttributeToElem([['id', 'id1'], ['data-test', 'test']])
 * )(elemCreator('div')(['class1', 'class2']))
 */
const addAttributeValuesToElem =
  (attrVals: Array<string[]>) =>
  (elem: HTMLElement | null): HTMLElement | null => {
    return attrVals.reduce(
      (element: HTMLElement | null, [attribute, value]: Array<string>) => {
        if (!attribute || !value) return element;
        if (element) element.setAttribute(attribute, value);

        return element;
      },
      elem
    );
  };

/**
 * Takes an array of attribute names, and returns a function that takes an HTML element. The returned function removes the attributes from the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string[]} attrNames - array of attribute names
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addAttrToElem = addAttributeValuesToElem([['id', 'id1'], ['data-test', 'test']])(divWithClasses);
 * const removeAttrFromElem = removeAttributesFromElem(['id', 'data-test'])(addAttrToElem);
 * @example using pipe
 * pipe(
 * addAttributeValuesToElem([['id', 'id1'], ['data-test', 'test']]),
 * removeAttributesFromElem(['id', 'data-test'])
 * )(elemCreator('div')(['class1', 'class2']))
 */
const removeAttributesFromElem =
  (attrNames: string[]) =>
  (elem: HTMLElement | null): HTMLElement | null => {
    return attrNames.reduce(
      (element: HTMLElement | null, attribute: string) => {
        if (element && element.hasAttribute(attribute))
          element.removeAttribute(attribute);

        return element;
      },
      elem
    );
  };

/**
 * Takes an array of arrays of style property and value, and returns a function that takes an HTML element. The returned function adds the style properties to the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string[]} stylePropVals - array of arrays of style property and value
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addStyleToElem = addStyleToElem([['background-color', 'red'], ['color', 'white']])(divWithClasses);
 * @example using pipe
 * pipe(
 * addStyleToElem([['background-color', 'red'], ['color', 'white']])
 * )(elemCreator('div')(['class1', 'class2']))
 *
 */
const addStylesToElem =
  (stylePropVals: Array<string[]>) =>
  (elem: HTMLElement | null): HTMLElement | null => {
    return stylePropVals.reduce(
      (element: HTMLElement | null, [property, value]: string[]) => {
        if (!property || !value) return element;
        if (element) element.style.setProperty(property, value);

        return element;
      },
      elem
    );
  };

/**
 * Takes styles properties and returns a function that takes an HTML element. The returned function removes the style properties from the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} styleProp - style property to remove
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addStyleToElem = addStyleToElem([['background-color', 'red'], ['color', 'white']])(divWithClasses);
 */
const removeStylesFromElem =
  (styleProps: string[]) =>
  (elem: HTMLElement | null): HTMLElement | null => {
    return styleProps.reduce(
      (element: HTMLElement | null, styleProp: string) => {
        if (element) element.style.removeProperty(styleProp);

        return element;
      },
      elem
    );
  };

/**
 * Takes a string and returns a function that takes an HTML element. The returned function adds the text to the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} text - text to add to element
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addTextToElem = addTextToElem('Hello World')(divWithClasses);
 * @example using pipe
 * pipe(
 * addTextToElem('Hello World')
 * )(elemCreator('div')(['class1', 'class2']))
 *
 */
const addTextToElem =
  (text: string) =>
  (elem: HTMLElement | null): HTMLElement | null => {
    const textNode = document.createTextNode(text);
    if (elem) elem.appendChild(textNode);
    return elem;
  };

/**
 * Takes an HTML element and returns a function that takes an HTML element. The returned function appends the element passed to it to the element passed to the first function. This is a side effect function and must be the last function in a pipe.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {HTMLElement | null} parent - parent element
 * @returns {(child: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addTextToElem = addTextToElem('Hello World')(divWithClasses);
 * const appendElemToParent = appendElemToParent(document.body)(divWithClasses);
 * @example using pipe
 * pipe(
 * addTextToElem('Hello World'),
 * appendElemToParent(document.body)
 * )(elemCreator('div')(['class1', 'class2']))
 */
const appendElemToParent =
  (parent: HTMLElement | null) =>
  (child: HTMLElement | null): void => {
    if (child && parent) parent.appendChild(child);
  };

/**
 * Takes a source as a string and returns a function that takes an array of classes as strings and returns a function that takes an alt text string and returns a function that takes a title string. The returned function creates an HTML image element with the source, alt text, and title passed to the functions.
 *
 * @function
 * @param {string} source - image source
 * @returns {(classes: string[]) => (alt: string) => (title: string) => HTMLImageElement}
 * @example
 * const imgWithClasses = createImage('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png')(['class1', 'class2'])('Google Logo')('Google Logo');
 * // returns <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google Logo" title="Google Logo" class="class1 class2">
 */
const createImage =
  (source: string) =>
  (classes: string[]) =>
  (alt: string) =>
  (title: string): HTMLImageElement => {
    const image = new Image();
    image.src = source;
    image.alt = alt;
    image.title = title;

    return classes.reduce((elem: HTMLImageElement, currClass: string) => {
      elem.classList.add(currClass);
      return elem;
    }, image);
  };

/**
 * Takes an event as a string and returns a function that takes a function that takes an event and returns a function that takes an HTML element. The returned function adds an event listener to the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} evt - event to listen for
 * @returns {(handleEvt: (this: any, ev: any, options?: { capture?: boolean; once?: boolean; passive?: boolean; signal?: AbortSignal; }) => unknown) => (elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addTextToElem = addTextToElem('Hello World')(divWithClasses);
 * const appendElemToParent = appendElemToParent(document.body)(divWithClasses);
 * const addClickEvtListener = addEvtListener('click')((e) => console.log(e))(divWithClasses);
 * @example using pipe
 * pipe(
 * addTextToElem('Hello World'),
 * addEvtListener('click')((e) => console.log(e)),
 * appendElemToParent(document.body),
 * )(elemCreator('div')(['class1', 'class2']))
 */
const addEvtListener =
  (evt: string) =>
  (
    handleEvt: (
      this: any,
      ev: Event,
      options?: {
        capture: boolean;
        once: boolean;
        passive: boolean;
        signal: AbortSignal;
      }
    ) => unknown
  ) =>
  (elem: HTMLElement | null): HTMLElement | null => {
    if (elem) elem.addEventListener(evt, handleEvt);
    return elem;
  };

/**
 * Takes an event as a string and returns a function that takes a function that takes an event and returns a function that takes an HTML element. The returned function removes an event listener from the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} evt - event to remove listener for
 * @returns {(handleEvt: (this: any, ev: any, options?: { capture?: boolean; once?: boolean; passive?: boolean; signal?: AbortSignal; }) => unknown) => (elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addTextToElem = addTextToElem('Hello World')(divWithClasses);
 * const appendElemToParent = appendElemToParent(document.body)(divWithClasses);
 * const addClickEvtListener = addEvtListener('click')((e) => console.log(e))(divWithClasses);
 * const removeClickEvtListener = removeEvtListener('click')((e) => console.log(e))(divWithClasses);
 * @example using pipe
 * pipe(
 * addTextToElem('Hello World'),
 * addEvtListener('click')((e) => console.log(e)),
 * removeEvtListener('click')((e) => console.log(e)),
 * appendElemToParent(document.body),
 * )(elemCreator('div')(['class1', 'class2']))
 */
const removeEvtListener =
  (evt: string) =>
  (
    handleEvt: (
      this: any,
      ev: Event,
      options?: {
        capture: boolean;
        once: boolean;
        passive: boolean;
        signal: AbortSignal;
      }
    ) => unknown
  ) =>
  (elem: HTMLElement | null): HTMLElement | null => {
    if (elem) elem.removeEventListener(evt, handleEvt);
    return elem;
  };

export {
  elemCreator,
  addClassesToElem,
  removeClassesFromElem,
  appendElemToParent,
  addTextToElem,
  addAttributeValuesToElem,
  removeAttributesFromElem,
  createImage,
  addEvtListener,
  removeEvtListener,
  addStylesToElem,
  removeStylesFromElem,
  pipe,
  parallelPipe,
};
