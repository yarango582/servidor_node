import {Users} from "../models/";


export const getUsers = async (req, res) => {

    try {

        let results = await Users.findAll();
        res.status(200).json(results);

    } catch (error) {
        res.status(401).json({
            message: "No fue posible realizar la petición"
        })
    }

}
