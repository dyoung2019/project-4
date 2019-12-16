import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="main-toolbar">
        Toolbar
      </header>
      <section className="layers-panel">
        layers
      </section>
      <section className="sub-toolbar">
        toolbar
      </section>      
      <section className="compositions-panel">
        Compositions
      </section>
      <section className="key-bindings-panel">
        Key Bindings
      </section>
      <section className="source-info-panel">
        Source Info
      </section>
      <section className="main-canvas">
        main canvas
      </section>
    </div>
  );
}

export default App;
