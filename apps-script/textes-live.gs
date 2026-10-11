/**
 * La Grande Incruste 3 – textes en direct
 * Relais entre les Google Docs des sketchs et le site (hoodmov.github.io/incruste).
 * Déploiement : Déployer > Nouveau déploiement > Application Web
 *   - Exécuter en tant que : Moi
 *   - Accès : Tout le monde
 * Puis copier l'URL qui se termine par /exec.
 */
// Seuls ces Google Docs (les sketchs du site) peuvent être lus. Tout autre id est refusé.
var ALLOW = ["1-YSNjvVuzPRK7PcW59qxIfcYxcrDYA5HbkasFTlfAL0", "10qBtOPi5-u9eqmdRuGcCTnjKJXUxASurVvWNRm3Dej0", "126d2625mbVYtoVWYfaHE1ZFUkG7_3YZMU76P-hdyZeo", "13lCQKtU5fN28LACi2cGpLfN0GbUPAIS7zAuikERnsDg", "14LDSaQKOyANLCiDrMy702QI__-O2x2YmxS7VYqdLdrM", "157GVxQkUFsUV3H9Qs0kW7M6wOolwz4s7bnoOvRpVPGw", "18mtcDK0dwfqAumr33pls9xvM4BjsbvOs_SEty0PINnw", "1B-aGhmHdTEk0ssASWBVA4HLtSUYxUxGGezFYKFkLSNw", "1B10hfc2nmM4p4i6dEkEi7Da5cA6484TX3vktZaECVRs", "1BfqwkhI21BEhe9gcg-GVTvgOxKiEd9WDfjsqA_ws6oQ", "1ElRcW405E-lTrQJSsUP_YZqg-tZjMlF8JsiWk8FhYOw", "1F2lskauTEcX88qTKwIWQM02aTbLfOWjP4VZmoBYwdbs", "1GbgTYQ9wO2Q73hr_GHEi8AaJl8ZzA_Qy5pxIakePQ_U", "1Jun-iXgtzBM_5KG6j86BDzsnMSyEUzUxFhtFQm804o0", "1L3Xmy5_BxX2cKFTUTSFLx0XgziTtA0tv0jLmv4ej-6Q", "1LebxsmepOoohJ_VfUIZ12ELSTrj7xP4VYl_QO3iSt4U", "1MYCPTjZ19fQatiZ49Tt0Xe-YK5OWiLxxhYzIiSJIv18", "1MyQ-AUCgZSZGGdDX3A4EF0g7xqEWs3saTnoLQDXA54o", "1OZkj8NbHJGcCe2t-P8Dd0x9XVlAk-x8Jh9P3s05OiL8", "1PEniTA78drIfvhKVQAU3-oydghYd8lx2hiqTHOYIcKM", "1PWbeVcJqD7eShHkkl8vOp4XVajGGsk48WuFvLqHjqSw", "1R3I2P7Jgddqen1LwhLSM3qXoQgFkxHrMESHxmPzPQzM", "1RblMlmbTycO--mr8_OL6Ew3AgimpWbGx5xTWALokIZ4", "1SX8_rqaQmppQmIDwJbPyFBU1Vv-IKqPJgmhactiLkjI", "1SYt6nwAmaJNPFfoRQ8rQi14wFT1keQ5WFK9dnWNgB7w", "1Sm8OCziQvRfMb_raU_Ad6jcU5gsIGOnBHRLd8e1QeCg", "1TuVG3aJTFHPJ2PNY8nuGUjnG--S5-Z2jWxmMY7lIb58", "1TzLsYOxp-sArDBm1oIJJM3nlfBvT4LKnw8iLQo7PcNM", "1UKL_e9hSDmy8LcmHP7ipQ9WIrnqHUK_bZ0ZOe7UE-NI", "1Uqbtj1TV8hSIJaiIjnomLBXxtEUwln0R6hS6nSAj1lk", "1V_V0Ht8vmlQildF-DokddAv_K5aowuMwAodi093ejKs", "1Wzb_9ZkjxKMk-yAN_ZX8fpjFqYTdxrDrmiX4CnmjhI0", "1Xp2oa3eDTQ9R0MnDBWYUedhE4FcM9td-n2XgenwwvoM", "1XprQQTCcEQl4heVY0tnV4wrBXw7ZmBiySniZwXs_nY4", "1ZeL8kDbRgcWb6bRqi_j7UVM7UA4p7JXP6VRxtXAq358", "1_5cMyqywkWCYaveAxUfSZb9DFbYfA8Zi0v2WfHTMxFU", "1_QgFP2mxnfekMZfxMP6YD1Z4yadl7Zlh2OfP4iV9VdU", "1_cLj2pf9v3Cvj4MLD_GL2ElBKTb8UiB0M67c83JXS4w", "1_o_d1IVbNxFPt7DjkydBGkKszHXuNuJIGUSWJ0GEUQU", "1ai3JfMiQl78Aye_dxJk8bXNQshU0-XNO4rXIFVaQmIw", "1c5Xoy7YiarDKcjQi1b6IYdqQMEOaK7BaNRnVrOqYic4", "1dwjtPszYbcAe37buL3eGthonqPzG76-uzZNIXJnnNJU", "1fiuMHv2yE1lczOMg9tAyeVYHbTUjC8j876KxZwg7p0o", "1gLdvmDyWrx1t6i3YaorevvybbH2ms1itWy8gWFr3c60", "1gYXxLME14y1vByLe1FKBLi-8k_8ALdPmOluNuyEznCw", "1iqARPZwUxn3kuumqiexlSh7IuEaio3Aod3A7lmk8hgs", "1jBG3nvEoi_yf8EvXh8Y75q-6n4rsxew3EJawai6mqNI", "1j_37Fia9g-iR4JPkrgJoRzWsR1Jr8Wk9KxGLponkuBA", "1lsMJEIc17IenUXsXOgguUeEMqPd53NcJN8-lV9n5N2g", "1muRCBs7Ms3x3JjxnWOUWNoiTVEfXQ1sKFTnkF5E0dHU", "1pQwNyKNB9Gbcn6y5R37j52I0T59HWQUm6cwatAgxPBw", "1pcryt2YUGdlK6yFOJdzg-vf2CNgzeZ7lJPBtEYibFJk", "1pz1n59zO_8g7E1p2WL-_FydebFOytc65gXYHHIFfw3A", "1qFEcn50UvOkxuh9RqtMltQKOVTttKxXJ1tv3JhHdna4", "1qlz-gJWX2gIxzF2LhwyBcjtMBWFL368vtHnSlMQkZeo", "1rpgQnaUcDzd8voArf9blv4AGjga8fE4aqgTilzbIqmg", "1sUqVJr-zn1uuoeL0WcHTWZ5v72qzRZG2daeG_eSNWqc", "1uEi1Akv3wex9c_W5XdUplcN3n3PXpn3oqtEIEY-ZovQ", "1x1oZu34SNfLtptLdcSh_3PaWtqnCP6XsZssspK1XkDw", "1xeE6RGMBzJ5QTeJ2CsAQFBkim3yq3Oh17gLId3f9-F0"];

function doGet(e) {
  var p = (e && e.parameter) || {};
  var ids = String(p.ids || '').split(',').map(function (s) { return s.trim(); })
    .filter(function (s) { return ALLOW.indexOf(s) >= 0; }).slice(0, 12);
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
      var r = { t: doc.getName(), x: x };
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
