import cx from 'classnames';

function getCxMod(base, mod) {
  return `${base}--${mod}`
}

// Accepts single or plural mods. If single, returns the mod appended
// to the base. If plural, returns an array of each mod appended to
// the base.
function cxMod(base, mod) {
  if (mod && mod.constructor === Array) {
    return mod.map(m => getCxMod(base, m))
  } else if (typeof mod === 'string' && mod.length > 0) {
    return getCxMod(base, mod)
  } else {
    return null;
  }
}

export default function classNameHelpers(Component) {
  const block = Component.name;

  Component.prototype.cx = function(mod, ...rest) {
    return cx(block, cxMod(block, mod), this.className, ...rest)
  };

  Component.prototype.cxEl = function(el, mod, ...rest) {
    if (typeof el !== 'string') {
      throw new Error('Called this.cxEl without an element string!')
    }
    const cxEl = `${block}__${el}`;

    return cx(cxEl, cxMod(cxEl, mod), ...rest)
  };

  return Component;
};
