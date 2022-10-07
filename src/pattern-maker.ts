import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';

import { HexTile } from './hex-tile';
import  './settings-modal';
import  './sf-dropdown';
import  './sf-switch';
import { registerSW } from 'virtual:pwa-register';

@customElement('pattern-maker')
export class PatternMaker extends LitElement {

  static styles = [css`
    :host {
      --primary-color: hsla(var(--primary-color-hue, 50), var(--primary-color-saturation, 100%), var(--primary-color-luminance, 50%), var(--primary-color-alpha, 1));
      --logo-secondary-fill: var(--primary-color);
      --highlight-color-alpha: 1;
      --highlight-color: rgba(239, 229, 169, var(--highlight-color-alpha));
      --shadow-color-alpha: 1;
      --shadow-color: rgba(40, 40, 40, var(--shadow-color-alpha));

      --hex-padding: 4px;
      --column-count: 1;
      --available-area: 100vw;
      --app-padding: 16px;
      --hex-calc-size: calc((var(--available-area) - (var(--app-padding)*2)) / var(--column-count));
      display: block;
      padding: var(--app-padding);
      max-width: calc(100vw);
      min-height: calc(100vh);
      box-sizing: border-box;
      overflow: hidden;
      padding: 0;
      margin-top: 80px
    }

    main {
      display: flex;
      flex-wrap: wrap;
    }

    header {
      position: relative;
      height: 80px;
      width: 100vw;
      background-color: var(--primary-color);
      border-bottom: 3px solid var(--shadow-color);
      position: fixed;
      top: 0;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      z-index: 100;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
    }

    sf-dropdown a:hover,
    sf-dropdown a[selected] {
      background-color: var(--shadow-color);
      color: var(--highlight-color);
    }

    sf-dropdown a i {
      font-style: normal;
    }

    hex-tile {
      --hex-size: var(--hex-calc-size);
      --hex-spacing: var(--hex-padding)
    }

    button[active]{
      background-color: var(--shadow-color);
      color: var(--highlight-color);
    }

    .gridSettings {
      margin-left: auto;
    }

    .row {
      display: flex;
      flex-wrap: nowrap;
      position:relative;
      left: calc(var(--hex-calc-size)/4);
      margin-bottom: calc(4px - var(--hex-calc-size)/3)
    }

    .row:nth-of-type(2n){
      position: relative;
      left: calc(0px  - var(--hex-calc-size)/4);
    }

    a[name="Oriole Gold"] i {
      color: rgb(257, 252, 14);
    }
    a[name="Sunset Orange"] i {
      color: rgb(252, 85, 33);
    }
    a[name="Burgundy Velvet"] i {
      color: rgb(147,1,1);
    }
    a[name="Bullfinch Pink"] i {
      color: rgb(222, 133, 165);
    }
    a[name="Peacock Blue"] i {
      color: rgb(66, 160, 236);
    }
    a[name="Starling Blue"] i {
      color: rgb(26, 63, 169);
    }
    a[name="Forest Green"] i {
      color: rgb(30, 112, 22);
    }

  `]

  constructor(){
    super();
    new HexTile;
    this.style.setProperty("--column-count", this.columns.toString());
    requestAnimationFrame(()=>{
      console.log('getComputedStyle(this)', this.clientWidth);
      this.style.setProperty("--available-area", `${this.clientWidth }px`);
    })
  }

  firstUpdated() {
    registerSW({ immediate: true });
    /* this.currentColor */
    /* console.log("🚀 ~ file: pattern-maker.ts ~ line 137 ~ PatternMaker ~ firstUpdated ~ this.currentColor", this.currentColor.color) */
  }

  /**
   * The name to say "Hello" to.
   */
  @property({ type: Number })
  rows = 15

  @property({ type: String })
  toggleType = 'active' || 'color' || 'type';

  @property({type: Number})
  columns = 8

  @property({ type: Array })
  colors = [
    {name: 'Oriole Gold', color: 'rgb(257, 252, 14)'},
    {name: 'Sunset Orange', color: 'rgb(252, 85, 33)'},
    {name: 'Burgundy Velvet', color: 'rgb(147,1,1)'},
    {name: 'Bullfinch Pink', color: 'rgb(222, 133, 165)'},
    {name: 'Peacock Blue', color: 'rgb(66, 160, 236)'},
    {name: 'Starling Blue', color: 'rgb(26, 63, 169)'},
    {name: 'Forest Green', color: 'rgb(30, 112, 22)'}
  ]

  @property({type: Object})
  currentColor = this.colors[2];

  @property({ type: String})
  currentType = 'pointed'

