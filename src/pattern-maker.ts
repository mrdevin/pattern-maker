import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import  GridIconSvg  from '@/img/grid-icon.svg?url';

import './hex-tile';
import { HexTilePolygon } from './hex-tile-polygon';
import  './settings-modal';
import  './sf-dropdown';
import  './sf-switch';
import  './pm-footer';
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
      margin-top: 80px;
      font-family: 'JosefinSans', Tahoma, Verdana, Segoe, sans-serif;
      background-color: white;
    }

    .hexagon {
      fill: blue;
      stroke: black;
      stroke-width: 1;
      transform-origin: center;
      transform: rotate(0deg);
    }

    main {
      display: flex;
      flex-wrap: wrap;
      background-color: white;
    }

    .label {
      display: flex;
      width: 100%;
      font-size: 12px;
      margin-top: .38em;
      justify-content: center;
    }

    * {
      box-sizing: border-box;
    }

    :host([shouldSelectMany]) .selectBtn{
      font-weight: bold;
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
      align-items: center;
    }

    sf-dropdown a:hover,
    sf-dropdown a[selected] {
      background-color: var(--shadow-color);
      color: var(--highlight-color);
    }

    sf-dropdown a i,
    sf-dropdown a span {
      display: flex;
      width: max-content;
    }

    sf-dropdown a i {
      font-style: normal;
      font-size: 2.2em;
      width:  .5em;
      margin-right: .5em
    }

    hex-tile {
      --hex-size: var(--hex-calc-size);
      --hex-spacing: var(--hex-padding)
    }

    .gridSettings {
      margin-left: auto;
      margin-right: 10px;
    }

    button {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      width: min-content;
      margin-left: .8em;
      color: var(--shadow-color);
      font-family: 'JosefinSans', Tahoma, Verdana, Segoe, sans-serif;
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

    header > svg {
      width: 30px;
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

  /**
   * The name to say "Hello" to.
   */
  @property({ type: Number })
  rows = 50

  @property({ type: String })
  toggleType = 'active' || 'color' || 'type';

  @property({type: Number})
  columns = 50

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

  @property({ type: Array })
  activeTiles = [];

  @property({ type: Boolean })
  hideGrid = false

  @property({ type: Boolean })
  hideGridSettings = true;

  @property({ type: Boolean , reflect: true})
  shouldSelectMany = false;

  constructor() {
    super();
    this.style.setProperty("--column-count", this.columns.toString());
    requestAnimationFrame(() => {
      this.updateGridWidth();
    })
    window.addEventListener('resize', () => { this.updateGridWidth() });
    window.document.body.style.background = 'transparent';
  }

  firstUpdated() {
    registerSW({ immediate: true });
  }

  updateGridWidth() {
    // this.style.setProperty("--available-area", `${this.clientWidth + 40}px`);
  }

  setColor(colorPosition: number){
    this.currentColor = this.colors[colorPosition];
    this.updateSelectedTiles('color');
  }

  updateType(event: any){
    this.currentType = event.detail.active ? 'pointed' : 'flat';
    this.updateSelectedTiles('type');
  }

  toggleGridSetting(){
    let modal = this.shadowRoot.querySelector('settings-modal');
    // @ts-ignore
    modal.hidden = !modal.hidden;
  }

  deselect(){
    this.selectedTiles.forEach((tile)=>{
      tile.selected = false
    })
    this.selectedTiles = [];
  }

  beforeUnloadListener (event){
    event.preventDefault();
    return event.returnValue = "Are you sure you want to exit, without saving your design?";
  }

  checkUnload(){
    if (this.activeTiles.length > 0) {
      window.addEventListener("beforeunload", this.beforeUnloadListener, { capture: true });
    } else {
      window.removeEventListener("beforeunload", this.beforeUnloadListener, { capture: true });
    }
  }

  removeFromSelected(tile){
    const tileIndex = this.selectedTiles.indexOf(tile)
    if (tileIndex > -1) {
      this.selectedTiles.splice(tileIndex, 1);
      this.selectedTiles = this.selectedTiles.slice();
    }
  }

  selectTile(event: any){
    if (event.detail.metakey || this.shouldSelectMany){
      this.selectedTiles.push(event.target);
    }else{
      this.deselect();
      this.selectedTiles.push(event.target);
    }

    event.target.selected = !event.target.selected;
    if (!event.target.selected){
      this.removeFromSelected(event.target);
    }

    const WasActive = event.target.active;
    event.target.active = (event.detail.metakey || this.shouldSelectMany) && event.target.active  ? true : !event.target.active;

    if (event.target.active && !WasActive){
      event.target.type = this.currentType;
      event.target.color = this.currentColor.color;
    } else if (event.target.active && WasActive){
    }else{
      this.deselect();
    }

    requestAnimationFrame(()=>{
      this.getActiveTiles();
      this.checkUnload();
    });
  }

  updateSelectedTiles(param){
    this.selectedTiles.forEach((tile) => {
      if(tile.selected){
        if (param === 'type'){
          tile.type = this.currentType;
        }

        if (param === 'color') {
          tile.color = this.currentColor.color;
        }
      }
    });
    this.getActiveTiles();
    this.checkUnload();
  }

  toggleHideGrid(event: any){
    this.hideGrid = event.detail.hideGrid;
  }

  isSelected(ref){
    this.selectedTiles.includes(ref);
  }

  colorList(){
    const colorListTemplate = [];
    for (var i = 0; i < this.colors.length; i++) {
      let index = i;
      colorListTemplate.push(html`<a
        @click="${() => { this.setColor(index); }}"
        ?selected="${this.colors[i] === this.currentColor}"
        name="${this.colors[i].name}">
          <i>⬢</i><span>${this.colors[i].name}</span>
        </a>`)
    }
    return colorListTemplate;
  }

  updatePadding(event: any){
    const rangeValue = event.detail.padding;
    this.style.setProperty('--hex-padding', `${rangeValue/50}rem`)
  }

  updateColumns(event: any) {
    this.columns = event.detail.columns;
    this.style.setProperty("--column-count", this.columns.toString());

  }

  updateRows(event: any) {
    this.rows = event.detail.rows;
  }

  toggleSelectMany() {
    this.shouldSelectMany = !this.shouldSelectMany;
  }

  getActiveTiles(){
    this.activeTiles =  Array.from(this.shadowRoot.querySelectorAll('hex-tile[active]'));
  }

  renderSelectTxt(){
    if (this.shouldSelectMany){
      return 'Selecting Many';
    }
    return 'Select Many';
  }

  save(){
    this.deselect();
    let hexGrid = this.shadowRoot.querySelector("#main");
    // @ts-ignore
    html2canvas(hexGrid).then( (canvas)=>{
      canvas.toBlob((blob)=>{
        saveAs(blob, 'Meine-Hexagonal-Design-Schnauze-Fabrik.png');
        window.removeEventListener("beforeunload", this.beforeUnloadListener, { capture: true });

      })
    });
  }

  hexColumns(row) {
    const hexTempCols = [];
    for (var j = 0; j < this.columns; j++) {
      // const tileRef = createRef();

      hexTempCols.push(html`${HexTilePolygon({column: j, row: row })}`);
    }
    return hexTempCols;
  }

  hexGrid() {
    const hexTemplate = [];
    for (var i = 1; i < this.rows; i++) {
      hexTemplate.push(html`${this.hexColumns(i)}`)
    }
    return hexTemplate;
  }

  render() {
    return html`
      <header>

        <sf-dropdown btncolor="${this.currentColor.color}" title="Select Color">
          ${this.colorList()}
        </sf-dropdown>

        <sf-switch @activeUpdated="${this.updateType}"></sf-switch>
        <button class="headerBtn selectBtn" @click="${this.toggleSelectMany}">
          ${this.renderSelectTxt()}
        </button>
        <button class="headerBtn" @click="${this.deselect}">
          Deselect All
        </button>
        <button
          class="gridSettings"
          name="Grid Settings"
          @click="${this.toggleGridSetting}">
          <img alt="gridIcon"  src="${GridIconSvg}">
          <span class="label">Grid</span>
        </button>
        <settings-modal
          @toggleHideGrid="${this.toggleHideGrid}"
          @updatePadding="${this.updatePadding}"
          @updateColumns="${this.updateColumns}"
          @updateRows="${this.updateRows}">
        </settings-modal>

      </header>

      <main id="main">
        <svg transform="translate(-50%, -50%)" width="100%" height="100%" viewBox="0 0 1000 1000">
          ${this.hexGrid()}

      </main>
      <pm-footer @save="${this.save}" .tiles="${this.activeTiles}">
      </pm-footer>
    `
  }
}
