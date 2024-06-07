<?php

require_once "Pro.php";

$respuesta = ["success" => false, "mensaje" => ""];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'add') {
        $valido = ["success" => false, "mensaje" => ""];

        if ($_POST) {
            $a = $_POST['nombre'];
            $b = $_POST['pre'];
            $c = $_POST['can'];
            $d = $_POST['pro'];
            $e = $_POST['uni'];
            $f = $_POST['cat'];

            $sql = "INSERT INTO `tablaproductos` VALUES (null,'$a','$b','$c','$d','$e','$f')";
            if ($cx->query($sql)) {
                $valido['success'] = true;
            } else {
                $valido['success'] = false;
            }
        } else {
            $valido['success'] = false;
        }
        echo json_encode($valido);

    } elseif ($action === 'update') {
        $valido = ["success" => false, "mensaje" => ""];

        if ($_POST) {
            $id = $_POST['id'];
            $a = $_POST['nombre'];
            $b = $_POST['pre'];
            $c = $_POST['can'];
            $d = $_POST['pro'];
            $e = $_POST['uni'];
            $f = $_POST['cat'];

            $sql = "UPDATE tablaproductos SET nombre='$a', precio='$b', cantidad='$c', proveedor='$d', unidad='$e', categoria='$f' WHERE id=$id";

            if ($cx->query($sql)) {
                $valido['success'] = true;
                $valido['mensaje'] = "SE ACTUALIZO CORRECTAMENTE";
            } else {
                $valido['success'] = false;
                $valido['mensaje'] = "ERROR AL ACTUALIZAR EN BD";
            }

        } else {
            $valido['success'] = false;
            $valido['mensaje'] = "ERROR AL GUARDAR";
        }

        echo json_encode($valido);

    } elseif ($action === 'cargar') {
        header('Content-Type: application/json; charset=utf-8');

        $sql = "SELECT * FROM `tablaproductos`";
        $registro = ['data' => []];
        $res = $cx->query($sql);
        if ($res->num_rows > 0) {
            while ($row = $res->fetch_array()) {
                $registro['data'][] = [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6]];
            }
        }

        echo json_encode($registro);

    } elseif ($action === 'eliminar') {
        $valido = ["success" => false, "mensaje" => ""];

        if ($_POST) {
            $id = $_POST['id'];
            $sqle = "DELETE FROM `tablaproductos` WHERE  id=$id";
            if ($cx->query($sqle)) {
                $valido['success'] = true;
                $valido['mensaje'] = "SE ELIMINO CORRECTAMENTE";
            } else {
                $valido['success'] = false;
                $valido['mensaje'] = "ERROR AL ELIMINAR EN BD";
            }

        } else {
            $valido['success'] = false;
            $valido['mensaje'] = "ERROR AL ELIMINAR";
        }

        echo json_encode($valido);

    } elseif ($action === 'consul') {
        header('Content-Type: application/json; charset=utf-8');
        $valido = [
            "success" => false,
            "mensaje" => "",
            "contactoid" => "",
            "nombre" => "",
            "precio" => "",
            "cantidad" => "",
            "proveedor" => "",
            "unidad" => "",
            "categoria" => ""
        ];
        if ($_POST) {
            $id = $_POST['id'];
            $sql = "SELECT * FROM tablaproductos WHERE id=$id";
            $res = $cx->query($sql);
            if ($res && $res->num_rows > 0) {
                $row = $res->fetch_array();
                $valido['success'] = true;
                $valido['mensaje'] = "SE ENCONTRO REGISTRO";
                $valido['id'] = $row[0];
                $valido['nombre'] = $row[1];
                $valido['precio'] = $row[2];
                $valido['cantidad'] = $row[3];
                $valido['proveedor'] = $row[4];
                $valido['unidad'] = $row[5];
                $valido['categoria'] = $row[6];
            } else {
                $valido['success'] = false;
                $valido['mensaje'] = "NO SE ENCONTRO EL CONTACTO";
            }

        }

        echo json_encode($valido);

    } elseif ($action === 'cargar2') {
        header('Content-Type: application/json; charset=utf-8');
        $categorias = json_decode($_POST['categorias']); 
    
        $categorias_str = "'" . implode("','", $categorias) . "'";
    
        $sql = "SELECT * FROM tablaproductos WHERE categoria IN ($categorias_str)";
        $registro = ['data' => []];
        $res = $cx->query($sql);
    
        if ($res && $res->num_rows > 0) {
            while ($row = $res->fetch_array()) {
                $registro['data'][] = [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6]];
            }
        }
    
        echo json_encode($registro);

    } elseif ($action === 'cargar3') {
        header('Content-Type: application/json; charset=utf-8');
        $categorias = $_POST['dato']; 
        
     
        $sql = "SELECT * FROM tablaproductos WHERE categoria LIKE '%$categorias%' or nombre like '%$categorias%'";
        $registro = ['data' => []];
        $res = $cx->query($sql);
        
        if ($res && $res->num_rows > 0) {
            while ($row = $res->fetch_array()) {
                $registro['data'][] = [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6]];
            }
        }
        
        echo json_encode($registro);
    }else {
        echo json_encode($respuesta);
    }

} else {
    echo json_encode(["error" => "Método no permitido"]);
}

?>
