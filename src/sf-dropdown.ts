import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sf-dropdown')
export class SfDropdown extends LitElement {

  static styles = [css`
    :host {
      position: relative;
      display: inline-block;
    }

    .dropbtn {
      background-color: transparent;
      font-size: 16px;
      border: 0;
      border-bottom: 5px solid var(--shadow-color);
      cursor: pointer;
    }

    svg {
      width: 30px;
      height: auto;
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
      display: block;
      cursor: pointer;
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
      <button @click="${this.toggleDD}" class="dropbtn" style="border-color:${this.btnColor}">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 850.4 850.4" style="enable-background:new 0 0 850.4 850.4;" xml:space="preserve"
          >
        <style type="text/css">
          .st0{fill:none;stroke:#000000;stroke-width:10;stroke-miterlimit:10;}
        </style>
        <circle class="st0" cx="284.9" cy="539.5" r="242"/>
        <circle class="st0" cx="425.2" cy="300.5" r="242"/>
        <circle class="st0" cx="566.7" cy="539.5" r="242"/>
        </svg>

      </button>
      <div class="dropdown-content">
        <slot @click="${this.toggleDD}"><slot>
      </div>
    `
  }
}
