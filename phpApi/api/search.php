<?

/**
 * search API
 */
require_once('api.php');
use App\Search;



if(isset($_GET['term'])) {
  try {
  Search::search(
    $_GET['term'],
    $_GET['locale']
  );
} catch(Error $e) {
  var_dump($e);
}

    
}


// Render the test form only  on staging
if (getenv('PINGEN_ENVIRONMENT') != 'staging') {
  die;
}

?>

<form method="get">
  search term <input name='term' value='huisa' /><br>
  locale <input name='locale' value='en_GB' /><br>
  <input type="submit" value="send" /><br>
</form>