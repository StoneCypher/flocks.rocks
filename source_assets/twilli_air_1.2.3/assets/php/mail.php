<?php

/* =====================================================
 * change $email_to and $email_form
 * ===================================================== */
$email_to = "your_email@yourdomain.com"; // the email address to which the form sends submissions
$email_from = "do-not-reply@yourdomain.com"; // the email address used as "From" when submissions are sent to the $email_to above (important that it has the same domain as the domain of your site - unless you have configured your server's mail settings)
$email_subject = "Contact Form submitted";

// check CAPTCHA code first
session_start();
if (!isset($_POST["captcha"]) || 
    $_SESSION["captcha_code"] != $_POST["captcha"])
{
    echo 'captcha';
    die();
}

if(isset($_POST['email']))
{

    function return_error($error)
    {
        echo $error;
        die();
    }

    // check for empty required fields
    if (!isset($_POST['name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['message']))
    {
        return_error('incomplete');
    }

    // form field values
    $name = $_POST['name']; // required
    $email = $_POST['email']; // required
    $contact_number = $_POST['contact_number']; // not required
    $message = $_POST['message']; // required

    // form validation
    $error_message = "";

    // name
    $name_exp = "/^[a-z0-9 .\-]+$/i";
    if (!preg_match($name_exp,$name))
    {
        $this_error = 'Please enter a valid name.';
        $error_message .= ($error_message == "") ? $this_error : "<br/>".$this_error;
    }        

    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    if (!preg_match($email_exp,$email))
    {
        $this_error = 'Please enter a valid email address.';
        $error_message .= ($error_message == "") ? $this_error : "<br/>".$this_error;
    } 

    // if there are validation errors
    if(strlen($error_message) > 0)
    {
        return_error($error_message);
    }

    // prepare email message
    $email_message = "Form details below.\n\n";

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email)."\n";
    $email_message .= "Contact number: ".clean_string($contact_number)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";

    // create email headers
    $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    if (mail($email_to, $email_subject, $email_message, $headers))
    {
        echo 'success';
    }
    else 
    {
        echo 'error';
        die();        
    }
}
else
{
    echo 'incomplete';
    die();
}
?>