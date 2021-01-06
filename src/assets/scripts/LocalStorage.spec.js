import LocalStorage from './LocalStorage.js';

describe('Countries createList', () => {
    const storage = new LocalStorage();
  test('Should be defined', () => {
    expect(LocalStorage.write).toBeDefined();
    expect(LocalStorage.read).toBeDefined();
    expect(LocalStorage.erase).toBeDefined();
  });

  test('Write and Read should work correctly', () => {
    LocalStorage.write('hello', 'friend');
    expect(LocalStorage.read('hello')).toBe('friend');
  });

  test('Erase should work correctly', () => {
    LocalStorage.write('hello', 'friend');
    LocalStorage.erase('hello');
    expect(LocalStorage.read('hello')).toBe(null);
  });
});
