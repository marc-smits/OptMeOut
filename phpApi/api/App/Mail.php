<?php

namespace App;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Mail
{

  /**
   * send
   */
  public static function send(array $data, array $file): void
  {
    $mail = new PHPMailer(true);

    try {
      //Server settings
      //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
      $mail->isSMTP();                                            //Send using SMTP
      $mail->Host       =  getenv('MAIL_HOST');                    //Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
      $mail->SMTPSecure = 'TLS';
      $mail->Username   = getenv('MAIL_USER');                    //SMTP username
      $mail->Password   = getenv('MAIL_PWD');                     //SMTP password
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
      $mail->Port       = 587;                                  //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

      //Recipients
      $mail->setFrom(getenv('MAIL_FROM_EMAIL'), getenv('MAIL_FROM_NAME'));
      $mail->addAddress($data['sender_email'], $data['sender_first_name'] . ' ' . $data['sender_last_name']);
      $mail->addReplyTo(getenv('MAIL_REPLY_EMAIL'), getenv('MAIL_REPLY_NAME'));


      //Attachments
      //$mail->addAttachment(self::attachment($file));         //Add attachments

      //Content
      $mail->isHTML(true);
      $mail->Subject = $data['mail_subject'];
      $mail->Body    = $data['mail_body'];
      $mail->AltBody = strip_tags($data['mail_body']);

      $mail->send();
    } catch (Exception $e) {
      throw new Exception($mail->ErrorInfo);
      return;
    }
  }

  /**
   * attachment
   */
  private static function attachment($file): string
  {
    list(
      'path' => $path,
      'file' => $fileName
    ) = $file;
    return $path . $fileName;
  }
}
