class NoteItemsComponent extends HTMLElement {

    _shadowRoot = null
    _style = null

    _note = {
        id: null,
        title: null,
        body: null,
        createdAt: null,
        archived: false,
    }

    constructor() {
        super()

        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._style = document.createElement('style')
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
            display: block;
            border-radius: 8px;

            box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
            overflow: hidden;
        }

        .notes-info {
            padding: 16px 24px;
        }

        .notes-info__title h2 {
            font-weight: lighter;
        }

        .notes-info__description p {
            display: -webkit-box;
            margin-top: 10px;

            overflow: hidden;

            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
        }
        `
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = ''
    }

    set note(value) {
        this._note = value
        this.render()
    }

    get note() {
        return this._note
    }

    render() {
        this._emptyContent()
        this._updateStyle()

        this._shadowRoot.appendChild(this._style)
        this._shadowRoot.innerHTML += `
        <div class="card">
          <div class="notes-info">
            <div class="notes-info__title">
              <h2>${this._note.title}</h2>
            </div>
            <div class="notes-info__description">
              <p>${this._note.body}</p>
            </div>
          </div>
        </div>
        `
    }
}

customElements.define('note-items', NoteItemsComponent)