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
    }

    .switch {
      position: relative;
      display: flex;
      height: 20px;
      width: 40px;
      padding: 5px;
      margin: 0 .5em;
      background-color: var(--shadow-color);
    }

    .toggle {
      width: 20px;
      height: 20px;
      background-color: var(--highlight-color);
      /* opacity: .5; */
      position: absolute;
      left: 5px;
      transition: all .2s linear;
    }

    :host([active]) .toggle {
      /* opacity: 1; */
      /* position: absolute; */
      left: calc(100% - 25px);
    }

    span[selected]{
      font-weight: bold;
    }

  `]

  @property({ type: Boolean, reflect: true })
  active = false;

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
      <span ?selected="${!this.active}">${this.optionOne}</span>
      <div class="switch">
        <div class="toggle"></div>
      </div>
      <span ?selected="${this.active}">${this.optionTwo}</span>
    `
  }
}
