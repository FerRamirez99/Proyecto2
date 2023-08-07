let data = [
    {
        id : 1,
        titulo : 'Gideon The Ninth',
        autor : 'Tamsyn Muir',
        editorial : 'Nova',
        completado : false
    },
    {
        id : 2,
        titulo : 'Joyland',
        autor : 'Stephen King',
        editorial : 'SC',
        completado : false
    }
]

function readAll() {
    //Add data we already have to local storage
    localStorage.setItem('object', JSON.stringify(data));
    let tableData = document.querySelector('#dataBooks');

    let object = localStorage.getItem('object');
    let objectData = JSON.parse(object);
    let elements = "";

    //Display data
    objectData.map(record => (
        elements += `<tr>
            <td>${record.id}</td>
            <td>${record.titulo}</td>
            <td>${record.autor}</td>
            <td>${record.editorial}</td>
            <td class="center"></td>
            <td class="center"><button class="btn btn-outline-primary" onclick={edit(${record.id})}><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td class="center"><button class="btn btn-outline-secondary" onclick={deleteData(${record.id})}><i class="fa-solid fa-trash"></i></button></td>
        </tr>`
    ))

    tableData.innerHTML = elements;
}

function add() {
    //Get values from the form
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let editorial = document.getElementById('ed').value;

    let newObj = {
        id : 3,
        titulo : title,
        autor : author,
        editorial : editorial,
        completado : false
    }

    data.push(newObj);
    readAll();
}

function edit(id) {
    document.getElementById('bookForm').style.display = "none";
    document.getElementById('updateForm').style.display = "block";

    let obj = data.find(rec => rec.id === id);
    document.querySelector('#titleEdit').value = obj.titulo;
    document.querySelector('#authorEdit').value = obj.autor;
    document.querySelector('#edEdit').value = obj.editorial;

    document.querySelector('#id').value = obj.id;
}
//hasta aqiui funcionaba bien
//al guaradr la modificacion tira undefined
function update() {
    let id = parseInt(document.querySelector('#id').value);
    let title = document.querySelector('#titleEdit').value;
    let author = document.querySelector('#authorEdit').value;
    let editorial = document.querySelector('#edEdit').value;

    let index = data.findIndex(rec => rec.id === id);
    data[index] = {id, title, author, editorial};

    document.getElementById('bookForm').style.display = "block";
    document.getElementById('updateForm').style.display = "none";

    readAll();
}
//este si funciona
function deleteData(id) {
    data = data.filter(rec => rec.id !== id);
    readAll();
}