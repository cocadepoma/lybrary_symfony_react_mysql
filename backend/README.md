

## Run Symfony API LOCAL

1. Create the DB and import the file attached.
   
2. Change the access from DB in .env file.
   
   `mysql://USER:PASSWORD@IP:PORT/DB_NAME?serverVersion=5.7`

3. Run the DB locally.
   
4. Start the project.
   
   ~~~
    $ symfony server:start
   ~~~

## ENDPOINTS

- `/api/library` -> return all books.
  
- `/api/library/2013` -> return books before 2013.
  
- `/api/library/drama` -> return drama books.
  
- `/api/library/bookisbn` -> **params**: book_isbn. Return a book by its ISBN and its images.
  
- `/api/library/remove` -> **params**: book_isbn. Remove one book from DB.
  
- `/api/library/book` -> **params**: isbn, title, subtitle, author, published, publisher, pages, description, category, website. Add new book to DB.
  
- `/api/library/addfromjson` -> read the file books.json from helpers directory. If there is some book that does not exists in the DB, will be added.
  
- `/api/library/getimage` -> return the images of a book.
  
- `/api/library/addimage` -> **params**: book_isbn, url. Add a new image url to DB.
  
