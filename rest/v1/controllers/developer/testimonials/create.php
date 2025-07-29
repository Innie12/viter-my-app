<?php
// db variables
$conn = null;
// connection to db and store in conn variable
$conn = checkDatabaseConnection();

// use model
$testimonials = new Testimonials($conn);

// no id shall pass
if (array_key_exists('id', $_GET)) {
    checkEndpoint();
}

//check data
checkPayload($data);
$testimonials->testimonials_is_active = 1;
$testimonials->testimonials_images = $data ['testimonials_images'];
$testimonials->testimonials_name = checkIndex($data, 'testimonials_name');
$testimonials->testimonials_position = $data['testimonials_position'];
$testimonials->testimonials_comment = $data['testimonials_comment'];
$testimonials->testimonials_created = date("Y-m-d H:i:s");
$testimonials->testimonials_updated = date("Y-m-d H:i:s");

$query = checkCreate($testimonials);
returnSuccess($testimonials, 'testimonial create', $query);
