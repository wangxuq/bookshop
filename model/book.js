var mongodb = require('./db');

function Book(book){
    this.bookId = book.bookId;
    this.bookName = book.bookName;
    this.bookAuthor = book.bookAuthor;
    this.bookDetail = book.bookDetail;
    this.bookPublisher = book.bookPublisher;
    this.bookPublishDate = book.bookPublishDate;
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
        hour : date.getFullYear()+'-'+(date.getMonth()+1)+'-'date.getDate()+'-'+date.getHours(),
        minute : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+'-'+date.getMinutes()
    }
    var book = {
        bookId : this.bookId,
        bookName : this.bookName,
        bookAuthor : this.bookAuthor,
        bookDetail : this.bookDetail,
        bookPublisher : this.bookPublisher,
        bookPublishDate : this.bookPublishDate,
        bookAddDate : time
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
