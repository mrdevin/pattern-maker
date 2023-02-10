import { LitElement } from 'lit';
export declare enum TileType {
    Pointed = "pointed",
    Flat = "flat"
}
export declare enum GridType {
    PointedUp = "pointed-up",
    FlatUp = "flat-up"
}
export declare class HexTile extends LitElement {
    static styles: import("lit").CSSResult;
    color: string;
    type: any;
    currentType: string;
    selected: boolean;
    row: number;
    column: number;
    active: boolean;
    hideGrid: boolean;
    size: number;
    hexHeight: number;
    hexWidth: number;
    hexRadius: number;
    spacingFactor: number;
    gridType: GridType;
    positions(): number[];
    updated(changedProperties: Map<string, unknown>): void;
    setRotation(): void;
    setLayout(): void;
    firstUpdated(): void;
    getStrokeColor(): "transparent" | "rgba(280,280,280,.8)" | "gray";
    getStrokeWidth(): "5px" | "0px" | "2px";
    fireClick(event: any): void;
    renderPonts(): import("lit").TemplateResult<2> | "";
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'hex-tile': HexTile;
    }
}
