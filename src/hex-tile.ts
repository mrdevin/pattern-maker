import { css, LitElement, html, svg } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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
      --hex-translate: translate(0, 0);
      --hex-rotate: rotate(0);
      --hex-width: 0px;
      --hex-height: 0px;
      display: block;
      width: var(--hex-width);
      height: var(--hex-height);
      box-sizing: border-box;
      cursor: default;
      transform:var(--hex-translate), var(--hex-rotate);
      position: absolute;
      top: var(--hex-left);
      left: var(--hex-top);
    }

    svg {
      width: 100%;
      height: 100%;
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
  size = 55.0145;

  @state()
  hexWidth = this.size;

  @state()
  hexHeight = this.hexWidth * Math.sqrt(3) / 2;

  @state()
  hexX = (this.column * this.hexWidth) + (this.row % 2 === 0 ? this.hexWidth / 2 : 0);

  @state()
  hexY = this.row * this.hexHeight;

  @state()
  hexRadius = this.size / 2;

  translations() {
    const spacingFactor = 100 / 100
    return [`${((this.hexRadius + this.hexX) * spacingFactor) - (this.size)}px`,
              `${((this.hexRadius + this.hexY) * spacingFactor) - ((this.size * 1.8))}px`]
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("size")) {
      this.setDimensions();
    }

    if (changedProperties.has("type") || changedProperties.has("currentType")) {
      console.log('type, currentType', this.type, this.currentType)
    }
  }

  setDimensions(){
    this.style.transform = ` rotate(${this.rotations()})`;
    this.style.setProperty('--hex-size', `${this.size}px`);
    this.style.setProperty('--hex-top', `${this.translations()[0]}`);
    this.style.setProperty('--hex-left', `${this.translations()[1]}`);
    this.style.setProperty('--hex-rotate', `rotate(${this.rotations()})`);
    this.style.setProperty('--hex-width', `${this.hexWidth}px`);
    this.style.setProperty('--hex-height', `${this.hexHeight}px`);
  }

  firstUpdated()  {
    // console.log("🚀 ~ file: hex-tile.ts:132 ~ HexTile ~ firstUpdated ~ firstUpdated")
    this.setDimensions();
    this.style.setProperty('--hex-size', `${this.size}px`);
  }

  rotations() {
    return `0, 0, 0`;
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
      return svg`<g class="shadows" >
          <path class="shad1" d="M47.6 13.8 23.8 27.5l23.8 13.8V13.8z"></path>
          <path class="shad2" d="m23.8 55 23.8-13.7-23.8-13.8z"></path>
          <path class="shad3" d="M0 41.3 23.8 55V27.5z"></path>
          <path class="shad4" d="M0 13.8v27.5l23.8-13.8z"></path>
          <path class="shad1" d="M23.8 0 0 13.8l23.8 13.7z"></path>
          <path class="shad5" d="M47.6 13.8 23.8 0v27.5z"></path>
        </g>`;
    }else{
      return ``;
    }
  }

  render() {
      return html`
      <svg viewBox="0 0 ${this.hexHeight} ${this.hexWidth}"
        style="enable-background:new 0 0 ${this.hexHeight} ${this.hexWidth}">
        <path
          class="hex"
          fill="${ this.active ? this.color : 'transparent'}"
          stroke="${this.getStrokeColor()}"
          stroke-width="${this.getStrokeWidth()}"
          @click=${this.fireClick}
          d="M47.6 13.8v27.5L23.8 55 0 41.3V13.8L23.8 0z"></path>
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
