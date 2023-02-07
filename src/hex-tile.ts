import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform'
import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('hex-tile')
export class HexTile extends LitElement {
  static styles = css`
    :host {
      --hex-size: 80px;
      --hex-spacing: 0px;
      display: flex;
      /* padding: 0 var(--hex-spacing) var(--hex-spacing) 0;
      width: calc(var(--hex-size));
      height: calc(var(--hex-size) * 1.1547005); */
      box-sizing: border-box;
      cursor: default;
    }

    svg polygon{
      display:flex;
      max-height: 100%;
    }

    svg polygon {
      cursor: pointer;
    }

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

  @property({ type: String })
  type = "pointed" || "flat";

  @property({ type: Boolean })
  selected = false;

  @property({ type: Number })
  row = false;

  @property({ type: Number })
  column = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean })
  hideGrid = false;

  getStrokeColor(){
    if (this.hideGrid) return 'transparent';
    if (this.selected) return '#008bf8';
    return !this.active ? 'gray' : 'transparent'
  }

  getAnimation(){
    if (this.selected){
      return 'stroke-dasharray: 15 8; animation 20s infinite normal marchingAnts linear; '
    }
    return '';
  }

  getStrokeWidth(){
    if (this.selected ) {
      return '15px';
    }

    if(this.active && !this.selected){
      return '0px';
    }

    return '5px';

  }



  fireClick(event){

    const options = {
      detail: { metakey: event.metaKey },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('tileClick', options));
  }

  // render() {
  //   return html`
  //     <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 294.5 340" style="enable-background:new 0 0 294.5 340;" xml:space="preserve">
  //       <style type="text/css">

  //         .st0-wrap {
  //           transform-origin: center;

  //         }

  //         .st0{
  //           fill: ${ this.active ? this.color : 'transparent'};
  //           stroke: ${this.getStrokeColor()};
  //           stroke-width: ${ this.getStrokeWidth() };
  //           ${ this.getAnimation() }
  //         }


  //         .st1{
  //           opacity:0.5;
  //           fill:${ this.active && this.type==="pointed" ? '#414042': 'transparent'};
  //         }

  //         .st2{
  //           opacity:0.375;
  //           fill:${ this.active && this.type==="pointed" ? '#414042': 'transparent'};
  //         }

  //         .st3{
  //           opacity:0.7;
  //           fill:${ this.active && this.type==="pointed" ? '#414042': 'transparent'};
  //         }

  //       </style>
  //       <g class="st0-wrap" @click="${this.fireClick}">
  //       <polygon  class="st0" id="hexBg" points="0.2,255.3 147.6,340 294.6,254.8 294.3,84.7 146.9,0 -0.2,85.3 "/>
  //       <g id="shading" >
  //         <polygon class="st1" points="0.2,255.3 147.2,170 147.6,340 	"/>
  //         <polygon class="st2" points="147.5,340 147.2,170 294.6,254.8 	"/>
  //         <polygon class="st3" points="-0.3,85.5 147.2,170 0.3,255.5 	"/>
  //         <polygon class="st1" points="146.5,0 147.2,170 -0.4,85.7 	"/>
  //         <polygon class="st2" points="294.2,84.5 147.2,170 146.6,0 	"/>
  //       </g>
  //       </g>
  //     </svg>
  //   `
  // }
  render() {
    return html`
      <!-- <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 294.5 340" style="enable-background:new 0 0 294.5 340;" xml:space="preserve">
        <style type="text/css">

          .st0-wrap {
            transform-origin: center;

          }

          .st0{
            fill: ${this.active ? this.color : 'transparent'};
            stroke: ${this.getStrokeColor()};
            stroke-width: ${this.getStrokeWidth()};
            ${this.getAnimation()}
          }


          .st1{
            opacity:0.5;
            fill:${this.active && this.type === "pointed" ? '#414042' : 'transparent'};
          }

          .st2{
            opacity:0.375;
            fill:${this.active && this.type === "pointed" ? '#414042' : 'transparent'};
          }

          .st3{
            opacity:0.7;
            fill:${this.active && this.type === "pointed" ? '#414042' : 'transparent'};
          }

        </style> -->
        <g class="st0-wrap" style="transform:translate(${0})" @click="${this.fireClick}">
        <polygon  class="st0" id="hexBg" points="0.2,255.3 147.6,340 294.6,254.8 294.3,84.7 146.9,0 -0.2,85.3 "/>
        <g hidden>
          <polygon class="st1" points="0.2,255.3 147.2,170 147.6,340 	"/>
          <polygon class="st2" points="147.5,340 147.2,170 294.6,254.8 	"/>
          <polygon class="st3" points="-0.3,85.5 147.2,170 0.3,255.5 	"/>
          <polygon class="st1" points="146.5,0 147.2,170 -0.4,85.7 	"/>
          <polygon class="st2" points="294.2,84.5 147.2,170 146.6,0 	"/>
        </g>
        </g>
      <!-- </svg> -->
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hex-tile': HexTile
  }
}
