<?

/**
 * pingen API
 */
require_once('api.php');

use App\Pdf;
use App\Pingen;
use App\Mail;
use App\Response;




if (!empty($_POST)) {

  // Only requests from the same domain are allowed
 // if (php_sapi_name() != 'cli') {
   // $host = $_SERVER["HTTP_HOST"];
   // $requestHost = str_replace(['https://', 'http://'], '', $_SERVER["HTTP_ORIGIN"]);
   // if ($host != $requestHost) {
      // die('Access denied');
   // }
 // }


  try {
    $file = Pdf::make($_POST);
    Pingen::send($file, $_POST);
    Mail::send($_POST, $file);
  } catch (Exception $e) {
    Pdf::delete();
    Response::send(
      ['error' => $e->getMessage()],
      Response::HTTP_BAD_REQUEST
    );
  }

  Pdf::delete();

  $response = [
    'message' => 'Pdf sent in the file ' . $file['file'],
    'content' => $_POST
  ];

  Response::send($response);
}




// Render the test form only  on staging
if (getenv('PINGEN_ENVIRONMENT') != 'staging') {
  die;
}

?>

<form method="post">
  receiver_org <input name='receiver_org' value='Test Organization' /><br>
  receiver_first_name <input name='receiver_first_name' value='Roel' /><br>
  receiver_surname <input name='receiver_surname' value='van Leeuwen' /><br>
  receiver_street <input name='receiver_street' value='Ariënshof ' /><br>
  receiver_number <input name='receiver_number' value='23 A 2' /><br>
  receiver_postal_code <input name='receiver_postal_code' value='1234AB' /><br>
  receiver_city <input name='receiver_city' value='Almelo' /><br>
  sender_first_name <input name='sender_first_name' value='Lotte' /><br>
  sender_last_name <input name='sender_last_name' value='De Jongë' /><br>
  birthdate <input name='birthdate' value='12/04/1995' /><br>
  id <input name='id' value='2233' /><br>
  sender_email <input name='sender_email' value='lottedejong@test.nl' /><br>
  sender_phone <input name='sender_phone' value='0612345678' /><br>
  <input type='hidden' name='content' value='30 woorden ipsum dolor sit amet/><br> consectetur adipiscing elit. Morbi condimentum bibendum cursus. Praesent et volutpat felis. Ut varius posuere nisl/><br> nec auctor quam molestie ultrices. Maecenas ac ligula est Lorem.

80 woorden Aliquam at nisi metus/><br> id ullamcorper urna. Vivamus sit amet varius mi. Donec venenatis mollis tortor sit amet aliquet. Vestibulum sagittis congue tortor eget imperdiet. Praesent turpis enim/><br> malesuada ut sodales et/><br> hendrerit condimentum mauris. Morbi commodo justo turpis. Praesent at ipsum vel ligula fringilla volutpat. Praesent facilisis faucibus orci sed varius. Integer dapibus quam quis ligula fringilla a lobortis ipsum condimentum. Etiam nulla ante/><br> porttitor eget aliquam sed/><br> congue non ipsum. Aenean vitae magna velit/><br> in ultricies tellus. Donec.

80 woorden Aliquam at nisi metus/><br> id ullamcorper urna. Vivamus sit amet varius mi. Donec venenatis mollis tortor sit amet aliquet. Vestibulum sagittis congue tortor eget imperdiet. Praesent turpis enim/><br> malesuada ut sodales et/><br> hendrerit condimentum mauris. Morbi commodo justo turpis. Praesent at ipsum vel ligula fringilla volutpat. Praesent facilisis faucibus orci sed varius. Integer dapibus quam quis ligula fringilla a lobortis ipsum condimentum. Etiam nulla ante/><br> porttitor eget aliquam sed/><br> congue non ipsum. Aenean vitae magna velit/><br> in ultricies tellus. Donec.

30 woorden ipsum dolor sit amet/><br> consectetur adipiscing elit. Morbi condimentum bibendum cursus. Praesent et volutpat felis. Ut varius posuere nisl/><br> nec auctor quam molestie ultrices. Maecenas ac ligula est Lorem.'
    ] />
  <input type="hidden" name="mail_subject" value="test">
  <input type="hidden" name="mail_body" value="test">



  <input type="submit" value="send" /><br>
</form>