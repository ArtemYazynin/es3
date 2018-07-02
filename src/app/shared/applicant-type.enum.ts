export enum ApplicantType {
    "Законный представитель ребенка" = 1,
    "Доверенное лицо законного представителя ребенка" = 2,
    "Ребенок-заявитель" = 3
}
export namespace ApplicantType {

    export function values() {
        
      return Object.keys(ApplicantType).filter(
         (type) => !isNaN(<any>type) && type !== 'values'
      );
    }
  }