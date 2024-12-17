import{a as y,S as L,i as b}from"./assets/vendor-D0cagnvz.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const w="47439400-a7b90577fcfc36b5c66ee25ec",S="https://pixabay.com/api/";async function u(t,r){return(await y.get(`${S}`,{params:{key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}function m(t){return t.map(({webformatURL:r,largeImageURL:s,tags:d,likes:e,views:i,comments:n,downloads:g})=>`
    <li class="gallery-item">
    <a href="${s}"><img src="${r}" alt="${d}" width="360">
    <ul class="info-list">
    <li class="info-item">
    <h2 class="info-title">Likes</h2>
    <p class="info-text">${e}</p>
    </li>
    <li class="info-item">
     <h2 class="info-title">Views</h2>
    <p class="info-text">${i}</p>
    </li>
    <li class="info-item">
     <h2 class="info-title">Comments</h2>
    <p class="info-text">${n}</p>
    </li>
    <li class="info-item">
     <h2 class="info-title">Dowloads</h2>
    <p class="info-text">${g}</p>
    </li>
    </ul>
    </a>
    </li>`).join("")}const h=document.querySelector(".gallery"),c=document.querySelector(".loader"),v=document.querySelector(".form"),a=document.querySelector(".load-more");let l=1,f="";a.addEventListener("click",q);v.addEventListener("submit",x);function o(t){b.error({position:"topRight",message:t,messageColor:"white",messageSize:"16px",messageLineHeight:"1.5",backgroundColor:"red",iconColor:"white"})}async function x(t){t.preventDefault();const{text:r}=t.target.elements;if(!r.value.trim()){o("Please, fill the field");return}f=r.value.trim(),l=1,c.classList.remove("is-hidden"),h.innerHTML="";try{const s=await u(f,l);c.classList.add("is-hidden"),s.hits.length===0?o("Sorry, there are no images matching your search query. Please try again!"):(h.innerHTML=m(s.hits),p.refresh(),s.hits.length<15||l*15>=s.totalHits?(a.classList.add("load-more-hidden"),o("We're sorry, but you've reached the end of search results.")):a.classList.replace("load-more-hidden","load-more"))}catch(s){c.classList.add("is-hidden"),o(s.message)}t.target.reset()}const p=new L(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250});async function q(){l+=1,a.disabled=!0,c.classList.remove("is-hidden");try{const t=await u(f,l);h.insertAdjacentHTML("beforeend",m(t.hits)),p.refresh();const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:s*2,behavior:"smooth"}),(t.hits.length<15||l*15>=t.totalHits)&&(a.classList.replace("load-more","load-more-hidden"),o("We're sorry, but you've reached the end of search results."))}catch(t){o(t.message)}finally{a.disabled=!1,c.classList.add("is-hidden")}}
//# sourceMappingURL=index.js.map
