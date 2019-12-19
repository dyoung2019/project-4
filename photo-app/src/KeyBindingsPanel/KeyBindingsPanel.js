import React from 'react'
import './KeyBindingsPanel.css'

export default function KeyBindingsPanel() {
  return (
    <section className="key-bindings-panel">
      <header className="key-binding-header">
        <h2>
          Key Bindings
        </h2>
      </header>
    <div className="key-bindings-setting-list">
      <div className="key-binding-setting">
        <div className="key-shape">A</div>
        <p>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
      </div>
      <div className="key-binding-setting">
        <div className="key-shape">A</div>
        <p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
      </div>
    </div>
    </section>    
  )
}