import { ShareModule } from "./share.module";
import { DateAdapter } from '@angular/material';
import { TestBed } from '@angular/core/testing';

describe("ShareModule", () => {
    const dateAdapterMock = {
        setLocale: jasmine.createSpy("setLocale")
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: DateAdapter, useValue: dateAdapterMock }
            ]
        });
    });
    it("should created.", () => {
        const module = new ShareModule(TestBed.get(DateAdapter));
        expect(dateAdapterMock.setLocale).toHaveBeenCalledWith("ru-RU");
    });
});