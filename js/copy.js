!function(n,t,o){var i;i="",i+='<button class="btn-copy" data-clipboard-snippet="">',i+='  <i class="icon icon-copy"></i><span>Copy</span>',i+="</button>",$(".highlight .code pre").before(i),new ClipboardJS(".btn-copy",{target:function(n){return n.nextElementSibling}})}(window,document);