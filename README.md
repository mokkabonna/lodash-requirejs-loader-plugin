# lodash-requirejs-loader-plugin

[![Build status](https://travis-ci.org/mokkabonna/lodash-requirejs-loader-plugin.png)](https://travis-ci.org/mokkabonna/lodash-requirejs-loader-plugin)

A requirejs loader for lodash AMD modules. Prevents build bloat. Use what you need, include only those modules in your build.

Just use it like this:


```js
define(['_!map,reduce,flatten'], function(_){

  //now _.map _.reduce and _.flatten is available to use as normal
  //...

});
```

## Dependencies

This has no bower dependency to lodash. So install what version you desire yourself. The reason is because the way lodash has tagged it's AMD build this package can't specify something like **lodash:^3.0.0-amd** Because that will install the non AMD version of lodash. And I don't want to lock it down to a specific version, since that requires me to always update the map.

The map is based on lodash 3.10.1-amd.

See below for the **overrides** option to use with other versions of lodash.


## Configuration

Include it in your requirejs like this. (or use another name if you prefer)

```js
{
  paths: {
    '_': 'bower_components/lodash-requirejs-loader-plugin/src/main'
  }
}
```

And as normal with lodash amd, include it like this, as a package:

```js
{
  packages: [{
    name: 'lodash',
    location : 'bower_components/lodash'
  }]
}
```


## Development optimizations

During development we will load just `lodash` and create a custom lodash with the requested modules. This is so that we can load faster. When you run the requirejs optimizer only the requested modules will be included.


If you want to disable this optimization you can do so like this in your requirejs config.

```js
{
  config: {
    '_': { //use the name you gave it in the path config
      devOptimizedLoad: false
    }
  }
}
```


## All options

- **devOptimizedLoad** If you want to load optimized (whole lodash) during development. default: *true*
- **lodashPackageName** The name of the lodash AMD package, default: *lodash*
- **overrides** Any overrides to the loader map you want to override or extend. Useful if you are using a newer version and this package isn't updated yet. Needs this format `overrides: { 'map' : 'collection/newLocationForMapModule', 'newModule': 'string/newModule' }`
