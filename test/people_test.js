const People = artifacts.require("People")

contract(People, () => {

    before(async () => {
        this.People = await People.deployed()
    })

    it('Deploy contract', async () => {

        const address = this.People.address

        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')

    })

    it('Create person', async () => {

        const result = await this.People.createPerson(37143235,"Mauro","Apellido","Buenos Aires",145678)
        assert.notEqual(result, null)
        assert.notEqual(result, undefined)

    })

    it('Get person', async () => {

        const person = await this.People.getPerson(0)
        assert.equal(person.id, 0)
        assert.equal(person.name, "Mauro")

    })

    it('Update person', async () => {

        const result = await this.People.updatePerson(0, 222222, "Albert", "Einstein", "CATAMARCA", 22222)
        const person = await this.People.getPerson(0)
        assert.equal(person.id, 0)
        assert.equal(person.name, "Albert")
        assert.equal(person.location, "CATAMARCA")

    })

    it('Reset person', async () => {

        const result = await this.People.resetPerson(0)
        const person = await this.People.getPerson(0)
        assert.notEqual(person.name, "Mauro") 
        assert.notEqual(person.lastName, "Apellido")

    })

})