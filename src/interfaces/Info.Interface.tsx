export interface InfoProps{
    title: string;
    primaryMessage?: string;
    secondaryMessage?: string;
    onCancel: () => void;
}