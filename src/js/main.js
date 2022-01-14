App = {

    contracts: {},

    init: async () => {
        await App.loadEthereum()
        await App.loadContract()
        await App.loadAccount()
        await App.renderPerson()
    },

    loadEthereum: async () => {

        if (window.ethereum) {
            App.web3Provider = window.ethereum
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        } else if (window.web3) {
            App.web3 = new Web3(window.web3.currentProvider)
        } else {
            console.log('NO ETH')
        }

    },

    loadContract: async () => {

        const res = await fetch("People.json")
        const PeopleContractJSON = await res.json()
        App.contracts.peopleContract = TruffleContract(PeopleContractJSON)
        App.contracts.peopleContract.setProvider(App.web3Provider)
        App.peopleContract = await App.contracts.peopleContract.deployed()

    },

    loadAccount: async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        App.account = accounts[0]
    },

    createPerson: async (dni, name, lastName, location, gender, birth) => {

        await App.peopleContract.createPerson(dni, name, lastName, location, gender, birth, {
            from: App.account
        })

    },

    renderPerson: async () => {

        const id = await App.peopleContract.getId()
        const idNumber = id.toNumber()

        let html = ''

        for (let i = 0; i < idNumber; i++) {

            const person = await App.peopleContract.getPerson(i)
            const id = person.id
            const dni = person.dni
            const name = person.name
            const lastName = person.lastName
            const location = person.location
            const gender = person.gender
            const birth = person.birth
            const active = person.active

            let photo = gender == 1 ? 'https://bootdey.com/img/Content/avatar/avatar7.png' : 'https://bootdey.com/img/Content/avatar/avatar8.png'

            if (active) {

                let personRow = `    
                            <tr class="candidates-list">
                                <td class="title">
                                    <div class="thumb">
                                        <img class="img-fluid" src="${photo}" alt="">
                                    </div>
                                    <div class="candidate-list-details">
                                        <div class="candidate-list-info">
                                            <div class="candidate-list-title">
                                                <h5 class="mb-0"><a href="#">${name} ${lastName}</a></h5>
                                            </div>
                                            <div class="candidate-list-option">
                                                <ul class="list-unstyled">
                                                    <li><i class="fas fa-filter pr-1"></i>Dni: ${dni}</li>
                                                    <li><i class="fas fa-filter pr-1"></i>Birth: ${new Date(birth * 1000).toLocaleDateString()}</li>
                                                    <li><i class="fas fa-filter pr-1"></i>Gender: ${gender == 1 ? 'Male' : 'Female'}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="candidate-list-favourite-time text-center">
                                    <a class="candidate-list-favourite order-2 text-danger" href="#"><i class="fas fa-heart"></i></a>
                                    <span class="candidate-list-time order-1">${location}</span>
                                </td>
                                <td class="candidate-list-favourite-time text-center">
                                    <i onclick="App.desactivate(${id})" class="bi bi-trash text-danger"></i>
                                    <i onclick="App.getData(${id})" class="bi bi-arrow-clockwise text-success"></i>
                                </td>
                            </tr>

                `

                html += personRow

            }

        }

        document.querySelector('tbody').innerHTML = html

    },

    desactivate: async (id) => {
        await App.peopleContract.desactivatePerson(id, {
            from: App.account
        })
    },

    getData: async (personId) => {

        const person = await App.peopleContract.getPerson(personId)
        const id = person.id
        const dni = person.dni
        const name = person.name
        const lastName = person.lastName
        const location = person.location
        const gender = person.gender
        const birth = person.birth

        const peopleForm = document.querySelector("#peopleForm")
        peopleForm.name.value = name
        peopleForm.lastName.value = lastName
        peopleForm.dni.value = dni
        peopleForm.location.value = location
        peopleForm.gender.value = gender
        peopleForm.birth.value = ((new Date(birth * 1000).toLocaleDateString()).split('/').reverse().join('-'))

        peopleForm.setAttribute('data-id' , personId)    

    },

    updatePerson: async (id, dni, name, lastName, location, gender, date) => {

        await App.peopleContract.updatePerson(id, dni, name, lastName, location, gender, date, {
            from: App.account
        })

    }

}

App.init()