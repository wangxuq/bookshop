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
        hour : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours(),
        minute : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes(),
		second : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }
    var book = {
        bookId : this.bookId,
        bookName : this.bookName,
        bookAuthor : this.bookAuthor,
        bookDetail : this.bookDetail,
        bookPublisher : this.bookPublisher,
        bookPublishDate : this.bookPublishDate,
        bookAddDate : time.second
    }
    //open the mongodb
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('books',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insert(book,{safe:true},function(err,book){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,book[0]);
            });
        });
    });
}
//get all books
Book.getAllBook = function(callback){
    //open the db
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('books',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find().sort({time : -1}).toArray(function(err,book){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                return callback(null,book);
            });
        });
    });
}
//get book by bookId or bookName
Book.getBookById = function(bookId,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('books',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({bookId : bookId},function(err,book){
				mongodb.close();
				if(err){
					return callback(err);
				}
				return callback(null,book);
			});
		});
	});
};
//remove books by id
Book.removeBookById = function(bookId,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('books',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var id = bookId;
			collection.remove({bookId : id},function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				return callback(null);
			});
		});
	});
};