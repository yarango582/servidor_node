import {Roles, UserRoles} from "../models/";

export const createRole = async (req, res) => {

    const data = req.body;

    try{

        const results = await Roles.create(data);

        res.status(201).json({
            results,
            message: "El rol ha sido creado correctamente"
        })

    }catch(error){
        res.status(401).json({
            message: "El rol no puede ser creado"
        })
    }

}

export const createRoleForUser = async (req, res) => {

    const {userId} = req.body;
    const role = req.params.roleID;

    const relation = {
        userId : userId,
        rolesId: role
    }
    
    try {

        const results = await UserRoles.create(relation);
        
        res.status(201).json({
            results,
            message: "Se asocio el rol para el usuario"
        })
    } catch (error) {
        res.status(401).json({
            message: "No se ha podido asociar un rol al usuario"
        })
    }


}

