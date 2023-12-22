const { createHmac, createDiffieHellman } = require('node:crypto');


const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');
// console.log(hash);

const s = createDiffieHellman(1128);
const private_s = s.generateKeys();
console.log(s)
const c = createDiffieHellman(s.getPrime(), s.getGenerator());
const private_c = c.generateKeys();

const s1 = s.computeSecret(private_c);
const s2 = c.computeSecret(private_s);

console.log(s1.toString('hex'));
console.log('=========');
console.log(s2.toString('hex'));