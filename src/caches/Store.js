import engine from 'store/src/store-engine';
import localStorage from 'store/storages/localStorage';
import expire from 'store/plugins/expire';
import init from '@utils/instance';

const __store = init();

class Store {
  constructor() {
    const instance = __store();
    if (instance) return instance;
    const storages = [localStorage];
    const plugins = [expire];
    this.store = engine.createStore(storages, plugins);
    __store(this);
  }

  expire_get = (key) => {
    if (this.store.getExpiration(key) > new Date().getTime()) {
      return this.get(key);
    }
    return null;
  };

  expire_set = (key, value, ttl) => {
    this.store.set(key, value, ttl);
  };

  get = (key) => {
    return this.store.get(key);
  };

  set = (key, value) => {
    this.store.set(key, value);
  };

  remove = (key) => {
    this.store.remove(key);
  };
}

export default new Store();
