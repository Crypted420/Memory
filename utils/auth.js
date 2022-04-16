
var crypto = require('crypto');
const hashPassword = (plainPassword) => {
    return crypto.createHmac('sha256', 'secret key').update(plainPassword).digest('hex');

}


// const decrypted = () => {
    // return crypto.Decipher('sha256', 'secret key').update(decrypted).final(decrypted)
// cipher.update(plaintext, 'utf8', 'base64');
// var encryptedPassword = cipher.final('base64')

// decipher.update(encryptedPassword, 'base64', 'utf8');
// var decryptedPassword = decipher.final('utf8');
// }

// const algorithm = 'aes-256-cbc';
// const initVector = crypto.randomBytes(16);
// const securityKey = crypto.randomBytes(32);;
// const cryptr = (password) => {
//     const userPassword = password;
//     const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
//     let encrypted = cipher.update(userPassword, 'utf-8', 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
// }
module.exports = { hashPassword }
