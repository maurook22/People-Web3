const peopleForm = document.querySelector("#peopleForm")

peopleForm.addEventListener("submit", e => {

    e.preventDefault()

    let date = new Date(peopleForm["birth"].value + 'T00:00')
    date = date.getTime() / 1000

    App.createPerson(
        peopleForm["dni"].value,
        peopleForm["name"].value,
        peopleForm["lastName"].value,
        peopleForm["location"].value,
        peopleForm["gender"].value,
        date
    )

})

const resButton = document.querySelector("#res")

resButton.addEventListener("click", e => {

    e.preventDefault()

    document.querySelector("#peopleForm").reset()

})

const updButton = document.querySelector("#upd")

updButton.addEventListener("click", e => {

    

    let id = peopleForm.getAttribute("data-id");

    e.preventDefault()

    let date = new Date(peopleForm["birth"].value + 'T00:00')
    date = date.getTime() / 1000

    App.updatePerson(
        id, 
        peopleForm["dni"].value, 
        peopleForm["name"].value,
        peopleForm["lastName"].value,
        peopleForm["location"].value,
        peopleForm["gender"].value,
        date
    )

})