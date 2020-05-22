const dscc = require('@google/dscc');
const d3 = Object.assign({}, require('d3'), require('d3-sankey'));
const local = require('./localMessage.js');
import * as ut from './utils.js';

// change this to 'true' for local development
// change this to 'false' before deploying
export const LOCAL = false;

function click(d, message) {
	// SET VARIABLES TO FILTER DASHBOARD
	const FILTER = dscc.InteractionType.FILTER;
	const actionId = 'onClick';
	const dimIds = message.fields.dimensions.map(d => d.id);
	const newConcept = dimIds[d.layer];
	
	if (message.interactions.onClick.value.data !== undefined) {
		var filterData = message.interactions.onClick.value.data;
		var dims = message.interactions.onClick.value.data.concepts;
		var check = dims.find(function(e){
			return e === newConcept;
		});
		if(check === undefined){
			filterData.concepts.push(newConcept);
			filterData.values[0].push(d.id);
		}
	}else{
		var filterData = {
			concepts: [newConcept],
			values: [[d.id]]
		};
	}
	
	dscc.sendInteraction(actionId, FILTER, filterData);
}

function updateData(d, message) {
	var data = message.tables.DEFAULT;
	message.tables.DEFAULT = [];
	var dimensions = message.fields.dimensions.map(da => da.id);
	var concepts = d.concepts;
	var values = d.values;
	concepts.forEach(function(e, i){
		var index = dimensions.findIndex(function(el){ return el === e; });
		values.forEach(function(v){
			data = data.filter(function(m){
				if(m.dimensions[index] === v[i]){
					return m;
				}
			});
		});
	});
	message.tables.DEFAULT = data;
	return message;
}

const getTotal = data => {
	// GET THE TOTAL AMOUNT
	var metrics = data.map(d => d.metrics[0]);
	var sum = metrics.reduce(function(a,b) {
		return Number(a) + Number(b);
	});
		
	return sum;
}

// write viz code here
const parseData = data => {
  
  // REVISED FOR MORE THAN 2 DIMENSIONS
  var munData = [];
  var pdata = [];
  var object = [];
  var numDims = data[0].dimensions.length;
  var numDimsIndex = numDims - 1;
  for(var j=0; j<numDimsIndex; j++){
	  data.forEach(function(d){
			object.push([d['dimensions'][j], d['dimensions'][j+1]]);
			munData.push({
				dim0: d['dimensions'][j], 
				dim1: d['dimensions'][j+1],
				value: d['metrics'][0]
			});
	  });
  }
  
  //console.log(aggData);
  var gdata = d3.nest()
	  .key(function(d) { return d.dim0;})
	  .key(function(d) { return d.dim1;})
	  .rollup(function(v) { return d3.sum(v, function(d) { return d.value; }); })
	  .object(munData);
	
	gdata = Object.entries(gdata);
	gdata.forEach(function(d){
		var hdata = Object.entries(d[1]);
		//console.log(hdata);
		hdata.forEach(function(e){
			//console.log(e);
			pdata.push({
				dimensions: [d[0], e[0]],
				metrics: [e[1]]
			});
		});
	});
    
  // assuming only 2 dimensions
  var dimNodes1 = pdata.map(function(row) {
    return row['dimensions'][0];
  });
  var dimNodes2 = pdata.map(function(row) {
    return row['dimensions'][1];
  });
  

  var uniqueNodes = Array.from(new Set(dimNodes1.concat(dimNodes2)));

  var nodes = uniqueNodes.map(function(d) {
    return {id: d};
  });

  var links = pdata.map(function(row) {
    return {
      source: uniqueNodes.indexOf(row['dimensions'][0]),
      target: uniqueNodes.indexOf(row['dimensions'][1]),
      value: row['metrics'][0],
    };
  });

  return {nodes, links};
};

const styleVal = (message, styleId) => {
  // to account for color styling
  if (typeof message.style[styleId].defaultValue === 'object') {
    return message.style[styleId].value.color !== undefined
      ? message.style[styleId].value.color
      : message.style[styleId].defaultValue.color;
  }
  return message.style[styleId].value !== undefined
    ? message.style[styleId].value
    : message.style[styleId].defaultValue;
};

