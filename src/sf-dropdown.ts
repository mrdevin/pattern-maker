import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sf-dropdown')
export class SfDropdown extends LitElement {

  static styles = [css`
    :host {
      position: relative;
      display: inline-block;
      display: flex;
    }

    * {
      box-sizing: border-box;
    }

    .dropbtn {
      background-color: transparent;
      font-size: 16px;
      border: 0;
      cursor: pointer;
    }

    svg {
      width: 30px;
      height: auto;
      border-bottom: 5px solid var(--shadow-color);
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: var(--highlight-color);
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }

     ::slotted(a) {
      color: var(--shadow-color);
      padding: 12px 16px;
      text-decoration: none;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      cursor: pointer;
    }

    .label {
      display: flex;
      color: var(--shadow-color);
      width: 100%;
      font-size: 12px;
      margin-top: .38em;
      font-family: inherit;
      font-family: 'JosefinSans', Tahoma, Verdana, Segoe, sans-serif;
    }

    :host([open]) .dropdown-content{
      display: block;
    }
  `]

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({type: String})
  title = "Dropdown";

  @property({type: String})
  btnColor;

  constructor(){
    super();
  }

  toggleDD(){
    this.open = !this.open;
  }

  render() {
    return html`
      <button @click="${this.toggleDD}" class="dropbtn">
        <svg
          style="border-color:${this.btnColor}"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 850.4 850.4" style="enable-background:new 0 0 850.4 850.4;" xml:space="preserve"
          >
          <style type="text/css">
            .st0{fill:none;stroke:#000000;stroke-width:10;stroke-miterlimit:10;}
          </style>
          <circle class="st0" cx="284.9" cy="539.5" r="242"/>
          <circle class="st0" cx="425.2" cy="300.5" r="242"/>
          <circle class="st0" cx="566.7" cy="539.5" r="242"/>
        </svg>
        <span class="label" >Color</span>
      </button>
      <div class="dropdown-content">
        <slot @click="${this.toggleDD}"><slot>
      </div>
    `
  }
}
