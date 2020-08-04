<?php 

function getProducts($pdo,$sql){
	// a query sql vem de fora 
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
function getPrestadores($pdo){
	$sql = "SELECT *  FROM prestadores "; //"SELECT *  FROM prod_servicos ";
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
function getConsultas($pdo,$sql){	
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


function updatePrecoProduto($pdo,$sql){
	// a query sql vem de fora 
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


function getProductsByIds($pdo, $ids) {
	$sql = "SELECT * FROM prod_servicos WHERE id IN (".$ids.")";
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
} ?>