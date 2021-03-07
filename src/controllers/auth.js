import {Users, ResetTokens} from "../models/";
import {generateJWT} from "../middlewares/jwt";
import { v4 as uuidv4, validate } from "uuid";
import bcrypt from "bcrypt";
import moment from "moment";
import {goSendPassword} from "../utils/mail";
import {templateMail} from "../utils/handlerbars";

export const signUp = async (req, res) => {

    const hasPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hasPassword;
    
    const datos = req.body;

    try {

       const searchPeople = await Users.findOne({where: {email: datos.email}});

       if(searchPeople){
           res.status(500).json({
               message: "El correo ingresado ya esta uso"
           })
       }else{   
        const results = await Users.create(datos);
        res.status(201).json(results);
       }

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


            // datos para el template del correo
            let url = `miApp/api/v1/users/${results.id}/update-password`;

            let objBodyMail = {
                urlNewPass: url,
                passwordResetAddress: token
            }

            let template = templateMail(objBodyMail);

            // fin de datos y compilacion con handlebars para el html del correo

            // inicio del envío del correo
            let checkSendMail = await goSendPassword(
                process.env.MAIL_USER,
                email,
                template
            );

            res.status(200).json(
                {
                    message: "peticion exitosa",
                    data,
                    userID: results.id
                }
            )
        }else{
            res.status(400).json({
                message: "No se encontró el usuario"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "No se ha podido completar la solicitud"
        })
    }
    
}

export const updatePassword = async (req, res) => {

    const {token, password} = req.body;
    const  idUser = req.params.userID;
    const  fechaActual = moment();
    const hashPassword = bcrypt.hashSync(password, 10);

    try {

        if(validate(token)){

            const results = await ResetTokens.findOne({where: {token: token}});
            let estadoFecha =  moment(fechaActual).isBefore(results.expirationDate);

            if(results.token){

                if(estadoFecha && results.active){

                    const data = await Users.update({password: hashPassword},{where:{id: idUser}})

                    if(data){
                        res.status(201).json({
                            message: "Se actualizó la contraseña del usuario"
                        });
                        const resultUpdateToken = await ResetTokens.update({active: false}, {where:{token:token}});
                        
                        if(resultUpdateToken){
                            console.log("Se cambió el token a inactivo");
                        }else{
                            console.log("No se cambio el token a inactivo");
                        }
                    }else{
                        res.status(400).json({
                            message: "No fue posible actualizar la contraseña"
                        });
                    }
                }else{
                    res.status(401).json({
                        message: "la fecha del token esta vencida y/o el token ya fue usado"
                    })
                }

            }else{
                res.status(400).json({
                    message: "El token ingresado no existe"
                });
            }

        }else{
            res.status(401).json({
                message: "El token ingresado no es un token valido"
            });
        }
       
        
    } catch (error) {
        res.status(400).json({
            message: "No se ha podido completar la actualización"
        });
    }

}