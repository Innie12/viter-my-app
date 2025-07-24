<?php

class Testimonials
{
    public $testimonials_aid;
    public $testimonials_is_active;
    public $testimonials_name;
    public $testimonials_position;
    public $testimonials_comment;
    public $testimonials_created;
    public $testimonials_updated;

    public  $connection;
    public $lastInsertedId;

    public $tblTestimonials;

    public function __construct($db)
    {
        $this->connection = $db; //connection of db
        $this->tblTestimonials = 'my_app_testimonials'; //table
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblTestimonials} ( ";
            $sql .= "testimonials_is_active, ";
            $sql .= "testimonials_name, ";
            $sql .= "testimonials_position, ";
            $sql .= "testimonials_comment, ";
            $sql .= "testimonials_created, ";
            $sql .= "testimonials_updated ) values ( ";
            $sql .= ":testimonials_is_active, ";
            $sql .= ":testimonials_name, ";
            $sql .= ":testimonials_position, ";
            $sql .= ":testimonials_comment, ";
            $sql .= ":testimonials_created, ";
            $sql .= ":testimonials_updated ) ";
            $query = $this->connection->prepare($sql);

            $query->execute([
                "testimonials_is_active" => $this->testimonials_is_active,
                "testimonials_name" => $this->testimonials_name,
                "testimonials_position" => $this->testimonials_position,
                "testimonials_comment" => $this->testimonials_comment,
                "testimonials_created" => $this->testimonials_created,
                "testimonials_updated" => $this->testimonials_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
