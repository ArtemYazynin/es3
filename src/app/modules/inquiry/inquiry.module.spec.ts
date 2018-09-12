import { InquiryModule } from './inquiry.module';

describe('InquiryModule', () => {
  let inquiryModule: InquiryModule;

  beforeEach(() => {
    inquiryModule = new InquiryModule();
  });

  it('should create an instance', () => {
    expect(inquiryModule).toBeTruthy();
  });
});
