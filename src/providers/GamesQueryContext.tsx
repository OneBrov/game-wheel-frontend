import React from 'react';

interface GamesQueryContextInterface{
    params: string;
    setParams: (params: string) => void;
}

const GamesQueryContext = React.createContext<GamesQueryContextInterface | null>(null);

export const useGamesQueryContext = () =>  React.useContext(GamesQueryContext);

export const GamesQueryProvider:React.FC = ({children}) => {
  const [params, setParams] = React.useState('?maxCount=5');

  return (
    <GamesQueryContext.Provider
      value={{
        params: params,
        setParams: setParams
      }}
    >
      {children}
    </GamesQueryContext.Provider>
  );
};

