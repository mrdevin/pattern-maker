import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('inline-modal')
export class InlineModal extends LitElement {

  static get styles(){ return css`
    :host {
      position: absolute;
      background-color: var(--highlight-color);
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

    :host([hidden]){
      display: none;
    }
  `}

  @property({ type: Boolean, reflect: true })
  hidden = true;

  constructor() {
    super();
    window.addEventListener('keyup', this.closeModal)
  }

  disconnectedCallback() {
    window.removeEventListener('keypress', this.closeModal);
    super.disconnectedCallback();
  }

  closeModal(){
    requestAnimationFrame(()=>{
      this.hidden = true;
    })

  }

  render() {
    return html`
      <slot></slot>
    `
  }
}

