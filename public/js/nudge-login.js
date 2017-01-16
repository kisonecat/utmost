$(function() {
    
    function hidePage() {
	var div = $('<div></div>');
	div.css({ opacity:    '0.75',
		  background: '#000', 
		  width:      '100%',
		  height:     '100%', 
		  'z-index':    '10',
		  top:        '0', 
		  left:       '0', 
		  position:   'fixed'
		});
	$('body').prepend(div);
    }

    function addLink( url, text ) {
	var div = $('<a href="/' + url + '?url=' + escape(document.location) + '">To view this page,<br/>please '+ text + '.</a>');
	div.css({ opacity:    '0.5',
		  width:      '100%',
		  'text-align': 'center',
		  'padding-top': '25px',
		  'font-size': '50px',
		  'text-decoration': 'none',
		  'font-family': 'sans-serif',
		  'color': 'white',
		  height:     '100%', 
		  'z-index':    '15',
		  top:        '0', 
		  left:       '0', 
		  position:   'fixed'
		});
	$('body').prepend(div);
    }    
    
    $.getJSON( "/user", function( data ) {
	if (data.username) {
	    if (data.verified) {
		// User is logged in
	    } else {
		// User needs to verify their email
		hidePage();
		addLink('email', 'verify your email address');
	    }
	} else {
	    hidePage();
	    addLink('login', 'log in');
	}
    });
});
