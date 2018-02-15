pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(string descCampaign, string question) public {
        address newCampaign = new Campaign(descCampaign, question, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string name;
        string description;
        uint value;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    string public questionCampaign;
    string public descriptionCampaign;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(string description, string question,  address creator) public {
        manager = creator;
        descriptionCampaign = description;
        questionCampaign = question;
    }

    function giveRightToVote(address toVote) public restricted {
        approvers[toVote] = true;
        approversCount++;
    }

    function createRequest(string description, string name) public restricted {
        Request memory newRequest = Request({
            name: name,
           description: description,
           value: requests.length,
           approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        approvers[msg.sender] = false;

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }





    function getSummary() public view returns (
       string, string, uint, uint, uint, address
      ) {
        return (
          descriptionCampaign,
          questionCampaign,
          this.balance,
          requests.length,
          approversCount,
          manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}