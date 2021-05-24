<?php

namespace App\Repository;

use App\Entity\Images;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Images|null find($id, $lockMode = null, $lockVersion = null)
 * @method Images|null findOneBy(array $criteria, array $orderBy = null)
 * @method Images[]    findAll()
 * @method Images[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImagesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Images::class);
    }

    
    public function findImagesById($entityManager, $id = ""): Array
    {
        $query = $entityManager->createQuery(
            'SELECT img
            FROM App\Entity\Images img
            WHERE img.id = :id'
        )->setParameter('id', $id);

        return $query->getResult();
    }

    public function findImagesByBookId($entityManager, $id = ""): Array
    {
        $query = $entityManager->createQuery(
            'SELECT img
            FROM App\Entity\Images img
            WHERE img.bookId = :id'
        )->setParameter('id', $id);

        return $query->getResult();
    }

    public function removeImagesByBookId($entityManager, $id = ""): Int
    {
        $query = $entityManager->createQuery(
            'DELETE FROM App\Entity\Images img
            WHERE img.bookId = :id'
        )->setParameter('id', $id);

        return $query->getResult();
    }

    public function removeImageById($entityManager, $id = ""): Int
    {
        $query = $entityManager->createQuery(
            'DELETE FROM App\Entity\Images img
            WHERE img.id = :id'
        )->setParameter('id', $id);

        return $query->getResult();
    }
    
}
