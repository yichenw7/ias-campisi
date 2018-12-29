import init from '@utils/instance';
import PR from 'piwik-react-router';
import { QBService } from 'ss-web-start';

const __pw = init();
let __hasUser = false;

class Piwik {
  constructor({ piwik, trackName }) {
    const instance = __pw();
    const { url, siteId, enabled } = piwik || {};
    if (!instance) {
      let pw = null;
      if (enabled) {
        pw = PR({ url, siteId });
        console.info('piwik has been created successfully');
        pw.pushEvent = this.push;
        pw.trackEvent = this.trackEvent;
        pw.trackPageView = this.trackPageView;
        pw.__trackName = trackName;
        if (pw && QBService.inQb()) {
          QBService.getUser((user) => {
            if (!__hasUser) {
              pw.push(['setUserId', user.username]);
              __hasUser = true;
            }
          });
        }
        __pw(pw);
      }
    }
    return __pw();
  }

  trackPageView = () => {
    setTimeout(() => {
      __pw().pushEvent('trackPageView');
    });
  };

  trackEvent = (action, username) => {
    setTimeout(() => {
      if (!__hasUser) {
        __pw().push(['setUserId', username]);
        __hasUser = true;
      }
      action = encodeURIComponent(action);
      __pw().pushEvent('trackEvent', [encodeURIComponent(__pw().__trackName), action], username);
    });
  };

  push = (e, actions = [], username) => {
    if (QBService.inQb()) {
      QBService.getUser((user) => {
        if (!__hasUser) {
          __pw().push(['setUserId', username]);
          __hasUser = true;
        }
        if (actions) {
          __pw().push([e, ...actions, user.username]);
        }
      });
    } else {
      if (!__hasUser) {
        __pw().push(['setUserId', username]);
        __hasUser = true;
      }
      if (actions) {
        __pw().push([e, ...actions, username]);
      }
    }
  };
}

export default Piwik;
