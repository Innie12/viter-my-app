<?php

class Testimonials
{
    public $testimonials_aid;
    public $testimonials_is_active;
    public $testimonials_images;
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

    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from ";
            $sql .= "{$this->tblTestimonials} ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblTestimonials} ( ";
            $sql .= "testimonials_is_active, ";
            $sql .= "testimonials_images, ";
            $sql .= "testimonials_name, ";
            $sql .= "testimonials_position, ";
            $sql .= "testimonials_comment, ";
            $sql .= "testimonials_created, ";
            $sql .= "testimonials_updated ) values ( ";
            $sql .= ":testimonials_is_active, ";
            $sql .= ":testimonials_images, ";
            $sql .= ":testimonials_name, ";
            $sql .= ":testimonials_position, ";
            $sql .= ":testimonials_comment, ";
            $sql .= ":testimonials_created, ";
            $sql .= ":testimonials_updated ) ";
            $query = $this->connection->prepare($sql);

            $query->execute([
                "testimonials_is_active" => $this->testimonials_is_active,
                "testimonials_images" => $this->testimonials_images,
                "testimonials_name" => $this->testimonials_name,
                "testimonials_position" => $this->testimonials_position,
                "testimonials_comment" => $this->testimonials_comment,
                "testimonials_created" => $this->testimonials_created,
                "testimonials_updated" => $this->testimonials_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            returnError($ex);
            $query = false;
        }
        return $query;
    }
    public function update()
    {
        try {
            $sql = "update {$this->tblTestimonials} set ";
            $sql .= "testimonials_images = :testimonials_images, ";
            $sql .= "testimonials_name = :testimonials_name, ";
            $sql .= "testimonials_position = :testimonials_position, ";
            $sql .= "testimonials_comment = :testimonials_comment, ";
            $sql .= "testimonials_updated = :testimonials_updated ";
            $sql .= "where testimonials_aid = :testimonials_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "testimonials_images" => $this->testimonials_images,
                "testimonials_name" => $this->testimonials_name,
                "testimonials_position" => $this->testimonials_position,
                "testimonials_comment" => $this->testimonials_comment,
                "testimonials_updated" => $this->testimonials_updated,
                "testimonials_aid" => $this->testimonials_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblTestimonials} ";
            $sql .= "where testimonials_aid = :testimonials_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "testimonials_aid" => $this->testimonials_aid
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
