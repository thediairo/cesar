var boton=document.getElementById("agregar");
var boton2=document.getElementById("bus");
var boton3=document.getElementById("to");
var boton4=document.getElementById("bus3");



boton.onclick=async()=>{
    
let nombre=document.getElementById("nom").value;
let pre=document.getElementById("pre").value;
let can=document.getElementById("can").value;
let pro=document.getElementById("pro").value;
let uni=document.getElementById("uni").value;
let cat=document.getElementById("cat").value;

if(nombre.trim()=="" || pre.trim()=="" || can.trim()=="" || uni.trim()==""){

    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
    });
    return;

} 

const datos=new FormData();
datos.append("nombre", nombre);
datos.append("pre",pre);
datos.append("can",can);
datos.append("pro", pro);
datos.append("uni", uni);
datos.append("cat", cat);
datos.append('action', 'add');
let respuesta=await fetch("../../Productos/todo.php",{method:'POST',body:datos});
cargar();
let json=await respuesta.json();

if(json.success){
    Swal.fire({
        title: "Bien",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
    });
}else{    Swal.fire({
      icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
    });

}

}

boton2.onclick=async()=>{
   
    var select = document.getElementById("categorias");
var selectedCategories = Array.from(select.selectedOptions).map(option => option.value);

console.log(selectedCategories)
    const datos3 = new FormData();
    datos3.append("categorias", JSON.stringify(selectedCategories)); 
    datos3.append("action", "cargar2");

    let respuesta = await fetch("../../Productos/todo.php", { method: 'POST', body: datos3 });
    let json = await respuesta.json();



        cargar2()
    
    }

const cargar=async()=>{
    console.log("hola")
const datos2=new FormData();
datos2.append('action', 'cargar');
let respuesta=await fetch("../../Productos/todo.php", {method: 'POST' , body:datos2});
let json=await respuesta.json();
let tablaH=``
json.data.forEach(item=>{
    tablaH+=`<tr>
    <td>${item[0]}</td>
    <td>${item[1]}</td>
    <td>${item[2]}</td>
    <td>${item[3]}</td>
    <td>${item[4]}</td>
    <td>${item[5]}</td>
    <td>${item[6]}</td>
    <td><button class="btn btn-danger"  onclick="eliminar(${item[0]})" >borrar</button>
    <button data-bs-toggle="modal" data-bs-target="#edita" class="btn btn-primary" onclick="editar(${item[0]})">Editar</button>
    
    </td>
    </tr>
    `
});
document.getElementById("lista").innerHTML=tablaH;

}

const cargar2=async()=>{
    var select = document.getElementById("categorias");
    var selectedCategories = Array.from(select.selectedOptions).map(option => option.value);
    
const datos3=new FormData();
datos3.append("categorias",JSON.stringify(selectedCategories))
datos3.append('action', 'cargar2');

let respuesta=await fetch("../../Productos/todo.php", {method: 'POST' , body:datos3});
let json=await respuesta.json();
let tablaH=``
json.data.forEach(item=>{
    tablaH+=`<tr>
    <td>${item[0]}</td>
    <td>${item[1]}</td>
    <td>${item[2]}</td>
    <td>${item[3]}</td>
    <td>${item[4]}</td>
    <td>${item[5]}</td>
    <td>${item[6]}</td>
    <td><button class="btn btn-danger"  onclick="eliminar(${item[0]})" >borrar</button>
    <button data-bs-toggle="modal" data-bs-target="#edita" class="btn btn-primary" onclick="editar(${item[0]})">Editar</button>
    
    </td>
    </tr>
    `
});
document.getElementById("lista").innerHTML=tablaH;

}

const eliminar = async (id) => {
Swal.fire({
    title: "Seguro?? ",
    showDenyButton: true,
    confirmButtonText: "Tanto como que televisa le regalo 3 o mas campeonatos al america",
    confirmButtonColor: '#20c997',
    denyButtonText: "Tienes razon mejor no, pero a otra opción tiene razon"

}).then ( async (result) => {
    if (result.isConfirmed) {
        let contactoid = new FormData();
        contactoid.append('id', id);
        contactoid.append('action', 'eliminar')

        let respuesta = await fetch("../../Productos/todo.php", { method: 'POST',body: contactoid});
        let json = await respuesta.json();

        if (json.success == true) {
            Swal.fire({
                title: "Se elimino, ahora tenemos menos variedad", text: json.mensaje, icon: "success"});
        } else {
            Swal.fire({
                title: "ERROR", text: json.mensaje, icon: "error"});
        }
        cargar();
      
    }
});
}



const editar =async(id)=>{
let contactoid = new FormData();
contactoid.append('id', id);
contactoid.append('action','consul')
let respuesta = await fetch("../../Productos/todo.php", {
    method: 'POST',
    body: contactoid
});
let json = await respuesta.json();

document.querySelector("#id").value=json.id;
document.getElementById("enom").value=json.nombre;
document.getElementById("epre").value=json.precio;
document.getElementById("ecan").value=json.cantidad;
document.getElementById("epro").value=json.proveedor;
document.getElementById("euni").value=json.unidad;
document.getElementById("ecat").value=json.categoria;
}

const actualizarContacto = async()=>{
var id= document.querySelector("#id").value;
var nombre=document.getElementById("enom").value;
var precio=document.getElementById("epre").value;
var cantidad=document.getElementById("ecan").value;
var producto=document.getElementById("epro").value;
var unidad=document.getElementById("euni").value;
var categoria=document.getElementById("ecat").value;
 if(nombre.trim()=="" || precio.trim()=="" || cantidad.trim()=="" || unidad.trim()==""){
     Swal.fire({title: "ERROR", text:"Tienes campos vacíos",icon: "error"});
     return;
     
 }

 let datos=new FormData();
 datos.append("id",id);
datos.append("nombre",nombre);

datos.append("pre",precio);
datos.append("can",cantidad);
datos.append("pro", producto);
datos.append("uni", unidad);
datos.append("cat", categoria);
datos.append("action",'update')


let respuesta=await fetch("../../Productos/todo.php",{method:'POST',body:datos});
let jsoon=await respuesta.json();
cargar();



}
boton3.onclick=()=>{
    cargar()
}
boton4.onclick=async()=>{
 var fil=document.getElementById("bus2").value;
 const datos5=new FormData();
 datos5.append("dato",fil);
 datos5.append("action","cargar3");
 let respuesta = await fetch("../../Productos/todo.php", { method: 'POST', body: datos5 });
 let json = await respuesta.json();
 cargar3();
}
const cargar3=async()=>{
    var fil=document.getElementById("bus2").value;
    const datos5=new FormData();
    datos5.append("dato",fil);
    datos5.append("action","cargar3");
    let respuesta = await fetch("../../Productos/todo.php", { method: 'POST', body: datos5 });
    let json = await respuesta.json();
let tablaH=``
json.data.forEach(item=>{
    tablaH+=`<tr>
    <td>${item[0]}</td>
    <td>${item[1]}</td>
    <td>${item[2]}</td>
    <td>${item[3]}</td>
    <td>${item[4]}</td>
    <td>${item[5]}</td>
    <td>${item[6]}</td>
    <td><button class="btn btn-danger"  onclick="eliminar(${item[0]})" >borrar</button>
    <button data-bs-toggle="modal" data-bs-target="#edita" class="btn btn-primary" onclick="editar(${item[0]})">Editar</button>
    
    </td>
    </tr>
    `
});
document.getElementById("lista").innerHTML=tablaH;

}
