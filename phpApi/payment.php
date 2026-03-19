<?php

/**
 * 
 * This file is only used by the Docker command: php pingen.php
 * It send a test POST request to the pingen.php of the real API
 */
if (php_sapi_name() == 'cli') {

        $data =  [
                                        'recipientOrganization' => 'Test Organization',
                                        'recipientFirstName' => 'Roel',
                                        'recipientLastName' => 'van Leeuwen',
                                        'recipientAddress1' => 'Ariënshof ',
                                        'receiver_number' => '23 A 2',
                                        'recipientAddress2' => '1234AB',
                                        'recipientCity' => 'Almelo',
                                        'recipientCountry' => 'The Netherlands',
                                        'senderFirstName' => 'Lotte',
                                        'senderLastName' => 'De Jongë',
                                        'birthdate' => '12/04/1995',
                                        'senderId' => '2233',
                                        'senderEmail' => 'tuulia@live.nl',
                                        'senderPhone' => '0612345678',
                                        'senderAddress1' => 'Oranjelaan 12',
                                        'senderAddress2' => '5678CD8',
                                        'senderCity' => 'Zwolle',
                                        'senderCountry' => 'The Netherlands',
                                        'locale' => 'en-GB',
                                        'paymentChoice' => '12',
                                        'orderNro' =>  uniqid(),
        ];
        $_POST = ["form" => json_encode($data)];
}

require_once('./api/payment.php');
