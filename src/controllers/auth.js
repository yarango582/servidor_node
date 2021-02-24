import {Users} from "../models/";
import bcrypt from "bcrypt";
import {generateJWT} from "../middlewares/jwt";

export const signUp = async (req, res) => {

    const hasPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hasPassword;
    
    const datos = req.body;

    try {
       
       const results = await Users.create(datos);
       res.status(201).json(results);

    } catch (error) {
        res.status(401).json({
            message: "No fue posible crear el usuario"
        })
    }

}

export const login = async (req, res) => {

    const {email, password} = req.body;
    
    try {

        const results = await Users.findOne({where: {email: email}});

        const verifyPass = bcrypt.compareSync(password, results.password);
        
        if(verifyPass){

            let token = generateJWT({
                id: results.id,
                firtsName: results.firtsName,
                lastName: results.lastName,
                email: results.email
            });

            res.status(200).json({
                message: "Se inició sesión",
                token,
                docMessage: "si estas en la documentacion copia el token y autoriza tus consultas"
            });

        }else{
            res.status(401).json({
                message: "Verifica tus credenciales"
            });
        }

    } catch (error) {
     res.status(401).json({
         message: "Verifica tus credenciales "
     })   
    }
}

