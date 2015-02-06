<?php
require_once ("./jssdk.php");

$jssdk = new JSSDK("wx633fd5d838f8e92d", "b9abde15dcc29b6d7f965fb6caa68708");

if (isset($_POST['url']))
{
    $sign = $jssdk->GetSignPackage($_POST['url']);
}

echo json_encode(isset($sign) ? $sign : array());