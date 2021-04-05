import validator from 'validator';

class EmailValidator {
  isValid(email: string) {
    return validator.isEmail(email);
  }
}
describe('Email Validator', () => {
  it('Should returns true if email is valid', () => {
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid('valid_email@email.com');

    expect(isEmailValid).toBe(true);
  });

  it('Should returns false if email is invalid', () => {
    // @ts-ignore
    validator.isEmailValid = false;
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid('invalid_email@email.com');

    expect(isEmailValid).toBe(false);
  });
});
