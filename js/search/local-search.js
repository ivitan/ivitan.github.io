var searchFunc=function(e,g,t,i){$.ajax({url:e,dataType:"xml",success:function(e){var r,n=$("entry",e).map(function(){return{title:$("title",this).text(),content:$("content",this).text(),url:$("link",this).attr("href")}}).get(),e=document.getElementById(t);e&&(r=document.getElementById(i),e.addEventListener("input",function(){var o=[],p=function(e){for(var t,r=[],n=0;n<e.length;n++)for(t=n+1;t<e.length+1;t++)r.push(e.slice(n,t).join(" "));return r}(this.value.trim().toLowerCase().split(" ")).sort(function(e,t){return t.split(" ").length-e.split(" ").length});if(r.innerHTML="",!(this.value.trim().length<=0)&&(n.forEach(function(e){var t,r,n,i,l,s,a,c,u=0;!e.title||""===e.title.trim()||g&&!e.url.includes(g)||(a=e.title.trim().toLowerCase(),t=a.toLowerCase(),c=e.content.trim().replace(/<style([\s\S]*?)<\/style>/gi,"").replace(/<script([\s\S]*?)<\/script>/gi,"").replace(/<figure([\s\S]*?)<\/figure>/gi,"").replace(/<\/div>/gi,"\n").replace(/<\/li>/gi,"\n").replace(/<li>/gi,"  *  ").replace(/<\/ul>/gi,"\n").replace(/<\/p>/gi,"\n").replace(/<br\s*[\/]?>/gi,"\n").replace(/<[^>]+>/gi,""),r=c.toLowerCase(),e=e.url,l=i=n=-1,""!==c&&p.forEach(function(e){n=t.indexOf(e),i=r.indexOf(e),(0<=n||0<=i)&&(u+=1,i<0&&(i=0),l<0&&(l=i))}),0<u&&((s={}).rank=u,s.str="<li><a href='"+e+"'><span class='search-result-title'>"+a+"</span>",0<=l&&(e=l+80,(e=0==(a=(a=l-20)<0?0:a)?100:e)>c.length&&(e=c.length),c=c.substring(a,e),a=new RegExp(p.join("|"),"gi"),c=c.replace(a,function(e){return'<span class="search-keyword">'+e+"</span>"}),s.str+='<p class="search-result-content">'+c+"...</p>"),s.str+="</a></li>",o.push(s)))}),o.length)){o.sort(function(e,t){return t.rank-e.rank});for(var e='<ul class="search-result-list">',t=0;t<o.length;t++)e+=o[t].str;r.innerHTML=e+="</ul>"}}))}})};