pragma solidity ^0.4.2;

library DoublyLinkedList {

  struct UintItem {
    uint256 prev;
    uint256 next;
    uint256 item;
  }

  struct AddressItem {
    uint256 prev;
    uint256 next;
    address item;
  }

  struct BytesItem {
    uint256 prev;
    uint256 next;
    bytes32 item;
  }

  struct BoolItem {
    uint256 prev;
    uint256 next;
    bool item;
  }

  struct StringItem {
    uint256 prev;
    uint256 next;
    string item;
  }

  struct UintData {
    uint256 first;
    uint256 last;
    uint256 count;
    UintItem[] items;
  }

  struct AddressData {
    uint256 first;
    uint256 last;
    uint256 count;
    AddressItem[] items;
  }

  struct BytesData {
    uint256 first;
    uint256 last;
    uint256 count;
    BytesItem[] items;
  }

  struct BoolData {
    uint256 first;
    uint256 last;
    uint256 count;
    BoolItem[] items;
  }

  struct StringData {
    uint256 first;
    uint256 last;
    uint256 count;
    StringItem[] items;
  }

  uint256 constant NONE = uint256(0);

  /// uint

  function find(UintData storage self, uint256 _item) returns (uint256 _it) {
    _it = start(self);
    while (valid(self, _it)) {
      if (get(self, _it) == _item) {
        return _it;
      } else {
        _it = next(self, _it);
      }
    }
    return _it;
  }

  function append(UintData storage self, uint256 _data) returns (bool _success) {
    var index = uint256(self.items.push(UintItem({prev: self.last, next: NONE, item: _data})));
    if (self.last == NONE) {
      if (self.first != NONE || self.count != 0) {
        throw;
      } else {
        self.first = self.last = index;
        self.count = 1;
      }
    } else {
      self.items[self.last - 1].next = index;
      self.last = index;
      self.count ++;
    }
    _success = true;
    return _success;
  }

  function remove(UintData storage self, uint256 _index) returns (bool _success) {
    UintItem item = self.items[_index - 1];
    if (item.prev == NONE) {
      self.first = item.next;
    }
    if (item.next == NONE) {
      self.last = item.prev;
    }
    if (item.prev != NONE) {
      self.items[item.prev - 1].next = item.next;
    }
    if (item.next != NONE) {
      self.items[item.next - 1].prev = item.prev;
    }
    delete self.items[_index - 1];
    self.count--;
    _success = true;
    return _success;
  }

  function total(UintData storage self) returns (uint256 _count) {
    _count = self.count;
    return _count;
  }

  function start(UintData storage self) returns (uint256 _index) {
    _index = self.first;
    return _index;
  }

  function valid(UintData storage self, uint256 _index) returns (bool _valid) {
    _valid = ((_index - 1) < self.items.length);
    return _valid;
  }

  function previous(UintData storage self, uint256 _index) returns (uint256 _previous) {
    _previous = self.items[_index - 1].prev;
    return _previous;
  }

  function next(UintData storage self, uint256 _index) returns (uint256 _next) {
    _next = self.items[_index - 1].next;
    return _next;
  }

  function get(UintData storage self, uint256 _index) returns (uint256 _item) {
    _item = self.items[_index - 1].item;
    return _item;
  }

  /// address

  function find(AddressData storage self, address _item) returns (uint256 _it) {
    _it = start(self);
    while (valid(self, _it)) {
      if (get(self, _it) == _item) {
        return _it;
      } else {
        _it = next(self, _it);
      }
    }
    return _it;
  }

  function append(AddressData storage self, address _data) returns (bool _success) {
    var index = uint256(self.items.push(AddressItem({prev: self.last, next: NONE, item: _data})));
    if (self.last == NONE) {
      if (self.first != NONE || self.count != 0) {
        throw;
      } else {
        self.first = self.last = index;
        self.count = 1;
      }
    } else {
      self.items[self.last - 1].next = index;
      self.last = index;
      self.count ++;
    }
    _success = true;
    return _success;
  }

  function remove(AddressData storage self, uint256 _index) returns (bool _success) {
    AddressItem item = self.items[_index - 1];
    if (item.prev == NONE) {
      self.first = item.next;
    }
    if (item.next == NONE) {
      self.last = item.prev;
    }
    if (item.prev != NONE) {
      self.items[item.prev - 1].next = item.next;
    }
    if (item.next != NONE) {
      self.items[item.next - 1].prev = item.prev;
    }
    delete self.items[_index - 1];
    self.count--;
    _success = true;
    return _success;
  }

  function total(AddressData storage self) returns (uint256 _count) {
    _count = self.count;
    return _count;
  }

  function start(AddressData storage self) returns (uint256 _index) {
    _index = self.first;
    return _index;
  }

  function valid(AddressData storage self, uint256 _index) returns (bool _valid) {
    _valid = ((_index - 1) < self.items.length);
    return _valid;
  }

  function previous(AddressData storage self, uint256 _index) returns (uint256 _previous) {
    _previous = self.items[_index - 1].prev;
    return _previous;
  }

  function next(AddressData storage self, uint256 _index) returns (uint256 _next) {
    _next = self.items[_index - 1].next;
    return _next;
  }

  function get(AddressData storage self, uint256 _index) returns (address _item) {
    _item = self.items[_index - 1].item;
    return _item;
  }

  /// bytes32
  function find(BytesData storage self, bytes32 _item) returns (uint256 _it) {
    _it = start(self);
    while (valid(self, _it)) {
      if (get(self, _it) == _item) {
        return _it;
      } else {
        _it = next(self, _it);
      }
    }
    return _it;
  }

  function append(BytesData storage self, bytes32 _data) returns (bool _success) {
    var index = uint256(self.items.push(BytesItem({prev: self.last, next: NONE, item: _data})));
    if (self.last == NONE) {
      if (self.first != NONE || self.count != 0) {
        throw;
      } else {
        self.first = self.last = index;
        self.count = 1;
      }
    } else {
      self.items[self.last - 1].next = index;
      self.last = index;
      self.count ++;
    }
    _success = true;
    return _success;
  }

  function remove(BytesData storage self, uint256 _index) returns (bool _success) {
    BytesItem item = self.items[_index - 1];
    if (item.prev == NONE) {
      self.first = item.next;
    }
    if (item.next == NONE) {
      self.last = item.prev;
    }
    if (item.prev != NONE) {
      self.items[item.prev - 1].next = item.next;
    }
    if (item.next != NONE) {
      self.items[item.next - 1].prev = item.prev;
    }
    delete self.items[_index - 1];
    self.count--;
    _success = true;
    return _success;
  }

  function total(BytesData storage self) returns (uint256 _count) {
    _count = self.count;
    return _count;
  }

  function start(BytesData storage self) returns (uint256 _index) {
    _index = self.first;
    return _index;
  }

  function valid(BytesData storage self, uint256 _index) returns (bool _valid) {
    _valid = ((_index - 1) < self.items.length);
    return _valid;
  }

  function previous(BytesData storage self, uint256 _index) returns (uint256 _previous) {
    _previous = self.items[_index - 1].prev;
    return _previous;
  }

  function next(BytesData storage self, uint256 _index) returns (uint256 _next) {
    _next = self.items[_index - 1].next;
    return _next;
  }

  function get(BytesData storage self, uint256 _index) returns (bytes32 _item) {
    _item = self.items[_index - 1].item;
    return _item;
  }

  /// bool

  function append(BoolData storage self, bool _data) returns (bool _success) {
    var index = uint256(self.items.push(BoolItem({prev: self.last, next: NONE, item: _data})));
    if (self.last == NONE) {
      if (self.first != NONE || self.count != 0) {
        throw;
      } else {
        self.first = self.last = index;
        self.count = 1;
      }
    } else {
      self.items[self.last - 1].next = index;
      self.last = index;
      self.count ++;
    }
    _success = true;
    return _success;
  }

  function remove(BoolData storage self, uint256 _index) returns (bool _success) {
    BoolItem item = self.items[_index - 1];
    if (item.prev == NONE) {
      self.first = item.next;
    }
    if (item.next == NONE) {
      self.last = item.prev;
    }
    if (item.prev != NONE) {
      self.items[item.prev - 1].next = item.next;
    }
    if (item.next != NONE) {
      self.items[item.next - 1].prev = item.prev;
    }
    delete self.items[_index - 1];
    self.count--;
    _success = true;
    return _success;
  }

  function total(BoolData storage self) returns (uint256 _count) {
    _count = self.count;
    return _count;
  }

  function start(BoolData storage self) returns (uint256 _index) {
    _index = self.first;
    return _index;
  }

  function valid(BoolData storage self, uint256 _index) returns (bool _valid) {
    _valid = ((_index - 1) < self.items.length);
    return _valid;
  }

  function previous(BoolData storage self, uint256 _index) returns (uint256 _previous) {
    _previous = self.items[_index - 1].prev;
    return _previous;
  }

  function next(BoolData storage self, uint256 _index) returns (uint256 _next) {
    _next = self.items[_index - 1].next;
    return _next;
  }

  function get(BoolData storage self, uint256 _index) returns (bool _item) {
    _item = self.items[_index - 1].item;
    return _item;
  }

  /// string

  function append(StringData storage self, string _data) returns (bool _success) {
    var index = uint256(self.items.push(StringItem({prev: self.last, next: NONE, item: _data})));
    if (self.last == NONE) {
      if (self.first != NONE || self.count != 0) {
        throw;
      } else {
        self.first = self.last = index;
        self.count = 1;
      }
    } else {
      self.items[self.last - 1].next = index;
      self.last = index;
      self.count ++;
    }
    _success = true;
    return _success;
  }

  function remove(StringData storage self, uint256 _index) returns (bool _success) {
    StringItem item = self.items[_index - 1];
    if (item.prev == NONE) {
      self.first = item.next;
    }
    if (item.next == NONE) {
      self.last = item.prev;
    }
    if (item.prev != NONE) {
      self.items[item.prev - 1].next = item.next;
    }
    if (item.next != NONE) {
      self.items[item.next - 1].prev = item.prev;
    }
    delete self.items[_index - 1];
    self.count--;
    _success = true;
    return _success;
  }

  function total(StringData storage self) returns (uint256 _count) {
    _count = self.count;
    return _count;
  }

  function start(StringData storage self) returns (uint256 _index) {
    _index = self.first;
    return _index;
  }

  function valid(StringData storage self, uint256 _index) returns (bool _valid) {
    _valid = ((_index - 1) < self.items.length);
    return _valid;
  }

  function previous(StringData storage self, uint256 _index) returns (uint256 _previous) {
    _previous = self.items[_index - 1].prev;
    return _previous;
  }

  function next(StringData storage self, uint256 _index) returns (uint256 _next) {
    _next = self.items[_index - 1].next;
    return _next;
  }
  // TODO make this work
  /*function get(StringData storage self, uint256 _index) returns (string _item) {
    _item = self.items[_index - 1].item;
    return _item;
  }*/
}
