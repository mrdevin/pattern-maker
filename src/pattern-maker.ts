import { html, css, LitElement } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { ref, createRef } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import html2canvas from 'html2canvas';
import  Hammer  from 'hammerjs';
import { saveAs } from 'file-saver';
import './hex-tile';
import  './settings-modal';
import  './sf-dropdown';
import  './sf-switch';
import  './pm-footer';

import { registerSW } from 'virtual:pwa-register';

export enum GridType {
  PointedUp = "pointed-up",
  FlatUp = "flat-up"
}
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
      --row-count: 25;
      --column-count: 25;
      --hex-height: 55px;
      --hex-width: calc(var(--hex-height) * 1.7320508075688772 / 2);
      --grid-scale: 1;
      display: block;
      position: relative;

      max-width: calc(100vw);
      min-height: calc(100vh);
      box-sizing: border-box;
      overflow: hidden;
      margin-top: 80px;
      font-family: 'JosefinSans', Tahoma, Verdana, sans-serif;
      background-color: var(--highlight-color);
    }

    #svgGrid {
      transform: scale(var(--grid-scale));
      position: relative;
      border: 1px solid red;
      position: absolute;
      left: 0;
    }

    hex-tile {
      content-visibility: auto;
      contain-intrinsic-size: 86px 100px;
    }

    main {
      display: block;
      width:calc(100vw);
      height:calc(100vh - 80px - 25px);
      position: relative;
      flex-wrap: wrap;
      overflow: hidden;
      background-color: var(--highlight-color);
    }

    :host([noscroll]) main{
      overflow: hidden;
    }

    .label {
      display: flex;
      width: 100%;
      font-size: 12px;
      margin-top: .38em;
      justify-content: center;
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
  rows = 25

  @property({type: Number})
  columns = 25

  @property({ type: Number })
  currentScale = 1;

  @property({ type: String })
  toggleType = 'active' || 'color' || 'type';

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
  currentType = 'pointed';

  @property({ type: Number })
  previousWheelPosition = 0;

  @property({ type: Number })
  padding = 20;

  @property({ type: Array })
  selectedTiles = [];

  @property({ type: Array })
  activeTiles = [];

  @property({ type: Boolean })
  hideGrid = false

  @property({ type: Boolean, reflect: true })
  noscroll = false

  @state( )
  noscrollTimeout;

  @property({ type: Boolean })
  hideGridSettings = true;

  @property({ type: Boolean , reflect: true})
  shouldSelectMany = false;

  @state()
  hammerInst;

  @state()
  gridType = GridType.PointedUp;


  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('wheel', this.wheelHandler.bind(this));
    window.addEventListener('keydown', this.disableScroll.bind(this));
    window.addEventListener('keyup', this.enableScroll.bind(this));
    window.addEventListener('resize', this.updateDimensions.bind(this));

    requestAnimationFrame(() => {
      this.hammerInst = new Hammer(this.shadowRoot.querySelector('main'));
      this.hammerInst.get('pinch').set({ enable: true });

      this.hammerInst.on('pinch', this.pinchHandler.bind(this));
      this.hammerInst.on('pan', this.panhHandler.bind(this));
    })

  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('wheel', this.wheelHandler.bind(this));
    window.removeEventListener('keydown', this.disableScroll.bind(this));
    window.removeEventListener('keyup', this.enableScroll.bind(this));
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  firstUpdated() {
    registerSW({ immediate: true });
    requestAnimationFrame(()=>{
      this.updateDimensions();

    });
  }

  updateDimensions(){
      let hexDimension = this.shadowRoot.querySelector('hex-tile').shadowRoot.querySelector('path').getBoundingClientRect();
      this.style.setProperty('--hex-height', `${hexDimension.height}px`);
      this.style.setProperty('--hex-weight', `${hexDimension.width}px`);
  }

  disableScroll(event){
    if (!event.metaKey) return;
    this.noscroll = true;
  }

  enableScroll(){
    this.noscroll = false;
  }

  wheelHandler(event){
    if (!event.metaKey) return;

    //Clears timeout if it has been set
    if (this.noscrollTimeout) {
      clearTimeout(this.noscrollTimeout)
    }

    //Turns noscroll on
    this.noscroll = true;

    this.updateScale(event, event.deltaY);
  }

  pinchHandler(event) {

    let newScale = event.scale;
    newScale = Math.min(5, newScale); //Caps newscale at 6
    newScale = Math.max(.6, newScale); //Sets min size to .6

    //Sets the new scale
    this.currentScale = newScale;
    this.style.setProperty("--grid-scale", `${this.currentScale}`);
  }

  panhHandler(event) {
    event.target.scrollLeft = event.target.scrollLeft - ( event.deltaX /12);
    event.target.scrollTop = event.target.scrollTop - ( event.deltaY /12);
  }

  updateScale(_event, marker) {

    //Grabs all relevant values
    let currentScale = this.currentScale;
    let factor = marker >= 0 ? .99 : 1.01;

    //Calculates the new scale depending on scale and factor
    let newScale = currentScale * factor;
    newScale = Math.min(6, newScale); //Caps newscale at 6
    newScale = Math.max(.6, newScale); //Sets min size to .6

    //Sets the new scale
    this.currentScale = newScale;
    this.style.setProperty("--grid-scale", `${newScale}`);

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

  deselectAll(): void{
    this.selectedTiles.forEach((tile)=>{
      tile.selected = false;
      if (!tile.active) {
        tile.type = undefined;
      }
    })
    this.selectedTiles = [];
  }

  toggleGridType(){
    this.gridType = this.gridType === GridType.PointedUp ? GridType.FlatUp : GridType.PointedUp;
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
    if (!tile.active){
      tile.type = undefined;
    }

    const tileIndex = this.selectedTiles.indexOf(tile)
    if (tileIndex > -1) {
      this.selectedTiles.splice(tileIndex, 1);
      this.selectedTiles = this.selectedTiles.slice();
    }
  }

  selectTile(event: any){
    const SvgElement = event.target;
    if (event.metaKey || this.shouldSelectMany){
      this.selectedTiles.push(SvgElement);
    }else{
      this.deselectAll();
      this.selectedTiles.push(SvgElement);
    }

    SvgElement.selected = !SvgElement.selected;
    if (!SvgElement.selected){
      this.removeFromSelected(SvgElement);
    }

    const WasActive = SvgElement.active;
    SvgElement.active = (event.metakey || this.shouldSelectMany) && SvgElement.active  ? true : !SvgElement.active;

    if (SvgElement.active && !WasActive){
      SvgElement.type = this.currentType;
      SvgElement.color = this.currentColor.color;
    } else if (SvgElement.active && WasActive){
    }else{
      this.deselectAll();
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
          tile.type =  this.currentType;
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
    this.padding = parseInt(rangeValue)
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
  renderGridTxt(){
    if (this.gridType === GridType.PointedUp){
      return 'Pointed Sides up';
    }
    return 'Flat Sides up';
  }

  save(){
    this.deselectAll();
    let hexGrid = this.shadowRoot.querySelector("#svgGrid");
    // @ts-ignore
    html2canvas(hexGrid).then( (canvas)=>{
      canvas.toBlob((blob)=>{
        saveAs(blob, 'Meine-Hexagonal-Design-Schnauze-Fabrik.png');
        window.removeEventListener("beforeunload", this.beforeUnloadListener, { capture: true });

      })
    });
  }

  render() {
    return html`
      <header>

        <sf-dropdown btncolor="${this.currentColor.color}" title="Select Color">
          ${this.colorList()}
        </sf-dropdown>

        <sf-switch @activeUpdated="${this.updateType}"></sf-switch>
        <button class="headerBtn selectBtn" @click="${this.toggleSelectMany}">${this.renderSelectTxt()}</button>
        <button class="headerBtn" @click="${this.deselectAll}">Deselect All</button>
        <button class="headerBtn" @click="${this.toggleGridType}">${this.renderGridTxt()}</button>
        <button
          class="gridSettings"
          name="Grid Settings"
          @click="${this.toggleGridSetting}">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 850.4 850.4" style="enable-background:new 0 0 850.4 850.4;" xml:space="preserve"
            >
            <style type="text/css">
              .st0{fill:#020202;}
            </style>
            <g>
              <path class="st0" d="M713.9,746.5L528.2,639.3l0-214.4l185.7-107.2l136.5,78.8v-17.1l-129.1-74.5l0-214.4L850.4,16V0h-4.5
                L715.8,75.2L585.6,0h-38.4l155,89.5l0,214.4L516.5,411.1L330.8,303.9l0-214.4L485.8,0h-33.9L323.5,74.2L195,0h-40.8l156.7,90.5
                l0,214.4L125.2,412.1L0,339.8v15.9l119.8,69.1l0,214.4L0,708.4v16.9l124.1-71.7l185.7,107.2l0,89.5h19.9l0-89.5l185.7-107.2
                l185.7,107.2v89.5h22.1l0-89.5l127.2-73.4v-19.8L713.9,746.5z M509.1,639.3L323.4,746.5L137.7,639.3l0-214.4l185.7-107.2
                l185.7,107.2L509.1,639.3z"/>
              <polygon class="st0" points="96.3,0 61.6,0 0,35.6 0,55.6 	"/>
            </g>
          </svg>
          <span class="label">Grid</span>
        </button>
        <settings-modal
          @toggleHideGrid="${this.toggleHideGrid}"
          @updatePadding="${this.updatePadding.bind(this)}">
        </settings-modal>

      </header>
      <main>
        <section id="svgGrid">
          ${repeat(
            [...Array(this.rows).keys()],
            (row) => {  return `row${row}` },
            (row) => {
              return html`
                 ${repeat([...Array(this.columns).keys()],
                (column) => {  return `row${row}column${column}` },
                (column) => {
                  const tileRef = createRef();
                  return html`<hex-tile
                    ${ref(tileRef)}
                    ?hideGrid="${this.hideGrid}"
                    @click="${this.selectTile}"
                    column="${column}"
                    row="${row}"
                    size="55"
                    gridtype="${this.gridType}"
                    spacingfactor="${this.padding}"
                    currentType="${this.currentType}">`
                })}
              `;
            })}
        </section>
      </main>
      <pm-footer @save="${this.save}" .tiles="${this.activeTiles}">
      </pm-footer>
    `
  }
}