const {stories,esc,image,storyUrl}=window.FokusData;
const root=document.querySelector("#articleRoot");
const id=Number(new URLSearchParams(location.search).get("id"));
const story=stories.find(item=>item.id===id);

if(!story){
  document.title="Artiklen blev ikke fundet — Fokus";
  root.innerHTML=`<div class="notfound"><h1>Artiklen blev ikke fundet</h1><p>Linket er muligvis forkert.</p><a href="index.html">Gå tilbage til forsiden →</a></div>`;
}else{
  const related=stories.filter(item=>item.c===story.c&&item.id!==story.id).slice(0,4);
  document.title=`${story.t} — Fokus`;
  document.querySelector('meta[name="description"]')?.setAttribute("content",story.d);
  document.querySelector("#headerCategory").textContent=story.c;
  root.innerHTML=`<article class="articlewrap"><nav class="crumb" aria-label="Brødkrummer"><a href="index.html">Forsiden</a><span>›</span><a href="index.html?category=${encodeURIComponent(story.c)}">${story.c}</a></nav><span class="tag">${story.c}</span><h1 class="headline">${esc(story.t)}</h1><p class="dek">${esc(story.d)}</p><div class="byline"><span>1. september 2026 · ${story.time}</span><span>Af Fokus-redaktionen · 3 min. læsetid</span></div><div class="articleimg">${image(story,true)}</div><div class="articletext">${story.body.map(p=>`<p>${esc(p)}</p>`).join("")}</div><div class="sourcebox"><b>Originalkilde:</b> Denne artikel er et selvstændigt resumé baseret på <a href="${story.url}" target="_blank" rel="noopener">${esc(story.src)}</a>. Følg linket for originalartiklen og eventuelle senere opdateringer.</div><section class="related"><div class="relatedhead"><h2>Mere fra ${story.c}</h2><a href="index.html?category=${encodeURIComponent(story.c)}">Se alle →</a></div><div class="grid">${related.map(item=>`<a class="card" href="${storyUrl(item.id)}"><div class="thumb">${image(item)}<span class="tag">${item.c}</span></div><div class="body"><div class="meta">${item.time} · 3 min.</div><h3>${esc(item.t)}</h3><p>${esc(item.d)}</p><span class="more">Læs artiklen →</span></div></a>`).join("")}</div></section></article>`;
}

addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector("#progress").style.width=`${max>0?scrollY/max*100:0}%`},{passive:true});
