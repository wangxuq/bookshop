var db = require('./db');

function User(user){
    this.username = user.username;
    this.passwork = user.password;
}

module.exports=User;

//store the user information
User.prototype.save=funciton(){
    
}
