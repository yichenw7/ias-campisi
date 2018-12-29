import init from '@utils/instance';
import Store from './Store';

const __storage = init();

class LocalStorage {
  constructor() {
    const instance = __storage();
    if (instance) return instance;
    __storage(this);
  }

  set = (key, value, ttl) => {
    const setLS = !ttl ? Store.set : Store.expire_set;
    if (typeof value === 'string') {
      setLS(key, value, ttl);
    } else if (typeof value === 'object') {
      setLS(key, JSON.stringify(value), ttl);
    } else if (value instanceof Array) {
      setLS(key, JSON.stringify(value), ttl);
    }
  };

  get = (key) => {
    const s = Store.get(key);
    return s ? JSON.parse(s) : null;
  };

  exprie_get = (key) => {
    const s = Store.expire_get(key);
    return s ? JSON.parse(s) : null;
  };

  remove = (key) => {
    Store.remove(key);
  };
}

export default new LocalStorage();
