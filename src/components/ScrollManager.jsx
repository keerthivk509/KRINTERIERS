import {useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';

/* 1) scrolls to top on a new page, or to #section after navigating to "/#section"
   2) makes in-page links such as href="#contact" work from the submenu pages too */
export default function ScrollManager(){
  const {pathname,hash}=useLocation();
  const navigate=useNavigate();

  useEffect(()=>{
    if(!hash){window.scrollTo(0,0);return}
    let tries=0,timer;
    const go=()=>{
      const el=document.querySelector(hash);
      if(el)el.scrollIntoView({behavior:'smooth'});
      else if(tries++<30)timer=setTimeout(go,50);
    };
    go();
    return()=>clearTimeout(timer);
  },[pathname,hash]);

  useEffect(()=>{
    const onClick=e=>{
      const a=e.target.closest&&e.target.closest('a[href^="#"]');
      if(a&&window.location.pathname!=='/'){e.preventDefault();navigate('/'+a.getAttribute('href'))}
    };
    document.addEventListener('click',onClick);
    return()=>document.removeEventListener('click',onClick);
  },[navigate]);
  return null;
}
