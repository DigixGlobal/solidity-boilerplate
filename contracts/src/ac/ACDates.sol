pragma solidity ^0.4.2;


contract ACDates {

    modifier ifBefore(uint256 _date) {
        if (now > _date) {
            throw;
        } else {
            _;
        }
    }

    modifier ifAfter(uint256 _date) {
        if (now < _date) {
            throw;
        } else {
            _;
        }
    }
}
