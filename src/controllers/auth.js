import bcrypt from "bcrypt";
import {Users, ResetTokens} from "../models/";
import {generateJWT} from "../middlewares/jwt";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

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

export const resetPassword = async (req, res) => {

    const {email} = req.body;
     
    try {

        const results = await Users.findOne({where: {email: email}});

        if(results){
            
            let token = uuidv4();
            
            let fechaActual = moment();
            let fechaFinal = moment(fechaActual).add(1, 'day');
            let expirationDate = moment(fechaFinal).format("yyyy-MM-D, h:mm");

            let resetTokenObj = {
                token,
                expirationDate,
                userId: results.id,
                active: true
            }

            const data = await ResetTokens.create(resetTokenObj);

            res.status(200).json(
                {
                    message: "peticion exitosa",
                    data
                }
            )
        }else{
            res.status(400).json({
                message: "No se encontró el usuario"
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "No se ha podido completar la solicitud"
        })
    }
    
}
