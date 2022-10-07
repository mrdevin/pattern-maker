import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('inline-modal')
export class InlineModal extends LitElement {

  static styles = [css`
    :host {
      position: absolute;
      /* display: flex; */
      background-color: var(--highlight-color);
      /* width: auto; */
      /* height: auto; */
      min-height: 10px;
      min-width: 10px;
      border: 5px solid var(--highlight-color);
      border-radius: 10px;
      box-shadow: var(--primary-color) 0 0 0 2px inset,var(--primary-color) 8px 8px 0 -4px,var(--shadow-color) 8px 8px;
      max-width: 100%;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(110%);
    }

    :host(*) {
      /* display: flex; */
    }

    :host([hidden]){
      display: none;
    }
  `]

  @property({ type: Boolean })
  hidden = true;

  constructor(){
    super();
  }


  render() {
    return html`
      <slot></slot>
    `
  }
}

