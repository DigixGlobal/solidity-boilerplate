pragma solidity ^0.4.2;

library DigixMath {

  function safeToAdd(uint256 a, uint256 b) returns (bool issafe) {
    issafe = (a + b >= a);
    return issafe;
  }

  function safeAdd(uint256 a, uint256 b) returns (uint256 result) {
    if (!safeToAdd(a, b)) {
      throw;
    } else {
      result = a + b;
      return result;
    }
  }

  function safeToSubtract(uint256 a, uint256 b) returns (bool issafe) {
    issafe = (b <= a);
    return issafe;
  }

  function safeSubtract(uint256 a, uint256 b) returns (uint result) {
    if (!safeToSubtract(a, b)) throw;
    result = a - b;
    return result;
  }

  function rateOf(uint256 _a, uint256 _b, uint256 _places) constant returns (uint256 _result) {
    uint256 _unit = 10 ** _places;
    _result = ((_unit * _a) + _b / 2) / _b;
    return _result;
  }

  function fromRate(uint256 _amount, uint256 _baserate, uint256 _places) returns (uint256 _fee) {
    _fee = ((_amount * _baserate) / (10 ** _places));
    return _fee;
  }

  function feeDays(uint256 _lastpaymentdate) public returns (uint256 _feedays) {
    uint256 _duration = now - _lastpaymentdate;
    _feedays = _duration / 1 days;
  }

  function calculateDemurrage(uint256 _lastpaymentdate, uint256 _balance, uint256 _dailyfeepermilligram) public constant returns (uint256 _fee, uint256 _feedays, uint256 _newpaymentdate) {
    // use feeDays function instead?
    _feedays = (now - _lastpaymentdate) / (1 days);
    // move into a varaiable ???
    _fee = (_balance / 1000000) * (_dailyfeepermilligram * _feedays);
    _newpaymentdate = _lastpaymentdate + (_feedays * (1 days));
    return (_fee, _feedays, _newpaymentdate);
  }

}
