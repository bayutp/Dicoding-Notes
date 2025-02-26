class SectionTitleComponent extends HTMLElement {

    _shadowRoot = null
    _style = null

    _title = "Default Title"

    constructor() {
        super()

        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._style = document.createElement('style')

        this.render()
    }

    static get observedAttributes() {
        return ['title']
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
            display: block;
        }

        .title-section {
            margin-block-end: 2rem;
            font-size: 1.2em;
        }
        `
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = ''
    }

    set title(value) {
        this._title = value
    }

    get title() {
        return this._title
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this._title = newValue
                break;
        }
        this.render()

    }

    render(){
        this._emptyContent()
        this._updateStyle()

        this._shadowRoot.appendChild(this._style)
        this._shadowRoot.innerHTML += `
        <section id="notes" class="notes">
            <div class="title-section">
            <h2>${this.title}</h2>
            </div>

            <div>
            <slot></slot>
            </div>
        </section>
        `
    }
}

customElements.define('section-title', SectionTitleComponent)