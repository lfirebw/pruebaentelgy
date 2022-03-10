class modalComponent extends HTMLElement
{
    constructor(){
        super()
        this._modalVisible = false;
        this._modal;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../css/modal.css" />
            <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="btn btn-small btn-red close">&times;</span>
                        <slot name="header"><h1>Default text</h1></slot>
                    </div>
                    <div class="modal-body">
                        <slot name="content"><slot>
                    </div>
                </div>
            </div>
        `
    }
    showModal() {
        this._modalVisible = true;
        this._modal.style.display = 'block';
    }
    hideModal() {
        this._modalVisible = false;
        this._modal.style.display = 'none';
        this.parentNode.removeChild(this)
    }
    connectedCallback(){
        this._modal = this.shadowRoot.querySelector(".modal");
        this.shadowRoot.querySelector(".close").addEventListener('click', this.hideModal.bind(this));
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector(".close").removeEventListener('click', this.hideModal);
    }
}

window.customElements.define("modal-component",modalComponent)