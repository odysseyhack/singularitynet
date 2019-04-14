function mapToObject(map) {
  return [...map].reduce((acc, cur) => Object.assign({}, acc, { [cur[0]]: cur[1] }), {})
}

function protoToMap(proto) {
  const yields = new Map()
  proto.yields.forEach(yieldValue => {
    yields.set(yieldValue.identity, yieldValue.amount)
  })
  return yields
}

module.exports = {
  mapToObject,
  protoToMap
}
