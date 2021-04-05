export default {
  isEmailValid: true,
  email: '',

  isEmail(email: string) {
    this.email = email;
    return this.isEmailValid;
  },
};
