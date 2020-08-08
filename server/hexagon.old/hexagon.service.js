const createHexagon = require('./hexagon.model');
const {
  getCoordinateFromSide,
  coordinateToString,
  stringToCoordinate,
} = require('./coordinates');

/**
 * This is definitely not the best way to store data, using memory will cause scale issues
 */
const ClusterMap = name => {
  const cluster = new Map();

  /**
   * Initiate first hexagon as the starting point.
   */
  const initialHex = createHexagon(name, { x: 0, y: 0, z: 0 });
  cluster.set(initialHex.getKey(), initialHex);

  /**
   * Get hexagon by name
   * @param name hexagon name
   */
  const _getHexagonByName = name => {
    for (const [, value] of cluster.entries()) {
      if (value.getName() === name) {
        return value;
      }
    }
  };

  const _findNeighboursByCoordinate = coordinate => {
    const neighbours = [];
    for (let i = 0; i < 6; i++) {
      const neighbourCoordinate = getCoordinateFromSide(coordinate, i);
      const foundNeighbour = cluster.get(
        coordinateToString(neighbourCoordinate)
      );

      if (foundNeighbour) {
        neighbours.push({ side: i, hexagon: foundNeighbour });
      }
    }
    return neighbours;
  };

  /**
   * Get all hexagon as json
   */
  const getAsArray = () => {
    return Array.from(cluster).map(([_, value]) => ({
      name: value.getName(),
      coordinate: value.getCoordinate(),
    }));
  };

  /**
   * Add new hexagon
   * @param targetHexagonName The target hexagon name, which will be the neighbour
   * @param newHexagonName The new hexagon name
   * @param side Which side of the hexagon to add, 0 - 5
   */
  const addNewHexagon = (targetHexagonName, newHexagonName, side) => {
    const targetHexagon = _getHexagonByName(targetHexagonName);
    if (!targetHexagon) {
      throw new Error(`Target hexagon: ${targetHexagonName} doesn't exist`);
    }

    const newHexagonExists = _getHexagonByName(newHexagonName);
    if (newHexagonExists) {
      throw new Error(
        `New hexagon with name: ${newHexagonName} already exist. Please use another name`
      );
    }

    const newHexagonPosition = getCoordinateFromSide(
      targetHexagon.getCoordinate(),
      side
    );
    if (cluster.has(coordinateToString(newHexagonPosition))) {
      throw new Error(
        `Side ${side} of hexagon: ${targetHexagonName} already exist. Please use another side`
      );
    }

    const newHexagon = createHexagon(newHexagonName, newHexagonPosition);
    cluster.set(newHexagon.getKey(), newHexagon);
  };

  /**
   * Get the neighbours of a hexagon
   * @param targetHexagonName The targetted hexagon name
   */
  const getNeighbours = targetHexagonName => {
    const targetHexagon = _getHexagonByName(targetHexagonName);
    if (!targetHexagon) {
      throw new Error(`Hexagon: ${targetHexagonName} doesn't exist`);
    }

    return _findNeighboursByCoordinate(targetHexagon.getCoordinate());
  };

  /**
   * Safely remove cluster
   * @param name Target hexagon name
   */
  const removeHexagon = name => {
    const targetHexagon = _getHexagonByName(name);
    if (!targetHexagon) {
      throw new Error(`Hexagon: ${name} doesn't exist`);
    }

    const neighbours = _findNeighboursByCoordinate(
      targetHexagon.getCoordinate()
    );
    const targetKey = targetHexagon.getKey();

    // If only 1 neighbour exist, it's at the end we can safely remove it
    if (neighbours.length <= 1) {
      cluster.delete(targetHexagon.getKey());
      return `Hexagon ${name} successfully removed!`;
    }

    // tl;dr: Run through BFS, but treat the target not as not exist
    // start with first neighbour of target node
    const queueSet = new Set();
    const visitedSet = new Set();
    queueSet.add(neighbours[0].hexagon.getKey());

    for (const current of queueSet) {
      visitedSet.add(current);
      const neighbours = _findNeighboursByCoordinate(
        stringToCoordinate(current)
      );

      neighbours.forEach(neighbour => {
        const neighbourKey = neighbour.hexagon.getKey();
        const inQueue = queueSet.has(neighbourKey);
        const visited = visitedSet.has(neighbourKey);

        if (!(inQueue || visited || neighbourKey === targetKey)) {
          queueSet.add(neighbourKey);
        }
      });
    }

    if (visitedSet.size === cluster.size - 1) {
      cluster.delete(targetHexagon.getKey());
      return `Hexagon ${name} successfully removed!`;
    }

    throw Error(`Unable remove hexagon ${name}, it'll create new cluster!`);
  };

  return {
    getAsArray,
    addNewHexagon,
    getNeighbours,
    removeHexagon,
  };
};

const Cluster = ClusterMap('A');

module.exports = {
  getAllHexagon: Cluster.getAsArray,
  createHexagon: Cluster.addNewHexagon,
  getHexagon: Cluster.getNeighbours,
  deleteHegaxon: Cluster.removeHexagon,
};
