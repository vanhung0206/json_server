
var adminsApi = "http://localhost:3000/admins";
let htmls = [];
var btnUpdate = [];
 
function designMode2() {
    document.querySelector("#design-mode").classList.toggle("design-mode-on");
    var text = document.querySelector(".design-mode-on");
    if( text) 
        document.designMode = "on"; 
    else 
        document.designMode = "off"; 
    console.log(text);
    // if
    // document.designMode = "on";
}


function getAPI( callback ) {
    fetch(adminsApi)
        .then( Response => Response.json() )
        .then (callback);     
}

function formatToHTML(obj) {
    return `<li id="id-${obj.id}" >
                <h2 class="id">ID: <span>${obj.id}</span> </h2>
                <h3 class="name">Name:<span> ${obj.name}</span></h3>
                <h3 class="password">Password:<span> ${obj.password}</span></h3>
                <span class="description">Description:<span>${obj.description}</span> </span>
                <button onclick = "deleteAdmin(${obj.id})">Xóa</button>
                <button class = "button-id" onclick = "handleUpdateAdmin(${obj.id})">Sửa</button>
             </li>`
}

function renderAdmin(datas) {
    htmls = datas.map( map => {
        return formatToHTML(map);
    })
    document.getElementById('list-admin').innerHTML = htmls.join("");
}

// function updateAdmin(...rest) {
//     console.log(rest);
// }

function postAPI( callback , data) {
    fetch(adminsApi, { 
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    } )
        .then( Response => Response.json())
        .then(callback);
}

function deleteAPI(callback, id) {
    fetch(`${adminsApi}/${id}`, { 
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    } )
        .then( Response => Response.json())
        .then(callback);
}

function updateAPI(callback, data) {
    fetch(`${adminsApi}/${data.id}`, { 
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    } )
        .then( Response => Response.json())
        .then(callback);
}


function postAdmin() {
    var name = document.querySelector(".input .name").value;
    var password = document.querySelector(".input .password").value;
    var description = document.querySelector(".input .description").value;
    var adminData = {name, password, description};
    postAPI(function(data){ 
        htmls.push(formatToHTML(data)); 
        document.getElementById('list-admin').innerHTML = htmls.join("");
    },adminData);
}


function deleteAdmin(id) {
    deleteAPI( () => {
        // console.log(document.getElementById(`id-${id}`));
        document.getElementById(`id-${id}`).remove();
    }, id)
}


function handleUpdateAdmin(id) {
    var parent = document.getElementById(`id-${id}`)
    var name = parent.querySelector(".name span").innerHTML;
    var password = parent.querySelector(".password span").innerHTML;
    var description = parent.querySelector(".description span").innerHTML;
    var html2 = `<li id="id-${id}" >
                    <h2 class="id">ID: <span>${id}</span> </h2>
                    <h3 class="name">Name:
                        <input type="text" class="input-name" value = "${name}">
                    </h3>
                    <h3 class="password">Password:
                        <input type="text" class="input-password" value = "${password}">
                    </h3>
                    <span class="description">Description:
                        <input type="text" class="input-description" value = "${description}">
                    </span>
                    <button class="btn-accept">oke</button>
                </li>`;
    parent.innerHTML = html2;
    document.querySelector(`#id-${id} .btn-accept`).onclick = function() {
        name = parent.querySelector(".input-name").value;
        password = parent.querySelector(".input-password").value;
        description = parent.querySelector(".input-description").value;
        var data2 = {id, name, password, description};
        updateAPI( data => {
            var html3 = formatToHTML(data);
            parent.innerHTML = html3;
        } ,data2);
    }
}



function start() {  
    getAPI(renderAdmin);
}

start();




