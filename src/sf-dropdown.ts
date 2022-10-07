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
      background-color: var(--highlight-color);
      color: var(--shadow-color);
      padding: 16px;
      font-size: 16px;
      border: 3px solid var(--shadow-color);
      cursor: pointer;
    }


    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: var(--highlight-color);
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }

    /* Links inside the dropdown */
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

    /* Change the background color of the dropdown button when the dropdown content is shown */
    :host(:hover) .dropbtn{
      background-color: var(--shadow-color);
      color: var(--highlight-color);
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
      <button @click="${this.toggleDD}" class="dropbtn" style="border-color:${this.btnColor}">${this.title}</button>
      <div class="dropdown-content">
        <slot @click="${this.toggleDD}"><slot>
      </div>
    `
  }
}
