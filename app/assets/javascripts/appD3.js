$(function() {
	
	clearInterval(timer)
	console.log('timer cleared')

	var size = 500

	var color = ["#000033", "#2B1A3C", "#553344", "#804D4D", "#AA6655", "#D5805E", "#FF9966", "#FFA255", "#FFAA44", "#FFB333", "#FFBB22", "#FFC411", "#FFCC00", "#EEBB11", "#DDAA22", "#CC9933", "#BB8844", "#AA7755", "#996666", "#80555E", "#664455", "#4D334D", "#332244", "#1A113C"]

	//D3 AJAX
	$.ajax({
	url: '/users/tweets',
	type: 'GET',
	dataType: 'json'
	}).done(function(data){
		renderD3(data);
	});

	function renderD3(data){

		var svg=d3.select('div#portrait').append('svg')
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
			.transition().duration(2000).ease('elastic')
				.attr('cx', function(d) { return d.x })
				.attr('cy', function(d) { return d.y })
				.attr('r', function(d) { return d.r })
				.style('fill', function(d) { return color[d.color_code] })

		d3.selectAll('circle').on('click', showInfo)
			.on('mouseover', hoverTrue)
			.on('mouseout', hoverFalse)

	};

	function showInfo(d){
		d3.selectAll('circle').classed('selected', false)
		d3.select(this).classed('selected', true)
		$('#tweet').hide().html(d.text).slideDown()
		$('#created_at').hide().html(d.tweet_created_at).slideDown()
		clearInterval(timer)
		timer = setInterval(function() {
			circle = shuffleSelectTweet()
			circle.__onclick()
		}, 7000);

	}

	function hoverTrue(){
		d3.select(this).classed('text-hover', true)
	}

	function hoverFalse(){
		d3.select(this).classed('text-hover', false)
	}

	function shuffleSelectTweet(){
		circles = d3.selectAll('circle')[0]
		circle = d3.shuffle(circles)[0]
		return circle
	}

	d3.select(self.frameElement).style('height', size)

});
