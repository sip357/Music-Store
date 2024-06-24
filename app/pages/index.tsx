import React from 'react';
import TextBox from './TextBox';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to my Music Store</h1>
      <p>Discover a variety of beats at unbeatable prices</p>
      <TextBox />
    </div>
  );
};

export default Home;
