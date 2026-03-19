<?php
/**
 * 
 * This is test script test pingen after the examples of https://api.pingen.com
 */

$organisationUUID = 'MSFC8BWBQRG1UY7YZF5P';
$secret = '6uYqszpFFkEgR4AkrTMobCn94HIp2TQSs7YAroestjj7U80DY91IwmAPMQpErAH2ZyzwQVPV68Dd/Ddy';

$fileOriginalName = 'pin.pdf';
// absolute path
$filePath = '/home/tuulia/gitRepos/opt_me_out/OptMeOut/phpApi/pdf/pin.pdf';

/////////////////////////////////////////////////////////////////////////////////////
//
// login
//
////////////////////////////////////////////////////////////////////////////////////
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://identity-staging.pingen.com/auth/access-tokens',
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



$responseData = json_decode($response, true);

$accessToken = $responseData["access_token"];

/////////////////////////////////////////////////////////////////////////////////////
//
// Create letter, 
// code from https://api.pingen.com/documentation#tag/letters.general/operation/letters.create
//
////////////////////////////////////////////////////////////////////////////////////

// Step 1: GET request to retrieve upload URL and signature
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api-staging.pingen.com/file-upload");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $accessToken"
]);

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
    exit;
}
curl_close($ch);

$responseData = json_decode($response, true);

if (!isset($responseData['data']['attributes']['url']) || !isset($responseData['data']['attributes']['url_signature'])) {
    echo 'Failed to retrieve URL and signature.';
    exit;
}

$uploadUrl = $responseData['data']['attributes']['url'];
$uploadUrlSignature = $responseData['data']['attributes']['url_signature'];


// Step 2: PUT request to upload the file


$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $uploadUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_PUT, true);
curl_setopt($ch, CURLOPT_INFILE, fopen($filePath, 'r'));
curl_setopt($ch, CURLOPT_INFILESIZE, filesize($filePath));

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
    exit;
}
curl_close($ch);


/**
 * "" = empty string
 */



$data = [
    'data' => [
        'type' => 'letters',
        'attributes' => [
            'file_original_name' => $fileOriginalName,
            'file_url' => $uploadUrl,
            'file_url_signature' => $uploadUrlSignature,
            'address_position' => 'left',
            'auto_send' => false,
        ]
    ]
];

$ch = curl_init();

//curl_setopt($ch, CURLOPT_URL, "https://api-staging.pingen.com/organisations/$organisationUUID/letters");
curl_setopt($ch, CURLOPT_URL, "https://api-staging.pingen.com/organisations/e0a16dab-caad-4e9d-bcb0-8416d037bde9/letters");
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
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);

$responseData = json_decode($response, true);

$letterUUID =$responseData['data']['id'];




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

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.pingen.com/organisations/$organisationUUID/letters/$letterUUID/send");
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
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);

echo $response;