
export const source = `
<!DOCTYPE html>
<html lang="en">
<head>
<style type="text/css">

.text-white {
    color: white;
}
.container {
    text-align: center;
    padding: 5% 2% 1% 2%;
    background: #212F3D;
    border-radius:6px;
}

p {
    font-size: 1.2em;
}

.btn {
    text-decoration: none;
    padding: 10px 15px;
    margin: none;
    background: #2ECC71;
    border-radius: 6px;
}

span {
    color: white;
}

.pie {
    margin-top: 50px;
}

</style>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cambio de contraseña</title>
</head>
<body>
    <div class="container">
        <h1 class="text-white">Solicitaste cambio de contraseña</h1>
        <p class="text-white">Aquí tienes el token para cambiar la contraseña: {{passwordResetAddress}}</p>
        <br>
        <a href='{{urlNewPass}}' class="btn"><span>Click aquí<span></a>
        <footer class="pie">
            <h4 class="text-white"> Todos los derechos reservados miApp </h4>
        </footer>
    </div>
</body>
</html>`