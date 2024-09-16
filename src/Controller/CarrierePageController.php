<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CarrierePageController extends AbstractController
{
    #[Route('/carriere/page', name: 'app_carriere_page')]
    public function index(): Response
    {
        return $this->render('carriere_page/index.html.twig', [
            'controller_name' => 'CarrierePageController',
        ]);
    }
}
