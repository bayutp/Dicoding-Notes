class NoteItemsComponent extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: false,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        border-radius: 8px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        overflow: hidden;
      }

      .notes-info {
        flex-grow: 1;
        padding: 16px 24px;
        display: flex;
        flex-direction: column;
      }

      .notes-info__description {
        flex-grow: 1; 
      }

      .notes-footer {
        padding: 10px 0px;
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }

      .notes-info__btn {
        width: 100%;
        padding: 12px;
        background-color: #d9534f;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.2s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .notes-info__btn:hover {
        background-color: #c9302c;
      }
      
      .btn-archive {
        background-color: #f0ad4e;
      }
      
      .btn-archive:hover {
        background-color: #ec971f;
      }
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  render() {
    const title = this._note.archived ? 'Restore' : 'Archived';
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="card">
          <div class="notes-info">
            <div class="notes-info__title">
              <h2>${this._note.title}</h2>
            </div>
            <div class="notes-info__description">
              <p>${this._note.body}</p>
            </div>
            <div class="notes-footer">
              <button class="notes-info__btn">Delete</button>
              <button class="notes-info__btn btn-archive">${title}</button>
            </div>
          </div>
        </div>
        `;
    this._shadowRoot
      .querySelector('.btn-archive')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('archive-note', {
            detail: { id: this._note.id, archived: this._note.archived },
            bubbles: true,
            composed: true,
          })
        );
      });
    this._shadowRoot
      .querySelector('.notes-info__btn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('delete-note', {
            detail: { id: this._note.id },
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define('note-items', NoteItemsComponent);
