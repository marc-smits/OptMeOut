<?php
/**
 * Test laposta.php by these get params
 */
$_GET['email'] = 'test'.uniqid().'@test.nl';

require_once('./api/laposta.php');
