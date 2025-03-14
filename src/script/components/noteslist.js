import Utils from '../utils.js';

class NotesListComponent extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _column = 4;
  _gutter = 16;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  static get observedAttributes() {
    return ['column', 'gutter'];
  }

  set column(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) {
      return;
    }

    this._column = newValue;
  }

  get column() {
    return this._column;
  }

  set gutter(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) {
      return;
    }
    this._gutter = newValue;
  }

  get gutter() {
    return this._gutter;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display:block
            }
            .list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: ${this._gutter}px;
            }
        `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
            <div class="list">
                <slot></slot>
            </div>
        `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'column':
        this._column = newValue;
        break;

      case 'gutter':
        this._gutter = newValue;
        break;
    }

    this.render();
  }
}

customElements.define('note-list', NotesListComponent);
