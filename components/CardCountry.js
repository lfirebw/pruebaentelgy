var template = `
<div class="card country">
    <div>
        <img class="img-fluid" src="https://flagcdn.com/pe.svg" srcset="https://flagcdn.com/w320/pe.png">
    </div>
    <h1 class="txt-center country-name">Perú</h1>
</div>
`
class CardCountry extends HTMLElement{
    constructor(){
        super();
        this.name;
        this.flagSrc;
        this.flagSrcSet;
        this.index;
        this.country = null;
    }
    /**GET AND SETS */
    get name() { return this.getAttribute("name"); } 
    set name(value) { this.setAttribute("name", value); }
    get flagSrc() { return this.getAttribute("flagSrc"); } 
    set flagSrc(value) { this.setAttribute("flagSrc", value); }
    get flagSrcSet() { return this.getAttribute("flagSrcSet"); } 
    set flagSrcSet(value) { this.setAttribute("flagSrcSet", value); }
    get index() { return this.getAttribute("index"); } 
    set index(value) { this.setAttribute("index", value); }

    _showModal(){
        let idiomas = ''
        
        for( let [k,v] of Object.entries(this.country.languages)){ 
            idiomas = String.prototype.concat(idiomas,`
                <li>${v}</li>
            `);
        }
        const modalhtml = `<modal-component>
            <h1 style=" background:transparent;" slot="header">Detalle de ${this.name}</h1>
            <div slot="content">
                <div>
                    <figure style="width:100%; max-width:150px; margin:0 auto;">
                        <img class="img-fluid" src="${this.flagSrc}" srcset="${this.flagSrcSet}">
                    </figure>
                </div>
                <ul>
                    <li>
                        <p class="font-xlarge"><strong>Continente</strong>: ${this.country.region}</p>
                    </li>
                    <li>
                        <p class="font-xlarge"><strong>Sub-Continente</strong>: ${this.country.subregion}</p>
                    </li>
                    <li>
                        <p class="font-xlarge"><strong>Idiomas</strong>: </p>
                        <ul>
                            ${idiomas}
                        </ul>
                    </li>
                </ul>
            </div>
        </modal-component>`;
        document.body.insertAdjacentHTML("beforeend" , modalhtml);
        document.body.querySelector("modal-component").showModal()
    }
    /** Main Method */
    connectedCallback(){
        //get countries from parent component and find the current country
        this.country = this.closest("grid-country")._countries[this.index]
        this.innerHTML = `
        <div class="card country">
            <div class="image">
                <img class="img-fluid" src="${this.flagSrc}" srcset="${this.flagSrcSet}">
            </div>
            <h1 class="txt-center country-name">${this.name}</h1>
        </div>
        `
        this.addEventListener("click",this._showModal)
    }
    disconnectedCallback() {
        this.removeEventListener("click",this._showModal)
    }
}


window.customElements.define("card-country",CardCountry)