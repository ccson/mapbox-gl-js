'use strict';

const window = require('../src/util/window');
const Map = require('../src/ui/map');
const util = require('../src/util/util');

module.exports.createMap = function(t, options, callback) {
    const container = window.document.createElement('div');

    Object.defineProperty(container, 'offsetWidth', {value: 200, configurable: true});
    Object.defineProperty(container, 'offsetHeight', {value: 200, configurable: true});

    if (!options || !options.skipCSSStub) t.stub(Map.prototype, '_detectMissingCSS');

    const map = new Map(util.extend({
        container: container,
        interactive: false,
        attributionControl: false,
        trackResize: true,
        style: {
            "version": 8,
            "sources": {},
            "layers": []
        }
    }, options));

    if (callback) map.on('load', () => {
        callback(null, map);
    });

    return map;
};
