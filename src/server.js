import app from "./index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto: ", PORT);
});