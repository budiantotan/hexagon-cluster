const { coordinateToString } = require('./coordinates');

/**
 * Create new hexagon
 * @param name hexagon name
 * @param coordinate hexagon coordiante
 */
const createHexagon = (name, coordinate) => {
  const getKey = () => {
    return coordinateToString(coordinate);
  };

  const getName = () => {
    return name;
  };

  const getCoordinate = () => {
    return coordinate;
  };

  return {
    getKey,
    getName,
    getCoordinate,
  };
};

module.exports = createHexagon;
