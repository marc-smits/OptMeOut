<?php

namespace App;

use Mollie\Api\Http\Data\Money;
use Mollie\Api\Http\Requests\CreatePaymentRequest;

class Mollie
{
    public static function Pay(array $data)
    {
        $amount = number_format((float)$data['paymentChoice'], 2, '.', '');
        $description = $data["senderFirstName"] . ' ' .
            $data["senderLastName"] .
            ',  Invoice nro: ' . $data['invoiceNro'];

        $apiKey = getenv('MOLLIE_API_KEY');
        $mollie = new \Mollie\Api\MollieApiClient();
        $mollie->setApiKey($apiKey);


        /** @var Mollie\Api\Resources\CreatePaymentRequest $payment */
        $createPaymentRequest = new CreatePaymentRequest(
            $description,
            new Money('EUR', $amount),
            getenv('MOLLIE_REDIRECT_URL'),
            getenv('MOLLIE_WEBHOOK_URL')
        );

        /** @var \Mollie\Api\Resources\Payment $payment */
        $payment = $mollie->send($createPaymentRequest);
        return $payment->getCheckoutUrl();
    }
}
