utils.jq(()=>{$(function(){for(var e=document.getElementsByClassName("ds-fcircle"),t=0;t<e.length;t++){const r=e[t];var a=r.getAttribute("api");if(null!=a){const n=def.avatar;utils.request(r,a,function(e){const t=e.article_data||[],a=r.getAttribute("limit");t.forEach((e,t)=>{a&&t>=a||(t=(t=(t=(t=(t=(t='<div class="timenode" index="'+t+'"><div class="header"><div class="user-info">')+'<img src="'+(e.avatar||n)+'" onerror="javascript:this.src=\''+n+"';\">")+"<span>"+e.author+"</span>")+"</div><span>"+e.created+"</span>")+'</div><a class="body" href="'+e.link+'" target="_blank" rel="external nofollow noopener noreferrer">')+e.title+"</a></div>",$(r).append(t))})})}}})});