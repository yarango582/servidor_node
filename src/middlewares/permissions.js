
import {Users} from "../models";

export const getRole = async (id) => {

    let {Roles} = await Users.findOne({where: {id: id}, include:["Roles"]});
    console.log(Roles[0].name);
    
} 
