<?php

namespace App;

use Exception;
class Pingen
{

    private static array $file;
    private static array $post;

    public static function send(array $file, array $post): void
    {

        self::$file = $file;
        self::$post = $post;

        $organisationUUID = getenv('ORGANIZATION_UUID');
        $secret = getenv('ORGANIZATION_SECRET');

        $accessToken =  self::getAccessToken($organisationUUID, $secret);

        /**
         * Create letter
         * 
         * https://api.pingen.com/documentation#tag/letters.general/operation/letters.create
         * 
         */


        // Step 1: GET request to retrieve upload URL and signature
        list(
            'uploadUrl' => $uploadUrl,
            'uploadUrlSignature' => $uploadUrlSignature
        ) = self::retrieveUploadUrlAndSignature($accessToken);

        // Step 2: PUT request to upload the file

        list(
            'path' => $filePath,
            'file' => $fileOriginalName
        ) = $file;

        $filePath .= $fileOriginalName;

        self::InitializePutRequestToUploadFile($uploadUrl, $filePath);

        $letterUUID  = self::putRequestToUploadFile(
            $fileOriginalName,
            $uploadUrl,
            $uploadUrlSignature,
            $accessToken,
        );

        self::sendLetter(
            $letterUUID,
            $accessToken
        );

    }


    private static function hasErrors(array $responseData): void
    {
         if (isset($responseData['errors']) || isset($responseData['error'])) {
            $responseData['FORM'] = self::$post;
            throw new Exception(json_encode($responseData));
        }
    }


    /**
     *  Get access toke (login)
     * 
     * https://api.pingen.com/documentation#section/Authentication/Use-Client-credentials-grant
     */
    private static function getAccessToken(string $organisationUUID, string $secret): string
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => self::prepareUrl('https://identity.pingen.com/auth/access-tokens'),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => 'grant_type=client_credentials&client_id=' . $organisationUUID . '&client_secret=' . $secret,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/x-www-form-urlencoded',
                'Cookie: fb7eb3c0fd7448a4f8905cb9504f3ebb=2643db5f1030e74574993fdfe66b5353'
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        if (curl_errno($curl)) {
            self::hasErrors(['error' => curl_error($curl)]);
        }
        $responseData = json_decode($response, true);
        self::hasErrors($responseData);

