import crypto from 'crypto';

export function randomInt(min, max) {
  const rand = Math.round(Math.random() * max);
  return min + rand;
}

export function randomHex(len, prefix) {
  return `${prefix ? '0x' : ''}${crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len)}`;
}

export function randomAddress(prefix) {
  return randomHex(40, prefix);
}
