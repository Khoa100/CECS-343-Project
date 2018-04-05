<html>
<head>
</head>
<body>
	<?php $fname = $_POST['firstname'];
$lname = $_POST['lastname'];
$email = $_POST['email'];
$number = $_POST['phoneNumber']; ?>

<?php //mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "To "$fname + " " + $lName + ":"; <br>
echo "Below is the info you submitted:"; <br>
echo "Email: " + $email; <br>
echo "Phone Number: " + $number;
?>
</body>
</html>
