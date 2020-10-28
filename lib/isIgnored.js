/**
 * Check if request url was ignored by the options
 * @param ignore {string|RegExp|function|Array}
 * @param req {Request}
 * @returns {boolean|*}
 */
const isIgnored = (ignore, req) => {
  if (!ignore) return false;
  if (typeof ignore === 'function') return ignore(req);
  else if (Array.isArray(ignore)) {
    return ignore.some(ex => isIgnored(ex, req));
  } else if (ignore instanceof RegExp) {
    return ignore.test(req.url);
  } else if (typeof ignore === 'string') {
    return ignore === req.url;
  }
};

module.exports = isIgnored;