function isFunction(func) {
  return typeof func === 'function';
}

export default function receive(key, nextProps) {
  const _this = this;
  return new Manager(key, _this, nextProps);
}


function Manager(key, _this, nextProps) {
  this.diffs = [];
  if (key instanceof Array) {
    for (const k of key) {
      this.diffs.push(new Diff(k, _this, nextProps));
    }
  } else if (typeof key === 'string') {
    this.diffs.push(new Diff(key, _this, nextProps));
  } else {
    throw Error(`props key should be Array or string , but [${typeof key}]`);
  }
}

Manager.prototype.diffs = [];

Manager.prototype.loading = function (callback) {
  this.diffs.forEach(d => {
    d.loading(callback);
  });
  return this;
};

Manager.prototype.success = function (callback) {
  this.diffs.forEach(d => d.success(callback));
  return this;
};

Manager.prototype.error = function (callback) {
  this.diffs.forEach(d => d.error(callback));
  return this;
};


function Diff(key, _this, nextProps) {
  this.result = {
    key,
    loading: [],
    success: [],
    error: [],
  };
  const {location, history} = _this.props;
  const prop = _this.props[key];
  const nProp = nextProps[key];
  if (prop !== nProp) {
    const {result, payload} = nProp || {};
    if (nProp.status === 401) {
      history.replace({pathname: '/login', state: location});
    } else {
      if (nProp.loading) {
        this.result.loading.push(payload);
      } else {
        if (nProp.success) {
          if (nProp.status === 200) {
            this.result.success.push(result, payload);
          } else {
            this.result.error.push(nProp.message);
          }
        } else if (nProp.error) {
          this.result.error.push(nProp.error, result, payload);
        }
      }
    }
  }
}

Diff.prototype.loading = function (callback) {
  if (isFunction(callback) && this.result.loading.length > 0) {
    callback(...this.result.loading);
  }
  return this;
};

Diff.prototype.success = function (callback) {
  if (isFunction(callback) && this.result.success.length > 0) {
    callback(...this.result.success);
  }
  return this;
};

Diff.prototype.error = function (callback) {
  if (isFunction(callback) && this.result.error.length > 0) {
    callback(...this.result.error);
  }
  return this;
};

Diff.prototype.result = {
  loading: [],
  success: [],
  error: [],
};
