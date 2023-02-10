import { LitElement } from 'lit';
import './hex-tile';
import './settings-modal';
import './sf-dropdown';
import './sf-switch';
import './pm-footer';
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
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    updateDimensions(): void;
    disableScroll(event: any): void;
    enableScroll(event: any): void;
    wheelHandler(event: any): void;
    pinchHandler(event: any): void;
    updateScale(event: any, marker: any): void;
    setColor(colorPosition: number): void;
    updateType(event: any): void;
    toggleGridSetting(): void;
    deselectAll(): void;
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
    save(): void;
    render(): import("lit").TemplateResult<1>;
}
