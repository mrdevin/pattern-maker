import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sf-switch')
export class SfSwitch extends LitElement {

  static styles = [css`
    :host {
      position: relative;
      display: flex;
      align-items: center;
      margin-left: .5em;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      cursor: pointer;
      margin-left: .8em;
      height: -webkit-fill-available;
    }

    * {
      box-sizing: border-box;
    }

    :host([active]) .toggle {
      left: calc(100% - 25px);
    }

    svg {
      width: 30px;
      height: auto;
      grid-area: 1/1;
      opacity: 1;
      transition: opacity .4 linear;
    }

    .label {
      display: flex;
      width: 100%;
      font-size: 12px;
      margin-top: .38em;
    }

    [hidden]{
      opacity: 0;
    }
  `]

  @property({ type: Boolean, reflect: true })
  active = true;

  @property({type: String})
  optionOne = "Flat";

  @property({type: String})
  optionTwo = "Pointed";


  constructor(){
    super();
    this.addEventListener('click', this.toggle);
  }

  toggle(){
    this.active = !this.active;
    const options = {
      detail: {active: this.active },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('activeUpdated', options));
  }

  render() {
    return html`
      <svg ?hidden="${this.active}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 515 400" style="enable-background:new 0 0 515 400;" xml:space="preserve">
        <style type="text/css">
          .st0{
            fill:none;
            stroke:#000000;
            stroke-width:5;
            stroke-miterlimit:10;
          }
        </style>
        <image style="display:none;overflow:visible;" width="1242" height="666" xlink:href="../../../schnauze-fabrik/src/img/home/blue-poster.jpg"  transform="matrix(1 0 0 1 -363.5 -133)">
        </image>
        <g>
          <polygon class="st0" points="271.8,30.6 86.6,46.7 13.2,171.4 18.3,230.6 246.9,372.4 479.6,288.4 502.8,235.9 447.9,98 	"/>
          <polyline class="st0" points="13.2,171 257.9,313 502.7,236 	"/>
          <line class="st0" x1="258" y1="312.9" x2="246.9" y2="372.4"/>
        </g>
      </svg>

      <svg ?hidden="${!this.active}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 515 400" style="enable-background:new 0 0 515 400;" xml:space="preserve">
        <style type="text/css">
          .st0{
            fill:none;
            stroke:#000000;
            stroke-width:5;
            stroke-miterlimit:10;
          }
        </style>
        <image style="display:none;overflow:visible;" width="1242" height="693" xlink:href="../../../schnauze-fabrik/src/img/home/pink-poster.jpg"  transform="matrix(1 0 0 1 -370.1501 -229.6504)">
        </image>
        <polygon class="st0" points="28.6,67.6 22.1,120.9 42.5,288.9 340.3,386.4 472.9,262.1 498.5,210.4 383.6,84.1 288.8,25.5
          195.1,29.6 "/>
        <polygon class="st0" points="28.6,67.6 49.2,224.3 365.5,324.1 498.5,210.4 288.8,26.1 "/>
        <polyline class="st0" points="288.8,26.1 365.5,324.1 340.3,386.4 "/>
        <polyline class="st0" points="49.2,224.3 42.5,288.9 49.2,224.3 "/>
        <line class="st0" x1="49.2" y1="224.3" x2="288.8" y2="26.1"/>
      </svg>

      <span class="label">Type</span>
    `
  }
}
