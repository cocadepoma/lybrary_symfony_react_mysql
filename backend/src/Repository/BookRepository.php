<?php

namespace App\Repository;

use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Book|null find($id, $lockMode = null, $lockVersion = null)
 * @method Book|null findOneBy(array $criteria, array $orderBy = null)
 * @method Book[]    findAll()
 * @method Book[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Book::class);
    }


    public function findBookByIsbn ($entityManager, $isbn): Array {

        $query = $entityManager->createQuery(
            'SELECT book
            FROM App\Entity\Book book
            WHERE book.isbn = :isbn'
        )->setParameter('isbn', $isbn);

        return $query->getResult();

    }

    public function findBookBeforeDate ($entityManager, $date = "2013-01-01T00:00:00.000Z"): Array {

        $query = $entityManager->createQuery(
            'SELECT book
            FROM App\Entity\Book book
            WHERE book.published < :date'
        )->setParameter('date', $date);

        return $query->getResult();

    }

    public function findBookByCategory ($entityManager, $category = "Drama"): Array {

        $query = $entityManager->createQuery(
            'SELECT book
            FROM App\Entity\Book book
            WHERE book.category = :category'
        )->setParameter('category', $category);

        return $query->getResult();

    }

    public function removeBookByIsbn($entityManager, $isbn): Int {

        $query = $entityManager->createQuery(
            'DELETE FROM App\Entity\Book book
            WHERE book.isbn = :isbn'
        )->setParameter('isbn', $isbn);

        return $query->getResult();

    }
}
