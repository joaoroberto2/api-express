const express = require("express") 
const bodyParse = require('body-parser')
const app = express()
const userRoute = require("./routes/userRoutes") //importando o arquivo userroutes
const port = 3000;  //defininfo a porta do servidor

app.use(bodyParse.urlencoded({extended:false}))
userRoute(app)


app.listen(port, ()=> console.log('api rodando na porta 3000')) // iniciando o serviço do servidor na porta definida e exibindo mensagem.

