exports.generateAddress = () => {
  return 'wallet_' + Math.random().toString(36).substring(2, 10);
};
exports.generatePrivateKey = () => {
  return 'private_' + Math.random().toString(36).substring(2, 10);
}