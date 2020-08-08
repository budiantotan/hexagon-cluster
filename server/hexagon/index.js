const express = require('express');
const yup = require('yup');
const router = express.Router();
const {
  initiateCluster,
  createHexagon,
  getHexagon,
  getAllHexagon,
  deleteHegaxon,
} = require('./hexagon.service');

const initiateSchema = yup.object().shape({
  name: yup.string().required(),
});

const createHexagonSchema = yup.object().shape({
  name: yup.string().required(),
  targetName: yup.string().required(),
  side: yup.number().required().min(0).max(5),
});

// Initiate cluster
router.post('/initiate', async (req, res, next) => {
  try {
    const body = await initiateSchema.validate(req.body);
    const result = await initiateCluster(body.name);
    res.json({
      result: `Cluster created with ${result.name} as initital hexagon`,
    });
  } catch (err) {
    next(err);
  }
});

// Create hexagon
router.post('/', async (req, res, next) => {
  try {
    const body = await createHexagonSchema.validate(req.body);
    const result = await createHexagon(body.name, body.targetName, body.side);

    res.json({
      result: `Hexagon: ${result.name} created succesfully`,
    });
  } catch (err) {
    next(err);
  }
});

// Get hexagon with neighbour information
router.get('/:name', async (req, res, next) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const result = await getHexagon(name);

    res.json({ result });
  } catch (err) {
    next(err);
  }
});

// Get all hexagons
router.get('/', async (req, res, next) => {
  try {
    const hexagons = await getAllHexagon();
    res.json({ result: hexagons });
  } catch (err) {
    next(err);
  }
});

// Delete hexagon
router.delete('/:name', async (req, res, next) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const result = await deleteHegaxon(name);

    res.json({ result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
