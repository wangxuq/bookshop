/*
 * GET home page.
 */

module.exports = function(app){

//backend views
    //go to login-backend
    app.get("/",function(req,res){
        res.render('login-backend',{
            title:'login-backend',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        })        
    })
    //post the backend login
    app.post("/",function(req,res){
        req.body.username = req.body["username"];
        req.body.password = req.body["password"];
      /*  if(req.body.username != "wangxu" || 
            req.body.username == null ||
            req.body.password != "sa" ||
            req.body.password == null ){
            //alert("the username is incorrect or null,input again");
            return res.redirect('/');
        }   */
        req.flash('success','login successfully');
        res.redirect('index-backend');
    })
    //get the index-backend page
    app.get("/index-backend",function(req,res){
        res.render('index-backend',{
            title : 'index-backend',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        })
    })
    //get the addBook page
    app.get('/addBook',function(req,res){
        res.render('addBook',{
            title : 'addBook',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        })
    })
    app.post('/addBook',function(req,res){
        
    })
    //logout the index-backend page
    app.get('/logout',function(req,res){
        res.redirect('/');
    })
}

