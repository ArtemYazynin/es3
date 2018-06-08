export enum ApplicantType {
    "Родитель/Опекун" = 1,
    "Лицо, действующее от имени законного представителя" = 2,
    "Лицо, подающее заявление о приёме самого себя" = 3
}
export namespace ApplicantType {

    export function values() {
        
      return Object.keys(ApplicantType).filter(
         (type) => !isNaN(<any>type) && type !== 'values'
      );
    }
  }