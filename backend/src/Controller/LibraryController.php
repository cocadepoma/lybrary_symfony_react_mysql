<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Book;
use App\Entity\Images;
use App\Repository\BookRepository;
use CustomHelpers;
use DateTime;
use Error;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class LibraryController extends AbstractController
{


    /**
     * @Route("/api/library", name="library")
     */
    public function getBooks(BookRepository $bookRepository)
    {   
        
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        try {
            $helper = new CustomHelpers();

            $books = $bookRepository->findAll();

            $booksFound = $helper->transformBooksToArray($books);

            $response->setData([
                'ok' => true,
                'books' => $booksFound
            ]);
                
            return $response;

        } catch (\Exception $e) {

            $response->setData([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
            return $response;
        }
    }

    /**
    * @Route("/api/library/2013", name="book_before_2013")
    */
    public function getBookBefore2013() 
    {

        $helper = new CustomHelpers();
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        try {
            $entityManager = $this->getDoctrine()->getManager();

            $result = $this->getDoctrine()
                           ->getRepository(Book::class)
                           ->findBookBeforeDate($entityManager, '2013-01-01T00:00:00.000Z');

            $booksFound = $helper->transformBooksToArray($result);


            $response->setData([
                'ok' => true,
                'data' => $booksFound
            ]);

            return $response;

        } catch (\Exception $e) {

            $response->setData([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
            return $response;
        }
    }

    /**
    * @Route("/api/library/drama", name="book_category_drama")
    */
    public function getBookByDrama() 
    {

        $helper = new CustomHelpers();
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        try {
            $entityManager = $this->getDoctrine()->getManager();

            $result = $this->getDoctrine()
                           ->getRepository(Book::class)
                           ->findBookByCategory($entityManager, 'Drama');

            $booksFound = $helper->transformBooksToArray($result);

            $response->setData([
                'ok' => true,
                'data' => $booksFound
            ]);

            return $response;

        } catch (\Exception $e) {

            $response->setData([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
            return $response;
        }
    }

    /**
    * @Route("/api/library/bookisbn", name="book_by_isbn")
    */
    public function getBookByIsbn(Request $request) 
    {

        $helper = new CustomHelpers();
        $isbn = $request->get('isbn');
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        if(empty($isbn)) {

            $response->setData([
                'ok' => false,
                'error' => "Isbn is mandatory"
            ]);

            return $response;
        }

        try {
            $entityManager = $this->getDoctrine()->getManager();

            $resultBooks = $this->getDoctrine()
                                ->getRepository(Book::class)
                                ->findBookByIsbn($entityManager, $isbn);

            if(count($resultBooks) == 0) {

                $response->setData([
                    'ok' => false,
                    'error' => "There are not books with the isbn provided"
                ]);
                return $response;
            }

            $booksFound = $helper->transformBooksToArray($resultBooks);

            $resultImages = $this->getDoctrine()
                                 ->getRepository(Images::class)
                                 ->findImagesByBookId($entityManager, $booksFound[0]['id']);
            
            $imagesFound = $helper->transformImagesToArray($resultImages); 

            $response->setData([
                'ok' => true,
                'data' => [
                    'book' => $booksFound,
                    'images' => $imagesFound
                ]

            ]);

            return $response;

        } catch (\Exception $e) {

            $response->setData([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
            return $response;
        }
    }


    /**
    * @Route("/api/library/remove", name="book_remove_by_isbn")
    */
    public function removeBook(Request $request) 
    {

        $helper = new CustomHelpers();
        $isbn = $request->get('isbn');
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        if(empty($isbn)) {

            $response->setData([
                'ok' => false,
                'error' => "Isbn is mandatory"
            ]);

            return $response;
        }

        try {
            $entityManager = $this->getDoctrine()->getManager();

            $bookRepository = $this->getDoctrine()->getRepository(Book::class)->findBookByIsbn($entityManager, $isbn);

            if(count($bookRepository) == 0) {

                $response->setData([
                    'ok' => false,
                    'error' => "The book with the isbn: $isbn, does not exists"
                ]);

                return $response;
            }
            $booksFound = $helper->transformBooksToArray($bookRepository);
            $id = $booksFound[0]['id'];

            $this->getDoctrine()->getRepository(Images::class)->removeImagesByBookId($entityManager, $id);
            $this->getDoctrine()->getRepository(Book::class)->removeBookByIsbn($entityManager, $isbn);

            $response->setData([
                'ok' => true,
                'data' => [
                    'book' => "book with isbn: $isbn removed"
                ]

            ]);

            return $response;

        } catch (\Exception $e) {

            $response->setData([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
            return $response;
        }
    }

    /**
     * @Route("/api/library/book", name="add_book")
     */
    public function addBook(Request $request) 
    {

        $body = $request->request->all();
        $helper = new CustomHelpers();
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $params = [
            "isbn",
            "title",
            "subtitle",
            "author",
            "published",
            "publisher",
            "pages",
            "description",
            "category",
            "website"
        ];

        // check if the user sended every param in the req
        $errors = $helper->checkIfParamsExists($body, $params);

        if(count($errors) > 0) {

            $response->setData([
                'ok' => false,
                'errors' => $errors
            ]);
            return $response;
        }

        $errors = $helper->checkIfParamsAreFilled($body);

        if(count($errors) > 0) {

            $response->setData([
                'ok' => false,
                'errors' => $errors
            ]);
            return $response;
        }

        try {
            $isbn = $request->request->get('isbn');
            $title = $request->request->get('title');
            $subtitle = $request->request->get('subtitle');
            $author = $request->request->get('author');
            $published = $request->request->get('published');
            $publisher = $request->request->get('publisher');
            $pages = $request->request->get('pages');
            $description = $request->request->get('description');
            $category = $request->request->get('category');
            $website = $request->request->get('website');

            $entityManager = $this->getDoctrine()->getManager();

            $result = $this->getDoctrine()
                           ->getRepository(Book::class)
                           ->findBookByIsbn(
                                $entityManager,
                                $request->request->get('isbn')
                            );

            if(count($result) > 0) {

                $response->setData([
                    'ok' => false,
                    'error' => "The $isbn already exists"
                ]);
                return $response;
            }

            $book = new Book();
            $book->setIsbn($isbn);
            $book->setTitle($title);
            $book->setSubtitle($subtitle);
            $book->setPublished(new \DateTime($published));
            $book->setPublisher($publisher);
            $book->setAuthor($author);
            $book->setPages($pages);
            $book->setDescription($description);
            $book->setWebsite($website);
            $book->setCategory($category);

            $entityManager->persist($book);
            $entityManager->flush();

            $response->setData([
                'ok' => true,
                'data' => $book
            ]);

            return $response;
            
        } catch (\Exception $e) {

            $response->setData([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
            return $response;
        }
        
    }

    /**
    * @Route("/api/library/addfromjson", name="library_add_from_json")
    */
    public function saveBooksFromJsonFile()
    {   
        $helper = new CustomHelpers();
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        // get books from json file
        $contents = $helper->getContentsFromJsonFile();
        
        try {
            $entityManager = $this->getDoctrine()->getManager();

            foreach ($contents as $content) {

                for($i = 0; $i < count($content); $i++) {

                    // find if there is a book with same ISBN
                    $result = $this->getDoctrine()
                                   ->getRepository(Book::class)
                                   ->findBookByIsbn(
                                        $entityManager,
                                        $content[$i]->{'isbn'}
                                     );

                    if(count($result) == 0){
                        $book = new Book();
                        $book->setIsbn($content[$i]->{'isbn'});
                        $book->setTitle($content[$i]->{'title'});
                        $book->setSubtitle($content[$i]->{'subtitle'});
                        $book->setAuthor($content[$i]->{'author'});
                        $book->setPublished( new DateTime($content[$i]->{'published'}) );
                        $book->setPublisher($content[$i]->{'publisher'});
                        $book->setPages($content[$i]->{'pages'});
                        $book->setDescription($content[$i]->{'description'});
                        $book->setWebsite($content[$i]->{'website'});
                        $book->setCategory($content[$i]->{'category'});
                        $entityManager->persist($book);
                        $entityManager->flush();
                    }
                }    
            }

            $response->setData([
                'ok' => true,
            ]);

            return $response;
        } catch (\Exception $e) {

            $response->setData([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
            return $response;
        }
    }

    /**
    * @Route("/api/library/getimage", name="get_image_by_book_id")
    */
    public function getImageByBookId(Request $request) {

        $helper = new CustomHelpers();
        $id = $request->get('id');
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        if(empty($id)) {

            $response->setData([
                'ok' => false,
                'error' => "Book ID is mandatory"
            ]);

            return $response;
        }

        try {
            $entityManager = $this->getDoctrine()->getManager();

            $resultImages = $this->getDoctrine()
                                 ->getRepository(Images::class)
                                 ->findImagesByBookId($entityManager, $id);

            if(count($resultImages) == 0) {

                $response->setData([
                    'ok' => false,
                    'error' => "There are not images with the id provided"
                ]);
                return $response;
            }

            $imagesFound = $helper->transformImagesToArray($resultImages); 

            $response->setData([
                'ok' => true,
                'data' => $imagesFound
            ]);

            return $response;

        } catch (\Exception $e) {

            $response->setData([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
            return $response;
        }
    }

    /**
    * @Route("/api/library/addimage", name="add_image_by_book_id")
    */
    public function addImageByBookId(Request $request) {

        $body = $request->request->all();

        $helper = new CustomHelpers();
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $params = [
            "book_isbn",
            "url",
        ];

        // check if the user sended every param in the req
        $errors = $helper->checkIfParamsExists($body, $params);

        if(count($errors) > 0) {

            $response->setData([
                'ok' => false,
                'errors' => $errors
            ]);
            return $response;
        }

        $errors = $helper->checkIfParamsAreFilled($body);

        if(count($errors) > 0) {

            $response->setData([
                'ok' => false,
                'errors' => $errors
            ]);
            return $response;
        }

        try {

            $entityManager = $this->getDoctrine()->getManager();
            $book_isbn = $request->request->get('book_isbn');
            $url = $request->request->get('url');

            $result = $this->getDoctrine()
                           ->getRepository(Book::class)
                           ->findBookByIsbn(
                                $entityManager,
                                $book_isbn
                            );

            if(count($result) == 0) {

                $response->setData([
                    'ok' => false,
                    'error' => "The are not books with the isbn: $book_isbn"
                ]);
                return $response;
            }

            $bookFound = $helper->transformBooksToArray($result);
            $bookId = $bookFound[0]['id'];

            $image = new Images();
            $image->setUrl($url);
            $image->setBookId($bookId);

            $entityManager->persist($image);
            $entityManager->flush();

            $response->setData([
                'ok' => true,
            ]);

            return $response;

        } catch (\Exception $e) {

            $response->setData([
                'ok' => false,
                'error' => $e->getMessage()
            ]);
            return $response;
        }
    }

}
