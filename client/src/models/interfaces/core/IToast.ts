
/** Type for toast type */
export type ToastType = 'info' | 'warning' | 'danger' | 'success';

/** Toast interface */
export interface IToast {
    id : number,
    title? : String,
    message? : String, 
    type : ToastType
};