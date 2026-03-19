<?php

namespace App;
/**
 * Source: https://github.com/laposta/laposta-api-php/blob/main/examples/member/create.php
 */
use Exception;
use LapostaApi\Exception\ApiException;
use LapostaApi\Exception\ClientException;
use LapostaApi\Laposta;

class MailingList
{



  public static function send(string $email): void
  {
    $apiKey = getenv('LAPPOSTA_API_KEY');
    $listId = getenv('LAPPOSTA_LIST_ID');

    if (!$listId) {
      echo "Error: LP_EX_LIST_ID environment variable is not set. "
        . "This is required to create a member in a specific list.\n";
      exit(1);
    }

    // Initialize Laposta
    $laposta = new Laposta($apiKey);

    // Create member
    $memberApi = $laposta->memberApi();

    $clientIP = $_SERVER['HTTP_CLIENT_IP']
      ?? $_SERVER["HTTP_CF_CONNECTING_IP"] # when behind cloudflare
      ?? $_SERVER['HTTP_X_FORWARDED']
      ?? $_SERVER['HTTP_X_FORWARDED_FOR']
      ?? $_SERVER['HTTP_FORWARDED']
      ?? $_SERVER['HTTP_FORWARDED_FOR']
      ?? $_SERVER['REMOTE_ADDR']
      ?? '0.0.0.0';

    $memberData = [
      'email' => $email,
      'ip' => $clientIP,
    ];
    try {
      $result = $memberApi->create($listId, $memberData);
      //echo "Member created successfully in list_id '$listId':\n";

    } catch (ApiException $e) {
      throw new Exception(
        json_encode([
          "ApiException: " => $e->getMessage(),
          "Response body: " => $e->getResponseBody()
        ])
      );
    } catch (ClientException $e) {

      throw new Exception(
        json_encode([
          "ClientException: " => $e->getMessage(),
          "Response body: " => $e->getResponseBody()
        ])
      );
    } catch (\Throwable $e) {
       throw new Exception(
        json_encode([
          "Response body: " => $e->getMessage()
        ])
       );
    }
  }
}
