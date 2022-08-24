function rInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //최댓값은 제외, 최솟값은 포함
}

function in_range(target, from, to) {
  if (from < to) {
    return from < target && target < to
  } else {
    return to < target && target < from
  }
}

export { rInt, in_range }
