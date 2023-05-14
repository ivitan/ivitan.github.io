console.log("\n%c Stellar v"+stellar.version+" %c\n"+stellar.github+"\n","color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px","margin-top:8px");const util={diffDate:(e,t=!1)=>{const l=new Date,a=new Date(e);var s,r,n,e=l.getTime()-a.getTime(),i=864e5;let o;return o=t?(t=e/i,r=e/36e5,n=e/6e4,12<(s=e/2592e6)?null:1<=s?parseInt(s)+" "+stellar.config.date_suffix.month:1<=t?parseInt(t)+" "+stellar.config.date_suffix.day:1<=r?parseInt(r)+" "+stellar.config.date_suffix.hour:1<=n?parseInt(n)+" "+stellar.config.date_suffix.min:stellar.config.date_suffix.just):parseInt(e/i)},copy:(e,t)=>{const l=document.getElementById(e);l&&(l.select(),document.execCommand("Copy"),t&&0<t.length&&hud.toast(t))},toggle:e=>{const t=document.getElementById(e);t&&t.classList.toggle("display")}},hud={toast:(e,t)=>{t=isNaN(t)?2e3:t;var l=document.createElement("div");l.classList.add("toast"),l.innerHTML=e,document.body.appendChild(l),setTimeout(function(){l.style.webkitTransition="-webkit-transform 0.5s ease-in, opacity 0.5s ease-in",l.style.opacity="0",setTimeout(function(){document.body.removeChild(l)},500)},t)}},l_body=document.querySelector(".l_body"),sidebar={toggle:()=>{l_body&&(l_body.classList.add("mobile"),l_body.classList.toggle("sidebar"))}},init={toc:()=>{stellar.jQuery(()=>{var d=[];$("article.md-text :header").each(function(e,t){d.push(t)}),$(document,window).scroll(function(e){var t,l=$(this).scrollTop(),a=null;for(t in d){var s=$(d[t]);s.offset().top>l+32||(!a||s.offset().top>=a.offset().top)&&(a=s)}if(a){$("#data-toc a.toc-link").removeClass("active");var r="#"+a.attr("id");if("#undefined"!=r){const i=$('#data-toc a.toc-link[href="'+encodeURI(r)+'"]');if(0<i.length){i.addClass("active");const o=document.querySelector(".widgets"),c=document.querySelector('#data-toc a.toc-link[href="'+encodeURI(r)+'"]');var r=c.getBoundingClientRect().bottom-o.getBoundingClientRect().bottom+100,n=c.getBoundingClientRect().top-o.getBoundingClientRect().top-64;n<0?o.scrollBy(0,n):0<r&&o.scrollBy(0,r)}}else $("#data-toc a.toc-link:first").addClass("active")}})})},sidebar:()=>{stellar.jQuery(()=>{$("#data-toc a.toc-link").click(function(e){l_body.classList.remove("sidebar")})})},relativeDate:e=>{e.forEach(e=>{const t=e;e=t.getAttribute("datetime"),e=util.diffDate(e,!0);e&&(t.innerText=e)})},registerTabsTag:function(){document.querySelectorAll(".tabs .nav-tabs .tab").forEach(l=>{l.addEventListener("click",e=>{if(e.preventDefault(),!l.classList.contains("active")){[...l.parentNode.children].forEach(e=>{e.classList.toggle("active",e===l)});const t=document.getElementById(l.querySelector("a").getAttribute("href").replace("#",""));[...t.parentNode.children].forEach(e=>{e.classList.toggle("active",e===t)}),t.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))}};if(init.toc(),init.sidebar(),init.relativeDate(document.querySelectorAll("#post-meta time")),init.registerTabsTag(),stellar.plugins.scrollreveal&&stellar.loadScript(stellar.plugins.scrollreveal.js).then(function(){ScrollReveal().reveal("body .reveal",{distance:stellar.plugins.scrollreveal.distance,duration:stellar.plugins.scrollreveal.duration,interval:stellar.plugins.scrollreveal.interval,scale:stellar.plugins.scrollreveal.scale,easing:"ease-out"})}),stellar.plugins.lazyload&&(stellar.loadScript(stellar.plugins.lazyload.js,{defer:!0}),window.lazyLoadOptions={elements_selector:".lazy"},window.addEventListener("LazyLoad::Initialized",function(e){window.lazyLoadInstance=e.detail.instance},!1),document.addEventListener("DOMContentLoaded",function(){window.lazyLoadInstance?.update()})),stellar.plugins.stellar)for(let t of Object.keys(stellar.plugins.stellar)){let e=stellar.plugins.stellar[t];if("linkcard"==t)stellar.loadScript(e,{defer:!0}).then(function(){setCardLink(document.querySelectorAll("a.link-card[cardlink]"))});else{const _=document.getElementsByClassName("stellar-"+t+"-api");null!=_&&0<_.length&&stellar.jQuery(()=>{stellar.loadScript(e,{defer:!0}),"timeline"==t&&stellar.loadScript(stellar.plugins.marked)})}}if(stellar.plugins.swiper){const aa=document.getElementById("swiper-api");null!=aa&&(stellar.loadCSS(stellar.plugins.swiper.css),stellar.loadScript(stellar.plugins.swiper.js,{defer:!0}).then(function(){var e=aa.getAttribute("effect")||"";new Swiper(".swiper#swiper-api",{slidesPerView:"auto",spaceBetween:8,centeredSlides:!0,effect:e,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}))}if(stellar.plugins.preload&&("instant_page"==stellar.plugins.preload.service?stellar.loadScript(stellar.plugins.preload.instant_page,{defer:!0,type:"module",integrity:"sha384-OeDn4XE77tdHo8pGtE1apMPmAipjoxUQ++eeJa6EtJCfHlvijigWiJpD7VDPWXV1"}):"flying_pages"==stellar.plugins.preload.service&&(window.FPConfig={delay:0,ignoreKeywords:[],maxRPS:5,hoverDelay:25},stellar.loadScript(stellar.plugins.preload.flying_pages,{defer:!0}))),stellar.plugins.fancybox){let e="img[fancybox]:not(.error)";stellar.plugins.fancybox.selector&&(e+=", "+stellar.plugins.fancybox.selector),0!==document.querySelectorAll(e).length&&(stellar.loadCSS(stellar.plugins.fancybox.css),stellar.loadScript(stellar.plugins.fancybox.js,{defer:!0}).then(function(){Fancybox.bind(e,{groupAll:!0,hideScrollbar:!1,Thumbs:{autoStart:!1},caption:function(e,t,l){return l.$trigger.alt||null}})}))}stellar.search.service&&"local_search"==stellar.search.service&&stellar.jQuery(()=>{stellar.loadScript("/js/search/local-search.js",{defer:!0}).then(function(){var e,l=$("input#search-input");0!=l.length&&(e=document.querySelector("div#search-result"),l.focus(function(){var e=stellar.search[stellar.search.service]?.path||"/search.json",t=(e.startsWith("/")&&(e=e.substring(1)),e=stellar.config.root+e,l.attr("data-filter")||"");searchFunc(e,t,"search-input","search-result")}),l.keydown(function(e){13==e.which&&e.preventDefault()}),new MutationObserver(function(e,t){1==e.length&&(e[0].addedNodes.length?$(".search-wrapper").removeClass("noresult"):e[0].removedNodes.length&&$(".search-wrapper").addClass("noresult"))}).observe(e,{childList:!0}))})}),stellar.plugins.heti&&(stellar.loadCSS(stellar.plugins.heti.css),stellar.loadScript(stellar.plugins.heti.js,{defer:!0}).then(function(){var e=new Heti(".heti");!function(){var e;for(e of document.querySelectorAll(this.rootSelector))this.spacingElement(e)}.bind(e)(),stellar.plugins.heti.enable=!1})),stellar.plugins.copycode&&stellar.loadScript(stellar.plugins.copycode.js,{defer:!0});