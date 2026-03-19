<?php

namespace App;

use stdClass;

class Translations
{
    private static array $translations;

    public static function initialize(string $locale): void
    {
        $locale = str_replace('-', '_', $locale);
        $json = file_get_contents(__DIR__ . '/../languages/' . $locale . '.json');
        self::$translations =  json_decode($json, true);
    }

    public static function translate(string $key, string $baseKey = '', array $translations= [] ) {
         if (empty($translations)) {
            $translations = self::$translations;
        }
        if (isset($translations[$key])) {
            return $translations[$key];
        }

        $parts = explode('.', $key);
        if(isset($translations[current($parts)])) {
             $translations = $translations[current($parts)];
        } else {
            return $key;
        }
       
        list($baseKey, $key) = preg_split('/[.]/i', $key, 2);
        return self::translate($key, $baseKey, $translations);
    }
}
