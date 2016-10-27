pragma solidity ^0.4.2;

import "../src/lib/DoublyLinkedList.sol";

contract TestDoublyLinkedList {

  // UintData

  using DoublyLinkedList for DoublyLinkedList.UintData;
  DoublyLinkedList.UintData dllUintData;

  function findUintData(uint256 _item) returns (uint256 _it) {
    return dllUintData.find(_item);
  }
  function appendUintData(uint256 _data) returns (bool _success) {
    return dllUintData.append(_data);
  }
  function removeUintData(uint256 _index) returns (bool _success) {
    return dllUintData.remove(_index);
  }
  function totalUintData() returns (uint256 _count) {
    return dllUintData.total();
  }
  function startUintData() returns (uint256 _index) {
    return dllUintData.start();
  }
  function validUintData(uint256 _index) returns (bool _valid) {
    return dllUintData.valid(_index);
  }
  function previousUintData(uint256 _index) returns (uint256 _previous) {
    return dllUintData.previous(_index);
  }
  function nextUintData(uint256 _index) returns (uint256 _next) {
    return dllUintData.next(_index);
  }
  function getUintData(uint256 _index) returns (uint256 _item) {
    return dllUintData.get(_index);
  }

  // AddressData

  using DoublyLinkedList for DoublyLinkedList.AddressData;
  DoublyLinkedList.AddressData dllAddressData;

  function findAddressData(address _item) returns (uint256 _it) {
    return dllAddressData.find(_item);
  }
  function appendAddressData(address _data) returns (bool _success) {
    return dllAddressData.append(_data);
  }
  function removeAddressData(uint256 _index) returns (bool _success) {
    return dllAddressData.remove(_index);
  }
  function totalAddressData() returns (uint256 _count) {
    return dllAddressData.total();
  }
  function startAddressData() returns (uint256 _index) {
    return dllAddressData.start();
  }
  function validAddressData(uint256 _index) returns (bool _valid) {
    return dllAddressData.valid(_index);
  }
  function previousAddressData(uint256 _index) returns (uint256 _previous) {
    return dllAddressData.previous(_index);
  }
  function nextAddressData(uint256 _index) returns (uint256 _next) {
    return dllAddressData.next(_index);
  }
  function getAddressData(uint256 _index) returns (address _item) {
    return dllAddressData.get(_index);
  }

  // BytesData

  using DoublyLinkedList for DoublyLinkedList.BytesData;
  DoublyLinkedList.BytesData dllBytesData;

  function findBytesData(bytes32 _item) returns (uint256 _it) {
    return dllBytesData.find(_item);
  }
  function appendBytesData(bytes32 _data) returns (bool _success) {
    return dllBytesData.append(_data);
  }
  function removeBytesData(uint256 _index) returns (bool _success) {
    return dllBytesData.remove(_index);
  }
  function totalBytesData() returns (uint256 _count) {
    return dllBytesData.total();
  }
  function startBytesData() returns (uint256 _index) {
    return dllBytesData.start();
  }
  function validBytesData(uint256 _index) returns (bool _valid) {
    return dllBytesData.valid(_index);
  }
  function previousBytesData(uint256 _index) returns (uint256 _previous) {
    return dllBytesData.previous(_index);
  }
  function nextBytesData(uint256 _index) returns (uint256 _next) {
    return dllBytesData.next(_index);
  }
  function getBytesData(uint256 _index) returns (bytes32 _item) {
    return dllBytesData.get(_index);
  }

  // BoolData

  using DoublyLinkedList for DoublyLinkedList.BoolData;
  DoublyLinkedList.BoolData dllBoolData;

  function appendBoolData(bool _data) returns (bool _success) {
    return dllBoolData.append(_data);
  }
  function removeBoolData(uint256 _index) returns (bool _success) {
    return dllBoolData.remove(_index);
  }
  function totalBoolData() returns (uint256 _count) {
    return dllBoolData.total();
  }
  function startBoolData() returns (uint256 _index) {
    return dllBoolData.start();
  }
  function validBoolData(uint256 _index) returns (bool _valid) {
    return dllBoolData.valid(_index);
  }
  function previousBoolData(uint256 _index) returns (uint256 _previous) {
    return dllBoolData.previous(_index);
  }
  function nextBoolData(uint256 _index) returns (uint256 _next) {
    return dllBoolData.next(_index);
  }
  function getBoolData(uint256 _index) returns (bool _item) {
    return dllBoolData.get(_index);
  }

  // StringData

  using DoublyLinkedList for DoublyLinkedList.StringData;
  DoublyLinkedList.StringData dllStringData;

  function appendStringData(string _data) returns (bool _success) {
    return dllStringData.append(_data);
  }
  function removeStringData(uint256 _index) returns (bool _success) {
    return dllStringData.remove(_index);
  }
  function totalStringData() returns (uint256 _count) {
    return dllStringData.total();
  }
  function startStringData() returns (uint256 _index) {
    return dllStringData.start();
  }
  function validStringData(uint256 _index) returns (bool _valid) {
    return dllStringData.valid(_index);
  }
  function previousStringData(uint256 _index) returns (uint256 _previous) {
    return dllStringData.previous(_index);
  }
  function nextStringData(uint256 _index) returns (uint256 _next) {
    return dllStringData.next(_index);
  }
/*
  TODO make this work
  function getStringData(uint256 _index) returns (string _item) {
    return dllStringData.get(_index);
  }
*/
}
