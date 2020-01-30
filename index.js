function createMixins (execlib) {
  return execlib.loadDependencies('client', ['allex:googlegeocoding:lib'], mixinCreator.bind(null, execlib));
}
function mixinCreator (execlib, gclib) {
  return {
    Mixin: require('./mixincreator')(execlib, gclib)
  };
}
module.exports = createMixins;
