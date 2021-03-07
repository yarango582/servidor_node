import handlebars from "handlebars";
import {source} from "./template.js";


let template = handlebars.compile(source);

export const templateMail = (data) => {

    return template(data);

}

