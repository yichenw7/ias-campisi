import init from '@utils/instance';
import Store from './Store';
import Action from '@actions';
import CK from '@constants/CacheKey';
import { expireUser } from './Expire';

const __user = init();

class UserCache {
  constructor() {
    const instance = __user();
    if (instance) return instance;
    __user(this);
  }

  get user() {
    const u = Store.get(CK.USER_INFO);
    return u ? JSON.parse(u) : null;
  }

  set user(value) {
    if (value === null) {
      Store.remove(CK.USER_INFO);
    }
    Store.expire_set(CK.USER_INFO, JSON.stringify(value), expireUser());
  }

  get permission() {
    const u = Store.expire_get(CK.USER_PERMISSION);
    return u ? JSON.parse(u) : null;
  }

  set permission(value) {
    if (value === null) {
      Store.remove(CK.USER_PERMISSION);
    }
    Store.expire_set(CK.USER_PERMISSION, JSON.stringify(value), expireUser());
  }

  login = (user) => {
    if (!user) return;
    const {username, password} = user || {};
    Action.emit('user.login', {username, password, gatewayToken: true});
  };

  auth = (no) => {
    if (!this.permission || !this.permission.bondCdcAuthzMap) {
      return false;
    }
    const {bondCdcAuthzMap} = this.permission;
    if (['1', '2', '3', '4', '5', '6'].indexOf(no) > -1) {
      return bondCdcAuthzMap[no] ? bondCdcAuthzMap[no].cdcPermission || false : false;
    } else {
      switch (no) {
        case '7':
          return this.permission.cdcValAffiliateYtd;
        case '8':
          return this.permission.cdcCurveYtd;
        case '9':
          return this.permission.cdcCurveHis;
        case '10':
          return this.permission.cdcValHis;
        default:
          return true;
      }
    }
  };
  csi = () => {
    if (!this.permission) {
      return false;
    }
    return !!this.permission.csiVal;
  };
}

export default new UserCache();
