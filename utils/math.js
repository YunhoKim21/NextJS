function rInt(from, to) {
  return Math.floor(Math.random() * (from - to + 1) + to)
}

function in_range(target, from, to) {
  if (from < to) {
    return from < target && target < to
  } else {
    return to < target && target < from
  }
}

function twoLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  var a = y2 - y1
  var b = x1 - x2
  var c = y1 * (x1 - x2) + x1 * (y2 - y1)
  var d = y4 - y3
  var e = x3 - x4
  var f = y3 * (x3 - x4) + x3 * (y4 - y3)
  var x = (e * c - b * f) / (a * e - b * d)
  var y = (-d * c + a * f) / (a * e - d * b)
  return [x, y]
}

function ccw(x1, y1, x2, y2, x3, y3) {
  return (x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2)
}

export { rInt, in_range, twoLineIntersection, ccw }
