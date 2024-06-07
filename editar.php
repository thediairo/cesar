<?php
require_once "Pro.php";
header('Content-Type: text/html; charset=utf-8');
$valido['success']=array('success'=>false,
'mensaje'=>"",
'contactoid'=>"",
'nombre'=>"",
'precio'=>"",
'cantidad'=>"",
'proveedor'=>"",
'unidad'=>"",
'categoria'=>"");
if ($_POST) {
$id=$_POST['id'];
$sql="SELECT * FROM tablaproductos WHERE id=$id";
$res=$cx->query($sql);
$row=$res->fetch_array();
$valido['success']=true;
$valido['mensaje']="SE ENCONTRO REGISTRO";
$valido['id']=$row[0];
$valido['nombre']=$row[1];
$valido['precio']=$row[2];
$valido['cantidad']=$row[3];
$valido['proveedor']=$row[4];
$valido['unidad']=$row[5];
$valido['categoria']=$row[6];
}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE ENCONTRO EL CONTACTO";

}

echo json_encode($valido);
?>