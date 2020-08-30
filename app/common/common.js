const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken');

const awaitStreamReady = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole')
const verify = require ('../common/common')

// 验证token的方法，传入token，解密，验证是否过期
function verifyToken (token) {
  let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem'));//公钥
  let res = ''
  try {
    let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
    let { exp } = result, current = Math.floor(Date.now() / 1000);
    if (current <= exp) {
      res = result.data || {};
    }
  } catch (e) {
    console.log(e);
  }
  return res;
}

// 生成token   封装成一个方法
/**
*@filename:generateToken
*@Description:
 * data:用户id
 * time:保存时间
 * cert:密钥
*/
function generateToken (data, time) {
  let created = Math.floor(Date.now() / 1000);
  let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'));//私钥
  let token = jwt.sign({
    data,
    exp: created + time
  }, cert, { algorithm: 'RS256' });
  return token;
}

module.exports = {
  verifyToken,
  generateToken
}

