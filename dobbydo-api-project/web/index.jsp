<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<script type="text/javascript" src="/dobbydo-cubemap-1.0.1/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="/dobbydo-cubemap-1.0.1/js/threejs/three.js"></script>
<script type="text/javascript" src="/dobbydo-cubemap-1.0.1/js/threejs/Detector.js"></script>
<link href="/dobbydo-cubemap-1.0.1/css/dbd-cubemap.css" rel="stylesheet" />
<script type="text/javascript" src="/dobbydo-cubemap-1.0.1/js/dbd-cubemap.js"></script>
<script type="text/javascript" src="/dobbydo-cubemap-1.0.1/js/dbd-floorplanmap.js"></script>
</head>
<body>
<div id="test_holder">
</div>

<script type="text/javascript">
//var dbd = new DOBBYDO_CUBEMAP("test_holder");
var dbd = new DOBBYDO_FLOORPLANMAP("test_holder", 500, 500, 20);
//dbd.type = "view";
//alert(dbd.getInfo());
</script>

</body>
</html>