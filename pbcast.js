function addLinksToVideo() {
    $( ".button-bar" ).after( "<div class='button-bar switched' id='cast-bar'></div>" );
	var extract = $( "script:contains('source')" ).each(function( index ) {
		var indexscope = $( this ).text();
		var resolvelinks = indexscope.match(/\bhttp\S*mp4\b/gm)
		$.each(resolvelinks, function( index, value ) {
			var patt = /vm|vf|v1280|v1920/g;
			var result = patt.exec(value).toString().replace("vm", "240p").replace("vf","480p").replace("v1280","720p").replace("v1920","1080p");
			var value = "https://vidcast.dabble.me/index.html?video_link=" + encodeURIComponent(value) + "&submit=Go";
      var url = chrome.extension.getURL('ic_cast2_black_24dp.png');
			$( "#cast-bar" ).append( "<a class='pb-button small' href='"+value+"' target='pbvidcast'>"+"<img src='" +url+"' width=\"20\" style=\"vertical-align: middle; margin-bottom: 0.15em;\"/>"+result+"</a>" );
		});
	});
};

function addLinksToNews() {
	var numDlBar = 0;
	var videoNum = "";
	var firstRun = true;
	$( ".details" ).each(function( index ) {
		$(this).after( "<div class='button-bar switched' id='cast-bar-"+numDlBar+"'></div>" );
		numDlBar = numDlBar + 1;
	});
	numDlBar = 0;
	var extract = $( "script:contains('source')" ).each(function( index ) {
		var indexscope = $( this ).text();
		var resolvelinks = indexscope.match(/\bhttp\S*mp4\b/gm)
		$.each(resolvelinks, function( index, value ) {
			n = value.lastIndexOf('/');
			if ( firstRun == true ) {
				videoNum = value.substring(n + 1);
				firstRun = false;
			}
			if (value.substring(n + 1) != videoNum){
				numDlBar = numDlBar + 1;
				videoNum = value.substring(n + 1);
			}
			var patt = /vm|vf|v1280|v1920/g;
			var result = patt.exec(value).toString().replace("vm", "240p").replace("vf","480p").replace("v1280","720p").replace("v1920","1080p");
			var value = "https://vidcast.dabble.me/index.html?video_link=" + encodeURIComponent(value) + "&submit=Go";
      var url = chrome.extension.getURL('ic_cast2_black_24dp.png');
      $( "#cast-bar-"+numDlBar ).append( "<a class='pb-button small' href='"+value+"' target='pbvidcast'>"+"<img src='" +url+"' width=\"20\" style=\"vertical-align: middle; margin-bottom: 0.15em;\"/>"+result+"</a>" );
		});
	});

};

if (document.title.indexOf("Pinkbike") != -1) {
	if (!window.jQuery) {
		alert ("jquery not loaded! - this extension will not work properly!")
	}

	$(document).ready(function () {
		if(window.location.href.indexOf("/news/") > -1) {
		   addLinksToNews();
		}
		if(window.location.href.indexOf("/video/") > -1) {
		   addLinksToVideo();
		}
	});
};
