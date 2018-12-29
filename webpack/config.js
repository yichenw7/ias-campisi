const assets = [
  '/web-library/react/1.0.0/react.production.min.js',
  '/web-library/react/1.0.0/react-dom.production.min.js',
  '/web-library/react/1.0.0/react-router-dom.min.js',
  '/web-library/worker/1.0.1/SharedWork.5e5638e2.min.js',
];
module.exports = {
  dev: {
    assets,
    initialState: {
      app: {
        webSocket: {
          host: 'ws://172.16.66.173',
          path: '/webbond/gw_ws/subscribe',
          maxRetryInterval: 3 * 60 * 1000
        },
        piwik: {
          url: 'http://infra.dev.sumscope.com/piwik',
          siteId: 7,
          enabled: true
        }
      }
    }
  },
  qa: {
    assets,
    initialState: {
      app: {
        webSocket: {
          host: 'ws://172.16.87.25',
          path: '/webbond/gw_ws/subscribe',
          maxRetryInterval: 3 * 60 * 1000
        },
        piwik: {
          url: 'http://infra.dev.sumscope.com/piwik',
          siteId: 8,
          enabled: true
        }
      }
    },
  },
  prd: {
    assets,
    initialState: {
      app: {
        webSocket: {
          host: 'wss://qb3.idbhost.com:28888',
          path: '/webbond/gw_ws/subscribe',
          maxRetryInterval: 3 * 60 * 1000
        },
        piwik: {
          url: 'analysis-amw.idbhost.com',
          siteId: 6,
          enabled: true
        }
      }
    },
  }
};
