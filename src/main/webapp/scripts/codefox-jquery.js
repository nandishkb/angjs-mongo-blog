/**
 * 
 */
$(document).ready(function() {
	registerEvent();
});

function registerEvent() {
	var hamMenuButton = $('#hamburger-menu');
	var brandLogo = $('.brand-logo');
	var brandText = $('.brand-word');
	var headerItems = $('.header-items');
	console.log(hamMenuButton);
	console.log(brandLogo);
	hamMenuButton.on('click', function() {
		console.log('Button Clicked')

	});
};