import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

fdescribe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Sabka Bazzar into p tag footer', ()=>{
    const footerEl:HTMLElement = fixture.nativeElement;
    const p = footerEl.querySelector('p');
    expect(p?.textContent).toContain('2020-2021 Sabka Bazaar Grocery Suppies Pvt. Ltd.');
  })
});
