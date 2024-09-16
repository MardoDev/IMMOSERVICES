<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BiensPageController extends AbstractController
{
    #[Route('/biens/page', name: 'app_biens_page')]
    public function index(Request $request): Response
    {
        return $this->render('biens_page/index.html.twig');
    }
    #[Route('/biens/page/{slug}-{id}',name: 'app_biens_page.show',requirements: ['slug'=>'[a-zA-Z0-9]+','id'=>'\d+'])]
    public function afficherBiensDetails(Request $request,$slug,$id):Response
    {
        return $this->render('biens_page/detailBien.html.twig',[
            'slug'=>$slug,
            'id'=>$id
        ]);
    }
}
