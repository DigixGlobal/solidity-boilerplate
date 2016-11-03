import MyToken from './unittest/MyToken';
import StandardToken from './unittest/StandardToken';
import Token from './unittest/Token';

export const some = {
  MyToken,
  Token,
};

export const all = {
  ...some,
  StandardToken,
};
