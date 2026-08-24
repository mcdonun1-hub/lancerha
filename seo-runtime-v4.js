(() => {
  const homePath = '/';
  const routes = [
    ['/link-sazi-seo', 'لینک سازی', 'خرید بک لینک و خدمات لینک سازی حرفه‌ای'],
    ['/honar-va-tarahi-grafic', 'هنر و طراحی گرافیک', 'خرید خدمات طراحی گرافیک حرفه‌ای'],
    ['/seo-va-behineh-sazi-site', 'سئو و بهینه سازی سایت', 'خرید خدمات سئو و بهینه سازی سایت'],
    ['/programming-web-app', 'برنامه نویسی وب و اپلیکیشن', 'خرید خدمات برنامه نویسی وب و موبایل'],
    ['/dastiar-majazi-online', 'دستیار مجازی', 'خرید خدمات دستیار مجازی حرفه‌ای'],
    ['/seo-mahali-google-maps', 'سئو محلی و گوگل مپ', 'خرید خدمات سئو محلی و گوگل مپ'],
    ['/mehman-nevisi-rportaj', 'مهمان نویسی و رپورتاژ', 'خرید رپورتاژ و خدمات مهمان نویسی'],
    ['/khadamat/', 'خدمات', 'جزئیات خدمات در لینک مارکت']
  ];
  const apply = () => {
    const route = routes.find(([prefix]) => location.pathname.startsWith(prefix));
    if (!route) return;
    const canonicalUrl = location.origin + location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
    document.title = route[2] + ' | لینک مارکت';
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.appendChild(description); }
    description.content = route[2] + ' از فروشندگان معتبر، مقایسه قیمت، سفارش امن و پشتیبانی در لینک مارکت.';
    let og = document.querySelector('meta[property="og:url"]');
    if (!og) { og = document.createElement('meta'); og.setAttribute('property','og:url'); document.head.appendChild(og); }
    og.content = canonicalUrl;
    let nav = document.getElementById('category-seo-breadcrumb');
    if (!nav) {
      nav = document.createElement('nav');
      nav.id = 'category-seo-breadcrumb';
      nav.setAttribute('aria-label','مسیر راهنما');
      nav.dir = 'rtl';
      nav.style.cssText = 'max-width:1280px;margin:12px auto 0;padding:10px 16px;font-family:Vazirmatn,Vazir,sans-serif;font-size:14px;color:#4b5563';
      const main = document.querySelector('main');
      if (main && main.parentNode) main.parentNode.insertBefore(nav, main); else document.getElementById('root')?.prepend(nav);
    }
    nav.innerHTML = '<a href="' + homePath + '" style="color:#2563eb;text-decoration:none">خانه</a><span aria-hidden="true" style="margin:0 8px">/</span><span>' + route[1] + '</span>';
    let schema = document.getElementById('category-breadcrumb-schema');
    if (!schema) { schema = document.createElement('script'); schema.id='category-breadcrumb-schema'; schema.type='application/ld+json'; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'خانه','item':location.origin+homePath},{'@type':'ListItem','position':2,'name':route[1],'item':canonicalUrl}]});
  };
  addEventListener('popstate', () => setTimeout(apply, 0));
  addEventListener('DOMContentLoaded', apply);
  const observer = new MutationObserver(() => { const route=routes.find(([prefix])=>location.pathname.startsWith(prefix)); const canonical=document.querySelector('link[rel="canonical"]'); if(route && (!document.getElementById('category-seo-breadcrumb') || !canonical || canonical.getAttribute('href') !== location.origin + location.pathname)) apply(); });
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['href']});
  setTimeout(apply, 0);
  setTimeout(apply, 500);
})();