  @property({ type: Array })
  selectedTiles = [];

  @property({ type: Boolean })
  hideGrid = false

  @property({ type: Boolean })
  hideGridSettings = true;

  setColor(colorPosition: number){
    this.currentColor = this.colors[colorPosition];
    this.updateSelectedTiles();
  }

  updateType(event: any){
    this.currentType = event.target.active ? 'pointed':'flat';
    this.updateSelectedTiles();
  }

  toggleGridSetting(){
    this.hideGridSettings = !this.hideGridSettings;
  }

  deselect(){
    this.selectedTiles.forEach((tile)=>{
      tile.selected = false
    })
    this.selectedTiles = [];
  }

  removeFromSelected(tile){
    const tileIndex = this.selectedTiles.indexOf(tile)
    console.log("🚀 ~ file: pattern-maker.ts ~ line 197 ~ PatternMaker ~ removeFromSelected ~ tileIndex", tileIndex)
    if (tileIndex > -1) {
      this.selectedTiles.splice(tileIndex, 1);
      this.selectedTiles = this.selectedTiles.slice();
      console.log("🚀 ~ file: pattern-maker.ts ~ line 201 ~ PatternMaker ~ removeFromSelected ~ .splice(tileIndex, 1)", this.selectedTiles)
    }
  }

  selectTile(event: any){
    if(event.detail.metakey){
      this.selectedTiles.push(event.target);
    }else{
      this.deselect();
      this.selectedTiles.push(event.target);
    }

    event.target.selected = !event.target.selected;
    if (!event.target.selected){
      this.removeFromSelected(event.target);
    }
    event.target.active = event.detail.metakey && event.target.active  ? true : !event.target.active;

    if(event.target.active){
      event.target.type = this.currentType;
      event.target.color = this.currentColor.color;
    }else{
      this.deselect();
    }
  }

  updateSelectedTiles(){
    this.selectedTiles.forEach((tile) => {
      if(tile.selected){
        tile.type = this.currentType;
        tile.color = this.currentColor.color;
      }
    })
  }


  toggleHideGrid(event: any){
    this.hideGrid = event.detail.hideGrid;
  }

  isSelected(ref){
    console.log("🚀 ~ file: pattern-maker.ts ~ line 239 ~ PatternMaker ~ isSelected ~ ref", ref)

    this.selectedTiles.includes(ref);
  }

  hexColumns(){
    const hexTempCols = [];
    for (var j = 0; j < this.columns; j++) {
      const tileRef = createRef();

      hexTempCols.push(html`
        <hex-tile
          ${ref(tileRef)}
          ?hideGrid="${this.hideGrid}"
          @tileClick="${this.selectTile}">
        </hex-tile>`);
    }
    return hexTempCols;
  }

  hexGrid(){
    const hexTemplate = [];
    for (var i = 1; i < this.rows; i++) {
      hexTemplate.push(html`<div class="row">${this.hexColumns()}</div>`)
    }
    return hexTemplate;
  }

  colorList(){
    const colorListTemplate = [];
    for (var i = 0; i < this.colors.length; i++) {
      let index = i;
      colorListTemplate.push(html`<a
        @click="${() => { this.setColor(index); }}"
        ?selected="${this.colors[i] === this.currentColor}"
        name="${this.colors[i].name}">
          <i>⬢</i>${this.colors[i].name}
        </a>`)
    }
    return colorListTemplate;
  }

  updatePadding(event: any){
    const rangeValue = event.detail.padding;
    this.style.setProperty('--hex-padding', `${rangeValue}px`)
  }

  updateColumns(event: any) {
    this.columns = event.detail.columns;
    this.style.setProperty("--column-count", this.columns.toString());

  }

  updateRows(event: any) {
    this.rows = event.detail.rows;
  }

  render() {
    return html`
      <header>

        <sf-dropdown btncolor="${this.currentColor.color}" title="Select Color">
          ${this.colorList()}
        </sf-dropdown>

        <sf-switch ?active="${this.currentType === 'pointed'}" @activeUpdated="${this.updateType}"></sf-switch>

        <button
          class="gridSettings"
          name="Grid Settings"
          @click="${this.toggleGridSetting}">
            ⚙
        </button>
        <settings-modal
          ?hidden="${this.hideGridSettings}"
          @toggleHideGrid="${this.toggleHideGrid}"
          @updatePadding="${this.updatePadding}"
          @updateColumns="${this.updateColumns}"
          @updateRows="${this.updateRows}">
        </settings-modal>

      </header>
      <main>
        ${this.hexGrid()}
      </main>
    `
  }
}
