<?php

use App\PaymentTokens;

require_once(('api/App/PaymentTokens.php'));
/**
 * 
 * This file is only used by the Docker command: php pingen.php
 * It send a test POST request to the pingen.php of the real API
 */
if (php_sapi_name() == 'cli') {
        $_POST = array_merge(
                $_POST,
                [
                        'recipientOrganization' => 'Test Organization',
                        'recipientFirstName' => 'Roel',
                        'recipientLastName' => 'van Leeuwen',
                        'recipientAddress1' => 'Ariënshof ',
                        'receiver_number' => '23 A 2',
                        'recipientAddress2' => '1234AB',
                        'recipientCity' => 'Almelo',
                        'senderFirstName' => 'Lotte',
                        'senderLastName' => 'De Jongë',
                        'senderAddress1' => 'Oranjelaan 1 ',
                        'senderAddress2' => '4578CE',
                        'senderCity' => 'Almelo',
                        'senderCountry' => 'Nederland',
                        'birthdate' => '12/04/1995',
                        'senderId' => '2233',
                        'senderEmail' => 'test@test.nl',
                        'senderPhone' => '0612345678',
                        'locale' => 'en-GB',
                        'paymentToken' => PaymentTokens::create(),
                        'orderNro' =>  uniqid(),
                        'paymentChoice' => '12'
                ]
        );
}



require_once('./api/pingen.php');
