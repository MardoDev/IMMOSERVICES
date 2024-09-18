<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CarrierePageController extends AbstractController
{
    #[Route('/carriere', name: 'app_carriere_page')]
    public function index(): Response
    {
        return $this->render('carriere_page/index.html.twig');
    }
    #[Route('/carriere/{slug}-{id}', name: 'app_carriere_page.affichage',requirements: ['id'=>'\d+','slug'=>'[a-zA-Z0-9]+'])]
    public function affichage(Request $request,$slug,$id): Response
    {
        return $this->render('carriere_page/carriere_page_details.html.twig',[
            'id'=>$id
        ]);
    }
}
