export function dropHexPrefix(hexStr) {
  if (hexStr.indexOf('0x') === 0) {
    return hexStr.substr(2);
  }
  return hexStr;
}

export function addHexPrefix(hexStr) {
  if (hexStr.indexOf('0x') === 0) {
    return hexStr;
  }
  return `0x${hexStr}`;
}

export function toHex(utf8str, len, prefix) {
  let hex = global.web3.toHex(utf8str);
  if (len) {
    hex = [...hex].concat(new Array(len - hex.length).fill('0')).join('');
  }
  return prefix ? addHexPrefix(hex) : hex;
}
