/**
 * Get the targeted coordinate given by the side of the hexagon
 * @param coordinate The coordinate, consist of x, y, z
 * @param side Which side of the hexagon
 */
const getCoordinateFromSide = (coordinate, side) => {
  if (!Number.isInteger(side)) {
    throw Error('Side should be rounded integer');
  }

  if (side < 0 || side > 5) {
    throw Error('Side should be between 0 & 5');
  }

  switch (side) {
    case 0:
      return {
        x: coordinate.x,
        y: coordinate.y + 1,
        z: coordinate.z - 1,
      };

    case 1:
      return {
        x: coordinate.x + 1,
        y: coordinate.y,
        z: coordinate.z - 1,
      };

    case 2:
      return {
        x: coordinate.x + 1,
        y: coordinate.y - 1,
        z: coordinate.z,
      };

    case 3:
      return {
        x: coordinate.x,
        y: coordinate.y - 1,
        z: coordinate.z + 1,
      };

    case 4:
      return {
        x: coordinate.x - 1,
        y: coordinate.y,
        z: coordinate.z + 1,
      };

    case 5:
      return {
        x: coordinate.x - 1,
        y: coordinate.y + 1,
        z: coordinate.z,
      };
  }
};

/**
 * Convert coordinate to string value
 * @param coordinate Coordinate (x, y, z)
 */
const coordinateToString = coordinate => {
  return `${coordinate.x};${coordinate.y};${coordinate.z}`;
};

/**
 * Convert string value to coordinate
 * @param coordinate Coordinate (x, y, z)
 */
const stringToCoordinate = coordinate => {
  const [x, y, z] = coordinate.split(';').map(str => Number(str));

  return {
    x,
    y,
    z,
  };
};

module.exports = {
  getCoordinateFromSide,
  coordinateToString,
  stringToCoordinate,
};
