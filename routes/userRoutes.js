const { json } = require('express')
const fs = require('fs')
const {join} = require('path')

const filePath = join(__dirname, 'users.json')

const getUsers = () =>{
    const data = fs.existsSync(filePath) //verificando se o arquivo user.json foi criado.
        ? fs.readFileSync(filePath)   //se o arquivo existir blz retorna os arquivo
        : []                           // se o aruqivo nao existir retorna nulo
    
    try {
        return JSON.parse(data) //ocorreu tudo bem retorna a requisão com dados.
    } catch (error) {
        return []   //caso de algo errado na aplicação retorna com vazio.
    }
}

const saveUsers = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))  // criando função para escrever no arquivo Json.

const userRoute = (app) =>{ //recebendo os serviços de app 'express'
    app.route('/users/:id?')  //criando o serviço de rota e dando o nome '?' serve para nao força o paramento id com algum valor
    .get((req, res)=>{
        const users = getUsers() // recebe a função get users  com seus valores.
        res.send({users}) // retornando a requisão com o valores que 'users' recebeu anteriomente 
    })
    .post((req, res) => {
        const users = getUsers() //buscando dados no arquivo json e recebendo valores

        users.push(req.body)  //como o users e um objeto, vai ser inserido  um novo registro nesso objeto a proxima  posição
        saveUsers(users)  // apos inserir o novo registro, sera salvo dentro do json
        res.status(201).send('ok')  //retorno o status para informar, que  foi executado com sucesso a requisição.
    })
    .put((req,res)=>{
        const users = getUsers()

        saveUsers(users.map(user =>{ //o map ira percorrer o array objeto por objeto, salvado quando percorrimento no user.
            if(user.id === req.params.id){ //ira fazer compara os valores 
                return{
                    ...user, //os tres prontos servem para mesclar os objeto com outro caso tenha um valor adicional sera criado.
                    ...req.body //substitui 
                }
            }
            return user

        }))
        res.status(200).send('ok')
       
    })
    .delete((req, res)=>{
        const users = getUsers()
        
        saveUsers(users.filter(user => user.id !== req.params.id))  // irei filtrar todos usuarios diferente do id e manter no users.
        res.status(200).send('ok')
    })
    
}

module.exports = userRoute