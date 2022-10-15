import { LitElement } from 'lit';
export declare class InlineModal extends LitElement {
    static get styles(): import("lit").CSSResult;
    hidden: boolean;
    constructor();
    disconnectedCallback(): void;
    closeModal(): void;
    render(): import("lit").TemplateResult<1>;
}
