<?php

namespace App;

use Fpdf\Fpdf;
use App\Translations;


class Invoice
{

    static private Fpdf $pdf;
    static private array $data;

    static string $path;
    static string $fileName;

    /**
     *  Make
     */
    public static function make($data): array
    {
        self::$data = $data;

        self::$pdf = new Fpdf('P', 'mm', 'A4');
        self::$pdf->AddPage();
        self::setNormalFont();
        self::$pdf->SetFillColor(255, 255, 255);

        self::receiverAddress();
        self::senderAddress();
        self::invoiceAddress();
        self::header();

        self::content();


        self::signature();

        self::$fileName = self::pdfName();
        //self::$fileName = 'test.pdf';

        self::$path = __DIR__ . '/../pdf/';

        self::$pdf->Output(self::$path . self::$fileName, 'F');
        return [
            'path' => self::$path,
            'file' => self::$fileName,
        ];
    }

    public static function delete(): void
    {
        return;
        $file = self::$path . self::$fileName;
        if (is_file($file)) {
            unlink(self::$path . self::$fileName);
        }
    }

    /**
     * sender address
     */
    private static function senderAddress(): void
    {
        self::$pdf->SetXY(150, 60);
        $row1 = 'Privacy First ';
        $row2 = 'Postbus 16799';
        $row3 = '1001 RG Amsterdam';
        $row4 = 'The Netherlands';
        $content = "$row1\n$row2\n$row3\n$row4";
        self::multiCell(85.5, 4, $content, 0, 0, 'L', 1);
    }

    /**
     * receiverAddress
     */
    private static function receiverAddress(): void
    {
        self::$pdf->SetXY(22, 165);
        $row1 = self::iconv(self::$data['recipientOrganization']);
        $row2 = self::iconv(self::$data['recipientFirstName'] . ' ' . self::$data['recipientLastName']);
        $row3 = self::iconv(self::$data['recipientAddress1']); // ' ' . self::$data['receiver_number']);
        $row4 = self::iconv(self::$data['recipientAddress2'] . ' ' . self::$data['recipientCity']);
        $content = "$row1\n$row2\n$row3\n$row4";
        self::multiCell(85.5, 4, $content, 0, 0, 'L', 1);
    }

    /**
     * invoiceAddress
     */
    private static function invoiceAddress(): void
    {
        self::$pdf->SetXY(20, 59.5);

        $row2 = self::iconv(self::$data['senderFirstName'] . ' ' . self::$data['senderLastName']);
        $row3 = self::iconv(self::$data['senderAddress1']); // ' ' . self::$data['receiver_number']);
        $row4 = self::iconv(self::$data['senderAddress2'] . ' ' . self::$data['senderCity']);
        $content = "$row2\n$row3\n$row4";
        $row1 = self::iconv(
            self::$data['senderFirstName'] . ' ' .
                self::$data['senderLastName']
        );

        self::multiCell(85.5, 4, $content, 0, 0, 'L', 1);
    }

    /**
     * header
     */
    private static function header(): void
    {
        $date = Translations::translate('opt-me-out-letter.date');
        self::$pdf->SetXY(22, 100);
        self::setBoldFont();
        self::multiCell(85.5, 4, $date . ':', 0, 0, 'L', 1);

        self::$pdf->SetXY(32, 100);
        self::setNormalFont();
        $today = date("j F Y ");
        self::multiCell(185.5, 4, $today, 0, 0, 'L', 1);

        $subject = Translations::translate('opt-me-out-invoice.invoice') . ':';

        self::$pdf->SetXY(22, 105);
        self::setBoldFont();
        self::multiCell(85.5, 4, $subject, 0, 0, 'L', 1);

        $optOutSubject =  self::$data['invoiceNro'];
        self::$pdf->SetXY(50, 105);
        self::setNormalFont();
        $subject = self::iconv($optOutSubject);
        self::multiCell(185.5, 4, $subject, 0, 0, 'L', 1);
    }

    /**
     * content
     */
    private static function content(): void
    {
        self::$pdf->SetXY(22, 120);
        self::setNormalFont();
        $content = self::getAmount(self::$data) . ' eur';
        self::multiCell(170, 4, $content, 0, 0, 'L', 1);
    }

    /**
     * getAmount
     */
    private static function getAmount(array $data): string
    {
        return  number_format((float)$data['paymentChoice'], 2, '.', '');
    }

    /**
     * signature
     */
    private static function signature(): void
    {
        self::$pdf->SetXY(22,  270);
        self::setNormalFont();
        $signature = 'Privacy First, Chamber of Commerce number: 34298157 email: info@privacyfirst.nl tel: +31 20 810 0279';
        self::multiCell(170, 4, $signature, 0, 0, 'L', 1);
    }

    /**
     * iconv
     */
    private static function iconv(string $text): string
    {
        return iconv('UTF-8', 'windows-1252', $text);
    }

    /**
     * multiCell
     */
    private static function multiCell(
        string $w,
        string $h,
        string $txt,
        float $border = 0,
        string $align = 'J',
        bool $fill = false
    ): void {
        self::$pdf->MultiCell($w, $h, $txt, $border, $align, $fill);
    }

    /**
     * setBoldFont
     */
    private static function setBoldFont(): void
    {
        self::$pdf->SetFont('Arial', 'B', 10);
    }

    /**
     * setNormalFont
     */
    private static function setNormalFont(): void
    {
        self::$pdf->SetFont('Arial', '', 10);
    }

    /**
     * pdfName
     */
    private static function pdfName(): string
    {
        $name = self::$data['invoiceNro'];
        return $name . '-' . date("d-m-Y-h-i-s") .  '.pdf';
    }
}
