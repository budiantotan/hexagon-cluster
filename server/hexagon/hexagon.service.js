const Hexagon = require('./hexagon.model');
const {
  getNeighbourCoordinate,
  getAllNeighbourCoordinate,
} = require('../common/coordinates');

const _getNeighboursByCoordinate = async ({ x, y, z }) => {
  // Get a hexagon group, this will include the targetHexagon as well
  // We'll remove it before returning.
  const hexagonGroup = await Hexagon.find({
    x: {
      $gte: x - 1,
      $lte: x + 1,
    },
    y: {
      $gte: y - 1,
      $lte: y + 1,
    },
    z: {
      $gte: z - 1,
      $lte: z + 1,
    },
  });

  return hexagonGroup.filter(
    hexagon => !(hexagon.x === x && hexagon.y === y && hexagon.z === z)
  );
};

/**
 * Create the first hexagon
 * @param {string} name The intial hexagon name
 * @returns {Hexagon} hexagon
 */
const initiateCluster = async name => {
  const exist = await Hexagon.exists({ x: 0, y: 0, z: 0 });
  if (exist) {
    throw Error('Cluster already initiated!');
  }

  return await Hexagon.create({
    name,
    x: 0,
    y: 0,
    z: 0,
  });
};

/**
 * Create new hexagon
 * @param {string} name The new hexagon name
 * @param {string} targetName The name of the hexagon target
 * @param {number} side The side of hexagon target
 */
const createHexagon = async (name, targetName, side) => {
  const nameExist = await Hexagon.exists({ name: name });
  if (nameExist) {
    throw Error(`Hexagon name: ${name} exists! Please use another name`);
  }

  const targetHexagon = await Hexagon.findOne({ name: targetName });
  if (!targetHexagon) {
    throw Error('Target is not found!');
  }

  const targetCoordinate = {
    x: targetHexagon.x,
    y: targetHexagon.y,
    z: targetHexagon.z,
  };
  const { x, y, z } = getNeighbourCoordinate(targetCoordinate, side);
  const coordinateExist = await Hexagon.exists({ x, y, z });

  if (coordinateExist) {
    throw Error(`Side ${side} of ${targetName} exists!`);
  }

  return Hexagon.create({ name, x, y, z });
};

/**
 * Get hexagon name with neighbour
 * @param {string} name Hexagon name
 */
const getHexagon = async name => {
  const targetHexagon = await Hexagon.findOne({ name });
  if (!targetHexagon) {
    throw Error(`Hexagon ${name} not found!`);
  }

  const hexagonNeighbours = await _getNeighboursByCoordinate({
    x: targetHexagon.x,
    y: targetHexagon.y,
    z: targetHexagon.z,
  });
  const neighbourCoordinates = getAllNeighbourCoordinate({
    x: targetHexagon.x,
    y: targetHexagon.y,
    z: targetHexagon.z,
  });

  let neighbourString = null;
  if (hexagonNeighbours.length > 0) {
    neighbourString = Object.keys(neighbourCoordinates)
      .map(side => {
        const { x, y, z } = neighbourCoordinates[side];
        const found = hexagonNeighbours.find(
          hex => hex.x === x && hex.y === y && hex.z === z
        );
        return found ? `(${side}, ${found.name})` : null;
      })
      .filter(Boolean)
      .join(', ');
  }

  return {
    name: targetHexagon.name,
    neighbours: neighbourString,
  };
};

/**
 * Get all hexagons
 */
const getAllHexagon = async () => {
  const hexagons = await Hexagon.find({});
  if (hexagons.length === 0) {
    throw Error('Cluster is not inititated yet!');
  }

  return hexagons.map(hex => ({
    name: hex.name,
    x: hex.x,
    y: hex.y,
    z: hex.z,
  }));
};

/**
 * Delete a hexagon without disconnect
 * @param {string} name Target hexagon to delete
 */
const deleteHegaxon = async name => {
  const targetHexagon = await Hexagon.findOne({ name });
  if (!targetHexagon) {
    throw Error(`Hexagon ${name} not found!`);
  }

  const deleteTarget = async () => {
    const result = await Hexagon.deleteOne({ name });
    if (result.n === 1) {
      return `Hexagon ${name} deleted successfully`;
    }
  };

  const neighbours = await _getNeighboursByCoordinate({
    x: targetHexagon.x,
    y: targetHexagon.y,
    z: targetHexagon.z,
  });

  // If only 1 neighbour, it'll be safe to remove
  if (neighbours.length <= 1) {
    return await deleteTarget();
  }

  // tl;dr: Run through BFS, but treat the target not as not exist
  // start with first neighbour of target node
  // Another alternative is using djiksta to find the path, but there's no weight here :(
  // Will this scale? doubtly, the memory grow as more request is coming in.
  // The correctness will be an issue when there's insertion during this long process.
  // Maybe need to use graph optimized DB??
  const queueSet = new Set();
  const visitedSet = new Set();
  const count = await Hexagon.countDocuments();

  // Initiate the queue
  queueSet.add(neighbours[0].coordinateKey);

  for (const current of queueSet) {
    visitedSet.add(current);
    const [x, y, z] = current.split(',').map(Number);
    const neighbours = await _getNeighboursByCoordinate({ x, y, z });

    neighbours.forEach(neighbour => {
      const inQueue = queueSet.has(neighbour.coordinateKey);
      const visited = visitedSet.has(neighbour.coordinateKey);

      if (
        !(
          inQueue ||
          visited ||
          neighbour.coordinateKey === targetHexagon.coordinateKey
        )
      ) {
        queueSet.add(neighbour.coordinateKey);
      }
    });
  }

  if (visitedSet.size !== count - 1) {
    throw Error(`Unable remove hexagon ${name}, it'll create new cluster!`);
  }
  return await deleteTarget();
};

module.exports = {
  initiateCluster,
  createHexagon,
  getAllHexagon,
  getHexagon,
  deleteHegaxon,
};
