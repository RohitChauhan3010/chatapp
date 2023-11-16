const express = require("express");
const { handleErrors } = require("./errorhandler/errrorHandler")
const { connection } = require("./config/db")
// const {catchErrors}=require("./errorhandler/catchError")
const app = express();
const { router } = require("./routes/user.routes");
app.use(express.json());

// app.use(catchErrors);    

app.get("/", (req, res) => {
    try {
        const data = {
            title: "My Express App",
            message: "Hello, world!",
        };
        return res.json({ data });
    } catch (error) {
        handleErrors(error, req, res);
    }
});

app.use((err, req, res, next) => {
    handleErrors(err, req, res, next);
});

app.use("/api", router)


app.listen(6600, async () => {
    try {
        await connection
        console.log("database connected")
    } catch (error) {
        console.log("datbase not connected")
        console.error(error)

    }
    console.log("Server started on port 6600");
});
