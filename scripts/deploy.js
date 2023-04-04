
async function main() {
    const Factory = await ethers.getContractFactory("CarRegistration");
 
    // Start deployment, returning a promise that resolves to a contract object
    const _contract = await Factory.deploy();   
    console.log("Contract deployed to address:", _contract.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });