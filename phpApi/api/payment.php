<?
/**
 * payment API
 */

require_once('api.php');

use App\Mollie;
use App\Response;

if (!empty($_POST)) {


  try {
   $paymentLink =  Mollie::Pay($_POST);
  } catch (Exception $e) {
    Response::send(
      ['error' => $e->getMessage()],
      Response::HTTP_BAD_REQUEST
    );
  }

  $response = [
    'message' => 'Payment link generated ',
    'link' => $paymentLink
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