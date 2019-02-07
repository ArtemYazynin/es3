import { Applicant, Child, IdentityCard, Parent } from ".";

export class DublicatesFinder {
    static betweenParentChildren(parent: Parent, children: Array<Child>): boolean {
        const collection = [parent.identityCard];
        children.forEach(child => {
            collection.push(child.identityCard)
        });
        if (this.hasDublicates(collection)) {
            alert("Законный представитель и ребёнок/дети имеют одинаковые персональные данные")
            return true;
        }
        return false;
    }

    static betweenApplicantChildren(applicant: Applicant, children: Array<Child>): boolean {
        const collection = [applicant.identityCard];
        children.forEach(child => {
            collection.push(child.identityCard)
        });
        if (this.hasDublicates(collection)) {
            alert("Доверенное лицо законного представителя и ребёнок/дети имеют одинаковые персональные данные")
            return true;
        }
        return false;
    }

    static betweenApplicantParent(applicant: Applicant, parent: Parent): boolean {
        if (!applicant || !parent) return false;
        const collection = [applicant.identityCard, parent.identityCard];
        if (this.hasDublicates(collection)) {
            alert("Законный представитель и доверенное лицо законного представителя имеют одинаковые персональные данные")
            return true;
        }
        return false;
    }

    static betweenChildren(children: Array<Child>){
        const collection = children.map(x=>x.identityCard);
        if (this.hasDublicates(collection)) {
            alert("Дети имеют одинаковые персональные данные")
            return true;
        }
        return false;
    }

    private static hasDublicates(collection: Array<IdentityCard>): boolean {
        let result = false;
        let checked = {};
        for (let index = 0, len = collection.length; index < len; index++) {
            const element = collection[index];
            if (checked[element.hashCode]) {
                result = true; break;
            }
            checked[element.hashCode] = element;
        }
        return result;
    }
}
