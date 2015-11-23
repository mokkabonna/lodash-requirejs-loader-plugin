define(['module'], function(module) {
  'use strict';

  var lodashMap = getMap();
  var config = module.config();
  var lodashPackageName = config.lodashPackageName || 'lodash';
  var devOptimizedLoad = config.hasOwnProperty('devOptimizedLoad') ? config.devOptimizedLoad : true;
  var overrides = config.overrides || {};

  lodashMap = Object.keys(overrides).reduce(function(map, key) {
    map[key] = overrides[key];
    return map;
  }, lodashMap);

  return {
    load: load
  };

  /**
   * The load function, see requirejs docs
   */
  function load(name, req, onload, config) {

    var modules = name.split(',').map(function(mod) {
      return mod.trim();
    });

    var actualPaths = modules.map(function(key) {
      if (!lodashMap.hasOwnProperty(key)) throw new Error('module ' + key + ' is not part of lodash, according to the map. You can add this to the loader override object in the config if you want.');
      return lodashPackageName + '/' + lodashMap[key];
    });

    //>>excludeStart('build', true)
    //Only load optimzed if not disabled and if not after build, or during optimization
    if (devOptimizedLoad && !config.isBuild) {
      req([lodashPackageName], function(_) {
        onload(_.pick(_, modules)); //use lodash itself to select only the functions we want
      }, onload.error);
      return;
    }
    //>>excludeEnd('build')

    req(actualPaths, function() {
      var loadedModules = [].slice.call(arguments);
      var customLodash = loadedModules.reduce(function(custom, module, index) {
        custom[modules[index]] = module;
        return custom;
      }, {});

      onload(customLodash);
    }, onload.error);
  }

  /**
   * The lodash module map as of 3.10.1-amd
   */
  function getMap() {
    return {
      'chunk': 'array/chunk',
      'compact': 'array/compact',
      'difference': 'array/difference',
      'drop': 'array/drop',
      'dropRight': 'array/dropRight',
      'dropRightWhile': 'array/dropRightWhile',
      'dropWhile': 'array/dropWhile',
      'fill': 'array/fill',
      'findIndex': 'array/findIndex',
      'findLastIndex': 'array/findLastIndex',
      'first': 'array/first',
      'flatten': 'array/flatten',
      'flattenDeep': 'array/flattenDeep',
      'head': 'array/head',
      'indexOf': 'array/indexOf',
      'initial': 'array/initial',
      'intersection': 'array/intersection',
      'last': 'array/last',
      'lastIndexOf': 'array/lastIndexOf',
      'object': 'array/object',
      'pull': 'array/pull',
      'pullAt': 'array/pullAt',
      'remove': 'array/remove',
      'rest': 'array/rest',
      'slice': 'array/slice',
      'sortedIndex': 'array/sortedIndex',
      'sortedLastIndex': 'array/sortedLastIndex',
      'tail': 'array/tail',
      'take': 'array/take',
      'takeRight': 'array/takeRight',
      'takeRightWhile': 'array/takeRightWhile',
      'takeWhile': 'array/takeWhile',
      'union': 'array/union',
      'uniq': 'array/uniq',
      'unique': 'array/unique',
      'unzip': 'array/unzip',
      'unzipWith': 'array/unzipWith',
      'without': 'array/without',
      'xor': 'array/xor',
      'zip': 'array/zip',
      'zipObject': 'array/zipObject',
      'zipWith': 'array/zipWith',
      'chain': 'chain/chain',
      'commit': 'chain/commit',
      'concat': 'chain/concat',
      'lodash': 'chain/lodash',
      'plant': 'chain/plant',
      'reverse': 'chain/reverse',
      'run': 'chain/run',
      'tap': 'chain/tap',
      'thru': 'chain/thru',
      'toJSON': 'chain/toJSON',
      'toString': 'chain/toString',
      'value': 'chain/value',
      'valueOf': 'chain/valueOf',
      'wrapperChain': 'chain/wrapperChain',
      'wrapperCommit': 'chain/wrapperCommit',
      'wrapperConcat': 'chain/wrapperConcat',
      'wrapperPlant': 'chain/wrapperPlant',
      'wrapperReverse': 'chain/wrapperReverse',
      'wrapperToString': 'chain/wrapperToString',
      'wrapperValue': 'chain/wrapperValue',
      'all': 'collection/all',
      'any': 'collection/any',
      'at': 'collection/at',
      'collect': 'collection/collect',
      'contains': 'collection/contains',
      'countBy': 'collection/countBy',
      'detect': 'collection/detect',
      'each': 'collection/each',
      'eachRight': 'collection/eachRight',
      'every': 'collection/every',
      'filter': 'collection/filter',
      'find': 'collection/find',
      'findLast': 'collection/findLast',
      'findWhere': 'collection/findWhere',
      'foldl': 'collection/foldl',
      'foldr': 'collection/foldr',
      'forEach': 'collection/forEach',
      'forEachRight': 'collection/forEachRight',
      'groupBy': 'collection/groupBy',
      'include': 'collection/include',
      'includes': 'collection/includes',
      'indexBy': 'collection/indexBy',
      'inject': 'collection/inject',
      'invoke': 'collection/invoke',
      'map': 'collection/map',
      'partition': 'collection/partition',
      'pluck': 'collection/pluck',
      'reduce': 'collection/reduce',
      'reduceRight': 'collection/reduceRight',
      'reject': 'collection/reject',
      'sample': 'collection/sample',
      'select': 'collection/select',
      'shuffle': 'collection/shuffle',
      'size': 'collection/size',
      'some': 'collection/some',
      'sortBy': 'collection/sortBy',
      'sortByAll': 'collection/sortByAll',
      'sortByOrder': 'collection/sortByOrder',
      'where': 'collection/where',
      'now': 'date/now',
      'after': 'function/after',
      'ary': 'function/ary',
      'backflow': 'function/backflow',
      'before': 'function/before',
      'bind': 'function/bind',
      'bindAll': 'function/bindAll',
      'bindKey': 'function/bindKey',
      'compose': 'function/compose',
      'curry': 'function/curry',
      'curryRight': 'function/curryRight',
      'debounce': 'function/debounce',
      'defer': 'function/defer',
      'delay': 'function/delay',
      'flow': 'function/flow',
      'flowRight': 'function/flowRight',
      'memoize': 'function/memoize',
      'modArgs': 'function/modArgs',
      'negate': 'function/negate',
      'once': 'function/once',
      'partial': 'function/partial',
      'partialRight': 'function/partialRight',
      'rearg': 'function/rearg',
      'restParam': 'function/restParam',
      'spread': 'function/spread',
      'throttle': 'function/throttle',
      'wrap': 'function/wrap',
      'clone': 'lang/clone',
      'cloneDeep': 'lang/cloneDeep',
      'eq': 'lang/eq',
      'gt': 'lang/gt',
      'gte': 'lang/gte',
      'isArguments': 'lang/isArguments',
      'isArray': 'lang/isArray',
      'isBoolean': 'lang/isBoolean',
      'isDate': 'lang/isDate',
      'isElement': 'lang/isElement',
      'isEmpty': 'lang/isEmpty',
      'isEqual': 'lang/isEqual',
      'isError': 'lang/isError',
      'isFinite': 'lang/isFinite',
      'isFunction': 'lang/isFunction',
      'isMatch': 'lang/isMatch',
      'isNaN': 'lang/isNaN',
      'isNative': 'lang/isNative',
      'isNull': 'lang/isNull',
      'isNumber': 'lang/isNumber',
      'isObject': 'lang/isObject',
      'isPlainObject': 'lang/isPlainObject',
      'isRegExp': 'lang/isRegExp',
      'isString': 'lang/isString',
      'isTypedArray': 'lang/isTypedArray',
      'isUndefined': 'lang/isUndefined',
      'lt': 'lang/lt',
      'lte': 'lang/lte',
      'toArray': 'lang/toArray',
      'toPlainObject': 'lang/toPlainObject',
      'add': 'math/add',
      'ceil': 'math/ceil',
      'floor': 'math/floor',
      'max': 'math/max',
      'min': 'math/min',
      'round': 'math/round',
      'sum': 'math/sum',
      'inRange': 'number/inRange',
      'random': 'number/random',
      'assign': 'object/assign',
      'create': 'object/create',
      'defaults': 'object/defaults',
      'defaultsDeep': 'object/defaultsDeep',
      'extend': 'object/extend',
      'findKey': 'object/findKey',
      'findLastKey': 'object/findLastKey',
      'forIn': 'object/forIn',
      'forInRight': 'object/forInRight',
      'forOwn': 'object/forOwn',
      'forOwnRight': 'object/forOwnRight',
      'functions': 'object/functions',
      'get': 'object/get',
      'has': 'object/has',
      'invert': 'object/invert',
      'keys': 'object/keys',
      'keysIn': 'object/keysIn',
      'mapKeys': 'object/mapKeys',
      'mapValues': 'object/mapValues',
      'merge': 'object/merge',
      'methods': 'object/methods',
      'omit': 'object/omit',
      'pairs': 'object/pairs',
      'pick': 'object/pick',
      'result': 'object/result',
      'set': 'object/set',
      'transform': 'object/transform',
      'values': 'object/values',
      'valuesIn': 'object/valuesIn',
      'camelCase': 'string/camelCase',
      'capitalize': 'string/capitalize',
      'deburr': 'string/deburr',
      'endsWith': 'string/endsWith',
      'escape': 'string/escape',
      'escapeRegExp': 'string/escapeRegExp',
      'kebabCase': 'string/kebabCase',
      'pad': 'string/pad',
      'padLeft': 'string/padLeft',
      'padRight': 'string/padRight',
      'parseInt': 'string/parseInt',
      'repeat': 'string/repeat',
      'snakeCase': 'string/snakeCase',
      'startCase': 'string/startCase',
      'startsWith': 'string/startsWith',
      'template': 'string/template',
      'templateSettings': 'string/templateSettings',
      'trim': 'string/trim',
      'trimLeft': 'string/trimLeft',
      'trimRight': 'string/trimRight',
      'trunc': 'string/trunc',
      'unescape': 'string/unescape',
      'words': 'string/words',
      'attempt': 'utility/attempt',
      'callback': 'utility/callback',
      'constant': 'utility/constant',
      'identity': 'utility/identity',
      'iteratee': 'utility/iteratee',
      'matches': 'utility/matches',
      'matchesProperty': 'utility/matchesProperty',
      'method': 'utility/method',
      'methodOf': 'utility/methodOf',
      'mixin': 'utility/mixin',
      'noop': 'utility/noop',
      'property': 'utility/property',
      'propertyOf': 'utility/propertyOf',
      'range': 'utility/range',
      'times': 'utility/times',
      'uniqueId': 'utility/uniqueId'
    };
  }

});
