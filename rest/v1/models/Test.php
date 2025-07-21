<?php
class Test
{
    public $connection;

    public $tblTest;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblTest = 'my_app_test';
    }

    public function readAll()
    {

        try {
            // if no error in here then proceed
            // CONCATENATION === meaning combining series of text
            $sql = "select ";
            $sql .= "test_aid, ";
            $sql .= "test_is_active, ";
            $sql .= "test_name, ";
            $sql .= "test_created, ";
            $sql .= "test_updated ";
            $sql .= "from ";
            $sql .= "{$this->tblTest} ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            // if there is error go here and return query to false
            return $query = false;
        }
        return $query;
    }
}
