<?php

//$request = file_get_contents('php://input');
//parse_str($request, $data);

$models = array(
    array('id' => 1, 'title' => 'Test1', 'url' => 'test1'),
    array('id' => 2, 'title' => 'Test2', 'url' => 'test2'),
    array('id' => 3, 'title' => 'Test3', 'url' => 'test3'),
    array('id' => 4, 'title' => 'Test4', 'url' => 'test4'),
    array('id' => 5, 'title' => 'Test5', 'url' => 'test5'),
);
header('Content-Type: application/json');
echo json_encode($models);
exit();