import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('pm-footer')
export class PmFooter extends LitElement {

  static styles = [css`
    :host {
      position: fixed;
      display: flex;
      align-items: center;
      bottom: 0px;
      width: 100vw;
      border-radius: 10px 10px 0 0;
      background-color: var(--primary-color);

      height: 80vh;
      transform: translateY(calc(100% - 25px));
      justify-content: center;
      transition: transform .4s cubic-bezier(.32,.96,1,1.17);
      overflow: hidden;
      padding: 0 5px;
    }

    h4, h5 {
      margin: 0;
    }

    #indicator {
      position: absolute;
      top: 0;
      width: 100%;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

     #arrow {
      stroke: rgba(255, 255, 255, 0.5);
      /* background-color: rgba(255, 255, 255, 0.5); */
      /* margin: 0 auto 15px; */
      width: 150px;
    }

    :host([open]) {
      transform: translateY(25px);
    }

    :host([open]) #arrow {
      transform: rotateZ(180deg);
    }

    :host([open]) footer{
      opacity: 1;
      pointer-events: all;

    }

    footer {
      width: 100vw;
      opacity: 1;
      pointer-events: none;
      align-self: flex-start;
      margin-top: 40px;
      /* margin-top: 200px; */
      /* position: relative; */
      display: flex;
      flex-wrap: wrap;
      /* overflow: hidden; */
    }

    footer * {
      /* display: flex; */

    }

    footer .split {
      width: 50%;

    }

    footer .color {
      display: grid;
      grid-template-columns: 4fr 1fr;
      margin-bottom: 0.5em;
      font-size: .8em;
      margin-bottom: 0.5em;
    }

    footer .split span:nth-of-type(1) {
      width: 60%;
      display: flex;
      grid-area: 0 / 1;
    }

    footer .split span:nth-of-type(2) {
      width: 40%;
      display: flex;
      grid-area: 1 / 2;
    }

    footer a, footer h4 {
      width: 100%;
    }

    button {
      color: var(--shadow-color);
      font-weight: bolder;
      font-size: 1em;
      display: inline-block;
      padding: 0.5em 0.75em;
      background-color: var(--highlight-color);
      border: 2px solid var(--shadow-color);
      border-radius: 8px 0px;
      box-shadow: 2px 2px 0 var(--shadow-color);
      margin: 0.5em 0px;
      letter-spacing: 0.05em;
      text-decoration: none;
      transition: box-shadow 0.2s linear 0s;
      max-width: 88%;
      text-align: center;
      vertical-align: middle;
    }

  `]

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Array, reflect: false })
  tiles = [];

  @property({ type: Array, reflect: false })
  colorMap = [
    {
      name: 'Starling Blue',
      color: 'rgb(26, 63, 169)'
    }, {
      name: 'Burgundy Velvet',
      color: 'rgb(147,1,1)'
    }, {
      name: 'Forest Green',
      color: 'rgb(30, 112, 22)'
    }, {
      name: 'Sunset Orange',
      color: 'rgb(252, 85, 33)'
    }, {
      name: 'Oriole Gold',
      color: 'rgb(257, 252, 14)'
    }, {
      name: 'Peacock Blue',
      color: 'rgb(66, 160, 236)'
    }, {
      name: 'Bullfinch Pink',
      color: 'rgb(222, 133, 165)'
    }
  ];

  constructor(){
    super();
    // this.addEventListener('click', this.toggleOpen);
  }

  allPointedTiles(tiles){
    return tiles.filter((element) => {
      return element.type === 'pointed';
    	})
  }

  allFlatTiles(tiles) {
    return tiles.filter((tile) => {
      return tile.type === 'flat';
    });
  }

  getColorNameFor(color){
    let colorName = 'unknown';
    this.colorMap.forEach((item)=>{
      if(item.color === color){
        colorName = item.name;
      }
    });
    return colorName;
  }

  tilesByColor(tiles): Object{
    let tileColors = {};
    tiles.forEach((tile)=>{
      let colorName = this.getColorNameFor(tile.color);
      if (!Object.keys(tileColors).includes(colorName)){
        tileColors[`${colorName}`] = 1
      }else{
        tileColors[`${colorName}`]++
      }
    })
    return tileColors;
  }

  toggleOpen(){
    this.open = !this.open;
  }

  renderColorCountList(tiles){
    let colorCountList = [];
    let tileColors = this.tilesByColor(tiles);
    Object.keys(tileColors).forEach(element => {
      colorCountList.push(html`
        <div class="color">
          <span>${element}</span>
          <span>${tileColors[element]}</span>
        </div>
      `);
    });

    return colorCountList;
  }

  save(){
    const options = {
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('save', options));
  }


  render() {
    return html`
        <span @click="${this.toggleOpen}" id="indicator">
          <svg version="1.1" id="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 850.4 57.6" style="enable-background:new 0 0 850.4 57.6;" xml:space="preserve">
            <style type="text/css">
              .st0{fill:none;stroke-width:20;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
            </style>
            <polyline class="st0" points="13.4,45.7 424.3,13 811.3,45.7 "/>
          </svg>
        </span>

        <footer>
          <h4>Used Tiles (${this.tiles.length})</h4>

          <div class="split">
            <h3>Pointed</h3>
            ${this.renderColorCountList(this.allPointedTiles(this.tiles))}
          </div>

          <div class="split">
            <h3>Flat</h3>
            ${this.renderColorCountList(this.allFlatTiles(this.tiles))}
          </div>
          <button @click="${this.save}">Save Project</button>

        </footer>
    `
  }
}
