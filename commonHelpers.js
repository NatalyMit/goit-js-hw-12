import{S as h,a as L,i as m}from"./assets/vendor-ed396e71.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const E=document.querySelector(".gallery-images"),w=new h(".gallery-images a",{captionDelay:250});function p(i){const a=i.map(({webformatURL:l,largeImageURL:s,tags:e,likes:t,views:n,comments:g,downloads:f})=>`<li class = "list-item">
      <a href="${s}" ><img class="search-image" src = "${l}" alt = "${e}" ><div class="options">
      <p class="options-item"> likes:<span class="options-item-span">${t}</span></p>
      <p class="options-item"> views:<span class="options-item-span">${n}</span></p>
      <p class="options-item"> comments:<span class="options-item-span">${g}</span></p>
      <p class="options-item"> downloads:<span class="options-item-span">${f}</span></p></div>
    
      </a>
      
      </li>`).join("");E.insertAdjacentHTML("beforeend",a),w.refresh()}async function u(i,a=1){const l="https://pixabay.com",s="41909271-8b5dab2225a1cd5a9757159a5",e="api/";try{return(await L.get(`${l}/${e}`,{params:{key:s,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40,page:a}})).data}catch(t){iziToast.error({title:"Error",titleSize:"30",messageSize:"25",message:"Sorry! Try later! Server not working"}),console.error(t.message)}}const o={formEl:document.querySelector(".form-search"),galleryEL:document.querySelector(".gallery-images"),loadMoreEl:document.querySelector('[data-action="load-more"]'),preloader:document.getElementById("preloader"),loaderGallery:document.querySelector(".loader-gallery")},r="is-hidden";let c="",d=1,y=0;o.formEl.addEventListener("submit",v);async function v(i){i.preventDefault(),o.galleryEL.innerHTML="",o.loaderGallery.classList.remove(r),d=1;const a=i.currentTarget;if(c=a.elements.query.value.trim(),!c){o.loaderGallery.classList.add(r),o.loadMoreEl.classList.add(r),m.show({title:"❌",messageColor:"white",message:"Sorry, You have not entered any word.Please try again!",position:"topRight",color:"yellow"});return}try{const{hits:s,totalHits:e}=await u(c);if(s.length===0){o.loadMoreEl.classList.add(r),m.show({title:"❌",messageColor:"white",message:"Sorry, we dont have any pictures for your request.Please try again!",messageSize:"25",position:"topRight",color:"yellow"});return}y=Math.ceil(e/40),p(s),s.length>0&&s.length!==e?(o.loadMoreEl.classList.remove(r),o.loadMoreEl.addEventListener("click",l)):o.loadMoreEl.classList.add(r)}catch{console.log(err)}finally{o.loaderGallery.classList.add(r),a.reset()}async function l(){d+=1,o.preloader.classList.remove(r),o.loadMoreEl.classList.add(r),o.loadMoreEl.disabled=!0;const s=document.querySelector(".list-item").getBoundingClientRect();try{const{hits:e}=await u(c,d);p(e)}catch(e){console.log(e)}finally{window.scrollBy({top:s.height*2,left:0,behavior:"smooth"}),o.preloader.classList.add(r),o.loadMoreEl.disabled=!1,o.loadMoreEl.classList.remove(r),d===y&&(o.loadMoreEl.classList.add(r),o.loadMoreEl.removeEventListener("click",l),m.show({title:"Finish",messageColor:"white",message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter",color:"blue"}))}}}
//# sourceMappingURL=commonHelpers.js.map
