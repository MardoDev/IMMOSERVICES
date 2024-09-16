<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PageAboutUsController extends AbstractController
{
    #[Route('/page/about/us', name: 'app_page_about_us')]
    public function index(): Response
    {
        return $this->render('page_about_us/index.html.twig');
    }
}
