<?php
/**
 * 
 * This file is only used by the Docker command: php pingen.php
 * It send a test POST request to the pingen.php of the real API
 */
if (php_sapi_name() == 'cli') {
$_POST = array_merge($_POST,
[
        'receiver_org' => 'Test Organization',
        'receiver_first_name' => 'Roel',
        'receiver_surname' => 'van Leeuwen',
        'receiver_street' => 'Ariënshof ',
        'receiver_number' => '23 A 2',
        'receiver_postal_code' => '1234AB',
        'receiver_city' => 'Almelo',
        'sender_first_name' => 'Lotte',
        'sender_last_name' => 'De Jongë',
        'birthdate' => '12/04/1995',
        'id' => '2233',
        'sender_email' => 'tuulia@live.nl',
        'sender_phone' => '0612345678',
        'content' => '30 woorden ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum bibendum cursus. Praesent et volutpat felis. Ut varius posuere nisl, nec auctor quam molestie ultrices. Maecenas ac ligula est Lorem.

80 woorden Aliquam at nisi metus, id ullamcorper urna. Vivamus sit amet varius mi. Donec venenatis mollis tortor sit amet aliquet. Vestibulum sagittis congue tortor eget imperdiet. Praesent turpis enim, malesuada ut sodales et, hendrerit condimentum mauris. Morbi commodo justo turpis. Praesent at ipsum vel ligula fringilla volutpat. Praesent facilisis faucibus orci sed varius. Integer dapibus quam quis ligula fringilla a lobortis ipsum condimentum. Etiam nulla ante, porttitor eget aliquam sed, congue non ipsum. Aenean vitae magna velit, in ultricies tellus. Donec.

80 woorden Aliquam at nisi metus, id ullamcorper urna. Vivamus sit amet varius mi. Donec venenatis mollis tortor sit amet aliquet. Vestibulum sagittis congue tortor eget imperdiet. Praesent turpis enim, malesuada ut sodales et, hendrerit condimentum mauris. Morbi commodo justo turpis. Praesent at ipsum vel ligula fringilla volutpat. Praesent facilisis faucibus orci sed varius. Integer dapibus quam quis ligula fringilla a lobortis ipsum condimentum. Etiam nulla ante, porttitor eget aliquam sed, congue non ipsum. Aenean vitae magna velit, in ultricies tellus. Donec.

30 woorden ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum bibendum cursus. Praesent et volutpat felis. Ut varius posuere nisl, nec auctor quam molestie ultrices. Maecenas ac ligula est Lorem.',
    'mail_subject' => 'Thank you from Opt me out',
         'mail_body' => 'Thank <b>you from Opt<b> me out',
]
);
}



require_once('./api/pingen.php');
