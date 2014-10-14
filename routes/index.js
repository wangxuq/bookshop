/*
 * GET home page.
 */
module.exports = function(app){

    //backend views
    app.get("/",function(req,res){
        res.render('login-backend.ejs',{
            title:'login-backend',
        })        
    })
    app.post("/",function(req,res){
        req.body.username = req.body["username"];
        req.body.password = req.body["password"];
        if(req.body.username != "wangxu" ||req.body.username == null){
            //alert("the username is incorrect or null,input again");
            res.redirect('login-backend.ejs');
        }
        if(req.body.password != "sa" || req.body.password == null ){
            //alert("the password is incorrect or null,input again");
            res.redirect('login-backend.ejs');
        }
        res.redirect('index-backend.ejs');
    })
    app.get("index-backend",function(req,res){
        res.render('index-backend.ejs',{
            title : 'index-backend',
        })
    })
}

