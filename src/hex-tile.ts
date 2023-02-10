import { css, LitElement, html, svg } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
export enum TileType {
  Pointed = "pointed",
  Flat = "flat"
}
@customElement('hex-tile')
export class HexTile extends LitElement {
  static styles = css`
    :host {
      --hex-size: 0px;
      --hex-spacing: 0px;
      --hex-translate: translate(0px, 0px);
      --hex-rotate: rotate(0);
      --hex-width: 0px;
      --hex-height: 0px;
      display: flex;
      padding: 0 var(--hex-spacing) var(--hex-spacing) 0;
      display: block;
      overflow: hidden;
      box-sizing: border-box;
      cursor: default;
      transform: var(--hex-translate), var(--hex-rotate);
    }

    svg {
      width: 100%;
      height: 100%;
      display:block;
    }

    :host([selected]) .hex {
      stroke-dasharray:2 1 3 1;
      animation:5s infinite normal marchingAnts linear;
    }

    svg path {
      cursor: pointer;
    }

    .hex {
      transform-origin: center;
    }

    .shadows,
    .shadows path {
      pointer-events: none;
    }

    .shadows {
      opacity: 1;
      transition: opacity .5s linear;
    }

    :host([hidegrid]:not([active])) .shadows{
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
  size = 60;

  @state()
  hexHeight = this.size;

  @state()
  hexWidth = this.hexHeight * Math.sqrt(3) / 2;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("size")) {
      this.setDimensions();
    }
  }

  setDimensions(){
    this.hexWidth = this.size;
    this.hexHeight = this.hexWidth * Math.sqrt(3) / 2;
    this.style.setProperty('--hex-size', `${this.size}px`);
    this.style.setProperty('--hex-width', `${this.hexWidth}px`);
    this.style.setProperty('--hex-height', `${this.hexHeight}px`);
  }

  firstUpdated()  {
    this.setDimensions();
    this.style.setProperty('--hex-size', `${this.size}px`);
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

    return '1px';

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
      <svg viewBox="0 0  ${86 } ${100 }">
        <path
          class="hex"
          fill="${ this.active ? this.color : 'transparent'}"
          stroke="${this.getStrokeColor()}"
          stroke-width="${this.getStrokeWidth()}"
          @click=${this.fireClick}
          d="M86,24.9v49.7L43,99.4L0,74.6V24.9L43,0L86,24.9z"></path>
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
