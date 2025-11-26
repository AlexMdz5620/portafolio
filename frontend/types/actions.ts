export type ActionStateType = {
    success: boolean;
    msg: string;
    errors: string[];
}

export type ActionResponse = ActionStateType;

export type CreateAction = (prevState: unknown, formData: FormData) => Promise<ActionResponse>;
export type UpdateAction = (id: string, prevState: unknown, formData: FormData) => Promise<ActionResponse>;
export type DeleteAction = (id: string) => Promise<ActionResponse>;
