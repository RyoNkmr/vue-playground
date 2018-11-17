const placeholdenStaticClassMarged = staticClass => (staticClass || '')
  .split(' ').filter(name => name && !(/^.+--.+$/.test(name)))
  .map(name => `${name}--placeholder`)
  .reduce((acc, name) => `${acc} ${name}`, staticClass)

const makeOptions = vnode => vnode.data ? [vnode, { staticClass: placeholdenStaticClassMarged(vnode.data.staticClass) }] : vnode;
const placeholdenRecursive = (vnodes, createElement) => vnodes.map(vnode => createElement(...makeOptions(vnode), placeholdenRecursive(vnode.children)));

export default {
  functional: true,
  render(createElement, context) {
    return placeholdenRecursive(context.children);
  },
};