        return  $responseData["access_token"];
    }


    /**
     * Retrieve upload url and signature
     */
    private static function retrieveUploadUrlAndSignature(string $accessToken): array
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, self::prepareUrl("https://api.pingen.com/file-upload"));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer $accessToken"
        ]);

        $response = curl_exec($ch);
        if (curl_errno($ch)) {
            self::hasErrors(['error' => curl_error($ch)]);
        }
        curl_close($ch);

        $responseData = json_decode($response, true);
        self::hasErrors($responseData);

        return [
            'uploadUrl' => $responseData['data']['attributes']['url'],
            'uploadUrlSignature' => $responseData['data']['attributes']['url_signature'],
        ];
    }

    /**
     * Initialize PUT request to upload file
     */
    private static function InitializePutRequestToUploadFile(string $uploadUrl, string $filePath)
    {

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $uploadUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_PUT, true);
        curl_setopt($ch, CURLOPT_INFILE, fopen($filePath, 'r'));
        curl_setopt($ch, CURLOPT_INFILESIZE, filesize($filePath));

        $response = curl_exec($ch);
        if (curl_errno($ch)) {
            self::hasErrors(['error' => curl_error($ch)]);
        }
        curl_close($ch);
        if ($response) {
            $responseData = json_decode($response, true);
            self::hasErrors($responseData);
        }
       
    }


    /**
     *  PUT request to upload file
     */
    private static function putRequestToUploadFile(
        string $fileOriginalName,
        string $uploadUrl,
        string $uploadUrlSignature,
        string $accessToken,
    ): string {

        $data = [
            'data' => [
                'type' => 'letters',
                'attributes' => [
                    'file_original_name' =>  $fileOriginalName,
                    'file_url' => $uploadUrl,
                    'file_url_signature' => $uploadUrlSignature,
                    'address_position' => 'left',
                    'auto_send' => false,
                ]
            ]
        ];

        $ch = curl_init();
        $url = "https://api.pingen.com/organisations/ORGANIZATION_ID/letters";
        $url = str_replace('ORGANIZATION_ID', getenv('ORGANIZATION_ID'), $url);

        curl_setopt($ch, CURLOPT_URL, self::prepareUrl($url));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        $headers = [
            'Content-Type: application/vnd.api+json',
            "Authorization: Bearer $accessToken"
        ];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            self::hasErrors(['error' => curl_error($ch)]);
        }

        curl_close($ch);
        $responseData = json_decode($response, true);
        self::hasErrors($responseData);
        return $responseData['data']['id'];
    }



    /**
     * Get Letter
     */
    private static function getLetter(
        string $letterUUID,
        string $accessToken
    ): array {

        $ch = curl_init();
        $organisationID = getenv('ORGANIZATION_ID');
        $url = "https://api.pingen.com/organisations/$organisationID/letters/$letterUUID";;
        curl_setopt($ch, CURLOPT_URL, self::prepareUrl($url));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $headers = [
            "Authorization: Bearer $accessToken"
        ];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        if (curl_errno($ch)) {
            self::hasErrors(['error' => curl_error($ch)]);
        }

        curl_close($ch);
        $responseData = json_decode($response, true);
        self::hasErrors($responseData);
        return $responseData;
    }

    /**
     * Send letter
     * 
     * 
     */
    private static function sendLetter(
        string $letterUUID,
        string $accessToken
    ): void {

      $validating = true;
      while ($validating) {
         $status = self::getLetter($letterUUID, $accessToken);
          $validating = $status['data']["attributes"]["status"] == 'validating';
      }
      if (  $status['data']["attributes"]["status"] != 'valid') {
            self::hasErrors(['error' => $status]);
      }
      
      
        $mailSent = false;
        while (!$mailSent) {
            $responseData = self::sendLetterRequest($letterUUID, $accessToken);

            // we repeat the request until the there no more status  'Invalid letter status'
            // We need to wait until the letter is validated
            if (isset($responseData['errors'][0]["title"])) {
                if ($responseData['errors'][0]["title"] = 'Invalid letter status') {
                    $mailSent = false;
                } else {
                    self::hasErrors($responseData);
                    $mailSent = true;
                }
            } else {
                self::hasErrors($responseData);
                $mailSent = true;
            }
        }
    }

    /**
     * send Letter Request
     * 
     * https://api.pingen.com/documentation#tag/letters.general/operation/letters.send
     */
    private static function sendLetterRequest(
        string $letterUUID,
        string $accessToken
    ): array {
        $data = [
            "data" => [
                "id" => $letterUUID,
                "type" => "letters",
                "attributes" => [
                    "delivery_product" => "fast",
                    "print_mode" => "simplex",
                    "print_spectrum" => "color"
                ],
            ],
        ];

        $payload = json_encode($data);
        $organisationID = getenv('ORGANIZATION_ID');
        $ch = curl_init();
        $organisationID = 'e0a16dab-caad-4e9d-bcb0-8416d037bde9';
        curl_setopt($ch, CURLOPT_URL, "https://api-staging.pingen.com/organisations/$organisationID/letters/$letterUUID/send");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

        $headers = [
            "Content-Type: application/vnd.api+json",
            "Authorization: Bearer $accessToken"
        ];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        if (curl_errno($ch)) {
            self::hasErrors(['error' => curl_error($ch)]);
        }
        $responseData = json_decode($response, true);
        curl_close($ch);
        return $responseData;
    }


    /**
     *  Prepare url for staging
     * 
     */
    private static function prepareUrl($url): string
    {
        if (getenv('PINGEN_ENVIRONMENT') == 'staging') {
            $url = str_replace('.pingen', '-staging.pingen', $url);
        }
        return $url;
    }
}
