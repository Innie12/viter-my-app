<?php

class Header
{
    public $header_aid; //column
    public $header_is_active;
    public $header_name;
    public $header_link;
    public $header_created;
    public $header_updated;

    public $connection; //variable connection to db
    public $lastInsertedId; //when created is used to store last inserted aid

    public $tblHeader; //table

    public function __construct($db)
    {
        $this->connection = $db; //connection of db
        $this->tblHeader = 'my_app_header'; //table
    }

    //creating a data using this function
    public function create()
    {
        try {
            $sql = "insert into {$this->tblHeader} ( ";
            $sql .= "header_is_active, ";
            $sql .= "header_name, ";
            $sql .= "header_link, ";
            $sql .= "header_created, ";
            $sql .= "header_updated ) values ( ";
            $sql .= ":header_is_active, ";
            $sql .= ":header_name, ";
            $sql .= ":header_link, ";
            $sql .= ":header_created, ";
            $sql .= ":header_updated ) ";
            $query = $this->connection->prepare($sql);

            $query->execute([
                "header_is_active" => $this->header_is_active,
                "header_name" => $this->header_name,
                "header_link" => $this->header_link,
                "header_created" => $this->header_created,
                "header_updated" => $this->header_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();

        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
