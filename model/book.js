var mongodb = require('./db');

function Book(bookId,bookName,bookAuthor,bookPublisher,bookPublishDate,bookDetail){
    this.bookId = bookId;
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookDetail = bookDetail;
    this.bookPublisher = bookPublisher;
    this.bookPublishDate = bookPublishDate;
}
module.exports=Book;

//save the book information
Book.prototype.save=function(callback){
    var date = new Date();
    var time = {
        date : date,
        year : date.getFullYear(),
        month : date.getFullYear()+"-"+(date.getMonth()+1),
        day : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
        hour : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours(),
        minute : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+'-'+date.getMinutes()
    }
    var book = {
        bookId : this.bookId,
        bookName : this.bookName,
        bookAuthor : this.bookAuthor,
        bookDetail : this.bookDetail,
        bookPublisher : this.bookPublisher,
        bookPublishDate : this.bookPublishDate,
        bookAddDate : time.minute
    }
    //open the mongodb
    mongodb.open(err,db){
        if(err){
            return callback(err);
        }
        db.collection('books',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insert('book',{safe:true},function(err,book){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,book[0]);
            });
        });
    };
}
