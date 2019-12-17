import React from 'react';
import './App.css';
import MainCanvas from './MainCanvas/MainCanvas'
import LayersPanel from './LayersPanel/LayersPanel'
import SubmenuBar from './SubmenuBar/SubmenuBar'
import SourceInfoPanel from './SourceInfoPanel/SourceInfoPanel';

class App extends React.Component {
  state ={
    opacity: 128,
    blendMode: "BLEND"
  }

  handleOpacity = (event) => {
    const target = event.target

    this.setState({ opacity: Number(target.value)})
  }

  handleBlendMode = (event) => {
    const target = event.target

    this.setState({blendMode: target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="main-toolbar">
          Toolbar
        </header>
        <LayersPanel />
        <SubmenuBar 
          opacity={this.state.opacity}
          handleOpacity={this.handleOpacity}
          blendMode={this.state.blendMode}
          handleBlendMode={this.handleBlendMode}
          />     
        <section className="compositions-panel">
          Compositions
        </section>
        <section className="key-bindings-panel">
          Key Bindings
        </section>
        <SourceInfoPanel />
        <MainCanvas imageWidth="400" imageHeight="300" opacity={this.state.opacity} />
      </div>
    )
  }
}

export default App;
