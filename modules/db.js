import { set, del, values, keys, get } from "./idb-src.js";

export const db = {
  //liest alle keys aus der db als array
  readKeys() {
    return keys();
  },

  //liest alle values aus der db als array
  readDB() {
    return values();
  },

  //schreiben ein key:value paar
  writeItem(key, value) {
    return set(key, value);
  },

  //auslesen
  readItem(key) {
    return get(key);
  },

  //loeschen
  deleteItem(key) {
    return del(key);
  },

  //schreibt oder überschreibt ein key:value paar
  updateItem(newItem) {
    const key = newItem.id;
    this.writeItem(key, newItem);
  },
};
