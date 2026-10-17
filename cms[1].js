/* Contenido editable desde /admin/ (Decap CMS) */
(async function () {
  try {
    const resp = await fetch('/contenido/informacion.json', {cache: 'no-cache'});
    if (!resp.ok) return;
    const data = await resp.json();
    function setText(selector, value) {
      if (value === undefined || value === null) return;
      document.querySelectorAll(selector).forEach(el => { el.textContent = String(value); });
    }
    setText('[data-cms="titulo"]', data.titulo);
    setText('[data-cms="presentacion"]', data.presentacion);
    if (typeof data.precio === 'number' && Number.isFinite(data.precio) && data.precio >= 0) {
      setText('[data-cms="precio"]', new Intl.NumberFormat('es-ES', {maximumFractionDigits:2}).format(data.precio) + ' €');
    }
    if (typeof data.calendar === 'string' && /^https:\/\/calendar\.app\.google\/[A-Za-z0-9_-]+$/.test(data.calendar)) {
      document.querySelectorAll('[data-cms="calendar"]').forEach(a => { a.href = data.calendar; });
    }
    const portrait = document.querySelector('[data-cms="foto"]');
    if (portrait && typeof data.foto === 'string' && data.foto.trim()) {
      const source = data.foto.trim();
      if (source.startsWith('/imagenes/') || source.startsWith('imagenes/')) {
        const img = document.createElement('img');
        img.src = source;
        img.alt = 'Retrato profesional de Óscar';
        img.loading = 'lazy';
        portrait.replaceChildren(img);
      }
    }
  } catch (err) {
    console.warn('No se pudieron cargar los datos CMS; se muestra el contenido de respaldo.');
  }
})();
