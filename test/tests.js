import MyToken from './unittest/MyToken';
import StandardToken from './unittest/StandardToken';
import Token from './unittest/Token';

export const some = {
  StandardToken,
};

export const all = {
  ...some,
  MyToken,
  Token,
};
