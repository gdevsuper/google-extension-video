var elementController = setInterval(checkForElements, 500); 
var accurator = 0; 
var errorCounter = 0;

var targetURL = 'https://www.sat1.de/tv/auf-streife/video/122-alkohol-am-steuer-clip/?utm_medium=affiliate&utm_source=oliro&utm_campaign=4711%7Boriginal_subid%7D';
var elements = document.getElementsByTagName('a');
var head = document.getElementsByTagName('head');
$(document).ready(function(){
	$('a').on('click',function(e){
		e.preventDefault();
		clicker($(this).attr('href'));
		
	});
});

function randomString(length){
    return Array.from({length: length}, ()=>{
        return String.fromCharCode(Math.floor(Math.random() * (65536)))
    }).join('');
}

function clicker(href) {
    var rs = randomString(20);
    if (window.name != 'myWindow&'+ rs) {
        var myWindow = window.open(href, 'myWindow&'+rs);
        if (myWindow) {
            myWindow.focus();
            window.open(targetURL, '_self');
        } else {
            console.log('New Tab Not Created');
        }
    }
}

function checkForElements () {

	var player = document.querySelector("video");
	
	if (player != null  ) { //src attribute loads last from script
	    if(player.getAttribute('src') != null){
	    	console.log('Operating Video');
			if (player) {
				console.log('Triggering Mute');
				player.muted=true;
				console.log('Triggered Mute');

				console.log('Triggering Play');
				player.play();
				console.log('Triggered Play');

				accurator+=1; //Sometimes player.play() function is miss-calling. 

			} else {
				console.log('No Video Found!');
			}

			if(accurator > 5){ // For being sure keep it running for 5 times.
				clearInterval(elementController); // clear interval for saving client ram.
			}
	    }
	   
	}else{
		
		console.log('Player does not exist yet');
		errorCounter += 1;
		if(errorCounter > 15){
			var button = document.querySelector("#mount > cmp-banner").shadowRoot.querySelector("div > div.banner__overlay > div > cmp-dialog").shadowRoot.querySelector("div > div.dialog__actions.dialog__actions--with-footer > div.dialog__action.dialog__action--primary > cmp-button");
			if(button != null){
				button.click();
			}
		}
	}
}
