const express = require('express');
const yup = require('yup');
const router = express.Router();
const {
  createHexagon,
  getHexagon,
  getAllHexagon,
  deleteHegaxon,
} = require('./hexagon.service');

const createHexagonSchema = yup.object().shape({
  name: yup.string().required(),
  targetName: yup.string().required(),
  side: yup.number().required().min(0).max(5),
});

// Automated creation (for testing purposes)
router.get('/populate', async (req, res, next) => {
  try {
    createHexagonSchema('A', 'C', 1);
    createHexagonSchema('A', 'Z', 3);
    createHexagonSchema('Z', 'X', 3);
    createHexagonSchema('Z', 'Y', 2);
    createHexagonSchema('X', 'V', 2);
    createHexagonSchema('V', 'W', 1);
    createHexagonSchema('W', 'S', 1);
    createHexagonSchema('S', 'E', 0);
  } catch (err) {
    next(err);
  }
});

// Create hexagon
router.post('/', async (req, res, next) => {
  try {
    const body = await createHexagonSchema.validate(req.body);
    const result = createHexagon(body.targetName, body.name, body.side);

    res.json({
      message: `Hexagon: ${result.name} created succesfully`,
    });
  } catch (err) {
    next(err);
  }
});

// Get hexagon with neighbour information
router.get('/:name', async (req, res, next) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const result = getHexagon(name);

    res.json({ result });
  } catch (err) {
    next(err);
  }
});

// Get all hexagons
router.get('/', async (req, res, next) => {
  try {
    const hexagons = getAllHexagon();
    res.json({ result: hexagons });
  } catch (err) {
    next(err);
  }
});

// Delete hexagon
router.delete('/:name', async (req, res, next) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const result = deleteHegaxon(name);

    res.json({ message: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
