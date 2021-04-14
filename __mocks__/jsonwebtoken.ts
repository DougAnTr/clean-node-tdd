export default {
  token: 'any_token',
  id: '',
  secret: '',

  sign(id: string, secret: string) {
    this.id = id;
    this.secret = secret;

    return this.token;
  },
};
