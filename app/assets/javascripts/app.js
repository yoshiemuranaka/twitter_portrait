var size = 600

var color = ["#89B5C7", "#C78A03", "#C77539"]

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


})

function showInfo(d){
	d3.selectAll('circle').classed('selected', false)
	d3.select(this).classed('selected', true)

	d3.select('#tweet')
		.text(d.text)
	d3.select('#created_at')
		.text(d.created_at)
}

function hoverTrue(){
	d3.select(this).classed('text-hover', true)
}

function hoverFalse(){
	d3.select(this).classed('text-hover', false)
}








d3.select(self.frameElement).style('height', size)