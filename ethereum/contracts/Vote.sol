contract Vote {
    mapping (address => uint256) public Citizenship;
    address public owner;
    address public sender;
    mapping (address => uint256) public numberVotes;
    mapping (address => uint256) public numberOfVoters;

    //Defines the owner of the Citizenship contract
    function Vote(){
        owner=msg.sender;
        numberVotes[owner]=0;
        numberOfVoters[owner]=1;
    }

    function earnCitizenship(address voter){
        require(numberOfVoters[owner]-numberVotes[owner]>0);
        Citizenship[voter]++;
        numberVotes[owner]++;
    }

    function sendCoin(address coinContractAddress){
        sender=msg.sender;
        earnCitizenship(sender);
	}
}