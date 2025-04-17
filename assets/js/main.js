// Mobile nav toggle
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('site-nav');
if (toggle) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}
// Dynamic year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Render featured posts on home
function renderFeatured() {
  const container = document.getElementById('featuredPosts');
  if (!container) return;
  const featured = posts.slice(0, 3);
  container.innerHTML = featured.map(post => postCard(post)).join('');
}

// Render list on blog page with pagination
function renderBlogList() {
  const container = document.getElementById('blogList');
  const pager = document.getElementById('pagination');
  if (!container || !pager) return;
  const perPage = 5;
  let current = 1;
  const total = Math.ceil(posts.length / perPage);

  function showPage(page) {
    current = page;
    const start = (page - 1) * perPage;
    const paginated = posts.slice(start, start + perPage);
    container.innerHTML = paginated.map(articleRow).join('');
    pager.innerHTML = Array.from({ length: total }, (_, i) => i + 1)
      .map(i => `<button class="${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`).join('');
  }
  pager.addEventListener('click', e => {
    if (e.target.dataset.page) showPage(Number(e.target.dataset.page));
  });
  showPage(1);
}

function postCard(post) {
  return `<article class="post-card"><img src="${post.cover}" alt="${post.title}" /><div class="card-content"><h3><a href="/posts/${post.slug}.html">${post.title}</a></h3><p>${post.excerpt}</p><p class="meta">${new Date(post.date).toLocaleDateString()}</p></div></article>`;
}
function articleRow(post) {
  return `<article><h2><a href="/posts/${post.slug}.html">${post.title}</a></h2><p class="meta">${new Date(post.date).toLocaleDateString()} • ${post.author}</p><p>${post.excerpt}</p></article>`;
}

// Simple router based on page
if (document.body.contains(document.getElementById('featuredPosts'))) renderFeatured();
if (document.body.contains(document.getElementById('blogList'))) renderBlogList();

/* === Theme Toggle (Lowlight Blog) === */
(function(){
  const toggle = document.getElementById('themeToggle');
  if(!toggle) return;

  const apply = theme => document.documentElement.classList.toggle('light', theme === 'light');
  const stored = localStorage.getItem('theme');
  apply(stored ? stored : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

  toggle.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    apply(next); localStorage.setItem('theme', next);
  });
})();