export default {
  isValid: true,
  value: '',
  hash: '',

  compare(value: string, hash: string) {
    this.value = value;
    this.hash = hash;
    return this.isValid;
  },
};
