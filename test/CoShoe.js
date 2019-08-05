const CoShoe = artifacts.require('./CoShoe.sol')

contract("CoShoe",(accounts) => {
    const shoeOwner = accounts[0]
    const randAddress = accounts[1]

    const exampleImageURL = "myexample.com"

    //predefine parameters
    const validShoe = {
        name: "",
        image: "",
        sold: false,
        price: web3.utils.toWei('0.5', 'ether')
    }

    // Initialize shoes sold
    let noShoes = 0;
    let price = web3.utils.toWei('0.5', 'ether'); // set the price and convert to wei
    

    //Test if contract mints 100 tokens on deployment
    context("Buy Shoe", function () {
        it('mints 100 tokens', async () => {
            let ShoeInstance = await CoShoe.deployed()
            let shoes = await ShoeInstance.getNumberofTokens()
            assert.equal(shoes,100, "not 100 tokens minted")
        }) // Test if it correctly transferws ownership
        it('correctly transfers ownership', async () => {
            let ShoeInstance = await CoShoe.deployed()

            await ShoeInstance.buyShoe(validShoe.name,validShoe.image, {
                from: shoeOwner, value: validShoe.price
            })
            let shoe = await ShoeInstance.shoes(0)

            assert.equal(shoe['owner'],shoeOwner, 'Owner does not match')
            assert.equal(shoe['name'],validShoe.name,'name does not match')
            assert.equal(shoe['image'],validShoe.image,'image does not match')
            assert.equal(validShoe.price, price, "Not sufficient funds")
        })

    // The test isn't working, leaving it here for completeness
    it('It should return the correct number of trues in checkPurchases function', async function() {

    let ShoeInstance = await CoShoe.deployed()
    // register a song from account 0
    let checkPurchase = await ShoeInstance.checkPurchases({from: accounts[1]})

    var thevalues = checkPurchase.filter(function(element) {
      return (element.select == true);
    });

    var count = thevalues.length;

    assert.equal(count, 1, "should be true") 
        })
        

    })
    
})