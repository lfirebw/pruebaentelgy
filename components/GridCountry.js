class GridCountry extends HTMLElement {
    constructor(){
        super();
        this.apisrc;
        this.column;
        this.row;
        this._countries = [];
    }
    /**GET AND SETS */
    get row() {
        return this.getAttribute("row");
    } 
    set row(value) {
        this.setAttribute("row", value);
    }
    get column() {
        return this.getAttribute("column");
    } 
    set column(value) {
        this.setAttribute("column", value);
    }
    get apisrc() {
        return this.getAttribute("apisrc");
    } 
    set apisrc(value) {
        this.setAttribute("apisrc", value);
    }
    /** Logic Method */
    _findCountry(){
        const url = this.apisrc || "https://restcountries.com/v3.1/lang/spa"
        return fetch(url)
        .then(r => r.json())
        .then(response =>{
            if(response != null && Object.values(response).length > 0){
                this._countries = response
            }
        })
    }
    _getTemplateGrid(rowValue,colValue,arrCountry = []){
        let items = ''
        let totalItem = rowValue * colValue
        for(let i = 1;i <= totalItem;i++){
            const index = i - 1
            const country = arrCountry[index]
            const countryName = country.name.common
            const countrySign = country.cca2.toLowerCase()
            const countryFlag = String.prototype.concat("https://flagcdn.com/",countrySign,".svg")
            const countryFlag2 = String.prototype.concat("https://flagcdn.com/w320/",countrySign,".png")
            items = String.prototype.concat(items,`
                <div class="item item-${i}">
                    <card-country index="${index}" name="${countryName}" flagSrc="${countryFlag}" flagSrcSet="${countryFlag2}"></card-country>
                </div>
            `)
        }
        return `
            <div class="grid-container">
                ${items}
            </div>
        `
    }
    /** Main Method */
    static get observedAttributes(){
        return ["column","row"];
    }
    attributeChangedCallback(nameAttr,oldValue,newValue){
        console.log(nameAttr,oldValue,newValue);
    }
    connectedCallback(){
        try{
            const _row = this.row != null ? this.row : 3
            const _column = this.column != null ? this.column : 4
            
            this.innerHTML = "loading...";
            
            this._findCountry().then(()=>{
                this.innerHTML = this._getTemplateGrid(_row,_column,this._countries)
            })

        }catch(err){
            console.error("Error at connectedCallback: ",err)
            this.innerHTML = `Error to initialize the webcomponent`
        }
    }
}
window.customElements.define("grid-country",GridCountry)