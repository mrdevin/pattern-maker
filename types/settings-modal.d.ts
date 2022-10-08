import { InlineModal } from './inline-modal';
export declare class SettingsModal extends InlineModal {
    static get styles(): import("lit").CSSResult;
    constructor();
    rows: number;
    columns: number;
    padding: number;
    hideGrid: boolean;
    toggleHideGrid(): void;
    updatePadding(event: any): void;
    updateColumns(event: any): void;
    updateRows(event: any): void;
    render(): import("lit").TemplateResult<1>;
}
