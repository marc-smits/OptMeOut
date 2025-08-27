<?php

namespace App;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Search
{

  /**
   * send
   */
  public static function search(string $term, string $locale): void
  {
     $addresesDir = __DIR__ . '/../addresses';
     $addresesFile = $addresesDir. '/' . $locale . '.json';
     ob_start();
     include($addresesFile);
     $json = ob_get_clean();
     $jsonArr = json_decode($json, true);
     $items = [];
     $searchFields = ['organization', 'name', 'name'];
     foreach($jsonArr as $item) {
        $search = strtolower($item['organization'] . ' ' .  $item['name'] . ' ' . $item['surname'] );
        if (str_contains($search, strtolower($term))) {
          $items[] = $item;
        }
   
     }
      header("Content-type: application/json; charset=utf-8");
     die (json_encode($items));
  }
}
