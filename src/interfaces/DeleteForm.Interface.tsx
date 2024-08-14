export interface DeleteFormProps{
    title: string;
    primaryMessage?: string;
    secondaryMessage?: string;
    onSubmit: (values: any) => void;
    onCancel: () => void;
}