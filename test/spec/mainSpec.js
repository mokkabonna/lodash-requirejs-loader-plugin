define([
  'squire',
  'Promise',
  'lodash',
  'lodash/collection/map',
  'lodash/collection/reduce',
], function(Squire, Promise, _, map, reduce) {
  'use strict';
  var fakeLodashModule = {};
  var newMap = {};

  describe('lodash-requirejs-loader-plugin', function() {
    var main;

    describe('unoptimized', function() {
      var context = 'unoptimized-context';
      beforeEach(function() {
        createContext(context, {
          devOptimizedLoad: false
        });
      });

      it('loads the actual module', function() {
        return loadMocked('_!map,reduce', context).then(function(mod) {
          expect(mod.map).to.equal(map);
          expect(mod.reduce).to.equal(reduce);
        });
      });

      it('trims the module strings', function() {
        return loadMocked('_!  map ,   reduce  ', context).then(function(mod) {
          expect(mod.map).to.equal(map);
          expect(mod.reduce).to.equal(reduce);
        });
      });

      it('works with one', function() {
        return loadMocked('_!map', context).then(function(mod) {
          expect(mod.map).to.equal(map);
        });
      });

    });

    describe('overrides', function() {
      var context = 'with-overrides';
      beforeEach(function() {
        createContext(context, {
          devOptimizedLoad: false,
          overrides: {
            'map': 'collection/newMapLocation',
            'newFeature': 'string/newFeature',
          }
        });
      });

      it('loads the new feature', function() {
        return loadMocked('_!map,newFeature', context).then(function(mod) {
          expect(mod.map).to.equal(newMap);
          expect(mod.newFeature).to.equal(fakeLodashModule);
        });
      });
    });

    describe('optimized', function() {
      var context = 'optimized-context';
      beforeEach(function() {
        createContext(context);
      });

      it('loads just the main module, and excluding others', function() {
        return loadOptimized('_!map,reduce', context).then(function(mod) {
          expect(mod.map).to.equal(_.map);
          expect(mod.reduce).to.equal(_.reduce);
          expect(mod.flatten).not.to.equal(_.flatten);
        });
      });

    });

  });

  function createContext(context, config) {
    require.config({
      baseUrl: '/base/src',
      context: context,
      config: {
        _: config || {}
      },
      paths: {
        'bower_components': '../bower_components',
        '_': 'main'
      },
      packages: [{
        name: 'lodash',
        location : '../bower_components/lodash'
      }]
    });
  }

  function loadMocked(modString, context) {
    return new Promise(function(resolve, reject) {
      new Squire(context)
        .mock('lodash/collection/map', map)
        .mock('lodash/collection/newMapLocation', newMap)
        .mock('lodash/string/newFeature', fakeLodashModule)
        .mock('lodash/collection/reduce', reduce)
        .require([modString], function(customLodash) {
          resolve(customLodash);
        });
    });
  }

  function loadOptimized(modString, context) {
    return new Promise(function(resolve, reject) {
      new Squire(context)
        .mock('lodash', _)
        .require([modString], function(customLodash) {
          resolve(customLodash);
        });
    });
  }

});
