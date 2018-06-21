export class Entity<T extends number | string> {
    public id: T;
    public name: string;
    public constructor(id: T, name: string) {
        this.id = id;
        this.name = name;
    }
}
