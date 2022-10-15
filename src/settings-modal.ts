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

    input {
      margin-bottom: .8em;
      width: 100%;
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
        # Collumns (${this.columns})
      </label>
      <input
        name="columns"
        type="range"
        min="5"
        value="${this.columns}"
        max="30"
        @input="${this.updateColumns}"/>

      <label>
        # Rows (${this.rows})
      </label>
      <input
        name="rows"
        type="range"
        min="5"
        value="${this.rows}"
        max="60"
        @input="${this.updateRows}"/>

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

      <button
        @click="${this.toggleHideGrid}"
        ?active="${this.hideGrid}">
          Toggle Grid Visibility
      </button>
    `
  }
}

