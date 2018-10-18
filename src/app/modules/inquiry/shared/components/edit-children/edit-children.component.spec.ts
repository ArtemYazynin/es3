import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditChildrenComponent } from './edit-children.component';


describe('EditChildrenComponent', () => {
    let component: EditChildrenComponent;
    let fixture: ComponentFixture<EditChildrenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditChildrenComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditChildrenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});