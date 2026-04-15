const crypto = require('crypto');

const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');

const decode = (value) => JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));

const createSignature = (header, payload, secret) =>
  crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url');

const parseExpiresIn = (value) => {
  if (typeof value === 'number') {
    return value;
  }

  const match = String(value)
    .trim()
    .match(/^(\d+)([smhd])$/i);

  if (!match) {
    return 60 * 60 * 24 * 7;
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multiplier = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  };

  return amount * multiplier[unit];
};

const signToken = (payload, secret, expiresIn = '7d') => {
  const header = encode({ alg: 'HS256', typ: 'JWT' });
  const exp = Math.floor(Date.now() / 1000) + parseExpiresIn(expiresIn);
  const body = encode({ ...payload, exp });
  const signature = createSignature(header, body, secret);

  return `${header}.${body}.${signature}`;
};

const verifyToken = (token, secret) => {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [header, payload, signature] = parts;
  const expectedSignature = createSignature(header, payload, secret);

  if (signature !== expectedSignature) {
    throw new Error('Invalid token signature');
  }

  const decodedHeader = decode(header);

  if (decodedHeader.alg !== 'HS256') {
    throw new Error('Unsupported token algorithm');
  }

  const decodedPayload = decode(payload);

  if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }

  return decodedPayload;
};

module.exports = {
  signToken,
  verifyToken,
};
