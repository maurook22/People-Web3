// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract People {

    uint256 private id = 0;
    address private owner;

    constructor(){
        owner = msg.sender;
    }

    struct Person {
        uint256 id;
        uint256 dni;
        string name;
        string lastName;
        string location;
        uint256 gender;
        uint256 birth;
        bool active;
        address wallet;
     }

    event PersonCreate(
        Person person
    );

    mapping(uint256 => Person) private people;

    function createPerson(uint256 _dni, string memory _name, string memory _lastName, string memory _location, uint256 _gender, uint256 _birth) public {

        people[id] = (Person(id,_dni,_name,_lastName, _location, _gender, _birth, true, owner));
        Person memory person = getPerson(id);
        emit PersonCreate(person);
        id++;

    }

    function updatePerson(uint256 _id, uint256 _dni, string memory _name, string memory _lastName, string memory _location, uint256 _gender, uint256 _birth) public {

        //require(owner == msg.sender); 
        Person memory person = getPerson(_id);
        person.dni = _dni;
        person.name = _name;
        person.lastName = _lastName;
        person.location = _location;
        person.gender = _gender; 
        person.birth = _birth; 
        //person.wallet = owner; 
        people[_id] = person;

    }

    function getPerson(uint256 _id) public view returns (Person memory){

        Person memory person = people[_id];
        return person;

    }

    function getId() public view returns (uint256){

        return id;

    }

    function desactivatePerson(uint256 _id) public {

        Person memory person = people[_id];
        person.active = !person.active;
        people[_id] = person;

    }

}