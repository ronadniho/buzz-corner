'use strict';

let config = {
    development: {
        sso: {
            inner: {
                "host": "10.20.32.61",
                "port": 10086
            }
        },

        endPoints: {
            interview: 'http://10.20.32.61:12789',
            video: 'http://uat.bridgeplus.cn',
            masr: 'http://10.20.32.61:12444',
            hongda: 'http://10.20.32.51:10126'
        },

        logger: {
            appName: 'buzz-corner'
        }
    },
    uat: {
        sso: {
            inner: {
                "host": "uat.service.hcd.com",
                "port": 10086
            }
        },
        endPoints: {
            interview: 'http://10.20.32.61:12789',
            video: 'http://uat.bridgeplus.cn',
            masr: 'http://10.20.32.61:12444',
            hongda: 'http://10.20.32.51:10126'
        },

        logger: {
            appName: 'buzz-corner'
        }
    },
    prd: {
        sso: {
            inner: {
                "host": "service.bridgeplus.cn",
                "port": 10086
            }
        },

        endPoints: {
            interview: 'http://service2.bridgeplus.cn:12789',
            video: 'https://interview.bridgeplus.cn',
            masr: 'http://114.55.233.38:12444',
            hongda: 'http://114.55.233.38:10126'
        },

        logger: {
            appName: 'buzz-corner'
        }
    }
};

config.production = config.prd;

module.exports = config[process.env.NODE_ENV];