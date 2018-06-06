import { IdentityCardTypeFriendlyNamePipe } from './identity-card-type-friendly-name.pipe';

describe('IdentityCardTypeFriendlyNamePipe', () => {
  it('create an instance', () => {
    const pipe = new IdentityCardTypeFriendlyNamePipe();
    expect(pipe).toBeTruthy();
  });
});
