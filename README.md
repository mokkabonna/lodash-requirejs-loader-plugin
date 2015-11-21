# lodash-requirejs-loader-plugin

A requirejs loader for lodash amd modules. Prevents build bloat. Use what you need, include only those modules in your build.


Just use it like this:


```js
define(['_!map,reduce,flatten'], function(_){

  //now _.map _.reduce and _.flatten is available to use as normal
  //...

});
```

## Configuration

Include it in your requirejs like this. (or use another name if you prefer)

```js
{
  paths: {
    '_': 'bower_components/lodash-requirejs-loader-plugin/main'
  }
}
```


## Development optimalizations

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
- **lodashLocation** The root path to the lodash amd package, default: *bower_components/lodash*
- **overrides** Any overrides to the loader map you want to override or extend. Useful if you are using a newer version and this package isn't updated yet. Needs this format `overrides: { 'map' : 'collection/newLocationForMapModule', 'newModule': 'string/newModule' }`
