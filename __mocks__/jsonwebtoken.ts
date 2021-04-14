export default {
  token: 'any_token',

  sign(id: string, secret: string) {
    return this.token;
  },
};
