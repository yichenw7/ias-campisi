import init from '@utils/instance';

const __action = init();

class Action {
  _dispatch;

  constructor({dispatch, history}) {
    const instance = __action();
    if (instance) return instance;
    this._dispatch = dispatch;
    this._history = history;
    __action(this);
  }

  static emit = (type, payload) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      __action()._dispatch({type, payload});
    });
  };

  static success = (type, payload) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      __action()._dispatch({type: `${type}_SUCCESS`, ...payload});
    });
  };

  static clean = (type) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      __action()._dispatch({type: `${type}_FAIL`, payload: {result: null}});
    });
  };

  static push = (location) => {
    __action()._history.push(location);
  };

  static replace = (location) => {
    __action()._history.replace(location);
  };
}

export default Action;
