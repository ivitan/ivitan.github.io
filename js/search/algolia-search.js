utils.jq(()=>{var n,a,r,s=$("input#search-input");0!==s.length&&(n=$("#search-result"),a=$("#search-wrapper"),r=algoliasearch(window.searchConfig.appId,window.searchConfig.apiKey).initIndex(window.searchConfig.indexName),s.on("input",function(){var e=$(this).val().trim(),t=s.data("filter");if(e.length<=0)return a.attr("searching","false"),void n.empty();a.attr("searching","true"),r.search(e,{hitsPerPage:window.searchConfig.hitsPerPage,attributesToHighlight:["content"],attributesToSnippet:["content:30"],highlightPreTag:'<span class="search-keyword">',highlightPostTag:"</span>",restrictSearchableAttributes:["content"]}).then(function(e){var r;e=function(e,t){if(!t||"/"===t)return e;var n=new RegExp(t);return e.filter(e=>n.test(e.url))}(e.hits,t),r=$("<ul>").addClass("search-result-list"),0===e.length?a.addClass("noresult"):(a.removeClass("noresult"),e.forEach(function(e){var t=e._snippetResult.content.value,n=e.hierarchy.lvl1||"Untitled",e=$("<li>").html(`<a href="${e.url}"><span class='search-result-title'>${n}</span><p class="search-result-content">${t}</p></a>`);r.append(e)})),n.html(r)})}),s.on("keydown",function(e){13==e.which&&e.preventDefault()}),new MutationObserver(function(e){1===e.length&&(e[0].addedNodes.length?a.removeClass("noresult"):e[0].removedNodes.length&&a.addClass("noresult"))}).observe(n[0],{childList:!0}))});