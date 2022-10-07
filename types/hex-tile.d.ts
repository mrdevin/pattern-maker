import { LitElement } from 'lit';
export declare class HexTile extends LitElement {
    static styles: import("lit").CSSResult;
    color: string;
    type: string;
    selected: boolean;
    active: boolean;
    hideGrid: boolean;
    getStrokeColor(): "transparent" | "#008bf8" | "gray";
    getDashes(): "stroke-dasharray: 15 8; animation:  20s infinite normal marchingAnts linear; " | "";
    getStrokeWidth(): "10px" | "0px" | "2px";
    fireClick(event: any): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'hex-tile': HexTile;
    }
}
