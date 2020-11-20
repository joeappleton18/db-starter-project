var md5 = require('md5');
const bcrypt = require('bcrypt');

const hashTest = async () => {
    const password = "password";
    console.log(md5(password));
    const start = Date.now();
    const bcryptHash = await bcrypt.hash(password, 10);
    const end = Date.now();
    const totalTime = (end - start);
    console.log(totalTime / 1000 + 'seconds');

    console.log(bcryptHash);
}

hashTest();
