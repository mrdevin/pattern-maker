import { LitElement } from 'lit';
import './hex-tile';
import './settings-modal';
import './sf-dropdown';
import './sf-switch';
import './pm-footer';
export declare enum GridType {
    PointedUp = "pointed-up",
    FlatUp = "flat-up"
}
export declare class PatternMaker extends LitElement {
    static styles: import("lit").CSSResult[];
    /**
     * The name to say "Hello" to.
     */
    rows: number;
    columns: number;
    currentScale: number;
    toggleType: string;
    colors: {
        name: string;
        color: string;
    }[];
    currentColor: {
        name: string;
        color: string;
    };
    currentType: string;
    previousWheelPosition: number;
    padding: number;
    selectedTiles: any[];
    activeTiles: any[];
    hideGrid: boolean;
    noscroll: boolean;
    noscrollTimeout: any;
    hideGridSettings: boolean;
    shouldSelectMany: boolean;
    hammerInst: any;
    gridType: GridType;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    updateDimensions(): void;
    disableScroll(event: any): void;
    enableScroll(): void;
    wheelHandler(event: any): void;
    pinchHandler(event: any): void;
    panhHandler(event: any): void;
    updateScale(_event: any, marker: any): void;
    setColor(colorPosition: number): void;
    updateType(event: any): void;
    toggleGridSetting(): void;
    deselectAll(): void;
    toggleGridType(): void;
    beforeUnloadListener(event: any): string;
    checkUnload(): void;
    removeFromSelected(tile: any): void;
    selectTile(event: any): void;
    updateSelectedTiles(param: any): void;
    toggleHideGrid(event: any): void;
    isSelected(ref: any): void;
    colorList(): any[];
    updatePadding(event: any): void;
    toggleSelectMany(): void;
    getActiveTiles(): void;
    renderSelectTxt(): "Selecting Many" | "Select Many";
    renderGridTxt(): "Pointed Sides up" | "Flat Sides up";
    save(): void;
    render(): import("lit").TemplateResult<1>;
}
