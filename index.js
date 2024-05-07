//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended: true}));

// Custom function for checking password
function passWord(req, res, next){
    const pass = req.body["password"];
    console.log(req.body);
    if (pass === "ILoveProgramming"){
        userIsAuthorised = true;
    }
    next();
}

app.use(passWord);

app.get("/", (req, res) =>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/check", (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
      } else {
        res.sendFile(__dirname + "/public/index.html");
        //Alternatively res.redirect("/");
      }
});

app.listen(port, () => {
    console.log("Listening on port %d", port);
});