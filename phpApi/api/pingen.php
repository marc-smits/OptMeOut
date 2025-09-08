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

 Translations::initialize($_POST['translations']);


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
$translations = '{"opt-me-out-letter":{"letter-subject":"OptOut for the European Health DataSpace (EHDS)","saluation":"Dear","title":"Mr, Ms,","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel sem ex. Curabitur finibus augue purus, eget pharetra turpis convallis ac. Pellentesque efficitur elementum bibendum. Cras pretium risus eu rutrum dictum. Nam tristique sapien nulla, eu euismod enim vehicula in. Sed tempus dui finibus urna porttitor tempor. Proin nunc risus, aliquam in libero quis, accumsan feugiat arcu. Nam ut semper leo. Nulla facilisi. Maecenas commodo varius mauris, dignissim ullamcorper purus pellentesque quis. Etiam sit amet mi sit amet purus feugiat pretium.","senderBirthDate":"Date of Birth","senderId":"ID","senderPhone":"Phone","senderEmail":"Email","date":"Date","subject":"Subject","from":"From","confirmationMail":{"subject":"Your op-me-out letter has been sent","body":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel sem ex. Curabitur finibus augue purus, eget pharetra turpis convallis ac. Pellentesque efficitur elementum bibendum. Cras pretium risus eu rutrum dictum. Nam tristique sapien nulla, eu euismod enim vehicula in. Sed tempus dui finibus urna porttitor tempor. Proin nunc risus, aliquam in libero quis, accumsan feugiat arcu. Nam ut semper leo. Nulla facilisi. Maecenas commodo varius mauris, dignissim ullamcorper purus pellentesque quis. Etiam sit amet mi sit amet purus feugiat pretium."}}}';
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
  
  <input type="text" name="translations" value='<?php echo $translations ?>'>

  


  <input type="submit" value="send" /><br>
</form><?php echo $translations ?>