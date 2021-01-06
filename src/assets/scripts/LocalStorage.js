export default class LocalStorage {
  static write(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
  }

  static read(name, obj = null) {
    return JSON.parse(window.localStorage.getItem(name) || obj);
    // JSON need obj in JSON format example string will be '"someval"'
  }

  static erase(name) {
    window.localStorage.removeItem(name);
  }
}
