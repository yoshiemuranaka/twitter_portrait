$(function() {

	//KEY
var color = ["#000033", "#2B1A3C", "#553344", "#804D4D", "#AA6655", "#D5805E", "#FF9966", "#FFA255", "#FFAA44", "#FFB333", "#FFBB22", "#FFC411", "#FFCC00", "#EEBB11", "#DDAA22", "#CC9933", "#BB8844", "#AA7755", "#996666", "#80555E", "#664455", "#4D334D", "#332244", "#1A113C"]

	var svg= d3.select('div#key').append('svg')
		.attr('width', 240)
		.attr('height', 20)

	svg.selectAll('rect')
		.data(color)
		.enter().append('rect')
			.attr('width', 10)
			.attr('height', 20)
			.attr('x', function(d, i){ return i * 10})
			.style('fill', function(d) {return d})

$('#viewKey').on('click', function(){
	var userKey = $('#userKey')
	if (userKey.hasClass('hidden')){
		userKey.hide()
		userKey.toggleClass('hidden')
		userKey.slideDown('slow')
	}else{
		userKey.slideUp('slow', function(){
			userKey.addClass('hidden');
			userKey.show()
		})
	}
	
})
			
});