const units = "Guests";
//const formatNumber = d3.format(",.0f");
const formatNumber = d3.format(",.2r");
const format = function(d) { return formatNumber(d) + " " + units; };
const formatPrecision = Math.max(0, d3.precisionFixed(0.05) - 2);
const formatPer = d3.format("." + formatPrecision + "%");
const formatPercent = function(d) { return formatPer(d); };

const draw = message => {
	
	const enableInteractions = message.interactions.onClick.value.type === 'FILTER' ? true : false;

  if (enableInteractions) {
    if (message.interactions.onClick.value.data !== undefined) {
		  const selected = message.interactions.onClick.value.data;
			message = updateData(selected, message);
    }
  }
	
  const sankeyData = parseData(message.tables.DEFAULT);
  const runTotal = getTotal(message.tables.DEFAULT);

  // remove the canvas if it exists
  d3.select('body')
    .selectAll('svg')
    .remove();
  // remove the error handler if exists
  d3.select('body')
    .selectAll('div')
    .remove();

  // set margins
  // get the width and the height of the iframe
  var width = dscc.getWidth();
  var height = dscc.getHeight();

  function onHover(elem, d) {
    showTooltip(elem, d);
    if (elem.classList.contains("node")) {
      links.transition()        
        .duration(700)
				.attr("stroke-opacity", .1);
			links.filter(function(s) { return d.id == s.source.id; }).transition()        
        .duration(700)
				.attr("stroke-opacity", 1);
      links.filter(function(t) { return d.id == t.target.id; }).transition()        
        .duration(700)
				.attr("stroke-opacity", 1);
    }else{
      d3.select(elem).attr('stroke-opacity', 1);
    }
  }

  function leaveHover(elem, d) {
	hideToolTip(elem, d);
    if (d.id !== undefined) {
      links.attr('stroke-opacity', Number(styleVal(message, 'link_opacity')));
    }else{
      d3.select(elem).attr(
        'stroke-opacity',
        Number(styleVal(message, 'link_opacity'))
      );
    }
  }

  // set up the canvas space
  const yMargin = 10;
  
  var w = width - 100;
  var h = height - 100;

  var svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h - yMargin)
    .style('padding', 50 + 'px')
    .attr('transform', `translate(0, -${yMargin})`);
    
  // create tooltip
  var tooltip = d3
    .select('body')
    .append('div')
    .style('z-index', '10')
    .style('border', '1px solid')
    .style('border-color', '#bdbdbd')
    .style('background-color', '#ffffff')
    .style('box-shadow', '1px 1px 1px #e3e3e3')
    .style('visibility', 'hidden')
    .style('height', '40px')
    .style('opacity', 1)
    .style('position', 'absolute');
  
  tooltip.append('span').attr('id', 'title').style('display', 'block').style('padding-bottom', '5px');
  tooltip.append('span').attr('id', 'metric').style('display', 'block');

  // configure extent to use margin
  var sankey = d3
    .sankey()
    .nodeWidth(15)
    .nodePadding(yMargin / 2)
    .size([w, h - yMargin * 2]);

  try {
    sankey(sankeyData);
  } catch (e) {
    ut.displayError(ut.DATA_ERROR, ut.C_DATA_ERROR);
    return;
  }
  // draw the nodes 
  svg
    .append('g')
    .attr('class', 'nodes')
    .attr('transform', 'translate(0, 10)')
    .selectAll('rect.node')
    .data(sankeyData.nodes)
    .enter()
    .append('rect')
    .classed('node', true)
    .attr('x', function(d) {
      return d.x0;
    })
    .attr('y', function(d) {
      return d.y0;
    })
    .attr('height', function(d) {
      return d.y1 - d.y0;
    })
    .attr('width', sankey.nodeWidth())
    .style('fill', styleVal(message, 'node_color'))
    .on('click', d => click(d, message))
    .on('mouseover', function(d) {
      onHover(this, d);
    })
    .on('mouseout', function(d) {
      leaveHover(this, d);
    })
    ;

  // draw the links
  const links = svg
    .append('g')
    .attr('fill', 'none')
    .attr('transform', 'translate(0, 10)')
    .attr('stroke', styleVal(message, 'link_color'))
    .attr('stroke-opacity', Number(styleVal(message, 'link_opacity')))
    .selectAll('path')
    .data(sankeyData.links)
    .enter()
    .append('path')
    .attr('d', d3.sankeyLinkHorizontal())
    .attr('stroke-width', function(d) {
      return d.width;
    })
    .on('mouseover', function(d) {
      onHover(this, d);
    })
    .on('mouseout', function(d) {
      leaveHover(this, d);
    });
  // if I should show labels
  if (styleVal(message, 'show_labels')) {
    // add the "left" side labels
    svg
      .append('g')
      .style('font-size', styleVal(message, 'node_font_size'))
      .style('fill', styleVal(message, 'node_font_color'))
      .style('font-family', styleVal(message, 'font_family'))
      .selectAll('text')
      .data(sankeyData.nodes)
      .enter()
      .append('text')
      .filter(function(d) {
        return d.x0 < width / 2;
      })
      .attr('x', function(d) {
        return d.x0 + parseInt(styleVal(message, 'left_offset'));
      })
      .attr('y', function(d) {
        return (d.y0 + d.y1) / 2;
      })
      .attr('text-anchor', 'beginning')
      .attr('dy', '0.35em')
      .text(d => d.id);

    // add the "right" side labels
    svg
      .append('g')
      .style('font-size', styleVal(message, 'node_font_size'))
      .style('fill', styleVal(message, 'node_font_color'))
      .style('font-family', styleVal(message, 'font_family'))
      .selectAll('text')
      .data(sankeyData.nodes)
      .enter()
      .append('text')
      .filter(function(d) {
        return d.x0 > width / 2;
      })
      .attr('x', function(d) {
        return d.x0 - parseInt(styleVal(message, 'right_offset'));
      })
      .attr('y', function(d) {
        return (d.y0 + d.y1) / 2;
      })
      .attr('text-anchor', 'end')
      .attr('dy', '0.35em')
      .text(function(d) {
        return d.id;
      });
  }
  
  // #### TOOLTIP ####
  function showTooltip(elem, d) {
	  
	d3.select(elem).attr('opacity', 1);
    var boundingBox = elem.getBoundingClientRect();
    var tooltipStyleLeft = boundingBox.left + 5 + 'px';
  
    // TOOLTIP TEXT
    if (d.id !== undefined) {
	  var tooltipTitle = "Node";
      var tooltipText = d.id + ": " + format(d.value) + " (" + formatPercent(d.value / runTotal) + ")";
      if (d.targetLinks.length > 0) {tooltipStyleLeft = boundingBox.left - 100 + 'px';}
    }else{
	  	var tooltipTitle = "Link";
			var tooltipText = d.source.id + " → " + d.target.id + ": " + format(d.value) + " (" + formatPercent(d.value / runTotal) + ")";
    }

    tooltip
      .style('top', boundingBox.top + 5 + 'px')
      .style('left', tooltipStyleLeft)
      .transition(200)
      .style('visibility', 'visible')
      .style('padding', '10px');
      
    tooltip
      .select("#title")
      .style('font-size', '12px')
      .style('color', '#6d6d6d')
      .style('font-family', styleVal(message, 'font_family'))
      .text(tooltipTitle);
    
    tooltip
      .select("#metric")
      .style('font-size', '12px')
      .style('color', '#6d6d6d')
      .style('font-family', styleVal(message, 'font_family'))
      .text(tooltipText);
  }
  
  function hideToolTip(elem, d) {
    tooltip
      .transition(200)
      .style('visibility', 'hidden');
  }
};

const drawViz = message => {
  try {
    draw(message);
  } catch (err) {
	//draw(message);
    ut.displayError(ut.GENERAL_ERROR);
  }
};

// renders locally
if (LOCAL) {
  drawViz(local.message);
} else {
  dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});
}
