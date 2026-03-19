<?php

/**
 * Manage Payment Tokens
 */

namespace App;



class PaymentTokens
{
    private static $fileName = 'paymentTokens.json';
    private static array $tokens = [];
    /**
     * Create a new token
     */
    public static function create(): string
    {
        $bytes = random_bytes(20);
        $token  = bin2hex($bytes);

        self::$tokens[$token] = time();

        self::setTokens();
        return $token;
    }


    public  static function isValidToken(string $token) : bool
    {
        self::getTokens();
        if (isset(self::$tokens[$token])) {
            unset(self::$tokens[$token]);
            return true;
        }
        return false;
    }
    /** 
     * Get all tokens
     */
    private static function getTokens(): void
    {
        if (is_file(self::$fileName)) {
            $json = file_get_contents(self::$fileName);
        } else {
            $json = '{}';
        }
        self::$tokens = json_decode($json, true);
    }

    /**
     * Set all tokens to file
     */
    private static function setTokens(): void
    {
        $json = json_encode(self::$tokens);
        $res = file_put_contents(self::$fileName, $json);
    }
}
