---
layout: post
type: page
title: 'Quem Participa'
permalink: '/quem-participa/'
description: 'Sindicatos e grupos que aderem à greve do dia 28 de Abril de 2017, contra as reformas da previdência e das leis trabalhistas.'
keywords: 'sindicatos, grupos, greve, trabalhadores, trabalhadoras'
---
<div class="list-sindicatos" markdown="1">
  • [CUT](http://cut.org.br/noticias/cut-divulga-materiais-sobre-reformas-que-destroem-direitos-trabalhistas-7431/){:target="_blank"}
  • [CTB](http://ctb.org.br/site/especial-abril-de-lutas){:target="_blank"}
  • [UGT](http://www.ugt.org.br/index.php/post/16347-Nenhum-direito-a-menos){:target="_blank"}
  • [Força Sindical](http://www.fsindical.org.br/forca/convocacao-geral){:target="_blank"}
  • [CSB](http://csb.org.br/blog/2017/04/05/csb-convoca-sindicatos-trabalhadores-e-sociedade-para-paralisacoes-no-dia-28-de-abril/){:target="_blank"}
  • [NCST](http://www.ncst.org.br/subpage.php?id=19709_24-04-2017_ncst-intensifica-chamado-para-28-04){:target="_blank"}
  • [Conlutas](http://cspconlutas.org.br/2017/04/comites-de-base-preparam-greve-geral-do-dia-28-de-abril/){:target="_blank"}
  • 
</div>

<ul class="collapsible" data-collapsible="accordion" markdown="1">
{% for state in site.data.estados[0] %}
  <li>
    <div class="collapsible-header">{{ state[0] }}<span class="right">▼</span></div>
    <div class="collapsible-body">
      {% for sin in state[1] %}
        <p>{{ sin }}</p>
      {% endfor %}
    </div>
  </li>
{% endfor %}
</ul>

<!--
---
<div class="video-wrapper video-wrapper-16x9">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/ZuBSaXHahxc" frameborder="0" allowfullscreen></iframe>
</div>

---
<div style="margin:0 auto;text-align:center;">
  <img class="small-image" src="http://www.cnte.org.br/images/stories/2017/greve_geral_nacional_cartaz_final_web.jpg">
  <img class="small-image" src="http://cspconlutas.org.br/wp-content/uploads/2017/04/periferia.jpg">
  <img class="small-image" src="http://cut.org.br/system/uploads/ck/images/praguinha.png">
  <img class="small-image" src="http://csb.org.br/wp-content/uploads/2017/04/face_whats_grevegeral_V3.jpg">
  <img class="small-image" src="http://spbancarios.com.br/sites/default/files/styles/destaque_full/public/destaques/site-dia-28.png">
  <img class="small-image" src="http://i.imgur.com/RXzjh46.png">
</div>
-->
