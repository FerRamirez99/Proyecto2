//Array con objetos(libros) para partir
let data = [
    {
        id : 1,
        titulo : 'Gideon The Ninth',
        autor : 'Tamsyn Muir',
        editorial : 'Nova',
    },
    {
        id : 2,
        titulo : 'Joyland',
        autor : 'Stephen King',
        editorial : 'Plaza Janéz',
    }
];

//Funcion para leer el array
function readAll() {
    //Agregar los objetos del array que ya existen al local storage
    localStorage.setItem('object', JSON.stringify(data));   //*JSON.stringify() --> convertir el valor js en un JSON string
    //Guardar los datos de la tabla en una variable(tableData)
    let tableData = document.querySelector('#dataBooks');

    //Guardar los objetos del array en una variable (object)
    let object = localStorage.getItem('object');
    //Guardar los datos del objeto en una variable (objectData)
    let objectData = JSON.parse(object);        //*JSON.parse() --> convertir JSON string a un objeto js
    let elements = "";

    //Mostrar los objetos del array
    objectData.map(record => (      //*arr.map() --> tomar los datos del array y hacer algo con ellos (usar la funcion record)
        //Al string elements le da todos los tags de la tabla con sus valores
        elements += `<tr>
            <td>${record.titulo}</td>
            <td>${record.autor}</td>
            <td>${record.editorial}</td>
            <td class="center"><button class="btn btn-outline-primary" onclick={edit(${record.id})}><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td class="center"><button class="btn btn-outline-secondary" onclick={deleteData(${record.id})}><i class="fa-solid fa-trash"></i></button></td>
        </tr>`
    ));
    //Sets el html de la tabla para que sea elements
    tableData.innerHTML = elements;     
}

//Funcion para añadir nuevo elemento al array
function add() {
    //Guardar los valores del formulario en una variable (title, author, editorial)
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let editorial = document.getElementById('ed').value;

    //Crea un nuevo objeto con los valores del formulario
    let newObj = {
        id : data.length + 1,
        titulo : title,
        autor : author,
        editorial : editorial
    }

    //Agregar el nuevo objeto al array data
    data.push(newObj);

    //Limpiar formulario
    document.getElementById('bookForm').reset()

    //Llamar a la funcion que lee los elementos guardados para que se actualice la tabla
    readAll();
}
//!-------------------------------------------------------------
//Funcion para editar elementos guardados
function edit(id) {
    //Cambiar el boton
    document.getElementById('btnEdit').style.display = "block";
    document.getElementById('btn').style.display = "none";

    //Encontrar el obj con el id que se pasa
    let obj = data.find(rec => rec.id === id);
    
    //Poner los elementos gurdados en los campos del form
    document.querySelector('#title').value = obj.titulo;
    document.querySelector('#author').value = obj.autor;
    document.querySelector('#ed').value = obj.editorial;

    document.querySelector('#id').value = obj.id;
}
//!hasta aqiui funcionaba bien
//al guaradr la modificacion tira undefined
//guarda el objeto modificado pero no lo lee bien
function update() {
    let id = parseInt(document.querySelector('#id').value);     //*parseInt() --> convierte un string a number
    let newTitle = document.getElementById('title').value;
    let newAuthor = document.querySelector('#author').value;

    //?--------------------------------------------------------------
    let editorial = document.querySelector('#ed').value;  //*this one works

    let index = data.findIndex(rec => rec.id === id);
    data[index] = {id, newTitle, newAuthor, editorial};

    //volver a cambiar los botones|
    document.getElementById('btnEdit').style.display = "none";
    document.getElementById('btn').style.display = "block";

    readAll();
    console.log(data);
}
//!-------------------------------------------------------------------------
//Funcion para eliminar elementos guardados
function deleteData(id) {
    //*arr.filter() --> filtra el array segun el filtro indicado --> todos los elementos que no coincidan con el id que se le pasa como parametro
    //Sets los elementos de data para que solo incluya los elementos que no coincidan con el id dado  
    data = data.filter(rec => rec.id !== id);     
    //Llamar a la funcion que lee los elementos guardados para que se actualice la tabla
    readAll();
}