import React from 'react';
import './App.scss';
import Board from '../Board/Board';

function App() {

  return (
    <div className="App">
      <Board size={9}/>
    </div>
  );
}

export default App;
