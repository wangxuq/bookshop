
/*
 * GET home page.
 */

module.exports = function(app){

    //backend views
    app.get("/",function(req, res){
        res.render('index-backend.ejs', { 
            title: 'index-backend'
            });
    });
}

