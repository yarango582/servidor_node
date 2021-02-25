import jwt from "jsonwebtoken";

const secretKey = process.env.PRIVATE_KEY;

export const generateJWT = (user) => {

    

    let token = jwt.sign({
        user
    }, secretKey,{
        algorithm: 'HS384',
        expiresIn: '1h'
    });

    return token;
}

export const validateJWT = (req, res, next) => {
    
    let {bearerauth} = req.headers;

    if(bearerauth){

        try {
            const decoded = jwt.verify(bearerauth, secretKey);   
            next();
        } catch (error) {
            res.status(401).json({
                message: "El token de sesion es invalido"
            })
        }

    }else{
        res.status(500).json({
            message: "No se ha identificado el token, ingresa sesión"
        })
    }

}