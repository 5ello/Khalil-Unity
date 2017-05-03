#pragma strict

var mousePowerX: float = 1.0;
var mousePowerY: float = 1.0;

private var forceX: float = 0.0;
private var forceY: float = 0.0;
private var floorTag:String = "Floor";
private var pinTag:String = "Pin";
private var isRoling:boolean = false;
private var ourRB: Rigidbody;


function Start () {
	
	ourRB = GetComponent.<Rigidbody>();	
		
}

function FixedUpdate() {
	if(isRoling == true)
		ourRB.AddForce(forceX, 0, forceY);

}

function OnCollisionEnter(collider:Collision){
	if(collider.gameObject.tag == floorTag)
	{
		isRoling = true;
	
	}
	if(collider.gameObject.tag == pinTag) // Move cube if colission is detected.
	{
		//collider.gameObject.transform.position.y += 1;
		//collider.gameObject.transform.position.z += 1;
		//collider.gameObject.transform.position.x += 1;
		collider.gameObject.active = false;
	
	}
	Debug.Log("LOOOL");
}

function OnCollisionStay(collider:Collision){
	if(collider.gameObject.tag == floorTag)
	{
		isRoling = true;
	
	}
	Debug.Log("LOOOL1");
}

function OnCollisionExit(collider:Collision){
		isRoling = false;
			Debug.Log("LOOOL2");
}

function Update () {
		
	//Time.timeScale = 0.1; // for slowmo.
	forceX = mousePowerX * Input.GetAxis("Mouse X")/Time.deltaTime;
	forceY = mousePowerY * Input.GetAxis("Mouse Y")/Time.deltaTime;
	
	if(Input.GetKey(KeyCode.UpArrow))
	{
		ourRB.AddForce(0, 0, 50);
	}
	
	else if(Input.GetKey(KeyCode.DownArrow))
	{
		ourRB.AddForce(0, 0, -50);
	}
	
	else if(Input.GetKey(KeyCode.LeftArrow))
	{
		ourRB.AddForce(-50, 0, 0);
	}
	
	else if(Input.GetKey(KeyCode.RightArrow))
	{
		ourRB.AddForce(50, 0, 0);
	}
	
}