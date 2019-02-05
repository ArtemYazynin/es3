export class Entity<T extends number | string> {
    public constructor(public id: T, public name: string) {
    }
}

