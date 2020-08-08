<?php 
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$email = $_POST['email'];


// Формирование самого письма
$title = "Новое обращение Best Tour Plan";
$body = "
<h2>Новое обращение</h2>
<b>Имя:</b> $name<br>
<b>Телефон  :</b> $phone<br><br>
<b>Сообщение:</b><br>$message
";
$sendMail = "
<b>Почта клиента для рассылки новостей: $email</b>
";
$modal = "
<h2>Новое обращение</h2>
<b>Имя:</b> $name<br>
<b>Телефон  :</b> $phone<br><br>
<b>Почта клиента для рассылки новостей: $email</b><br>
<b>Сообщение:</b><br>$message
";


// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'gribevgenij779@gmail.com'; // Логин на почте
    $mail->Password   = 'XW6ucafLRepMaHZ'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('gribevgenij779@gmail.com', 'Евгений Гриб'); // Адрес самой почты и имя отправителя

    // Получатель письма
    // $mail->addAddress($costumerMail);  
    $mail->addAddress('evg.grib@mail.ru'); // Ещё один, если нужен

// Отправка сообщения
if ($email == null) {
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;
} elseif($email != null and $phone != null) {
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $modal;
} else() {
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $sendMail;
}
    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
header('Location: thankyou.html');
