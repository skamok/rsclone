import DOMElement from './DOMElement.js';

describe('DOMElement: create', () => {
  // const info = new Info(null);

  test('DOMElement: create should be defined', () => {
    expect(DOMElement.create).toBeDefined();
  });

  test('Test for function Info.calcPer100k', () => {
    const elem = document.createElement('div');
    elem.classList.add('some-class');
    elem.dataset.value = 'someval';
    elem.innerHTML = 'test';
    expect(DOMElement.create('div', 'some-class', 'test', null, ['data-value', 'someval'])).toEqual(elem);
  });
});
