const _neighbourCoordinates = [
  { x: 0, y: 1, z: -1 },
  { x: 1, y: 0, z: -1 },
  { x: 1, y: -1, z: 0 },
  { x: 0, y: -1, z: 1 },
  { x: -1, y: 0, z: 1 },
  { x: -1, y: 1, z: 0 },
];

/**
 * Get the targeted coordinate given by the side of the hexagon
 * @param {Object} coordinate The coordinate of the hexagon
 * @param {number} coordinate.x X point of hexagon
 * @param {number} coordinate.y Y point of hexagon
 * @param {number} cooridnate.z Z point of hexagon
 * @param {number} side Which side of the hexagon
 */
const getNeighbourCoordinate = (coordinate, side) => {
  if (!Number.isInteger(side)) {
    throw Error('Side should be rounded integer');
  }

  if (side < 0 || side > 5) {
    throw Error('Side should be between 0 & 5');
  }

  const targetCoordinate = _neighbourCoordinates[side];
  return {
    x: coordinate.x + targetCoordinate.x,
    y: coordinate.y + targetCoordinate.y,
    z: coordinate.z + targetCoordinate.z,
  };
};

/**
 * Calculate all neighbour's coordinate
 * @param {Object} coordinate The coordinate of the hexagon
 * @param {number} coordinate.x X point of hexagon
 * @param {number} coordinate.y Y point of hexagon
 * @param {number} cooridnate.z Z point of hexagon
 * @param {number} side Which side of the hexagon
 */
const getAllNeighbourCoordinate = coordinate => {
  return _neighbourCoordinates
    .map(sideCoordinate => ({
      x: coordinate.x + sideCoordinate.x,
      y: coordinate.y + sideCoordinate.y,
      z: coordinate.z + sideCoordinate.z,
    }))
    .reduce((accumulate, current, index) => {
      return {
        ...accumulate,
        [index]: current,
      };
    }, {});
};

module.exports = { getNeighbourCoordinate, getAllNeighbourCoordinate };
