import { InquiryTypeFriendlyNamePipe } from './inquiry-type.pipe';

describe('InquiryTypePipe', () => {
  it('create an instance', () => {
    const pipe = new InquiryTypeFriendlyNamePipe();
    expect(pipe).toBeTruthy();
  });
});
