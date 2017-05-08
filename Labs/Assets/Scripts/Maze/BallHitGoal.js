#pragma strict

private var ourRB: Rigidbody;
private var ballTag:String = "Ball";

function Start () {
	
}

function OnCollisionEnter(collider:Collision){
	if(collider.gameObject.tag == ballTag)
	{	
		collider.gameObject.transform.Translate(Vector3(0,0,0));
		collider.gameObject.transform.position.x = 0.01;
		collider.gameObject.transform.position.y = 2.1;
		collider.gameObject.transform.position.z = -31.7;
		collider.gameObject.transform.localScale = Vector3(10,10,10);
		
	}
}

function Update () {

}