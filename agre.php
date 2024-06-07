<?php

require_once "Pro.php";

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
        $a=$_POST['nombre'];
        $b=$_POST['pre'];
        $c=$_POST['can'];
        $d=$_POST['pro'];
        $e=$_POST['uni'];
        $f=$_POST['cat'];
        $sql="INSERT INTO `tablaproductos` VALUES (null,'$a','$b','$c','$d','$e','$f')";
        if($cx->query($sql)){
            $valido['success']=true;
        }else{
            $valido['success']=false;
        }
}else{
    $valido['success']=false;
}
 echo json_encode($valido);

?>>