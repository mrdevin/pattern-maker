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
      background-color: rgba(160, 160, 160, 0.95);
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
      width: 150px;
      height: 5px;
      top: 10px;
      border-radius: 3px;
      background-color: rgba(255, 255, 255, 0.5);
      margin: 0 auto 15px;
    }

    :host([open]) {
      transform: translateY(25px);
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
    this.addEventListener('click', this.toggleOpen);
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


  render() {
    return html`
        <span id="indicator"></span>

        <footer>
          <!-- <a>Save Project</a> -->
          <h4>Used Tiles (${this.tiles.length})</h4>

          <div class="split">
            <h3>Pointed</h3>
            ${this.renderColorCountList(this.allPointedTiles(this.tiles))}
          </div>

          <div class="split">
            <h3>Flat</h3>
            ${this.renderColorCountList(this.allFlatTiles(this.tiles))}
          </div>

        </footer>
    `
  }
}
