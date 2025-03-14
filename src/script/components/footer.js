class FooterComponent extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: block
            }
            div {
                padding: 8px 16px;
                text-align: center;
                color: beige;
            }
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        
            <div>
                Dicoding Notes Apps &copy; 2025
            </div>
        `;
  }
}

customElements.define('footer-bar', FooterComponent);
