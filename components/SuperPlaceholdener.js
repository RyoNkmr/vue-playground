const placeholdenStaticClassMarged = staticClass =>
  staticClass
  ? staticClass.split(' ')
    .filter(name => name && !(/^.+--.+$/.test(name)))
    .map(name => `${name}--placeholder`)
    .reduce((acc, name) => `${acc} ${name}`, staticClass)
  : staticClass;

const makeOptions = ({ data }) => (data && data.staticClass) ? { staticClass: placeholdenStaticClassMarged(data.staticClass) } : {};
const placeholdenRecursive = (vnodes, createElement) => vnodes.map(vnode => (
  createElement(vnode.tag, makeOptions(vnode), vnode.children && placeholdenRecursive(vnode.children, createElement)))
);

const placeholden = vnode => {
  if (!vnode) {
    return vnode;
  }
  vnode.data = { ...vnode.data, ...makeOptions(vnode) };
  if (vnode.componentInstance) {
    placeholden(vnode.componentInstance.$vnode);
    vnode.$children.forEach(vueInstance => {
      placeholden(vueInstance.$vnode);
    });
  }
  return vnode;
};

export default {
  functional: true,
  render(createElement, { data, children }) {
    return createElement(data.tag, data, children.map(placeholden));
  },
};
