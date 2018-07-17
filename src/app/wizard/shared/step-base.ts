export interface StepBase {
    isValid():boolean;
    goTo:{
        back:()=>void,
        next:()=>void
    }
}
