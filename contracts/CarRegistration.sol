// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.3;

contract CarRegistration {

   struct Car {
       string make;
       uint32 model;
       string varient;
       address owner;
   }

    mapping(string => Car)  carMap;

    function insertCarDetails(string memory carNumber , string memory carMake,uint32 carModel,string memory carVarient ) public {
        carMap[carNumber] = Car(carMake, carModel, carVarient, msg.sender);
    }

    function getCarByNumber(string memory carNumber) public view returns(string memory make, uint32 model,string memory varient){
        return (carMap[carNumber].make,carMap[carNumber].model,carMap[carNumber].varient);
    }
    function getOwnerByNumber(string memory carNumber) public view returns(address owner){
        return (carMap[carNumber].owner);
    }

    function transfer(string memory carNumber, address newOwner) public {
        carMap[carNumber].owner = newOwner;
    }
}