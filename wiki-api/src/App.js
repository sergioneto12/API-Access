import './App.css';
import React from 'react';
import TitleList from './utils/get';
import TitleInput from './utils/post';
import TitleDelete from './utils/deleteAll';

function App() {

  return (
    <div className="App">
      <TitleInput></TitleInput>
      <TitleList></TitleList>
      <TitleDelete></TitleDelete>
    </div>
  );
}

export default App;
