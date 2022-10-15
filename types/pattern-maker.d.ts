import { LitElement } from 'lit';
import './settings-modal';
import './sf-dropdown';
import './sf-switch';
import './pm-footer';
export declare class PatternMaker extends LitElement {
    static styles: import("lit").CSSResult[];
    constructor();
    updateGridWidth(): void;
    firstUpdated(): void;
    /**
     * The name to say "Hello" to.
     */
    rows: number;
    toggleType: string;
    columns: number;
    colors: {
        name: string;
        color: string;
    }[];
    currentColor: {
        name: string;
        color: string;
    };
    currentType: string;
    selectedTiles: any[];
    activeTiles: any[];
    hideGrid: boolean;
    hideGridSettings: boolean;
    shouldSelectMany: boolean;
    setColor(colorPosition: number): void;
    updateType(event: any): void;
    toggleGridSetting(): void;
    deselect(): void;
    removeFromSelected(tile: any): void;
    selectTile(event: any): void;
    updateSelectedTiles(): void;
    toggleHideGrid(event: any): void;
    isSelected(ref: any): void;
    hexColumns(): any[];
    hexGrid(): any[];
    colorList(): any[];
    updatePadding(event: any): void;
    updateColumns(event: any): void;
    updateRows(event: any): void;
    toggleSelectMany(): void;
    getActiveTiles(): void;
    renderSelectTxt(): "Selecting Many" | "Select Many";
    render(): import("lit").TemplateResult<1>;
}
