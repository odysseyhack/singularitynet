function mapToObject(map) {
  return [...map].reduce((acc, cur) => Object.assign({}, acc, { [cur[0]]: cur[1] }), {})
}

function protoToMap(proto) {
  const households = new Map()
  proto.households.forEach(household => {
    households.set(household.identity, household.type)
  })
  return households
}

module.exports = {
  mapToObject,
  protoToMap
}
