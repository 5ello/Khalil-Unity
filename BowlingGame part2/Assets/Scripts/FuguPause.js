#pragma strict

private var saveTimeScale:float;

enum Page{
	
	None, Main, Options, Credits
}

function PauseGame(){
	
	saveTimeScale = Time.timeScale;
	Time.timeScale = 0;
	AudioListener.pause = true;
	currentPage = Page.Main;
	
}

function unPauseGame(){
	
	Time.timeScale = saveTimeScale;
	AudioListener.pause = false;
	currentPage = Page.None;
	
}

function IsGamePaused(){
	
	return Time.timeScale==0;
}


private var currentPage:Page;
var startPaused:boolean = true;
var menuTop : int = 25;

function Start () {
	
	if(startPaused){
		PauseGame();
	}
}

function BeginPage(width: int, height: int){
	
	GUILayout.BeginArea(Rect((Screen.width-width)/2, menuTop, width, height));
}

function EndPage(){
	
	if(currentPage != Page.Main && GUILayout.Button("Back")){
		currentPage = Page.Main;
	}
	GUILayout.EndArea();
}

function Update () {
	
	
	if(Input.GetKeyDown(KeyCode.P)){
		switch(currentPage){
			case Page.None: PauseGame(); break;
			case Page.Main: unPauseGame(); break;
			default: currentPage = Page.Main;
		}			
	}
}

var hudCol : Color = Color.red;
var skin: GUISkin;

function OnGUI(){
	if(IsGamePaused()){
		if(skin != null)
			GUI.skin = skin;
		else
			GUI.color = hudCol;
		switch(currentPage){		
			case Page.Main: ShowPauseMenu(); break;
			case Page.Options: ShowOptions(); break;
			case Page.Credits: ShowCredits(); break;
		}
	}
}


function ShowPauseMenu(){
	
	BeginPage(150,300);
	
	if(GUILayout.Button ("Play"))
		unPauseGame();
			
	if(GUILayout.Button ("Options"))
		currentPage = Page.Options;
			
	if(GUILayout.Button ("Credits"))
		currentPage = Page.Credits;

	if(GUILayout.Button ("Quit"))
		Application.Quit();
		
	EndPage();
		
}

Debug.Log("Credits"); 
var credits:String[]=["A Fugu Games Production", 
					  "Copyrights (c) 2012 Technicat, LLC. All Rights Reserved.",
					  "More information at http://fugugames.com/"];
private var toolbarIndex:int = 0;
private var toolbarStrings: String[] = ["Audio", "Graphics", "System"];

function ShowCredits(){ 			  
		BeginPage(300, 300);
		for(var credit in credits)
			GUILayout.Label(credit);
			
		EndPage();
}

function ShowOptions(){ 
	Debug.Log("Options");
	BeginPage(300, 300);
	toolbarIndex = GUILayout.Toolbar(toolbarIndex, toolbarStrings);
	switch(toolbarIndex){
		
		case 0: ShowAudio(); break;
		case 1: ShowGraphics(); break;
		case 2: ShowSystem(); break;
				
	}
	EndPage();

}
function ShowAudio(){

	GUILayout.Label("Volume");
	AudioListener.volume = GUILayout.HorizontalSlider(AudioListener.volume, 0.0, 1.0);
}
function ShowGraphics(){

	GUILayout.Label(QualitySettings.names[QualitySettings.GetQualityLevel()]);
	GUILayout.Label("Pixel Light Count: " + QualitySettings.pixelLightCount);
	GUILayout.Label("Shadow Cascades: " + QualitySettings.shadowCascades);
	GUILayout.Label("Shadow Distance: " + QualitySettings.shadowDistance);
	GUILayout.Label("Soft Vegetation: " + QualitySettings.softVegetation);
	GUILayout.BeginHorizontal();
	
	if(GUILayout.Button("Decrease")){
		QualitySettings.DecreaseLevel();
	}
	if(GUILayout.Button("Increase")){
		QualitySettings.IncreaseLevel();
	}
	GUILayout.EndHorizontal();
	
}
function ShowSystem(){

	GUILayout.Label("Graphics: " + SystemInfo.graphicsDeviceName+ " " +
	SystemInfo.graphicsMemorySize + "MB\n" +
	SystemInfo.graphicsDeviceVersion +"\n" + 
	SystemInfo.graphicsDeviceVendor);
}
