import { jest } from '@jest/globals';

jest.mock('validator', () => ({
  isEmailValid: true,
  email: '',

  isEmail(email: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.email = email;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.isEmailValid;
  },
}));

import validator from 'validator';
import { EmailValidator } from './email-validator';

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    validator.isEmailValid = false;
    const sut = makeSut();
    const isEmailValid = sut.isValid('invalid_email@email.com');

    expect(isEmailValid).toBe(false);
  });

  it('Should call validator with correct email', () => {
    const sut = makeSut();
    const email = 'invalid_email@email.com';
    sut.isValid(email);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(validator.email).toBe(email);
  });
});
