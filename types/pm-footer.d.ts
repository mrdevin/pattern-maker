import { LitElement } from 'lit';
export declare class PmFooter extends LitElement {
    static styles: import("lit").CSSResult[];
    open: boolean;
    tiles: any[];
    colorMap: {
        name: string;
        color: string;
    }[];
    constructor();
    allPointedTiles(tiles: any): any;
    allFlatTiles(tiles: any): any;
    getColorNameFor(color: any): string;
    tilesByColor(tiles: any): Object;
    toggleOpen(): void;
    renderColorCountList(tiles: any): any[];
    render(): import("lit").TemplateResult<1>;
}
