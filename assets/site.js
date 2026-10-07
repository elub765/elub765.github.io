/* Native disclosure navigation: hover on desktop, tap or keyboard everywhere. */
document.querySelectorAll('.projects-menu').forEach(menu => {
  const summary = menu.querySelector('summary');
  const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
  summary.addEventListener('click', event => {
    // A mouse entering the summary has already opened it; keep the click from closing it.
    if (hover.matches && event.detail > 0) { event.preventDefault(); menu.open = true; }
  });
  menu.addEventListener('pointerenter', () => { if (hover.matches) menu.open = true; });
  menu.addEventListener('pointerleave', () => {
    if (hover.matches && !menu.contains(document.activeElement)) menu.open = false;
  });
  menu.addEventListener('focusout', () => {
    setTimeout(() => { if (!menu.contains(document.activeElement) && !menu.matches(':hover')) menu.open = false; }, 0);
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') { menu.open = false; summary.focus(); }
  });
  document.addEventListener('pointerdown', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});

/* The editable image list is the only place to add photo/CAD filenames and captions. */
const mediaRequest = fetch('/assets/media.json', {cache:'no-cache'})
  .then(response => { if (!response.ok) throw new Error('Image list unavailable'); return response.json(); })
  .catch(() => null);

document.querySelectorAll('[data-gallery]').forEach(async gallery => {
  const config = await mediaRequest;
  const initialButtons = [...gallery.querySelectorAll('.gallery-thumb')];
  const fallback = initialButtons.map(button => ({src:button.dataset.src, kind:button.dataset.kind, title:button.dataset.title, caption:button.dataset.caption}));
  const configured = config?.[gallery.dataset.gallery];
  const items = Array.isArray(configured) && configured.length ? configured : fallback;
  const icons = {
    photo: initialButtons.find(button => button.dataset.kind === 'photo')?.querySelector('svg'),
    cad: initialButtons.find(button => button.dataset.kind === 'cad')?.querySelector('svg')
  };
  const visual = gallery.querySelector('[data-visual]');
  const title = gallery.querySelector('[data-gallery-title]');
  const caption = gallery.querySelector('[data-gallery-caption]');
  const count = gallery.querySelector('.gallery-count');
  const thumbnails = gallery.querySelector('.gallery-thumbnails');
  let selected = 0;

  function renderVisual(parent, item) {
    parent.replaceChildren();
    if (item.src) {
      const image = document.createElement('img');
      image.src = item.src;
      image.alt = item.alt || item.title;
      image.decoding = 'async';
      image.addEventListener('error', () => renderPlaceholder(parent, item), {once:true});
      parent.append(image);
    } else renderPlaceholder(parent, item);
  }
  function renderPlaceholder(parent, item) {
    parent.replaceChildren();
    const icon = icons[item.kind === 'cad' ? 'cad' : 'photo'];
    if (icon) parent.append(icon.cloneNode(true));
    const label = document.createElement('span');
    label.className = 'eyebrow';
    label.textContent = item.kind === 'cad' ? 'CAD' : 'Photo';
    parent.append(label);
  }
  thumbnails.replaceChildren();
  const buttons = items.map((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-thumb';
    const thumbVisual = document.createElement('span');
    thumbVisual.className = 'thumb-visual';
    renderVisual(thumbVisual, item);
    const thumbTitle = document.createElement('span');
    thumbTitle.className = 'thumb-title';
    thumbTitle.textContent = item.title;
    button.append(thumbVisual, thumbTitle);
    button.addEventListener('click', () => select(index));
    thumbnails.append(button);
    return button;
  });
  function select(index) {
    selected = (index + items.length) % items.length;
    const item = items[selected];
    renderVisual(visual, item);
    visual.classList.toggle('is-cad', item.kind === 'cad');
    title.textContent = item.title;
    caption.textContent = item.caption || '';
    count.textContent = `${String(selected+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
    buttons.forEach((button, index) => {
      button.classList.toggle('is-selected', index === selected);
      button.setAttribute('aria-pressed', String(index === selected));
    });
  }
  gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => select(selected-1));
  gallery.querySelector('[data-gallery-next]').addEventListener('click', () => select(selected+1));
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      select(selected + (event.key === 'ArrowRight' ? 1 : -1));
      buttons[selected].focus();
    }
  });
  select(0);
});

mediaRequest.then(config => {
  const portrait = document.querySelector('[data-portrait]');
  if (!portrait || !config?.portrait?.src) return;
  const image = document.createElement('img');
  image.src = config.portrait.src;
  image.alt = config.portrait.alt || 'Evan Lubarsky';
  image.addEventListener('load', () => { portrait.replaceChildren(image); portrait.classList.add('has-photo'); });
});
