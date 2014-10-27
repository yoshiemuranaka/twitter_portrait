var size = 400

var color = ["#89B5C7", "#C78A03", "#C77539"]


//D3 AJAX
d3.json('http://localhost:3000/users/tweets', function(data){

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


})//END AJAX

//SHOW TWEET INFO ON CLICK
function showInfo(d){
	d3.selectAll('circle').classed('selected', false)
	d3.select(this).classed('selected', true)

	d3.select('#tweet')
		.text(d.text)
		
	d3.select('#created_at')
		.text(d.tweet_created_at)
}


//MOUSEOVER MOUSEOUT FUNCTIONS
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

//INTERVAL SELECTION OF TWEETS
setInterval(function() {
	circle = shuffleSelectTweet()
	circle.__onclick()
}, 5000);



d3.select(self.frameElement).style('height', size)