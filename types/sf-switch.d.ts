import { LitElement } from 'lit';
export declare class SfSwitch extends LitElement {
    static styles: import("lit").CSSResult[];
    active: boolean;
    optionOne: string;
    optionTwo: string;
    constructor();
    toggle(): void;
    render(): import("lit").TemplateResult<1>;
}
