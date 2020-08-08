import React, { useEffect, useState } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import { useGetCluster } from '../context/ClusterContext';
import styles from '../styles/ClusterRenderer.module.css';

const ClusterRenderer = () => {
  const cluster = useGetCluster();
  const [draw, setDraw] = useState();
  const [dimension, setDimension] = useState({
    x: 0,
    y: 0,
    height: 500,
    width: 500,
  });

  useEffect(() => {
    setDraw(SVG().addTo('#drawBox').size('100%', '100%').viewbox(dimension));
  }, []);

  useEffect(() => {
    if (draw) {
      draw.viewbox(dimension);
    }
  }, [dimension]);

  useEffect(() => {
    if (cluster.length > 0) {
      // Clear all svg elements before re-draw
      draw.clear();

      // Basic hexagon shape
      const hexSymbol = draw
        .symbol()
        .polygon('10,-18 -10,-18 -20,0 -10,18 10,18 20,0')
        .fill('white')
        .stroke({ width: 1, color: 'black' });

      cluster.forEach(hexagon => {
        // Calculate the position
        // Found an formula here: https://www.redblobgames.com/grids/hexagons/#hex-to-pixel
        const q = 20 * ((3 / 2) * hexagon.x);
        const r =
          20 * ((Math.sqrt(3) / 2) * hexagon.x + Math.sqrt(3) * hexagon.z);

        // Draw hexagon
        draw
          .use(hexSymbol)
          .translate(q, r)
          .data('name', hexagon.name)
          .id(hexagon.name);

        // Put the text
        const text = draw.text(hexagon.name);
        text.move(q - 3, r - 10).font({ family: 'Roboto', size: 12 });
      });
    }
  }, [cluster]);

  const handleZoomIn = () => {
    setDimension(dimension => ({
      ...dimension,
      height: dimension.height - 40,
      width: dimension.width - 40,
    }));
  };

  const handleZoomOut = () => {
    setDimension(dimension => ({
      ...dimension,
      height: dimension.height + 40,
      width: dimension.width + 40,
    }));
  };

  const handleMoveUp = () => {
    setDimension(dimension => ({
      ...dimension,
      y: dimension.y + 20,
    }));
  };

  const handleMoveDown = () => {
    setDimension(dimension => ({
      ...dimension,
      y: dimension.y - 20,
    }));
  };

  const handleMoveLeft = () => {
    setDimension(dimension => ({
      ...dimension,
      x: dimension.x + 20,
    }));
  };

  const handleMoveRight = () => {
    setDimension(dimension => ({
      ...dimension,
      x: dimension.x - 20,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionContainer}>
        {cluster.length > 0 && (
          <React.Fragment>
            <button className={styles.button} onClick={handleZoomIn}>
              {'Zoom in'}
            </button>
            <button className={styles.button} onClick={handleZoomOut}>
              {'Zoom out'}
            </button>
            <button className={styles.button} onClick={handleMoveUp}>
              {'↑'}
            </button>
            <button className={styles.button} onClick={handleMoveDown}>
              {'↓'}
            </button>
            <button className={styles.button} onClick={handleMoveLeft}>
              {'←'}
            </button>
            <button className={styles.button} onClick={handleMoveRight}>
              {'→'}
            </button>

            <span>{'Hover to see the name'}</span>
          </React.Fragment>
        )}
      </div>
      <div id="drawBox" className={styles.drawBox} />
    </div>
  );
};

export default ClusterRenderer;
