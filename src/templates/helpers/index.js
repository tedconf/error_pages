/*globals Buffer */

exports.eq = function (v1, v2) {
  return v1 === v2;
};

exports.or = function (v1, v2) {
  return v1 || v2;
};

exports.base64 = function (svg) {
  return Buffer.from(svg).toString('base64');
}

exports.concat = function () {
  return Array.prototype.slice.call(arguments, 0, -1).join('');
}
