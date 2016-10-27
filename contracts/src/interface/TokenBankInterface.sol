pragma solidity ^0.4.2;

import "../storage/TokenBankStorage.sol";
import "../aux/ResolverClient.sol";


contract TokenBankInterface is ResolverClient {

    function TokenBankInterface(address _resolver) {
        resolver = _resolver;
        init("i:tbank");
    }

    function getTokenContractAddressFromSymbol(string _symbol) public constant returns (address _tokencontract) {
        _tokencontract = TokenBankStorage(getContract("s:tbank")).getTokenContractAddressFromSymbol(_symbol);
        return _tokencontract;
    }
}
