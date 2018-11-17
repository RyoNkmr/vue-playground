const placeholdenStaticClassMarged = staticClass =>
  staticClass
  ? staticClass.split(' ')
    .filter(name => name && !(/^.+--.+$/.test(name)))
    .map(name => `${name}--placeholder`)
    .reduce((acc, name) => `${acc} ${name}`, staticClass)
  : staticClass;


const placeholdenRecursive = node => {
  if (!node) {
    return node;
  }
  node.className = placeholdenStaticClassMarged(node.className);
  if (node.children) {
    [...node.children].forEach(placeholdenRecursive);
  }
  return node;
};

export default {
  mounted() {
    this.placeholden();
    this.mutationObserver = new MutationObserver(this.placeholden);
    this.mutationObserver.observe(this.$el, {
      childList: true,
      subtree: true,
    });
  },
  methods: {
    placeholden() {
      placeholdenRecursive(this.$el);
    },
  },
}

