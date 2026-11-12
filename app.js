(() => {
  "use strict";
  const STORAGE_KEY = "serie-au-hasard-v1";
  const $ = (id) => document.getElementById(id);
  const els = {
    form: $("series-form"), input: $("series-input"), list: $("series-list"),
    empty: $("empty-library"), count: $("total-count"), available: $("available-count"),
    draw: $("draw-btn"), reroll: $("reroll-btn"), stage: document.querySelector(".draw-stage"),
    result: $("result-name"), kicker: $("result-kicker"), hint: $("result-hint"),
    history: $("history-list"), clearHistory: $("clear-history"), toast: $("toast"),
    dialog: $("edit-dialog"), editForm: $("edit-form"), editInput: $("edit-input")
  };
  let state = load();
  let editingId = null;
  let toastTimer;

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.series) && Array.isArray(saved.history)) return saved;
    } catch (_) {}
    return {series: [], history: [], lastId: null};
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (_) { showToast("Impossible de sauvegarder : espace de stockage indisponible."); }
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function showToast(message) {
    els.toast.textContent = message; els.toast.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2300);
  }
  function activeSeries() { return state.series.filter(s => s.active); }
  function render() {
    const active = activeSeries();
    els.count.textContent = state.series.length;
    els.available.textContent = active.length;
    els.empty.hidden = state.series.length > 0;
    els.list.innerHTML = state.series.map(s => `
      <li class="series-row" data-id="${escapeHtml(s.id)}">
        <span class="series-title ${s.active ? "" : "inactive"}">${escapeHtml(s.name)}${s.active ? "" : '<span class="status-tag">EXCLUE</span>'}</span>
        <button class="icon-btn" data-action="toggle" aria-label="${s.active ? "Exclure" : "Réintégrer"} ${escapeHtml(s.name)}" title="${s.active ? "Exclure du tirage" : "Réintégrer"}">${s.active ? "◉" : "○"}</button>
        <button class="icon-btn" data-action="edit" aria-label="Modifier ${escapeHtml(s.name)}" title="Modifier">✎</button>
        <button class="icon-btn delete" data-action="delete" aria-label="Supprimer ${escapeHtml(s.name)}" title="Supprimer">×</button>
      </li>`).join("");
    els.draw.disabled = active.length === 0;
    els.draw.innerHTML = active.length ? '<span class="play-icon">▶</span> TIRER AU SORT' : "AJOUTE UNE SÉRIE POUR JOUER";
    if (!state.history.length) els.history.innerHTML = '<p class="empty-small">Tes prochains tirages apparaîtront ici.</p>';
    else els.history.innerHTML = state.history.slice(0, 8).map(h =>
      `<div class="history-item"><strong>${escapeHtml(h.name)}</strong><span>${escapeHtml(h.date)}</span></div>`).join("");
  }
  function addSeries(name) {
    const clean = name.trim();
    if (!clean) return;
    if (state.series.some(s => s.name.toLocaleLowerCase("fr") === clean.toLocaleLowerCase("fr"))) {
      showToast("Cette série est déjà dans ta liste."); return;
    }
    state.series.push({id: uid(), name: clean, active: true});
    save(); render(); els.input.value = ""; els.input.focus(); showToast("Série ajoutée à ta bibliothèque !");
  }
  els.form.addEventListener("submit", e => { e.preventDefault(); addSeries(els.input.value); });
  els.list.addEventListener("click", e => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const row = btn.closest(".series-row");
    const item = state.series.find(s => s.id === row.dataset.id);
    if (!item) return;
    const action = btn.dataset.action;
    if (action === "toggle") {
      item.active = !item.active; save(); render();
      showToast(item.active ? "Série réintégrée au tirage." : "Série exclue temporairement.");
    } else if (action === "edit") {
      editingId = item.id; els.editInput.value = item.name; els.dialog.showModal(); els.editInput.focus();
    } else if (action === "delete") {
      if (!confirm(`Supprimer définitivement « ${item.name} » de ta liste ?`)) return;
      state.series = state.series.filter(s => s.id !== item.id);
      if (state.lastId === item.id) state.lastId = null;
      save(); render(); showToast("Série supprimée.");
    }
  });
  els.editForm.addEventListener("submit", e => {
    if (e.submitter && e.submitter.id === "save-edit") {
      e.preventDefault();
      const item = state.series.find(s => s.id === editingId);
      const name = els.editInput.value.trim();
      if (!name) return;
      if (state.series.some(s => s.id !== editingId && s.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr"))) {
        showToast("Une série porte déjà ce nom."); return;
      }
      if (item) { item.name = name; save(); render(); showToast("Nom mis à jour."); }
      els.dialog.close();
    }
  });
  function draw() {
    const pool = activeSeries();
    if (!pool.length) { showToast("Ajoute ou réintègre une série pour commencer."); return; }
    let candidates = pool;
    if (pool.length > 1 && state.lastId) candidates = pool.filter(s => s.id !== state.lastId);
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    els.draw.disabled = true; els.reroll.classList.add("hidden");
    els.stage.classList.add("spinning");
    els.kicker.textContent = "LE HASARD CHOISIT...";
    els.result.textContent = "Mystère";
    els.hint.textContent = "Encore une petite seconde";
    window.setTimeout(() => {
      els.stage.classList.remove("spinning");
      els.kicker.textContent = "CE SOIR, C'EST...";
      els.result.textContent = chosen.name;
      els.hint.textContent = "Installe-toi confortablement. 🍿";
      state.lastId = chosen.id;
      state.history.unshift({id: chosen.id, name: chosen.name, date: new Date().toLocaleString("fr-FR", {day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit"})});
      state.history = state.history.slice(0, 30);
      save(); render(); els.reroll.classList.remove("hidden");
    }, 1050);
  }
  els.draw.addEventListener("click", draw);
  els.reroll.addEventListener("click", draw);
  els.clearHistory.addEventListener("click", () => {
    if (!state.history.length) return;
    if (confirm("Effacer tout l'historique des tirages ?")) { state.history = []; save(); render(); showToast("Historique effacé."); }
  });
  render();

  // Le service worker met l'application en cache pour les prochaines ouvertures hors connexion.
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
})();