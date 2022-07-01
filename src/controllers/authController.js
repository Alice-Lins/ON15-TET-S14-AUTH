const userSchema = require('../models/userSchema');
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken")

const SECRET = process.env.SECRET;
const login = (request, response) => {
    try {
        // UserSchema.findOne(filtro é o email do usuario, função anônima)
        userSchema.findOne({ email: request.body.email }, (error, user) => {
            console.log("USUÁRIO", user)
            if(!user) {
                return response.status(401).send({
                    message: "User não encontrado",
                    email: `${request.body.email}`
                })
            }
            const validPassword = bcrypt.compareSync(request.body.password, user.password);
            console.log(validPassword)

	  if(!validPassword) {
   		 return response.status(401).send({
     		   message: "Login não autorizado"
   		 })
 	  }
     const token = jwt.sign({name: user.name}, SECRET)
     console.log("Token Criado", token);
     response.status(200).send({
        "message": "Login autorizado",
        token
     });
        })
    } catch(err) {
        console.error(err)
    }
}

module.exports = {
    login
};

