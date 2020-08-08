import React, { useState, useContext } from 'react';

const GetClusterContext = React.createContext([]);
const SetClusterContext = React.createContext(() => {});

const ClusterProvider = ({ children }) => {
  const [hexagons, setHexagons] = useState([]);

  return (
    <SetClusterContext.Provider value={setHexagons}>
      <GetClusterContext.Provider value={hexagons}>
        {children}
      </GetClusterContext.Provider>
    </SetClusterContext.Provider>
  );
};

export const useGetCluster = () => {
  return useContext(GetClusterContext);
};

export const useSetCluster = () => {
  return useContext(SetClusterContext);
};

export default ClusterProvider;
