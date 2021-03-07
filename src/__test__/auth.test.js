import { not } from "joi";
import supertest from "supertest";
import app from "../index";


describe("Probando el registro de usuario", () =>{

    it("Agregando un nuevo usuario", async () => {
        //arrange
        let userObj = {
            firtsName: "Pepito",
            lastName: "Perez",
            email: "pepitopepe@gmail.com",
            password: "1234"
        }
        //assert
        const response = await supertest(app).post("/api/v1/signup").send(userObj);
        //act
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("firtsName", "Pepito");
        expect(response.body).toHaveProperty("lastName", "Perez");
        expect(response.body).toHaveProperty("email", "pepitopepe@gmail.com");
        // expect(response.body).not.toHaveProperty("password", "1234");

    });

});