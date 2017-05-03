#pragma strict

class FugoBowlPlayer{
	
	var scores: FuguBowlScore[];
	
	function FugoBowlPlayer(){ //constructer
	
		
		scores = new FuguBowlScore[10];
		for(var i:int = 0; i < scores.length; i++){
			scores[i] = new FuguBowlScore();
		}
		ClearScore();
	}
	
		 // resets values of all our variables.
	function ClearScore() {
		
		for(var score:FuguBowlScore in scores){
			score.Clear();
		}
	}
		
	function isSpare(frame:int) : boolean { // is it a spare?
		
			scores[frame].Spare();
		
	}
	
	function isStrike(frame:int) : boolean { // is it a strike?
		
			scores[frame].Strike();
		
	}
	
	function SetSpareScore(frame:int){
		
		var scoreFrame: FuguBowlScore = scores[frame];
		scoreFrame.total = scoreFrame.ball1 = scoreFrame.ball2 = scores[frame + 1].ball1;
		
	}
	
	function SetStrikeScore(frame:int){
		
		var scoreFrame: FuguBowlScore = scores[frame];
		scoreFrame.total = scoreFrame.ball1;
		scoreFrame.total = scores[frame + 1].ball1;
		
		if(frame < 8 && isStrike(frame + 1))
			scoreFrame.total += scores[frame+2].ball1;
		else
			scoreFrame.total += scores[frame+1].ball2;
	}
	
	function SetBall1Score(frame:int, pinsDown : int){
		
		scores[frame].ball1 = pinsDown;
		
		if(frame > 0 && isSpare(frame - 1)){
			SetSpareScore(frame - 1);
		}
		
		if(frame > 1 && isStrike(frame - 1) && isStrike(frame - 2) ){ // if previous frame was a strike
			SetStrikeScore(frame - 2);
		}
		
	}
	
	function SetBall2Score(frame:int, pinsDown : int){

		var scoreFrame: FuguBowlScore = scores[frame];
		
		if( isStrike(frame) ) // last frame
			scoreFrame.ball2 = pinsDown;
		else
			scoreFrame.ball2 = pinsDown - scoreFrame.ball1;
		
		
		if( !isStrike(frame) && !isSpare(frame)  )
			scoreFrame.total = pinsDown;
			
		if( frame > 0 && isStrike(frame - 1)  )
			SetStrikeScore(frame - 1);	
	}
		
	function SetBall3Score(frame:int, pinsDown : int){ // Only called in the very last frame

		var scoreFrame: FuguBowlScore = scores[frame];
		
		if( isStrike(frame) && scoreFrame.ball2 < 10)
			scoreFrame.ball3 = pinsDown - scoreFrame.ball3;
		else
			scoreFrame.ball3 = pinsDown;
		
		scoreFrame.total = scoreFrame.ball1 + scoreFrame.ball2 + scoreFrame.ball3;
	}
	
	function GetScore(frame : int) : int{
	
		if(frame == 0 || scores[frame].total == -1)
			return scores[frame].total;
		else{
			var prev:int = GetScore(frame - 1); // Gets the total scores of all previous frames
			if(prev == -1)
				return -1;
			else
				return scores[frame].total+prev;
		
		}
	
	}
}
