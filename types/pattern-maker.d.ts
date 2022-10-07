import { LitElement } from 'lit';
export declare class PatternMaker extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * The name to say "Hello" to.
     */
    rows: number;
    columns: number;
    hexGrid: () => import("lit").TemplateResult<1>[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pattern-maker': PatternMaker;
    }
}
