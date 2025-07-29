<?php
//declare db variable
$conn = null;
//use db
$conn = checkDatabaseConnection();
//use model
$testimonials = new Testimonials($conn);

if (array_key_exists('id', $_GET)) {
    checkPayload($data);

    $testimonials->testimonials_aid = $_GET['id'];
    $testimonials->testimonials_images = $data['testimonials_images'];
    $testimonials->testimonials_name = checkIndex($data, 'testimonials_name');
    $testimonials->testimonials_position = $data['testimonials_position'];
    $testimonials->testimonials_comment = $data['testimonials_comment'];
    $testimonials->testimonials_updated = date("Y-m-d H:i:s");


    $query = checkUpdate($testimonials);
    returnSuccess($testimonials, 'testimonial update', $query);
}

checkEndpoint();
