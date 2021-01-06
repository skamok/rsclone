export default class DOMElement {
  static create(element, classNames, insertion, parent, ...attributes) {
  /*
    element: string; classNames: string 'class1 class2';
    insertion: object one or more HTMLElements,
    parent: HTMLElement; attributes: arrayofargs [['a','b']['c', 'd']['e', 'f']]
    args for function will be ['a','b'],['c', 'd']
  */
    let elem = null;
    try {
      elem = document.createElement(element);
    } catch (error) {
      throw new Error(`Function create error!${error.name} ${error.message}`);
    }

    if (classNames) {
      elem.classList.add(...classNames.split(' ')); // give string 'class1 class2' then split made array
    }

    if (insertion && Array.isArray(insertion)) {
      insertion.forEach((childElement) => {
        if (childElement) {
          elem.appendChild(childElement);
        }
      });
    } else if (insertion && (typeof (insertion) === 'object')) {
      elem.appendChild(insertion);
    } else if (insertion && (typeof (insertion) === 'string')) {
      elem.innerHTML = insertion;
    }

    if (parent) {
      parent.appendChild(elem);
    }

    if (attributes.length) {
      attributes.forEach(([attrName, attrVal]) => { // destructurization of object
        if (attrVal === '') {
          elem.setAttribute(attrName, '');
        } else if (attrName.match(/data/)) {
          elem.dataset[attrName.slice(5)] = attrVal;
        } else {
          elem.setAttribute(attrName, attrVal);
        }
      });
    }
    return elem;
  }
}
