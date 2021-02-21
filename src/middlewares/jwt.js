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

    
    const bearerToken = req.headers['authorization'];
    const token = bearerToken.split(" ")[1];
    
    if(token){

        try {
            const decoded = jwt.verify(token, secretKey);   
            next();
        } catch (error) {
            res.status(401).json({
                message: "El token de sesion es invalido"
            })
            console.log(error);
        }

    }

}