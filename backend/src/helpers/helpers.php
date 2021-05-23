<?php


 // HELPER Read content from a JSON file

use Symfony\Component\Finder\Finder;

class CustomHelpers {

    public function getContentsFromJsonFile() {

        $finder = new Finder();
        $finder->files()->in('assets');
        $contents = [];
        
        foreach ($finder as $file) {
            $contents = $file->getContents();
        }
        
        return json_decode($contents);
    }

    // HELPER Books from db to Array
    public function transformBooksToArray($books) {

        $arrayBooks = [];

        foreach ($books as $book) {

            $arrayBooks[] = [
                'id' => $book ->  getId(),
                'isbn' => $book -> getIsbn(),
                'title' => $book -> getTitle(),
                'subtitle' => $book -> getSubtitle(),
                'author' => $book -> getAuthor(),
                'publisher' => $book -> getPublisher(),
                'published' => $book -> getPublished(),
                'description' => $book -> getDescription(),
                'website' => $book -> getWebsite(),
                'pages' => $book -> getPages(),
                'category' => $book -> getCategory()
            ];
        }

        return $arrayBooks;
    }

    // HELPER Images from db to Array
    public function transformImagesToArray($images) {

        $arrayBooks = [];

        foreach ($images as $image) {

            $arrayBooks[] = [
                'id' => $image -> getId(),
                'url' => $image -> getUrl(),
                'bookId' => $image -> getBookId(),
            ];
        }

        return $arrayBooks;
    }

    // HELPER Checks if the params are in the req
    public function checkIfParamsExists($body, $params){

        $keys = [];
        $errors = [];

        foreach ($body as $key => $value ) {
            $keys[]=$key;
        }

        foreach ($params as $param) {
            if(!in_array($param, $keys)) {
                $errors[] = "$param is mandatory";
            }
        }

        return $errors;
        
    }

    // HELPER Checks if the params are filled
    public function checkIfParamsAreFilled ($body) {
        $errors = [];

        foreach ($body as $key => $value) {
            if(empty($value)) {
                $errors[] = "$key is empty";
            }
        }

        return $errors;
    }
}

?>