<?php
require_once ("./jssdk.php");

$jssdk = new JSSDK("wx633fd5d838f8e92d", "b9abde15dcc29b6d7f965fb6caa68708");

$sign = $jssdk->GetSignPackage();

echo json_encode($sign);