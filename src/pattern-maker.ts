import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { HexTile } from './hex-tile'
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
    }

    main {
      display: flex;
      flex-wrap: wrap;
    }

    header {
      height: 80px;
      width: 100vw;
      background-color: var(--primary-color);
      border-bottom: 3px solid var(--shadow-color);
      position: fixed;
      top: 0;
      display: block;
      z-index: 100;
    }

    hex-tile {
      --hex-size: var(--hex-calc-size);
      --hex-spacing: var(--hex-padding)
    }

    button[active]{
      background-color: var(--shadow-color);
      color: var(--highlight-color);
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
    'rgb(26, 63, 169)',
    'rgb(147,1,1)',
    'rgb(30, 112, 22)',
    'rgb(252, 85, 33)',
    'rgb(257, 252, 14)',
    'rgb(66, 160, 236)',
    'rgb(222, 133, 165)']

  @property({ type: Boolean })
  hideGrid = false

  toggleHideGrid(){
    this.hideGrid = !this.hideGrid;
  }

  hexColumns(){
    const hexTempCols = [];
    for (var j = 0; j < this.columns; j++) {
      hexTempCols.push(html`<hex-tile ?hideGrid="${this.hideGrid}" @tileClick="${this.toggle}"></hex-tile>`);
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

  toggle(event: any){
    event.preventDefault();
    event.stopPropagation();
    if (!event.target.active){
      this.toggleType = 'active';
    }
    switch ((this.toggleType)) {
      case 'color':
        const currentColor = event.target.color;
        const place = this.colors.indexOf(currentColor);
        let newPlace = place + 1;
        if (newPlace >= this.colors.length){
          newPlace = 0;
        }
        event.target.color = this.colors[newPlace];
        break;
      case 'type':
        const currentType = event.target.type;
        event.target.type = currentType === 'flat' ? 'pointed': 'flat';
        break;

      default:
        event.target.active = !event.target.active;

        if (!event.target.active){
          event.target.color = this.colors[0];
          event.target.type = 'pointed';
        }

        break;
    }

  }

  updatePadding(event: any){
    const rangeValue = event.target.value;
    this.style.setProperty('--hex-padding', `${rangeValue}px`)
  }

  updateColumns(event: any) {
    this.columns = event.target.value;
    this.style.setProperty("--column-count", this.columns.toString());

  }

  updateRows(event: any) {
    this.rows = event.target.value;
  }

  render() {
    return html`
      <header>

        <input name="columns" type="range" min="3" value="${this.columns}" max="30" @input="${this.updateColumns}"/>
        <input name="rows" type="range" min="2" value="${this.rows}" max="60" @input="${this.updateRows}"/>
        <input name="spacing" type="range" min="0" value="4" max="40" @input="${this.updatePadding}"/>
        <button @click="${()=>{this.toggleType = 'active'}}" ?active="${this.toggleType === 'active'}">Toggle Active</button>
        <button @click="${()=>{this.toggleType = 'color'}}" ?active="${this.toggleType === 'color'}">Toggle Color</button>
        <button @click="${()=>{this.toggleType = 'type'}}" ?active="${this.toggleType === 'type'}">Toggle Type</button>
        <button @click="${this.toggleHideGrid}" ?active="${this.hideGrid}">Toggle Grid</button>
      </header>
      <main>
        ${this.hexGrid()}
      </main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pattern-maker': PatternMaker
  }
}
