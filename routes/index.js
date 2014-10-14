/*
 * GET home page.
 */
module.exports = function(app){

//backend views
    //go to login-backend
    app.get("/",function(req,res){
        res.render('login-backend',{
            title:'login-backend',
        })        
    })
    //post the backend login
    app.post("/",function(req,res){
        req.body.username = req.body["username"];
        req.body.password = req.body["password"];
        if(req.body.username != "wangxu" || 
            req.body.username == null ||
            req.body.password != "sa" ||
            req.body.password == null ){
            //alert("the username is incorrect or null,input again");
            return res.redirect('/');
        }
        res.redirect('index-backend');
    })
    //get the index-backend page
    app.get("/index-backend",function(req,res){
        res.render('index-backend',{
            title : 'index-backend',
        })
    })
    //logout the index-backend page
    app.get('/logout',function(req,res){
        res.redirect('/');
    })
}

