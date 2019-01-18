"use strict";function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function _arrayWithHoles(a){if(Array.isArray(a))return a}var data=null,graph=null,hide_widgets=!!(800>window.screen.width),lang_input=d3.select("#set-language"),label_nodes=new Map,node_info=d3.select("#node-info"),node_info_content=d3.select("#node-info .content"),node_labels=new Map,zoomScale=d3.scaleLog().domain([1,400]).range([4,.5]),hash_map=getHashMap();("off"==hash_map.get("widgets")||hide_widgets)&&(hide_widgets=!0,d3.selectAll(".widget").style("display","none")),d3.json("/influence-graph.json").then(function(a){data=a;var b=d3.select("#languages"),c=!0,d=!1,e=void 0;try{for(var f,g=data.nodes[Symbol.iterator]();!(c=(f=g.next()).done);c=!0){var h=f.value,i=acronymize(h.label);label_nodes.has(i)&&(i=h.sitelink),b.append("option").attr("value",i).text(i),h.label=i,node_labels.set(h.id,i),label_nodes.set(i,h.id)}}catch(a){d=!0,e=a}finally{try{c||null==g.return||g.return()}finally{if(d)throw e}}initGraph(data.nodes,data.links);var j=hash_map.get("language");if(j){var k=label_nodes.get(j);k&&setLanguage(k)}lang_input.on("input",function(){var a=d3.event.target.value;if(!a)return void reset();var b=label_nodes.get(a);b&&setLanguage(b,!1)}),d3.selectAll(".delete").on("click",function(){return d3.event.target.parentNode.style.display="none"})});function acronymize(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:5,c=a.split(/\s+/);return c.length>=b?c.map(function(a){return a[0]}).join(""):a}function appendLanguages(a,b,c){b.length&&(a.append("h3").text(c),a.append("div").attr("class","links").selectAll("span").data(b.sort()).enter().append("span").append("a").text(function(a){return a}).on("click",function(a){return setLanguage(label_nodes.get(a))}))}function getHashMap(){if(!document.location.hash||10>document.location.hash.length)return new Map;var a=new Map,b=!0,c=!1,d=void 0;try{for(var e,f=document.location.hash.substr(1).split("&")[Symbol.iterator]();!(b=(e=f.next()).done);b=!0){var g=e.value,h=g.split("="),i=_slicedToArray(h,2),j=i[0],k=i[1];a.set(j,acronymize(decodeURIComponent(k)))}}catch(a){c=!0,d=a}finally{try{b||null==f.return||f.return()}finally{if(c)throw d}}return a}function initGraph(a,b){graph&&graph.clear(),graph=new DiGraph(a,b,"outdegree"),graph.draw("#network"),initUI(graph)}function initUI(a){d3.selectAll(".edge-count").text(a.edges.length),d3.selectAll(".node-count").text(a.nodes.length);var b=d3.selectAll(".edge-plural");1==a.edges.length?b.style("display","none"):b.style("display","contents");var c=a.width/15,d=a.height/15,e=1.5;d3.selectAll("#network-nav button").on("click",function(){var b=d3.event.target.classList;b.contains("in")?a.zoom.scaleBy(a.g,e):b.contains("out")?a.zoom.scaleBy(a.g,1/e):b.contains("reset")?(a.zoom.scaleTo(a.g,zoomScale(a.nodes.length)),a.zoom.translateTo(a.g,a.width/2,a.height/2),reset()):b.contains("left")?a.zoom.translateBy(a.g,c,0):b.contains("right")?a.zoom.translateBy(a.g,-c,0):b.contains("up")?a.zoom.translateBy(a.g,0,d):b.contains("down")&&a.zoom.translateBy(a.g,0,-d)}),a.zoom.scaleTo(a.g,zoomScale(a.nodes.length)),a.svg.selectAll("g.nodes circle").on("click",function(){var a=d3.select(d3.event.target).attr("node-id");a&&setLanguage(a)})}function reset(){initGraph(data.nodes,data.links),document.location.hash="",node_info.style("display","none"),lang_input.node().value=""}function setLanguage(a){var b=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],c=[],d=[],e=new Set([a]),f=!0,g=!1,h=void 0;try{for(var i,j,k=data.links[Symbol.iterator]();!(f=(i=k.next()).done);f=!0)j=i.value,j.source==a?(e.add(j.target),d.push(node_labels.get(j.target))):j.target==a&&(e.add(j.source),c.push(node_labels.get(j.source)))}catch(a){g=!0,h=a}finally{try{f||null==k.return||k.return()}finally{if(g)throw h}}var l=data.nodes.filter(function(a){return e.has(a.id)}),m=data.links.filter(function(a){return e.has(a.source)&&e.has(a.target)});initGraph(l,m);var n=graph.node_index.get(a).attr;hash_map.set("language",encodeURIComponent(node_labels.get(a)));var o=Array.from(hash_map.entries()).map(function(a){return a.join("=")});if(o.length&&(document.location.hash=o.join("&")),!hide_widgets){b&&(lang_input.node().value=n.label),node_info.style("display","block"),node_info_content.selectAll("*").remove(),node_info_content.append("h2").text(n.label),appendLanguages(node_info_content,c,"Influenced by"),appendLanguages(node_info_content,d,"Influenced"),node_info_content.append("h3").text("More info");var p=node_info_content.append("ul");p.append("li").append("a").attr("href","/language/".concat(n.slug,"/")).text("".concat(n.label)),p.append("li").append("a").attr("href","https://www.wikidata.org/wiki/".concat(a)).text("wikidata.org/wiki/".concat(a))}}