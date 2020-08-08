const mongoose = require('mongoose');

// Schema
const HexagonSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    x: {
      type: Number,
      trim: true,
    },
    y: {
      type: Number,
      trim: true,
    },
    z: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: '__createdAt', updatedAt: '__updatedAt' },
    toJSON: { virtuals: true },
    toObject: { virtuals: false },
  }
);

HexagonSchema.virtual('coordinateKey').get(function () {
  return `${this.x},${this.y},${this.z}`;
});

// Index
HexagonSchema.index({ x: 1, y: 1, z: 1 });

module.exports = mongoose.model('Hexagon', HexagonSchema);
