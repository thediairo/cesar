<?php
require_once "Pro.php";
$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $id=$_POST['id'];
    $a=$_POST['nombre'];
    $b=$_POST['pre'];
    $c=$_POST['can'];
    $d=$_POST['pro'];
    $e=$_POST['uni'];
    $f=$_POST['cat'];

    $sql = "UPDATE tablaproductos SET nombre='$a', precio='$b', cantidad='$c', proveedor='$d', unidad='$e', categoria='$f' WHERE id=$id";

    if($cx->query($sql)){
       $valido['success']=true;
       $valido['mensaje']="SE ACTUALIZO CORRECTAMENTE";
    }else{
        $valido['success']=false;
       $valido['mensaje']="ERROR AL ACTUALIZAR EN BD"; 
    }
    
}else{
$valido['success']=false;
$valido['mensaje']="ERROR AL GUARDAR";
}

echo json_encode($valido);
?>