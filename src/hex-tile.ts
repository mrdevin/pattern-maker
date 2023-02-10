import { css, LitElement, html, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'
export enum TileType {
  Pointed = "pointed",
  Flat = "flat"
}

export enum GridType {
  PointedUp = "pointed-up",
  FlatUp = "flat-up"
}
@customElement('hex-tile')
export class HexTile extends LitElement {
  static styles = css`
    :host {
      --hex-width: 86px;
      --hex-height: 100px;
      --hex-rotation: 0;
      --hex-top: 0px;
      --hex-left: 0px;
      transform: rotate(var(--hex-rotation));
      transition-property: transform, top, --hex-left;
      transition-duration: .5s;
      transition-timing-function: linear;
      position: absolute;
      top: var(--hex-top);
      left:var(--hex-left);
      display: block;
      cursor: default;
      height: var(--hex-height);
      width: var(--hex-width);
    }

    :host([selected]) .hex {
      stroke-dasharray:5 3 5 3;
      animation:5s infinite normal marchingAnts linear;
    }

    svg path {

      cursor: pointer;
    }

    .hex {
      transform-origin: center;
      transition: stroke .5s linear;
    }

    .shadows,
    .shadows path {
      pointer-events: none;
    }

    .shadows {
      opacity: 1;
      transition: opacity .5s linear;
    }

    :host([hidegrid]:not([active])) .shadows {
      opacity: 0;
    }

    .shad1{opacity:0.1; fill: black}
    .shad2{opacity:0.2;fill: black;}
    .shad3{opacity:0.3;fill: black}
    .shad4{opacity:0.2;fill:black;}
    .shad5{opacity:0.0; fill: white}

    .shad1,
    .shad2,
    .shad3,
    .shad4,
    .shad5{stroke: none;mix-blend-mode: darken; }


    @keyframes marchingAnts {
      from {stroke-dashoffset: 0%;}
      to {stroke-dashoffset: 100%;}
    }

    svg:not(:root) {
      overflow: visible;
    }
  `

  @property({ type: String })
  color = "rgb(26, 63, 169)";

  @property({ type: TileType })
  type;

  @property({ type: TileType })
  currentType = "pointed" || "flat";

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Number })
  row = 0;

  @property({ type: Number })
  column = 0;

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean })
  hideGrid = false;

  @property({type: Number})
  size = 50;

  @property()
  hexHeight = this.size*2;

  @property()
  hexWidth = this.hexHeight * Math.sqrt(3) / 2;

  @property()
  hexRadius = this.size ;

  @property({ type: Number, reflect: false})
  spacingFactor = 200;

  @property({type: String})
  gridType: GridType;

  positions() {
    if (this.gridType === GridType.PointedUp) {
      return [
        (this.column - .4) * (this.hexWidth + this.spacingFactor) + (this.row % 2 === 0 ? this.hexWidth / 2 : 0),
        (this.row) * ((this.hexWidth * Math.sqrt(3) / 2) + this.spacingFactor)]
    } else {
      return [
        (this.column - .4) * (this.hexHeight + this.spacingFactor) + (this.row % 2 === 0 ? this.hexHeight / 2 : 0),
        (this.row) * ((this.hexHeight * Math.sqrt(3) / 2) + this.spacingFactor)]
    }

  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("spacingFactor")) {
      this.setLayout();
    }

    if (changedProperties.has("gridType")) {
      this.setRotation();
      this.setLayout();
    }
  }

  setRotation(){
    if(this.gridType === GridType.PointedUp){
      this.style.setProperty('--hex-rotation', '0deg');
    }else{
      this.style.setProperty('--hex-rotation', '90deg');
    }
  }

  setLayout(){
    let positions = this.positions();
    this.style.setProperty('--hex-top', `${positions[1]}px`);
    this.style.setProperty('--hex-left', `${positions[0]}px`);
  }

  firstUpdated()  {
    this.setLayout();
  }

  getStrokeColor(){
    if (this.hideGrid) return 'transparent';
    if (this.selected) return 'rgba(280,280,280,.8)';
    return !this.active ? 'gray' : 'transparent'
  }

  getStrokeWidth(){
    if (this.selected ) {
      return '5px';
    }

    if(this.active && !this.selected){
      return '0px';
    }

    return '2px';

  }

  fireClick(event){

    const options = {
      detail: { metakey: event.metaKey },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('tileClick', options));
  }

  renderPonts(){
    if ((this.currentType === TileType.Pointed && this.type !== TileType.Flat) || (this.currentType === TileType.Flat && this.type === TileType.Pointed) || (this.currentType === TileType.Pointed && this.type === TileType.Pointed) ){

      return svg`<g class="shadows">
          <path class="shad1" d="M86,24.9L43,49.7l43,24.9V24.9z"></path>
          <path class="shad2" d="M43,99.4l43-24.8L43,49.7V99.4z"></path>
          <path class="shad3" d="M0,74.6l43,24.8V49.7L0,74.6z"></path>
          <path class="shad4" d="M0,24.9v49.7l43-24.9L0,24.9z"></path>
          <path class="shad1" d="M43,0L0,24.9l43,24.8V0z"></path>
          <path class="shad5" d="M86,24.9L43,0v49.7L86,24.9z"></path>
        </g>`;
    }else{
      return ``;
    }
  }

  render() {
      return html`
      <svg viewBox="0 0 86 100">
        <path
          class="hex"
          fill="${ this.active ? this.color : 'transparent'}"
          stroke="${this.getStrokeColor()}"
          stroke-width="${this.getStrokeWidth()}"
          @click=${this.fireClick}
          d="M86,24.9v49.7L43,99.4L0,74.6V24.9L43,0L86,24.9z">
        </path>
        ${this.renderPonts()}

    </svg>
    `


  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hex-tile': HexTile
  }
}
