const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Car Registration Module", () => {
  it("should register car with provided make, model and variant", async () => {
    const [owner] = await ethers.getSigners();
    const _factory = await ethers.getContractFactory("CarRegistration");
    const contract = await _factory.deploy();

    const vehicle = {
      number: "AB-111",
      make: "Honda",
      uint32: 2022,
      variant: "City",
    };

    await contract.insertCarDetails(
      vehicle.number,
      vehicle.make,
      vehicle.model,
      vehicle.variant
    );

    const carOwner = await contract.getOwnerByNumber(vehicle.number);

    expect(owner.address).to.be.equals(carOwner);
  });

  it("should get car details", async () => {
    const [owner] = await ethers.getSigners();
    const _factory = await ethers.getContractFactory("CarRegistration");
    const contract = await _factory.deploy();

    const vehicle = {
        number: "AB-222",
        make: "Honda",
        uint32: 2022,
        variant: "City",
      };

      await contract.insertCarDetails(
        vehicle.number,
        vehicle.make,
        vehicle.model,
        vehicle.variant
      );
  
    const carDetails = await contract.getCarByNumber(vehicle.number);

    expect(carDetails.number).to.be.equals(vehicle.number);
    expect(carDetails.make).to.be.equals(vehicle.make);
    expect(carDetails.model).to.be.equals(vehicle.model);
    expect(carDetails.varient).to.be.equals(vehicle.varient);

  });

  it("should transfer car ownership", async () => {
    const [owner] = await ethers.getSigners();
    const buyer = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
    const _factory = await ethers.getContractFactory("CarRegistration");
    const contract = await _factory.deploy();

    const vehicle = {
        number: "AB-333",
        make: "Honda",
        uint32: 2022,
        variant: "City",
      };

      await contract.insertCarDetails(
        vehicle.number,
        vehicle.make,
        vehicle.model,
        vehicle.variant
      );
  
    let currentCarOwner = await contract.getOwnerByNumber(vehicle.number);

    expect(currentCarOwner).to.be.equals(owner.address);

    await contract.transfer(buyer, newCarDetails.number);

    currentCarOwner = await contract.getOwner(newCarDetails.number);

    expect(currentCarOwner).to.be.equals(buyer);
  });
});
