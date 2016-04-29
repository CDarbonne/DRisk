( function( $ ) {
$( document ).ready(function() {
// Cache the elements we'll need

$('#theDiv').prepend('<img id="theImg" src="DRISK.jpg" />')

var menu = $('#cssmenu');

var menuList = menu.find('ul:first');

var listItems = menu.find('li').not('#responsive-tab');



// Create responsive trigger

menuList.prepend('<li id="responsive-tab"><a href="#">Menu</a></li>');



// Toggle menu visibility

menu.on('click', '#responsive-tab', function(){

	listItems.slideToggle('slow');

	listItems.addClass('collapsed');

$( "a" ).click(function( event ) {
 
    event.preventDefault();
 
    $( this ).hide( "slow" );
 
});
});
});
} )( jQuery );
