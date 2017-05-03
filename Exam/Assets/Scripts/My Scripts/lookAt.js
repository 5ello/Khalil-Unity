#pragma strict

var target : Transform;
function Start () {
		
	var test:GameObject = null;
		
}

function Update () {
	
	transform.LookAt(target);
	Debug.Log(Vector3.Distance(transform.position, target.position));
	
}