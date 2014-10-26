var size = 600

var color = ["#156b87", "#876315", "#543510", "#872815"]

d3.json('http://localhost:3000/users/tweets', function(data){

	var svg=d3.select('div#portrait').append('svg')
		.attr('width', size)
		.attr('height', size)

	var pack = d3.layout.pack()
		.size([size, size])
		.sort(d3.descending)
		.padding(2)

	svg.selectAll('circle')
			.data(pack.nodes(data).slice(1))
		.enter.append('circle')
			.attr('r', 0)
		.transition().duration(2000).ease('elastic')
			.attr('cx', function(d) { return d.x })
			.attr('cy', function(d) { return d.y })
			.attr('r', function(d) { return d.r })
			.attr('fill', function(d) { return color[d.color_code] })

})

