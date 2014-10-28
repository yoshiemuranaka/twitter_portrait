$(function() {
	
	var size = 400

	var color = ["#000033", "#2B1A3C", "#553344", "#804D4D", "#AA6655", "#D5805E", "#FF9966", "#FFA255", "#FFAA44", "#FFB333", "#FFBB22", "#FFC411", "#FFCC00", "#EEBB11", "#DDAA22", "#CC9933", "#BB8844", "#AA7755", "#996666", "#80555E", "#664455", "#4D334D", "#332244", "#1A113C"]

	$.ajax({
	url: '/celebs/1/tweets',
	type: 'GET',
	dataType: 'json'
	}).done(function(data){
		renderD3(data);
	});
	
function renderD3(data){
		var svg = d3.select('div#rooneyPortrait').append('svg')
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
}

	//SHOW TWEET INFO ON CLICK
	function showInfo(d){
		d3.selectAll('circle').classed('selected', false)
		d3.select(this).classed('selected', true)

		$('#tweet').html(d.text)
	}

	d3.select(self.frameElement).style('height', size)


});
