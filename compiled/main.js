"use strict";var lookup_btn=d3.select("#goto-language"),lookup=d3.select("#lookup-language"),label_slugs=null;Array.from(document.getElementsByClassName("e")).forEach(function(a){a.innerHTML="<a href=\"mailto:".concat(a.title,"@ramiro.org?subject=programminglanguages.info\">").concat(a.textContent,"</a>")}),d3.json("/language-labels.json").then(function(a){label_slugs=a;d3.select("#languages").selectAll("option").data(d3.keys(label_slugs)).enter().append("option").attr("value",function(a){return a}).text(function(a){return a});lookup.on("change",function(){return _goto(lookup.node().value)}),lookup_btn.on("click",function(){return _goto(lookup.node().value)})});function _goto(a){label_slugs[a]&&(document.location.href="/language/".concat(label_slugs[a],"/"))}