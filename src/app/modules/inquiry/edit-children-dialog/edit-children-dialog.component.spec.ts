import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditChildrenDialogComponent } from './edit-children-dialog.component';


describe('EditChildrenDialogComponent', () => {
    let component: EditChildrenDialogComponent;
    let fixture: ComponentFixture<EditChildrenDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditChildrenDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditChildrenDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});