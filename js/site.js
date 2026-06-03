/* =========================================================
   site.js — shared chrome (nav + footer), scroll reveals,
   stat counters, active-link, mobile menu
   ========================================================= */
(function () {
  const inSub = /\/html\//.test(location.pathname);
  const toRoot = inSub ? '../' : '';
  const toHtml = inSub ? '' : 'html/';

  const CONTACT = {
    email: "leejd8130@naver.com",
    github: "github.com/hongwangki",
    blog: "leejd8130.tistory.com",
  };

  const ic = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C18 4.6 19 4.9 19 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>',
    blog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m3 6 9 6 9-6"/></svg>',
  };

  /* ---------- NAV (모든 페이지 공통) ---------- */
  {
    // 홈은 해시 스크롤(부드럽게), 서브페이지는 홈으로 이동 후 해당 섹션
    const home = inSub ? `${toRoot}index.html` : "";
    const nav = document.createElement("nav");
    nav.className = "nav";
    nav.innerHTML = `
      <a class="nav-brand" href="${home}#about">
        <span class="nav-mark"><span>HW</span></span>
        <span>홍왕기 · Backend Developer</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links">
        <a class="nav-link" href="${home}#about">홈</a>
        <a class="nav-link" href="${home}#experience">경력</a>
        <a class="nav-link" href="${home}#projects">프로젝트</a>
        <a class="nav-link" href="${home}#contact">연락처</a>
      </div>
    `;
    document.body.prepend(nav);

    const navToggle = nav.querySelector(".nav-toggle");
    const navLinks = nav.querySelector(".nav-links");
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open.toString());
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
    const setNavScrolled = () => nav.classList.toggle("scrolled", window.scrollY > 12);
    window.addEventListener("scroll", setNavScrolled, { passive: true });
    setNavScrolled();
  }

  /* ---------- FOOTER ---------- */
  if (!document.body.hasAttribute("data-no-footer")) {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
      <div class="wrap footer-top">
        <div class="f-brand">
          <div class="ft">
            <div class="nm">홍왕기 <span>Hong Wang Ki</span></div>
            <div class="tl">안정적인 서버를 설계하는 백엔드 개발자</div>
          </div>
        </div>
        <div class="f-social">
          <a class="f-soc" href="https://${CONTACT.github}" target="_blank" rel="noopener" aria-label="GitHub">${ic.github}</a>
          <a class="f-soc" href="https://${CONTACT.blog}" target="_blank" rel="noopener" aria-label="Blog">${ic.blog}</a>
          <a class="f-soc" href="mailto:${CONTACT.email}" aria-label="Email">${ic.email}</a>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span>© 2026 Hong Wang Ki — Backend Developer Portfolio</span>
        <a href="${toRoot}index.html#about">맨 위로 ↑</a>
      </div>
    `;
    document.body.appendChild(footer);
  }

  /* ---------- REVEAL ---------- */
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  const showEl = (el) => el.classList.add("in");
  const inView = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < (window.innerHeight || 800) * 0.96 && r.bottom > 0;
  };
  reveals.forEach(el => { if (inView(el)) showEl(el); });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { showEl(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  reveals.forEach(el => { if (!el.classList.contains("in")) io.observe(el); });

  const sweep = () => reveals.forEach(el => { if (!el.classList.contains("in") && inView(el)) showEl(el); });
  window.addEventListener("scroll", sweep, { passive: true });
  setTimeout(() => reveals.forEach(showEl), 2500);

  /* ---------- STAT COUNTERS ---------- */
  const fmt = (v, dec) => dec > 0 ? v.toFixed(dec) : Math.round(v).toString();
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const to = parseFloat(el.dataset.to);
      const dec = parseInt(el.dataset.dec || "0", 10);
      const pre = el.dataset.pre || "";
      const suf = el.dataset.suf || "";
      const dur = 1400;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + fmt(to * eased, dec) + suf;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = pre + fmt(to, dec) + suf;
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll("[data-count]").forEach(el => countIO.observe(el));

  /* ---------- page fade-in ---------- */
  document.body.classList.add("page-ready");
})();
