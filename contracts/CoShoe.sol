pragma solidity^0.5.0;

contract CoShoe{

    struct Shoe {
        address payable owner; //the address of the owner
        string name; //name of owner
        string image; //url of the image
        bool sold; //whether or not the shoe sold
    }

    uint256 price = 5*10**17; //price stored in wei
    uint256 shoesSold = 0; //initialise to zero
    uint256 count = 0; //initialise to zero

    Shoe[] public shoes; //Create a dynamic array to store shoes

    //constructor to mint 100 tokens with name = "" and image = ""
    constructor() public {
        for (uint i = 1; i <= 100; i++) { // loop to add each one
        shoes.push(Shoe(msg.sender, "","",false)); 
        }
    }

    // Used in testing to check if 100 tokens were minted
    function getNumberofTokens() public view returns(uint counts) {
        return shoes.length;
    }

    //used to be external payable
    function buyShoe(string memory _name, string memory _image) public payable { 

        require(shoesSold < shoes.length, "exceeded number of shoes");
        require(msg.value == price, "Value is not equal to price");
        uint256 ii = shoesSold + 1;
        shoes[ii].name = _name;
        shoes[ii].image = _image;
        shoes[ii].owner = msg.sender;
        shoes[ii].sold = true;
    // increment the number of shoes sold by 1
        shoesSold++;

    }

    // Check purchases is a view function because it does not change anything - saves gas
    function checkPurchases() external view returns (bool[] memory){
        bool[] memory checkPurchase;
        for (uint256 i = 0; i < shoes.length; i++){
            if (shoes[i].owner == msg.sender){
                checkPurchase[i] = true;
            }
        }
        return checkPurchase; // Return the array
    }

}