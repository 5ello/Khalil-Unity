#pragma strict

var bomb:GameObject;

function Start () {

}

function Update () {
	if(Input.GetKeyDown(KeyCode.F)){
		var clone : GameObject = Instantiate(bomb, transform.position + Vector3.forward, transform.rotation);
		
		clone.GetComponent.<Rigidbody>().velocity = transform.TransformDirection(Vector3.forward);
	}
}