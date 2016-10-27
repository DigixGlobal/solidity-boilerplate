pragma solidity ^0.4.2;
import "./ACOwned.sol";


contract ACGroups is ACOwned {

    bool isGroupsInit = false;

    struct Group {
        mapping(address => bool) members;
    }

    mapping (bytes32 => Group) groups;

    modifier ifGroup(bytes32 _groupName) {

        if (!groups[_groupName].members[msg.sender]) {
            throw;
        } else {
            _;
        }
    }

    modifier ifUserIsMemberOf(address _user, bytes32 _groupname) {
        if (!userIsMemberOf(_user, _groupname)) {
            throw;
        } else {
            _;
        }
    }

    modifier unlessGroupsInit() {
        if (isGroupsInit) {
            throw;
        } else {
            _;
        }
    }

    function registerAdmin(address _newadmin) ifOwner returns (bool _success) {
        groups["admins"].members[_newadmin] = true;
        _success = true;
        return _success;
    }

    function unregisterAdmin(address _oldadmin) ifOwner returns (bool _success) {
        groups["admins"].members[_oldadmin] = false;
        _success = true;
        return _success;
    }

    function addUserToGroup(bytes32 _group, address _user) ifGroup("admins") public returns (bool _success) {
        groups[_group].members[_user] = true;
        _success = true;
        return _success;
    }

    function delUserFromGroup(bytes32 _group, address _user) ifGroup("admins") public returns (bool _success) {
        groups[_group].members[_user] = false;
        _success = true;
        return _success;
    }

    function userIsMemberOf(address _user, bytes32 _group) public constant returns (bool _ismember) {
        _ismember = groups[_group].members[_user];
        return _ismember;
    }

}
