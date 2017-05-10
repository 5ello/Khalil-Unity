#pragma strict

function Start () {

}

function OnCollisionEnter(col:Collision)
{
	gameObject.SetActive(false);
}

function Update () {
	
		transform.Rotate(Vector3(1, 0, 0));
}