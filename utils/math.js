function rInt(from, to) {
  return Math.floor(Math.random() * (from - to + 1) + to)
}

export { rInt }
