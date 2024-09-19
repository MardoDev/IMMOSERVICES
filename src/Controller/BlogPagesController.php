<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BlogPagesController extends AbstractController
{
    #[Route('/blog/pages', name: 'app_blog_pages')]
    public function index(): Response
    {
        return $this->render('blog_pages/index.html.twig', [
            'controller_name' => 'BlogPagesController',
        ]);
    }
}
