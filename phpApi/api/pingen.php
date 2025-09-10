<?

/**
 * pingen API
 */
require_once('api.php');

use App\Pdf;
use App\Pingen;
use App\Mail;
use App\Response;
use App\Translations;



if (!empty($_POST)) {

  // Only requests from the same domain are allowed
 // if (php_sapi_name() != 'cli') {
   // $host = $_SERVER["HTTP_HOST"];
   // $requestHost = str_replace(['https://', 'http://'], '', $_SERVER["HTTP_ORIGIN"]);
   // if ($host != $requestHost) {
      // die('Access denied');
   // }
 // }


  
 // convert form json to array items
  if (isset($_POST['form'])) {
    $_POST = array_merge(
      $_POST,
      json_decode($_POST['form'], true)
    );
  }

 Translations::initialize($_POST['locale']);

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
  recipientOrganization <input name='recipientOrganization' value='Test Organization' /><br>
  recipientFirstName <input name='recipientFirstName' value='Roel' /><br>
  recipientLastName <input name='recipientLastName' value='van Leeuwen' /><br>
  recipientAddress1 <input name='recipientAddress1' value='Ariënshof ' /><br>
  receiver_number <input name='receiver_number' value='23 A 2' /><br>
  recipientAddress2 <input name='recipientAddress2' value='1234AB' /><br>
  recipientCity <input name='recipientCity' value='Almelo' /><br>
  senderFirstName <input name='senderFirstName' value='Lotte' /><br>
  senderLastName <input name='senderLastName' value='De Jongë' /><br>
  birthdate <input name='birthdate' value='12/04/1995' /><br>
  id <input name='id' value='2233' /><br>
  senderEmail <input name='senderEmail' value='lottedejong@test.nl' /><br>
  senderPhone <input name='senderPhone' value='0612345678' /><br>  
  <input type="hidden" name="locale" value='en-GB'>




  <input type="submit" value="send" /><br>
</form>