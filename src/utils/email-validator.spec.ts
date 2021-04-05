import validator from 'validator';

class EmailValidator {
  isValid(email: string) {
    return validator.isEmail(email);
  }
}

const makeSut = () => {
  return new EmailValidator();
};

describe('Email Validator', () => {
  it('Should returns true if email is valid', () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid('valid_email@email.com');

    expect(isEmailValid).toBe(true);
  });

  it('Should returns false if email is invalid', () => {
    // @ts-ignore
    validator.isEmailValid = false;
    const sut = makeSut();
    const isEmailValid = sut.isValid('invalid_email@email.com');

    expect(isEmailValid).toBe(false);
  });

  it('Should call validator with correct email', () => {
    const sut = makeSut();
    const email = 'invalid_email@email.com';
    const isEmailValid = sut.isValid(email);

    // @ts-ignore
    expect(validator.email).toBe(email);
  });
});
