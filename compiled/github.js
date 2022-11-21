"use strict";var table=d3.select("#github-results table"),message=d3.select("#github-message"),rows=table.select("tbody"),sort_orders=new Map;d3.select("#github-query").attr("value","language:".concat(language)).on("change",search),d3.select("#github-search").on("click",search);function search(){var a=document.getElementById("github-query").value.trim();a&&(message.html("<span class=\"button is-loading\"></span>"),d3.json("https://api.github.com/search/repositories?q=".concat(encodeURIComponent(a))).then(function(a){return message.text(""),0==a.total_count?(table.classed("is-hidden",!0),void message.text("No results found.")):void(showResults(a.items),d3.selectAll("#github-results thead tr").on("click",function(b){return sortResults(a.items,b)}))}))}function itemSize(a){var b=Math.round,c=0,d="KB";return a.size&&(c=a.size,1048576<c?(c/=1048576,d="GB"):1024<c&&(c/=1024,d="MB"),c=b(100*c)/100),d3.format(",")(c)+d}function showResults(a){rows.text(""),table.classed("is-hidden",!1);var b=rows.selectAll("tr").data(a).enter().append("tr");b.append("td").html(function(a){return"<a href=\"".concat(a.html_url,"\">").concat(a.full_name,"</a>")}),b.append("td").text(function(a){return a.description}),b.append("td").text(function(a){if(a.pushed_at)return a.pushed_at.slice(0,10)}),b.append("td").text(function(a){return d3.format(",")(a.open_issues)}),b.append("td").text(function(a){return d3.format(",")(a.forks)}),b.append("td").text(function(a){return d3.format(",")(a.watchers)}),b.append("td").text(itemSize)}function sortResults(a,b){var c=b.target.classList[0],d=d3.ascending;sort_orders.has(c)&&(d=sort_orders.get(c),d=d==d3.ascending?d3.descending:d3.ascending),sort_orders.set(c,d);var e=a.sort(function(a,b){return d(a[c],b[c])});showResults(e)}