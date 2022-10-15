import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { InlineModal } from './inline-modal';

@customElement('settings-modal')
export class SettingsModal extends InlineModal {
  static get styles(){ return  css`
    ${super.styles}
    :host {
      padding: 8px;
    }
    label {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
      width: 15rem;
      margin: .5rem 0
    }

    /***** Chrome, Safari, Opera, and Edge Chromium *****/
    input[type="range"]::-webkit-slider-runnable-track{
      background-color: var(--shadow-color);
      height: 1rem;
    }

    input[type="range"]::-moz-range-track {
      background-color: var(--shadow-color);
      height: 1rem;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      margin-top: -9px;
      background-color: var(--primary-color);
      border: 3px solid white;
      height: 1.8rem;
      width: 1.2rem;
    }

    input {
      margin-bottom: .8em;
      width: 100%;
    }

    button {
      color: var(--shadow-color);
      font-weight: bolder;
      font-size: .6em;
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
      font-family: 'JosefinSans', Tahoma, Verdana, Segoe, sans-serif;
    }
  `}

  @property({ type: Number })
  rows = 15;

  @property({ type: Number })
  columns = 8;

  @property({ type: Number })
  padding = 8;

  @property({ type: Boolean })
  hideGrid = false

  toggleHideGrid() {
    this.hideGrid = !this.hideGrid;
    const options = {
      detail: { hideGrid: this.hideGrid },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('toggleHideGrid', options));
  }

  updatePadding(event: any) {
    this.padding = event.target.value;
    const options = {
      detail: { padding: this.padding },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('updatePadding', options));
  }

  updateColumns(event: any) {
    this.columns = event.target.value;
    const options = {
      detail: { columns: this.columns },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('updateColumns', options));
  }

  updateRows(event: any) {
    this.rows = event.target.value;
    const options = {
      detail: { rows: this.rows },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('updateRows', options));
  }

  render() {
    return html`
      <label>
        Spacing
      </label>
      <input
        name="spacing"
        type="range"
        min="0"
        value="4"
        max="100"
        @input="${this.updatePadding}"/>

      <label>
        Columns (${this.columns})
      </label>
      <input
        name="columns"
        type="range"
        min="5"
        value="${this.columns}"
        max="30"
        @input="${this.updateColumns}"/>

      <label>
        Rows (${this.rows})
      </label>
      <input
        name="rows"
        type="range"
        min="12"
        value="${this.rows}"
        max="60"
        @input="${this.updateRows}"/>

      <button
        @click="${this.toggleHideGrid}"
        ?active="${this.hideGrid}">
          Toggle Grid Visibility
      </button>
    `
  }
}

