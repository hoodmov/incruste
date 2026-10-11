/**
 * La Grande Incruste 3 – textes en direct
 * Relais entre les Google Docs des sketchs et le site (hoodmov.github.io/incruste).
 * Déploiement : Déployer > Nouveau déploiement > Application Web
 *   - Exécuter en tant que : Moi
 *   - Accès : Tout le monde
 * Puis copier l'URL qui se termine par /exec.
 */
function doGet(e) {
  var p = (e && e.parameter) || {};
  var ids = String(p.ids || '').split(',').map(function (s) { return s.trim(); })
    .filter(function (s) { return /^[A-Za-z0-9_-]{20,}$/.test(s); }).slice(0, 12);
  var cache = CacheService.getScriptCache(), out = {};
  ids.forEach(function (id) {
    var hit = cache.get(id);
    if (hit) { out[id] = JSON.parse(hit); return; }
    try {
      var doc = DocumentApp.openById(id), x;
      var tabs = doc.getTabs ? doc.getTabs() : [];
      if (tabs.length > 1) {
        x = tabs.map(function (t, i) { return '# Onglet ' + (i + 1) + '\n\n' + bodyMd(t.asDocumentTab().getBody()); }).join('\n\n');
      } else {
        x = bodyMd(doc.getBody());
      }
      var r = { t: doc.getName(), x: x, m: DriveApp.getFileById(id).getLastUpdated().getTime() };
      cache.put(id, JSON.stringify(r), 30);
      out[id] = r;
    } catch (err) { out[id] = { err: String(err) }; }
  });
  var json = JSON.stringify({ ok: true, at: Date.now(), docs: out });
  var cb = String(p.callback || '');
  if (/^[A-Za-z_$][\w$]{0,40}$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + json + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function bodyMd(body) {
  var out = [], H = DocumentApp.ParagraphHeading;
  for (var i = 0; i < body.getNumChildren(); i++) {
    var el = body.getChild(i), ty = el.getType();
    if (ty === DocumentApp.ElementType.PARAGRAPH) {
      var para = el.asParagraph(), s = runs(para.editAsText()), h = para.getHeading();
      if (!s.trim()) { out.push(''); continue; }
      if (h === H.TITLE || h === H.HEADING1) s = '# ' + s;
      else if (h === H.HEADING2 || h === H.SUBTITLE) s = '## ' + s;
      else if (h === H.HEADING3) s = '### ' + s;
      out.push(s);
    } else if (ty === DocumentApp.ElementType.LIST_ITEM) {
      out.push('- ' + runs(el.asListItem().editAsText()));
    } else if (ty === DocumentApp.ElementType.TABLE) {
      var tb = el.asTable();
      for (var r = 0; r < tb.getNumRows(); r++) {
        var row = tb.getRow(r), cells = [];
        for (var c = 0; c < row.getNumCells(); c++) cells.push(runs(row.getCell(c).editAsText()).replace(/\n+/g, ' '));
        out.push(cells.join(' | '));
      }
    }
  }
  return out.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

function runs(t) {
  var s = t.getText();
  if (!s) return '';
  var idx = t.getTextAttributeIndices(), r = '';
  for (var i = 0; i < idx.length; i++) {
    var a = idx[i], b = i + 1 < idx.length ? idx[i + 1] : s.length, seg = s.substring(a, b);
    if (seg.trim()) {
      var lead = seg.match(/^\s*/)[0], trail = seg.match(/\s*$/)[0], core = seg.trim();
      if (t.isItalic(a)) core = '*' + core + '*';
      if (t.isBold(a)) core = '**' + core + '**';
      var url = t.getLinkUrl(a);
      if (url) core = '[' + core + '](' + url + ')';
      seg = lead + core + trail;
    }
    r += seg;
  }
  return r;
}
