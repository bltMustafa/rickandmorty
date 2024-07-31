import React from 'react';
import CharacterList from '../Components/CharacterList'
import Episodelist from "../Components/EpisodeList"

const Home: React.FC = () => {
  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <CharacterList />
      <Episodelist/>
    </div>
  );
};

export default Home;
