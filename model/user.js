var mongodb = require('./db');

function User(user){
    this.username = user.username;
    this.passwork = user.password;
}

module.exports=User;

//store the user information
User.prototype.save=funciton(callback){
    var user = {
        username : this.username;
        password : this.password;
    }

    //open the mongodb
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection("users",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insert('user',{safe : true},function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,user[0]);
            });
        });
    });
}
User.get = function(username,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection("users",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne("user",{username : username},function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,user);
            });
        });
    });
}
