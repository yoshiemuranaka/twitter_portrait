$(function() {

	var size = 600

	var color = ["#000033", "#2B1A3C", "#553344", "#804D4D", "#AA6655", "#D5805E", "#FF9966", "#FFA255", "#FFAA44", "#FFB333", "#FFBB22", "#FFC411", "#FFCC00", "#EEBB11", "#DDAA22", "#CC9933", "#BB8844", "#AA7755", "#996666", "#80555E", "#664455", "#4D334D", "#332244", "#1A113C"]

	$.ajax({
	url: '/celebs/1/tweets',
	type: 'GET',
	dataType: 'json'
	}).done(function(data){
		renderD3(data);
	});
	
	$.ajax({
	url: '/celebs/2/tweets',
	type: 'GET',
	dataType: 'json'
	}).done(function(data){
		renderD3(data);
	});

	$.ajax({
	url: '/celebs/3/tweets',
	type: 'GET',
	dataType: 'json'
	}).done(function(data){
		renderD3(data);
	});

function renderD3(data){
		var svg = d3.select('div#portrait'+data.celeb_id).append('svg')
			.attr('width', size)
			.attr('height', size)

		//DECLARING LAYOUT TYPE
		var pack = d3.layout.pack()
			.size([size, size])
			.sort(d3.descending)
			.padding(2)

		//APPENDING CIRCLE FOR EACH DATA CHILD
		svg.selectAll('circle')
				.data(pack.nodes(data).slice(1))
			.enter().append('circle')
				.attr('r', 0)
			.transition().duration(3000).ease('elastic')
				.attr('cx', function(d) { return d.x })
				.attr('cy', function(d) { return d.y })
				.attr('r', function(d) { return d.r })
				.style('fill', function(d) { return color[d.color_code] })

		if(this.location.pathname == '/' || this.location.pathname == '/session'){
			d3.selectAll('circle').on('click', showCelebInfo)
			.on('mouseover', hoverTrue)
			.on('mouseout', hoverFalse)
		}

}//END RENDERD3 FUNCTION



	//SHOW TWEET INFO ON CLICK
	function showCelebInfo(d){
		d3.selectAll('circle').classed('selected', false)
		d3.select(this).classed('selected', true)
		var caption = $('.active').children()[1]
	
		$('.active').children('.carousel-caption').children('p').each(function(){
			$(this).hide().html(d.text).slideDown()
		})
	
	}

	function hoverTrue(){
		d3.select(this).classed('text-hover', true)
	}

	function hoverFalse(){
		d3.select(this).classed('text-hover', false)
	}


	// function shuffleSelectTweet(){
	// 	circles = d3.selectAll('circle')[0]
	// 	circle = d3.shuffle(circles)[0]
	// 	return circle
	// }

	// if (this.location.pathname == '/account'){
	// 	var timer = setInterval(function() {
	// 		circle = shuffleSelectTweet()
	// 		circle.__onclick()
	// 	}, 3000);
	// }else{
	// 	// 	var timer = setInterval(function() {
	// 	// 	circle = shuffleSelectTweet()
	// 	// 	circle.__onclick()
	// 	// }, 3000);
	// }

	d3.select(self.frameElement).style('height', size)


});
