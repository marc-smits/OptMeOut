<?

/**
 * pingen API
 */
require_once('api.php');

use App\MailingList;
use App\Response;

if (isset($_GET['email'])) {
  try {
    MailingList::send($_GET['email']);
  } catch (Exception $e) {
    Response::send(
      ['error' => $e->getMessage()],
      Response::HTTP_BAD_REQUEST
    );
  }

  Response::send(['message' => 'email '. $_GET['email'] . ' added']);
}
// Render the test form only  on staging
if (getenv('PINGEN_ENVIRONMENT') != 'staging') {
  die;
}
?>

<form method="get">

  email <input name='email' value='test<?php echo uniqid()?>@test.nl' /><br>
  <input type="submit" value="send" /><br>
</form>