<?php

namespace App;

use Fpdf\Fpdf;

class Pdf
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
        self::addressLabel();
        self::fromLabel();
        self::header();
        self::content();
        self::signature();

        self::$fileName = self::pdfName();


        self::$path = __DIR__ . '/../pdf/';

        self::$pdf->Output(self::$path . self::$fileName, 'F');
        return [
            'path' => self::$path,
            'file' => self::$fileName,
        ];
    }

    public static function delete(): void
    {
        $file = self::$path . self::$fileName;
        if (is_file($file)) {
                unlink(self::$path . self::$fileName);
        }
        
    }

    /**
     * addressLabel
     */
    private static function addressLabel(): void
    {
        self::$pdf->SetXY(22, 65);
        $row1 = self::iconv(self::$data['receiver_org']);
        $row2 = self::iconv(self::$data['receiver_first_name'] . ' ' . self::$data['receiver_surname']);
        $row3 = self::iconv(self::$data['receiver_street'] . ' ' . self::$data['receiver_number']);
        $row4 = self::iconv(self::$data['receiver_postal_code'] . ' ' . self::$data['receiver_city']);
        $content = "$row1\n$row2\n$row3\n$row4";
        self::multiCell(85.5, 4, $content, 0, 0, 'L', 1);
    }

    /**
     * fromLabel
     */
    private static function fromLabel(): void
    {
        self::$pdf->SetXY(130, 55);
        self::setBoldFont();
        self::multiCell(85.5, 4, 'From', 0, 0, 'L', 1);

        self::$pdf->SetXY(130, 59.5);
        self::setNormalFont();

        $row1 = self::iconv(self::$data['sender_first_name'] . ' ' . self::$data['sender_last_name']);
        $row2 = self::iconv('Date of Birth: ' . self::$data['birthdate']);
        $row3 = self::iconv('Identificatin (ends with): ' . self::$data['id']);
        $row4 = self::iconv('e-mail: ' . self::$data['sender_email']);
        $row5 = self::iconv('Phone: ' . self::$data['sender_phone']);
        $content = "$row1\n\n$row2\n$row3\n$row4\n$row5";
        self::multiCell(85.5, 4, $content, 0, 0, 'L', 1);
    }

    /**
     * header
     */
    private static function header(): void
    {
        self::$pdf->SetXY(22, 100);
        self::setBoldFont();
        self::multiCell(85.5, 4, 'Date:', 0, 0, 'L', 1);

        self::$pdf->SetXY(32, 100);
        self::setNormalFont();
        $today = date("j F Y ");
        self::multiCell(185.5, 4, $today, 0, 0, 'L', 1);

        self::$pdf->SetXY(22, 105);
        self::setBoldFont();
        self::multiCell(85.5, 4, 'Subject:', 0, 0, 'L', 1);

        self::$pdf->SetXY(38, 105);
        self::setNormalFont();
        $subject = self::iconv('opt-out fort he European Health Data Space (EHDS)');
        self::multiCell(185.5, 4, $subject, 0, 0, 'L', 1);
    }

    /**
     * content
     */
    private static function content(): void
    {
        self::$pdf->SetXY(22, 120);
        self::setNormalFont();
        $content = self::iconv(self::$data['content']);
        self::multiCell(170, 4, $content, 0, 0, 'L', 1);
    }

    /**
     * signature
     */
    private static function signature(): void
    {
        self::$pdf->SetXY(22,  self::$pdf->GetY() + 10);
        self::setNormalFont();
        $signature = self::iconv(
            self::$data['sender_first_name'] . ' ' . self::$data['sender_last_name']
        );
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
        $fullName =  self::$data['sender_first_name'] . '_' .  self::$data['sender_last_name'];
        $fullName = str_replace(' ', '_', $fullName);
        return iconv('UTF-8', 'ASCII//TRANSLIT', $fullName) . '-' . date("d-m-Y-h-i-s") .  '.pdf';
    }
}
