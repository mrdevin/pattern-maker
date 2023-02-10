import { InlineModal } from './inline-modal';
export declare class SettingsModal extends InlineModal {
    static get styles(): import("lit").CSSResult;
    padding: number;
    hideGrid: boolean;
    toggleHideGrid(): void;
    updatePadding(event: any): void;
    render(): import("lit").TemplateResult<1>;
}
