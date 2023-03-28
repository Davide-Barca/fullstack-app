/**
 * LOAD
 */

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']))
})

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody')

    console.log(data)

    if(data.length === 0){
        table.innerHTML="<tr><td class='no-data' colspan='5'>No Data</td></tr>"
        return
    }

    let tableHtml = ""

    data.forEach(function({id, name, date_added}) {
        tableHtml += "<tr>"
        tableHtml += `<td>${id}</td>`
        tableHtml += `<td>${name}</td>`
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`
        tableHtml += "</tr>"
    });

    table.innerHTML = tableHtml
}

/**
 * INSERT
 */

const addBtn = document.querySelector('#add-name-btn')

addBtn.onclick = function(){
    const nameInput = document.querySelector('#name-input')

    const name = nameInput.value
    nameInput.value = ""

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name: name})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']))
}

function insertRowIntoTable(data){
    const table = document.querySelector('table tbody')
    const isTableData = table.querySelector('.no-data')

    let tableHtml = "<tr>"

    for (var key in data) {
        if(data.hasOwnProperty(key)) {
            if(key === 'dateAdded'){
                data[key] = new Date(data[key]).toLocaleString()
            }
            tableHtml += `<td>${data[key]}</td>`
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`
    tableHtml += "</tr>"

    if(isTableData) {
        table.innerHTML = tableHtml
    } else {
        const newRow = table.insertRow()
        newRow.innerHTML = tableHtml
    }
}

/**
 * SEARCH
 */

const searchBtn = document.querySelector('#search-btn')

searchBtn.onclick = function () {
    const nameSearchInput = document.querySelector('#search-input').value

    console.log(nameSearchInput)

    fetch('http://localhost:5000/search/' + nameSearchInput)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']))
}

/**
 * DELETE & EDIT
 */

document.querySelector('table tbody').addEventListener('click', (event) => {
    if(event.target.className === 'delete-row-btn') {
        deleteRowById(event.target.dataset.id)
    }
    if(event.target.className === 'edit-row-btn'){
        handleEditRow(event.target.dataset.id)
    }
})

// Delete
function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            location.reload()
        }
    })
}

// Edit
const updateBtn = document.querySelector('#update-row-btn')

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row')
    updateSection.hidden = false
    document.querySelector('#update-name-input').dataset.id = id
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input')

    console.log(updateNameInput)

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload()
        }
    })
}

