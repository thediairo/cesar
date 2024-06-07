<?php
require_once "Pro.php";
$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $id=$_POST['id'];
    $sqle="DELETE FROM `tablaproductos` WHERE  id=$id";
    if($cx->query($sqle)){
       $valido['success']=true;
       $valido['mensaje']="SE ELIMINO CORRECTAMENTE";
    }else{
        $valido['success']=false;
       $valido['mensaje']="ERROR AL ELIMINAR EN BD"; 
    }
    
}else{
$valido['success']=false;
$valido['mensaje']="ERROR AL ELIMINAR";

}

echo json_encode($valido);
?>