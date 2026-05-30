/* =========================================================
   site.js — shared chrome (nav + footer), scroll reveals,
   stat counters, active-link, mobile menu
   ========================================================= */
(function () {
  const inSub = /\/html\//.test(location.pathname);
  const toRoot = inSub ? '../' : '';
  const toHtml = inSub ? '' : 'html/';

  const PAGES = [
    { href: toRoot + "index.html",        label: "홈" },
    { href: toHtml + "career.html",       label: "경력" },
    { href: toHtml + "teenple.html",      label: "TeenPle" },
    { href: toHtml + "drone.html",        label: "배달의드론" },
    { href: toHtml + "lms.html",          label: "LMS" },
  ];
  const contactHref = toHtml + "contact.html";

  const CONTACT = {
    tel: "010-5346-8130",
    email: "leejd8130@naver.com",
    github: "github.com/hongwangki",
    blog: "leejd8130.tistory.com",
  };

  let path = location.pathname.split("/").pop() || "index.html";
  if (path === "") path = "index.html";

  const ic = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C18 4.6 19 4.9 19 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>',
    blog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m3 6 9 6 9-6"/></svg>',
    tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z"/></svg>',
  };

  /* ---------- NAV ---------- */
  const links = PAGES.map(p =>
    `<a class="nav-link${p.href.endsWith(path) ? " active" : ""}" href="${p.href}">${p.label}</a>`
  ).join("");

  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <a class="nav-brand" href="${toRoot}index.html">
      <span class="nav-mark"><span>H</span></span>
      홍왕기 <span class="mono" style="color:var(--ink-3);font-size:13px;font-weight:500;">/ Backend</span>
    </a>
    <div class="nav-links" id="navLinks">
      ${links}
      <a class="nav-cta" href="${contactHref}">Contact</a>
    </div>
    <button class="nav-toggle" id="navToggle" aria-label="menu"><span></span><span></span><span></span></button>
  `;
  document.body.prepend(nav);

  const toggle = nav.querySelector("#navToggle");
  const navLinks = nav.querySelector("#navLinks");
  toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.addEventListener("click", e => { if (e.target.tagName === "A") navLinks.classList.remove("open"); });

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- FOOTER ---------- */
  if (!document.body.hasAttribute("data-no-footer")) {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
      <div class="wrap footer-inner">
        <div>
          <h3>함께 성장하는<br>백엔드 개발자, 홍왕기</h3>
          <p class="f-sub">기술의 깊이를 더하며, 팀과 함께 성장하는 협업 중심 개발자가 되겠습니다.</p>
        </div>
        <div class="footer-links">
          <a class="f-link" href="https://${CONTACT.github}" target="_blank" rel="noopener"><span class="ic">${ic.github}</span>${CONTACT.github}</a>
          <a class="f-link" href="https://${CONTACT.blog}" target="_blank" rel="noopener"><span class="ic">${ic.blog}</span>${CONTACT.blog}</a>
          <a class="f-link" href="mailto:${CONTACT.email}"><span class="ic">${ic.email}</span>${CONTACT.email}</a>
          <a class="f-link" href="tel:${CONTACT.tel.replace(/-/g,'')}"><span class="ic">${ic.tel}</span>${CONTACT.tel}</a>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span>© 2026 Hong Wang Ki — Backend Developer Portfolio</span>
        <span>Designed &amp; built with care</span>
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
