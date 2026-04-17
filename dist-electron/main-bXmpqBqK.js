import Zt, { app as xt, BrowserWindow as so, ipcMain as Ge, shell as Vu, dialog as gs } from "electron";
import { fileURLToPath as Tp } from "node:url";
import ve from "node:path";
import { spawn as Ip } from "node:child_process";
import Op from "buffer";
import Rp from "string_decoder";
import * as Hr from "fs";
import Ze from "fs";
import Dp from "constants";
import bn from "stream";
import oo from "util";
import Wu from "assert";
import * as lr from "path";
import se from "path";
import Mi from "child_process";
import zu from "events";
import Sn from "crypto";
import Yu from "tty";
import $i from "os";
import Lt from "url";
import Xu from "zlib";
import Np from "http";
var Te = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ku(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var lo = { exports: {} }, gi = Op, br = gi.Buffer, qe = {}, je;
for (je in gi)
  gi.hasOwnProperty(je) && (je === "SlowBuffer" || je === "Buffer" || (qe[je] = gi[je]));
var Sr = qe.Buffer = {};
for (je in br)
  br.hasOwnProperty(je) && (je === "allocUnsafe" || je === "allocUnsafeSlow" || (Sr[je] = br[je]));
qe.Buffer.prototype = br.prototype;
(!Sr.from || Sr.from === Uint8Array.from) && (Sr.from = function(e, t, r) {
  if (typeof e == "number")
    throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof e);
  if (e && typeof e.length > "u")
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
  return br(e, t, r);
});
Sr.alloc || (Sr.alloc = function(e, t, r) {
  if (typeof e != "number")
    throw new TypeError('The "size" argument must be of type number. Received type ' + typeof e);
  if (e < 0 || e >= 2 * (1 << 30))
    throw new RangeError('The value "' + e + '" is invalid for option "size"');
  var n = br(e);
  return !t || t.length === 0 ? n.fill(0) : typeof r == "string" ? n.fill(t, r) : n.fill(t), n;
});
if (!qe.kStringMaxLength)
  try {
    qe.kStringMaxLength = process.binding("buffer").kStringMaxLength;
  } catch {
  }
qe.constants || (qe.constants = {
  MAX_LENGTH: qe.kMaxLength
}, qe.kStringMaxLength && (qe.constants.MAX_STRING_LENGTH = qe.kStringMaxLength));
var kt = qe, co = {}, Ju = "\uFEFF";
co.PrependBOM = uo;
function uo(e, t) {
  this.encoder = e, this.addBOM = !0;
}
uo.prototype.write = function(e) {
  return this.addBOM && (e = Ju + e, this.addBOM = !1), this.encoder.write(e);
};
uo.prototype.end = function() {
  return this.encoder.end();
};
co.StripBOM = fo;
function fo(e, t) {
  this.decoder = e, this.pass = !1, this.options = t || {};
}
fo.prototype.write = function(e) {
  var t = this.decoder.write(e);
  return this.pass || !t || (t[0] === Ju && (t = t.slice(1), typeof this.options.stripBOM == "function" && this.options.stripBOM()), this.pass = !0), t;
};
fo.prototype.end = function() {
  return this.decoder.end();
};
var Lp = typeof Object.hasOwn > "u" ? Function.call.bind(Object.prototype.hasOwnProperty) : Object.hasOwn;
function kp(e, t) {
  for (var r in t)
    Lp(t, r) && (e[r] = t[r]);
}
var Qu = kp, ya = {}, _a, yl;
function Fp() {
  if (yl) return _a;
  yl = 1;
  var e = kt.Buffer;
  _a = {
    // Encodings
    utf8: { type: "_internal", bomAware: !0 },
    cesu8: { type: "_internal", bomAware: !0 },
    unicode11utf8: "utf8",
    ucs2: { type: "_internal", bomAware: !0 },
    utf16le: "ucs2",
    binary: { type: "_internal" },
    base64: { type: "_internal" },
    hex: { type: "_internal" },
    // Codec.
    _internal: t
  };
  function t(f, o) {
    this.enc = f.encodingName, this.bomAware = f.bomAware, this.enc === "base64" ? this.encoder = a : this.enc === "utf8" ? this.encoder = l : this.enc === "cesu8" && (this.enc = "utf8", this.encoder = s, e.from("eda0bdedb2a9", "hex").toString() !== "💩" && (this.decoder = c, this.defaultCharUnicode = o.defaultCharUnicode));
  }
  t.prototype.encoder = i, t.prototype.decoder = n;
  var r = Rp.StringDecoder;
  function n(f, o) {
    this.decoder = new r(o.enc);
  }
  n.prototype.write = function(f) {
    return e.isBuffer(f) || (f = e.from(f)), this.decoder.write(f);
  }, n.prototype.end = function() {
    return this.decoder.end();
  };
  function i(f, o) {
    this.enc = o.enc;
  }
  i.prototype.write = function(f) {
    return e.from(f, this.enc);
  }, i.prototype.end = function() {
  };
  function a(f, o) {
    this.prevStr = "";
  }
  a.prototype.write = function(f) {
    f = this.prevStr + f;
    var o = f.length - f.length % 4;
    return this.prevStr = f.slice(o), f = f.slice(0, o), e.from(f, "base64");
  }, a.prototype.end = function() {
    return e.from(this.prevStr, "base64");
  };
  function s(f, o) {
  }
  s.prototype.write = function(f) {
    for (var o = e.alloc(f.length * 3), d = 0, u = 0; u < f.length; u++) {
      var h = f.charCodeAt(u);
      h < 128 ? o[d++] = h : h < 2048 ? (o[d++] = 192 + (h >>> 6), o[d++] = 128 + (h & 63)) : (o[d++] = 224 + (h >>> 12), o[d++] = 128 + (h >>> 6 & 63), o[d++] = 128 + (h & 63));
    }
    return o.slice(0, d);
  }, s.prototype.end = function() {
  };
  function c(f, o) {
    this.acc = 0, this.contBytes = 0, this.accBytes = 0, this.defaultCharUnicode = o.defaultCharUnicode;
  }
  c.prototype.write = function(f) {
    for (var o = this.acc, d = this.contBytes, u = this.accBytes, h = "", p = 0; p < f.length; p++) {
      var m = f[p];
      (m & 192) !== 128 ? (d > 0 && (h += this.defaultCharUnicode, d = 0), m < 128 ? h += String.fromCharCode(m) : m < 224 ? (o = m & 31, d = 1, u = 1) : m < 240 ? (o = m & 15, d = 2, u = 1) : h += this.defaultCharUnicode) : d > 0 ? (o = o << 6 | m & 63, d--, u++, d === 0 && (u === 2 && o < 128 && o > 0 ? h += this.defaultCharUnicode : u === 3 && o < 2048 ? h += this.defaultCharUnicode : h += String.fromCharCode(o))) : h += this.defaultCharUnicode;
    }
    return this.acc = o, this.contBytes = d, this.accBytes = u, h;
  }, c.prototype.end = function() {
    var f = 0;
    return this.contBytes > 0 && (f += this.defaultCharUnicode), f;
  };
  function l(f, o) {
    this.highSurrogate = "";
  }
  return l.prototype.write = function(f) {
    if (this.highSurrogate && (f = this.highSurrogate + f, this.highSurrogate = ""), f.length > 0) {
      var o = f.charCodeAt(f.length - 1);
      o >= 55296 && o < 56320 && (this.highSurrogate = f[f.length - 1], f = f.slice(0, f.length - 1));
    }
    return e.from(f, this.enc);
  }, l.prototype.end = function() {
    if (this.highSurrogate) {
      var f = this.highSurrogate;
      return this.highSurrogate = "", e.from(f, this.enc);
    }
  }, _a;
}
var ft = {}, _l;
function Up() {
  if (_l) return ft;
  _l = 1;
  var e = kt.Buffer;
  ft._utf32 = t;
  function t(f, o) {
    this.iconv = o, this.bomAware = !0, this.isLE = f.isLE;
  }
  ft.utf32le = { type: "_utf32", isLE: !0 }, ft.utf32be = { type: "_utf32", isLE: !1 }, ft.ucs4le = "utf32le", ft.ucs4be = "utf32be", t.prototype.encoder = r, t.prototype.decoder = n;
  function r(f, o) {
    this.isLE = o.isLE, this.highSurrogate = 0;
  }
  r.prototype.write = function(f) {
    for (var o = e.from(f, "ucs2"), d = e.alloc(o.length * 2), u = this.isLE ? d.writeUInt32LE : d.writeUInt32BE, h = 0, p = 0; p < o.length; p += 2) {
      var m = o.readUInt16LE(p), g = m >= 55296 && m < 56320, E = m >= 56320 && m < 57344;
      if (this.highSurrogate)
        if (g || !E)
          u.call(d, this.highSurrogate, h), h += 4;
        else {
          var y = (this.highSurrogate - 55296 << 10 | m - 56320) + 65536;
          u.call(d, y, h), h += 4, this.highSurrogate = 0;
          continue;
        }
      g ? this.highSurrogate = m : (u.call(d, m, h), h += 4, this.highSurrogate = 0);
    }
    return h < d.length && (d = d.slice(0, h)), d;
  }, r.prototype.end = function() {
    if (this.highSurrogate) {
      var f = e.alloc(4);
      return this.isLE ? f.writeUInt32LE(this.highSurrogate, 0) : f.writeUInt32BE(this.highSurrogate, 0), this.highSurrogate = 0, f;
    }
  };
  function n(f, o) {
    this.isLE = o.isLE, this.badChar = o.iconv.defaultCharUnicode.charCodeAt(0), this.overflow = [];
  }
  n.prototype.write = function(f) {
    if (f.length === 0)
      return "";
    var o = 0, d = 0, u = e.alloc(f.length + 4), h = 0, p = this.isLE, m = this.overflow, g = this.badChar;
    if (m.length > 0) {
      for (; o < f.length && m.length < 4; o++)
        m.push(f[o]);
      m.length === 4 && (p ? d = m[o] | m[o + 1] << 8 | m[o + 2] << 16 | m[o + 3] << 24 : d = m[o + 3] | m[o + 2] << 8 | m[o + 1] << 16 | m[o] << 24, m.length = 0, h = i(u, h, d, g));
    }
    for (; o < f.length - 3; o += 4)
      p ? d = f[o] | f[o + 1] << 8 | f[o + 2] << 16 | f[o + 3] << 24 : d = f[o + 3] | f[o + 2] << 8 | f[o + 1] << 16 | f[o] << 24, h = i(u, h, d, g);
    for (; o < f.length; o++)
      m.push(f[o]);
    return u.slice(0, h).toString("ucs2");
  };
  function i(f, o, d, u) {
    if ((d < 0 || d > 1114111) && (d = u), d >= 65536) {
      d -= 65536;
      var h = 55296 | d >> 10;
      f[o++] = h & 255, f[o++] = h >> 8;
      var d = 56320 | d & 1023;
    }
    return f[o++] = d & 255, f[o++] = d >> 8, o;
  }
  n.prototype.end = function() {
    this.overflow.length = 0;
  }, ft.utf32 = a, ft.ucs4 = "utf32";
  function a(f, o) {
    this.iconv = o;
  }
  a.prototype.encoder = s, a.prototype.decoder = c;
  function s(f, o) {
    f = f || {}, f.addBOM === void 0 && (f.addBOM = !0), this.encoder = o.iconv.getEncoder(f.defaultEncoding || "utf-32le", f);
  }
  s.prototype.write = function(f) {
    return this.encoder.write(f);
  }, s.prototype.end = function() {
    return this.encoder.end();
  };
  function c(f, o) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = f || {}, this.iconv = o.iconv;
  }
  c.prototype.write = function(f) {
    if (!this.decoder) {
      if (this.initialBufs.push(f), this.initialBufsLen += f.length, this.initialBufsLen < 32)
        return "";
      var o = l(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(o, this.options);
      for (var d = "", u = 0; u < this.initialBufs.length; u++)
        d += this.decoder.write(this.initialBufs[u]);
      return this.initialBufs.length = this.initialBufsLen = 0, d;
    }
    return this.decoder.write(f);
  }, c.prototype.end = function() {
    if (!this.decoder) {
      var f = l(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(f, this.options);
      for (var o = "", d = 0; d < this.initialBufs.length; d++)
        o += this.decoder.write(this.initialBufs[d]);
      var u = this.decoder.end();
      return u && (o += u), this.initialBufs.length = this.initialBufsLen = 0, o;
    }
    return this.decoder.end();
  };
  function l(f, o) {
    var d = [], u = 0, h = 0, p = 0, m = 0, g = 0;
    e:
      for (var E = 0; E < f.length; E++)
        for (var y = f[E], S = 0; S < y.length; S++)
          if (d.push(y[S]), d.length === 4) {
            if (u === 0) {
              if (d[0] === 255 && d[1] === 254 && d[2] === 0 && d[3] === 0)
                return "utf-32le";
              if (d[0] === 0 && d[1] === 0 && d[2] === 254 && d[3] === 255)
                return "utf-32be";
            }
            if ((d[0] !== 0 || d[1] > 16) && p++, (d[3] !== 0 || d[2] > 16) && h++, d[0] === 0 && d[1] === 0 && (d[2] !== 0 || d[3] !== 0) && g++, (d[0] !== 0 || d[1] !== 0) && d[2] === 0 && d[3] === 0 && m++, d.length = 0, u++, u >= 100)
              break e;
          }
    return g - p > m - h ? "utf-32be" : g - p < m - h ? "utf-32le" : o || "utf-32le";
  }
  return ft;
}
var Xn = {}, El;
function Mp() {
  if (El) return Xn;
  El = 1;
  var e = kt.Buffer;
  Xn.utf16be = t;
  function t() {
  }
  t.prototype.encoder = r, t.prototype.decoder = n, t.prototype.bomAware = !0;
  function r() {
  }
  r.prototype.write = function(l) {
    for (var f = e.from(l, "ucs2"), o = 0; o < f.length; o += 2) {
      var d = f[o];
      f[o] = f[o + 1], f[o + 1] = d;
    }
    return f;
  }, r.prototype.end = function() {
  };
  function n() {
    this.overflowByte = -1;
  }
  n.prototype.write = function(l) {
    if (l.length == 0)
      return "";
    var f = e.alloc(l.length + 1), o = 0, d = 0;
    for (this.overflowByte !== -1 && (f[0] = l[0], f[1] = this.overflowByte, o = 1, d = 2); o < l.length - 1; o += 2, d += 2)
      f[d] = l[o + 1], f[d + 1] = l[o];
    return this.overflowByte = o == l.length - 1 ? l[l.length - 1] : -1, f.slice(0, d).toString("ucs2");
  }, n.prototype.end = function() {
    this.overflowByte = -1;
  }, Xn.utf16 = i;
  function i(l, f) {
    this.iconv = f;
  }
  i.prototype.encoder = a, i.prototype.decoder = s;
  function a(l, f) {
    l = l || {}, l.addBOM === void 0 && (l.addBOM = !0), this.encoder = f.iconv.getEncoder("utf-16le", l);
  }
  a.prototype.write = function(l) {
    return this.encoder.write(l);
  }, a.prototype.end = function() {
    return this.encoder.end();
  };
  function s(l, f) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = l || {}, this.iconv = f.iconv;
  }
  s.prototype.write = function(l) {
    if (!this.decoder) {
      if (this.initialBufs.push(l), this.initialBufsLen += l.length, this.initialBufsLen < 16)
        return "";
      var f = c(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(f, this.options);
      for (var o = "", d = 0; d < this.initialBufs.length; d++)
        o += this.decoder.write(this.initialBufs[d]);
      return this.initialBufs.length = this.initialBufsLen = 0, o;
    }
    return this.decoder.write(l);
  }, s.prototype.end = function() {
    if (!this.decoder) {
      var l = c(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(l, this.options);
      for (var f = "", o = 0; o < this.initialBufs.length; o++)
        f += this.decoder.write(this.initialBufs[o]);
      var d = this.decoder.end();
      return d && (f += d), this.initialBufs.length = this.initialBufsLen = 0, f;
    }
    return this.decoder.end();
  };
  function c(l, f) {
    var o = [], d = 0, u = 0, h = 0;
    e:
      for (var p = 0; p < l.length; p++)
        for (var m = l[p], g = 0; g < m.length; g++)
          if (o.push(m[g]), o.length === 2) {
            if (d === 0) {
              if (o[0] === 255 && o[1] === 254) return "utf-16le";
              if (o[0] === 254 && o[1] === 255) return "utf-16be";
            }
            if (o[0] === 0 && o[1] !== 0 && h++, o[0] !== 0 && o[1] === 0 && u++, o.length = 0, d++, d >= 100)
              break e;
          }
    return h > u ? "utf-16be" : h < u ? "utf-16le" : f || "utf-16le";
  }
  return Xn;
}
var qr = {}, wl;
function $p() {
  if (wl) return qr;
  wl = 1;
  var e = kt.Buffer;
  qr.utf7 = t, qr.unicode11utf7 = "utf7";
  function t(m, g) {
    this.iconv = g;
  }
  t.prototype.encoder = n, t.prototype.decoder = i, t.prototype.bomAware = !0;
  var r = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
  function n(m, g) {
    this.iconv = g.iconv;
  }
  n.prototype.write = function(m) {
    return e.from(m.replace(r, (function(g) {
      return "+" + (g === "+" ? "" : this.iconv.encode(g, "utf16-be").toString("base64").replace(/=+$/, "")) + "-";
    }).bind(this)));
  }, n.prototype.end = function() {
  };
  function i(m, g) {
    this.iconv = g.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  for (var a = /[A-Za-z0-9\/+]/, s = [], c = 0; c < 256; c++)
    s[c] = a.test(String.fromCharCode(c));
  var l = 43, f = 45, o = 38;
  i.prototype.write = function(m) {
    for (var g = "", E = 0, y = this.inBase64, S = this.base64Accum, _ = 0; _ < m.length; _++)
      if (!y)
        m[_] == l && (g += this.iconv.decode(m.slice(E, _), "ascii"), E = _ + 1, y = !0);
      else if (!s[m[_]]) {
        if (_ == E && m[_] == f)
          g += "+";
        else {
          var A = S + this.iconv.decode(m.slice(E, _), "ascii");
          g += this.iconv.decode(e.from(A, "base64"), "utf16-be");
        }
        m[_] != f && _--, E = _ + 1, y = !1, S = "";
      }
    if (!y)
      g += this.iconv.decode(m.slice(E), "ascii");
    else {
      var A = S + this.iconv.decode(m.slice(E), "ascii"), I = A.length - A.length % 8;
      S = A.slice(I), A = A.slice(0, I), g += this.iconv.decode(e.from(A, "base64"), "utf16-be");
    }
    return this.inBase64 = y, this.base64Accum = S, g;
  }, i.prototype.end = function() {
    var m = "";
    return this.inBase64 && this.base64Accum.length > 0 && (m = this.iconv.decode(e.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", m;
  }, qr.utf7imap = d;
  function d(m, g) {
    this.iconv = g;
  }
  d.prototype.encoder = u, d.prototype.decoder = h, d.prototype.bomAware = !0;
  function u(m, g) {
    this.iconv = g.iconv, this.inBase64 = !1, this.base64Accum = e.alloc(6), this.base64AccumIdx = 0;
  }
  u.prototype.write = function(m) {
    for (var g = this.inBase64, E = this.base64Accum, y = this.base64AccumIdx, S = e.alloc(m.length * 5 + 10), _ = 0, A = 0; A < m.length; A++) {
      var I = m.charCodeAt(A);
      I >= 32 && I <= 126 ? (g && (y > 0 && (_ += S.write(E.slice(0, y).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), _), y = 0), S[_++] = f, g = !1), g || (S[_++] = I, I === o && (S[_++] = f))) : (g || (S[_++] = o, g = !0), g && (E[y++] = I >> 8, E[y++] = I & 255, y == E.length && (_ += S.write(E.toString("base64").replace(/\//g, ","), _), y = 0)));
    }
    return this.inBase64 = g, this.base64AccumIdx = y, S.slice(0, _);
  }, u.prototype.end = function() {
    var m = e.alloc(10), g = 0;
    return this.inBase64 && (this.base64AccumIdx > 0 && (g += m.write(this.base64Accum.slice(0, this.base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), g), this.base64AccumIdx = 0), m[g++] = f, this.inBase64 = !1), m.slice(0, g);
  };
  function h(m, g) {
    this.iconv = g.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  var p = s.slice();
  return p[44] = !0, h.prototype.write = function(m) {
    for (var g = "", E = 0, y = this.inBase64, S = this.base64Accum, _ = 0; _ < m.length; _++)
      if (!y)
        m[_] == o && (g += this.iconv.decode(m.slice(E, _), "ascii"), E = _ + 1, y = !0);
      else if (!p[m[_]]) {
        if (_ == E && m[_] == f)
          g += "&";
        else {
          var A = S + this.iconv.decode(m.slice(E, _), "ascii").replace(/,/g, "/");
          g += this.iconv.decode(e.from(A, "base64"), "utf16-be");
        }
        m[_] != f && _--, E = _ + 1, y = !1, S = "";
      }
    if (!y)
      g += this.iconv.decode(m.slice(E), "ascii");
    else {
      var A = S + this.iconv.decode(m.slice(E), "ascii").replace(/,/g, "/"), I = A.length - A.length % 8;
      S = A.slice(I), A = A.slice(0, I), g += this.iconv.decode(e.from(A, "base64"), "utf16-be");
    }
    return this.inBase64 = y, this.base64Accum = S, g;
  }, h.prototype.end = function() {
    var m = "";
    return this.inBase64 && this.base64Accum.length > 0 && (m = this.iconv.decode(e.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", m;
  }, qr;
}
var Ea = {}, bl;
function Bp() {
  if (bl) return Ea;
  bl = 1;
  var e = kt.Buffer;
  Ea._sbcs = t;
  function t(i, a) {
    if (!i)
      throw new Error("SBCS codec is called without the data.");
    if (!i.chars || i.chars.length !== 128 && i.chars.length !== 256)
      throw new Error("Encoding '" + i.type + "' has incorrect 'chars' (must be of len 128 or 256)");
    if (i.chars.length === 128) {
      for (var s = "", c = 0; c < 128; c++)
        s += String.fromCharCode(c);
      i.chars = s + i.chars;
    }
    this.decodeBuf = e.from(i.chars, "ucs2");
    for (var l = e.alloc(65536, a.defaultCharSingleByte.charCodeAt(0)), c = 0; c < i.chars.length; c++)
      l[i.chars.charCodeAt(c)] = c;
    this.encodeBuf = l;
  }
  t.prototype.encoder = r, t.prototype.decoder = n;
  function r(i, a) {
    this.encodeBuf = a.encodeBuf;
  }
  r.prototype.write = function(i) {
    for (var a = e.alloc(i.length), s = 0; s < i.length; s++)
      a[s] = this.encodeBuf[i.charCodeAt(s)];
    return a;
  }, r.prototype.end = function() {
  };
  function n(i, a) {
    this.decodeBuf = a.decodeBuf;
  }
  return n.prototype.write = function(i) {
    for (var a = this.decodeBuf, s = e.alloc(i.length * 2), c = 0, l = 0, f = 0; f < i.length; f++)
      c = i[f] * 2, l = f * 2, s[l] = a[c], s[l + 1] = a[c + 1];
    return s.toString("ucs2");
  }, n.prototype.end = function() {
  }, Ea;
}
var wa, Sl;
function Hp() {
  return Sl || (Sl = 1, wa = {
    // Not supported by iconv, not sure why.
    10029: "maccenteuro",
    maccenteuro: {
      type: "_sbcs",
      chars: "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
    },
    808: "cp808",
    ibm808: "cp808",
    cp808: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
    },
    mik: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    cp720: {
      type: "_sbcs",
      chars: "éâàçêëèïîّْô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡ًٌٍَُِ≈°∙·√ⁿ²■ "
    },
    // Aliases of generated encodings.
    ascii8bit: "ascii",
    usascii: "ascii",
    ansix34: "ascii",
    ansix341968: "ascii",
    ansix341986: "ascii",
    csascii: "ascii",
    cp367: "ascii",
    ibm367: "ascii",
    isoir6: "ascii",
    iso646us: "ascii",
    iso646irv: "ascii",
    us: "ascii",
    latin1: "iso88591",
    latin2: "iso88592",
    latin3: "iso88593",
    latin4: "iso88594",
    latin5: "iso88599",
    latin6: "iso885910",
    latin7: "iso885913",
    latin8: "iso885914",
    latin9: "iso885915",
    latin10: "iso885916",
    csisolatin1: "iso88591",
    csisolatin2: "iso88592",
    csisolatin3: "iso88593",
    csisolatin4: "iso88594",
    csisolatincyrillic: "iso88595",
    csisolatinarabic: "iso88596",
    csisolatingreek: "iso88597",
    csisolatinhebrew: "iso88598",
    csisolatin5: "iso88599",
    csisolatin6: "iso885910",
    l1: "iso88591",
    l2: "iso88592",
    l3: "iso88593",
    l4: "iso88594",
    l5: "iso88599",
    l6: "iso885910",
    l7: "iso885913",
    l8: "iso885914",
    l9: "iso885915",
    l10: "iso885916",
    isoir14: "iso646jp",
    isoir57: "iso646cn",
    isoir100: "iso88591",
    isoir101: "iso88592",
    isoir109: "iso88593",
    isoir110: "iso88594",
    isoir144: "iso88595",
    isoir127: "iso88596",
    isoir126: "iso88597",
    isoir138: "iso88598",
    isoir148: "iso88599",
    isoir157: "iso885910",
    isoir166: "tis620",
    isoir179: "iso885913",
    isoir199: "iso885914",
    isoir203: "iso885915",
    isoir226: "iso885916",
    cp819: "iso88591",
    ibm819: "iso88591",
    cyrillic: "iso88595",
    arabic: "iso88596",
    arabic8: "iso88596",
    ecma114: "iso88596",
    asmo708: "iso88596",
    greek: "iso88597",
    greek8: "iso88597",
    ecma118: "iso88597",
    elot928: "iso88597",
    hebrew: "iso88598",
    hebrew8: "iso88598",
    turkish: "iso88599",
    turkish8: "iso88599",
    thai: "iso885911",
    thai8: "iso885911",
    celtic: "iso885914",
    celtic8: "iso885914",
    isoceltic: "iso885914",
    tis6200: "tis620",
    tis62025291: "tis620",
    tis62025330: "tis620",
    1e4: "macroman",
    10006: "macgreek",
    10007: "maccyrillic",
    10079: "maciceland",
    10081: "macturkish",
    cspc8codepage437: "cp437",
    cspc775baltic: "cp775",
    cspc850multilingual: "cp850",
    cspcp852: "cp852",
    cspc862latinhebrew: "cp862",
    cpgr: "cp869",
    msee: "cp1250",
    mscyrl: "cp1251",
    msansi: "cp1252",
    msgreek: "cp1253",
    msturk: "cp1254",
    mshebr: "cp1255",
    msarab: "cp1256",
    winbaltrim: "cp1257",
    cp20866: "koi8r",
    20866: "koi8r",
    ibm878: "koi8r",
    cskoi8r: "koi8r",
    cp21866: "koi8u",
    21866: "koi8u",
    ibm1168: "koi8u",
    strk10482002: "rk1048",
    tcvn5712: "tcvn",
    tcvn57121: "tcvn",
    gb198880: "iso646cn",
    cn: "iso646cn",
    csiso14jisc6220ro: "iso646jp",
    jisc62201969ro: "iso646jp",
    jp: "iso646jp",
    cshproman8: "hproman8",
    r8: "hproman8",
    roman8: "hproman8",
    xroman8: "hproman8",
    ibm1051: "hproman8",
    mac: "macintosh",
    csmacintosh: "macintosh"
  }), wa;
}
var ba, Cl;
function qp() {
  return Cl || (Cl = 1, ba = {
    437: "cp437",
    737: "cp737",
    775: "cp775",
    850: "cp850",
    852: "cp852",
    855: "cp855",
    856: "cp856",
    857: "cp857",
    858: "cp858",
    860: "cp860",
    861: "cp861",
    862: "cp862",
    863: "cp863",
    864: "cp864",
    865: "cp865",
    866: "cp866",
    869: "cp869",
    874: "windows874",
    922: "cp922",
    1046: "cp1046",
    1124: "cp1124",
    1125: "cp1125",
    1129: "cp1129",
    1133: "cp1133",
    1161: "cp1161",
    1162: "cp1162",
    1163: "cp1163",
    1250: "windows1250",
    1251: "windows1251",
    1252: "windows1252",
    1253: "windows1253",
    1254: "windows1254",
    1255: "windows1255",
    1256: "windows1256",
    1257: "windows1257",
    1258: "windows1258",
    28591: "iso88591",
    28592: "iso88592",
    28593: "iso88593",
    28594: "iso88594",
    28595: "iso88595",
    28596: "iso88596",
    28597: "iso88597",
    28598: "iso88598",
    28599: "iso88599",
    28600: "iso885910",
    28601: "iso885911",
    28603: "iso885913",
    28604: "iso885914",
    28605: "iso885915",
    28606: "iso885916",
    windows874: {
      type: "_sbcs",
      chars: "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    win874: "windows874",
    cp874: "windows874",
    windows1250: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    win1250: "windows1250",
    cp1250: "windows1250",
    windows1251: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    win1251: "windows1251",
    cp1251: "windows1251",
    windows1252: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    win1252: "windows1252",
    cp1252: "windows1252",
    windows1253: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    win1253: "windows1253",
    cp1253: "windows1253",
    windows1254: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    win1254: "windows1254",
    cp1254: "windows1254",
    windows1255: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    win1255: "windows1255",
    cp1255: "windows1255",
    windows1256: {
      type: "_sbcs",
      chars: "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
    },
    win1256: "windows1256",
    cp1256: "windows1256",
    windows1257: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
    },
    win1257: "windows1257",
    cp1257: "windows1257",
    windows1258: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    win1258: "windows1258",
    cp1258: "windows1258",
    iso88591: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28591: "iso88591",
    iso88592: {
      type: "_sbcs",
      chars: " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    cp28592: "iso88592",
    iso88593: {
      type: "_sbcs",
      chars: " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
    },
    cp28593: "iso88593",
    iso88594: {
      type: "_sbcs",
      chars: " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
    },
    cp28594: "iso88594",
    iso88595: {
      type: "_sbcs",
      chars: " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
    },
    cp28595: "iso88595",
    iso88596: {
      type: "_sbcs",
      chars: " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
    },
    cp28596: "iso88596",
    iso88597: {
      type: "_sbcs",
      chars: " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    cp28597: "iso88597",
    iso88598: {
      type: "_sbcs",
      chars: " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    cp28598: "iso88598",
    iso88599: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    cp28599: "iso88599",
    iso885910: {
      type: "_sbcs",
      chars: " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
    },
    cp28600: "iso885910",
    iso885911: {
      type: "_sbcs",
      chars: " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    cp28601: "iso885911",
    iso885913: {
      type: "_sbcs",
      chars: " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
    },
    cp28603: "iso885913",
    iso885914: {
      type: "_sbcs",
      chars: " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
    },
    cp28604: "iso885914",
    iso885915: {
      type: "_sbcs",
      chars: " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28605: "iso885915",
    iso885916: {
      type: "_sbcs",
      chars: " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
    },
    cp28606: "iso885916",
    cp437: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm437: "cp437",
    csibm437: "cp437",
    cp737: {
      type: "_sbcs",
      chars: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
    },
    ibm737: "cp737",
    csibm737: "cp737",
    cp775: {
      type: "_sbcs",
      chars: "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
    },
    ibm775: "cp775",
    csibm775: "cp775",
    cp850: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm850: "cp850",
    csibm850: "cp850",
    cp852: {
      type: "_sbcs",
      chars: "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
    },
    ibm852: "cp852",
    csibm852: "cp852",
    cp855: {
      type: "_sbcs",
      chars: "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
    },
    ibm855: "cp855",
    csibm855: "cp855",
    cp856: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm856: "cp856",
    csibm856: "cp856",
    cp857: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
    },
    ibm857: "cp857",
    csibm857: "cp857",
    cp858: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm858: "cp858",
    csibm858: "cp858",
    cp860: {
      type: "_sbcs",
      chars: "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm860: "cp860",
    csibm860: "cp860",
    cp861: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm861: "cp861",
    csibm861: "cp861",
    cp862: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm862: "cp862",
    csibm862: "cp862",
    cp863: {
      type: "_sbcs",
      chars: "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm863: "cp863",
    csibm863: "cp863",
    cp864: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�`
    },
    ibm864: "cp864",
    csibm864: "cp864",
    cp865: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm865: "cp865",
    csibm865: "cp865",
    cp866: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
    },
    ibm866: "cp866",
    csibm866: "cp866",
    cp869: {
      type: "_sbcs",
      chars: "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
    },
    ibm869: "cp869",
    csibm869: "cp869",
    cp922: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
    },
    ibm922: "cp922",
    csibm922: "cp922",
    cp1046: {
      type: "_sbcs",
      chars: "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
    },
    ibm1046: "cp1046",
    csibm1046: "cp1046",
    cp1124: {
      type: "_sbcs",
      chars: " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
    },
    ibm1124: "cp1124",
    csibm1124: "cp1124",
    cp1125: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
    },
    ibm1125: "cp1125",
    csibm1125: "cp1125",
    cp1129: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1129: "cp1129",
    csibm1129: "cp1129",
    cp1133: {
      type: "_sbcs",
      chars: " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
    },
    ibm1133: "cp1133",
    csibm1133: "cp1133",
    cp1161: {
      type: "_sbcs",
      chars: "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
    },
    ibm1161: "cp1161",
    csibm1161: "cp1161",
    cp1162: {
      type: "_sbcs",
      chars: "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    ibm1162: "cp1162",
    csibm1162: "cp1162",
    cp1163: {
      type: "_sbcs",
      chars: " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1163: "cp1163",
    csibm1163: "cp1163",
    maccroatian: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
    },
    maccyrillic: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    macgreek: {
      type: "_sbcs",
      chars: "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
    },
    maciceland: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macroman: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macromania: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macthai: {
      type: "_sbcs",
      chars: "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู\uFEFF​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
    },
    macturkish: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macukraine: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    koi8r: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8u: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8ru: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8t: {
      type: "_sbcs",
      chars: "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    armscii8: {
      type: "_sbcs",
      chars: " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
    },
    rk1048: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    tcvn: {
      type: "_sbcs",
      chars: `\0ÚỤỪỬỮ\x07\b	
\v\f\rỨỰỲỶỸÝỴ\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ`
    },
    georgianacademy: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    georgianps: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    pt154: {
      type: "_sbcs",
      chars: "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    viscii: {
      type: "_sbcs",
      chars: `\0ẲẴẪ\x07\b	
\v\f\rỶỸ\x1BỴ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ`
    },
    iso646cn: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    iso646jp: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    hproman8: {
      type: "_sbcs",
      chars: " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
    },
    macintosh: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    ascii: {
      type: "_sbcs",
      chars: "��������������������������������������������������������������������������������������������������������������������������������"
    },
    tis620: {
      type: "_sbcs",
      chars: "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    }
  }), ba;
}
var Sa = {}, Al;
function jp() {
  if (Al) return Sa;
  Al = 1;
  var e = kt.Buffer;
  Sa._dbcs = l;
  for (var t = -1, r = -2, n = -10, i = -1e3, a = new Array(256), s = -1, c = 0; c < 256; c++)
    a[c] = t;
  function l(u, h) {
    if (this.encodingName = u.encodingName, !u)
      throw new Error("DBCS codec is called without the data.");
    if (!u.table)
      throw new Error("Encoding '" + this.encodingName + "' has no data.");
    var p = u.table();
    this.decodeTables = [], this.decodeTables[0] = a.slice(0), this.decodeTableSeq = [];
    for (var m = 0; m < p.length; m++)
      this._addDecodeChunk(p[m]);
    if (typeof u.gb18030 == "function") {
      this.gb18030 = u.gb18030();
      var g = this.decodeTables.length;
      this.decodeTables.push(a.slice(0));
      var E = this.decodeTables.length;
      this.decodeTables.push(a.slice(0));
      for (var y = this.decodeTables[0], m = 129; m <= 254; m++)
        for (var S = this.decodeTables[i - y[m]], _ = 48; _ <= 57; _++) {
          if (S[_] === t)
            S[_] = i - g;
          else if (S[_] > i)
            throw new Error("gb18030 decode tables conflict at byte 2");
          for (var A = this.decodeTables[i - S[_]], I = 129; I <= 254; I++) {
            if (A[I] === t)
              A[I] = i - E;
            else {
              if (A[I] === i - E)
                continue;
              if (A[I] > i)
                throw new Error("gb18030 decode tables conflict at byte 3");
            }
            for (var T = this.decodeTables[i - A[I]], $ = 48; $ <= 57; $++)
              T[$] === t && (T[$] = r);
          }
        }
    }
    this.defaultCharUnicode = h.defaultCharUnicode, this.encodeTable = [], this.encodeTableSeq = [];
    var C = {};
    if (u.encodeSkipVals)
      for (var m = 0; m < u.encodeSkipVals.length; m++) {
        var F = u.encodeSkipVals[m];
        if (typeof F == "number")
          C[F] = !0;
        else
          for (var _ = F.from; _ <= F.to; _++)
            C[_] = !0;
      }
    if (this._fillEncodeTable(0, 0, C), u.encodeAdd)
      for (var H in u.encodeAdd)
        Object.prototype.hasOwnProperty.call(u.encodeAdd, H) && this._setEncodeChar(H.charCodeAt(0), u.encodeAdd[H]);
    this.defCharSB = this.encodeTable[0][h.defaultCharSingleByte.charCodeAt(0)], this.defCharSB === t && (this.defCharSB = this.encodeTable[0]["?"]), this.defCharSB === t && (this.defCharSB = 63);
  }
  l.prototype.encoder = f, l.prototype.decoder = o, l.prototype._getDecodeTrieNode = function(u) {
    for (var h = []; u > 0; u >>>= 8)
      h.push(u & 255);
    h.length == 0 && h.push(0);
    for (var p = this.decodeTables[0], m = h.length - 1; m > 0; m--) {
      var g = p[h[m]];
      if (g == t)
        p[h[m]] = i - this.decodeTables.length, this.decodeTables.push(p = a.slice(0));
      else if (g <= i)
        p = this.decodeTables[i - g];
      else
        throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + u.toString(16));
    }
    return p;
  }, l.prototype._addDecodeChunk = function(u) {
    var h = parseInt(u[0], 16), p = this._getDecodeTrieNode(h);
    h = h & 255;
    for (var m = 1; m < u.length; m++) {
      var g = u[m];
      if (typeof g == "string")
        for (var E = 0; E < g.length; ) {
          var y = g.charCodeAt(E++);
          if (y >= 55296 && y < 56320) {
            var S = g.charCodeAt(E++);
            if (S >= 56320 && S < 57344)
              p[h++] = 65536 + (y - 55296) * 1024 + (S - 56320);
            else
              throw new Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + u[0]);
          } else if (y > 4080 && y <= 4095) {
            for (var _ = 4095 - y + 2, A = [], I = 0; I < _; I++)
              A.push(g.charCodeAt(E++));
            p[h++] = n - this.decodeTableSeq.length, this.decodeTableSeq.push(A);
          } else
            p[h++] = y;
        }
      else if (typeof g == "number")
        for (var T = p[h - 1] + 1, E = 0; E < g; E++)
          p[h++] = T++;
      else
        throw new Error("Incorrect type '" + typeof g + "' given in " + this.encodingName + " at chunk " + u[0]);
    }
    if (h > 255)
      throw new Error("Incorrect chunk in " + this.encodingName + " at addr " + u[0] + ": too long" + h);
  }, l.prototype._getEncodeBucket = function(u) {
    var h = u >> 8;
    return this.encodeTable[h] === void 0 && (this.encodeTable[h] = a.slice(0)), this.encodeTable[h];
  }, l.prototype._setEncodeChar = function(u, h) {
    var p = this._getEncodeBucket(u), m = u & 255;
    p[m] <= n ? this.encodeTableSeq[n - p[m]][s] = h : p[m] == t && (p[m] = h);
  }, l.prototype._setEncodeSequence = function(u, h) {
    var p = u[0], m = this._getEncodeBucket(p), g = p & 255, E;
    m[g] <= n ? E = this.encodeTableSeq[n - m[g]] : (E = {}, m[g] !== t && (E[s] = m[g]), m[g] = n - this.encodeTableSeq.length, this.encodeTableSeq.push(E));
    for (var y = 1; y < u.length - 1; y++) {
      var S = E[p];
      typeof S == "object" ? E = S : (E = E[p] = {}, S !== void 0 && (E[s] = S));
    }
    p = u[u.length - 1], E[p] = h;
  }, l.prototype._fillEncodeTable = function(u, h, p) {
    for (var m = this.decodeTables[u], g = !1, E = {}, y = 0; y < 256; y++) {
      var S = m[y], _ = h + y;
      if (!p[_])
        if (S >= 0)
          this._setEncodeChar(S, _), g = !0;
        else if (S <= i) {
          var A = i - S;
          if (!E[A]) {
            var I = _ << 8 >>> 0;
            this._fillEncodeTable(A, I, p) ? g = !0 : E[A] = !0;
          }
        } else S <= n && (this._setEncodeSequence(this.decodeTableSeq[n - S], _), g = !0);
    }
    return g;
  };
  function f(u, h) {
    this.leadSurrogate = -1, this.seqObj = void 0, this.encodeTable = h.encodeTable, this.encodeTableSeq = h.encodeTableSeq, this.defaultCharSingleByte = h.defCharSB, this.gb18030 = h.gb18030;
  }
  f.prototype.write = function(u) {
    for (var h = e.alloc(u.length * (this.gb18030 ? 4 : 3)), p = this.leadSurrogate, m = this.seqObj, g = -1, E = 0, y = 0; ; ) {
      if (g === -1) {
        if (E == u.length) break;
        var S = u.charCodeAt(E++);
      } else {
        var S = g;
        g = -1;
      }
      if (S >= 55296 && S < 57344)
        if (S < 56320)
          if (p === -1) {
            p = S;
            continue;
          } else
            p = S, S = t;
        else
          p !== -1 ? (S = 65536 + (p - 55296) * 1024 + (S - 56320), p = -1) : S = t;
      else p !== -1 && (g = S, S = t, p = -1);
      var _ = t;
      if (m !== void 0 && S != t) {
        var A = m[S];
        if (typeof A == "object") {
          m = A;
          continue;
        } else typeof A == "number" ? _ = A : A == null && (A = m[s], A !== void 0 && (_ = A, g = S));
        m = void 0;
      } else if (S >= 0) {
        var I = this.encodeTable[S >> 8];
        if (I !== void 0 && (_ = I[S & 255]), _ <= n) {
          m = this.encodeTableSeq[n - _];
          continue;
        }
        if (_ == t && this.gb18030) {
          var T = d(this.gb18030.uChars, S);
          if (T != -1) {
            var _ = this.gb18030.gbChars[T] + (S - this.gb18030.uChars[T]);
            h[y++] = 129 + Math.floor(_ / 12600), _ = _ % 12600, h[y++] = 48 + Math.floor(_ / 1260), _ = _ % 1260, h[y++] = 129 + Math.floor(_ / 10), _ = _ % 10, h[y++] = 48 + _;
            continue;
          }
        }
      }
      _ === t && (_ = this.defaultCharSingleByte), _ < 256 ? h[y++] = _ : _ < 65536 ? (h[y++] = _ >> 8, h[y++] = _ & 255) : _ < 16777216 ? (h[y++] = _ >> 16, h[y++] = _ >> 8 & 255, h[y++] = _ & 255) : (h[y++] = _ >>> 24, h[y++] = _ >>> 16 & 255, h[y++] = _ >>> 8 & 255, h[y++] = _ & 255);
    }
    return this.seqObj = m, this.leadSurrogate = p, h.slice(0, y);
  }, f.prototype.end = function() {
    if (!(this.leadSurrogate === -1 && this.seqObj === void 0)) {
      var u = e.alloc(10), h = 0;
      if (this.seqObj) {
        var p = this.seqObj[s];
        p !== void 0 && (p < 256 ? u[h++] = p : (u[h++] = p >> 8, u[h++] = p & 255)), this.seqObj = void 0;
      }
      return this.leadSurrogate !== -1 && (u[h++] = this.defaultCharSingleByte, this.leadSurrogate = -1), u.slice(0, h);
    }
  }, f.prototype.findIdx = d;
  function o(u, h) {
    this.nodeIdx = 0, this.prevBytes = [], this.decodeTables = h.decodeTables, this.decodeTableSeq = h.decodeTableSeq, this.defaultCharUnicode = h.defaultCharUnicode, this.gb18030 = h.gb18030;
  }
  o.prototype.write = function(u) {
    for (var h = e.alloc(u.length * 2), p = this.nodeIdx, m = this.prevBytes, g = this.prevBytes.length, E = -this.prevBytes.length, y, S = 0, _ = 0; S < u.length; S++) {
      var A = S >= 0 ? u[S] : m[S + g], y = this.decodeTables[p][A];
      if (!(y >= 0)) if (y === t)
        y = this.defaultCharUnicode.charCodeAt(0), S = E;
      else if (y === r) {
        if (S >= 3)
          var I = (u[S - 3] - 129) * 12600 + (u[S - 2] - 48) * 1260 + (u[S - 1] - 129) * 10 + (A - 48);
        else
          var I = (m[S - 3 + g] - 129) * 12600 + ((S - 2 >= 0 ? u[S - 2] : m[S - 2 + g]) - 48) * 1260 + ((S - 1 >= 0 ? u[S - 1] : m[S - 1 + g]) - 129) * 10 + (A - 48);
        var T = d(this.gb18030.gbChars, I);
        y = this.gb18030.uChars[T] + I - this.gb18030.gbChars[T];
      } else if (y <= i) {
        p = i - y;
        continue;
      } else if (y <= n) {
        for (var $ = this.decodeTableSeq[n - y], C = 0; C < $.length - 1; C++)
          y = $[C], h[_++] = y & 255, h[_++] = y >> 8;
        y = $[$.length - 1];
      } else
        throw new Error("iconv-lite internal error: invalid decoding table value " + y + " at " + p + "/" + A);
      if (y >= 65536) {
        y -= 65536;
        var F = 55296 | y >> 10;
        h[_++] = F & 255, h[_++] = F >> 8, y = 56320 | y & 1023;
      }
      h[_++] = y & 255, h[_++] = y >> 8, p = 0, E = S + 1;
    }
    return this.nodeIdx = p, this.prevBytes = E >= 0 ? Array.prototype.slice.call(u, E) : m.slice(E + g).concat(Array.prototype.slice.call(u)), h.slice(0, _).toString("ucs2");
  }, o.prototype.end = function() {
    for (var u = ""; this.prevBytes.length > 0; ) {
      u += this.defaultCharUnicode;
      var h = this.prevBytes.slice(1);
      this.prevBytes = [], this.nodeIdx = 0, h.length > 0 && (u += this.write(h));
    }
    return this.prevBytes = [], this.nodeIdx = 0, u;
  };
  function d(u, h) {
    if (u[0] > h)
      return -1;
    for (var p = 0, m = u.length; p < m - 1; ) {
      var g = p + (m - p + 1 >> 1);
      u[g] <= h ? p = g : m = g;
    }
    return p;
  }
  return Sa;
}
const Gp = [
  [
    "0",
    "\0",
    128
  ],
  [
    "a1",
    "｡",
    62
  ],
  [
    "8140",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×"
  ],
  [
    "8180",
    "÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "81b8",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "81c8",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "81da",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "81f0",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "81fc",
    "◯"
  ],
  [
    "824f",
    "０",
    9
  ],
  [
    "8260",
    "Ａ",
    25
  ],
  [
    "8281",
    "ａ",
    25
  ],
  [
    "829f",
    "ぁ",
    82
  ],
  [
    "8340",
    "ァ",
    62
  ],
  [
    "8380",
    "ム",
    22
  ],
  [
    "839f",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "83bf",
    "α",
    16,
    "σ",
    6
  ],
  [
    "8440",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "8470",
    "а",
    5,
    "ёж",
    7
  ],
  [
    "8480",
    "о",
    17
  ],
  [
    "849f",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "8740",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "875f",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "877e",
    "㍻"
  ],
  [
    "8780",
    "〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "889f",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "8940",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
  ],
  [
    "8980",
    "園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "8a40",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
  ],
  [
    "8a80",
    "橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "8b40",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
  ],
  [
    "8b80",
    "朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "8c40",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
  ],
  [
    "8c80",
    "劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "8d40",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
  ],
  [
    "8d80",
    "項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "8e40",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
  ],
  [
    "8e80",
    "死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "8f40",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
  ],
  [
    "8f80",
    "準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "9040",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
  ],
  [
    "9080",
    "逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "9140",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
  ],
  [
    "9180",
    "操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "9240",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
  ],
  [
    "9280",
    "逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "9340",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
  ],
  [
    "9380",
    "凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "9440",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
  ],
  [
    "9480",
    "楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "9540",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
  ],
  [
    "9580",
    "斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "9640",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
  ],
  [
    "9680",
    "摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "9740",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
  ],
  [
    "9780",
    "沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "9840",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "989f",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "9940",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
  ],
  [
    "9980",
    "凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "9a40",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
  ],
  [
    "9a80",
    "噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "9b40",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
  ],
  [
    "9b80",
    "它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "9c40",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
  ],
  [
    "9c80",
    "怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "9d40",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
  ],
  [
    "9d80",
    "捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "9e40",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
  ],
  [
    "9e80",
    "梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "9f40",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
  ],
  [
    "9f80",
    "麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "e040",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
  ],
  [
    "e080",
    "烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e140",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
  ],
  [
    "e180",
    "痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e240",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
  ],
  [
    "e280",
    "窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e340",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
  ],
  [
    "e380",
    "縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e440",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
  ],
  [
    "e480",
    "艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e540",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
  ],
  [
    "e580",
    "蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "e640",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
  ],
  [
    "e680",
    "諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "e740",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
  ],
  [
    "e780",
    "轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "e840",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
  ],
  [
    "e880",
    "閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "e940",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
  ],
  [
    "e980",
    "騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "ea40",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
  ],
  [
    "ea80",
    "黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
  ],
  [
    "ed40",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
  ],
  [
    "ed80",
    "塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "ee40",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
  ],
  [
    "ee80",
    "蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "eeef",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "f040",
    "",
    62
  ],
  [
    "f080",
    "",
    124
  ],
  [
    "f140",
    "",
    62
  ],
  [
    "f180",
    "",
    124
  ],
  [
    "f240",
    "",
    62
  ],
  [
    "f280",
    "",
    124
  ],
  [
    "f340",
    "",
    62
  ],
  [
    "f380",
    "",
    124
  ],
  [
    "f440",
    "",
    62
  ],
  [
    "f480",
    "",
    124
  ],
  [
    "f540",
    "",
    62
  ],
  [
    "f580",
    "",
    124
  ],
  [
    "f640",
    "",
    62
  ],
  [
    "f680",
    "",
    124
  ],
  [
    "f740",
    "",
    62
  ],
  [
    "f780",
    "",
    124
  ],
  [
    "f840",
    "",
    62
  ],
  [
    "f880",
    "",
    124
  ],
  [
    "f940",
    ""
  ],
  [
    "fa40",
    "ⅰ",
    9,
    "Ⅰ",
    9,
    "￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
  ],
  [
    "fa80",
    "兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
  ],
  [
    "fb40",
    "涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
  ],
  [
    "fb80",
    "祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
  ],
  [
    "fc40",
    "髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ]
], Vp = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8ea1",
    "｡",
    62
  ],
  [
    "a1a1",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"
  ],
  [
    "a2a1",
    "◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "a2ba",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "a2ca",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "a2dc",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "a2f2",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "a2fe",
    "◯"
  ],
  [
    "a3b0",
    "０",
    9
  ],
  [
    "a3c1",
    "Ａ",
    25
  ],
  [
    "a3e1",
    "ａ",
    25
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a8a1",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "ada1",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "adc0",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "addf",
    "㍻〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "b0a1",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "b1a1",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"
  ],
  [
    "b2a1",
    "押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "b3a1",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"
  ],
  [
    "b4a1",
    "粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "b5a1",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"
  ],
  [
    "b6a1",
    "供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "b7a1",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"
  ],
  [
    "b8a1",
    "検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "b9a1",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"
  ],
  [
    "baa1",
    "此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "bba1",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"
  ],
  [
    "bca1",
    "次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "bda1",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"
  ],
  [
    "bea1",
    "勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "bfa1",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"
  ],
  [
    "c0a1",
    "澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "c1a1",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"
  ],
  [
    "c2a1",
    "臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "c3a1",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"
  ],
  [
    "c4a1",
    "帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "c5a1",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"
  ],
  [
    "c6a1",
    "董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "c7a1",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"
  ],
  [
    "c8a1",
    "函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "c9a1",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"
  ],
  [
    "caa1",
    "福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "cba1",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"
  ],
  [
    "cca1",
    "漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "cda1",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"
  ],
  [
    "cea1",
    "痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "cfa1",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "d0a1",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "d1a1",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"
  ],
  [
    "d2a1",
    "辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "d3a1",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"
  ],
  [
    "d4a1",
    "圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "d5a1",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"
  ],
  [
    "d6a1",
    "屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "d7a1",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"
  ],
  [
    "d8a1",
    "悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "d9a1",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"
  ],
  [
    "daa1",
    "據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "dba1",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"
  ],
  [
    "dca1",
    "棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "dda1",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"
  ],
  [
    "dea1",
    "沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "dfa1",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"
  ],
  [
    "e0a1",
    "燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e1a1",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"
  ],
  [
    "e2a1",
    "癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e3a1",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"
  ],
  [
    "e4a1",
    "筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e5a1",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"
  ],
  [
    "e6a1",
    "罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e7a1",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"
  ],
  [
    "e8a1",
    "茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e9a1",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"
  ],
  [
    "eaa1",
    "蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "eba1",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"
  ],
  [
    "eca1",
    "譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "eda1",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"
  ],
  [
    "eea1",
    "遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "efa1",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"
  ],
  [
    "f0a1",
    "陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "f1a1",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"
  ],
  [
    "f2a1",
    "髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "f3a1",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"
  ],
  [
    "f4a1",
    "堯槇遙瑤凜熙"
  ],
  [
    "f9a1",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"
  ],
  [
    "faa1",
    "忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "fba1",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"
  ],
  [
    "fca1",
    "釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "fcf1",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "8fa2af",
    "˘ˇ¸˙˝¯˛˚～΄΅"
  ],
  [
    "8fa2c2",
    "¡¦¿"
  ],
  [
    "8fa2eb",
    "ºª©®™¤№"
  ],
  [
    "8fa6e1",
    "ΆΈΉΊΪ"
  ],
  [
    "8fa6e7",
    "Ό"
  ],
  [
    "8fa6e9",
    "ΎΫ"
  ],
  [
    "8fa6ec",
    "Ώ"
  ],
  [
    "8fa6f1",
    "άέήίϊΐόςύϋΰώ"
  ],
  [
    "8fa7c2",
    "Ђ",
    10,
    "ЎЏ"
  ],
  [
    "8fa7f2",
    "ђ",
    10,
    "ўџ"
  ],
  [
    "8fa9a1",
    "ÆĐ"
  ],
  [
    "8fa9a4",
    "Ħ"
  ],
  [
    "8fa9a6",
    "Ĳ"
  ],
  [
    "8fa9a8",
    "ŁĿ"
  ],
  [
    "8fa9ab",
    "ŊØŒ"
  ],
  [
    "8fa9af",
    "ŦÞ"
  ],
  [
    "8fa9c1",
    "æđðħıĳĸłŀŉŋøœßŧþ"
  ],
  [
    "8faaa1",
    "ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"
  ],
  [
    "8faaba",
    "ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"
  ],
  [
    "8faba1",
    "áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"
  ],
  [
    "8fabbd",
    "ġĥíìïîǐ"
  ],
  [
    "8fabc5",
    "īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"
  ],
  [
    "8fb0a1",
    "丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"
  ],
  [
    "8fb1a1",
    "侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"
  ],
  [
    "8fb2a1",
    "傒傓傔傖傛傜傞",
    4,
    "傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"
  ],
  [
    "8fb3a1",
    "凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"
  ],
  [
    "8fb4a1",
    "匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"
  ],
  [
    "8fb5a1",
    "咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"
  ],
  [
    "8fb6a1",
    "嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",
    5,
    "嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",
    4,
    "囱囫园"
  ],
  [
    "8fb7a1",
    "囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",
    4,
    "坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"
  ],
  [
    "8fb8a1",
    "堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"
  ],
  [
    "8fb9a1",
    "奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"
  ],
  [
    "8fbaa1",
    "嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",
    4,
    "寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"
  ],
  [
    "8fbba1",
    "屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"
  ],
  [
    "8fbca1",
    "巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",
    4,
    "幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"
  ],
  [
    "8fbda1",
    "彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",
    4,
    "忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"
  ],
  [
    "8fbea1",
    "悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",
    4,
    "愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"
  ],
  [
    "8fbfa1",
    "懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"
  ],
  [
    "8fc0a1",
    "捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"
  ],
  [
    "8fc1a1",
    "擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"
  ],
  [
    "8fc2a1",
    "昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"
  ],
  [
    "8fc3a1",
    "杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",
    4,
    "桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"
  ],
  [
    "8fc4a1",
    "棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"
  ],
  [
    "8fc5a1",
    "樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"
  ],
  [
    "8fc6a1",
    "歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"
  ],
  [
    "8fc7a1",
    "泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"
  ],
  [
    "8fc8a1",
    "湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"
  ],
  [
    "8fc9a1",
    "濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",
    4,
    "炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",
    4,
    "焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"
  ],
  [
    "8fcaa1",
    "煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"
  ],
  [
    "8fcba1",
    "狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"
  ],
  [
    "8fcca1",
    "珿琀琁琄琇琊琑琚琛琤琦琨",
    9,
    "琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"
  ],
  [
    "8fcda1",
    "甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",
    5,
    "疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"
  ],
  [
    "8fcea1",
    "瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",
    6,
    "皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"
  ],
  [
    "8fcfa1",
    "睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"
  ],
  [
    "8fd0a1",
    "碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"
  ],
  [
    "8fd1a1",
    "秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"
  ],
  [
    "8fd2a1",
    "笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",
    5
  ],
  [
    "8fd3a1",
    "籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"
  ],
  [
    "8fd4a1",
    "綞綦綧綪綳綶綷綹緂",
    4,
    "緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"
  ],
  [
    "8fd5a1",
    "罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"
  ],
  [
    "8fd6a1",
    "胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"
  ],
  [
    "8fd7a1",
    "艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"
  ],
  [
    "8fd8a1",
    "荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"
  ],
  [
    "8fd9a1",
    "蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",
    4,
    "蕖蕙蕜",
    6,
    "蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"
  ],
  [
    "8fdaa1",
    "藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",
    4,
    "虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"
  ],
  [
    "8fdba1",
    "蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",
    6,
    "螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"
  ],
  [
    "8fdca1",
    "蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",
    4,
    "裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"
  ],
  [
    "8fdda1",
    "襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",
    4,
    "觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"
  ],
  [
    "8fdea1",
    "誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",
    4,
    "譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"
  ],
  [
    "8fdfa1",
    "貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"
  ],
  [
    "8fe0a1",
    "踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"
  ],
  [
    "8fe1a1",
    "轃轇轏轑",
    4,
    "轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"
  ],
  [
    "8fe2a1",
    "郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"
  ],
  [
    "8fe3a1",
    "釂釃釅釓釔釗釙釚釞釤釥釩釪釬",
    5,
    "釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",
    4,
    "鉻鉼鉽鉿銈銉銊銍銎銒銗"
  ],
  [
    "8fe4a1",
    "銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",
    4,
    "鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"
  ],
  [
    "8fe5a1",
    "鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",
    4,
    "鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"
  ],
  [
    "8fe6a1",
    "镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"
  ],
  [
    "8fe7a1",
    "霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"
  ],
  [
    "8fe8a1",
    "頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",
    4,
    "餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"
  ],
  [
    "8fe9a1",
    "馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",
    4
  ],
  [
    "8feaa1",
    "鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",
    4,
    "魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"
  ],
  [
    "8feba1",
    "鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",
    4,
    "鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"
  ],
  [
    "8feca1",
    "鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"
  ],
  [
    "8feda1",
    "黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",
    4,
    "齓齕齖齗齘齚齝齞齨齩齭",
    4,
    "齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"
  ]
], Ca = [
  [
    "0",
    "\0",
    127,
    "€"
  ],
  [
    "8140",
    "丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",
    5,
    "乲乴",
    9,
    "乿",
    6,
    "亇亊"
  ],
  [
    "8180",
    "亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",
    6,
    "伋伌伒",
    4,
    "伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",
    4,
    "佄佅佇",
    5,
    "佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"
  ],
  [
    "8240",
    "侤侫侭侰",
    4,
    "侶",
    8,
    "俀俁係俆俇俈俉俋俌俍俒",
    4,
    "俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",
    11
  ],
  [
    "8280",
    "個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",
    10,
    "倻倽倿偀偁偂偄偅偆偉偊偋偍偐",
    4,
    "偖偗偘偙偛偝",
    7,
    "偦",
    5,
    "偭",
    8,
    "偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",
    20,
    "傤傦傪傫傭",
    4,
    "傳",
    6,
    "傼"
  ],
  [
    "8340",
    "傽",
    17,
    "僐",
    5,
    "僗僘僙僛",
    10,
    "僨僩僪僫僯僰僱僲僴僶",
    4,
    "僼",
    9,
    "儈"
  ],
  [
    "8380",
    "儉儊儌",
    5,
    "儓",
    13,
    "儢",
    28,
    "兂兇兊兌兎兏児兒兓兗兘兙兛兝",
    4,
    "兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",
    4,
    "冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",
    5
  ],
  [
    "8440",
    "凘凙凚凜凞凟凢凣凥",
    5,
    "凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",
    5,
    "剋剎剏剒剓剕剗剘"
  ],
  [
    "8480",
    "剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",
    9,
    "剾劀劃",
    4,
    "劉",
    6,
    "劑劒劔",
    6,
    "劜劤劥劦劧劮劯劰労",
    9,
    "勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",
    5,
    "勠勡勢勣勥",
    10,
    "勱",
    7,
    "勻勼勽匁匂匃匄匇匉匊匋匌匎"
  ],
  [
    "8540",
    "匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",
    9,
    "匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"
  ],
  [
    "8580",
    "厐",
    4,
    "厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",
    6,
    "厷厸厹厺厼厽厾叀參",
    4,
    "収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",
    4,
    "呣呥呧呩",
    7,
    "呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"
  ],
  [
    "8640",
    "咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",
    4,
    "哫哬哯哰哱哴",
    5,
    "哻哾唀唂唃唄唅唈唊",
    4,
    "唒唓唕",
    5,
    "唜唝唞唟唡唥唦"
  ],
  [
    "8680",
    "唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",
    4,
    "啑啒啓啔啗",
    4,
    "啝啞啟啠啢啣啨啩啫啯",
    5,
    "啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",
    6,
    "喨",
    8,
    "喲喴営喸喺喼喿",
    4,
    "嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",
    4,
    "嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",
    4,
    "嗿嘂嘃嘄嘅"
  ],
  [
    "8740",
    "嘆嘇嘊嘋嘍嘐",
    7,
    "嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",
    11,
    "噏",
    4,
    "噕噖噚噛噝",
    4
  ],
  [
    "8780",
    "噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",
    7,
    "嚇",
    6,
    "嚐嚑嚒嚔",
    14,
    "嚤",
    10,
    "嚰",
    6,
    "嚸嚹嚺嚻嚽",
    12,
    "囋",
    8,
    "囕囖囘囙囜団囥",
    5,
    "囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",
    6
  ],
  [
    "8840",
    "園",
    9,
    "圝圞圠圡圢圤圥圦圧圫圱圲圴",
    4,
    "圼圽圿坁坃坄坅坆坈坉坋坒",
    4,
    "坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"
  ],
  [
    "8880",
    "垁垇垈垉垊垍",
    4,
    "垔",
    6,
    "垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",
    8,
    "埄",
    6,
    "埌埍埐埑埓埖埗埛埜埞埡埢埣埥",
    7,
    "埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",
    4,
    "堫",
    4,
    "報堲堳場堶",
    7
  ],
  [
    "8940",
    "堾",
    5,
    "塅",
    6,
    "塎塏塐塒塓塕塖塗塙",
    4,
    "塟",
    5,
    "塦",
    4,
    "塭",
    16,
    "塿墂墄墆墇墈墊墋墌"
  ],
  [
    "8980",
    "墍",
    4,
    "墔",
    4,
    "墛墜墝墠",
    7,
    "墪",
    17,
    "墽墾墿壀壂壃壄壆",
    10,
    "壒壓壔壖",
    13,
    "壥",
    5,
    "壭壯壱売壴壵壷壸壺",
    7,
    "夃夅夆夈",
    4,
    "夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"
  ],
  [
    "8a40",
    "夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",
    4,
    "奡奣奤奦",
    12,
    "奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"
  ],
  [
    "8a80",
    "妧妬妭妰妱妳",
    5,
    "妺妼妽妿",
    6,
    "姇姈姉姌姍姎姏姕姖姙姛姞",
    4,
    "姤姦姧姩姪姫姭",
    11,
    "姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",
    6,
    "娳娵娷",
    4,
    "娽娾娿婁",
    4,
    "婇婈婋",
    9,
    "婖婗婘婙婛",
    5
  ],
  [
    "8b40",
    "婡婣婤婥婦婨婩婫",
    8,
    "婸婹婻婼婽婾媀",
    17,
    "媓",
    6,
    "媜",
    13,
    "媫媬"
  ],
  [
    "8b80",
    "媭",
    4,
    "媴媶媷媹",
    4,
    "媿嫀嫃",
    5,
    "嫊嫋嫍",
    4,
    "嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",
    4,
    "嫲",
    22,
    "嬊",
    11,
    "嬘",
    25,
    "嬳嬵嬶嬸",
    7,
    "孁",
    6
  ],
  [
    "8c40",
    "孈",
    7,
    "孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"
  ],
  [
    "8c80",
    "寑寔",
    8,
    "寠寢寣實寧審",
    4,
    "寯寱",
    6,
    "寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",
    6,
    "屰屲",
    6,
    "屻屼屽屾岀岃",
    4,
    "岉岊岋岎岏岒岓岕岝",
    4,
    "岤",
    4
  ],
  [
    "8d40",
    "岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",
    5,
    "峌",
    5,
    "峓",
    5,
    "峚",
    6,
    "峢峣峧峩峫峬峮峯峱",
    9,
    "峼",
    4
  ],
  [
    "8d80",
    "崁崄崅崈",
    5,
    "崏",
    4,
    "崕崗崘崙崚崜崝崟",
    4,
    "崥崨崪崫崬崯",
    4,
    "崵",
    7,
    "崿",
    7,
    "嵈嵉嵍",
    10,
    "嵙嵚嵜嵞",
    10,
    "嵪嵭嵮嵰嵱嵲嵳嵵",
    12,
    "嶃",
    21,
    "嶚嶛嶜嶞嶟嶠"
  ],
  [
    "8e40",
    "嶡",
    21,
    "嶸",
    12,
    "巆",
    6,
    "巎",
    12,
    "巜巟巠巣巤巪巬巭"
  ],
  [
    "8e80",
    "巰巵巶巸",
    4,
    "巿帀帄帇帉帊帋帍帎帒帓帗帞",
    7,
    "帨",
    4,
    "帯帰帲",
    4,
    "帹帺帾帿幀幁幃幆",
    5,
    "幍",
    6,
    "幖",
    4,
    "幜幝幟幠幣",
    14,
    "幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",
    4,
    "庮",
    4,
    "庴庺庻庼庽庿",
    6
  ],
  [
    "8f40",
    "廆廇廈廋",
    5,
    "廔廕廗廘廙廚廜",
    11,
    "廩廫",
    8,
    "廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"
  ],
  [
    "8f80",
    "弨弫弬弮弰弲",
    6,
    "弻弽弾弿彁",
    14,
    "彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",
    5,
    "復徫徬徯",
    5,
    "徶徸徹徺徻徾",
    4,
    "忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"
  ],
  [
    "9040",
    "怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",
    4,
    "怶",
    4,
    "怽怾恀恄",
    6,
    "恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"
  ],
  [
    "9080",
    "悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",
    7,
    "惇惈惉惌",
    4,
    "惒惓惔惖惗惙惛惞惡",
    4,
    "惪惱惲惵惷惸惻",
    4,
    "愂愃愄愅愇愊愋愌愐",
    4,
    "愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",
    18,
    "慀",
    6
  ],
  [
    "9140",
    "慇慉態慍慏慐慒慓慔慖",
    6,
    "慞慟慠慡慣慤慥慦慩",
    6,
    "慱慲慳慴慶慸",
    18,
    "憌憍憏",
    4,
    "憕"
  ],
  [
    "9180",
    "憖",
    6,
    "憞",
    8,
    "憪憫憭",
    9,
    "憸",
    5,
    "憿懀懁懃",
    4,
    "應懌",
    4,
    "懓懕",
    16,
    "懧",
    13,
    "懶",
    8,
    "戀",
    5,
    "戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",
    4,
    "扂扄扅扆扊"
  ],
  [
    "9240",
    "扏扐払扖扗扙扚扜",
    6,
    "扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",
    5,
    "抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"
  ],
  [
    "9280",
    "拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",
    5,
    "挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",
    7,
    "捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",
    6,
    "採掤掦掫掯掱掲掵掶掹掻掽掿揀"
  ],
  [
    "9340",
    "揁揂揃揅揇揈揊揋揌揑揓揔揕揗",
    6,
    "揟揢揤",
    4,
    "揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",
    4,
    "損搎搑搒搕",
    5,
    "搝搟搢搣搤"
  ],
  [
    "9380",
    "搥搧搨搩搫搮",
    5,
    "搵",
    4,
    "搻搼搾摀摂摃摉摋",
    6,
    "摓摕摖摗摙",
    4,
    "摟",
    7,
    "摨摪摫摬摮",
    9,
    "摻",
    6,
    "撃撆撈",
    8,
    "撓撔撗撘撚撛撜撝撟",
    4,
    "撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",
    6,
    "擏擑擓擔擕擖擙據"
  ],
  [
    "9440",
    "擛擜擝擟擠擡擣擥擧",
    24,
    "攁",
    7,
    "攊",
    7,
    "攓",
    4,
    "攙",
    8
  ],
  [
    "9480",
    "攢攣攤攦",
    4,
    "攬攭攰攱攲攳攷攺攼攽敀",
    4,
    "敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",
    14,
    "斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",
    7,
    "斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",
    7,
    "旡旣旤旪旫"
  ],
  [
    "9540",
    "旲旳旴旵旸旹旻",
    4,
    "昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",
    4,
    "昽昿晀時晄",
    6,
    "晍晎晐晑晘"
  ],
  [
    "9580",
    "晙晛晜晝晞晠晢晣晥晧晩",
    4,
    "晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",
    4,
    "暞",
    8,
    "暩",
    4,
    "暯",
    4,
    "暵暶暷暸暺暻暼暽暿",
    25,
    "曚曞",
    7,
    "曧曨曪",
    5,
    "曱曵曶書曺曻曽朁朂會"
  ],
  [
    "9640",
    "朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",
    5,
    "朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",
    4,
    "杝杢杣杤杦杧杫杬杮東杴杶"
  ],
  [
    "9680",
    "杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",
    7,
    "柂柅",
    9,
    "柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",
    7,
    "柾栁栂栃栄栆栍栐栒栔栕栘",
    4,
    "栞栟栠栢",
    6,
    "栫",
    6,
    "栴栵栶栺栻栿桇桋桍桏桒桖",
    5
  ],
  [
    "9740",
    "桜桝桞桟桪桬",
    7,
    "桵桸",
    8,
    "梂梄梇",
    7,
    "梐梑梒梔梕梖梘",
    9,
    "梣梤梥梩梪梫梬梮梱梲梴梶梷梸"
  ],
  [
    "9780",
    "梹",
    6,
    "棁棃",
    5,
    "棊棌棎棏棐棑棓棔棖棗棙棛",
    4,
    "棡棢棤",
    9,
    "棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",
    4,
    "椌椏椑椓",
    11,
    "椡椢椣椥",
    7,
    "椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",
    16,
    "楕楖楘楙楛楜楟"
  ],
  [
    "9840",
    "楡楢楤楥楧楨楩楪楬業楯楰楲",
    4,
    "楺楻楽楾楿榁榃榅榊榋榌榎",
    5,
    "榖榗榙榚榝",
    9,
    "榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"
  ],
  [
    "9880",
    "榾榿槀槂",
    7,
    "構槍槏槑槒槓槕",
    5,
    "槜槝槞槡",
    11,
    "槮槯槰槱槳",
    9,
    "槾樀",
    9,
    "樋",
    11,
    "標",
    5,
    "樠樢",
    5,
    "権樫樬樭樮樰樲樳樴樶",
    6,
    "樿",
    4,
    "橅橆橈",
    7,
    "橑",
    6,
    "橚"
  ],
  [
    "9940",
    "橜",
    4,
    "橢橣橤橦",
    10,
    "橲",
    6,
    "橺橻橽橾橿檁檂檃檅",
    8,
    "檏檒",
    4,
    "檘",
    7,
    "檡",
    5
  ],
  [
    "9980",
    "檧檨檪檭",
    114,
    "欥欦欨",
    6
  ],
  [
    "9a40",
    "欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",
    11,
    "歚",
    7,
    "歨歩歫",
    13,
    "歺歽歾歿殀殅殈"
  ],
  [
    "9a80",
    "殌殎殏殐殑殔殕殗殘殙殜",
    4,
    "殢",
    7,
    "殫",
    7,
    "殶殸",
    6,
    "毀毃毄毆",
    4,
    "毌毎毐毑毘毚毜",
    4,
    "毢",
    7,
    "毬毭毮毰毱毲毴毶毷毸毺毻毼毾",
    6,
    "氈",
    4,
    "氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",
    4,
    "汑汒汓汖汘"
  ],
  [
    "9b40",
    "汙汚汢汣汥汦汧汫",
    4,
    "汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"
  ],
  [
    "9b80",
    "泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",
    5,
    "洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",
    4,
    "涃涄涆涇涊涋涍涏涐涒涖",
    4,
    "涜涢涥涬涭涰涱涳涴涶涷涹",
    5,
    "淁淂淃淈淉淊"
  ],
  [
    "9c40",
    "淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",
    7,
    "渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"
  ],
  [
    "9c80",
    "渶渷渹渻",
    7,
    "湅",
    7,
    "湏湐湑湒湕湗湙湚湜湝湞湠",
    10,
    "湬湭湯",
    14,
    "満溁溂溄溇溈溊",
    4,
    "溑",
    6,
    "溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",
    5
  ],
  [
    "9d40",
    "滰滱滲滳滵滶滷滸滺",
    7,
    "漃漄漅漇漈漊",
    4,
    "漐漑漒漖",
    9,
    "漡漢漣漥漦漧漨漬漮漰漲漴漵漷",
    6,
    "漿潀潁潂"
  ],
  [
    "9d80",
    "潃潄潅潈潉潊潌潎",
    9,
    "潙潚潛潝潟潠潡潣潤潥潧",
    5,
    "潯潰潱潳潵潶潷潹潻潽",
    6,
    "澅澆澇澊澋澏",
    12,
    "澝澞澟澠澢",
    4,
    "澨",
    10,
    "澴澵澷澸澺",
    5,
    "濁濃",
    5,
    "濊",
    6,
    "濓",
    10,
    "濟濢濣濤濥"
  ],
  [
    "9e40",
    "濦",
    7,
    "濰",
    32,
    "瀒",
    7,
    "瀜",
    6,
    "瀤",
    6
  ],
  [
    "9e80",
    "瀫",
    9,
    "瀶瀷瀸瀺",
    17,
    "灍灎灐",
    13,
    "灟",
    11,
    "灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",
    12,
    "炰炲炴炵炶為炾炿烄烅烆烇烉烋",
    12,
    "烚"
  ],
  [
    "9f40",
    "烜烝烞烠烡烢烣烥烪烮烰",
    6,
    "烸烺烻烼烾",
    10,
    "焋",
    4,
    "焑焒焔焗焛",
    10,
    "焧",
    7,
    "焲焳焴"
  ],
  [
    "9f80",
    "焵焷",
    13,
    "煆煇煈煉煋煍煏",
    12,
    "煝煟",
    4,
    "煥煩",
    4,
    "煯煰煱煴煵煶煷煹煻煼煾",
    5,
    "熅",
    4,
    "熋熌熍熎熐熑熒熓熕熖熗熚",
    4,
    "熡",
    6,
    "熩熪熫熭",
    5,
    "熴熶熷熸熺",
    8,
    "燄",
    9,
    "燏",
    4
  ],
  [
    "a040",
    "燖",
    9,
    "燡燢燣燤燦燨",
    5,
    "燯",
    9,
    "燺",
    11,
    "爇",
    19
  ],
  [
    "a080",
    "爛爜爞",
    9,
    "爩爫爭爮爯爲爳爴爺爼爾牀",
    6,
    "牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",
    4,
    "犌犎犐犑犓",
    11,
    "犠",
    11,
    "犮犱犲犳犵犺",
    6,
    "狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"
  ],
  [
    "a1a1",
    "　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",
    7,
    "〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"
  ],
  [
    "a2a1",
    "ⅰ",
    9
  ],
  [
    "a2b1",
    "⒈",
    19,
    "⑴",
    19,
    "①",
    9
  ],
  [
    "a2e5",
    "㈠",
    9
  ],
  [
    "a2f1",
    "Ⅰ",
    11
  ],
  [
    "a3a1",
    "！＂＃￥％",
    88,
    "￣"
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a6e0",
    "︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"
  ],
  [
    "a6ee",
    "︻︼︷︸︱"
  ],
  [
    "a6f4",
    "︳︴"
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a840",
    "ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",
    35,
    "▁",
    6
  ],
  [
    "a880",
    "█",
    7,
    "▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"
  ],
  [
    "a8a1",
    "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"
  ],
  [
    "a8bd",
    "ńň"
  ],
  [
    "a8c0",
    "ɡ"
  ],
  [
    "a8c5",
    "ㄅ",
    36
  ],
  [
    "a940",
    "〡",
    8,
    "㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"
  ],
  [
    "a959",
    "℡㈱"
  ],
  [
    "a95c",
    "‐"
  ],
  [
    "a960",
    "ー゛゜ヽヾ〆ゝゞ﹉",
    9,
    "﹔﹕﹖﹗﹙",
    8
  ],
  [
    "a980",
    "﹢",
    4,
    "﹨﹩﹪﹫"
  ],
  [
    "a996",
    "〇"
  ],
  [
    "a9a4",
    "─",
    75
  ],
  [
    "aa40",
    "狜狝狟狢",
    5,
    "狪狫狵狶狹狽狾狿猀猂猄",
    5,
    "猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",
    8
  ],
  [
    "aa80",
    "獉獊獋獌獎獏獑獓獔獕獖獘",
    7,
    "獡",
    10,
    "獮獰獱"
  ],
  [
    "ab40",
    "獲",
    11,
    "獿",
    4,
    "玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",
    5,
    "玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",
    4
  ],
  [
    "ab80",
    "珋珌珎珒",
    6,
    "珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",
    4
  ],
  [
    "ac40",
    "珸",
    10,
    "琄琇琈琋琌琍琎琑",
    8,
    "琜",
    5,
    "琣琤琧琩琫琭琯琱琲琷",
    4,
    "琽琾琿瑀瑂",
    11
  ],
  [
    "ac80",
    "瑎",
    6,
    "瑖瑘瑝瑠",
    12,
    "瑮瑯瑱",
    4,
    "瑸瑹瑺"
  ],
  [
    "ad40",
    "瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",
    10,
    "璝璟",
    7,
    "璪",
    15,
    "璻",
    12
  ],
  [
    "ad80",
    "瓈",
    9,
    "瓓",
    8,
    "瓝瓟瓡瓥瓧",
    6,
    "瓰瓱瓲"
  ],
  [
    "ae40",
    "瓳瓵瓸",
    6,
    "甀甁甂甃甅",
    7,
    "甎甐甒甔甕甖甗甛甝甞甠",
    4,
    "甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"
  ],
  [
    "ae80",
    "畝",
    7,
    "畧畨畩畫",
    6,
    "畳畵當畷畺",
    4,
    "疀疁疂疄疅疇"
  ],
  [
    "af40",
    "疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",
    4,
    "疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"
  ],
  [
    "af80",
    "瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"
  ],
  [
    "b040",
    "癅",
    6,
    "癎",
    5,
    "癕癗",
    4,
    "癝癟癠癡癢癤",
    6,
    "癬癭癮癰",
    7,
    "癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"
  ],
  [
    "b080",
    "皜",
    7,
    "皥",
    8,
    "皯皰皳皵",
    9,
    "盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"
  ],
  [
    "b140",
    "盄盇盉盋盌盓盕盙盚盜盝盞盠",
    4,
    "盦",
    7,
    "盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",
    10,
    "眛眜眝眞眡眣眤眥眧眪眫"
  ],
  [
    "b180",
    "眬眮眰",
    4,
    "眹眻眽眾眿睂睄睅睆睈",
    7,
    "睒",
    7,
    "睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"
  ],
  [
    "b240",
    "睝睞睟睠睤睧睩睪睭",
    11,
    "睺睻睼瞁瞂瞃瞆",
    5,
    "瞏瞐瞓",
    11,
    "瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",
    4
  ],
  [
    "b280",
    "瞼瞾矀",
    12,
    "矎",
    8,
    "矘矙矚矝",
    4,
    "矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"
  ],
  [
    "b340",
    "矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",
    5,
    "砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"
  ],
  [
    "b380",
    "硛硜硞",
    11,
    "硯",
    7,
    "硸硹硺硻硽",
    6,
    "场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"
  ],
  [
    "b440",
    "碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",
    7,
    "碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",
    9
  ],
  [
    "b480",
    "磤磥磦磧磩磪磫磭",
    4,
    "磳磵磶磸磹磻",
    5,
    "礂礃礄礆",
    6,
    "础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"
  ],
  [
    "b540",
    "礍",
    5,
    "礔",
    9,
    "礟",
    4,
    "礥",
    14,
    "礵",
    4,
    "礽礿祂祃祄祅祇祊",
    8,
    "祔祕祘祙祡祣"
  ],
  [
    "b580",
    "祤祦祩祪祫祬祮祰",
    6,
    "祹祻",
    4,
    "禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"
  ],
  [
    "b640",
    "禓",
    6,
    "禛",
    11,
    "禨",
    10,
    "禴",
    4,
    "禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",
    5,
    "秠秡秢秥秨秪"
  ],
  [
    "b680",
    "秬秮秱",
    6,
    "秹秺秼秾秿稁稄稅稇稈稉稊稌稏",
    4,
    "稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"
  ],
  [
    "b740",
    "稝稟稡稢稤",
    14,
    "稴稵稶稸稺稾穀",
    5,
    "穇",
    9,
    "穒",
    4,
    "穘",
    16
  ],
  [
    "b780",
    "穩",
    6,
    "穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"
  ],
  [
    "b840",
    "窣窤窧窩窪窫窮",
    4,
    "窴",
    10,
    "竀",
    10,
    "竌",
    9,
    "竗竘竚竛竜竝竡竢竤竧",
    5,
    "竮竰竱竲竳"
  ],
  [
    "b880",
    "竴",
    4,
    "竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"
  ],
  [
    "b940",
    "笯笰笲笴笵笶笷笹笻笽笿",
    5,
    "筆筈筊筍筎筓筕筗筙筜筞筟筡筣",
    10,
    "筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",
    6,
    "箎箏"
  ],
  [
    "b980",
    "箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",
    7,
    "篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"
  ],
  [
    "ba40",
    "篅篈築篊篋篍篎篏篐篒篔",
    4,
    "篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",
    4,
    "篸篹篺篻篽篿",
    7,
    "簈簉簊簍簎簐",
    5,
    "簗簘簙"
  ],
  [
    "ba80",
    "簚",
    4,
    "簠",
    5,
    "簨簩簫",
    12,
    "簹",
    5,
    "籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"
  ],
  [
    "bb40",
    "籃",
    9,
    "籎",
    36,
    "籵",
    5,
    "籾",
    9
  ],
  [
    "bb80",
    "粈粊",
    6,
    "粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",
    4,
    "粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"
  ],
  [
    "bc40",
    "粿糀糂糃糄糆糉糋糎",
    6,
    "糘糚糛糝糞糡",
    6,
    "糩",
    5,
    "糰",
    7,
    "糹糺糼",
    13,
    "紋",
    5
  ],
  [
    "bc80",
    "紑",
    14,
    "紡紣紤紥紦紨紩紪紬紭紮細",
    6,
    "肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"
  ],
  [
    "bd40",
    "紷",
    54,
    "絯",
    7
  ],
  [
    "bd80",
    "絸",
    32,
    "健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"
  ],
  [
    "be40",
    "継",
    12,
    "綧",
    6,
    "綯",
    42
  ],
  [
    "be80",
    "線",
    32,
    "尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"
  ],
  [
    "bf40",
    "緻",
    62
  ],
  [
    "bf80",
    "縺縼",
    4,
    "繂",
    4,
    "繈",
    21,
    "俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"
  ],
  [
    "c040",
    "繞",
    35,
    "纃",
    23,
    "纜纝纞"
  ],
  [
    "c080",
    "纮纴纻纼绖绤绬绹缊缐缞缷缹缻",
    6,
    "罃罆",
    9,
    "罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"
  ],
  [
    "c140",
    "罖罙罛罜罝罞罠罣",
    4,
    "罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",
    7,
    "羋羍羏",
    4,
    "羕",
    4,
    "羛羜羠羢羣羥羦羨",
    6,
    "羱"
  ],
  [
    "c180",
    "羳",
    4,
    "羺羻羾翀翂翃翄翆翇翈翉翋翍翏",
    4,
    "翖翗翙",
    5,
    "翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"
  ],
  [
    "c240",
    "翤翧翨翪翫翬翭翯翲翴",
    6,
    "翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",
    5,
    "耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"
  ],
  [
    "c280",
    "聙聛",
    13,
    "聫",
    5,
    "聲",
    11,
    "隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"
  ],
  [
    "c340",
    "聾肁肂肅肈肊肍",
    5,
    "肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",
    4,
    "胏",
    6,
    "胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"
  ],
  [
    "c380",
    "脌脕脗脙脛脜脝脟",
    12,
    "脭脮脰脳脴脵脷脹",
    4,
    "脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"
  ],
  [
    "c440",
    "腀",
    5,
    "腇腉腍腎腏腒腖腗腘腛",
    4,
    "腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",
    4,
    "膉膋膌膍膎膐膒",
    5,
    "膙膚膞",
    4,
    "膤膥"
  ],
  [
    "c480",
    "膧膩膫",
    7,
    "膴",
    5,
    "膼膽膾膿臄臅臇臈臉臋臍",
    6,
    "摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"
  ],
  [
    "c540",
    "臔",
    14,
    "臤臥臦臨臩臫臮",
    4,
    "臵",
    5,
    "臽臿舃與",
    4,
    "舎舏舑舓舕",
    5,
    "舝舠舤舥舦舧舩舮舲舺舼舽舿"
  ],
  [
    "c580",
    "艀艁艂艃艅艆艈艊艌艍艎艐",
    7,
    "艙艛艜艝艞艠",
    7,
    "艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"
  ],
  [
    "c640",
    "艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"
  ],
  [
    "c680",
    "苺苼",
    4,
    "茊茋茍茐茒茓茖茘茙茝",
    9,
    "茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"
  ],
  [
    "c740",
    "茾茿荁荂荄荅荈荊",
    4,
    "荓荕",
    4,
    "荝荢荰",
    6,
    "荹荺荾",
    6,
    "莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",
    6,
    "莬莭莮"
  ],
  [
    "c780",
    "莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"
  ],
  [
    "c840",
    "菮華菳",
    4,
    "菺菻菼菾菿萀萂萅萇萈萉萊萐萒",
    5,
    "萙萚萛萞",
    5,
    "萩",
    7,
    "萲",
    5,
    "萹萺萻萾",
    7,
    "葇葈葉"
  ],
  [
    "c880",
    "葊",
    6,
    "葒",
    4,
    "葘葝葞葟葠葢葤",
    4,
    "葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"
  ],
  [
    "c940",
    "葽",
    4,
    "蒃蒄蒅蒆蒊蒍蒏",
    7,
    "蒘蒚蒛蒝蒞蒟蒠蒢",
    12,
    "蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"
  ],
  [
    "c980",
    "蓘",
    4,
    "蓞蓡蓢蓤蓧",
    4,
    "蓭蓮蓯蓱",
    10,
    "蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"
  ],
  [
    "ca40",
    "蔃",
    8,
    "蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",
    8,
    "蔭",
    9,
    "蔾",
    4,
    "蕄蕅蕆蕇蕋",
    10
  ],
  [
    "ca80",
    "蕗蕘蕚蕛蕜蕝蕟",
    4,
    "蕥蕦蕧蕩",
    8,
    "蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"
  ],
  [
    "cb40",
    "薂薃薆薈",
    6,
    "薐",
    10,
    "薝",
    6,
    "薥薦薧薩薫薬薭薱",
    5,
    "薸薺",
    6,
    "藂",
    6,
    "藊",
    4,
    "藑藒"
  ],
  [
    "cb80",
    "藔藖",
    5,
    "藝",
    6,
    "藥藦藧藨藪",
    14,
    "恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"
  ],
  [
    "cc40",
    "藹藺藼藽藾蘀",
    4,
    "蘆",
    10,
    "蘒蘓蘔蘕蘗",
    15,
    "蘨蘪",
    13,
    "蘹蘺蘻蘽蘾蘿虀"
  ],
  [
    "cc80",
    "虁",
    11,
    "虒虓處",
    4,
    "虛虜虝號虠虡虣",
    7,
    "獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"
  ],
  [
    "cd40",
    "虭虯虰虲",
    6,
    "蚃",
    6,
    "蚎",
    4,
    "蚔蚖",
    5,
    "蚞",
    4,
    "蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",
    4,
    "蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"
  ],
  [
    "cd80",
    "蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"
  ],
  [
    "ce40",
    "蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",
    6,
    "蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",
    5,
    "蝡蝢蝦",
    7,
    "蝯蝱蝲蝳蝵"
  ],
  [
    "ce80",
    "蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",
    4,
    "螔螕螖螘",
    6,
    "螠",
    4,
    "巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"
  ],
  [
    "cf40",
    "螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",
    4,
    "蟇蟈蟉蟌",
    4,
    "蟔",
    6,
    "蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",
    9
  ],
  [
    "cf80",
    "蟺蟻蟼蟽蟿蠀蠁蠂蠄",
    5,
    "蠋",
    7,
    "蠔蠗蠘蠙蠚蠜",
    4,
    "蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"
  ],
  [
    "d040",
    "蠤",
    13,
    "蠳",
    5,
    "蠺蠻蠽蠾蠿衁衂衃衆",
    5,
    "衎",
    5,
    "衕衖衘衚",
    6,
    "衦衧衪衭衯衱衳衴衵衶衸衹衺"
  ],
  [
    "d080",
    "衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",
    4,
    "袝",
    4,
    "袣袥",
    5,
    "小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"
  ],
  [
    "d140",
    "袬袮袯袰袲",
    4,
    "袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",
    4,
    "裠裡裦裧裩",
    6,
    "裲裵裶裷裺裻製裿褀褁褃",
    5
  ],
  [
    "d180",
    "褉褋",
    4,
    "褑褔",
    4,
    "褜",
    4,
    "褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"
  ],
  [
    "d240",
    "褸",
    8,
    "襂襃襅",
    24,
    "襠",
    5,
    "襧",
    19,
    "襼"
  ],
  [
    "d280",
    "襽襾覀覂覄覅覇",
    26,
    "摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"
  ],
  [
    "d340",
    "覢",
    30,
    "觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",
    6
  ],
  [
    "d380",
    "觻",
    4,
    "訁",
    5,
    "計",
    21,
    "印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"
  ],
  [
    "d440",
    "訞",
    31,
    "訿",
    8,
    "詉",
    21
  ],
  [
    "d480",
    "詟",
    25,
    "詺",
    6,
    "浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"
  ],
  [
    "d540",
    "誁",
    7,
    "誋",
    7,
    "誔",
    46
  ],
  [
    "d580",
    "諃",
    32,
    "铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"
  ],
  [
    "d640",
    "諤",
    34,
    "謈",
    27
  ],
  [
    "d680",
    "謤謥謧",
    30,
    "帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"
  ],
  [
    "d740",
    "譆",
    31,
    "譧",
    4,
    "譭",
    25
  ],
  [
    "d780",
    "讇",
    24,
    "讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"
  ],
  [
    "d840",
    "谸",
    8,
    "豂豃豄豅豈豊豋豍",
    7,
    "豖豗豘豙豛",
    5,
    "豣",
    6,
    "豬",
    6,
    "豴豵豶豷豻",
    6,
    "貃貄貆貇"
  ],
  [
    "d880",
    "貈貋貍",
    6,
    "貕貖貗貙",
    20,
    "亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"
  ],
  [
    "d940",
    "貮",
    62
  ],
  [
    "d980",
    "賭",
    32,
    "佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"
  ],
  [
    "da40",
    "贎",
    14,
    "贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",
    8,
    "趂趃趆趇趈趉趌",
    4,
    "趒趓趕",
    9,
    "趠趡"
  ],
  [
    "da80",
    "趢趤",
    12,
    "趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"
  ],
  [
    "db40",
    "跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",
    6,
    "踆踇踈踋踍踎踐踑踒踓踕",
    7,
    "踠踡踤",
    4,
    "踫踭踰踲踳踴踶踷踸踻踼踾"
  ],
  [
    "db80",
    "踿蹃蹅蹆蹌",
    4,
    "蹓",
    5,
    "蹚",
    11,
    "蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"
  ],
  [
    "dc40",
    "蹳蹵蹷",
    4,
    "蹽蹾躀躂躃躄躆躈",
    6,
    "躑躒躓躕",
    6,
    "躝躟",
    11,
    "躭躮躰躱躳",
    6,
    "躻",
    7
  ],
  [
    "dc80",
    "軃",
    10,
    "軏",
    21,
    "堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"
  ],
  [
    "dd40",
    "軥",
    62
  ],
  [
    "dd80",
    "輤",
    32,
    "荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"
  ],
  [
    "de40",
    "轅",
    32,
    "轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"
  ],
  [
    "de80",
    "迉",
    4,
    "迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"
  ],
  [
    "df40",
    "這逜連逤逥逧",
    5,
    "逰",
    4,
    "逷逹逺逽逿遀遃遅遆遈",
    4,
    "過達違遖遙遚遜",
    5,
    "遤遦遧適遪遫遬遯",
    4,
    "遶",
    6,
    "遾邁"
  ],
  [
    "df80",
    "還邅邆邇邉邊邌",
    4,
    "邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"
  ],
  [
    "e040",
    "郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",
    19,
    "鄚鄛鄜"
  ],
  [
    "e080",
    "鄝鄟鄠鄡鄤",
    10,
    "鄰鄲",
    6,
    "鄺",
    8,
    "酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"
  ],
  [
    "e140",
    "酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",
    4,
    "醆醈醊醎醏醓",
    6,
    "醜",
    5,
    "醤",
    5,
    "醫醬醰醱醲醳醶醷醸醹醻"
  ],
  [
    "e180",
    "醼",
    10,
    "釈釋釐釒",
    9,
    "針",
    8,
    "帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"
  ],
  [
    "e240",
    "釦",
    62
  ],
  [
    "e280",
    "鈥",
    32,
    "狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",
    5,
    "饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"
  ],
  [
    "e340",
    "鉆",
    45,
    "鉵",
    16
  ],
  [
    "e380",
    "銆",
    7,
    "銏",
    24,
    "恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"
  ],
  [
    "e440",
    "銨",
    5,
    "銯",
    24,
    "鋉",
    31
  ],
  [
    "e480",
    "鋩",
    32,
    "洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"
  ],
  [
    "e540",
    "錊",
    51,
    "錿",
    10
  ],
  [
    "e580",
    "鍊",
    31,
    "鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"
  ],
  [
    "e640",
    "鍬",
    34,
    "鎐",
    27
  ],
  [
    "e680",
    "鎬",
    29,
    "鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"
  ],
  [
    "e740",
    "鏎",
    7,
    "鏗",
    54
  ],
  [
    "e780",
    "鐎",
    32,
    "纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",
    6,
    "缪缫缬缭缯",
    4,
    "缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"
  ],
  [
    "e840",
    "鐯",
    14,
    "鐿",
    43,
    "鑬鑭鑮鑯"
  ],
  [
    "e880",
    "鑰",
    20,
    "钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"
  ],
  [
    "e940",
    "锧锳锽镃镈镋镕镚镠镮镴镵長",
    7,
    "門",
    42
  ],
  [
    "e980",
    "閫",
    32,
    "椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"
  ],
  [
    "ea40",
    "闌",
    27,
    "闬闿阇阓阘阛阞阠阣",
    6,
    "阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"
  ],
  [
    "ea80",
    "陘陙陚陜陝陞陠陣陥陦陫陭",
    4,
    "陳陸",
    12,
    "隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"
  ],
  [
    "eb40",
    "隌階隑隒隓隕隖隚際隝",
    9,
    "隨",
    7,
    "隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",
    9,
    "雡",
    6,
    "雫"
  ],
  [
    "eb80",
    "雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",
    4,
    "霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"
  ],
  [
    "ec40",
    "霡",
    8,
    "霫霬霮霯霱霳",
    4,
    "霺霻霼霽霿",
    18,
    "靔靕靗靘靚靜靝靟靣靤靦靧靨靪",
    7
  ],
  [
    "ec80",
    "靲靵靷",
    4,
    "靽",
    7,
    "鞆",
    4,
    "鞌鞎鞏鞐鞓鞕鞖鞗鞙",
    4,
    "臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"
  ],
  [
    "ed40",
    "鞞鞟鞡鞢鞤",
    6,
    "鞬鞮鞰鞱鞳鞵",
    46
  ],
  [
    "ed80",
    "韤韥韨韮",
    4,
    "韴韷",
    23,
    "怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"
  ],
  [
    "ee40",
    "頏",
    62
  ],
  [
    "ee80",
    "顎",
    32,
    "睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",
    4,
    "钼钽钿铄铈",
    6,
    "铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"
  ],
  [
    "ef40",
    "顯",
    5,
    "颋颎颒颕颙颣風",
    37,
    "飏飐飔飖飗飛飜飝飠",
    4
  ],
  [
    "ef80",
    "飥飦飩",
    30,
    "铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",
    4,
    "锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",
    8,
    "镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"
  ],
  [
    "f040",
    "餈",
    4,
    "餎餏餑",
    28,
    "餯",
    26
  ],
  [
    "f080",
    "饊",
    9,
    "饖",
    12,
    "饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",
    4,
    "鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",
    6,
    "鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"
  ],
  [
    "f140",
    "馌馎馚",
    10,
    "馦馧馩",
    47
  ],
  [
    "f180",
    "駙",
    32,
    "瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"
  ],
  [
    "f240",
    "駺",
    62
  ],
  [
    "f280",
    "騹",
    32,
    "颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"
  ],
  [
    "f340",
    "驚",
    17,
    "驲骃骉骍骎骔骕骙骦骩",
    6,
    "骲骳骴骵骹骻骽骾骿髃髄髆",
    4,
    "髍髎髏髐髒體髕髖髗髙髚髛髜"
  ],
  [
    "f380",
    "髝髞髠髢髣髤髥髧髨髩髪髬髮髰",
    8,
    "髺髼",
    6,
    "鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"
  ],
  [
    "f440",
    "鬇鬉",
    5,
    "鬐鬑鬒鬔",
    10,
    "鬠鬡鬢鬤",
    10,
    "鬰鬱鬳",
    7,
    "鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",
    5
  ],
  [
    "f480",
    "魛",
    32,
    "簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"
  ],
  [
    "f540",
    "魼",
    62
  ],
  [
    "f580",
    "鮻",
    32,
    "酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"
  ],
  [
    "f640",
    "鯜",
    62
  ],
  [
    "f680",
    "鰛",
    32,
    "觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",
    5,
    "龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",
    5,
    "鲥",
    4,
    "鲫鲭鲮鲰",
    7,
    "鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"
  ],
  [
    "f740",
    "鰼",
    62
  ],
  [
    "f780",
    "鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",
    4,
    "鳈鳉鳑鳒鳚鳛鳠鳡鳌",
    4,
    "鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"
  ],
  [
    "f840",
    "鳣",
    62
  ],
  [
    "f880",
    "鴢",
    32
  ],
  [
    "f940",
    "鵃",
    62
  ],
  [
    "f980",
    "鶂",
    32
  ],
  [
    "fa40",
    "鶣",
    62
  ],
  [
    "fa80",
    "鷢",
    32
  ],
  [
    "fb40",
    "鸃",
    27,
    "鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",
    9,
    "麀"
  ],
  [
    "fb80",
    "麁麃麄麅麆麉麊麌",
    5,
    "麔",
    8,
    "麞麠",
    5,
    "麧麨麩麪"
  ],
  [
    "fc40",
    "麫",
    8,
    "麵麶麷麹麺麼麿",
    4,
    "黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",
    8,
    "黺黽黿",
    6
  ],
  [
    "fc80",
    "鼆",
    4,
    "鼌鼏鼑鼒鼔鼕鼖鼘鼚",
    5,
    "鼡鼣",
    8,
    "鼭鼮鼰鼱"
  ],
  [
    "fd40",
    "鼲",
    4,
    "鼸鼺鼼鼿",
    4,
    "齅",
    10,
    "齒",
    38
  ],
  [
    "fd80",
    "齹",
    5,
    "龁龂龍",
    11,
    "龜龝龞龡",
    4,
    "郎凉秊裏隣"
  ],
  [
    "fe40",
    "兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"
  ]
], Pl = [
  [
    "a140",
    "",
    62
  ],
  [
    "a180",
    "",
    32
  ],
  [
    "a240",
    "",
    62
  ],
  [
    "a280",
    "",
    32
  ],
  [
    "a2ab",
    "",
    5
  ],
  [
    "a2e3",
    "€"
  ],
  [
    "a2ef",
    ""
  ],
  [
    "a2fd",
    ""
  ],
  [
    "a340",
    "",
    62
  ],
  [
    "a380",
    "",
    31,
    "　"
  ],
  [
    "a440",
    "",
    62
  ],
  [
    "a480",
    "",
    32
  ],
  [
    "a4f4",
    "",
    10
  ],
  [
    "a540",
    "",
    62
  ],
  [
    "a580",
    "",
    32
  ],
  [
    "a5f7",
    "",
    7
  ],
  [
    "a640",
    "",
    62
  ],
  [
    "a680",
    "",
    32
  ],
  [
    "a6b9",
    "",
    7
  ],
  [
    "a6d9",
    "",
    6
  ],
  [
    "a6ec",
    ""
  ],
  [
    "a6f3",
    ""
  ],
  [
    "a6f6",
    "",
    8
  ],
  [
    "a740",
    "",
    62
  ],
  [
    "a780",
    "",
    32
  ],
  [
    "a7c2",
    "",
    14
  ],
  [
    "a7f2",
    "",
    12
  ],
  [
    "a896",
    "",
    10
  ],
  [
    "a8bc",
    "ḿ"
  ],
  [
    "a8bf",
    "ǹ"
  ],
  [
    "a8c1",
    ""
  ],
  [
    "a8ea",
    "",
    20
  ],
  [
    "a958",
    ""
  ],
  [
    "a95b",
    ""
  ],
  [
    "a95d",
    ""
  ],
  [
    "a989",
    "〾⿰",
    11
  ],
  [
    "a997",
    "",
    12
  ],
  [
    "a9f0",
    "",
    14
  ],
  [
    "aaa1",
    "",
    93
  ],
  [
    "aba1",
    "",
    93
  ],
  [
    "aca1",
    "",
    93
  ],
  [
    "ada1",
    "",
    93
  ],
  [
    "aea1",
    "",
    93
  ],
  [
    "afa1",
    "",
    93
  ],
  [
    "d7fa",
    "",
    4
  ],
  [
    "f8a1",
    "",
    93
  ],
  [
    "f9a1",
    "",
    93
  ],
  [
    "faa1",
    "",
    93
  ],
  [
    "fba1",
    "",
    93
  ],
  [
    "fca1",
    "",
    93
  ],
  [
    "fda1",
    "",
    93
  ],
  [
    "fe50",
    "⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
  ],
  [
    "fe80",
    "䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
    6,
    "䶮",
    93
  ],
  [
    "8135f437",
    ""
  ]
], Wp = [
  128,
  165,
  169,
  178,
  184,
  216,
  226,
  235,
  238,
  244,
  248,
  251,
  253,
  258,
  276,
  284,
  300,
  325,
  329,
  334,
  364,
  463,
  465,
  467,
  469,
  471,
  473,
  475,
  477,
  506,
  594,
  610,
  712,
  716,
  730,
  930,
  938,
  962,
  970,
  1026,
  1104,
  1106,
  8209,
  8215,
  8218,
  8222,
  8231,
  8241,
  8244,
  8246,
  8252,
  8365,
  8452,
  8454,
  8458,
  8471,
  8482,
  8556,
  8570,
  8596,
  8602,
  8713,
  8720,
  8722,
  8726,
  8731,
  8737,
  8740,
  8742,
  8748,
  8751,
  8760,
  8766,
  8777,
  8781,
  8787,
  8802,
  8808,
  8816,
  8854,
  8858,
  8870,
  8896,
  8979,
  9322,
  9372,
  9548,
  9588,
  9616,
  9622,
  9634,
  9652,
  9662,
  9672,
  9676,
  9680,
  9702,
  9735,
  9738,
  9793,
  9795,
  11906,
  11909,
  11913,
  11917,
  11928,
  11944,
  11947,
  11951,
  11956,
  11960,
  11964,
  11979,
  12284,
  12292,
  12312,
  12319,
  12330,
  12351,
  12436,
  12447,
  12535,
  12543,
  12586,
  12842,
  12850,
  12964,
  13200,
  13215,
  13218,
  13253,
  13263,
  13267,
  13270,
  13384,
  13428,
  13727,
  13839,
  13851,
  14617,
  14703,
  14801,
  14816,
  14964,
  15183,
  15471,
  15585,
  16471,
  16736,
  17208,
  17325,
  17330,
  17374,
  17623,
  17997,
  18018,
  18212,
  18218,
  18301,
  18318,
  18760,
  18811,
  18814,
  18820,
  18823,
  18844,
  18848,
  18872,
  19576,
  19620,
  19738,
  19887,
  40870,
  59244,
  59336,
  59367,
  59413,
  59417,
  59423,
  59431,
  59437,
  59443,
  59452,
  59460,
  59478,
  59493,
  63789,
  63866,
  63894,
  63976,
  63986,
  64016,
  64018,
  64021,
  64025,
  64034,
  64037,
  64042,
  65074,
  65093,
  65107,
  65112,
  65127,
  65132,
  65375,
  65510,
  65536
], zp = [
  0,
  36,
  38,
  45,
  50,
  81,
  89,
  95,
  96,
  100,
  103,
  104,
  105,
  109,
  126,
  133,
  148,
  172,
  175,
  179,
  208,
  306,
  307,
  308,
  309,
  310,
  311,
  312,
  313,
  341,
  428,
  443,
  544,
  545,
  558,
  741,
  742,
  749,
  750,
  805,
  819,
  820,
  7922,
  7924,
  7925,
  7927,
  7934,
  7943,
  7944,
  7945,
  7950,
  8062,
  8148,
  8149,
  8152,
  8164,
  8174,
  8236,
  8240,
  8262,
  8264,
  8374,
  8380,
  8381,
  8384,
  8388,
  8390,
  8392,
  8393,
  8394,
  8396,
  8401,
  8406,
  8416,
  8419,
  8424,
  8437,
  8439,
  8445,
  8482,
  8485,
  8496,
  8521,
  8603,
  8936,
  8946,
  9046,
  9050,
  9063,
  9066,
  9076,
  9092,
  9100,
  9108,
  9111,
  9113,
  9131,
  9162,
  9164,
  9218,
  9219,
  11329,
  11331,
  11334,
  11336,
  11346,
  11361,
  11363,
  11366,
  11370,
  11372,
  11375,
  11389,
  11682,
  11686,
  11687,
  11692,
  11694,
  11714,
  11716,
  11723,
  11725,
  11730,
  11736,
  11982,
  11989,
  12102,
  12336,
  12348,
  12350,
  12384,
  12393,
  12395,
  12397,
  12510,
  12553,
  12851,
  12962,
  12973,
  13738,
  13823,
  13919,
  13933,
  14080,
  14298,
  14585,
  14698,
  15583,
  15847,
  16318,
  16434,
  16438,
  16481,
  16729,
  17102,
  17122,
  17315,
  17320,
  17402,
  17418,
  17859,
  17909,
  17911,
  17915,
  17916,
  17936,
  17939,
  17961,
  18664,
  18703,
  18814,
  18962,
  19043,
  33469,
  33470,
  33471,
  33484,
  33485,
  33490,
  33497,
  33501,
  33505,
  33513,
  33520,
  33536,
  33550,
  37845,
  37921,
  37948,
  38029,
  38038,
  38064,
  38065,
  38066,
  38069,
  38075,
  38076,
  38078,
  39108,
  39109,
  39113,
  39114,
  39115,
  39116,
  39265,
  39394,
  189e3
], Yp = {
  uChars: Wp,
  gbChars: zp
}, Xp = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8141",
    "갂갃갅갆갋",
    4,
    "갘갞갟갡갢갣갥",
    6,
    "갮갲갳갴"
  ],
  [
    "8161",
    "갵갶갷갺갻갽갾갿걁",
    9,
    "걌걎",
    5,
    "걕"
  ],
  [
    "8181",
    "걖걗걙걚걛걝",
    18,
    "걲걳걵걶걹걻",
    4,
    "겂겇겈겍겎겏겑겒겓겕",
    6,
    "겞겢",
    5,
    "겫겭겮겱",
    6,
    "겺겾겿곀곂곃곅곆곇곉곊곋곍",
    7,
    "곖곘",
    7,
    "곢곣곥곦곩곫곭곮곲곴곷",
    4,
    "곾곿괁괂괃괅괇",
    4,
    "괎괐괒괓"
  ],
  [
    "8241",
    "괔괕괖괗괙괚괛괝괞괟괡",
    7,
    "괪괫괮",
    5
  ],
  [
    "8261",
    "괶괷괹괺괻괽",
    6,
    "굆굈굊",
    5,
    "굑굒굓굕굖굗"
  ],
  [
    "8281",
    "굙",
    7,
    "굢굤",
    7,
    "굮굯굱굲굷굸굹굺굾궀궃",
    4,
    "궊궋궍궎궏궑",
    10,
    "궞",
    5,
    "궥",
    17,
    "궸",
    7,
    "귂귃귅귆귇귉",
    6,
    "귒귔",
    7,
    "귝귞귟귡귢귣귥",
    18
  ],
  [
    "8341",
    "귺귻귽귾긂",
    5,
    "긊긌긎",
    5,
    "긕",
    7
  ],
  [
    "8361",
    "긝",
    18,
    "긲긳긵긶긹긻긼"
  ],
  [
    "8381",
    "긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",
    4,
    "깞깢깣깤깦깧깪깫깭깮깯깱",
    6,
    "깺깾",
    5,
    "꺆",
    5,
    "꺍",
    46,
    "꺿껁껂껃껅",
    6,
    "껎껒",
    5,
    "껚껛껝",
    8
  ],
  [
    "8441",
    "껦껧껩껪껬껮",
    5,
    "껵껶껷껹껺껻껽",
    8
  ],
  [
    "8461",
    "꼆꼉꼊꼋꼌꼎꼏꼑",
    18
  ],
  [
    "8481",
    "꼤",
    7,
    "꼮꼯꼱꼳꼵",
    6,
    "꼾꽀꽄꽅꽆꽇꽊",
    5,
    "꽑",
    10,
    "꽞",
    5,
    "꽦",
    18,
    "꽺",
    5,
    "꾁꾂꾃꾅꾆꾇꾉",
    6,
    "꾒꾓꾔꾖",
    5,
    "꾝",
    26,
    "꾺꾻꾽꾾"
  ],
  [
    "8541",
    "꾿꿁",
    5,
    "꿊꿌꿏",
    4,
    "꿕",
    6,
    "꿝",
    4
  ],
  [
    "8561",
    "꿢",
    5,
    "꿪",
    5,
    "꿲꿳꿵꿶꿷꿹",
    6,
    "뀂뀃"
  ],
  [
    "8581",
    "뀅",
    6,
    "뀍뀎뀏뀑뀒뀓뀕",
    6,
    "뀞",
    9,
    "뀩",
    26,
    "끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",
    29,
    "끾끿낁낂낃낅",
    6,
    "낎낐낒",
    5,
    "낛낝낞낣낤"
  ],
  [
    "8641",
    "낥낦낧낪낰낲낶낷낹낺낻낽",
    6,
    "냆냊",
    5,
    "냒"
  ],
  [
    "8661",
    "냓냕냖냗냙",
    6,
    "냡냢냣냤냦",
    10
  ],
  [
    "8681",
    "냱",
    22,
    "넊넍넎넏넑넔넕넖넗넚넞",
    4,
    "넦넧넩넪넫넭",
    6,
    "넶넺",
    5,
    "녂녃녅녆녇녉",
    6,
    "녒녓녖녗녙녚녛녝녞녟녡",
    22,
    "녺녻녽녾녿놁놃",
    4,
    "놊놌놎놏놐놑놕놖놗놙놚놛놝"
  ],
  [
    "8741",
    "놞",
    9,
    "놩",
    15
  ],
  [
    "8761",
    "놹",
    18,
    "뇍뇎뇏뇑뇒뇓뇕"
  ],
  [
    "8781",
    "뇖",
    5,
    "뇞뇠",
    7,
    "뇪뇫뇭뇮뇯뇱",
    7,
    "뇺뇼뇾",
    5,
    "눆눇눉눊눍",
    6,
    "눖눘눚",
    5,
    "눡",
    18,
    "눵",
    6,
    "눽",
    26,
    "뉙뉚뉛뉝뉞뉟뉡",
    6,
    "뉪",
    4
  ],
  [
    "8841",
    "뉯",
    4,
    "뉶",
    5,
    "뉽",
    6,
    "늆늇늈늊",
    4
  ],
  [
    "8861",
    "늏늒늓늕늖늗늛",
    4,
    "늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"
  ],
  [
    "8881",
    "늸",
    15,
    "닊닋닍닎닏닑닓",
    4,
    "닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",
    6,
    "댒댖",
    5,
    "댝",
    54,
    "덗덙덚덝덠덡덢덣"
  ],
  [
    "8941",
    "덦덨덪덬덭덯덲덳덵덶덷덹",
    6,
    "뎂뎆",
    5,
    "뎍"
  ],
  [
    "8961",
    "뎎뎏뎑뎒뎓뎕",
    10,
    "뎢",
    5,
    "뎩뎪뎫뎭"
  ],
  [
    "8981",
    "뎮",
    21,
    "돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",
    18,
    "돽",
    18,
    "됑",
    6,
    "됙됚됛됝됞됟됡",
    6,
    "됪됬",
    7,
    "됵",
    15
  ],
  [
    "8a41",
    "둅",
    10,
    "둒둓둕둖둗둙",
    6,
    "둢둤둦"
  ],
  [
    "8a61",
    "둧",
    4,
    "둭",
    18,
    "뒁뒂"
  ],
  [
    "8a81",
    "뒃",
    4,
    "뒉",
    19,
    "뒞",
    5,
    "뒥뒦뒧뒩뒪뒫뒭",
    7,
    "뒶뒸뒺",
    5,
    "듁듂듃듅듆듇듉",
    6,
    "듑듒듓듔듖",
    5,
    "듞듟듡듢듥듧",
    4,
    "듮듰듲",
    5,
    "듹",
    26,
    "딖딗딙딚딝"
  ],
  [
    "8b41",
    "딞",
    5,
    "딦딫",
    4,
    "딲딳딵딶딷딹",
    6,
    "땂땆"
  ],
  [
    "8b61",
    "땇땈땉땊땎땏땑땒땓땕",
    6,
    "땞땢",
    8
  ],
  [
    "8b81",
    "땫",
    52,
    "떢떣떥떦떧떩떬떭떮떯떲떶",
    4,
    "떾떿뗁뗂뗃뗅",
    6,
    "뗎뗒",
    5,
    "뗙",
    18,
    "뗭",
    18
  ],
  [
    "8c41",
    "똀",
    15,
    "똒똓똕똖똗똙",
    4
  ],
  [
    "8c61",
    "똞",
    6,
    "똦",
    5,
    "똭",
    6,
    "똵",
    5
  ],
  [
    "8c81",
    "똻",
    12,
    "뙉",
    26,
    "뙥뙦뙧뙩",
    50,
    "뚞뚟뚡뚢뚣뚥",
    5,
    "뚭뚮뚯뚰뚲",
    16
  ],
  [
    "8d41",
    "뛃",
    16,
    "뛕",
    8
  ],
  [
    "8d61",
    "뛞",
    17,
    "뛱뛲뛳뛵뛶뛷뛹뛺"
  ],
  [
    "8d81",
    "뛻",
    4,
    "뜂뜃뜄뜆",
    33,
    "뜪뜫뜭뜮뜱",
    6,
    "뜺뜼",
    7,
    "띅띆띇띉띊띋띍",
    6,
    "띖",
    9,
    "띡띢띣띥띦띧띩",
    6,
    "띲띴띶",
    5,
    "띾띿랁랂랃랅",
    6,
    "랎랓랔랕랚랛랝랞"
  ],
  [
    "8e41",
    "랟랡",
    6,
    "랪랮",
    5,
    "랶랷랹",
    8
  ],
  [
    "8e61",
    "럂",
    4,
    "럈럊",
    19
  ],
  [
    "8e81",
    "럞",
    13,
    "럮럯럱럲럳럵",
    6,
    "럾렂",
    4,
    "렊렋렍렎렏렑",
    6,
    "렚렜렞",
    5,
    "렦렧렩렪렫렭",
    6,
    "렶렺",
    5,
    "롁롂롃롅",
    11,
    "롒롔",
    7,
    "롞롟롡롢롣롥",
    6,
    "롮롰롲",
    5,
    "롹롺롻롽",
    7
  ],
  [
    "8f41",
    "뢅",
    7,
    "뢎",
    17
  ],
  [
    "8f61",
    "뢠",
    7,
    "뢩",
    6,
    "뢱뢲뢳뢵뢶뢷뢹",
    4
  ],
  [
    "8f81",
    "뢾뢿룂룄룆",
    5,
    "룍룎룏룑룒룓룕",
    7,
    "룞룠룢",
    5,
    "룪룫룭룮룯룱",
    6,
    "룺룼룾",
    5,
    "뤅",
    18,
    "뤙",
    6,
    "뤡",
    26,
    "뤾뤿륁륂륃륅",
    6,
    "륍륎륐륒",
    5
  ],
  [
    "9041",
    "륚륛륝륞륟륡",
    6,
    "륪륬륮",
    5,
    "륶륷륹륺륻륽"
  ],
  [
    "9061",
    "륾",
    5,
    "릆릈릋릌릏",
    15
  ],
  [
    "9081",
    "릟",
    12,
    "릮릯릱릲릳릵",
    6,
    "릾맀맂",
    5,
    "맊맋맍맓",
    4,
    "맚맜맟맠맢맦맧맩맪맫맭",
    6,
    "맶맻",
    4,
    "먂",
    5,
    "먉",
    11,
    "먖",
    33,
    "먺먻먽먾먿멁멃멄멅멆"
  ],
  [
    "9141",
    "멇멊멌멏멐멑멒멖멗멙멚멛멝",
    6,
    "멦멪",
    5
  ],
  [
    "9161",
    "멲멳멵멶멷멹",
    9,
    "몆몈몉몊몋몍",
    5
  ],
  [
    "9181",
    "몓",
    20,
    "몪몭몮몯몱몳",
    4,
    "몺몼몾",
    5,
    "뫅뫆뫇뫉",
    14,
    "뫚",
    33,
    "뫽뫾뫿묁묂묃묅",
    7,
    "묎묐묒",
    5,
    "묙묚묛묝묞묟묡",
    6
  ],
  [
    "9241",
    "묨묪묬",
    7,
    "묷묹묺묿",
    4,
    "뭆뭈뭊뭋뭌뭎뭑뭒"
  ],
  [
    "9261",
    "뭓뭕뭖뭗뭙",
    7,
    "뭢뭤",
    7,
    "뭭",
    4
  ],
  [
    "9281",
    "뭲",
    21,
    "뮉뮊뮋뮍뮎뮏뮑",
    18,
    "뮥뮦뮧뮩뮪뮫뮭",
    6,
    "뮵뮶뮸",
    7,
    "믁믂믃믅믆믇믉",
    6,
    "믑믒믔",
    35,
    "믺믻믽믾밁"
  ],
  [
    "9341",
    "밃",
    4,
    "밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"
  ],
  [
    "9361",
    "밶밷밹",
    6,
    "뱂뱆뱇뱈뱊뱋뱎뱏뱑",
    8
  ],
  [
    "9381",
    "뱚뱛뱜뱞",
    37,
    "벆벇벉벊벍벏",
    4,
    "벖벘벛",
    4,
    "벢벣벥벦벩",
    6,
    "벲벶",
    5,
    "벾벿볁볂볃볅",
    7,
    "볎볒볓볔볖볗볙볚볛볝",
    22,
    "볷볹볺볻볽"
  ],
  [
    "9441",
    "볾",
    5,
    "봆봈봊",
    5,
    "봑봒봓봕",
    8
  ],
  [
    "9461",
    "봞",
    5,
    "봥",
    6,
    "봭",
    12
  ],
  [
    "9481",
    "봺",
    5,
    "뵁",
    6,
    "뵊뵋뵍뵎뵏뵑",
    6,
    "뵚",
    9,
    "뵥뵦뵧뵩",
    22,
    "붂붃붅붆붋",
    4,
    "붒붔붖붗붘붛붝",
    6,
    "붥",
    10,
    "붱",
    6,
    "붹",
    24
  ],
  [
    "9541",
    "뷒뷓뷖뷗뷙뷚뷛뷝",
    11,
    "뷪",
    5,
    "뷱"
  ],
  [
    "9561",
    "뷲뷳뷵뷶뷷뷹",
    6,
    "븁븂븄븆",
    5,
    "븎븏븑븒븓"
  ],
  [
    "9581",
    "븕",
    6,
    "븞븠",
    35,
    "빆빇빉빊빋빍빏",
    4,
    "빖빘빜빝빞빟빢빣빥빦빧빩빫",
    4,
    "빲빶",
    4,
    "빾빿뺁뺂뺃뺅",
    6,
    "뺎뺒",
    5,
    "뺚",
    13,
    "뺩",
    14
  ],
  [
    "9641",
    "뺸",
    23,
    "뻒뻓"
  ],
  [
    "9661",
    "뻕뻖뻙",
    6,
    "뻡뻢뻦",
    5,
    "뻭",
    8
  ],
  [
    "9681",
    "뻶",
    10,
    "뼂",
    5,
    "뼊",
    13,
    "뼚뼞",
    33,
    "뽂뽃뽅뽆뽇뽉",
    6,
    "뽒뽓뽔뽖",
    44
  ],
  [
    "9741",
    "뾃",
    16,
    "뾕",
    8
  ],
  [
    "9761",
    "뾞",
    17,
    "뾱",
    7
  ],
  [
    "9781",
    "뾹",
    11,
    "뿆",
    5,
    "뿎뿏뿑뿒뿓뿕",
    6,
    "뿝뿞뿠뿢",
    89,
    "쀽쀾쀿"
  ],
  [
    "9841",
    "쁀",
    16,
    "쁒",
    5,
    "쁙쁚쁛"
  ],
  [
    "9861",
    "쁝쁞쁟쁡",
    6,
    "쁪",
    15
  ],
  [
    "9881",
    "쁺",
    21,
    "삒삓삕삖삗삙",
    6,
    "삢삤삦",
    5,
    "삮삱삲삷",
    4,
    "삾샂샃샄샆샇샊샋샍샎샏샑",
    6,
    "샚샞",
    5,
    "샦샧샩샪샫샭",
    6,
    "샶샸샺",
    5,
    "섁섂섃섅섆섇섉",
    6,
    "섑섒섓섔섖",
    5,
    "섡섢섥섨섩섪섫섮"
  ],
  [
    "9941",
    "섲섳섴섵섷섺섻섽섾섿셁",
    6,
    "셊셎",
    5,
    "셖셗"
  ],
  [
    "9961",
    "셙셚셛셝",
    6,
    "셦셪",
    5,
    "셱셲셳셵셶셷셹셺셻"
  ],
  [
    "9981",
    "셼",
    8,
    "솆",
    5,
    "솏솑솒솓솕솗",
    4,
    "솞솠솢솣솤솦솧솪솫솭솮솯솱",
    11,
    "솾",
    5,
    "쇅쇆쇇쇉쇊쇋쇍",
    6,
    "쇕쇖쇙",
    6,
    "쇡쇢쇣쇥쇦쇧쇩",
    6,
    "쇲쇴",
    7,
    "쇾쇿숁숂숃숅",
    6,
    "숎숐숒",
    5,
    "숚숛숝숞숡숢숣"
  ],
  [
    "9a41",
    "숤숥숦숧숪숬숮숰숳숵",
    16
  ],
  [
    "9a61",
    "쉆쉇쉉",
    6,
    "쉒쉓쉕쉖쉗쉙",
    6,
    "쉡쉢쉣쉤쉦"
  ],
  [
    "9a81",
    "쉧",
    4,
    "쉮쉯쉱쉲쉳쉵",
    6,
    "쉾슀슂",
    5,
    "슊",
    5,
    "슑",
    6,
    "슙슚슜슞",
    5,
    "슦슧슩슪슫슮",
    5,
    "슶슸슺",
    33,
    "싞싟싡싢싥",
    5,
    "싮싰싲싳싴싵싷싺싽싾싿쌁",
    6,
    "쌊쌋쌎쌏"
  ],
  [
    "9b41",
    "쌐쌑쌒쌖쌗쌙쌚쌛쌝",
    6,
    "쌦쌧쌪",
    8
  ],
  [
    "9b61",
    "쌳",
    17,
    "썆",
    7
  ],
  [
    "9b81",
    "썎",
    25,
    "썪썫썭썮썯썱썳",
    4,
    "썺썻썾",
    5,
    "쎅쎆쎇쎉쎊쎋쎍",
    50,
    "쏁",
    22,
    "쏚"
  ],
  [
    "9c41",
    "쏛쏝쏞쏡쏣",
    4,
    "쏪쏫쏬쏮",
    5,
    "쏶쏷쏹",
    5
  ],
  [
    "9c61",
    "쏿",
    8,
    "쐉",
    6,
    "쐑",
    9
  ],
  [
    "9c81",
    "쐛",
    8,
    "쐥",
    6,
    "쐭쐮쐯쐱쐲쐳쐵",
    6,
    "쐾",
    9,
    "쑉",
    26,
    "쑦쑧쑩쑪쑫쑭",
    6,
    "쑶쑷쑸쑺",
    5,
    "쒁",
    18,
    "쒕",
    6,
    "쒝",
    12
  ],
  [
    "9d41",
    "쒪",
    13,
    "쒹쒺쒻쒽",
    8
  ],
  [
    "9d61",
    "쓆",
    25
  ],
  [
    "9d81",
    "쓠",
    8,
    "쓪",
    5,
    "쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",
    9,
    "씍씎씏씑씒씓씕",
    6,
    "씝",
    10,
    "씪씫씭씮씯씱",
    6,
    "씺씼씾",
    5,
    "앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",
    6,
    "앲앶",
    5,
    "앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"
  ],
  [
    "9e41",
    "얖얙얚얛얝얞얟얡",
    7,
    "얪",
    9,
    "얶"
  ],
  [
    "9e61",
    "얷얺얿",
    4,
    "엋엍엏엒엓엕엖엗엙",
    6,
    "엢엤엦엧"
  ],
  [
    "9e81",
    "엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",
    6,
    "옚옝",
    6,
    "옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",
    6,
    "왒왖",
    5,
    "왞왟왡",
    10,
    "왭왮왰왲",
    5,
    "왺왻왽왾왿욁",
    6,
    "욊욌욎",
    5,
    "욖욗욙욚욛욝",
    6,
    "욦"
  ],
  [
    "9f41",
    "욨욪",
    5,
    "욲욳욵욶욷욻",
    4,
    "웂웄웆",
    5,
    "웎"
  ],
  [
    "9f61",
    "웏웑웒웓웕",
    6,
    "웞웟웢",
    5,
    "웪웫웭웮웯웱웲"
  ],
  [
    "9f81",
    "웳",
    4,
    "웺웻웼웾",
    5,
    "윆윇윉윊윋윍",
    6,
    "윖윘윚",
    5,
    "윢윣윥윦윧윩",
    6,
    "윲윴윶윸윹윺윻윾윿읁읂읃읅",
    4,
    "읋읎읐읙읚읛읝읞읟읡",
    6,
    "읩읪읬",
    7,
    "읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",
    4,
    "잢잧",
    4,
    "잮잯잱잲잳잵잶잷"
  ],
  [
    "a041",
    "잸잹잺잻잾쟂",
    5,
    "쟊쟋쟍쟏쟑",
    6,
    "쟙쟚쟛쟜"
  ],
  [
    "a061",
    "쟞",
    5,
    "쟥쟦쟧쟩쟪쟫쟭",
    13
  ],
  [
    "a081",
    "쟻",
    4,
    "젂젃젅젆젇젉젋",
    4,
    "젒젔젗",
    4,
    "젞젟젡젢젣젥",
    6,
    "젮젰젲",
    5,
    "젹젺젻젽젾젿졁",
    6,
    "졊졋졎",
    5,
    "졕",
    26,
    "졲졳졵졶졷졹졻",
    4,
    "좂좄좈좉좊좎",
    5,
    "좕",
    7,
    "좞좠좢좣좤"
  ],
  [
    "a141",
    "좥좦좧좩",
    18,
    "좾좿죀죁"
  ],
  [
    "a161",
    "죂죃죅죆죇죉죊죋죍",
    6,
    "죖죘죚",
    5,
    "죢죣죥"
  ],
  [
    "a181",
    "죦",
    14,
    "죶",
    5,
    "죾죿줁줂줃줇",
    4,
    "줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",
    9,
    "±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"
  ],
  [
    "a241",
    "줐줒",
    5,
    "줙",
    18
  ],
  [
    "a261",
    "줭",
    6,
    "줵",
    18
  ],
  [
    "a281",
    "쥈",
    7,
    "쥒쥓쥕쥖쥗쥙",
    6,
    "쥢쥤",
    7,
    "쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"
  ],
  [
    "a341",
    "쥱쥲쥳쥵",
    6,
    "쥽",
    10,
    "즊즋즍즎즏"
  ],
  [
    "a361",
    "즑",
    6,
    "즚즜즞",
    16
  ],
  [
    "a381",
    "즯",
    16,
    "짂짃짅짆짉짋",
    4,
    "짒짔짗짘짛！",
    58,
    "￦］",
    32,
    "￣"
  ],
  [
    "a441",
    "짞짟짡짣짥짦짨짩짪짫짮짲",
    5,
    "짺짻짽짾짿쨁쨂쨃쨄"
  ],
  [
    "a461",
    "쨅쨆쨇쨊쨎",
    5,
    "쨕쨖쨗쨙",
    12
  ],
  [
    "a481",
    "쨦쨧쨨쨪",
    28,
    "ㄱ",
    93
  ],
  [
    "a541",
    "쩇",
    4,
    "쩎쩏쩑쩒쩓쩕",
    6,
    "쩞쩢",
    5,
    "쩩쩪"
  ],
  [
    "a561",
    "쩫",
    17,
    "쩾",
    5,
    "쪅쪆"
  ],
  [
    "a581",
    "쪇",
    16,
    "쪙",
    14,
    "ⅰ",
    9
  ],
  [
    "a5b0",
    "Ⅰ",
    9
  ],
  [
    "a5c1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a5e1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a641",
    "쪨",
    19,
    "쪾쪿쫁쫂쫃쫅"
  ],
  [
    "a661",
    "쫆",
    5,
    "쫎쫐쫒쫔쫕쫖쫗쫚",
    5,
    "쫡",
    6
  ],
  [
    "a681",
    "쫨쫩쫪쫫쫭",
    6,
    "쫵",
    18,
    "쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",
    7
  ],
  [
    "a741",
    "쬋",
    4,
    "쬑쬒쬓쬕쬖쬗쬙",
    6,
    "쬢",
    7
  ],
  [
    "a761",
    "쬪",
    22,
    "쭂쭃쭄"
  ],
  [
    "a781",
    "쭅쭆쭇쭊쭋쭍쭎쭏쭑",
    6,
    "쭚쭛쭜쭞",
    5,
    "쭥",
    7,
    "㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",
    9,
    "㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",
    9,
    "㎀",
    4,
    "㎺",
    5,
    "㎐",
    4,
    "Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"
  ],
  [
    "a841",
    "쭭",
    10,
    "쭺",
    14
  ],
  [
    "a861",
    "쮉",
    18,
    "쮝",
    6
  ],
  [
    "a881",
    "쮤",
    19,
    "쮹",
    11,
    "ÆÐªĦ"
  ],
  [
    "a8a6",
    "Ĳ"
  ],
  [
    "a8a8",
    "ĿŁØŒºÞŦŊ"
  ],
  [
    "a8b1",
    "㉠",
    27,
    "ⓐ",
    25,
    "①",
    14,
    "½⅓⅔¼¾⅛⅜⅝⅞"
  ],
  [
    "a941",
    "쯅",
    14,
    "쯕",
    10
  ],
  [
    "a961",
    "쯠쯡쯢쯣쯥쯦쯨쯪",
    18
  ],
  [
    "a981",
    "쯽",
    14,
    "찎찏찑찒찓찕",
    6,
    "찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",
    27,
    "⒜",
    25,
    "⑴",
    14,
    "¹²³⁴ⁿ₁₂₃₄"
  ],
  [
    "aa41",
    "찥찦찪찫찭찯찱",
    6,
    "찺찿",
    4,
    "챆챇챉챊챋챍챎"
  ],
  [
    "aa61",
    "챏",
    4,
    "챖챚",
    5,
    "챡챢챣챥챧챩",
    6,
    "챱챲"
  ],
  [
    "aa81",
    "챳챴챶",
    29,
    "ぁ",
    82
  ],
  [
    "ab41",
    "첔첕첖첗첚첛첝첞첟첡",
    6,
    "첪첮",
    5,
    "첶첷첹"
  ],
  [
    "ab61",
    "첺첻첽",
    6,
    "쳆쳈쳊",
    5,
    "쳑쳒쳓쳕",
    5
  ],
  [
    "ab81",
    "쳛",
    8,
    "쳥",
    6,
    "쳭쳮쳯쳱",
    12,
    "ァ",
    85
  ],
  [
    "ac41",
    "쳾쳿촀촂",
    5,
    "촊촋촍촎촏촑",
    6,
    "촚촜촞촟촠"
  ],
  [
    "ac61",
    "촡촢촣촥촦촧촩촪촫촭",
    11,
    "촺",
    4
  ],
  [
    "ac81",
    "촿",
    28,
    "쵝쵞쵟А",
    5,
    "ЁЖ",
    25
  ],
  [
    "acd1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "ad41",
    "쵡쵢쵣쵥",
    6,
    "쵮쵰쵲",
    5,
    "쵹",
    7
  ],
  [
    "ad61",
    "춁",
    6,
    "춉",
    10,
    "춖춗춙춚춛춝춞춟"
  ],
  [
    "ad81",
    "춠춡춢춣춦춨춪",
    5,
    "춱",
    18,
    "췅"
  ],
  [
    "ae41",
    "췆",
    5,
    "췍췎췏췑",
    16
  ],
  [
    "ae61",
    "췢",
    5,
    "췩췪췫췭췮췯췱",
    6,
    "췺췼췾",
    4
  ],
  [
    "ae81",
    "츃츅츆츇츉츊츋츍",
    6,
    "츕츖츗츘츚",
    5,
    "츢츣츥츦츧츩츪츫"
  ],
  [
    "af41",
    "츬츭츮츯츲츴츶",
    19
  ],
  [
    "af61",
    "칊",
    13,
    "칚칛칝칞칢",
    5,
    "칪칬"
  ],
  [
    "af81",
    "칮",
    5,
    "칶칷칹칺칻칽",
    6,
    "캆캈캊",
    5,
    "캒캓캕캖캗캙"
  ],
  [
    "b041",
    "캚",
    5,
    "캢캦",
    5,
    "캮",
    12
  ],
  [
    "b061",
    "캻",
    5,
    "컂",
    19
  ],
  [
    "b081",
    "컖",
    13,
    "컦컧컩컪컭",
    6,
    "컶컺",
    5,
    "가각간갇갈갉갊감",
    7,
    "같",
    4,
    "갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"
  ],
  [
    "b141",
    "켂켃켅켆켇켉",
    6,
    "켒켔켖",
    5,
    "켝켞켟켡켢켣"
  ],
  [
    "b161",
    "켥",
    6,
    "켮켲",
    5,
    "켹",
    11
  ],
  [
    "b181",
    "콅",
    14,
    "콖콗콙콚콛콝",
    6,
    "콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"
  ],
  [
    "b241",
    "콭콮콯콲콳콵콶콷콹",
    6,
    "쾁쾂쾃쾄쾆",
    5,
    "쾍"
  ],
  [
    "b261",
    "쾎",
    18,
    "쾢",
    5,
    "쾩"
  ],
  [
    "b281",
    "쾪",
    5,
    "쾱",
    18,
    "쿅",
    6,
    "깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"
  ],
  [
    "b341",
    "쿌",
    19,
    "쿢쿣쿥쿦쿧쿩"
  ],
  [
    "b361",
    "쿪",
    5,
    "쿲쿴쿶",
    5,
    "쿽쿾쿿퀁퀂퀃퀅",
    5
  ],
  [
    "b381",
    "퀋",
    5,
    "퀒",
    5,
    "퀙",
    19,
    "끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",
    4,
    "낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"
  ],
  [
    "b441",
    "퀮",
    5,
    "퀶퀷퀹퀺퀻퀽",
    6,
    "큆큈큊",
    5
  ],
  [
    "b461",
    "큑큒큓큕큖큗큙",
    6,
    "큡",
    10,
    "큮큯"
  ],
  [
    "b481",
    "큱큲큳큵",
    6,
    "큾큿킀킂",
    18,
    "뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",
    4,
    "닳담답닷",
    4,
    "닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"
  ],
  [
    "b541",
    "킕",
    14,
    "킦킧킩킪킫킭",
    5
  ],
  [
    "b561",
    "킳킶킸킺",
    5,
    "탂탃탅탆탇탊",
    5,
    "탒탖",
    4
  ],
  [
    "b581",
    "탛탞탟탡탢탣탥",
    6,
    "탮탲",
    5,
    "탹",
    11,
    "덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"
  ],
  [
    "b641",
    "턅",
    7,
    "턎",
    17
  ],
  [
    "b661",
    "턠",
    15,
    "턲턳턵턶턷턹턻턼턽턾"
  ],
  [
    "b681",
    "턿텂텆",
    5,
    "텎텏텑텒텓텕",
    6,
    "텞텠텢",
    5,
    "텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"
  ],
  [
    "b741",
    "텮",
    13,
    "텽",
    6,
    "톅톆톇톉톊"
  ],
  [
    "b761",
    "톋",
    20,
    "톢톣톥톦톧"
  ],
  [
    "b781",
    "톩",
    6,
    "톲톴톶톷톸톹톻톽톾톿퇁",
    14,
    "래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"
  ],
  [
    "b841",
    "퇐",
    7,
    "퇙",
    17
  ],
  [
    "b861",
    "퇫",
    8,
    "퇵퇶퇷퇹",
    13
  ],
  [
    "b881",
    "툈툊",
    5,
    "툑",
    24,
    "륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",
    4,
    "맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"
  ],
  [
    "b941",
    "툪툫툮툯툱툲툳툵",
    6,
    "툾퉀퉂",
    5,
    "퉉퉊퉋퉌"
  ],
  [
    "b961",
    "퉍",
    14,
    "퉝",
    6,
    "퉥퉦퉧퉨"
  ],
  [
    "b981",
    "퉩",
    22,
    "튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",
    4,
    "받",
    4,
    "밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"
  ],
  [
    "ba41",
    "튍튎튏튒튓튔튖",
    5,
    "튝튞튟튡튢튣튥",
    6,
    "튭"
  ],
  [
    "ba61",
    "튮튯튰튲",
    5,
    "튺튻튽튾틁틃",
    4,
    "틊틌",
    5
  ],
  [
    "ba81",
    "틒틓틕틖틗틙틚틛틝",
    6,
    "틦",
    9,
    "틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"
  ],
  [
    "bb41",
    "틻",
    4,
    "팂팄팆",
    5,
    "팏팑팒팓팕팗",
    4,
    "팞팢팣"
  ],
  [
    "bb61",
    "팤팦팧팪팫팭팮팯팱",
    6,
    "팺팾",
    5,
    "퍆퍇퍈퍉"
  ],
  [
    "bb81",
    "퍊",
    31,
    "빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"
  ],
  [
    "bc41",
    "퍪",
    17,
    "퍾퍿펁펂펃펅펆펇"
  ],
  [
    "bc61",
    "펈펉펊펋펎펒",
    5,
    "펚펛펝펞펟펡",
    6,
    "펪펬펮"
  ],
  [
    "bc81",
    "펯",
    4,
    "펵펶펷펹펺펻펽",
    6,
    "폆폇폊",
    5,
    "폑",
    5,
    "샥샨샬샴샵샷샹섀섄섈섐섕서",
    4,
    "섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"
  ],
  [
    "bd41",
    "폗폙",
    7,
    "폢폤",
    7,
    "폮폯폱폲폳폵폶폷"
  ],
  [
    "bd61",
    "폸폹폺폻폾퐀퐂",
    5,
    "퐉",
    13
  ],
  [
    "bd81",
    "퐗",
    5,
    "퐞",
    25,
    "숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"
  ],
  [
    "be41",
    "퐸",
    7,
    "푁푂푃푅",
    14
  ],
  [
    "be61",
    "푔",
    7,
    "푝푞푟푡푢푣푥",
    7,
    "푮푰푱푲"
  ],
  [
    "be81",
    "푳",
    4,
    "푺푻푽푾풁풃",
    4,
    "풊풌풎",
    5,
    "풕",
    8,
    "쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",
    6,
    "엌엎"
  ],
  [
    "bf41",
    "풞",
    10,
    "풪",
    14
  ],
  [
    "bf61",
    "풹",
    18,
    "퓍퓎퓏퓑퓒퓓퓕"
  ],
  [
    "bf81",
    "퓖",
    5,
    "퓝퓞퓠",
    7,
    "퓩퓪퓫퓭퓮퓯퓱",
    6,
    "퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",
    5,
    "옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"
  ],
  [
    "c041",
    "퓾",
    5,
    "픅픆픇픉픊픋픍",
    6,
    "픖픘",
    5
  ],
  [
    "c061",
    "픞",
    25
  ],
  [
    "c081",
    "픸픹픺픻픾픿핁핂핃핅",
    6,
    "핎핐핒",
    5,
    "핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",
    7,
    "읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"
  ],
  [
    "c141",
    "핤핦핧핪핬핮",
    5,
    "핶핷핹핺핻핽",
    6,
    "햆햊햋"
  ],
  [
    "c161",
    "햌햍햎햏햑",
    19,
    "햦햧"
  ],
  [
    "c181",
    "햨",
    31,
    "점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"
  ],
  [
    "c241",
    "헊헋헍헎헏헑헓",
    4,
    "헚헜헞",
    5,
    "헦헧헩헪헫헭헮"
  ],
  [
    "c261",
    "헯",
    4,
    "헶헸헺",
    5,
    "혂혃혅혆혇혉",
    6,
    "혒"
  ],
  [
    "c281",
    "혖",
    5,
    "혝혞혟혡혢혣혥",
    7,
    "혮",
    9,
    "혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"
  ],
  [
    "c341",
    "혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",
    4
  ],
  [
    "c361",
    "홢",
    4,
    "홨홪",
    5,
    "홲홳홵",
    11
  ],
  [
    "c381",
    "횁횂횄횆",
    5,
    "횎횏횑횒횓횕",
    7,
    "횞횠횢",
    5,
    "횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"
  ],
  [
    "c441",
    "횫횭횮횯횱",
    7,
    "횺횼",
    7,
    "훆훇훉훊훋"
  ],
  [
    "c461",
    "훍훎훏훐훒훓훕훖훘훚",
    5,
    "훡훢훣훥훦훧훩",
    4
  ],
  [
    "c481",
    "훮훯훱훲훳훴훶",
    5,
    "훾훿휁휂휃휅",
    11,
    "휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"
  ],
  [
    "c541",
    "휕휖휗휚휛휝휞휟휡",
    6,
    "휪휬휮",
    5,
    "휶휷휹"
  ],
  [
    "c561",
    "휺휻휽",
    6,
    "흅흆흈흊",
    5,
    "흒흓흕흚",
    4
  ],
  [
    "c581",
    "흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",
    6,
    "흾흿힀힂",
    5,
    "힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"
  ],
  [
    "c641",
    "힍힎힏힑",
    6,
    "힚힜힞",
    5
  ],
  [
    "c6a1",
    "퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"
  ],
  [
    "c7a1",
    "퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"
  ],
  [
    "c8a1",
    "혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"
  ],
  [
    "caa1",
    "伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"
  ],
  [
    "cba1",
    "匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"
  ],
  [
    "cca1",
    "瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"
  ],
  [
    "cda1",
    "棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"
  ],
  [
    "cea1",
    "科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"
  ],
  [
    "cfa1",
    "區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"
  ],
  [
    "d0a1",
    "鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"
  ],
  [
    "d1a1",
    "朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",
    5,
    "那樂",
    4,
    "諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"
  ],
  [
    "d2a1",
    "納臘蠟衲囊娘廊",
    4,
    "乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",
    5,
    "駑魯",
    10,
    "濃籠聾膿農惱牢磊腦賂雷尿壘",
    7,
    "嫩訥杻紐勒",
    5,
    "能菱陵尼泥匿溺多茶"
  ],
  [
    "d3a1",
    "丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"
  ],
  [
    "d4a1",
    "棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"
  ],
  [
    "d5a1",
    "蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"
  ],
  [
    "d6a1",
    "煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"
  ],
  [
    "d7a1",
    "遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"
  ],
  [
    "d8a1",
    "立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"
  ],
  [
    "d9a1",
    "蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"
  ],
  [
    "daa1",
    "汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"
  ],
  [
    "dba1",
    "發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"
  ],
  [
    "dca1",
    "碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"
  ],
  [
    "dda1",
    "孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"
  ],
  [
    "dea1",
    "脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"
  ],
  [
    "dfa1",
    "傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"
  ],
  [
    "e0a1",
    "胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"
  ],
  [
    "e1a1",
    "聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"
  ],
  [
    "e2a1",
    "戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"
  ],
  [
    "e3a1",
    "嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"
  ],
  [
    "e4a1",
    "沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"
  ],
  [
    "e5a1",
    "櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"
  ],
  [
    "e6a1",
    "旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"
  ],
  [
    "e7a1",
    "簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"
  ],
  [
    "e8a1",
    "烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"
  ],
  [
    "e9a1",
    "窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"
  ],
  [
    "eaa1",
    "運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"
  ],
  [
    "eba1",
    "濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"
  ],
  [
    "eca1",
    "議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"
  ],
  [
    "eda1",
    "立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"
  ],
  [
    "eea1",
    "障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"
  ],
  [
    "efa1",
    "煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"
  ],
  [
    "f0a1",
    "靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"
  ],
  [
    "f1a1",
    "踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"
  ],
  [
    "f2a1",
    "咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"
  ],
  [
    "f3a1",
    "鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"
  ],
  [
    "f4a1",
    "責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"
  ],
  [
    "f5a1",
    "椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"
  ],
  [
    "f6a1",
    "贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"
  ],
  [
    "f7a1",
    "鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"
  ],
  [
    "f8a1",
    "阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"
  ],
  [
    "f9a1",
    "品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"
  ],
  [
    "faa1",
    "行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"
  ],
  [
    "fba1",
    "形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"
  ],
  [
    "fca1",
    "禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"
  ],
  [
    "fda1",
    "爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"
  ]
], xl = [
  [
    "0",
    "\0",
    127
  ],
  [
    "a140",
    "　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"
  ],
  [
    "a1a1",
    "﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",
    4,
    "～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"
  ],
  [
    "a240",
    "＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",
    7,
    "▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"
  ],
  [
    "a2a1",
    "╮╰╯═╞╪╡◢◣◥◤╱╲╳０",
    9,
    "Ⅰ",
    9,
    "〡",
    8,
    "十卄卅Ａ",
    25,
    "ａ",
    21
  ],
  [
    "a340",
    "ｗｘｙｚΑ",
    16,
    "Σ",
    6,
    "α",
    16,
    "σ",
    6,
    "ㄅ",
    10
  ],
  [
    "a3a1",
    "ㄐ",
    25,
    "˙ˉˊˇˋ"
  ],
  [
    "a3e1",
    "€"
  ],
  [
    "a440",
    "一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"
  ],
  [
    "a4a1",
    "丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"
  ],
  [
    "a540",
    "世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"
  ],
  [
    "a5a1",
    "央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"
  ],
  [
    "a640",
    "共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"
  ],
  [
    "a6a1",
    "式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"
  ],
  [
    "a740",
    "作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"
  ],
  [
    "a7a1",
    "均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"
  ],
  [
    "a840",
    "杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"
  ],
  [
    "a8a1",
    "芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"
  ],
  [
    "a940",
    "咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"
  ],
  [
    "a9a1",
    "屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"
  ],
  [
    "aa40",
    "昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"
  ],
  [
    "aaa1",
    "炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"
  ],
  [
    "ab40",
    "陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"
  ],
  [
    "aba1",
    "哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"
  ],
  [
    "ac40",
    "拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"
  ],
  [
    "aca1",
    "活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"
  ],
  [
    "ad40",
    "耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"
  ],
  [
    "ada1",
    "迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"
  ],
  [
    "ae40",
    "哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"
  ],
  [
    "aea1",
    "恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"
  ],
  [
    "af40",
    "浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"
  ],
  [
    "afa1",
    "砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"
  ],
  [
    "b040",
    "虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"
  ],
  [
    "b0a1",
    "陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"
  ],
  [
    "b140",
    "娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"
  ],
  [
    "b1a1",
    "情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"
  ],
  [
    "b240",
    "毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"
  ],
  [
    "b2a1",
    "瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"
  ],
  [
    "b340",
    "莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"
  ],
  [
    "b3a1",
    "部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"
  ],
  [
    "b440",
    "婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"
  ],
  [
    "b4a1",
    "插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"
  ],
  [
    "b540",
    "溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"
  ],
  [
    "b5a1",
    "窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"
  ],
  [
    "b640",
    "詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"
  ],
  [
    "b6a1",
    "間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"
  ],
  [
    "b740",
    "媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"
  ],
  [
    "b7a1",
    "楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"
  ],
  [
    "b840",
    "睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"
  ],
  [
    "b8a1",
    "腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"
  ],
  [
    "b940",
    "辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"
  ],
  [
    "b9a1",
    "飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"
  ],
  [
    "ba40",
    "愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"
  ],
  [
    "baa1",
    "滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"
  ],
  [
    "bb40",
    "罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"
  ],
  [
    "bba1",
    "說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"
  ],
  [
    "bc40",
    "劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"
  ],
  [
    "bca1",
    "慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"
  ],
  [
    "bd40",
    "瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"
  ],
  [
    "bda1",
    "翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"
  ],
  [
    "be40",
    "輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"
  ],
  [
    "bea1",
    "鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"
  ],
  [
    "bf40",
    "濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"
  ],
  [
    "bfa1",
    "縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"
  ],
  [
    "c040",
    "錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"
  ],
  [
    "c0a1",
    "嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"
  ],
  [
    "c140",
    "瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"
  ],
  [
    "c1a1",
    "薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"
  ],
  [
    "c240",
    "駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"
  ],
  [
    "c2a1",
    "癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"
  ],
  [
    "c340",
    "鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"
  ],
  [
    "c3a1",
    "獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"
  ],
  [
    "c440",
    "願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"
  ],
  [
    "c4a1",
    "纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"
  ],
  [
    "c540",
    "護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"
  ],
  [
    "c5a1",
    "禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"
  ],
  [
    "c640",
    "讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"
  ],
  [
    "c940",
    "乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"
  ],
  [
    "c9a1",
    "氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"
  ],
  [
    "ca40",
    "汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"
  ],
  [
    "caa1",
    "吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"
  ],
  [
    "cb40",
    "杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"
  ],
  [
    "cba1",
    "芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"
  ],
  [
    "cc40",
    "坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"
  ],
  [
    "cca1",
    "怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"
  ],
  [
    "cd40",
    "泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"
  ],
  [
    "cda1",
    "矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"
  ],
  [
    "ce40",
    "哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"
  ],
  [
    "cea1",
    "峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"
  ],
  [
    "cf40",
    "柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"
  ],
  [
    "cfa1",
    "洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"
  ],
  [
    "d040",
    "穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"
  ],
  [
    "d0a1",
    "苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"
  ],
  [
    "d140",
    "唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"
  ],
  [
    "d1a1",
    "恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"
  ],
  [
    "d240",
    "毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"
  ],
  [
    "d2a1",
    "牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"
  ],
  [
    "d340",
    "笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"
  ],
  [
    "d3a1",
    "荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"
  ],
  [
    "d440",
    "酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"
  ],
  [
    "d4a1",
    "唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"
  ],
  [
    "d540",
    "崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"
  ],
  [
    "d5a1",
    "捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"
  ],
  [
    "d640",
    "淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"
  ],
  [
    "d6a1",
    "痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"
  ],
  [
    "d740",
    "耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"
  ],
  [
    "d7a1",
    "蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"
  ],
  [
    "d840",
    "釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"
  ],
  [
    "d8a1",
    "堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"
  ],
  [
    "d940",
    "惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"
  ],
  [
    "d9a1",
    "晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"
  ],
  [
    "da40",
    "湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"
  ],
  [
    "daa1",
    "琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"
  ],
  [
    "db40",
    "罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"
  ],
  [
    "dba1",
    "菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"
  ],
  [
    "dc40",
    "軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"
  ],
  [
    "dca1",
    "隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"
  ],
  [
    "dd40",
    "媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"
  ],
  [
    "dda1",
    "搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"
  ],
  [
    "de40",
    "毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"
  ],
  [
    "dea1",
    "煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"
  ],
  [
    "df40",
    "稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"
  ],
  [
    "dfa1",
    "腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"
  ],
  [
    "e040",
    "觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"
  ],
  [
    "e0a1",
    "遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"
  ],
  [
    "e140",
    "凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"
  ],
  [
    "e1a1",
    "寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"
  ],
  [
    "e240",
    "榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"
  ],
  [
    "e2a1",
    "漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"
  ],
  [
    "e340",
    "禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"
  ],
  [
    "e3a1",
    "耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"
  ],
  [
    "e440",
    "裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"
  ],
  [
    "e4a1",
    "銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"
  ],
  [
    "e540",
    "噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"
  ],
  [
    "e5a1",
    "憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"
  ],
  [
    "e640",
    "澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"
  ],
  [
    "e6a1",
    "獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"
  ],
  [
    "e740",
    "膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"
  ],
  [
    "e7a1",
    "蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"
  ],
  [
    "e840",
    "踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"
  ],
  [
    "e8a1",
    "銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"
  ],
  [
    "e940",
    "噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"
  ],
  [
    "e9a1",
    "憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"
  ],
  [
    "ea40",
    "澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"
  ],
  [
    "eaa1",
    "瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"
  ],
  [
    "eb40",
    "蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"
  ],
  [
    "eba1",
    "諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"
  ],
  [
    "ec40",
    "錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"
  ],
  [
    "eca1",
    "魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"
  ],
  [
    "ed40",
    "檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"
  ],
  [
    "eda1",
    "瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"
  ],
  [
    "ee40",
    "蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"
  ],
  [
    "eea1",
    "謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"
  ],
  [
    "ef40",
    "鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"
  ],
  [
    "efa1",
    "鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"
  ],
  [
    "f040",
    "璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"
  ],
  [
    "f0a1",
    "臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"
  ],
  [
    "f140",
    "蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"
  ],
  [
    "f1a1",
    "鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"
  ],
  [
    "f240",
    "徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"
  ],
  [
    "f2a1",
    "礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"
  ],
  [
    "f340",
    "譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"
  ],
  [
    "f3a1",
    "鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"
  ],
  [
    "f440",
    "嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"
  ],
  [
    "f4a1",
    "禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"
  ],
  [
    "f540",
    "鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"
  ],
  [
    "f5a1",
    "鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"
  ],
  [
    "f640",
    "蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"
  ],
  [
    "f6a1",
    "騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"
  ],
  [
    "f740",
    "糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"
  ],
  [
    "f7a1",
    "驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"
  ],
  [
    "f840",
    "讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"
  ],
  [
    "f8a1",
    "齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"
  ],
  [
    "f940",
    "纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"
  ],
  [
    "f9a1",
    "龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"
  ]
], Kp = [
  [
    "8740",
    "䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
  ],
  [
    "8767",
    "綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
  ],
  [
    "87a1",
    "𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
  ],
  [
    "8840",
    "㇀",
    4,
    "𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
  ],
  [
    "88a1",
    "ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
  ],
  [
    "8940",
    "𪎩𡅅"
  ],
  [
    "8943",
    "攊"
  ],
  [
    "8946",
    "丽滝鵎釟"
  ],
  [
    "894c",
    "𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
  ],
  [
    "89a1",
    "琑糼緍楆竉刧"
  ],
  [
    "89ab",
    "醌碸酞肼"
  ],
  [
    "89b0",
    "贋胶𠧧"
  ],
  [
    "89b5",
    "肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
  ],
  [
    "89c1",
    "溚舾甙"
  ],
  [
    "89c5",
    "䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
  ],
  [
    "8a40",
    "𧶄唥"
  ],
  [
    "8a43",
    "𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
  ],
  [
    "8a64",
    "𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
  ],
  [
    "8a76",
    "䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
  ],
  [
    "8aa1",
    "𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
  ],
  [
    "8aac",
    "䠋𠆩㿺塳𢶍"
  ],
  [
    "8ab2",
    "𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
  ],
  [
    "8abb",
    "䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
  ],
  [
    "8ac9",
    "𪘁𠸉𢫏𢳉"
  ],
  [
    "8ace",
    "𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
  ],
  [
    "8adf",
    "𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
  ],
  [
    "8af6",
    "𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
  ],
  [
    "8b40",
    "𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
  ],
  [
    "8b55",
    "𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
  ],
  [
    "8ba1",
    "𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
  ],
  [
    "8bde",
    "𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
  ],
  [
    "8c40",
    "倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
  ],
  [
    "8ca1",
    "𣏹椙橃𣱣泿"
  ],
  [
    "8ca7",
    "爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
  ],
  [
    "8cc9",
    "顨杫䉶圽"
  ],
  [
    "8cce",
    "藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
  ],
  [
    "8ce6",
    "峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
  ],
  [
    "8d40",
    "𠮟"
  ],
  [
    "8d42",
    "𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
  ],
  [
    "8da1",
    "㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
  ],
  [
    "8e40",
    "𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
  ],
  [
    "8ea1",
    "繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
  ],
  [
    "8f40",
    "蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
  ],
  [
    "8fa1",
    "𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
  ],
  [
    "9040",
    "趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
  ],
  [
    "90a1",
    "𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
  ],
  [
    "9140",
    "𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
  ],
  [
    "91a1",
    "鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
  ],
  [
    "9240",
    "𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
  ],
  [
    "92a1",
    "働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
  ],
  [
    "9340",
    "媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
  ],
  [
    "93a1",
    "摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
  ],
  [
    "9440",
    "銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
  ],
  [
    "94a1",
    "㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
  ],
  [
    "9540",
    "𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
  ],
  [
    "95a1",
    "衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
  ],
  [
    "9640",
    "桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
  ],
  [
    "96a1",
    "𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
  ],
  [
    "9740",
    "愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
  ],
  [
    "97a1",
    "𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
  ],
  [
    "9840",
    "𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
  ],
  [
    "98a1",
    "咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
  ],
  [
    "9940",
    "䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
  ],
  [
    "99a1",
    "䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
  ],
  [
    "9a40",
    "鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
  ],
  [
    "9aa1",
    "黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
  ],
  [
    "9b40",
    "𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
  ],
  [
    "9b62",
    "𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
  ],
  [
    "9ba1",
    "椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
  ],
  [
    "9c40",
    "嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
  ],
  [
    "9ca1",
    "㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
  ],
  [
    "9d40",
    "𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
  ],
  [
    "9da1",
    "辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
  ],
  [
    "9e40",
    "𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
  ],
  [
    "9ea1",
    "鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
  ],
  [
    "9ead",
    "𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
  ],
  [
    "9ec5",
    "㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
  ],
  [
    "9ef5",
    "噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
  ],
  [
    "9f40",
    "籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
  ],
  [
    "9f4f",
    "凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
  ],
  [
    "9fa1",
    "椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
  ],
  [
    "9fae",
    "酙隁酜"
  ],
  [
    "9fb2",
    "酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
  ],
  [
    "9fc1",
    "𤤙盖鮝个𠳔莾衂"
  ],
  [
    "9fc9",
    "届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
  ],
  [
    "9fdb",
    "歒酼龥鮗頮颴骺麨麄煺笔"
  ],
  [
    "9fe7",
    "毺蠘罸"
  ],
  [
    "9feb",
    "嘠𪙊蹷齓"
  ],
  [
    "9ff0",
    "跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
  ],
  [
    "a040",
    "𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
  ],
  [
    "a055",
    "𡠻𦸅"
  ],
  [
    "a058",
    "詾𢔛"
  ],
  [
    "a05b",
    "惽癧髗鵄鍮鮏蟵"
  ],
  [
    "a063",
    "蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
  ],
  [
    "a073",
    "坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
  ],
  [
    "a0a1",
    "嵗𨯂迚𨸹"
  ],
  [
    "a0a6",
    "僙𡵆礆匲阸𠼻䁥"
  ],
  [
    "a0ae",
    "矾"
  ],
  [
    "a0b0",
    "糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
  ],
  [
    "a0d4",
    "覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
  ],
  [
    "a0e2",
    "罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
  ],
  [
    "a3c0",
    "␀",
    31,
    "␡"
  ],
  [
    "c6a1",
    "①",
    9,
    "⑴",
    9,
    "ⅰ",
    9,
    "丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
    23
  ],
  [
    "c740",
    "す",
    58,
    "ァアィイ"
  ],
  [
    "c7a1",
    "ゥ",
    81,
    "А",
    5,
    "ЁЖ",
    4
  ],
  [
    "c840",
    "Л",
    26,
    "ёж",
    25,
    "⇧↸↹㇏𠃌乚𠂊刂䒑"
  ],
  [
    "c8a1",
    "龰冈龱𧘇"
  ],
  [
    "c8cd",
    "￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
  ],
  [
    "c8f5",
    "ʃɐɛɔɵœøŋʊɪ"
  ],
  [
    "f9fe",
    "￭"
  ],
  [
    "fa40",
    "𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
  ],
  [
    "faa1",
    "鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
  ],
  [
    "fb40",
    "𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
  ],
  [
    "fba1",
    "𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
  ],
  [
    "fc40",
    "廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
  ],
  [
    "fca1",
    "𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
  ],
  [
    "fd40",
    "𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
  ],
  [
    "fda1",
    "𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
  ],
  [
    "fe40",
    "鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
  ],
  [
    "fea1",
    "𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
  ]
];
var Aa, Tl;
function Jp() {
  return Tl || (Tl = 1, Aa = {
    // == Japanese/ShiftJIS ====================================================
    // All japanese encodings are based on JIS X set of standards:
    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes.
    //              Has several variations in 1978, 1983, 1990 and 1997.
    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
    //              2 planes, first is superset of 0208, second - revised 0212.
    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)
    // Byte encodings are:
    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
    //               0x00-0x7F       - lower part of 0201
    //               0x8E, 0xA1-0xDF - upper part of 0201
    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
    //               Used as-is in ISO2022 family.
    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII,
    //                0201-1976 Roman, 0208-1978, 0208-1983.
    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
    //
    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
    //
    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html
    shiftjis: {
      type: "_dbcs",
      table: function() {
        return Gp;
      },
      encodeAdd: { "¥": 92, "‾": 126 },
      encodeSkipVals: [{ from: 60736, to: 63808 }]
    },
    csshiftjis: "shiftjis",
    mskanji: "shiftjis",
    sjis: "shiftjis",
    windows31j: "shiftjis",
    ms31j: "shiftjis",
    xsjis: "shiftjis",
    windows932: "shiftjis",
    ms932: "shiftjis",
    932: "shiftjis",
    cp932: "shiftjis",
    eucjp: {
      type: "_dbcs",
      table: function() {
        return Vp;
      },
      encodeAdd: { "¥": 92, "‾": 126 }
    },
    // TODO: KDDI extension to Shift_JIS
    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.
    // == Chinese/GBK ==========================================================
    // http://en.wikipedia.org/wiki/GBK
    // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder
    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
    gb2312: "cp936",
    gb231280: "cp936",
    gb23121980: "cp936",
    csgb2312: "cp936",
    csiso58gb231280: "cp936",
    euccn: "cp936",
    // Microsoft's CP936 is a subset and approximation of GBK.
    windows936: "cp936",
    ms936: "cp936",
    936: "cp936",
    cp936: {
      type: "_dbcs",
      table: function() {
        return Ca;
      }
    },
    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
    gbk: {
      type: "_dbcs",
      table: function() {
        return Ca.concat(Pl);
      }
    },
    xgbk: "gbk",
    isoir58: "gbk",
    // GB18030 is an algorithmic extension of GBK.
    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
    // http://icu-project.org/docs/papers/gb18030.html
    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
    gb18030: {
      type: "_dbcs",
      table: function() {
        return Ca.concat(Pl);
      },
      gb18030: function() {
        return Yp;
      },
      encodeSkipVals: [128],
      encodeAdd: { "€": 41699 }
    },
    chinese: "gb18030",
    // == Korean ===============================================================
    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
    windows949: "cp949",
    ms949: "cp949",
    949: "cp949",
    cp949: {
      type: "_dbcs",
      table: function() {
        return Xp;
      }
    },
    cseuckr: "cp949",
    csksc56011987: "cp949",
    euckr: "cp949",
    isoir149: "cp949",
    korean: "cp949",
    ksc56011987: "cp949",
    ksc56011989: "cp949",
    ksc5601: "cp949",
    // == Big5/Taiwan/Hong Kong ================================================
    // There are lots of tables for Big5 and cp950. Please see the following links for history:
    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
    // Variations, in roughly number of defined chars:
    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard.
    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
    //    Plus, it has 4 combining sequences.
    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
    //
    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.
    windows950: "cp950",
    ms950: "cp950",
    950: "cp950",
    cp950: {
      type: "_dbcs",
      table: function() {
        return xl;
      }
    },
    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
    big5: "big5hkscs",
    big5hkscs: {
      type: "_dbcs",
      table: function() {
        return xl.concat(Kp);
      },
      encodeSkipVals: [
        // Although Encoding Standard says we should avoid encoding to HKSCS area (See Step 1 of
        // https://encoding.spec.whatwg.org/#index-big5-pointer), we still do it to increase compatibility with ICU.
        // But if a single unicode point can be encoded both as HKSCS and regular Big5, we prefer the latter.
        36457,
        36463,
        36478,
        36523,
        36532,
        36557,
        36560,
        36695,
        36713,
        36718,
        36811,
        36862,
        36973,
        36986,
        37060,
        37084,
        37105,
        37311,
        37551,
        37552,
        37553,
        37554,
        37585,
        37959,
        38090,
        38361,
        38652,
        39285,
        39798,
        39800,
        39803,
        39878,
        39902,
        39916,
        39926,
        40002,
        40019,
        40034,
        40040,
        40043,
        40055,
        40124,
        40125,
        40144,
        40279,
        40282,
        40388,
        40431,
        40443,
        40617,
        40687,
        40701,
        40800,
        40907,
        41079,
        41180,
        41183,
        36812,
        37576,
        38468,
        38637,
        // Step 2 of https://encoding.spec.whatwg.org/#index-big5-pointer: Use last pointer for U+2550, U+255E, U+2561, U+256A, U+5341, or U+5345
        41636,
        41637,
        41639,
        41638,
        41676,
        41678
      ]
    },
    cnbig5: "big5hkscs",
    csbig5: "big5hkscs",
    xxbig5: "big5hkscs"
  }), Aa;
}
var Il;
function Qp() {
  return Il || (Il = 1, function(e) {
    for (var t = Qu, r = [
      Fp(),
      Up(),
      Mp(),
      $p(),
      Bp(),
      Hp(),
      qp(),
      jp(),
      Jp()
    ], n = 0; n < r.length; n++) {
      var i = r[n];
      t(e, i);
    }
  }(ya)), ya;
}
var Pa, Ol;
function Zp() {
  if (Ol) return Pa;
  Ol = 1;
  var e = kt.Buffer;
  return Pa = function(t) {
    var r = t.Transform;
    function n(a, s) {
      this.conv = a, s = s || {}, s.decodeStrings = !1, r.call(this, s);
    }
    n.prototype = Object.create(r.prototype, {
      constructor: { value: n }
    }), n.prototype._transform = function(a, s, c) {
      if (typeof a != "string")
        return c(new Error("Iconv encoding stream needs strings as its input."));
      try {
        var l = this.conv.write(a);
        l && l.length && this.push(l), c();
      } catch (f) {
        c(f);
      }
    }, n.prototype._flush = function(a) {
      try {
        var s = this.conv.end();
        s && s.length && this.push(s), a();
      } catch (c) {
        a(c);
      }
    }, n.prototype.collect = function(a) {
      var s = [];
      return this.on("error", a), this.on("data", function(c) {
        s.push(c);
      }), this.on("end", function() {
        a(null, e.concat(s));
      }), this;
    };
    function i(a, s) {
      this.conv = a, s = s || {}, s.encoding = this.encoding = "utf8", r.call(this, s);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: { value: i }
    }), i.prototype._transform = function(a, s, c) {
      if (!e.isBuffer(a) && !(a instanceof Uint8Array))
        return c(new Error("Iconv decoding stream needs buffers as its input."));
      try {
        var l = this.conv.write(a);
        l && l.length && this.push(l, this.encoding), c();
      } catch (f) {
        c(f);
      }
    }, i.prototype._flush = function(a) {
      try {
        var s = this.conv.end();
        s && s.length && this.push(s, this.encoding), a();
      } catch (c) {
        a(c);
      }
    }, i.prototype.collect = function(a) {
      var s = "";
      return this.on("error", a), this.on("data", function(c) {
        s += c;
      }), this.on("end", function() {
        a(null, s);
      }), this;
    }, {
      IconvLiteEncoderStream: n,
      IconvLiteDecoderStream: i
    };
  }, Pa;
}
lo.exports;
(function(e) {
  var t = kt.Buffer, r = co, n = Qu;
  e.exports.encodings = null, e.exports.defaultCharUnicode = "�", e.exports.defaultCharSingleByte = "?", e.exports.encode = function(s, c, l) {
    s = "" + (s || "");
    var f = e.exports.getEncoder(c, l), o = f.write(s), d = f.end();
    return d && d.length > 0 ? t.concat([o, d]) : o;
  }, e.exports.decode = function(s, c, l) {
    typeof s == "string" && (e.exports.skipDecodeWarning || (console.error("Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding"), e.exports.skipDecodeWarning = !0), s = t.from("" + (s || ""), "binary"));
    var f = e.exports.getDecoder(c, l), o = f.write(s), d = f.end();
    return d ? o + d : o;
  }, e.exports.encodingExists = function(s) {
    try {
      return e.exports.getCodec(s), !0;
    } catch {
      return !1;
    }
  }, e.exports.toEncoding = e.exports.encode, e.exports.fromEncoding = e.exports.decode, e.exports._codecDataCache = { __proto__: null }, e.exports.getCodec = function(s) {
    if (!e.exports.encodings) {
      var c = Qp();
      e.exports.encodings = { __proto__: null }, n(e.exports.encodings, c);
    }
    for (var l = e.exports._canonicalizeEncoding(s), f = {}; ; ) {
      var o = e.exports._codecDataCache[l];
      if (o)
        return o;
      var d = e.exports.encodings[l];
      switch (typeof d) {
        case "string":
          l = d;
          break;
        case "object":
          for (var u in d)
            f[u] = d[u];
          f.encodingName || (f.encodingName = l), l = d.type;
          break;
        case "function":
          return f.encodingName || (f.encodingName = l), o = new d(f, e.exports), e.exports._codecDataCache[f.encodingName] = o, o;
        default:
          throw new Error("Encoding not recognized: '" + s + "' (searched as: '" + l + "')");
      }
    }
  }, e.exports._canonicalizeEncoding = function(a) {
    return ("" + a).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
  }, e.exports.getEncoder = function(s, c) {
    var l = e.exports.getCodec(s), f = new l.encoder(c, l);
    return l.bomAware && c && c.addBOM && (f = new r.PrependBOM(f, c)), f;
  }, e.exports.getDecoder = function(s, c) {
    var l = e.exports.getCodec(s), f = new l.decoder(c, l);
    return l.bomAware && !(c && c.stripBOM === !1) && (f = new r.StripBOM(f, c)), f;
  }, e.exports.enableStreamingAPI = function(s) {
    if (!e.exports.supportsStreams) {
      var c = Zp()(s);
      e.exports.IconvLiteEncoderStream = c.IconvLiteEncoderStream, e.exports.IconvLiteDecoderStream = c.IconvLiteDecoderStream, e.exports.encodeStream = function(f, o) {
        return new e.exports.IconvLiteEncoderStream(e.exports.getEncoder(f, o), o);
      }, e.exports.decodeStream = function(f, o) {
        return new e.exports.IconvLiteDecoderStream(e.exports.getDecoder(f, o), o);
      }, e.exports.supportsStreams = !0;
    }
  };
  var i;
  try {
    i = require("stream");
  } catch {
  }
  i && i.Transform ? e.exports.enableStreamingAPI(i) : e.exports.encodeStream = e.exports.decodeStream = function() {
    throw new Error("iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.");
  };
})(lo);
var e0 = lo.exports;
const Rl = /* @__PURE__ */ Ku(e0);
var Me = {}, tr = {}, Re = {};
Re.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, a) => i != null ? n(i) : r(a)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Re.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var Et = Dp, t0 = process.cwd, vi = null, r0 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return vi || (vi = t0.call(process)), vi;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Dl = process.chdir;
  process.chdir = function(e) {
    vi = null, Dl.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Dl);
}
var n0 = i0;
function i0(e) {
  Et.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = a(e.chown), e.fchown = a(e.fchown), e.lchown = a(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = c(e.stat), e.fstat = c(e.fstat), e.lstat = c(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(o, d, u) {
    u && process.nextTick(u);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(o, d, u, h) {
    h && process.nextTick(h);
  }, e.lchownSync = function() {
  }), r0 === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(o) {
    function d(u, h, p) {
      var m = Date.now(), g = 0;
      o(u, h, function E(y) {
        if (y && (y.code === "EACCES" || y.code === "EPERM" || y.code === "EBUSY") && Date.now() - m < 6e4) {
          setTimeout(function() {
            e.stat(h, function(S, _) {
              S && S.code === "ENOENT" ? o(u, h, E) : p(y);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        p && p(y);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(d, o), d;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(o) {
    function d(u, h, p, m, g, E) {
      var y;
      if (E && typeof E == "function") {
        var S = 0;
        y = function(_, A, I) {
          if (_ && _.code === "EAGAIN" && S < 10)
            return S++, o.call(e, u, h, p, m, g, y);
          E.apply(this, arguments);
        };
      }
      return o.call(e, u, h, p, m, g, y);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(d, o), d;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(o) {
    return function(d, u, h, p, m) {
      for (var g = 0; ; )
        try {
          return o.call(e, d, u, h, p, m);
        } catch (E) {
          if (E.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw E;
        }
    };
  }(e.readSync);
  function t(o) {
    o.lchmod = function(d, u, h) {
      o.open(
        d,
        Et.O_WRONLY | Et.O_SYMLINK,
        u,
        function(p, m) {
          if (p) {
            h && h(p);
            return;
          }
          o.fchmod(m, u, function(g) {
            o.close(m, function(E) {
              h && h(g || E);
            });
          });
        }
      );
    }, o.lchmodSync = function(d, u) {
      var h = o.openSync(d, Et.O_WRONLY | Et.O_SYMLINK, u), p = !0, m;
      try {
        m = o.fchmodSync(h, u), p = !1;
      } finally {
        if (p)
          try {
            o.closeSync(h);
          } catch {
          }
        else
          o.closeSync(h);
      }
      return m;
    };
  }
  function r(o) {
    Et.hasOwnProperty("O_SYMLINK") && o.futimes ? (o.lutimes = function(d, u, h, p) {
      o.open(d, Et.O_SYMLINK, function(m, g) {
        if (m) {
          p && p(m);
          return;
        }
        o.futimes(g, u, h, function(E) {
          o.close(g, function(y) {
            p && p(E || y);
          });
        });
      });
    }, o.lutimesSync = function(d, u, h) {
      var p = o.openSync(d, Et.O_SYMLINK), m, g = !0;
      try {
        m = o.futimesSync(p, u, h), g = !1;
      } finally {
        if (g)
          try {
            o.closeSync(p);
          } catch {
          }
        else
          o.closeSync(p);
      }
      return m;
    }) : o.futimes && (o.lutimes = function(d, u, h, p) {
      p && process.nextTick(p);
    }, o.lutimesSync = function() {
    });
  }
  function n(o) {
    return o && function(d, u, h) {
      return o.call(e, d, u, function(p) {
        f(p) && (p = null), h && h.apply(this, arguments);
      });
    };
  }
  function i(o) {
    return o && function(d, u) {
      try {
        return o.call(e, d, u);
      } catch (h) {
        if (!f(h)) throw h;
      }
    };
  }
  function a(o) {
    return o && function(d, u, h, p) {
      return o.call(e, d, u, h, function(m) {
        f(m) && (m = null), p && p.apply(this, arguments);
      });
    };
  }
  function s(o) {
    return o && function(d, u, h) {
      try {
        return o.call(e, d, u, h);
      } catch (p) {
        if (!f(p)) throw p;
      }
    };
  }
  function c(o) {
    return o && function(d, u, h) {
      typeof u == "function" && (h = u, u = null);
      function p(m, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), h && h.apply(this, arguments);
      }
      return u ? o.call(e, d, u, p) : o.call(e, d, p);
    };
  }
  function l(o) {
    return o && function(d, u) {
      var h = u ? o.call(e, d, u) : o.call(e, d);
      return h && (h.uid < 0 && (h.uid += 4294967296), h.gid < 0 && (h.gid += 4294967296)), h;
    };
  }
  function f(o) {
    if (!o || o.code === "ENOSYS")
      return !0;
    var d = !process.getuid || process.getuid() !== 0;
    return !!(d && (o.code === "EINVAL" || o.code === "EPERM"));
  }
}
var Nl = bn.Stream, a0 = s0;
function s0(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Nl.call(this);
    var a = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var s = Object.keys(i), c = 0, l = s.length; c < l; c++) {
      var f = s[c];
      this[f] = i[f];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        a._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(o, d) {
      if (o) {
        a.emit("error", o), a.readable = !1;
        return;
      }
      a.fd = d, a.emit("open", d), a._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Nl.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var a = Object.keys(i), s = 0, c = a.length; s < c; s++) {
      var l = a[s];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var o0 = c0, l0 = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function c0(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: l0(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var ae = Ze, u0 = n0, f0 = a0, h0 = o0, Kn = oo, Ee, Ci;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Ee = Symbol.for("graceful-fs.queue"), Ci = Symbol.for("graceful-fs.previous")) : (Ee = "___graceful-fs.queue", Ci = "___graceful-fs.previous");
function d0() {
}
function Zu(e, t) {
  Object.defineProperty(e, Ee, {
    get: function() {
      return t;
    }
  });
}
var Kt = d0;
Kn.debuglog ? Kt = Kn.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Kt = function() {
  var e = Kn.format.apply(Kn, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!ae[Ee]) {
  var p0 = Te[Ee] || [];
  Zu(ae, p0), ae.close = function(e) {
    function t(r, n) {
      return e.call(ae, r, function(i) {
        i || Ll(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Ci, {
      value: e
    }), t;
  }(ae.close), ae.closeSync = function(e) {
    function t(r) {
      e.apply(ae, arguments), Ll();
    }
    return Object.defineProperty(t, Ci, {
      value: e
    }), t;
  }(ae.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Kt(ae[Ee]), Wu.equal(ae[Ee].length, 0);
  });
}
Te[Ee] || Zu(Te, ae[Ee]);
var De = ho(h0(ae));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ae.__patched && (De = ho(ae), ae.__patched = !0);
function ho(e) {
  u0(e), e.gracefulify = ho, e.createReadStream = A, e.createWriteStream = I;
  var t = e.readFile;
  e.readFile = r;
  function r(C, F, H) {
    return typeof F == "function" && (H = F, F = null), G(C, F, H);
    function G(K, L, D, U) {
      return t(K, L, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? cr([G, [K, L, D], R, U || Date.now(), Date.now()]) : typeof D == "function" && D.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(C, F, H, G) {
    return typeof H == "function" && (G = H, H = null), K(C, F, H, G);
    function K(L, D, U, R, M) {
      return n(L, D, U, function(k) {
        k && (k.code === "EMFILE" || k.code === "ENFILE") ? cr([K, [L, D, U, R], k, M || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  var a = e.appendFile;
  a && (e.appendFile = s);
  function s(C, F, H, G) {
    return typeof H == "function" && (G = H, H = null), K(C, F, H, G);
    function K(L, D, U, R, M) {
      return a(L, D, U, function(k) {
        k && (k.code === "EMFILE" || k.code === "ENFILE") ? cr([K, [L, D, U, R], k, M || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  var c = e.copyFile;
  c && (e.copyFile = l);
  function l(C, F, H, G) {
    return typeof H == "function" && (G = H, H = 0), K(C, F, H, G);
    function K(L, D, U, R, M) {
      return c(L, D, U, function(k) {
        k && (k.code === "EMFILE" || k.code === "ENFILE") ? cr([K, [L, D, U, R], k, M || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = d;
  var o = /^v[0-5]\./;
  function d(C, F, H) {
    typeof F == "function" && (H = F, F = null);
    var G = o.test(process.version) ? function(D, U, R, M) {
      return f(D, K(
        D,
        U,
        R,
        M
      ));
    } : function(D, U, R, M) {
      return f(D, U, K(
        D,
        U,
        R,
        M
      ));
    };
    return G(C, F, H);
    function K(L, D, U, R) {
      return function(M, k) {
        M && (M.code === "EMFILE" || M.code === "ENFILE") ? cr([
          G,
          [L, D, U],
          M,
          R || Date.now(),
          Date.now()
        ]) : (k && k.sort && k.sort(), typeof U == "function" && U.call(this, M, k));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var u = f0(e);
    E = u.ReadStream, S = u.WriteStream;
  }
  var h = e.ReadStream;
  h && (E.prototype = Object.create(h.prototype), E.prototype.open = y);
  var p = e.WriteStream;
  p && (S.prototype = Object.create(p.prototype), S.prototype.open = _), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return E;
    },
    set: function(C) {
      E = C;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return S;
    },
    set: function(C) {
      S = C;
    },
    enumerable: !0,
    configurable: !0
  });
  var m = E;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return m;
    },
    set: function(C) {
      m = C;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = S;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(C) {
      g = C;
    },
    enumerable: !0,
    configurable: !0
  });
  function E(C, F) {
    return this instanceof E ? (h.apply(this, arguments), this) : E.apply(Object.create(E.prototype), arguments);
  }
  function y() {
    var C = this;
    $(C.path, C.flags, C.mode, function(F, H) {
      F ? (C.autoClose && C.destroy(), C.emit("error", F)) : (C.fd = H, C.emit("open", H), C.read());
    });
  }
  function S(C, F) {
    return this instanceof S ? (p.apply(this, arguments), this) : S.apply(Object.create(S.prototype), arguments);
  }
  function _() {
    var C = this;
    $(C.path, C.flags, C.mode, function(F, H) {
      F ? (C.destroy(), C.emit("error", F)) : (C.fd = H, C.emit("open", H));
    });
  }
  function A(C, F) {
    return new e.ReadStream(C, F);
  }
  function I(C, F) {
    return new e.WriteStream(C, F);
  }
  var T = e.open;
  e.open = $;
  function $(C, F, H, G) {
    return typeof H == "function" && (G = H, H = null), K(C, F, H, G);
    function K(L, D, U, R, M) {
      return T(L, D, U, function(k, W) {
        k && (k.code === "EMFILE" || k.code === "ENFILE") ? cr([K, [L, D, U, R], k, M || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  return e;
}
function cr(e) {
  Kt("ENQUEUE", e[0].name, e[1]), ae[Ee].push(e), po();
}
var Jn;
function Ll() {
  for (var e = Date.now(), t = 0; t < ae[Ee].length; ++t)
    ae[Ee][t].length > 2 && (ae[Ee][t][3] = e, ae[Ee][t][4] = e);
  po();
}
function po() {
  if (clearTimeout(Jn), Jn = void 0, ae[Ee].length !== 0) {
    var e = ae[Ee].shift(), t = e[0], r = e[1], n = e[2], i = e[3], a = e[4];
    if (i === void 0)
      Kt("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      Kt("TIMEOUT", t.name, r);
      var s = r.pop();
      typeof s == "function" && s.call(null, n);
    } else {
      var c = Date.now() - a, l = Math.max(a - i, 1), f = Math.min(l * 1.2, 100);
      c >= f ? (Kt("RETRY", t.name, r), t.apply(null, r.concat([i]))) : ae[Ee].push(e);
    }
    Jn === void 0 && (Jn = setTimeout(po, 0));
  }
}
(function(e) {
  const t = Re.fromCallback, r = De, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, a) {
    return typeof a == "function" ? r.exists(i, a) : new Promise((s) => r.exists(i, s));
  }, e.read = function(i, a, s, c, l, f) {
    return typeof f == "function" ? r.read(i, a, s, c, l, f) : new Promise((o, d) => {
      r.read(i, a, s, c, l, (u, h, p) => {
        if (u) return d(u);
        o({ bytesRead: h, buffer: p });
      });
    });
  }, e.write = function(i, a, ...s) {
    return typeof s[s.length - 1] == "function" ? r.write(i, a, ...s) : new Promise((c, l) => {
      r.write(i, a, ...s, (f, o, d) => {
        if (f) return l(f);
        c({ bytesWritten: o, buffer: d });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, a, ...s) {
    return typeof s[s.length - 1] == "function" ? r.writev(i, a, ...s) : new Promise((c, l) => {
      r.writev(i, a, ...s, (f, o, d) => {
        if (f) return l(f);
        c({ bytesWritten: o, buffers: d });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(tr);
var mo = {}, ef = {};
const m0 = se;
ef.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(m0.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const tf = tr, { checkPath: rf } = ef, nf = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
mo.makeDir = async (e, t) => (rf(e), tf.mkdir(e, {
  mode: nf(t),
  recursive: !0
}));
mo.makeDirSync = (e, t) => (rf(e), tf.mkdirSync(e, {
  mode: nf(t),
  recursive: !0
}));
const g0 = Re.fromPromise, { makeDir: v0, makeDirSync: xa } = mo, Ta = g0(v0);
var lt = {
  mkdirs: Ta,
  mkdirsSync: xa,
  // alias
  mkdirp: Ta,
  mkdirpSync: xa,
  ensureDir: Ta,
  ensureDirSync: xa
};
const y0 = Re.fromPromise, af = tr;
function _0(e) {
  return af.access(e).then(() => !0).catch(() => !1);
}
var rr = {
  pathExists: y0(_0),
  pathExistsSync: af.existsSync
};
const Cr = De;
function E0(e, t, r, n) {
  Cr.open(e, "r+", (i, a) => {
    if (i) return n(i);
    Cr.futimes(a, t, r, (s) => {
      Cr.close(a, (c) => {
        n && n(s || c);
      });
    });
  });
}
function w0(e, t, r) {
  const n = Cr.openSync(e, "r+");
  return Cr.futimesSync(n, t, r), Cr.closeSync(n);
}
var sf = {
  utimesMillis: E0,
  utimesMillisSync: w0
};
const Pr = tr, ge = se, b0 = oo;
function S0(e, t, r) {
  const n = r.dereference ? (i) => Pr.stat(i, { bigint: !0 }) : (i) => Pr.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, a]) => ({ srcStat: i, destStat: a }));
}
function C0(e, t, r) {
  let n;
  const i = r.dereference ? (s) => Pr.statSync(s, { bigint: !0 }) : (s) => Pr.lstatSync(s, { bigint: !0 }), a = i(e);
  try {
    n = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: a, destStat: null };
    throw s;
  }
  return { srcStat: a, destStat: n };
}
function A0(e, t, r, n, i) {
  b0.callbackify(S0)(e, t, n, (a, s) => {
    if (a) return i(a);
    const { srcStat: c, destStat: l } = s;
    if (l) {
      if (Cn(c, l)) {
        const f = ge.basename(e), o = ge.basename(t);
        return r === "move" && f !== o && f.toLowerCase() === o.toLowerCase() ? i(null, { srcStat: c, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (c.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!c.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return c.isDirectory() && go(e, t) ? i(new Error(Bi(e, t, r))) : i(null, { srcStat: c, destStat: l });
  });
}
function P0(e, t, r, n) {
  const { srcStat: i, destStat: a } = C0(e, t, n);
  if (a) {
    if (Cn(i, a)) {
      const s = ge.basename(e), c = ge.basename(t);
      if (r === "move" && s !== c && s.toLowerCase() === c.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && go(e, t))
    throw new Error(Bi(e, t, r));
  return { srcStat: i, destStat: a };
}
function of(e, t, r, n, i) {
  const a = ge.resolve(ge.dirname(e)), s = ge.resolve(ge.dirname(r));
  if (s === a || s === ge.parse(s).root) return i();
  Pr.stat(s, { bigint: !0 }, (c, l) => c ? c.code === "ENOENT" ? i() : i(c) : Cn(t, l) ? i(new Error(Bi(e, r, n))) : of(e, t, s, n, i));
}
function lf(e, t, r, n) {
  const i = ge.resolve(ge.dirname(e)), a = ge.resolve(ge.dirname(r));
  if (a === i || a === ge.parse(a).root) return;
  let s;
  try {
    s = Pr.statSync(a, { bigint: !0 });
  } catch (c) {
    if (c.code === "ENOENT") return;
    throw c;
  }
  if (Cn(t, s))
    throw new Error(Bi(e, r, n));
  return lf(e, t, a, n);
}
function Cn(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function go(e, t) {
  const r = ge.resolve(e).split(ge.sep).filter((i) => i), n = ge.resolve(t).split(ge.sep).filter((i) => i);
  return r.reduce((i, a, s) => i && n[s] === a, !0);
}
function Bi(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Or = {
  checkPaths: A0,
  checkPathsSync: P0,
  checkParentPaths: of,
  checkParentPathsSync: lf,
  isSrcSubdir: go,
  areIdentical: Cn
};
const ke = De, an = se, x0 = lt.mkdirs, T0 = rr.pathExists, I0 = sf.utimesMillis, sn = Or;
function O0(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), sn.checkPaths(e, t, "copy", r, (i, a) => {
    if (i) return n(i);
    const { srcStat: s, destStat: c } = a;
    sn.checkParentPaths(e, s, t, "copy", (l) => l ? n(l) : r.filter ? cf(kl, c, e, t, r, n) : kl(c, e, t, r, n));
  });
}
function kl(e, t, r, n, i) {
  const a = an.dirname(r);
  T0(a, (s, c) => {
    if (s) return i(s);
    if (c) return Ai(e, t, r, n, i);
    x0(a, (l) => l ? i(l) : Ai(e, t, r, n, i));
  });
}
function cf(e, t, r, n, i, a) {
  Promise.resolve(i.filter(r, n)).then((s) => s ? e(t, r, n, i, a) : a(), (s) => a(s));
}
function R0(e, t, r, n, i) {
  return n.filter ? cf(Ai, e, t, r, n, i) : Ai(e, t, r, n, i);
}
function Ai(e, t, r, n, i) {
  (n.dereference ? ke.stat : ke.lstat)(t, (s, c) => s ? i(s) : c.isDirectory() ? M0(c, e, t, r, n, i) : c.isFile() || c.isCharacterDevice() || c.isBlockDevice() ? D0(c, e, t, r, n, i) : c.isSymbolicLink() ? H0(e, t, r, n, i) : c.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : c.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function D0(e, t, r, n, i, a) {
  return t ? N0(e, r, n, i, a) : uf(e, r, n, i, a);
}
function N0(e, t, r, n, i) {
  if (n.overwrite)
    ke.unlink(r, (a) => a ? i(a) : uf(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function uf(e, t, r, n, i) {
  ke.copyFile(t, r, (a) => a ? i(a) : n.preserveTimestamps ? L0(e.mode, t, r, i) : Hi(r, e.mode, i));
}
function L0(e, t, r, n) {
  return k0(e) ? F0(r, e, (i) => i ? n(i) : Fl(e, t, r, n)) : Fl(e, t, r, n);
}
function k0(e) {
  return (e & 128) === 0;
}
function F0(e, t, r) {
  return Hi(e, t | 128, r);
}
function Fl(e, t, r, n) {
  U0(t, r, (i) => i ? n(i) : Hi(r, e, n));
}
function Hi(e, t, r) {
  return ke.chmod(e, t, r);
}
function U0(e, t, r) {
  ke.stat(e, (n, i) => n ? r(n) : I0(t, i.atime, i.mtime, r));
}
function M0(e, t, r, n, i, a) {
  return t ? ff(r, n, i, a) : $0(e.mode, r, n, i, a);
}
function $0(e, t, r, n, i) {
  ke.mkdir(r, (a) => {
    if (a) return i(a);
    ff(t, r, n, (s) => s ? i(s) : Hi(r, e, i));
  });
}
function ff(e, t, r, n) {
  ke.readdir(e, (i, a) => i ? n(i) : hf(a, e, t, r, n));
}
function hf(e, t, r, n, i) {
  const a = e.pop();
  return a ? B0(e, a, t, r, n, i) : i();
}
function B0(e, t, r, n, i, a) {
  const s = an.join(r, t), c = an.join(n, t);
  sn.checkPaths(s, c, "copy", i, (l, f) => {
    if (l) return a(l);
    const { destStat: o } = f;
    R0(o, s, c, i, (d) => d ? a(d) : hf(e, r, n, i, a));
  });
}
function H0(e, t, r, n, i) {
  ke.readlink(t, (a, s) => {
    if (a) return i(a);
    if (n.dereference && (s = an.resolve(process.cwd(), s)), e)
      ke.readlink(r, (c, l) => c ? c.code === "EINVAL" || c.code === "UNKNOWN" ? ke.symlink(s, r, i) : i(c) : (n.dereference && (l = an.resolve(process.cwd(), l)), sn.isSrcSubdir(s, l) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && sn.isSrcSubdir(l, s) ? i(new Error(`Cannot overwrite '${l}' with '${s}'.`)) : q0(s, r, i)));
    else
      return ke.symlink(s, r, i);
  });
}
function q0(e, t, r) {
  ke.unlink(t, (n) => n ? r(n) : ke.symlink(e, t, r));
}
var j0 = O0;
const Ce = De, on = se, G0 = lt.mkdirsSync, V0 = sf.utimesMillisSync, ln = Or;
function W0(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = ln.checkPathsSync(e, t, "copy", r);
  return ln.checkParentPathsSync(e, n, t, "copy"), z0(i, e, t, r);
}
function z0(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = on.dirname(r);
  return Ce.existsSync(i) || G0(i), df(e, t, r, n);
}
function Y0(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return df(e, t, r, n);
}
function df(e, t, r, n) {
  const a = (n.dereference ? Ce.statSync : Ce.lstatSync)(t);
  if (a.isDirectory()) return t1(a, e, t, r, n);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return X0(a, e, t, r, n);
  if (a.isSymbolicLink()) return i1(e, t, r, n);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function X0(e, t, r, n, i) {
  return t ? K0(e, r, n, i) : pf(e, r, n, i);
}
function K0(e, t, r, n) {
  if (n.overwrite)
    return Ce.unlinkSync(r), pf(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function pf(e, t, r, n) {
  return Ce.copyFileSync(t, r), n.preserveTimestamps && J0(e.mode, t, r), vo(r, e.mode);
}
function J0(e, t, r) {
  return Q0(e) && Z0(r, e), e1(t, r);
}
function Q0(e) {
  return (e & 128) === 0;
}
function Z0(e, t) {
  return vo(e, t | 128);
}
function vo(e, t) {
  return Ce.chmodSync(e, t);
}
function e1(e, t) {
  const r = Ce.statSync(e);
  return V0(t, r.atime, r.mtime);
}
function t1(e, t, r, n, i) {
  return t ? mf(r, n, i) : r1(e.mode, r, n, i);
}
function r1(e, t, r, n) {
  return Ce.mkdirSync(r), mf(t, r, n), vo(r, e);
}
function mf(e, t, r) {
  Ce.readdirSync(e).forEach((n) => n1(n, e, t, r));
}
function n1(e, t, r, n) {
  const i = on.join(t, e), a = on.join(r, e), { destStat: s } = ln.checkPathsSync(i, a, "copy", n);
  return Y0(s, i, a, n);
}
function i1(e, t, r, n) {
  let i = Ce.readlinkSync(t);
  if (n.dereference && (i = on.resolve(process.cwd(), i)), e) {
    let a;
    try {
      a = Ce.readlinkSync(r);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return Ce.symlinkSync(i, r);
      throw s;
    }
    if (n.dereference && (a = on.resolve(process.cwd(), a)), ln.isSrcSubdir(i, a))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${a}'.`);
    if (Ce.statSync(r).isDirectory() && ln.isSrcSubdir(a, i))
      throw new Error(`Cannot overwrite '${a}' with '${i}'.`);
    return a1(i, r);
  } else
    return Ce.symlinkSync(i, r);
}
function a1(e, t) {
  return Ce.unlinkSync(t), Ce.symlinkSync(e, t);
}
var s1 = W0;
const o1 = Re.fromCallback;
var yo = {
  copy: o1(j0),
  copySync: s1
};
const Ul = De, gf = se, ee = Wu, cn = process.platform === "win32";
function vf(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Ul[r], r = r + "Sync", e[r] = e[r] || Ul[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function _o(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), ee(e, "rimraf: missing path"), ee.strictEqual(typeof e, "string", "rimraf: path should be a string"), ee.strictEqual(typeof r, "function", "rimraf: callback function required"), ee(t, "rimraf: invalid options argument provided"), ee.strictEqual(typeof t, "object", "rimraf: options should be object"), vf(t), Ml(e, t, function i(a) {
    if (a) {
      if ((a.code === "EBUSY" || a.code === "ENOTEMPTY" || a.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const s = n * 100;
        return setTimeout(() => Ml(e, t, i), s);
      }
      a.code === "ENOENT" && (a = null);
    }
    r(a);
  });
}
function Ml(e, t, r) {
  ee(e), ee(t), ee(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && cn)
      return $l(e, t, n, r);
    if (i && i.isDirectory())
      return yi(e, t, n, r);
    t.unlink(e, (a) => {
      if (a) {
        if (a.code === "ENOENT")
          return r(null);
        if (a.code === "EPERM")
          return cn ? $l(e, t, a, r) : yi(e, t, a, r);
        if (a.code === "EISDIR")
          return yi(e, t, a, r);
      }
      return r(a);
    });
  });
}
function $l(e, t, r, n) {
  ee(e), ee(t), ee(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (a, s) => {
      a ? n(a.code === "ENOENT" ? null : r) : s.isDirectory() ? yi(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Bl(e, t, r) {
  let n;
  ee(e), ee(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? _i(e, t, r) : t.unlinkSync(e);
}
function yi(e, t, r, n) {
  ee(e), ee(t), ee(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? l1(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function l1(e, t, r) {
  ee(e), ee(t), ee(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let a = i.length, s;
    if (a === 0) return t.rmdir(e, r);
    i.forEach((c) => {
      _o(gf.join(e, c), t, (l) => {
        if (!s) {
          if (l) return r(s = l);
          --a === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function yf(e, t) {
  let r;
  t = t || {}, vf(t), ee(e, "rimraf: missing path"), ee.strictEqual(typeof e, "string", "rimraf: path should be a string"), ee(t, "rimraf: missing options"), ee.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && cn && Bl(e, t, n);
  }
  try {
    r && r.isDirectory() ? _i(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return cn ? Bl(e, t, n) : _i(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    _i(e, t, n);
  }
}
function _i(e, t, r) {
  ee(e), ee(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      c1(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function c1(e, t) {
  if (ee(e), ee(t), t.readdirSync(e).forEach((r) => yf(gf.join(e, r), t)), cn) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var u1 = _o;
_o.sync = yf;
const Pi = De, f1 = Re.fromCallback, _f = u1;
function h1(e, t) {
  if (Pi.rm) return Pi.rm(e, { recursive: !0, force: !0 }, t);
  _f(e, t);
}
function d1(e) {
  if (Pi.rmSync) return Pi.rmSync(e, { recursive: !0, force: !0 });
  _f.sync(e);
}
var qi = {
  remove: f1(h1),
  removeSync: d1
};
const p1 = Re.fromPromise, Ef = tr, wf = se, bf = lt, Sf = qi, Hl = p1(async function(t) {
  let r;
  try {
    r = await Ef.readdir(t);
  } catch {
    return bf.mkdirs(t);
  }
  return Promise.all(r.map((n) => Sf.remove(wf.join(t, n))));
});
function ql(e) {
  let t;
  try {
    t = Ef.readdirSync(e);
  } catch {
    return bf.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = wf.join(e, r), Sf.removeSync(r);
  });
}
var m1 = {
  emptyDirSync: ql,
  emptydirSync: ql,
  emptyDir: Hl,
  emptydir: Hl
};
const g1 = Re.fromCallback, Cf = se, St = De, Af = lt;
function v1(e, t) {
  function r() {
    St.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  St.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const a = Cf.dirname(e);
    St.stat(a, (s, c) => {
      if (s)
        return s.code === "ENOENT" ? Af.mkdirs(a, (l) => {
          if (l) return t(l);
          r();
        }) : t(s);
      c.isDirectory() ? r() : St.readdir(a, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function y1(e) {
  let t;
  try {
    t = St.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Cf.dirname(e);
  try {
    St.statSync(r).isDirectory() || St.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Af.mkdirsSync(r);
    else throw n;
  }
  St.writeFileSync(e, "");
}
var _1 = {
  createFile: g1(v1),
  createFileSync: y1
};
const E1 = Re.fromCallback, Pf = se, bt = De, xf = lt, w1 = rr.pathExists, { areIdentical: Tf } = Or;
function b1(e, t, r) {
  function n(i, a) {
    bt.link(i, a, (s) => {
      if (s) return r(s);
      r(null);
    });
  }
  bt.lstat(t, (i, a) => {
    bt.lstat(e, (s, c) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), r(s);
      if (a && Tf(c, a)) return r(null);
      const l = Pf.dirname(t);
      w1(l, (f, o) => {
        if (f) return r(f);
        if (o) return n(e, t);
        xf.mkdirs(l, (d) => {
          if (d) return r(d);
          n(e, t);
        });
      });
    });
  });
}
function S1(e, t) {
  let r;
  try {
    r = bt.lstatSync(t);
  } catch {
  }
  try {
    const a = bt.lstatSync(e);
    if (r && Tf(a, r)) return;
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  const n = Pf.dirname(t);
  return bt.existsSync(n) || xf.mkdirsSync(n), bt.linkSync(e, t);
}
var C1 = {
  createLink: E1(b1),
  createLinkSync: S1
};
const Ct = se, Zr = De, A1 = rr.pathExists;
function P1(e, t, r) {
  if (Ct.isAbsolute(e))
    return Zr.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = Ct.dirname(t), i = Ct.join(n, e);
    return A1(i, (a, s) => a ? r(a) : s ? r(null, {
      toCwd: i,
      toDst: e
    }) : Zr.lstat(e, (c) => c ? (c.message = c.message.replace("lstat", "ensureSymlink"), r(c)) : r(null, {
      toCwd: e,
      toDst: Ct.relative(n, e)
    })));
  }
}
function x1(e, t) {
  let r;
  if (Ct.isAbsolute(e)) {
    if (r = Zr.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = Ct.dirname(t), i = Ct.join(n, e);
    if (r = Zr.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = Zr.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: Ct.relative(n, e)
    };
  }
}
var T1 = {
  symlinkPaths: P1,
  symlinkPathsSync: x1
};
const If = De;
function I1(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  If.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function O1(e, t) {
  let r;
  if (t) return t;
  try {
    r = If.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var R1 = {
  symlinkType: I1,
  symlinkTypeSync: O1
};
const D1 = Re.fromCallback, Of = se, Qe = tr, Rf = lt, N1 = Rf.mkdirs, L1 = Rf.mkdirsSync, Df = T1, k1 = Df.symlinkPaths, F1 = Df.symlinkPathsSync, Nf = R1, U1 = Nf.symlinkType, M1 = Nf.symlinkTypeSync, $1 = rr.pathExists, { areIdentical: Lf } = Or;
function B1(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Qe.lstat(t, (i, a) => {
    !i && a.isSymbolicLink() ? Promise.all([
      Qe.stat(e),
      Qe.stat(t)
    ]).then(([s, c]) => {
      if (Lf(s, c)) return n(null);
      jl(e, t, r, n);
    }) : jl(e, t, r, n);
  });
}
function jl(e, t, r, n) {
  k1(e, t, (i, a) => {
    if (i) return n(i);
    e = a.toDst, U1(a.toCwd, r, (s, c) => {
      if (s) return n(s);
      const l = Of.dirname(t);
      $1(l, (f, o) => {
        if (f) return n(f);
        if (o) return Qe.symlink(e, t, c, n);
        N1(l, (d) => {
          if (d) return n(d);
          Qe.symlink(e, t, c, n);
        });
      });
    });
  });
}
function H1(e, t, r) {
  let n;
  try {
    n = Qe.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const c = Qe.statSync(e), l = Qe.statSync(t);
    if (Lf(c, l)) return;
  }
  const i = F1(e, t);
  e = i.toDst, r = M1(i.toCwd, r);
  const a = Of.dirname(t);
  return Qe.existsSync(a) || L1(a), Qe.symlinkSync(e, t, r);
}
var q1 = {
  createSymlink: D1(B1),
  createSymlinkSync: H1
};
const { createFile: Gl, createFileSync: Vl } = _1, { createLink: Wl, createLinkSync: zl } = C1, { createSymlink: Yl, createSymlinkSync: Xl } = q1;
var j1 = {
  // file
  createFile: Gl,
  createFileSync: Vl,
  ensureFile: Gl,
  ensureFileSync: Vl,
  // link
  createLink: Wl,
  createLinkSync: zl,
  ensureLink: Wl,
  ensureLinkSync: zl,
  // symlink
  createSymlink: Yl,
  createSymlinkSync: Xl,
  ensureSymlink: Yl,
  ensureSymlinkSync: Xl
};
function G1(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const a = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + a;
}
function V1(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Eo = { stringify: G1, stripBom: V1 };
let xr;
try {
  xr = De;
} catch {
  xr = Ze;
}
const ji = Re, { stringify: kf, stripBom: Ff } = Eo;
async function W1(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || xr, n = "throws" in t ? t.throws : !0;
  let i = await ji.fromCallback(r.readFile)(e, t);
  i = Ff(i);
  let a;
  try {
    a = JSON.parse(i, t ? t.reviver : null);
  } catch (s) {
    if (n)
      throw s.message = `${e}: ${s.message}`, s;
    return null;
  }
  return a;
}
const z1 = ji.fromPromise(W1);
function Y1(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || xr, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Ff(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function X1(e, t, r = {}) {
  const n = r.fs || xr, i = kf(t, r);
  await ji.fromCallback(n.writeFile)(e, i, r);
}
const K1 = ji.fromPromise(X1);
function J1(e, t, r = {}) {
  const n = r.fs || xr, i = kf(t, r);
  return n.writeFileSync(e, i, r);
}
var Q1 = {
  readFile: z1,
  readFileSync: Y1,
  writeFile: K1,
  writeFileSync: J1
};
const Qn = Q1;
var Z1 = {
  // jsonfile exports
  readJson: Qn.readFile,
  readJsonSync: Qn.readFileSync,
  writeJson: Qn.writeFile,
  writeJsonSync: Qn.writeFileSync
};
const em = Re.fromCallback, en = De, Uf = se, Mf = lt, tm = rr.pathExists;
function rm(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = Uf.dirname(e);
  tm(i, (a, s) => {
    if (a) return n(a);
    if (s) return en.writeFile(e, t, r, n);
    Mf.mkdirs(i, (c) => {
      if (c) return n(c);
      en.writeFile(e, t, r, n);
    });
  });
}
function nm(e, ...t) {
  const r = Uf.dirname(e);
  if (en.existsSync(r))
    return en.writeFileSync(e, ...t);
  Mf.mkdirsSync(r), en.writeFileSync(e, ...t);
}
var wo = {
  outputFile: em(rm),
  outputFileSync: nm
};
const { stringify: im } = Eo, { outputFile: am } = wo;
async function sm(e, t, r = {}) {
  const n = im(t, r);
  await am(e, n, r);
}
var om = sm;
const { stringify: lm } = Eo, { outputFileSync: cm } = wo;
function um(e, t, r) {
  const n = lm(t, r);
  cm(e, n, r);
}
var fm = um;
const hm = Re.fromPromise, Oe = Z1;
Oe.outputJson = hm(om);
Oe.outputJsonSync = fm;
Oe.outputJSON = Oe.outputJson;
Oe.outputJSONSync = Oe.outputJsonSync;
Oe.writeJSON = Oe.writeJson;
Oe.writeJSONSync = Oe.writeJsonSync;
Oe.readJSON = Oe.readJson;
Oe.readJSONSync = Oe.readJsonSync;
var dm = Oe;
const pm = De, vs = se, mm = yo.copy, $f = qi.remove, gm = lt.mkdirp, vm = rr.pathExists, Kl = Or;
function ym(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Kl.checkPaths(e, t, "move", r, (a, s) => {
    if (a) return n(a);
    const { srcStat: c, isChangingCase: l = !1 } = s;
    Kl.checkParentPaths(e, c, t, "move", (f) => {
      if (f) return n(f);
      if (_m(t)) return Jl(e, t, i, l, n);
      gm(vs.dirname(t), (o) => o ? n(o) : Jl(e, t, i, l, n));
    });
  });
}
function _m(e) {
  const t = vs.dirname(e);
  return vs.parse(t).root === t;
}
function Jl(e, t, r, n, i) {
  if (n) return Ia(e, t, r, i);
  if (r)
    return $f(t, (a) => a ? i(a) : Ia(e, t, r, i));
  vm(t, (a, s) => a ? i(a) : s ? i(new Error("dest already exists.")) : Ia(e, t, r, i));
}
function Ia(e, t, r, n) {
  pm.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : Em(e, t, r, n) : n());
}
function Em(e, t, r, n) {
  mm(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (a) => a ? n(a) : $f(e, n));
}
var wm = ym;
const Bf = De, ys = se, bm = yo.copySync, Hf = qi.removeSync, Sm = lt.mkdirpSync, Ql = Or;
function Cm(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = Ql.checkPathsSync(e, t, "move", r);
  return Ql.checkParentPathsSync(e, i, t, "move"), Am(t) || Sm(ys.dirname(t)), Pm(e, t, n, a);
}
function Am(e) {
  const t = ys.dirname(e);
  return ys.parse(t).root === t;
}
function Pm(e, t, r, n) {
  if (n) return Oa(e, t, r);
  if (r)
    return Hf(t), Oa(e, t, r);
  if (Bf.existsSync(t)) throw new Error("dest already exists.");
  return Oa(e, t, r);
}
function Oa(e, t, r) {
  try {
    Bf.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return xm(e, t, r);
  }
}
function xm(e, t, r) {
  return bm(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Hf(e);
}
var Tm = Cm;
const Im = Re.fromCallback;
var Om = {
  move: Im(wm),
  moveSync: Tm
}, Ft = {
  // Export promiseified graceful-fs:
  ...tr,
  // Export extra methods:
  ...yo,
  ...m1,
  ...j1,
  ...dm,
  ...lt,
  ...Om,
  ...wo,
  ...rr,
  ...qi
}, nr = {}, Tt = {}, de = {}, It = {};
Object.defineProperty(It, "__esModule", { value: !0 });
It.CancellationError = It.CancellationToken = void 0;
const Rm = zu;
class Dm extends Rm.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new _s());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, a) => {
      let s = null;
      if (n = () => {
        try {
          s != null && (s(), s = null);
        } finally {
          a(new _s());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, a, (c) => {
        s = c;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
It.CancellationToken = Dm;
class _s extends Error {
  constructor() {
    super("cancelled");
  }
}
It.CancellationError = _s;
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.newError = Nm;
function Nm(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var Ie = {}, Es = { exports: {} }, Zn = { exports: {} }, Ra, Zl;
function Lm() {
  if (Zl) return Ra;
  Zl = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, a = n * 365.25;
  Ra = function(o, d) {
    d = d || {};
    var u = typeof o;
    if (u === "string" && o.length > 0)
      return s(o);
    if (u === "number" && isFinite(o))
      return d.long ? l(o) : c(o);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(o)
    );
  };
  function s(o) {
    if (o = String(o), !(o.length > 100)) {
      var d = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        o
      );
      if (d) {
        var u = parseFloat(d[1]), h = (d[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return u * a;
          case "weeks":
          case "week":
          case "w":
            return u * i;
          case "days":
          case "day":
          case "d":
            return u * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return u * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return u * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return u * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return u;
          default:
            return;
        }
      }
    }
  }
  function c(o) {
    var d = Math.abs(o);
    return d >= n ? Math.round(o / n) + "d" : d >= r ? Math.round(o / r) + "h" : d >= t ? Math.round(o / t) + "m" : d >= e ? Math.round(o / e) + "s" : o + "ms";
  }
  function l(o) {
    var d = Math.abs(o);
    return d >= n ? f(o, d, n, "day") : d >= r ? f(o, d, r, "hour") : d >= t ? f(o, d, t, "minute") : d >= e ? f(o, d, e, "second") : o + " ms";
  }
  function f(o, d, u, h) {
    var p = d >= u * 1.5;
    return Math.round(o / u) + " " + h + (p ? "s" : "");
  }
  return Ra;
}
var Da, ec;
function qf() {
  if (ec) return Da;
  ec = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = f, n.disable = c, n.enable = a, n.enabled = l, n.humanize = Lm(), n.destroy = o, Object.keys(t).forEach((d) => {
      n[d] = t[d];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(d) {
      let u = 0;
      for (let h = 0; h < d.length; h++)
        u = (u << 5) - u + d.charCodeAt(h), u |= 0;
      return n.colors[Math.abs(u) % n.colors.length];
    }
    n.selectColor = r;
    function n(d) {
      let u, h = null, p, m;
      function g(...E) {
        if (!g.enabled)
          return;
        const y = g, S = Number(/* @__PURE__ */ new Date()), _ = S - (u || S);
        y.diff = _, y.prev = u, y.curr = S, u = S, E[0] = n.coerce(E[0]), typeof E[0] != "string" && E.unshift("%O");
        let A = 0;
        E[0] = E[0].replace(/%([a-zA-Z%])/g, (T, $) => {
          if (T === "%%")
            return "%";
          A++;
          const C = n.formatters[$];
          if (typeof C == "function") {
            const F = E[A];
            T = C.call(y, F), E.splice(A, 1), A--;
          }
          return T;
        }), n.formatArgs.call(y, E), (y.log || n.log).apply(y, E);
      }
      return g.namespace = d, g.useColors = n.useColors(), g.color = n.selectColor(d), g.extend = i, g.destroy = n.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (p !== n.namespaces && (p = n.namespaces, m = n.enabled(d)), m),
        set: (E) => {
          h = E;
        }
      }), typeof n.init == "function" && n.init(g), g;
    }
    function i(d, u) {
      const h = n(this.namespace + (typeof u > "u" ? ":" : u) + d);
      return h.log = this.log, h;
    }
    function a(d) {
      n.save(d), n.namespaces = d, n.names = [], n.skips = [];
      const u = (typeof d == "string" ? d : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const h of u)
        h[0] === "-" ? n.skips.push(h.slice(1)) : n.names.push(h);
    }
    function s(d, u) {
      let h = 0, p = 0, m = -1, g = 0;
      for (; h < d.length; )
        if (p < u.length && (u[p] === d[h] || u[p] === "*"))
          u[p] === "*" ? (m = p, g = h, p++) : (h++, p++);
        else if (m !== -1)
          p = m + 1, g++, h = g;
        else
          return !1;
      for (; p < u.length && u[p] === "*"; )
        p++;
      return p === u.length;
    }
    function c() {
      const d = [
        ...n.names,
        ...n.skips.map((u) => "-" + u)
      ].join(",");
      return n.enable(""), d;
    }
    function l(d) {
      for (const u of n.skips)
        if (s(d, u))
          return !1;
      for (const u of n.names)
        if (s(d, u))
          return !0;
      return !1;
    }
    function f(d) {
      return d instanceof Error ? d.stack || d.message : d;
    }
    function o() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Da = e, Da;
}
var tc;
function km() {
  return tc || (tc = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = a, t.useColors = r, t.storage = s(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      l.splice(1, 0, f, "color: inherit");
      let o = 0, d = 0;
      l[0].replace(/%[a-zA-Z%]/g, (u) => {
        u !== "%%" && (o++, u === "%c" && (d = o));
      }), l.splice(d, 0, f);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function a() {
      let l;
      try {
        l = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = qf()(t);
    const { formatters: c } = e.exports;
    c.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(Zn, Zn.exports)), Zn.exports;
}
var ei = { exports: {} }, Na, rc;
function Fm() {
  return rc || (rc = 1, Na = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Na;
}
var La, nc;
function Um() {
  if (nc) return La;
  nc = 1;
  const e = $i, t = Yu, r = Fm(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function a(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function s(l, f) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (l && !f && i === void 0)
      return 0;
    const o = i || 0;
    if (n.TERM === "dumb")
      return o;
    if (process.platform === "win32") {
      const d = e.release().split(".");
      return Number(d[0]) >= 10 && Number(d[2]) >= 10586 ? Number(d[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((d) => d in n) || n.CI_NAME === "codeship" ? 1 : o;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const d = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return d >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : o;
  }
  function c(l) {
    const f = s(l, l && l.isTTY);
    return a(f);
  }
  return La = {
    supportsColor: c,
    stdout: a(s(!0, t.isatty(1))),
    stderr: a(s(!0, t.isatty(2)))
  }, La;
}
var ic;
function Mm() {
  return ic || (ic = 1, function(e, t) {
    const r = Yu, n = oo;
    t.init = o, t.log = c, t.formatArgs = a, t.save = l, t.load = f, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const u = Um();
      u && (u.stderr || u).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((u) => /^debug_/i.test(u)).reduce((u, h) => {
      const p = h.substring(6).toLowerCase().replace(/_([a-z])/g, (g, E) => E.toUpperCase());
      let m = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(m) ? m = !0 : /^(no|off|false|disabled)$/i.test(m) ? m = !1 : m === "null" ? m = null : m = Number(m), u[p] = m, u;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function a(u) {
      const { namespace: h, useColors: p } = this;
      if (p) {
        const m = this.color, g = "\x1B[3" + (m < 8 ? m : "8;5;" + m), E = `  ${g};1m${h} \x1B[0m`;
        u[0] = E + u[0].split(`
`).join(`
` + E), u.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        u[0] = s() + h + " " + u[0];
    }
    function s() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function c(...u) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...u) + `
`);
    }
    function l(u) {
      u ? process.env.DEBUG = u : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function o(u) {
      u.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let p = 0; p < h.length; p++)
        u.inspectOpts[h[p]] = t.inspectOpts[h[p]];
    }
    e.exports = qf()(t);
    const { formatters: d } = e.exports;
    d.o = function(u) {
      return this.inspectOpts.colors = this.useColors, n.inspect(u, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, d.O = function(u) {
      return this.inspectOpts.colors = this.useColors, n.inspect(u, this.inspectOpts);
    };
  }(ei, ei.exports)), ei.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Es.exports = km() : Es.exports = Mm();
var $m = Es.exports, An = {};
Object.defineProperty(An, "__esModule", { value: !0 });
An.ProgressCallbackTransform = void 0;
const Bm = bn;
class Hm extends Bm.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
An.ProgressCallbackTransform = Hm;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.DigestTransform = Ie.HttpExecutor = Ie.HttpError = void 0;
Ie.createHttpError = bs;
Ie.parseJson = Xm;
Ie.configureRequestOptionsFromUrl = Gf;
Ie.configureRequestUrl = So;
Ie.safeGetHeader = Ar;
Ie.configureRequestOptions = xi;
Ie.safeStringifyJson = Ti;
const qm = Sn, jm = $m, Gm = Ze, Vm = bn, ws = Lt, Wm = It, ac = Rr, zm = An, Gt = (0, jm.default)("electron-builder");
function bs(e, t = null) {
  return new bo(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Ti(e.headers), t);
}
const Ym = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class bo extends Error {
  constructor(t, r = `HTTP error: ${Ym.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Ie.HttpError = bo;
function Xm(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class mr {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new Wm.CancellationToken(), n) {
    xi(t);
    const i = n == null ? void 0 : JSON.stringify(n), a = i ? Buffer.from(i) : void 0;
    if (a != null) {
      Gt(i);
      const { headers: s, ...c } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": a.length,
          ...s
        },
        ...c
      };
    }
    return this.doApiRequest(t, r, (s) => s.end(a));
  }
  doApiRequest(t, r, n, i = 0) {
    return Gt.enabled && Gt(`Request: ${Ti(t)}`), r.createPromise((a, s, c) => {
      const l = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, r, a, s, i, n);
        } catch (o) {
          s(o);
        }
      });
      this.addErrorAndTimeoutHandlers(l, s, t.timeout), this.addRedirectHandlers(l, t, s, i, (f) => {
        this.doApiRequest(f, r, n, i).then(a).catch(s);
      }), n(l, s), c(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, a) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, a, s, c) {
    var l;
    if (Gt.enabled && Gt(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Ti(r)}`), t.statusCode === 404) {
      a(bs(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const f = (l = t.statusCode) !== null && l !== void 0 ? l : 0, o = f >= 300 && f < 400, d = Ar(t, "location");
    if (o && d != null) {
      if (s > this.maxRedirects) {
        a(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(mr.prepareRedirectUrlOptions(d, r), n, c, s).then(i).catch(a);
      return;
    }
    t.setEncoding("utf8");
    let u = "";
    t.on("error", a), t.on("data", (h) => u += h), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const h = Ar(t, "content-type"), p = h != null && (Array.isArray(h) ? h.find((m) => m.includes("json")) != null : h.includes("json"));
          a(bs(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${p ? JSON.stringify(JSON.parse(u)) : u}
          `));
        } else
          i(u.length === 0 ? null : u);
      } catch (h) {
        a(h);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, a) => {
      const s = [], c = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      So(t, c), xi(c), this.doDownload(c, {
        destination: null,
        options: r,
        onCancel: a,
        callback: (l) => {
          l == null ? n(Buffer.concat(s)) : i(l);
        },
        responseHandler: (l, f) => {
          let o = 0;
          l.on("data", (d) => {
            if (o += d.length, o > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(d);
          }), l.on("end", () => {
            f(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (a) => {
      if (a.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${a.statusCode}: ${a.statusMessage}`));
        return;
      }
      a.on("error", r.callback);
      const s = Ar(a, "location");
      if (s != null) {
        n < this.maxRedirects ? this.doDownload(mr.prepareRedirectUrlOptions(s, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Jm(r, a) : r.responseHandler(a, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (a) => {
      this.doDownload(a, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = Gf(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const a = mr.reconstructOriginalUrl(r), s = jf(t, r);
      mr.isCrossOriginRedirect(a, s) && (Gt.enabled && Gt(`Given the cross-origin redirect (from ${a.host} to ${s.host}), the Authorization header will be stripped out.`), delete i.authorization);
    }
    return n;
  }
  static reconstructOriginalUrl(t) {
    const r = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const n = t.hostname, i = t.port ? `:${t.port}` : "", a = t.path || "/";
    return new ws.URL(`${r}//${n}${i}${a}`);
  }
  static isCrossOriginRedirect(t, r) {
    if (t.hostname.toLowerCase() !== r.hostname.toLowerCase())
      return !0;
    if (t.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
    ["80", ""].includes(t.port) && r.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
    ["443", ""].includes(r.port))
      return !1;
    if (t.protocol !== r.protocol)
      return !0;
    const n = t.port, i = r.port;
    return n !== i;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof bo && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Ie.HttpExecutor = mr;
function jf(e, t) {
  try {
    return new ws.URL(e);
  } catch {
    const r = t.hostname, n = t.protocol || "https:", i = t.port ? `:${t.port}` : "", a = `${n}//${r}${i}`;
    return new ws.URL(e, a);
  }
}
function Gf(e, t) {
  const r = xi(t), n = jf(e, t);
  return So(n, r), r;
}
function So(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Ss extends Vm.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, qm.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, ac.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, ac.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Ie.DigestTransform = Ss;
function Km(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Ar(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Jm(e, t) {
  if (!Km(Ar(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const s = Ar(t, "content-length");
    s != null && r.push(new zm.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Ss(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Ss(e.options.sha2, "sha256", "hex"));
  const i = (0, Gm.createWriteStream)(e.destination);
  r.push(i);
  let a = t;
  for (const s of r)
    s.on("error", (c) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(c);
    }), a = a.pipe(s);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function xi(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Ti(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.MemoLazy = void 0;
class Qm {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Vf(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Gi.MemoLazy = Qm;
function Vf(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), a = Object.keys(t);
    return i.length === a.length && i.every((s) => Vf(e[s], t[s]));
  }
  return e === t;
}
var Pn = {};
Object.defineProperty(Pn, "__esModule", { value: !0 });
Pn.githubUrl = Zm;
Pn.githubTagPrefix = eg;
Pn.getS3LikeProviderBaseUrl = tg;
function Zm(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function eg(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function tg(e) {
  const t = e.provider;
  if (t === "s3")
    return rg(e);
  if (t === "spaces")
    return ng(e);
  throw new Error(`Not supported provider: ${t}`);
}
function rg(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return Wf(t, e.path);
}
function Wf(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function ng(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Wf(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
Co.retry = zf;
const ig = It;
async function zf(e, t) {
  var r;
  const { retries: n, interval: i, backoff: a = 0, attempt: s = 0, shouldRetry: c, cancellationToken: l = new ig.CancellationToken() } = t;
  try {
    return await e();
  } catch (f) {
    if (await Promise.resolve((r = c == null ? void 0 : c(f)) !== null && r !== void 0 ? r : !0) && n > 0 && !l.cancelled)
      return await new Promise((o) => setTimeout(o, i + a * s)), await zf(e, { ...t, retries: n - 1, attempt: s + 1 });
    throw f;
  }
}
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
Ao.parseDn = ag;
function ag(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const a = /* @__PURE__ */ new Map();
  for (let s = 0; s <= e.length; s++) {
    if (s === e.length) {
      r !== null && a.set(r, n);
      break;
    }
    const c = e[s];
    if (t) {
      if (c === '"') {
        t = !1;
        continue;
      }
    } else {
      if (c === '"') {
        t = !0;
        continue;
      }
      if (c === "\\") {
        s++;
        const l = parseInt(e.slice(s, s + 2), 16);
        Number.isNaN(l) ? n += e[s] : (s++, n += String.fromCharCode(l));
        continue;
      }
      if (r === null && c === "=") {
        r = n, n = "";
        continue;
      }
      if (c === "," || c === ";" || c === "+") {
        r !== null && a.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (c === " " && !t) {
      if (n.length === 0)
        continue;
      if (s > i) {
        let l = s;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        s = i - 1;
        continue;
      }
    }
    n += c;
  }
  return a;
}
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.nil = Tr.UUID = void 0;
const Yf = Sn, Xf = Rr, sg = "options.name must be either a string or a Buffer", sc = (0, Yf.randomBytes)(16);
sc[0] = sc[0] | 1;
const Ei = {}, J = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Ei[t] = e, J[e] = t;
}
class er {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = er.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return og(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = lg(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Ei[t[14] + t[15]] & 240) >> 4,
        variant: oc((Ei[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: oc((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, Xf.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = Ei[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Tr.UUID = er;
er.OID = er.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function oc(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var tn;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(tn || (tn = {}));
function og(e, t, r, n, i = tn.ASCII) {
  const a = (0, Yf.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, Xf.newError)(sg, "ERR_INVALID_UUID_NAME");
  a.update(n), a.update(e);
  const c = a.digest();
  let l;
  switch (i) {
    case tn.BINARY:
      c[6] = c[6] & 15 | r, c[8] = c[8] & 63 | 128, l = c;
      break;
    case tn.OBJECT:
      c[6] = c[6] & 15 | r, c[8] = c[8] & 63 | 128, l = new er(c);
      break;
    default:
      l = J[c[0]] + J[c[1]] + J[c[2]] + J[c[3]] + "-" + J[c[4]] + J[c[5]] + "-" + J[c[6] & 15 | r] + J[c[7]] + "-" + J[c[8] & 63 | 128] + J[c[9]] + "-" + J[c[10]] + J[c[11]] + J[c[12]] + J[c[13]] + J[c[14]] + J[c[15]];
      break;
  }
  return l;
}
function lg(e) {
  return J[e[0]] + J[e[1]] + J[e[2]] + J[e[3]] + "-" + J[e[4]] + J[e[5]] + "-" + J[e[6]] + J[e[7]] + "-" + J[e[8]] + J[e[9]] + "-" + J[e[10]] + J[e[11]] + J[e[12]] + J[e[13]] + J[e[14]] + J[e[15]];
}
Tr.nil = new er("00000000-0000-0000-0000-000000000000");
var xn = {}, Kf = {};
(function(e) {
  (function(t) {
    t.parser = function(w, v) {
      return new n(w, v);
    }, t.SAXParser = n, t.SAXStream = o, t.createStream = f, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(w, v) {
      if (!(this instanceof n))
        return new n(w, v);
      var O = this;
      a(O), O.q = O.c = "", O.bufferCheckPosition = t.MAX_BUFFER_LENGTH, O.opt = v || {}, O.opt.lowercase = O.opt.lowercase || O.opt.lowercasetags, O.looseCase = O.opt.lowercase ? "toLowerCase" : "toUpperCase", O.tags = [], O.closed = O.closedRoot = O.sawRoot = !1, O.tag = O.error = null, O.strict = !!w, O.noscript = !!(w || O.opt.noscript), O.state = C.BEGIN, O.strictEntities = O.opt.strictEntities, O.ENTITIES = O.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), O.attribList = [], O.opt.xmlns && (O.ns = Object.create(m)), O.opt.unquotedAttributeValues === void 0 && (O.opt.unquotedAttributeValues = !w), O.trackPosition = O.opt.position !== !1, O.trackPosition && (O.position = O.line = O.column = 0), H(O, "onready");
    }
    Object.create || (Object.create = function(w) {
      function v() {
      }
      v.prototype = w;
      var O = new v();
      return O;
    }), Object.keys || (Object.keys = function(w) {
      var v = [];
      for (var O in w) w.hasOwnProperty(O) && v.push(O);
      return v;
    });
    function i(w) {
      for (var v = Math.max(t.MAX_BUFFER_LENGTH, 10), O = 0, x = 0, Q = r.length; x < Q; x++) {
        var re = w[r[x]].length;
        if (re > v)
          switch (r[x]) {
            case "textNode":
              K(w);
              break;
            case "cdata":
              G(w, "oncdata", w.cdata), w.cdata = "";
              break;
            case "script":
              G(w, "onscript", w.script), w.script = "";
              break;
            default:
              D(w, "Max buffer length exceeded: " + r[x]);
          }
        O = Math.max(O, re);
      }
      var oe = t.MAX_BUFFER_LENGTH - O;
      w.bufferCheckPosition = oe + w.position;
    }
    function a(w) {
      for (var v = 0, O = r.length; v < O; v++)
        w[r[v]] = "";
    }
    function s(w) {
      K(w), w.cdata !== "" && (G(w, "oncdata", w.cdata), w.cdata = ""), w.script !== "" && (G(w, "onscript", w.script), w.script = "");
    }
    n.prototype = {
      end: function() {
        U(this);
      },
      write: it,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        s(this);
      }
    };
    var c;
    try {
      c = require("stream").Stream;
    } catch {
      c = function() {
      };
    }
    c || (c = function() {
    });
    var l = t.EVENTS.filter(function(w) {
      return w !== "error" && w !== "end";
    });
    function f(w, v) {
      return new o(w, v);
    }
    function o(w, v) {
      if (!(this instanceof o))
        return new o(w, v);
      c.apply(this), this._parser = new n(w, v), this.writable = !0, this.readable = !0;
      var O = this;
      this._parser.onend = function() {
        O.emit("end");
      }, this._parser.onerror = function(x) {
        O.emit("error", x), O._parser.error = null;
      }, this._decoder = null, l.forEach(function(x) {
        Object.defineProperty(O, "on" + x, {
          get: function() {
            return O._parser["on" + x];
          },
          set: function(Q) {
            if (!Q)
              return O.removeAllListeners(x), O._parser["on" + x] = Q, Q;
            O.on(x, Q);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    o.prototype = Object.create(c.prototype, {
      constructor: {
        value: o
      }
    }), o.prototype.write = function(w) {
      return typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(w) && (this._decoder || (this._decoder = new TextDecoder("utf8")), w = this._decoder.decode(w, { stream: !0 })), this._parser.write(w.toString()), this.emit("data", w), !0;
    }, o.prototype.end = function(w) {
      if (w && w.length && this.write(w), this._decoder) {
        var v = this._decoder.decode();
        v && (this._parser.write(v), this.emit("data", v));
      }
      return this._parser.end(), !0;
    }, o.prototype.on = function(w, v) {
      var O = this;
      return !O._parser["on" + w] && l.indexOf(w) !== -1 && (O._parser["on" + w] = function() {
        var x = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        x.splice(0, 0, w), O.emit.apply(O, x);
      }), c.prototype.on.call(O, w, v);
    };
    var d = "[CDATA[", u = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", p = "http://www.w3.org/2000/xmlns/", m = { xml: h, xmlns: p }, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, E = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, y = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function _(w) {
      return w === " " || w === `
` || w === "\r" || w === "	";
    }
    function A(w) {
      return w === '"' || w === "'";
    }
    function I(w) {
      return w === ">" || _(w);
    }
    function T(w, v) {
      return w.test(v);
    }
    function $(w, v) {
      return !T(w, v);
    }
    var C = 0;
    t.STATE = {
      BEGIN: C++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: C++,
      // leading whitespace
      TEXT: C++,
      // general stuff
      TEXT_ENTITY: C++,
      // &amp and such.
      OPEN_WAKA: C++,
      // <
      SGML_DECL: C++,
      // <!BLARG
      SGML_DECL_QUOTED: C++,
      // <!BLARG foo "bar
      DOCTYPE: C++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: C++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: C++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: C++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: C++,
      // <!-
      COMMENT: C++,
      // <!--
      COMMENT_ENDING: C++,
      // <!-- blah -
      COMMENT_ENDED: C++,
      // <!-- blah --
      CDATA: C++,
      // <![CDATA[ something
      CDATA_ENDING: C++,
      // ]
      CDATA_ENDING_2: C++,
      // ]]
      PROC_INST: C++,
      // <?hi
      PROC_INST_BODY: C++,
      // <?hi there
      PROC_INST_ENDING: C++,
      // <?hi "there" ?
      OPEN_TAG: C++,
      // <strong
      OPEN_TAG_SLASH: C++,
      // <strong /
      ATTRIB: C++,
      // <a
      ATTRIB_NAME: C++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: C++,
      // <a foo _
      ATTRIB_VALUE: C++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: C++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: C++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: C++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: C++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: C++,
      // <foo bar=&quot
      CLOSE_TAG: C++,
      // </a
      CLOSE_TAG_SAW_WHITE: C++,
      // </a   >
      SCRIPT: C++,
      // <script> ...
      SCRIPT_ENDING: C++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(w) {
      var v = t.ENTITIES[w], O = typeof v == "number" ? String.fromCharCode(v) : v;
      t.ENTITIES[w] = O;
    });
    for (var F in t.STATE)
      t.STATE[t.STATE[F]] = F;
    C = t.STATE;
    function H(w, v, O) {
      w[v] && w[v](O);
    }
    function G(w, v, O) {
      w.textNode && K(w), H(w, v, O);
    }
    function K(w) {
      w.textNode = L(w.opt, w.textNode), w.textNode && H(w, "ontext", w.textNode), w.textNode = "";
    }
    function L(w, v) {
      return w.trim && (v = v.trim()), w.normalize && (v = v.replace(/\s+/g, " ")), v;
    }
    function D(w, v) {
      return K(w), w.trackPosition && (v += `
Line: ` + w.line + `
Column: ` + w.column + `
Char: ` + w.c), v = new Error(v), w.error = v, H(w, "onerror", v), w;
    }
    function U(w) {
      return w.sawRoot && !w.closedRoot && R(w, "Unclosed root tag"), w.state !== C.BEGIN && w.state !== C.BEGIN_WHITESPACE && w.state !== C.TEXT && D(w, "Unexpected end"), K(w), w.c = "", w.closed = !0, H(w, "onend"), n.call(w, w.strict, w.opt), w;
    }
    function R(w, v) {
      if (typeof w != "object" || !(w instanceof n))
        throw new Error("bad call to strictFail");
      w.strict && D(w, v);
    }
    function M(w) {
      w.strict || (w.tagName = w.tagName[w.looseCase]());
      var v = w.tags[w.tags.length - 1] || w, O = w.tag = { name: w.tagName, attributes: {} };
      w.opt.xmlns && (O.ns = v.ns), w.attribList.length = 0, G(w, "onopentagstart", O);
    }
    function k(w, v) {
      var O = w.indexOf(":"), x = O < 0 ? ["", w] : w.split(":"), Q = x[0], re = x[1];
      return v && w === "xmlns" && (Q = "xmlns", re = ""), { prefix: Q, local: re };
    }
    function W(w) {
      if (w.strict || (w.attribName = w.attribName[w.looseCase]()), w.attribList.indexOf(w.attribName) !== -1 || w.tag.attributes.hasOwnProperty(w.attribName)) {
        w.attribName = w.attribValue = "";
        return;
      }
      if (w.opt.xmlns) {
        var v = k(w.attribName, !0), O = v.prefix, x = v.local;
        if (O === "xmlns")
          if (x === "xml" && w.attribValue !== h)
            R(
              w,
              "xml: prefix must be bound to " + h + `
Actual: ` + w.attribValue
            );
          else if (x === "xmlns" && w.attribValue !== p)
            R(
              w,
              "xmlns: prefix must be bound to " + p + `
Actual: ` + w.attribValue
            );
          else {
            var Q = w.tag, re = w.tags[w.tags.length - 1] || w;
            Q.ns === re.ns && (Q.ns = Object.create(re.ns)), Q.ns[x] = w.attribValue;
          }
        w.attribList.push([w.attribName, w.attribValue]);
      } else
        w.tag.attributes[w.attribName] = w.attribValue, G(w, "onattribute", {
          name: w.attribName,
          value: w.attribValue
        });
      w.attribName = w.attribValue = "";
    }
    function X(w, v) {
      if (w.opt.xmlns) {
        var O = w.tag, x = k(w.tagName);
        O.prefix = x.prefix, O.local = x.local, O.uri = O.ns[x.prefix] || "", O.prefix && !O.uri && (R(
          w,
          "Unbound namespace prefix: " + JSON.stringify(w.tagName)
        ), O.uri = x.prefix);
        var Q = w.tags[w.tags.length - 1] || w;
        O.ns && Q.ns !== O.ns && Object.keys(O.ns).forEach(function(Bn) {
          G(w, "onopennamespace", {
            prefix: Bn,
            uri: O.ns[Bn]
          });
        });
        for (var re = 0, oe = w.attribList.length; re < oe; re++) {
          var ye = w.attribList[re], be = ye[0], gt = ye[1], he = k(be, !0), Ye = he.prefix, ua = he.local, $n = Ye === "" ? "" : O.ns[Ye] || "", Fr = {
            name: be,
            value: gt,
            prefix: Ye,
            local: ua,
            uri: $n
          };
          Ye && Ye !== "xmlns" && !$n && (R(
            w,
            "Unbound namespace prefix: " + JSON.stringify(Ye)
          ), Fr.uri = Ye), w.tag.attributes[be] = Fr, G(w, "onattribute", Fr);
        }
        w.attribList.length = 0;
      }
      w.tag.isSelfClosing = !!v, w.sawRoot = !0, w.tags.push(w.tag), G(w, "onopentag", w.tag), v || (!w.noscript && w.tagName.toLowerCase() === "script" ? w.state = C.SCRIPT : w.state = C.TEXT, w.tag = null, w.tagName = ""), w.attribName = w.attribValue = "", w.attribList.length = 0;
    }
    function z(w) {
      if (!w.tagName) {
        R(w, "Weird empty close tag."), w.textNode += "</>", w.state = C.TEXT;
        return;
      }
      if (w.script) {
        if (w.tagName !== "script") {
          w.script += "</" + w.tagName + ">", w.tagName = "", w.state = C.SCRIPT;
          return;
        }
        G(w, "onscript", w.script), w.script = "";
      }
      var v = w.tags.length, O = w.tagName;
      w.strict || (O = O[w.looseCase]());
      for (var x = O; v--; ) {
        var Q = w.tags[v];
        if (Q.name !== x)
          R(w, "Unexpected close tag");
        else
          break;
      }
      if (v < 0) {
        R(w, "Unmatched closing tag: " + w.tagName), w.textNode += "</" + w.tagName + ">", w.state = C.TEXT;
        return;
      }
      w.tagName = O;
      for (var re = w.tags.length; re-- > v; ) {
        var oe = w.tag = w.tags.pop();
        w.tagName = w.tag.name, G(w, "onclosetag", w.tagName);
        var ye = {};
        for (var be in oe.ns)
          ye[be] = oe.ns[be];
        var gt = w.tags[w.tags.length - 1] || w;
        w.opt.xmlns && oe.ns !== gt.ns && Object.keys(oe.ns).forEach(function(he) {
          var Ye = oe.ns[he];
          G(w, "onclosenamespace", { prefix: he, uri: Ye });
        });
      }
      v === 0 && (w.closedRoot = !0), w.tagName = w.attribValue = w.attribName = "", w.attribList.length = 0, w.state = C.TEXT;
    }
    function Z(w) {
      var v = w.entity, O = v.toLowerCase(), x, Q = "";
      return w.ENTITIES[v] ? w.ENTITIES[v] : w.ENTITIES[O] ? w.ENTITIES[O] : (v = O, v.charAt(0) === "#" && (v.charAt(1) === "x" ? (v = v.slice(2), x = parseInt(v, 16), Q = x.toString(16)) : (v = v.slice(1), x = parseInt(v, 10), Q = x.toString(10))), v = v.replace(/^0+/, ""), isNaN(x) || Q.toLowerCase() !== v || x < 0 || x > 1114111 ? (R(w, "Invalid character entity"), "&" + w.entity + ";") : String.fromCodePoint(x));
    }
    function pe(w, v) {
      v === "<" ? (w.state = C.OPEN_WAKA, w.startTagPosition = w.position) : _(v) || (R(w, "Non-whitespace before first tag."), w.textNode = v, w.state = C.TEXT);
    }
    function V(w, v) {
      var O = "";
      return v < w.length && (O = w.charAt(v)), O;
    }
    function it(w) {
      var v = this;
      if (this.error)
        throw this.error;
      if (v.closed)
        return D(
          v,
          "Cannot write after close. Assign an onready handler."
        );
      if (w === null)
        return U(v);
      typeof w == "object" && (w = w.toString());
      for (var O = 0, x = ""; x = V(w, O++), v.c = x, !!x; )
        switch (v.trackPosition && (v.position++, x === `
` ? (v.line++, v.column = 0) : v.column++), v.state) {
          case C.BEGIN:
            if (v.state = C.BEGIN_WHITESPACE, x === "\uFEFF")
              continue;
            pe(v, x);
            continue;
          case C.BEGIN_WHITESPACE:
            pe(v, x);
            continue;
          case C.TEXT:
            if (v.sawRoot && !v.closedRoot) {
              for (var re = O - 1; x && x !== "<" && x !== "&"; )
                x = V(w, O++), x && v.trackPosition && (v.position++, x === `
` ? (v.line++, v.column = 0) : v.column++);
              v.textNode += w.substring(re, O - 1);
            }
            x === "<" && !(v.sawRoot && v.closedRoot && !v.strict) ? (v.state = C.OPEN_WAKA, v.startTagPosition = v.position) : (!_(x) && (!v.sawRoot || v.closedRoot) && R(v, "Text data outside of root node."), x === "&" ? v.state = C.TEXT_ENTITY : v.textNode += x);
            continue;
          case C.SCRIPT:
            x === "<" ? v.state = C.SCRIPT_ENDING : v.script += x;
            continue;
          case C.SCRIPT_ENDING:
            x === "/" ? v.state = C.CLOSE_TAG : (v.script += "<" + x, v.state = C.SCRIPT);
            continue;
          case C.OPEN_WAKA:
            if (x === "!")
              v.state = C.SGML_DECL, v.sgmlDecl = "";
            else if (!_(x)) if (T(g, x))
              v.state = C.OPEN_TAG, v.tagName = x;
            else if (x === "/")
              v.state = C.CLOSE_TAG, v.tagName = "";
            else if (x === "?")
              v.state = C.PROC_INST, v.procInstName = v.procInstBody = "";
            else {
              if (R(v, "Unencoded <"), v.startTagPosition + 1 < v.position) {
                var Q = v.position - v.startTagPosition;
                x = new Array(Q).join(" ") + x;
              }
              v.textNode += "<" + x, v.state = C.TEXT;
            }
            continue;
          case C.SGML_DECL:
            if (v.sgmlDecl + x === "--") {
              v.state = C.COMMENT, v.comment = "", v.sgmlDecl = "";
              continue;
            }
            v.doctype && v.doctype !== !0 && v.sgmlDecl ? (v.state = C.DOCTYPE_DTD, v.doctype += "<!" + v.sgmlDecl + x, v.sgmlDecl = "") : (v.sgmlDecl + x).toUpperCase() === d ? (G(v, "onopencdata"), v.state = C.CDATA, v.sgmlDecl = "", v.cdata = "") : (v.sgmlDecl + x).toUpperCase() === u ? (v.state = C.DOCTYPE, (v.doctype || v.sawRoot) && R(
              v,
              "Inappropriately located doctype declaration"
            ), v.doctype = "", v.sgmlDecl = "") : x === ">" ? (G(v, "onsgmldeclaration", v.sgmlDecl), v.sgmlDecl = "", v.state = C.TEXT) : (A(x) && (v.state = C.SGML_DECL_QUOTED), v.sgmlDecl += x);
            continue;
          case C.SGML_DECL_QUOTED:
            x === v.q && (v.state = C.SGML_DECL, v.q = ""), v.sgmlDecl += x;
            continue;
          case C.DOCTYPE:
            x === ">" ? (v.state = C.TEXT, G(v, "ondoctype", v.doctype), v.doctype = !0) : (v.doctype += x, x === "[" ? v.state = C.DOCTYPE_DTD : A(x) && (v.state = C.DOCTYPE_QUOTED, v.q = x));
            continue;
          case C.DOCTYPE_QUOTED:
            v.doctype += x, x === v.q && (v.q = "", v.state = C.DOCTYPE);
            continue;
          case C.DOCTYPE_DTD:
            x === "]" ? (v.doctype += x, v.state = C.DOCTYPE) : x === "<" ? (v.state = C.OPEN_WAKA, v.startTagPosition = v.position) : A(x) ? (v.doctype += x, v.state = C.DOCTYPE_DTD_QUOTED, v.q = x) : v.doctype += x;
            continue;
          case C.DOCTYPE_DTD_QUOTED:
            v.doctype += x, x === v.q && (v.state = C.DOCTYPE_DTD, v.q = "");
            continue;
          case C.COMMENT:
            x === "-" ? v.state = C.COMMENT_ENDING : v.comment += x;
            continue;
          case C.COMMENT_ENDING:
            x === "-" ? (v.state = C.COMMENT_ENDED, v.comment = L(v.opt, v.comment), v.comment && G(v, "oncomment", v.comment), v.comment = "") : (v.comment += "-" + x, v.state = C.COMMENT);
            continue;
          case C.COMMENT_ENDED:
            x !== ">" ? (R(v, "Malformed comment"), v.comment += "--" + x, v.state = C.COMMENT) : v.doctype && v.doctype !== !0 ? v.state = C.DOCTYPE_DTD : v.state = C.TEXT;
            continue;
          case C.CDATA:
            for (var re = O - 1; x && x !== "]"; )
              x = V(w, O++), x && v.trackPosition && (v.position++, x === `
` ? (v.line++, v.column = 0) : v.column++);
            v.cdata += w.substring(re, O - 1), x === "]" && (v.state = C.CDATA_ENDING);
            continue;
          case C.CDATA_ENDING:
            x === "]" ? v.state = C.CDATA_ENDING_2 : (v.cdata += "]" + x, v.state = C.CDATA);
            continue;
          case C.CDATA_ENDING_2:
            x === ">" ? (v.cdata && G(v, "oncdata", v.cdata), G(v, "onclosecdata"), v.cdata = "", v.state = C.TEXT) : x === "]" ? v.cdata += "]" : (v.cdata += "]]" + x, v.state = C.CDATA);
            continue;
          case C.PROC_INST:
            x === "?" ? v.state = C.PROC_INST_ENDING : _(x) ? v.state = C.PROC_INST_BODY : v.procInstName += x;
            continue;
          case C.PROC_INST_BODY:
            if (!v.procInstBody && _(x))
              continue;
            x === "?" ? v.state = C.PROC_INST_ENDING : v.procInstBody += x;
            continue;
          case C.PROC_INST_ENDING:
            x === ">" ? (G(v, "onprocessinginstruction", {
              name: v.procInstName,
              body: v.procInstBody
            }), v.procInstName = v.procInstBody = "", v.state = C.TEXT) : (v.procInstBody += "?" + x, v.state = C.PROC_INST_BODY);
            continue;
          case C.OPEN_TAG:
            T(E, x) ? v.tagName += x : (M(v), x === ">" ? X(v) : x === "/" ? v.state = C.OPEN_TAG_SLASH : (_(x) || R(v, "Invalid character in tag name"), v.state = C.ATTRIB));
            continue;
          case C.OPEN_TAG_SLASH:
            x === ">" ? (X(v, !0), z(v)) : (R(
              v,
              "Forward-slash in opening tag not followed by >"
            ), v.state = C.ATTRIB);
            continue;
          case C.ATTRIB:
            if (_(x))
              continue;
            x === ">" ? X(v) : x === "/" ? v.state = C.OPEN_TAG_SLASH : T(g, x) ? (v.attribName = x, v.attribValue = "", v.state = C.ATTRIB_NAME) : R(v, "Invalid attribute name");
            continue;
          case C.ATTRIB_NAME:
            x === "=" ? v.state = C.ATTRIB_VALUE : x === ">" ? (R(v, "Attribute without value"), v.attribValue = v.attribName, W(v), X(v)) : _(x) ? v.state = C.ATTRIB_NAME_SAW_WHITE : T(E, x) ? v.attribName += x : R(v, "Invalid attribute name");
            continue;
          case C.ATTRIB_NAME_SAW_WHITE:
            if (x === "=")
              v.state = C.ATTRIB_VALUE;
            else {
              if (_(x))
                continue;
              R(v, "Attribute without value"), v.tag.attributes[v.attribName] = "", v.attribValue = "", G(v, "onattribute", {
                name: v.attribName,
                value: ""
              }), v.attribName = "", x === ">" ? X(v) : T(g, x) ? (v.attribName = x, v.state = C.ATTRIB_NAME) : (R(v, "Invalid attribute name"), v.state = C.ATTRIB);
            }
            continue;
          case C.ATTRIB_VALUE:
            if (_(x))
              continue;
            A(x) ? (v.q = x, v.state = C.ATTRIB_VALUE_QUOTED) : (v.opt.unquotedAttributeValues || D(v, "Unquoted attribute value"), v.state = C.ATTRIB_VALUE_UNQUOTED, v.attribValue = x);
            continue;
          case C.ATTRIB_VALUE_QUOTED:
            if (x !== v.q) {
              x === "&" ? v.state = C.ATTRIB_VALUE_ENTITY_Q : v.attribValue += x;
              continue;
            }
            W(v), v.q = "", v.state = C.ATTRIB_VALUE_CLOSED;
            continue;
          case C.ATTRIB_VALUE_CLOSED:
            _(x) ? v.state = C.ATTRIB : x === ">" ? X(v) : x === "/" ? v.state = C.OPEN_TAG_SLASH : T(g, x) ? (R(v, "No whitespace between attributes"), v.attribName = x, v.attribValue = "", v.state = C.ATTRIB_NAME) : R(v, "Invalid attribute name");
            continue;
          case C.ATTRIB_VALUE_UNQUOTED:
            if (!I(x)) {
              x === "&" ? v.state = C.ATTRIB_VALUE_ENTITY_U : v.attribValue += x;
              continue;
            }
            W(v), x === ">" ? X(v) : v.state = C.ATTRIB;
            continue;
          case C.CLOSE_TAG:
            if (v.tagName)
              x === ">" ? z(v) : T(E, x) ? v.tagName += x : v.script ? (v.script += "</" + v.tagName + x, v.tagName = "", v.state = C.SCRIPT) : (_(x) || R(v, "Invalid tagname in closing tag"), v.state = C.CLOSE_TAG_SAW_WHITE);
            else {
              if (_(x))
                continue;
              $(g, x) ? v.script ? (v.script += "</" + x, v.state = C.SCRIPT) : R(v, "Invalid tagname in closing tag.") : v.tagName = x;
            }
            continue;
          case C.CLOSE_TAG_SAW_WHITE:
            if (_(x))
              continue;
            x === ">" ? z(v) : R(v, "Invalid characters in closing tag");
            continue;
          case C.TEXT_ENTITY:
          case C.ATTRIB_VALUE_ENTITY_Q:
          case C.ATTRIB_VALUE_ENTITY_U:
            var oe, ye;
            switch (v.state) {
              case C.TEXT_ENTITY:
                oe = C.TEXT, ye = "textNode";
                break;
              case C.ATTRIB_VALUE_ENTITY_Q:
                oe = C.ATTRIB_VALUE_QUOTED, ye = "attribValue";
                break;
              case C.ATTRIB_VALUE_ENTITY_U:
                oe = C.ATTRIB_VALUE_UNQUOTED, ye = "attribValue";
                break;
            }
            if (x === ";") {
              var be = Z(v);
              v.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(be) ? (v.entity = "", v.state = oe, v.write(be)) : (v[ye] += be, v.entity = "", v.state = oe);
            } else T(v.entity.length ? S : y, x) ? v.entity += x : (R(v, "Invalid character in entity name"), v[ye] += "&" + v.entity + x, v.entity = "", v.state = oe);
            continue;
          default:
            throw new Error(v, "Unknown state: " + v.state);
        }
      return v.position >= v.bufferCheckPosition && i(v), v;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var w = String.fromCharCode, v = Math.floor, O = function() {
        var x = 16384, Q = [], re, oe, ye = -1, be = arguments.length;
        if (!be)
          return "";
        for (var gt = ""; ++ye < be; ) {
          var he = Number(arguments[ye]);
          if (!isFinite(he) || // `NaN`, `+Infinity`, or `-Infinity`
          he < 0 || // not a valid Unicode code point
          he > 1114111 || // not a valid Unicode code point
          v(he) !== he)
            throw RangeError("Invalid code point: " + he);
          he <= 65535 ? Q.push(he) : (he -= 65536, re = (he >> 10) + 55296, oe = he % 1024 + 56320, Q.push(re, oe)), (ye + 1 === be || Q.length > x) && (gt += w.apply(null, Q), Q.length = 0);
        }
        return gt;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: O,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = O;
    }();
  })(e);
})(Kf);
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.XElement = void 0;
xn.parseXml = hg;
const cg = Kf, ti = Rr;
class Jf {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, ti.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!fg(t))
      throw (0, ti.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, ti.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, ti.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (lc(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => lc(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
xn.XElement = Jf;
const ug = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function fg(e) {
  return ug.test(e);
}
function lc(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function hg(e) {
  let t = null;
  const r = cg.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const a = new Jf(i.name);
    if (a.attributes = i.attributes, t === null)
      t = a;
    else {
      const s = n[n.length - 1];
      s.elements == null && (s.elements = []), s.elements.push(a);
    }
    n.push(a);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const a = n[n.length - 1];
    a.value = i, a.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = d;
  var t = It;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = Rr;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = Ie;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = Gi;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var a = An;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var s = Pn;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return s.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return s.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return s.githubTagPrefix;
  } });
  var c = Co;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return c.retry;
  } });
  var l = Ao;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var f = Tr;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return f.UUID;
  } });
  var o = xn;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return o.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return o.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function d(u) {
    return u == null ? [] : Array.isArray(u) ? u : [u];
  }
})(de);
var we = {}, Po = {}, et = {};
function Qf(e) {
  return typeof e > "u" || e === null;
}
function dg(e) {
  return typeof e == "object" && e !== null;
}
function pg(e) {
  return Array.isArray(e) ? e : Qf(e) ? [] : [e];
}
function mg(e, t) {
  var r, n, i, a;
  if (t)
    for (a = Object.keys(t), r = 0, n = a.length; r < n; r += 1)
      i = a[r], e[i] = t[i];
  return e;
}
function gg(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function vg(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
et.isNothing = Qf;
et.isObject = dg;
et.toArray = pg;
et.repeat = gg;
et.isNegativeZero = vg;
et.extend = mg;
function Zf(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function un(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Zf(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
un.prototype = Object.create(Error.prototype);
un.prototype.constructor = un;
un.prototype.toString = function(t) {
  return this.name + ": " + Zf(this, t);
};
var Tn = un, Jr = et;
function ka(e, t, r, n, i) {
  var a = "", s = "", c = Math.floor(i / 2) - 1;
  return n - t > c && (a = " ... ", t = n - c + a.length), r - n > c && (s = " ...", r = n + c - s.length), {
    str: a + e.slice(t, r).replace(/\t/g, "→") + s,
    pos: n - t + a.length
    // relative position
  };
}
function Fa(e, t) {
  return Jr.repeat(" ", t - e.length) + e;
}
function yg(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], a, s = -1; a = r.exec(e.buffer); )
    i.push(a.index), n.push(a.index + a[0].length), e.position <= a.index && s < 0 && (s = n.length - 2);
  s < 0 && (s = n.length - 1);
  var c = "", l, f, o = Math.min(e.line + t.linesAfter, i.length).toString().length, d = t.maxLength - (t.indent + o + 3);
  for (l = 1; l <= t.linesBefore && !(s - l < 0); l++)
    f = ka(
      e.buffer,
      n[s - l],
      i[s - l],
      e.position - (n[s] - n[s - l]),
      d
    ), c = Jr.repeat(" ", t.indent) + Fa((e.line - l + 1).toString(), o) + " | " + f.str + `
` + c;
  for (f = ka(e.buffer, n[s], i[s], e.position, d), c += Jr.repeat(" ", t.indent) + Fa((e.line + 1).toString(), o) + " | " + f.str + `
`, c += Jr.repeat("-", t.indent + o + 3 + f.pos) + `^
`, l = 1; l <= t.linesAfter && !(s + l >= i.length); l++)
    f = ka(
      e.buffer,
      n[s + l],
      i[s + l],
      e.position - (n[s] - n[s + l]),
      d
    ), c += Jr.repeat(" ", t.indent) + Fa((e.line + l + 1).toString(), o) + " | " + f.str + `
`;
  return c.replace(/\n$/, "");
}
var _g = yg, cc = Tn, Eg = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], wg = [
  "scalar",
  "sequence",
  "mapping"
];
function bg(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function Sg(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (Eg.indexOf(r) === -1)
      throw new cc('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = bg(t.styleAliases || null), wg.indexOf(this.kind) === -1)
    throw new cc('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Ne = Sg, jr = Tn, Ua = Ne;
function uc(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(a, s) {
      a.tag === n.tag && a.kind === n.kind && a.multi === n.multi && (i = s);
    }), r[i] = n;
  }), r;
}
function Cg() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function Cs(e) {
  return this.extend(e);
}
Cs.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof Ua)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new jr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(a) {
    if (!(a instanceof Ua))
      throw new jr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (a.loadKind && a.loadKind !== "scalar")
      throw new jr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (a.multi)
      throw new jr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(a) {
    if (!(a instanceof Ua))
      throw new jr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Cs.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = uc(i, "implicit"), i.compiledExplicit = uc(i, "explicit"), i.compiledTypeMap = Cg(i.compiledImplicit, i.compiledExplicit), i;
};
var eh = Cs, Ag = Ne, th = new Ag("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Pg = Ne, rh = new Pg("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), xg = Ne, nh = new xg("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Tg = eh, ih = new Tg({
  explicit: [
    th,
    rh,
    nh
  ]
}), Ig = Ne;
function Og(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Rg() {
  return null;
}
function Dg(e) {
  return e === null;
}
var ah = new Ig("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Og,
  construct: Rg,
  predicate: Dg,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), Ng = Ne;
function Lg(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function kg(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Fg(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var sh = new Ng("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Lg,
  construct: kg,
  predicate: Fg,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), Ug = et, Mg = Ne;
function $g(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Bg(e) {
  return 48 <= e && e <= 55;
}
function Hg(e) {
  return 48 <= e && e <= 57;
}
function qg(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!$g(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!Bg(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!Hg(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function jg(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function Gg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Ug.isNegativeZero(e);
}
var oh = new Mg("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: qg,
  construct: jg,
  predicate: Gg,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), lh = et, Vg = Ne, Wg = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function zg(e) {
  return !(e === null || !Wg.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Yg(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var Xg = /^[-+]?[0-9]+e/;
function Kg(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (lh.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Xg.test(r) ? r.replace("e", ".e") : r;
}
function Jg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || lh.isNegativeZero(e));
}
var ch = new Vg("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: zg,
  construct: Yg,
  predicate: Jg,
  represent: Kg,
  defaultStyle: "lowercase"
}), uh = ih.extend({
  implicit: [
    ah,
    sh,
    oh,
    ch
  ]
}), fh = uh, Qg = Ne, hh = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), dh = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Zg(e) {
  return e === null ? !1 : hh.exec(e) !== null || dh.exec(e) !== null;
}
function e2(e) {
  var t, r, n, i, a, s, c, l = 0, f = null, o, d, u;
  if (t = hh.exec(e), t === null && (t = dh.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (a = +t[4], s = +t[5], c = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (o = +t[10], d = +(t[11] || 0), f = (o * 60 + d) * 6e4, t[9] === "-" && (f = -f)), u = new Date(Date.UTC(r, n, i, a, s, c, l)), f && u.setTime(u.getTime() - f), u;
}
function t2(e) {
  return e.toISOString();
}
var ph = new Qg("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Zg,
  construct: e2,
  instanceOf: Date,
  represent: t2
}), r2 = Ne;
function n2(e) {
  return e === "<<" || e === null;
}
var mh = new r2("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: n2
}), i2 = Ne, xo = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function a2(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, a = xo;
  for (r = 0; r < i; r++)
    if (t = a.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function s2(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, a = xo, s = 0, c = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (c.push(s >> 16 & 255), c.push(s >> 8 & 255), c.push(s & 255)), s = s << 6 | a.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (c.push(s >> 16 & 255), c.push(s >> 8 & 255), c.push(s & 255)) : r === 18 ? (c.push(s >> 10 & 255), c.push(s >> 2 & 255)) : r === 12 && c.push(s >> 4 & 255), new Uint8Array(c);
}
function o2(e) {
  var t = "", r = 0, n, i, a = e.length, s = xo;
  for (n = 0; n < a; n++)
    n % 3 === 0 && n && (t += s[r >> 18 & 63], t += s[r >> 12 & 63], t += s[r >> 6 & 63], t += s[r & 63]), r = (r << 8) + e[n];
  return i = a % 3, i === 0 ? (t += s[r >> 18 & 63], t += s[r >> 12 & 63], t += s[r >> 6 & 63], t += s[r & 63]) : i === 2 ? (t += s[r >> 10 & 63], t += s[r >> 4 & 63], t += s[r << 2 & 63], t += s[64]) : i === 1 && (t += s[r >> 2 & 63], t += s[r << 4 & 63], t += s[64], t += s[64]), t;
}
function l2(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var gh = new i2("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: a2,
  construct: s2,
  predicate: l2,
  represent: o2
}), c2 = Ne, u2 = Object.prototype.hasOwnProperty, f2 = Object.prototype.toString;
function h2(e) {
  if (e === null) return !0;
  var t = [], r, n, i, a, s, c = e;
  for (r = 0, n = c.length; r < n; r += 1) {
    if (i = c[r], s = !1, f2.call(i) !== "[object Object]") return !1;
    for (a in i)
      if (u2.call(i, a))
        if (!s) s = !0;
        else return !1;
    if (!s) return !1;
    if (t.indexOf(a) === -1) t.push(a);
    else return !1;
  }
  return !0;
}
function d2(e) {
  return e !== null ? e : [];
}
var vh = new c2("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: h2,
  construct: d2
}), p2 = Ne, m2 = Object.prototype.toString;
function g2(e) {
  if (e === null) return !0;
  var t, r, n, i, a, s = e;
  for (a = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
    if (n = s[t], m2.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    a[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function v2(e) {
  if (e === null) return [];
  var t, r, n, i, a, s = e;
  for (a = new Array(s.length), t = 0, r = s.length; t < r; t += 1)
    n = s[t], i = Object.keys(n), a[t] = [i[0], n[i[0]]];
  return a;
}
var yh = new p2("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: g2,
  construct: v2
}), y2 = Ne, _2 = Object.prototype.hasOwnProperty;
function E2(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (_2.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function w2(e) {
  return e !== null ? e : {};
}
var _h = new y2("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: E2,
  construct: w2
}), To = fh.extend({
  implicit: [
    ph,
    mh
  ],
  explicit: [
    gh,
    vh,
    yh,
    _h
  ]
}), Yt = et, Eh = Tn, b2 = _g, S2 = To, Ot = Object.prototype.hasOwnProperty, Ii = 1, wh = 2, bh = 3, Oi = 4, Ma = 1, C2 = 2, fc = 3, A2 = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, P2 = /[\x85\u2028\u2029]/, x2 = /[,\[\]\{\}]/, Sh = /^(?:!|!!|![a-z\-]+!)$/i, Ch = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function hc(e) {
  return Object.prototype.toString.call(e);
}
function ot(e) {
  return e === 10 || e === 13;
}
function Jt(e) {
  return e === 9 || e === 32;
}
function Fe(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function gr(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function T2(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function I2(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function O2(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function dc(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function R2(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function Ah(e, t, r) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: r
  }) : e[t] = r;
}
var Ph = new Array(256), xh = new Array(256);
for (var ur = 0; ur < 256; ur++)
  Ph[ur] = dc(ur) ? 1 : 0, xh[ur] = dc(ur);
function D2(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || S2, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Th(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = b2(r), new Eh(t, r);
}
function q(e, t) {
  throw Th(e, t);
}
function Ri(e, t) {
  e.onWarning && e.onWarning.call(null, Th(e, t));
}
var pc = {
  YAML: function(t, r, n) {
    var i, a, s;
    t.version !== null && q(t, "duplication of %YAML directive"), n.length !== 1 && q(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && q(t, "ill-formed argument of the YAML directive"), a = parseInt(i[1], 10), s = parseInt(i[2], 10), a !== 1 && q(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && Ri(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, a;
    n.length !== 2 && q(t, "TAG directive accepts exactly two arguments"), i = n[0], a = n[1], Sh.test(i) || q(t, "ill-formed tag handle (first argument) of the TAG directive"), Ot.call(t.tagMap, i) && q(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Ch.test(a) || q(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      a = decodeURIComponent(a);
    } catch {
      q(t, "tag prefix is malformed: " + a);
    }
    t.tagMap[i] = a;
  }
};
function At(e, t, r, n) {
  var i, a, s, c;
  if (t < r) {
    if (c = e.input.slice(t, r), n)
      for (i = 0, a = c.length; i < a; i += 1)
        s = c.charCodeAt(i), s === 9 || 32 <= s && s <= 1114111 || q(e, "expected valid JSON character");
    else A2.test(c) && q(e, "the stream contains non-printable characters");
    e.result += c;
  }
}
function mc(e, t, r, n) {
  var i, a, s, c;
  for (Yt.isObject(r) || q(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), s = 0, c = i.length; s < c; s += 1)
    a = i[s], Ot.call(t, a) || (Ah(t, a, r[a]), n[a] = !0);
}
function vr(e, t, r, n, i, a, s, c, l) {
  var f, o;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, o = i.length; f < o; f += 1)
      Array.isArray(i[f]) && q(e, "nested arrays are not supported inside keys"), typeof i == "object" && hc(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && hc(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(a))
      for (f = 0, o = a.length; f < o; f += 1)
        mc(e, t, a[f], r);
    else
      mc(e, t, a, r);
  else
    !e.json && !Ot.call(r, i) && Ot.call(t, i) && (e.line = s || e.line, e.lineStart = c || e.lineStart, e.position = l || e.position, q(e, "duplicated mapping key")), Ah(t, i, a), delete r[i];
  return t;
}
function Io(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : q(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function ue(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Jt(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (ot(i))
      for (Io(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && Ri(e, "deficient indentation"), n;
}
function Vi(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Fe(r)));
}
function Oo(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Yt.repeat(`
`, t - 1));
}
function N2(e, t, r) {
  var n, i, a, s, c, l, f, o, d = e.kind, u = e.result, h;
  if (h = e.input.charCodeAt(e.position), Fe(h) || gr(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (i = e.input.charCodeAt(e.position + 1), Fe(i) || r && gr(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", a = s = e.position, c = !1; h !== 0; ) {
    if (h === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Fe(i) || r && gr(i))
        break;
    } else if (h === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Fe(n))
        break;
    } else {
      if (e.position === e.lineStart && Vi(e) || r && gr(h))
        break;
      if (ot(h))
        if (l = e.line, f = e.lineStart, o = e.lineIndent, ue(e, !1, -1), e.lineIndent >= t) {
          c = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = s, e.line = l, e.lineStart = f, e.lineIndent = o;
          break;
        }
    }
    c && (At(e, a, s, !1), Oo(e, e.line - l), a = s = e.position, c = !1), Jt(h) || (s = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return At(e, a, s, !1), e.result ? !0 : (e.kind = d, e.result = u, !1);
}
function L2(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (At(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else ot(r) ? (At(e, n, i, !0), Oo(e, ue(e, !1, t)), n = i = e.position) : e.position === e.lineStart && Vi(e) ? q(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  q(e, "unexpected end of the stream within a single quoted scalar");
}
function k2(e, t) {
  var r, n, i, a, s, c;
  if (c = e.input.charCodeAt(e.position), c !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (c = e.input.charCodeAt(e.position)) !== 0; ) {
    if (c === 34)
      return At(e, r, e.position, !0), e.position++, !0;
    if (c === 92) {
      if (At(e, r, e.position, !0), c = e.input.charCodeAt(++e.position), ot(c))
        ue(e, !1, t);
      else if (c < 256 && Ph[c])
        e.result += xh[c], e.position++;
      else if ((s = I2(c)) > 0) {
        for (i = s, a = 0; i > 0; i--)
          c = e.input.charCodeAt(++e.position), (s = T2(c)) >= 0 ? a = (a << 4) + s : q(e, "expected hexadecimal character");
        e.result += R2(a), e.position++;
      } else
        q(e, "unknown escape sequence");
      r = n = e.position;
    } else ot(c) ? (At(e, r, n, !0), Oo(e, ue(e, !1, t)), r = n = e.position) : e.position === e.lineStart && Vi(e) ? q(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  q(e, "unexpected end of the stream within a double quoted scalar");
}
function F2(e, t) {
  var r = !0, n, i, a, s = e.tag, c, l = e.anchor, f, o, d, u, h, p = /* @__PURE__ */ Object.create(null), m, g, E, y;
  if (y = e.input.charCodeAt(e.position), y === 91)
    o = 93, h = !1, c = [];
  else if (y === 123)
    o = 125, h = !0, c = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = c), y = e.input.charCodeAt(++e.position); y !== 0; ) {
    if (ue(e, !0, t), y = e.input.charCodeAt(e.position), y === o)
      return e.position++, e.tag = s, e.anchor = l, e.kind = h ? "mapping" : "sequence", e.result = c, !0;
    r ? y === 44 && q(e, "expected the node content, but found ','") : q(e, "missed comma between flow collection entries"), g = m = E = null, d = u = !1, y === 63 && (f = e.input.charCodeAt(e.position + 1), Fe(f) && (d = u = !0, e.position++, ue(e, !0, t))), n = e.line, i = e.lineStart, a = e.position, Ir(e, t, Ii, !1, !0), g = e.tag, m = e.result, ue(e, !0, t), y = e.input.charCodeAt(e.position), (u || e.line === n) && y === 58 && (d = !0, y = e.input.charCodeAt(++e.position), ue(e, !0, t), Ir(e, t, Ii, !1, !0), E = e.result), h ? vr(e, c, p, g, m, E, n, i, a) : d ? c.push(vr(e, null, p, g, m, E, n, i, a)) : c.push(m), ue(e, !0, t), y = e.input.charCodeAt(e.position), y === 44 ? (r = !0, y = e.input.charCodeAt(++e.position)) : r = !1;
  }
  q(e, "unexpected end of the stream within a flow collection");
}
function U2(e, t) {
  var r, n, i = Ma, a = !1, s = !1, c = t, l = 0, f = !1, o, d;
  if (d = e.input.charCodeAt(e.position), d === 124)
    n = !1;
  else if (d === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; d !== 0; )
    if (d = e.input.charCodeAt(++e.position), d === 43 || d === 45)
      Ma === i ? i = d === 43 ? fc : C2 : q(e, "repeat of a chomping mode identifier");
    else if ((o = O2(d)) >= 0)
      o === 0 ? q(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? q(e, "repeat of an indentation width identifier") : (c = t + o - 1, s = !0);
    else
      break;
  if (Jt(d)) {
    do
      d = e.input.charCodeAt(++e.position);
    while (Jt(d));
    if (d === 35)
      do
        d = e.input.charCodeAt(++e.position);
      while (!ot(d) && d !== 0);
  }
  for (; d !== 0; ) {
    for (Io(e), e.lineIndent = 0, d = e.input.charCodeAt(e.position); (!s || e.lineIndent < c) && d === 32; )
      e.lineIndent++, d = e.input.charCodeAt(++e.position);
    if (!s && e.lineIndent > c && (c = e.lineIndent), ot(d)) {
      l++;
      continue;
    }
    if (e.lineIndent < c) {
      i === fc ? e.result += Yt.repeat(`
`, a ? 1 + l : l) : i === Ma && a && (e.result += `
`);
      break;
    }
    for (n ? Jt(d) ? (f = !0, e.result += Yt.repeat(`
`, a ? 1 + l : l)) : f ? (f = !1, e.result += Yt.repeat(`
`, l + 1)) : l === 0 ? a && (e.result += " ") : e.result += Yt.repeat(`
`, l) : e.result += Yt.repeat(`
`, a ? 1 + l : l), a = !0, s = !0, l = 0, r = e.position; !ot(d) && d !== 0; )
      d = e.input.charCodeAt(++e.position);
    At(e, r, e.position, !1);
  }
  return !0;
}
function gc(e, t) {
  var r, n = e.tag, i = e.anchor, a = [], s, c = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, q(e, "tab characters must not be used in indentation")), !(l !== 45 || (s = e.input.charCodeAt(e.position + 1), !Fe(s)))); ) {
    if (c = !0, e.position++, ue(e, !0, -1) && e.lineIndent <= t) {
      a.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Ir(e, t, bh, !1, !0), a.push(e.result), ue(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      q(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return c ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = a, !0) : !1;
}
function M2(e, t, r) {
  var n, i, a, s, c, l, f = e.tag, o = e.anchor, d = {}, u = /* @__PURE__ */ Object.create(null), h = null, p = null, m = null, g = !1, E = !1, y;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = d), y = e.input.charCodeAt(e.position); y !== 0; ) {
    if (!g && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, q(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), a = e.line, (y === 63 || y === 58) && Fe(n))
      y === 63 ? (g && (vr(e, d, u, h, p, null, s, c, l), h = p = m = null), E = !0, g = !0, i = !0) : g ? (g = !1, i = !0) : q(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, y = n;
    else {
      if (s = e.line, c = e.lineStart, l = e.position, !Ir(e, r, wh, !1, !0))
        break;
      if (e.line === a) {
        for (y = e.input.charCodeAt(e.position); Jt(y); )
          y = e.input.charCodeAt(++e.position);
        if (y === 58)
          y = e.input.charCodeAt(++e.position), Fe(y) || q(e, "a whitespace character is expected after the key-value separator within a block mapping"), g && (vr(e, d, u, h, p, null, s, c, l), h = p = m = null), E = !0, g = !1, i = !1, h = e.tag, p = e.result;
        else if (E)
          q(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = o, !0;
      } else if (E)
        q(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = o, !0;
    }
    if ((e.line === a || e.lineIndent > t) && (g && (s = e.line, c = e.lineStart, l = e.position), Ir(e, t, Oi, !0, i) && (g ? p = e.result : m = e.result), g || (vr(e, d, u, h, p, m, s, c, l), h = p = m = null), ue(e, !0, -1), y = e.input.charCodeAt(e.position)), (e.line === a || e.lineIndent > t) && y !== 0)
      q(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return g && vr(e, d, u, h, p, null, s, c, l), E && (e.tag = f, e.anchor = o, e.kind = "mapping", e.result = d), E;
}
function $2(e) {
  var t, r = !1, n = !1, i, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 33) return !1;
  if (e.tag !== null && q(e, "duplication of a tag property"), s = e.input.charCodeAt(++e.position), s === 60 ? (r = !0, s = e.input.charCodeAt(++e.position)) : s === 33 ? (n = !0, i = "!!", s = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      s = e.input.charCodeAt(++e.position);
    while (s !== 0 && s !== 62);
    e.position < e.length ? (a = e.input.slice(t, e.position), s = e.input.charCodeAt(++e.position)) : q(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !Fe(s); )
      s === 33 && (n ? q(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Sh.test(i) || q(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), s = e.input.charCodeAt(++e.position);
    a = e.input.slice(t, e.position), x2.test(a) && q(e, "tag suffix cannot contain flow indicator characters");
  }
  a && !Ch.test(a) && q(e, "tag name cannot contain such characters: " + a);
  try {
    a = decodeURIComponent(a);
  } catch {
    q(e, "tag name is malformed: " + a);
  }
  return r ? e.tag = a : Ot.call(e.tagMap, i) ? e.tag = e.tagMap[i] + a : i === "!" ? e.tag = "!" + a : i === "!!" ? e.tag = "tag:yaml.org,2002:" + a : q(e, 'undeclared tag handle "' + i + '"'), !0;
}
function B2(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && q(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Fe(r) && !gr(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && q(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function H2(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Fe(n) && !gr(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && q(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), Ot.call(e.anchorMap, r) || q(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], ue(e, !0, -1), !0;
}
function Ir(e, t, r, n, i) {
  var a, s, c, l = 1, f = !1, o = !1, d, u, h, p, m, g;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = s = c = Oi === r || bh === r, n && ue(e, !0, -1) && (f = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; $2(e) || B2(e); )
      ue(e, !0, -1) ? (f = !0, c = a, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : c = !1;
  if (c && (c = f || i), (l === 1 || Oi === r) && (Ii === r || wh === r ? m = t : m = t + 1, g = e.position - e.lineStart, l === 1 ? c && (gc(e, g) || M2(e, g, m)) || F2(e, m) ? o = !0 : (s && U2(e, m) || L2(e, m) || k2(e, m) ? o = !0 : H2(e) ? (o = !0, (e.tag !== null || e.anchor !== null) && q(e, "alias node should not have any properties")) : N2(e, m, Ii === r) && (o = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (o = c && gc(e, g))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && q(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), d = 0, u = e.implicitTypes.length; d < u; d += 1)
      if (p = e.implicitTypes[d], p.resolve(e.result)) {
        e.result = p.construct(e.result), e.tag = p.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Ot.call(e.typeMap[e.kind || "fallback"], e.tag))
      p = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (p = null, h = e.typeMap.multi[e.kind || "fallback"], d = 0, u = h.length; d < u; d += 1)
        if (e.tag.slice(0, h[d].tag.length) === h[d].tag) {
          p = h[d];
          break;
        }
    p || q(e, "unknown tag !<" + e.tag + ">"), e.result !== null && p.kind !== e.kind && q(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + p.kind + '", not "' + e.kind + '"'), p.resolve(e.result, e.tag) ? (e.result = p.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : q(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || o;
}
function q2(e) {
  var t = e.position, r, n, i, a = !1, s;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (s = e.input.charCodeAt(e.position)) !== 0 && (ue(e, !0, -1), s = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || s !== 37)); ) {
    for (a = !0, s = e.input.charCodeAt(++e.position), r = e.position; s !== 0 && !Fe(s); )
      s = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && q(e, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; Jt(s); )
        s = e.input.charCodeAt(++e.position);
      if (s === 35) {
        do
          s = e.input.charCodeAt(++e.position);
        while (s !== 0 && !ot(s));
        break;
      }
      if (ot(s)) break;
      for (r = e.position; s !== 0 && !Fe(s); )
        s = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    s !== 0 && Io(e), Ot.call(pc, n) ? pc[n](e, n, i) : Ri(e, 'unknown document directive "' + n + '"');
  }
  if (ue(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ue(e, !0, -1)) : a && q(e, "directives end mark is expected"), Ir(e, e.lineIndent - 1, Oi, !1, !0), ue(e, !0, -1), e.checkLineBreaks && P2.test(e.input.slice(t, e.position)) && Ri(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Vi(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, ue(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    q(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Ih(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new D2(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, q(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    q2(r);
  return r.documents;
}
function j2(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = Ih(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, a = n.length; i < a; i += 1)
    t(n[i]);
}
function G2(e, t) {
  var r = Ih(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new Eh("expected a single document in the stream, but found more");
  }
}
Po.loadAll = j2;
Po.load = G2;
var Oh = {}, Wi = et, In = Tn, V2 = To, Rh = Object.prototype.toString, Dh = Object.prototype.hasOwnProperty, Ro = 65279, W2 = 9, fn = 10, z2 = 13, Y2 = 32, X2 = 33, K2 = 34, As = 35, J2 = 37, Q2 = 38, Z2 = 39, ev = 42, Nh = 44, tv = 45, Di = 58, rv = 61, nv = 62, iv = 63, av = 64, Lh = 91, kh = 93, sv = 96, Fh = 123, ov = 124, Uh = 125, Ae = {};
Ae[0] = "\\0";
Ae[7] = "\\a";
Ae[8] = "\\b";
Ae[9] = "\\t";
Ae[10] = "\\n";
Ae[11] = "\\v";
Ae[12] = "\\f";
Ae[13] = "\\r";
Ae[27] = "\\e";
Ae[34] = '\\"';
Ae[92] = "\\\\";
Ae[133] = "\\N";
Ae[160] = "\\_";
Ae[8232] = "\\L";
Ae[8233] = "\\P";
var lv = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], cv = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function uv(e, t) {
  var r, n, i, a, s, c, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, a = n.length; i < a; i += 1)
    s = n[i], c = String(t[s]), s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)), l = e.compiledTypeMap.fallback[s], l && Dh.call(l.styleAliases, c) && (c = l.styleAliases[c]), r[s] = c;
  return r;
}
function fv(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new In("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + Wi.repeat("0", n - t.length) + t;
}
var hv = 1, hn = 2;
function dv(e) {
  this.schema = e.schema || V2, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Wi.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = uv(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? hn : hv, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function vc(e, t) {
  for (var r = Wi.repeat(" ", t), n = 0, i = -1, a = "", s, c = e.length; n < c; )
    i = e.indexOf(`
`, n), i === -1 ? (s = e.slice(n), n = c) : (s = e.slice(n, i + 1), n = i + 1), s.length && s !== `
` && (a += r), a += s;
  return a;
}
function Ps(e, t) {
  return `
` + Wi.repeat(" ", e.indent * t);
}
function pv(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Ni(e) {
  return e === Y2 || e === W2;
}
function dn(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Ro || 65536 <= e && e <= 1114111;
}
function yc(e) {
  return dn(e) && e !== Ro && e !== z2 && e !== fn;
}
function _c(e, t, r) {
  var n = yc(e), i = n && !Ni(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Nh && e !== Lh && e !== kh && e !== Fh && e !== Uh) && e !== As && !(t === Di && !i) || yc(t) && !Ni(t) && e === As || t === Di && i
  );
}
function mv(e) {
  return dn(e) && e !== Ro && !Ni(e) && e !== tv && e !== iv && e !== Di && e !== Nh && e !== Lh && e !== kh && e !== Fh && e !== Uh && e !== As && e !== Q2 && e !== ev && e !== X2 && e !== ov && e !== rv && e !== nv && e !== Z2 && e !== K2 && e !== J2 && e !== av && e !== sv;
}
function gv(e) {
  return !Ni(e) && e !== Di;
}
function Qr(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function Mh(e) {
  var t = /^\n* /;
  return t.test(e);
}
var $h = 1, xs = 2, Bh = 3, Hh = 4, pr = 5;
function vv(e, t, r, n, i, a, s, c) {
  var l, f = 0, o = null, d = !1, u = !1, h = n !== -1, p = -1, m = mv(Qr(e, 0)) && gv(Qr(e, e.length - 1));
  if (t || s)
    for (l = 0; l < e.length; f >= 65536 ? l += 2 : l++) {
      if (f = Qr(e, l), !dn(f))
        return pr;
      m = m && _c(f, o, c), o = f;
    }
  else {
    for (l = 0; l < e.length; f >= 65536 ? l += 2 : l++) {
      if (f = Qr(e, l), f === fn)
        d = !0, h && (u = u || // Foldable line = too long, and not more-indented.
        l - p - 1 > n && e[p + 1] !== " ", p = l);
      else if (!dn(f))
        return pr;
      m = m && _c(f, o, c), o = f;
    }
    u = u || h && l - p - 1 > n && e[p + 1] !== " ";
  }
  return !d && !u ? m && !s && !i(e) ? $h : a === hn ? pr : xs : r > 9 && Mh(e) ? pr : s ? a === hn ? pr : xs : u ? Hh : Bh;
}
function yv(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === hn ? '""' : "''";
    if (!e.noCompatMode && (lv.indexOf(t) !== -1 || cv.test(t)))
      return e.quotingType === hn ? '"' + t + '"' : "'" + t + "'";
    var a = e.indent * Math.max(1, r), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a), c = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(f) {
      return pv(e, f);
    }
    switch (vv(
      t,
      c,
      e.indent,
      s,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case $h:
        return t;
      case xs:
        return "'" + t.replace(/'/g, "''") + "'";
      case Bh:
        return "|" + Ec(t, e.indent) + wc(vc(t, a));
      case Hh:
        return ">" + Ec(t, e.indent) + wc(vc(_v(t, s), a));
      case pr:
        return '"' + Ev(t) + '"';
      default:
        throw new In("impossible error: invalid scalar style");
    }
  }();
}
function Ec(e, t) {
  var r = Mh(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), a = i ? "+" : n ? "" : "-";
  return r + a + `
`;
}
function wc(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function _v(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, bc(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", a, s; s = r.exec(e); ) {
    var c = s[1], l = s[2];
    a = l[0] === " ", n += c + (!i && !a && l !== "" ? `
` : "") + bc(l, t), i = a;
  }
  return n;
}
function bc(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, a, s = 0, c = 0, l = ""; n = r.exec(e); )
    c = n.index, c - i > t && (a = s > i ? s : c, l += `
` + e.slice(i, a), i = a + 1), s = c;
  return l += `
`, e.length - i > t && s > i ? l += e.slice(i, s) + `
` + e.slice(s + 1) : l += e.slice(i), l.slice(1);
}
function Ev(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Qr(e, i), n = Ae[r], !n && dn(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || fv(r);
  return t;
}
function wv(e, t, r) {
  var n = "", i = e.tag, a, s, c;
  for (a = 0, s = r.length; a < s; a += 1)
    c = r[a], e.replacer && (c = e.replacer.call(r, String(a), c)), (mt(e, t, c, !1, !1) || typeof c > "u" && mt(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function Sc(e, t, r, n) {
  var i = "", a = e.tag, s, c, l;
  for (s = 0, c = r.length; s < c; s += 1)
    l = r[s], e.replacer && (l = e.replacer.call(r, String(s), l)), (mt(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && mt(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Ps(e, t)), e.dump && fn === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = a, e.dump = i || "[]";
}
function bv(e, t, r) {
  var n = "", i = e.tag, a = Object.keys(r), s, c, l, f, o;
  for (s = 0, c = a.length; s < c; s += 1)
    o = "", n !== "" && (o += ", "), e.condenseFlow && (o += '"'), l = a[s], f = r[l], e.replacer && (f = e.replacer.call(r, l, f)), mt(e, t, l, !1, !1) && (e.dump.length > 1024 && (o += "? "), o += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), mt(e, t, f, !1, !1) && (o += e.dump, n += o));
  e.tag = i, e.dump = "{" + n + "}";
}
function Sv(e, t, r, n) {
  var i = "", a = e.tag, s = Object.keys(r), c, l, f, o, d, u;
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new In("sortKeys must be a boolean or a function");
  for (c = 0, l = s.length; c < l; c += 1)
    u = "", (!n || i !== "") && (u += Ps(e, t)), f = s[c], o = r[f], e.replacer && (o = e.replacer.call(r, f, o)), mt(e, t + 1, f, !0, !0, !0) && (d = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, d && (e.dump && fn === e.dump.charCodeAt(0) ? u += "?" : u += "? "), u += e.dump, d && (u += Ps(e, t)), mt(e, t + 1, o, !0, d) && (e.dump && fn === e.dump.charCodeAt(0) ? u += ":" : u += ": ", u += e.dump, i += u));
  e.tag = a, e.dump = i || "{}";
}
function Cc(e, t, r) {
  var n, i, a, s, c, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, a = 0, s = i.length; a < s; a += 1)
    if (c = i[a], (c.instanceOf || c.predicate) && (!c.instanceOf || typeof t == "object" && t instanceof c.instanceOf) && (!c.predicate || c.predicate(t))) {
      if (r ? c.multi && c.representName ? e.tag = c.representName(t) : e.tag = c.tag : e.tag = "?", c.represent) {
        if (l = e.styleMap[c.tag] || c.defaultStyle, Rh.call(c.represent) === "[object Function]")
          n = c.represent(t, l);
        else if (Dh.call(c.represent, l))
          n = c.represent[l](t, l);
        else
          throw new In("!<" + c.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function mt(e, t, r, n, i, a, s) {
  e.tag = null, e.dump = r, Cc(e, r, !1) || Cc(e, r, !0);
  var c = Rh.call(e.dump), l = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var o = c === "[object Object]" || c === "[object Array]", d, u;
  if (o && (d = e.duplicates.indexOf(r), u = d !== -1), (e.tag !== null && e.tag !== "?" || u || e.indent !== 2 && t > 0) && (i = !1), u && e.usedDuplicates[d])
    e.dump = "*ref_" + d;
  else {
    if (o && u && !e.usedDuplicates[d] && (e.usedDuplicates[d] = !0), c === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (Sv(e, t, e.dump, i), u && (e.dump = "&ref_" + d + e.dump)) : (bv(e, t, e.dump), u && (e.dump = "&ref_" + d + " " + e.dump));
    else if (c === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? Sc(e, t - 1, e.dump, i) : Sc(e, t, e.dump, i), u && (e.dump = "&ref_" + d + e.dump)) : (wv(e, t, e.dump), u && (e.dump = "&ref_" + d + " " + e.dump));
    else if (c === "[object String]")
      e.tag !== "?" && yv(e, e.dump, t, a, l);
    else {
      if (c === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new In("unacceptable kind of an object to dump " + c);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function Cv(e, t) {
  var r = [], n = [], i, a;
  for (Ts(e, r, n), i = 0, a = n.length; i < a; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(a);
}
function Ts(e, t, r) {
  var n, i, a;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, a = e.length; i < a; i += 1)
        Ts(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, a = n.length; i < a; i += 1)
        Ts(e[n[i]], t, r);
}
function Av(e, t) {
  t = t || {};
  var r = new dv(t);
  r.noRefs || Cv(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), mt(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
Oh.dump = Av;
var qh = Po, Pv = Oh;
function Do(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
we.Type = Ne;
we.Schema = eh;
we.FAILSAFE_SCHEMA = ih;
we.JSON_SCHEMA = uh;
we.CORE_SCHEMA = fh;
we.DEFAULT_SCHEMA = To;
we.load = qh.load;
we.loadAll = qh.loadAll;
we.dump = Pv.dump;
we.YAMLException = Tn;
we.types = {
  binary: gh,
  float: ch,
  map: nh,
  null: ah,
  pairs: yh,
  set: _h,
  timestamp: ph,
  bool: sh,
  int: oh,
  merge: mh,
  omap: vh,
  seq: rh,
  str: th
};
we.safeLoad = Do("safeLoad", "load");
we.safeLoadAll = Do("safeLoadAll", "loadAll");
we.safeDump = Do("safeDump", "dump");
var zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.Lazy = void 0;
class xv {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
zi.Lazy = xv;
var Is = { exports: {} };
const Tv = "2.0.0", jh = 256, Iv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Ov = 16, Rv = jh - 6, Dv = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Yi = {
  MAX_LENGTH: jh,
  MAX_SAFE_COMPONENT_LENGTH: Ov,
  MAX_SAFE_BUILD_LENGTH: Rv,
  MAX_SAFE_INTEGER: Iv,
  RELEASE_TYPES: Dv,
  SEMVER_SPEC_VERSION: Tv,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Nv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Xi = Nv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Yi, a = Xi;
  t = e.exports = {};
  const s = t.re = [], c = t.safeRe = [], l = t.src = [], f = t.safeSrc = [], o = t.t = {};
  let d = 0;
  const u = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [u, n]
  ], p = (g) => {
    for (const [E, y] of h)
      g = g.split(`${E}*`).join(`${E}{0,${y}}`).split(`${E}+`).join(`${E}{1,${y}}`);
    return g;
  }, m = (g, E, y) => {
    const S = p(E), _ = d++;
    a(g, _, E), o[g] = _, l[_] = E, f[_] = S, s[_] = new RegExp(E, y ? "g" : void 0), c[_] = new RegExp(S, y ? "g" : void 0);
  };
  m("NUMERICIDENTIFIER", "0|[1-9]\\d*"), m("NUMERICIDENTIFIERLOOSE", "\\d+"), m("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${u}*`), m("MAINVERSION", `(${l[o.NUMERICIDENTIFIER]})\\.(${l[o.NUMERICIDENTIFIER]})\\.(${l[o.NUMERICIDENTIFIER]})`), m("MAINVERSIONLOOSE", `(${l[o.NUMERICIDENTIFIERLOOSE]})\\.(${l[o.NUMERICIDENTIFIERLOOSE]})\\.(${l[o.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASEIDENTIFIER", `(?:${l[o.NONNUMERICIDENTIFIER]}|${l[o.NUMERICIDENTIFIER]})`), m("PRERELEASEIDENTIFIERLOOSE", `(?:${l[o.NONNUMERICIDENTIFIER]}|${l[o.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASE", `(?:-(${l[o.PRERELEASEIDENTIFIER]}(?:\\.${l[o.PRERELEASEIDENTIFIER]})*))`), m("PRERELEASELOOSE", `(?:-?(${l[o.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[o.PRERELEASEIDENTIFIERLOOSE]})*))`), m("BUILDIDENTIFIER", `${u}+`), m("BUILD", `(?:\\+(${l[o.BUILDIDENTIFIER]}(?:\\.${l[o.BUILDIDENTIFIER]})*))`), m("FULLPLAIN", `v?${l[o.MAINVERSION]}${l[o.PRERELEASE]}?${l[o.BUILD]}?`), m("FULL", `^${l[o.FULLPLAIN]}$`), m("LOOSEPLAIN", `[v=\\s]*${l[o.MAINVERSIONLOOSE]}${l[o.PRERELEASELOOSE]}?${l[o.BUILD]}?`), m("LOOSE", `^${l[o.LOOSEPLAIN]}$`), m("GTLT", "((?:<|>)?=?)"), m("XRANGEIDENTIFIERLOOSE", `${l[o.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), m("XRANGEIDENTIFIER", `${l[o.NUMERICIDENTIFIER]}|x|X|\\*`), m("XRANGEPLAIN", `[v=\\s]*(${l[o.XRANGEIDENTIFIER]})(?:\\.(${l[o.XRANGEIDENTIFIER]})(?:\\.(${l[o.XRANGEIDENTIFIER]})(?:${l[o.PRERELEASE]})?${l[o.BUILD]}?)?)?`), m("XRANGEPLAINLOOSE", `[v=\\s]*(${l[o.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[o.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[o.XRANGEIDENTIFIERLOOSE]})(?:${l[o.PRERELEASELOOSE]})?${l[o.BUILD]}?)?)?`), m("XRANGE", `^${l[o.GTLT]}\\s*${l[o.XRANGEPLAIN]}$`), m("XRANGELOOSE", `^${l[o.GTLT]}\\s*${l[o.XRANGEPLAINLOOSE]}$`), m("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), m("COERCE", `${l[o.COERCEPLAIN]}(?:$|[^\\d])`), m("COERCEFULL", l[o.COERCEPLAIN] + `(?:${l[o.PRERELEASE]})?(?:${l[o.BUILD]})?(?:$|[^\\d])`), m("COERCERTL", l[o.COERCE], !0), m("COERCERTLFULL", l[o.COERCEFULL], !0), m("LONETILDE", "(?:~>?)"), m("TILDETRIM", `(\\s*)${l[o.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", m("TILDE", `^${l[o.LONETILDE]}${l[o.XRANGEPLAIN]}$`), m("TILDELOOSE", `^${l[o.LONETILDE]}${l[o.XRANGEPLAINLOOSE]}$`), m("LONECARET", "(?:\\^)"), m("CARETTRIM", `(\\s*)${l[o.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", m("CARET", `^${l[o.LONECARET]}${l[o.XRANGEPLAIN]}$`), m("CARETLOOSE", `^${l[o.LONECARET]}${l[o.XRANGEPLAINLOOSE]}$`), m("COMPARATORLOOSE", `^${l[o.GTLT]}\\s*(${l[o.LOOSEPLAIN]})$|^$`), m("COMPARATOR", `^${l[o.GTLT]}\\s*(${l[o.FULLPLAIN]})$|^$`), m("COMPARATORTRIM", `(\\s*)${l[o.GTLT]}\\s*(${l[o.LOOSEPLAIN]}|${l[o.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", m("HYPHENRANGE", `^\\s*(${l[o.XRANGEPLAIN]})\\s+-\\s+(${l[o.XRANGEPLAIN]})\\s*$`), m("HYPHENRANGELOOSE", `^\\s*(${l[o.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[o.XRANGEPLAINLOOSE]})\\s*$`), m("STAR", "(<|>)?=?\\s*\\*"), m("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), m("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Is, Is.exports);
var On = Is.exports;
const Lv = Object.freeze({ loose: !0 }), kv = Object.freeze({}), Fv = (e) => e ? typeof e != "object" ? Lv : e : kv;
var No = Fv;
const Ac = /^[0-9]+$/, Gh = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Ac.test(e), n = Ac.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Uv = (e, t) => Gh(t, e);
var Vh = {
  compareIdentifiers: Gh,
  rcompareIdentifiers: Uv
};
const ri = Xi, { MAX_LENGTH: Pc, MAX_SAFE_INTEGER: ni } = Yi, { safeRe: ii, t: ai } = On, Mv = No, { compareIdentifiers: $a } = Vh;
let $v = class st {
  constructor(t, r) {
    if (r = Mv(r), t instanceof st) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Pc)
      throw new TypeError(
        `version is longer than ${Pc} characters`
      );
    ri("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? ii[ai.LOOSE] : ii[ai.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > ni || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > ni || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > ni || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const a = +i;
        if (a >= 0 && a < ni)
          return a;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (ri("SemVer.compare", this.version, this.options, t), !(t instanceof st)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new st(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof st || (t = new st(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof st || (t = new st(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (ri("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return $a(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof st || (t = new st(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (ri("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return $a(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? ii[ai.PRERELEASELOOSE] : ii[ai.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let a = [r, i];
          n === !1 && (a = [r]), $a(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Le = $v;
const xc = Le, Bv = (e, t, r = !1) => {
  if (e instanceof xc)
    return e;
  try {
    return new xc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Dr = Bv;
const Hv = Dr, qv = (e, t) => {
  const r = Hv(e, t);
  return r ? r.version : null;
};
var jv = qv;
const Gv = Dr, Vv = (e, t) => {
  const r = Gv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Wv = Vv;
const Tc = Le, zv = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Tc(
      e instanceof Tc ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var Yv = zv;
const Ic = Dr, Xv = (e, t) => {
  const r = Ic(e, null, !0), n = Ic(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const a = i > 0, s = a ? r : n, c = a ? n : r, l = !!s.prerelease.length;
  if (!!c.prerelease.length && !l) {
    if (!c.patch && !c.minor)
      return "major";
    if (c.compareMain(s) === 0)
      return c.minor && !c.patch ? "minor" : "patch";
  }
  const o = l ? "pre" : "";
  return r.major !== n.major ? o + "major" : r.minor !== n.minor ? o + "minor" : r.patch !== n.patch ? o + "patch" : "prerelease";
};
var Kv = Xv;
const Jv = Le, Qv = (e, t) => new Jv(e, t).major;
var Zv = Qv;
const ey = Le, ty = (e, t) => new ey(e, t).minor;
var ry = ty;
const ny = Le, iy = (e, t) => new ny(e, t).patch;
var ay = iy;
const sy = Dr, oy = (e, t) => {
  const r = sy(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var ly = oy;
const Oc = Le, cy = (e, t, r) => new Oc(e, r).compare(new Oc(t, r));
var tt = cy;
const uy = tt, fy = (e, t, r) => uy(t, e, r);
var hy = fy;
const dy = tt, py = (e, t) => dy(e, t, !0);
var my = py;
const Rc = Le, gy = (e, t, r) => {
  const n = new Rc(e, r), i = new Rc(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var Lo = gy;
const vy = Lo, yy = (e, t) => e.sort((r, n) => vy(r, n, t));
var _y = yy;
const Ey = Lo, wy = (e, t) => e.sort((r, n) => Ey(n, r, t));
var by = wy;
const Sy = tt, Cy = (e, t, r) => Sy(e, t, r) > 0;
var Ki = Cy;
const Ay = tt, Py = (e, t, r) => Ay(e, t, r) < 0;
var ko = Py;
const xy = tt, Ty = (e, t, r) => xy(e, t, r) === 0;
var Wh = Ty;
const Iy = tt, Oy = (e, t, r) => Iy(e, t, r) !== 0;
var zh = Oy;
const Ry = tt, Dy = (e, t, r) => Ry(e, t, r) >= 0;
var Fo = Dy;
const Ny = tt, Ly = (e, t, r) => Ny(e, t, r) <= 0;
var Uo = Ly;
const ky = Wh, Fy = zh, Uy = Ki, My = Fo, $y = ko, By = Uo, Hy = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return ky(e, r, n);
    case "!=":
      return Fy(e, r, n);
    case ">":
      return Uy(e, r, n);
    case ">=":
      return My(e, r, n);
    case "<":
      return $y(e, r, n);
    case "<=":
      return By(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Yh = Hy;
const qy = Le, jy = Dr, { safeRe: si, t: oi } = On, Gy = (e, t) => {
  if (e instanceof qy)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? si[oi.COERCEFULL] : si[oi.COERCE]);
  else {
    const l = t.includePrerelease ? si[oi.COERCERTLFULL] : si[oi.COERCERTL];
    let f;
    for (; (f = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), l.lastIndex = f.index + f[1].length + f[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", a = r[4] || "0", s = t.includePrerelease && r[5] ? `-${r[5]}` : "", c = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return jy(`${n}.${i}.${a}${s}${c}`, t);
};
var Vy = Gy;
class Wy {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var zy = Wy, Ba, Dc;
function rt() {
  if (Dc) return Ba;
  Dc = 1;
  const e = /\s+/g;
  class t {
    constructor(D, U) {
      if (U = i(U), D instanceof t)
        return D.loose === !!U.loose && D.includePrerelease === !!U.includePrerelease ? D : new t(D.raw, U);
      if (D instanceof a)
        return this.raw = D.value, this.set = [[D]], this.formatted = void 0, this;
      if (this.options = U, this.loose = !!U.loose, this.includePrerelease = !!U.includePrerelease, this.raw = D.trim().replace(e, " "), this.set = this.raw.split("||").map((R) => this.parseRange(R.trim())).filter((R) => R.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const R = this.set[0];
        if (this.set = this.set.filter((M) => !m(M[0])), this.set.length === 0)
          this.set = [R];
        else if (this.set.length > 1) {
          for (const M of this.set)
            if (M.length === 1 && g(M[0])) {
              this.set = [M];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let D = 0; D < this.set.length; D++) {
          D > 0 && (this.formatted += "||");
          const U = this.set[D];
          for (let R = 0; R < U.length; R++)
            R > 0 && (this.formatted += " "), this.formatted += U[R].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(D) {
      const R = ((this.options.includePrerelease && h) | (this.options.loose && p)) + ":" + D, M = n.get(R);
      if (M)
        return M;
      const k = this.options.loose, W = k ? l[f.HYPHENRANGELOOSE] : l[f.HYPHENRANGE];
      D = D.replace(W, G(this.options.includePrerelease)), s("hyphen replace", D), D = D.replace(l[f.COMPARATORTRIM], o), s("comparator trim", D), D = D.replace(l[f.TILDETRIM], d), s("tilde trim", D), D = D.replace(l[f.CARETTRIM], u), s("caret trim", D);
      let X = D.split(" ").map((V) => y(V, this.options)).join(" ").split(/\s+/).map((V) => H(V, this.options));
      k && (X = X.filter((V) => (s("loose invalid filter", V, this.options), !!V.match(l[f.COMPARATORLOOSE])))), s("range list", X);
      const z = /* @__PURE__ */ new Map(), Z = X.map((V) => new a(V, this.options));
      for (const V of Z) {
        if (m(V))
          return [V];
        z.set(V.value, V);
      }
      z.size > 1 && z.has("") && z.delete("");
      const pe = [...z.values()];
      return n.set(R, pe), pe;
    }
    intersects(D, U) {
      if (!(D instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((R) => E(R, U) && D.set.some((M) => E(M, U) && R.every((k) => M.every((W) => k.intersects(W, U)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(D) {
      if (!D)
        return !1;
      if (typeof D == "string")
        try {
          D = new c(D, this.options);
        } catch {
          return !1;
        }
      for (let U = 0; U < this.set.length; U++)
        if (K(this.set[U], D, this.options))
          return !0;
      return !1;
    }
  }
  Ba = t;
  const r = zy, n = new r(), i = No, a = Ji(), s = Xi, c = Le, {
    safeRe: l,
    t: f,
    comparatorTrimReplace: o,
    tildeTrimReplace: d,
    caretTrimReplace: u
  } = On, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: p } = Yi, m = (L) => L.value === "<0.0.0-0", g = (L) => L.value === "", E = (L, D) => {
    let U = !0;
    const R = L.slice();
    let M = R.pop();
    for (; U && R.length; )
      U = R.every((k) => M.intersects(k, D)), M = R.pop();
    return U;
  }, y = (L, D) => (L = L.replace(l[f.BUILD], ""), s("comp", L, D), L = I(L, D), s("caret", L), L = _(L, D), s("tildes", L), L = $(L, D), s("xrange", L), L = F(L, D), s("stars", L), L), S = (L) => !L || L.toLowerCase() === "x" || L === "*", _ = (L, D) => L.trim().split(/\s+/).map((U) => A(U, D)).join(" "), A = (L, D) => {
    const U = D.loose ? l[f.TILDELOOSE] : l[f.TILDE];
    return L.replace(U, (R, M, k, W, X) => {
      s("tilde", L, R, M, k, W, X);
      let z;
      return S(M) ? z = "" : S(k) ? z = `>=${M}.0.0 <${+M + 1}.0.0-0` : S(W) ? z = `>=${M}.${k}.0 <${M}.${+k + 1}.0-0` : X ? (s("replaceTilde pr", X), z = `>=${M}.${k}.${W}-${X} <${M}.${+k + 1}.0-0`) : z = `>=${M}.${k}.${W} <${M}.${+k + 1}.0-0`, s("tilde return", z), z;
    });
  }, I = (L, D) => L.trim().split(/\s+/).map((U) => T(U, D)).join(" "), T = (L, D) => {
    s("caret", L, D);
    const U = D.loose ? l[f.CARETLOOSE] : l[f.CARET], R = D.includePrerelease ? "-0" : "";
    return L.replace(U, (M, k, W, X, z) => {
      s("caret", L, M, k, W, X, z);
      let Z;
      return S(k) ? Z = "" : S(W) ? Z = `>=${k}.0.0${R} <${+k + 1}.0.0-0` : S(X) ? k === "0" ? Z = `>=${k}.${W}.0${R} <${k}.${+W + 1}.0-0` : Z = `>=${k}.${W}.0${R} <${+k + 1}.0.0-0` : z ? (s("replaceCaret pr", z), k === "0" ? W === "0" ? Z = `>=${k}.${W}.${X}-${z} <${k}.${W}.${+X + 1}-0` : Z = `>=${k}.${W}.${X}-${z} <${k}.${+W + 1}.0-0` : Z = `>=${k}.${W}.${X}-${z} <${+k + 1}.0.0-0`) : (s("no pr"), k === "0" ? W === "0" ? Z = `>=${k}.${W}.${X}${R} <${k}.${W}.${+X + 1}-0` : Z = `>=${k}.${W}.${X}${R} <${k}.${+W + 1}.0-0` : Z = `>=${k}.${W}.${X} <${+k + 1}.0.0-0`), s("caret return", Z), Z;
    });
  }, $ = (L, D) => (s("replaceXRanges", L, D), L.split(/\s+/).map((U) => C(U, D)).join(" ")), C = (L, D) => {
    L = L.trim();
    const U = D.loose ? l[f.XRANGELOOSE] : l[f.XRANGE];
    return L.replace(U, (R, M, k, W, X, z) => {
      s("xRange", L, R, M, k, W, X, z);
      const Z = S(k), pe = Z || S(W), V = pe || S(X), it = V;
      return M === "=" && it && (M = ""), z = D.includePrerelease ? "-0" : "", Z ? M === ">" || M === "<" ? R = "<0.0.0-0" : R = "*" : M && it ? (pe && (W = 0), X = 0, M === ">" ? (M = ">=", pe ? (k = +k + 1, W = 0, X = 0) : (W = +W + 1, X = 0)) : M === "<=" && (M = "<", pe ? k = +k + 1 : W = +W + 1), M === "<" && (z = "-0"), R = `${M + k}.${W}.${X}${z}`) : pe ? R = `>=${k}.0.0${z} <${+k + 1}.0.0-0` : V && (R = `>=${k}.${W}.0${z} <${k}.${+W + 1}.0-0`), s("xRange return", R), R;
    });
  }, F = (L, D) => (s("replaceStars", L, D), L.trim().replace(l[f.STAR], "")), H = (L, D) => (s("replaceGTE0", L, D), L.trim().replace(l[D.includePrerelease ? f.GTE0PRE : f.GTE0], "")), G = (L) => (D, U, R, M, k, W, X, z, Z, pe, V, it) => (S(R) ? U = "" : S(M) ? U = `>=${R}.0.0${L ? "-0" : ""}` : S(k) ? U = `>=${R}.${M}.0${L ? "-0" : ""}` : W ? U = `>=${U}` : U = `>=${U}${L ? "-0" : ""}`, S(Z) ? z = "" : S(pe) ? z = `<${+Z + 1}.0.0-0` : S(V) ? z = `<${Z}.${+pe + 1}.0-0` : it ? z = `<=${Z}.${pe}.${V}-${it}` : L ? z = `<${Z}.${pe}.${+V + 1}-0` : z = `<=${z}`, `${U} ${z}`.trim()), K = (L, D, U) => {
    for (let R = 0; R < L.length; R++)
      if (!L[R].test(D))
        return !1;
    if (D.prerelease.length && !U.includePrerelease) {
      for (let R = 0; R < L.length; R++)
        if (s(L[R].semver), L[R].semver !== a.ANY && L[R].semver.prerelease.length > 0) {
          const M = L[R].semver;
          if (M.major === D.major && M.minor === D.minor && M.patch === D.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ba;
}
var Ha, Nc;
function Ji() {
  if (Nc) return Ha;
  Nc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(o, d) {
      if (d = r(d), o instanceof t) {
        if (o.loose === !!d.loose)
          return o;
        o = o.value;
      }
      o = o.trim().split(/\s+/).join(" "), s("comparator", o, d), this.options = d, this.loose = !!d.loose, this.parse(o), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
    }
    parse(o) {
      const d = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], u = o.match(d);
      if (!u)
        throw new TypeError(`Invalid comparator: ${o}`);
      this.operator = u[1] !== void 0 ? u[1] : "", this.operator === "=" && (this.operator = ""), u[2] ? this.semver = new c(u[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(o) {
      if (s("Comparator.test", o, this.options.loose), this.semver === e || o === e)
        return !0;
      if (typeof o == "string")
        try {
          o = new c(o, this.options);
        } catch {
          return !1;
        }
      return a(o, this.operator, this.semver, this.options);
    }
    intersects(o, d) {
      if (!(o instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(o.value, d).test(this.value) : o.operator === "" ? o.value === "" ? !0 : new l(this.value, d).test(o.semver) : (d = r(d), d.includePrerelease && (this.value === "<0.0.0-0" || o.value === "<0.0.0-0") || !d.includePrerelease && (this.value.startsWith("<0.0.0") || o.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && o.operator.startsWith(">") || this.operator.startsWith("<") && o.operator.startsWith("<") || this.semver.version === o.semver.version && this.operator.includes("=") && o.operator.includes("=") || a(this.semver, "<", o.semver, d) && this.operator.startsWith(">") && o.operator.startsWith("<") || a(this.semver, ">", o.semver, d) && this.operator.startsWith("<") && o.operator.startsWith(">")));
    }
  }
  Ha = t;
  const r = No, { safeRe: n, t: i } = On, a = Yh, s = Xi, c = Le, l = rt();
  return Ha;
}
const Yy = rt(), Xy = (e, t, r) => {
  try {
    t = new Yy(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Qi = Xy;
const Ky = rt(), Jy = (e, t) => new Ky(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Qy = Jy;
const Zy = Le, e8 = rt(), t8 = (e, t, r) => {
  let n = null, i = null, a = null;
  try {
    a = new e8(t, r);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    a.test(s) && (!n || i.compare(s) === -1) && (n = s, i = new Zy(n, r));
  }), n;
};
var r8 = t8;
const n8 = Le, i8 = rt(), a8 = (e, t, r) => {
  let n = null, i = null, a = null;
  try {
    a = new i8(t, r);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    a.test(s) && (!n || i.compare(s) === 1) && (n = s, i = new n8(n, r));
  }), n;
};
var s8 = a8;
const qa = Le, o8 = rt(), Lc = Ki, l8 = (e, t) => {
  e = new o8(e, t);
  let r = new qa("0.0.0");
  if (e.test(r) || (r = new qa("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let a = null;
    i.forEach((s) => {
      const c = new qa(s.semver.version);
      switch (s.operator) {
        case ">":
          c.prerelease.length === 0 ? c.patch++ : c.prerelease.push(0), c.raw = c.format();
        case "":
        case ">=":
          (!a || Lc(c, a)) && (a = c);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), a && (!r || Lc(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var c8 = l8;
const u8 = rt(), f8 = (e, t) => {
  try {
    return new u8(e, t).range || "*";
  } catch {
    return null;
  }
};
var h8 = f8;
const d8 = Le, Xh = Ji(), { ANY: p8 } = Xh, m8 = rt(), g8 = Qi, kc = Ki, Fc = ko, v8 = Uo, y8 = Fo, _8 = (e, t, r, n) => {
  e = new d8(e, n), t = new m8(t, n);
  let i, a, s, c, l;
  switch (r) {
    case ">":
      i = kc, a = v8, s = Fc, c = ">", l = ">=";
      break;
    case "<":
      i = Fc, a = y8, s = kc, c = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (g8(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const o = t.set[f];
    let d = null, u = null;
    if (o.forEach((h) => {
      h.semver === p8 && (h = new Xh(">=0.0.0")), d = d || h, u = u || h, i(h.semver, d.semver, n) ? d = h : s(h.semver, u.semver, n) && (u = h);
    }), d.operator === c || d.operator === l || (!u.operator || u.operator === c) && a(e, u.semver))
      return !1;
    if (u.operator === l && s(e, u.semver))
      return !1;
  }
  return !0;
};
var Mo = _8;
const E8 = Mo, w8 = (e, t, r) => E8(e, t, ">", r);
var b8 = w8;
const S8 = Mo, C8 = (e, t, r) => S8(e, t, "<", r);
var A8 = C8;
const Uc = rt(), P8 = (e, t, r) => (e = new Uc(e, r), t = new Uc(t, r), e.intersects(t, r));
var x8 = P8;
const T8 = Qi, I8 = tt;
var O8 = (e, t, r) => {
  const n = [];
  let i = null, a = null;
  const s = e.sort((o, d) => I8(o, d, r));
  for (const o of s)
    T8(o, t, r) ? (a = o, i || (i = o)) : (a && n.push([i, a]), a = null, i = null);
  i && n.push([i, null]);
  const c = [];
  for (const [o, d] of n)
    o === d ? c.push(o) : !d && o === s[0] ? c.push("*") : d ? o === s[0] ? c.push(`<=${d}`) : c.push(`${o} - ${d}`) : c.push(`>=${o}`);
  const l = c.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < f.length ? l : t;
};
const Mc = rt(), $o = Ji(), { ANY: ja } = $o, Gr = Qi, Bo = tt, R8 = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Mc(e, r), t = new Mc(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const a of t.set) {
      const s = N8(i, a, r);
      if (n = n || s !== null, s)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, D8 = [new $o(">=0.0.0-0")], $c = [new $o(">=0.0.0")], N8 = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ja) {
    if (t.length === 1 && t[0].semver === ja)
      return !0;
    r.includePrerelease ? e = D8 : e = $c;
  }
  if (t.length === 1 && t[0].semver === ja) {
    if (r.includePrerelease)
      return !0;
    t = $c;
  }
  const n = /* @__PURE__ */ new Set();
  let i, a;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = Bc(i, h, r) : h.operator === "<" || h.operator === "<=" ? a = Hc(a, h, r) : n.add(h.semver);
  if (n.size > 1)
    return null;
  let s;
  if (i && a) {
    if (s = Bo(i.semver, a.semver, r), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const h of n) {
    if (i && !Gr(h, String(i), r) || a && !Gr(h, String(a), r))
      return null;
    for (const p of t)
      if (!Gr(h, String(p), r))
        return !1;
    return !0;
  }
  let c, l, f, o, d = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, u = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  d && d.prerelease.length === 1 && a.operator === "<" && d.prerelease[0] === 0 && (d = !1);
  for (const h of t) {
    if (o = o || h.operator === ">" || h.operator === ">=", f = f || h.operator === "<" || h.operator === "<=", i) {
      if (u && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === u.major && h.semver.minor === u.minor && h.semver.patch === u.patch && (u = !1), h.operator === ">" || h.operator === ">=") {
        if (c = Bc(i, h, r), c === h && c !== i)
          return !1;
      } else if (i.operator === ">=" && !Gr(i.semver, String(h), r))
        return !1;
    }
    if (a) {
      if (d && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === d.major && h.semver.minor === d.minor && h.semver.patch === d.patch && (d = !1), h.operator === "<" || h.operator === "<=") {
        if (l = Hc(a, h, r), l === h && l !== a)
          return !1;
      } else if (a.operator === "<=" && !Gr(a.semver, String(h), r))
        return !1;
    }
    if (!h.operator && (a || i) && s !== 0)
      return !1;
  }
  return !(i && f && !a && s !== 0 || a && o && !i && s !== 0 || u || d);
}, Bc = (e, t, r) => {
  if (!e)
    return t;
  const n = Bo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Hc = (e, t, r) => {
  if (!e)
    return t;
  const n = Bo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var L8 = R8;
const Ga = On, qc = Yi, k8 = Le, jc = Vh, F8 = Dr, U8 = jv, M8 = Wv, $8 = Yv, B8 = Kv, H8 = Zv, q8 = ry, j8 = ay, G8 = ly, V8 = tt, W8 = hy, z8 = my, Y8 = Lo, X8 = _y, K8 = by, J8 = Ki, Q8 = ko, Z8 = Wh, e_ = zh, t_ = Fo, r_ = Uo, n_ = Yh, i_ = Vy, a_ = Ji(), s_ = rt(), o_ = Qi, l_ = Qy, c_ = r8, u_ = s8, f_ = c8, h_ = h8, d_ = Mo, p_ = b8, m_ = A8, g_ = x8, v_ = O8, y_ = L8;
var Kh = {
  parse: F8,
  valid: U8,
  clean: M8,
  inc: $8,
  diff: B8,
  major: H8,
  minor: q8,
  patch: j8,
  prerelease: G8,
  compare: V8,
  rcompare: W8,
  compareLoose: z8,
  compareBuild: Y8,
  sort: X8,
  rsort: K8,
  gt: J8,
  lt: Q8,
  eq: Z8,
  neq: e_,
  gte: t_,
  lte: r_,
  cmp: n_,
  coerce: i_,
  Comparator: a_,
  Range: s_,
  satisfies: o_,
  toComparators: l_,
  maxSatisfying: c_,
  minSatisfying: u_,
  minVersion: f_,
  validRange: h_,
  outside: d_,
  gtr: p_,
  ltr: m_,
  intersects: g_,
  simplifyRange: v_,
  subset: y_,
  SemVer: k8,
  re: Ga.re,
  src: Ga.src,
  tokens: Ga.t,
  SEMVER_SPEC_VERSION: qc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: qc.RELEASE_TYPES,
  compareIdentifiers: jc.compareIdentifiers,
  rcompareIdentifiers: jc.rcompareIdentifiers
}, Rn = {}, Li = { exports: {} };
Li.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, a = 2, s = 9007199254740991, c = "[object Arguments]", l = "[object Array]", f = "[object AsyncFunction]", o = "[object Boolean]", d = "[object Date]", u = "[object Error]", h = "[object Function]", p = "[object GeneratorFunction]", m = "[object Map]", g = "[object Number]", E = "[object Null]", y = "[object Object]", S = "[object Promise]", _ = "[object Proxy]", A = "[object RegExp]", I = "[object Set]", T = "[object String]", $ = "[object Symbol]", C = "[object Undefined]", F = "[object WeakMap]", H = "[object ArrayBuffer]", G = "[object DataView]", K = "[object Float32Array]", L = "[object Float64Array]", D = "[object Int8Array]", U = "[object Int16Array]", R = "[object Int32Array]", M = "[object Uint8Array]", k = "[object Uint8ClampedArray]", W = "[object Uint16Array]", X = "[object Uint32Array]", z = /[\\^$.*+?()[\]{}|]/g, Z = /^\[object .+?Constructor\]$/, pe = /^(?:0|[1-9]\d*)$/, V = {};
  V[K] = V[L] = V[D] = V[U] = V[R] = V[M] = V[k] = V[W] = V[X] = !0, V[c] = V[l] = V[H] = V[o] = V[G] = V[d] = V[u] = V[h] = V[m] = V[g] = V[y] = V[A] = V[I] = V[T] = V[F] = !1;
  var it = typeof Te == "object" && Te && Te.Object === Object && Te, w = typeof self == "object" && self && self.Object === Object && self, v = it || w || Function("return this")(), O = t && !t.nodeType && t, x = O && !0 && e && !e.nodeType && e, Q = x && x.exports === O, re = Q && it.process, oe = function() {
    try {
      return re && re.binding && re.binding("util");
    } catch {
    }
  }(), ye = oe && oe.isTypedArray;
  function be(b, P) {
    for (var N = -1, B = b == null ? 0 : b.length, ne = 0, Y = []; ++N < B; ) {
      var le = b[N];
      P(le, N, b) && (Y[ne++] = le);
    }
    return Y;
  }
  function gt(b, P) {
    for (var N = -1, B = P.length, ne = b.length; ++N < B; )
      b[ne + N] = P[N];
    return b;
  }
  function he(b, P) {
    for (var N = -1, B = b == null ? 0 : b.length; ++N < B; )
      if (P(b[N], N, b))
        return !0;
    return !1;
  }
  function Ye(b, P) {
    for (var N = -1, B = Array(b); ++N < b; )
      B[N] = P(N);
    return B;
  }
  function ua(b) {
    return function(P) {
      return b(P);
    };
  }
  function $n(b, P) {
    return b.has(P);
  }
  function Fr(b, P) {
    return b == null ? void 0 : b[P];
  }
  function Bn(b) {
    var P = -1, N = Array(b.size);
    return b.forEach(function(B, ne) {
      N[++P] = [ne, B];
    }), N;
  }
  function Pd(b, P) {
    return function(N) {
      return b(P(N));
    };
  }
  function xd(b) {
    var P = -1, N = Array(b.size);
    return b.forEach(function(B) {
      N[++P] = B;
    }), N;
  }
  var Td = Array.prototype, Id = Function.prototype, Hn = Object.prototype, fa = v["__core-js_shared__"], el = Id.toString, at = Hn.hasOwnProperty, tl = function() {
    var b = /[^.]+$/.exec(fa && fa.keys && fa.keys.IE_PROTO || "");
    return b ? "Symbol(src)_1." + b : "";
  }(), rl = Hn.toString, Od = RegExp(
    "^" + el.call(at).replace(z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), nl = Q ? v.Buffer : void 0, qn = v.Symbol, il = v.Uint8Array, al = Hn.propertyIsEnumerable, Rd = Td.splice, $t = qn ? qn.toStringTag : void 0, sl = Object.getOwnPropertySymbols, Dd = nl ? nl.isBuffer : void 0, Nd = Pd(Object.keys, Object), ha = or(v, "DataView"), Ur = or(v, "Map"), da = or(v, "Promise"), pa = or(v, "Set"), ma = or(v, "WeakMap"), Mr = or(Object, "create"), Ld = qt(ha), kd = qt(Ur), Fd = qt(da), Ud = qt(pa), Md = qt(ma), ol = qn ? qn.prototype : void 0, ga = ol ? ol.valueOf : void 0;
  function Bt(b) {
    var P = -1, N = b == null ? 0 : b.length;
    for (this.clear(); ++P < N; ) {
      var B = b[P];
      this.set(B[0], B[1]);
    }
  }
  function $d() {
    this.__data__ = Mr ? Mr(null) : {}, this.size = 0;
  }
  function Bd(b) {
    var P = this.has(b) && delete this.__data__[b];
    return this.size -= P ? 1 : 0, P;
  }
  function Hd(b) {
    var P = this.__data__;
    if (Mr) {
      var N = P[b];
      return N === n ? void 0 : N;
    }
    return at.call(P, b) ? P[b] : void 0;
  }
  function qd(b) {
    var P = this.__data__;
    return Mr ? P[b] !== void 0 : at.call(P, b);
  }
  function jd(b, P) {
    var N = this.__data__;
    return this.size += this.has(b) ? 0 : 1, N[b] = Mr && P === void 0 ? n : P, this;
  }
  Bt.prototype.clear = $d, Bt.prototype.delete = Bd, Bt.prototype.get = Hd, Bt.prototype.has = qd, Bt.prototype.set = jd;
  function ct(b) {
    var P = -1, N = b == null ? 0 : b.length;
    for (this.clear(); ++P < N; ) {
      var B = b[P];
      this.set(B[0], B[1]);
    }
  }
  function Gd() {
    this.__data__ = [], this.size = 0;
  }
  function Vd(b) {
    var P = this.__data__, N = Gn(P, b);
    if (N < 0)
      return !1;
    var B = P.length - 1;
    return N == B ? P.pop() : Rd.call(P, N, 1), --this.size, !0;
  }
  function Wd(b) {
    var P = this.__data__, N = Gn(P, b);
    return N < 0 ? void 0 : P[N][1];
  }
  function zd(b) {
    return Gn(this.__data__, b) > -1;
  }
  function Yd(b, P) {
    var N = this.__data__, B = Gn(N, b);
    return B < 0 ? (++this.size, N.push([b, P])) : N[B][1] = P, this;
  }
  ct.prototype.clear = Gd, ct.prototype.delete = Vd, ct.prototype.get = Wd, ct.prototype.has = zd, ct.prototype.set = Yd;
  function Ht(b) {
    var P = -1, N = b == null ? 0 : b.length;
    for (this.clear(); ++P < N; ) {
      var B = b[P];
      this.set(B[0], B[1]);
    }
  }
  function Xd() {
    this.size = 0, this.__data__ = {
      hash: new Bt(),
      map: new (Ur || ct)(),
      string: new Bt()
    };
  }
  function Kd(b) {
    var P = Vn(this, b).delete(b);
    return this.size -= P ? 1 : 0, P;
  }
  function Jd(b) {
    return Vn(this, b).get(b);
  }
  function Qd(b) {
    return Vn(this, b).has(b);
  }
  function Zd(b, P) {
    var N = Vn(this, b), B = N.size;
    return N.set(b, P), this.size += N.size == B ? 0 : 1, this;
  }
  Ht.prototype.clear = Xd, Ht.prototype.delete = Kd, Ht.prototype.get = Jd, Ht.prototype.has = Qd, Ht.prototype.set = Zd;
  function jn(b) {
    var P = -1, N = b == null ? 0 : b.length;
    for (this.__data__ = new Ht(); ++P < N; )
      this.add(b[P]);
  }
  function ep(b) {
    return this.__data__.set(b, n), this;
  }
  function tp(b) {
    return this.__data__.has(b);
  }
  jn.prototype.add = jn.prototype.push = ep, jn.prototype.has = tp;
  function vt(b) {
    var P = this.__data__ = new ct(b);
    this.size = P.size;
  }
  function rp() {
    this.__data__ = new ct(), this.size = 0;
  }
  function np(b) {
    var P = this.__data__, N = P.delete(b);
    return this.size = P.size, N;
  }
  function ip(b) {
    return this.__data__.get(b);
  }
  function ap(b) {
    return this.__data__.has(b);
  }
  function sp(b, P) {
    var N = this.__data__;
    if (N instanceof ct) {
      var B = N.__data__;
      if (!Ur || B.length < r - 1)
        return B.push([b, P]), this.size = ++N.size, this;
      N = this.__data__ = new Ht(B);
    }
    return N.set(b, P), this.size = N.size, this;
  }
  vt.prototype.clear = rp, vt.prototype.delete = np, vt.prototype.get = ip, vt.prototype.has = ap, vt.prototype.set = sp;
  function op(b, P) {
    var N = Wn(b), B = !N && bp(b), ne = !N && !B && va(b), Y = !N && !B && !ne && gl(b), le = N || B || ne || Y, me = le ? Ye(b.length, String) : [], _e = me.length;
    for (var ie in b)
      at.call(b, ie) && !(le && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ie == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ne && (ie == "offset" || ie == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      Y && (ie == "buffer" || ie == "byteLength" || ie == "byteOffset") || // Skip index properties.
      vp(ie, _e))) && me.push(ie);
    return me;
  }
  function Gn(b, P) {
    for (var N = b.length; N--; )
      if (hl(b[N][0], P))
        return N;
    return -1;
  }
  function lp(b, P, N) {
    var B = P(b);
    return Wn(b) ? B : gt(B, N(b));
  }
  function $r(b) {
    return b == null ? b === void 0 ? C : E : $t && $t in Object(b) ? mp(b) : wp(b);
  }
  function ll(b) {
    return Br(b) && $r(b) == c;
  }
  function cl(b, P, N, B, ne) {
    return b === P ? !0 : b == null || P == null || !Br(b) && !Br(P) ? b !== b && P !== P : cp(b, P, N, B, cl, ne);
  }
  function cp(b, P, N, B, ne, Y) {
    var le = Wn(b), me = Wn(P), _e = le ? l : yt(b), ie = me ? l : yt(P);
    _e = _e == c ? y : _e, ie = ie == c ? y : ie;
    var $e = _e == y, Xe = ie == y, Se = _e == ie;
    if (Se && va(b)) {
      if (!va(P))
        return !1;
      le = !0, $e = !1;
    }
    if (Se && !$e)
      return Y || (Y = new vt()), le || gl(b) ? ul(b, P, N, B, ne, Y) : dp(b, P, _e, N, B, ne, Y);
    if (!(N & i)) {
      var Be = $e && at.call(b, "__wrapped__"), He = Xe && at.call(P, "__wrapped__");
      if (Be || He) {
        var _t = Be ? b.value() : b, ut = He ? P.value() : P;
        return Y || (Y = new vt()), ne(_t, ut, N, B, Y);
      }
    }
    return Se ? (Y || (Y = new vt()), pp(b, P, N, B, ne, Y)) : !1;
  }
  function up(b) {
    if (!ml(b) || _p(b))
      return !1;
    var P = dl(b) ? Od : Z;
    return P.test(qt(b));
  }
  function fp(b) {
    return Br(b) && pl(b.length) && !!V[$r(b)];
  }
  function hp(b) {
    if (!Ep(b))
      return Nd(b);
    var P = [];
    for (var N in Object(b))
      at.call(b, N) && N != "constructor" && P.push(N);
    return P;
  }
  function ul(b, P, N, B, ne, Y) {
    var le = N & i, me = b.length, _e = P.length;
    if (me != _e && !(le && _e > me))
      return !1;
    var ie = Y.get(b);
    if (ie && Y.get(P))
      return ie == P;
    var $e = -1, Xe = !0, Se = N & a ? new jn() : void 0;
    for (Y.set(b, P), Y.set(P, b); ++$e < me; ) {
      var Be = b[$e], He = P[$e];
      if (B)
        var _t = le ? B(He, Be, $e, P, b, Y) : B(Be, He, $e, b, P, Y);
      if (_t !== void 0) {
        if (_t)
          continue;
        Xe = !1;
        break;
      }
      if (Se) {
        if (!he(P, function(ut, jt) {
          if (!$n(Se, jt) && (Be === ut || ne(Be, ut, N, B, Y)))
            return Se.push(jt);
        })) {
          Xe = !1;
          break;
        }
      } else if (!(Be === He || ne(Be, He, N, B, Y))) {
        Xe = !1;
        break;
      }
    }
    return Y.delete(b), Y.delete(P), Xe;
  }
  function dp(b, P, N, B, ne, Y, le) {
    switch (N) {
      case G:
        if (b.byteLength != P.byteLength || b.byteOffset != P.byteOffset)
          return !1;
        b = b.buffer, P = P.buffer;
      case H:
        return !(b.byteLength != P.byteLength || !Y(new il(b), new il(P)));
      case o:
      case d:
      case g:
        return hl(+b, +P);
      case u:
        return b.name == P.name && b.message == P.message;
      case A:
      case T:
        return b == P + "";
      case m:
        var me = Bn;
      case I:
        var _e = B & i;
        if (me || (me = xd), b.size != P.size && !_e)
          return !1;
        var ie = le.get(b);
        if (ie)
          return ie == P;
        B |= a, le.set(b, P);
        var $e = ul(me(b), me(P), B, ne, Y, le);
        return le.delete(b), $e;
      case $:
        if (ga)
          return ga.call(b) == ga.call(P);
    }
    return !1;
  }
  function pp(b, P, N, B, ne, Y) {
    var le = N & i, me = fl(b), _e = me.length, ie = fl(P), $e = ie.length;
    if (_e != $e && !le)
      return !1;
    for (var Xe = _e; Xe--; ) {
      var Se = me[Xe];
      if (!(le ? Se in P : at.call(P, Se)))
        return !1;
    }
    var Be = Y.get(b);
    if (Be && Y.get(P))
      return Be == P;
    var He = !0;
    Y.set(b, P), Y.set(P, b);
    for (var _t = le; ++Xe < _e; ) {
      Se = me[Xe];
      var ut = b[Se], jt = P[Se];
      if (B)
        var vl = le ? B(jt, ut, Se, P, b, Y) : B(ut, jt, Se, b, P, Y);
      if (!(vl === void 0 ? ut === jt || ne(ut, jt, N, B, Y) : vl)) {
        He = !1;
        break;
      }
      _t || (_t = Se == "constructor");
    }
    if (He && !_t) {
      var zn = b.constructor, Yn = P.constructor;
      zn != Yn && "constructor" in b && "constructor" in P && !(typeof zn == "function" && zn instanceof zn && typeof Yn == "function" && Yn instanceof Yn) && (He = !1);
    }
    return Y.delete(b), Y.delete(P), He;
  }
  function fl(b) {
    return lp(b, Ap, gp);
  }
  function Vn(b, P) {
    var N = b.__data__;
    return yp(P) ? N[typeof P == "string" ? "string" : "hash"] : N.map;
  }
  function or(b, P) {
    var N = Fr(b, P);
    return up(N) ? N : void 0;
  }
  function mp(b) {
    var P = at.call(b, $t), N = b[$t];
    try {
      b[$t] = void 0;
      var B = !0;
    } catch {
    }
    var ne = rl.call(b);
    return B && (P ? b[$t] = N : delete b[$t]), ne;
  }
  var gp = sl ? function(b) {
    return b == null ? [] : (b = Object(b), be(sl(b), function(P) {
      return al.call(b, P);
    }));
  } : Pp, yt = $r;
  (ha && yt(new ha(new ArrayBuffer(1))) != G || Ur && yt(new Ur()) != m || da && yt(da.resolve()) != S || pa && yt(new pa()) != I || ma && yt(new ma()) != F) && (yt = function(b) {
    var P = $r(b), N = P == y ? b.constructor : void 0, B = N ? qt(N) : "";
    if (B)
      switch (B) {
        case Ld:
          return G;
        case kd:
          return m;
        case Fd:
          return S;
        case Ud:
          return I;
        case Md:
          return F;
      }
    return P;
  });
  function vp(b, P) {
    return P = P ?? s, !!P && (typeof b == "number" || pe.test(b)) && b > -1 && b % 1 == 0 && b < P;
  }
  function yp(b) {
    var P = typeof b;
    return P == "string" || P == "number" || P == "symbol" || P == "boolean" ? b !== "__proto__" : b === null;
  }
  function _p(b) {
    return !!tl && tl in b;
  }
  function Ep(b) {
    var P = b && b.constructor, N = typeof P == "function" && P.prototype || Hn;
    return b === N;
  }
  function wp(b) {
    return rl.call(b);
  }
  function qt(b) {
    if (b != null) {
      try {
        return el.call(b);
      } catch {
      }
      try {
        return b + "";
      } catch {
      }
    }
    return "";
  }
  function hl(b, P) {
    return b === P || b !== b && P !== P;
  }
  var bp = ll(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ll : function(b) {
    return Br(b) && at.call(b, "callee") && !al.call(b, "callee");
  }, Wn = Array.isArray;
  function Sp(b) {
    return b != null && pl(b.length) && !dl(b);
  }
  var va = Dd || xp;
  function Cp(b, P) {
    return cl(b, P);
  }
  function dl(b) {
    if (!ml(b))
      return !1;
    var P = $r(b);
    return P == h || P == p || P == f || P == _;
  }
  function pl(b) {
    return typeof b == "number" && b > -1 && b % 1 == 0 && b <= s;
  }
  function ml(b) {
    var P = typeof b;
    return b != null && (P == "object" || P == "function");
  }
  function Br(b) {
    return b != null && typeof b == "object";
  }
  var gl = ye ? ua(ye) : fp;
  function Ap(b) {
    return Sp(b) ? op(b) : hp(b);
  }
  function Pp() {
    return [];
  }
  function xp() {
    return !1;
  }
  e.exports = Cp;
})(Li, Li.exports);
var __ = Li.exports;
Object.defineProperty(Rn, "__esModule", { value: !0 });
Rn.DownloadedUpdateHelper = void 0;
Rn.createTempUpdateFile = C_;
const E_ = Sn, w_ = Ze, Gc = __, Vt = Ft, rn = se;
class b_ {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return rn.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Gc(this.versionInfo, r) && Gc(this.fileInfo.info, n.info) && await (0, Vt.pathExists)(t) ? t : null;
    const a = await this.getValidCachedUpdateFile(n, i);
    return a === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = a, a);
  }
  async setDownloadedFile(t, r, n, i, a, s) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: a,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, Vt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Vt.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, Vt.pathExists)(n))
      return null;
    let a;
    try {
      a = await (0, Vt.readJson)(n);
    } catch (f) {
      let o = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), o += ` (error on read: ${f.message})`), r.info(o), null;
    }
    if (!((a == null ? void 0 : a.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== a.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${a.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const c = rn.join(this.cacheDirForPendingUpdate, a.fileName);
    if (!await (0, Vt.pathExists)(c))
      return r.info("Cached update file doesn't exist"), null;
    const l = await S_(c);
    return t.info.sha512 !== l ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = a, c);
  }
  getUpdateInfoFile() {
    return rn.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Rn.DownloadedUpdateHelper = b_;
function S_(e, t = "sha512", r = "base64", n) {
  return new Promise((i, a) => {
    const s = (0, E_.createHash)(t);
    s.on("error", a).setEncoding(r), (0, w_.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", a).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function C_(e, t, r) {
  let n = 0, i = rn.join(t, e);
  for (let a = 0; a < 3; a++)
    try {
      return await (0, Vt.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${s}`), i = rn.join(t, `${n++}-${e}`);
    }
  return i;
}
var Zi = {}, Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
Ho.getAppCacheDir = P_;
const Va = se, A_ = $i;
function P_() {
  const e = (0, A_.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Va.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Va.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Va.join(e, ".cache"), t;
}
Object.defineProperty(Zi, "__esModule", { value: !0 });
Zi.ElectronAppAdapter = void 0;
const Vc = se, x_ = Ho;
class T_ {
  constructor(t = Zt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Vc.join(process.resourcesPath, "app-update.yml") : Vc.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, x_.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
Zi.ElectronAppAdapter = T_;
var Jh = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = de;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Zt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(a) {
      super(), this.proxyLoginCallback = a, this.cachedSession = null;
    }
    async download(a, s, c) {
      return await c.cancellationToken.createPromise((l, f, o) => {
        const d = {
          headers: c.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(a, d), (0, t.configureRequestOptions)(d), this.doDownload(d, {
          destination: s,
          options: c,
          onCancel: o,
          callback: (u) => {
            u == null ? l(s) : f(u);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(a, s) {
      a.headers && a.headers.Host && (a.host = a.headers.Host, delete a.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const c = Zt.net.request({
        ...a,
        session: this.cachedSession
      });
      return c.on("response", s), this.proxyLoginCallback != null && c.on("login", this.proxyLoginCallback), c;
    }
    addRedirectHandlers(a, s, c, l, f) {
      a.on("redirect", (o, d, u) => {
        a.abort(), l > this.maxRedirects ? c(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(u, s));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(Jh);
var Dn = {}, nt = {};
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.newBaseUrl = I_;
nt.newUrlFromBase = O_;
nt.getChannelFilename = R_;
const Qh = Lt;
function I_(e) {
  const t = new Qh.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function O_(e, t, r = !1) {
  const n = new Qh.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function R_(e) {
  return `${e}.yml`;
}
var fe = {}, D_ = "[object Symbol]", Zh = /[\\^$.*+?()[\]{}|]/g, N_ = RegExp(Zh.source), L_ = typeof Te == "object" && Te && Te.Object === Object && Te, k_ = typeof self == "object" && self && self.Object === Object && self, F_ = L_ || k_ || Function("return this")(), U_ = Object.prototype, M_ = U_.toString, Wc = F_.Symbol, zc = Wc ? Wc.prototype : void 0, Yc = zc ? zc.toString : void 0;
function $_(e) {
  if (typeof e == "string")
    return e;
  if (H_(e))
    return Yc ? Yc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function B_(e) {
  return !!e && typeof e == "object";
}
function H_(e) {
  return typeof e == "symbol" || B_(e) && M_.call(e) == D_;
}
function q_(e) {
  return e == null ? "" : $_(e);
}
function j_(e) {
  return e = q_(e), e && N_.test(e) ? e.replace(Zh, "\\$&") : e;
}
var ed = j_;
Object.defineProperty(fe, "__esModule", { value: !0 });
fe.Provider = void 0;
fe.findFile = Y_;
fe.parseUpdateInfo = X_;
fe.getFileList = td;
fe.resolveFiles = K_;
const Rt = de, G_ = we, V_ = Lt, ki = nt, W_ = ed;
class z_ {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, r, n, i = null) {
    const a = (0, ki.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, ki.newUrlFromBase)(`${t.pathname.replace(new RegExp(W_(n), "g"), r)}.blockmap`, i ? new V_.URL(i) : t), a];
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, Rt.configureRequestUrl)(t, n), n;
  }
}
fe.Provider = z_;
function Y_(e, t, r) {
  var n;
  if (e.length === 0)
    throw (0, Rt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((s) => s.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), a = (n = i.find((s) => [s.url.pathname, s.info.url].some((c) => c.includes(process.arch)))) !== null && n !== void 0 ? n : i.shift();
  return a || (r == null ? e[0] : e.find((s) => !r.some((c) => s.url.pathname.toLowerCase().endsWith(`.${c.toLowerCase()}`))));
}
function X_(e, t, r) {
  if (e == null)
    throw (0, Rt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, G_.load)(e);
  } catch (i) {
    throw (0, Rt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function td(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, Rt.newError)(`No files provided: ${(0, Rt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function K_(e, t, r = (n) => n) {
  const i = td(e).map((c) => {
    if (c.sha2 == null && c.sha512 == null)
      throw (0, Rt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Rt.safeStringifyJson)(c)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, ki.newUrlFromBase)(r(c.url), t),
      info: c
    };
  }), a = e.packages, s = a == null ? null : a[process.arch] || a.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, ki.newUrlFromBase)(r(s.path), t).href
  }), i;
}
Object.defineProperty(Dn, "__esModule", { value: !0 });
Dn.GenericProvider = void 0;
const Xc = de, Wa = nt, za = fe;
class J_ extends za.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Wa.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Wa.getChannelFilename)(this.channel), r = (0, Wa.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, za.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Xc.HttpError && i.statusCode === 404)
          throw (0, Xc.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((a, s) => {
            try {
              setTimeout(a, 1e3 * n);
            } catch (c) {
              s(c);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, za.resolveFiles)(t, this.baseUrl);
  }
}
Dn.GenericProvider = J_;
var ea = {}, ta = {};
Object.defineProperty(ta, "__esModule", { value: !0 });
ta.BitbucketProvider = void 0;
const Kc = de, Ya = nt, Xa = fe;
class Q_ extends Xa.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: a } = t;
    this.baseUrl = (0, Ya.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${a}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Kc.CancellationToken(), r = (0, Ya.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Ya.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Xa.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Kc.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Xa.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
ta.BitbucketProvider = Q_;
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.GitHubProvider = Dt.BaseGitHubProvider = void 0;
Dt.computeReleaseNotes = nd;
const ht = de, yr = Kh, Z_ = Lt, _r = nt, Os = fe, Ka = /\/tag\/([^/]+)$/;
class rd extends Os.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, _r.newBaseUrl)((0, ht.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, _r.newBaseUrl)((0, ht.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
Dt.BaseGitHubProvider = rd;
class e4 extends rd {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, a;
    const s = new ht.CancellationToken(), c = await this.httpRequest((0, _r.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), l = (0, ht.parseXml)(c);
    let f = l.element("entry", !1, "No published versions on GitHub"), o = null;
    try {
      if (this.updater.allowPrerelease) {
        const g = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = yr.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (g === null)
          o = Ka.exec(f.element("link").attribute("href"))[1];
        else
          for (const E of l.getElements("entry")) {
            const y = Ka.exec(E.element("link").attribute("href"));
            if (y === null)
              continue;
            const S = y[1], _ = ((n = yr.prerelease(S)) === null || n === void 0 ? void 0 : n[0]) || null, A = !g || ["alpha", "beta"].includes(g), I = _ !== null && !["alpha", "beta"].includes(String(_));
            if (A && !I && !(g === "beta" && _ === "alpha")) {
              o = S;
              break;
            }
            if (_ && _ === g) {
              o = S;
              break;
            }
          }
      } else {
        o = await this.getLatestTagName(s);
        for (const g of l.getElements("entry"))
          if (Ka.exec(g.element("link").attribute("href"))[1] === o) {
            f = g;
            break;
          }
      }
    } catch (g) {
      throw (0, ht.newError)(`Cannot parse releases feed: ${g.stack || g.message},
XML:
${c}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (o == null)
      throw (0, ht.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let d, u = "", h = "";
    const p = async (g) => {
      u = (0, _r.getChannelFilename)(g), h = (0, _r.newUrlFromBase)(this.getBaseDownloadPath(String(o), u), this.baseUrl);
      const E = this.createRequestOptions(h);
      try {
        return await this.executor.request(E, s);
      } catch (y) {
        throw y instanceof ht.HttpError && y.statusCode === 404 ? (0, ht.newError)(`Cannot find ${u} in the latest release artifacts (${h}): ${y.stack || y.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : y;
      }
    };
    try {
      let g = this.channel;
      this.updater.allowPrerelease && (!((i = yr.prerelease(o)) === null || i === void 0) && i[0]) && (g = this.getCustomChannelName(String((a = yr.prerelease(o)) === null || a === void 0 ? void 0 : a[0]))), d = await p(g);
    } catch (g) {
      if (this.updater.allowPrerelease)
        d = await p(this.getDefaultChannelName());
      else
        throw g;
    }
    const m = (0, Os.parseUpdateInfo)(d, u, h);
    return m.releaseName == null && (m.releaseName = f.elementValueOrEmpty("title")), m.releaseNotes == null && (m.releaseNotes = nd(this.updater.currentVersion, this.updater.fullChangelog, l, f)), {
      tag: o,
      ...m
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, _r.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new Z_.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, ht.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Os.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
Dt.GitHubProvider = e4;
function Jc(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function nd(e, t, r, n) {
  if (!t)
    return Jc(n);
  const i = [];
  for (const a of r.getElements("entry")) {
    const s = /\/tag\/v?([^/]+)$/.exec(a.element("link").attribute("href"))[1];
    yr.lt(e, s) && i.push({
      version: s,
      note: Jc(a)
    });
  }
  return i.sort((a, s) => yr.rcompare(a.version, s.version));
}
var ra = {};
Object.defineProperty(ra, "__esModule", { value: !0 });
ra.GitLabProvider = void 0;
const Pe = de, Ja = Lt, t4 = ed, li = nt, Qa = fe;
class r4 extends Qa.Provider {
  /**
   * Normalizes filenames by replacing spaces and underscores with dashes.
   *
   * This is a workaround to handle filename formatting differences between tools:
   * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
   * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
   *
   * Because of this mismatch, we can't reliably extract the correct filename from
   * the asset path without normalization. This function ensures consistent matching
   * across different filename formats by converting all spaces and underscores to dashes.
   *
   * @param filename The filename to normalize
   * @returns The normalized filename with spaces and underscores replaced by dashes
   */
  normalizeFilename(t) {
    return t.replace(/ |_/g, "-");
  }
  constructor(t, r, n) {
    super({
      ...n,
      // GitLab might not support multiple range requests efficiently
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.updater = r, this.cachedLatestVersion = null;
    const a = t.host || "gitlab.com";
    this.baseApiUrl = (0, li.newBaseUrl)(`https://${a}/api/v4`);
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = new Pe.CancellationToken(), r = (0, li.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
    let n;
    try {
      const u = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, h = await this.httpRequest(r, u, t);
      if (!h)
        throw (0, Pe.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      n = JSON.parse(h);
    } catch (u) {
      throw (0, Pe.newError)(`Unable to find latest release on GitLab (${r}): ${u.stack || u.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    const i = n.tag_name;
    let a = null, s = "", c = null;
    const l = async (u) => {
      s = (0, li.getChannelFilename)(u);
      const h = n.assets.links.find((m) => m.name === s);
      if (!h)
        throw (0, Pe.newError)(`Cannot find ${s} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      c = new Ja.URL(h.direct_asset_url);
      const p = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
      try {
        const m = await this.httpRequest(c, p, t);
        if (!m)
          throw (0, Pe.newError)(`Empty response from ${c}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return m;
      } catch (m) {
        throw m instanceof Pe.HttpError && m.statusCode === 404 ? (0, Pe.newError)(`Cannot find ${s} in the latest release artifacts (${c}): ${m.stack || m.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : m;
      }
    };
    try {
      a = await l(this.channel);
    } catch (u) {
      if (this.channel !== this.getDefaultChannelName())
        a = await l(this.getDefaultChannelName());
      else
        throw u;
    }
    if (!a)
      throw (0, Pe.newError)(`Unable to parse channel data from ${s}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const f = (0, Qa.parseUpdateInfo)(a, s, c);
    f.releaseName == null && (f.releaseName = n.name), f.releaseNotes == null && (f.releaseNotes = n.description || null);
    const o = /* @__PURE__ */ new Map();
    for (const u of n.assets.links)
      o.set(this.normalizeFilename(u.name), u.direct_asset_url);
    const d = {
      tag: i,
      assets: o,
      ...f
    };
    return this.cachedLatestVersion = d, d;
  }
  /**
   * Utility function to convert GitlabReleaseAsset to Map<string, string>
   * Maps asset names to their download URLs
   */
  convertAssetsToMap(t) {
    const r = /* @__PURE__ */ new Map();
    for (const n of t.links)
      r.set(this.normalizeFilename(n.name), n.direct_asset_url);
    return r;
  }
  /**
   * Find blockmap file URL in assets map for a specific filename
   */
  findBlockMapInAssets(t, r) {
    const n = [`${r}.blockmap`, `${this.normalizeFilename(r)}.blockmap`];
    for (const i of n) {
      const a = t.get(i);
      if (a)
        return new Ja.URL(a);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const r = new Pe.CancellationToken(), n = [`v${t}`, t];
    for (const i of n) {
      const a = (0, li.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const s = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, c = await this.httpRequest(a, s, r);
        if (c)
          return JSON.parse(c);
      } catch (s) {
        if (s instanceof Pe.HttpError && s.statusCode === 404)
          continue;
        throw (0, Pe.newError)(`Unable to find release ${i} on GitLab (${a}): ${s.stack || s.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, Pe.newError)(`Unable to find release with version ${t} (tried: ${n.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
  }
  setAuthHeaderForToken(t) {
    const r = {};
    return t != null && (t.startsWith("Bearer") ? r.authorization = t : r["PRIVATE-TOKEN"] = t), r;
  }
  /**
   * Get version info for blockmap files, using cache when possible
   */
  async getVersionInfoForBlockMap(t) {
    if (this.cachedLatestVersion && this.cachedLatestVersion.version === t)
      return this.cachedLatestVersion.assets;
    const r = await this.fetchReleaseInfoByVersion(t);
    return r && r.assets ? this.convertAssetsToMap(r.assets) : null;
  }
  /**
   * Find blockmap URLs from version assets
   */
  async findBlockMapUrlsFromAssets(t, r, n) {
    let i = null, a = null;
    const s = await this.getVersionInfoForBlockMap(r);
    s && (i = this.findBlockMapInAssets(s, n));
    const c = await this.getVersionInfoForBlockMap(t);
    if (c) {
      const l = n.replace(new RegExp(t4(r), "g"), t);
      a = this.findBlockMapInAssets(c, l);
    }
    return [a, i];
  }
  async getBlockMapFiles(t, r, n, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const a = t.pathname.split("/").pop() || "", [s, c] = await this.findBlockMapUrlsFromAssets(r, n, a);
      if (!c)
        throw (0, Pe.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!s)
        throw (0, Pe.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [s, c];
    } else
      return super.getBlockMapFiles(t, r, n, i);
  }
  resolveFiles(t) {
    return (0, Qa.getFileList)(t).map((r) => {
      const i = [
        r.url,
        // Original filename
        this.normalizeFilename(r.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((s) => t.assets.has(s)), a = i ? t.assets.get(i) : void 0;
      if (!a)
        throw (0, Pe.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Ja.URL(a),
        info: r
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
ra.GitLabProvider = r4;
var na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
na.KeygenProvider = void 0;
const Qc = de, Za = nt, es = fe;
class n4 extends es.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, Za.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Qc.CancellationToken(), r = (0, Za.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Za.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, es.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Qc.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, es.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
na.KeygenProvider = n4;
var ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
ia.PrivateGitHubProvider = void 0;
const fr = de, i4 = we, a4 = se, Zc = Lt, eu = nt, s4 = Dt, o4 = fe;
class l4 extends s4.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new fr.CancellationToken(), r = (0, eu.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((c) => c.name === r);
    if (i == null)
      throw (0, fr.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const a = new Zc.URL(i.url);
    let s;
    try {
      s = (0, i4.load)(await this.httpRequest(a, this.configureHeaders("application/octet-stream"), t));
    } catch (c) {
      throw c instanceof fr.HttpError && c.statusCode === 404 ? (0, fr.newError)(`Cannot find ${r} in the latest release artifacts (${a}): ${c.stack || c.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : c;
    }
    return s.assets = n.assets, s;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, eu.newUrlFromBase)(n, this.baseUrl);
    try {
      const a = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? a.find((s) => s.prerelease) || a[0] : a;
    } catch (a) {
      throw (0, fr.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${a.stack || a.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, o4.getFileList)(t).map((r) => {
      const n = a4.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((a) => a != null && a.name === n);
      if (i == null)
        throw (0, fr.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Zc.URL(i.url),
        info: r
      };
    });
  }
}
ia.PrivateGitHubProvider = l4;
Object.defineProperty(ea, "__esModule", { value: !0 });
ea.isUrlProbablySupportMultiRangeRequests = id;
ea.createClient = p4;
const ci = de, c4 = ta, tu = Dn, u4 = Dt, f4 = ra, h4 = na, d4 = ia;
function id(e) {
  return !e.includes("s3.amazonaws.com");
}
function p4(e, t, r) {
  if (typeof e == "string")
    throw (0, ci.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, a = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return a == null ? new u4.GitHubProvider(i, t, r) : new d4.PrivateGitHubProvider(i, t, a, r);
    }
    case "bitbucket":
      return new c4.BitbucketProvider(e, t, r);
    case "gitlab":
      return new f4.GitLabProvider(e, t, r);
    case "keygen":
      return new h4.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new tu.GenericProvider({
        provider: "generic",
        url: (0, ci.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new tu.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && id(i.url)
      });
    }
    case "custom": {
      const i = e, a = i.updateProvider;
      if (!a)
        throw (0, ci.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new a(i, t, r);
    }
    default:
      throw (0, ci.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var aa = {}, Nn = {}, Nr = {}, ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.OperationKind = void 0;
ir.computeOperations = m4;
var Xt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Xt || (ir.OperationKind = Xt = {}));
function m4(e, t, r) {
  const n = nu(e.files), i = nu(t.files);
  let a = null;
  const s = t.files[0], c = [], l = s.name, f = n.get(l);
  if (f == null)
    throw new Error(`no file ${l} in old blockmap`);
  const o = i.get(l);
  let d = 0;
  const { checksumToOffset: u, checksumToOldSize: h } = v4(n.get(l), f.offset, r);
  let p = s.offset;
  for (let m = 0; m < o.checksums.length; p += o.sizes[m], m++) {
    const g = o.sizes[m], E = o.checksums[m];
    let y = u.get(E);
    y != null && h.get(E) !== g && (r.warn(`Checksum ("${E}") matches, but size differs (old: ${h.get(E)}, new: ${g})`), y = void 0), y === void 0 ? (d++, a != null && a.kind === Xt.DOWNLOAD && a.end === p ? a.end += g : (a = {
      kind: Xt.DOWNLOAD,
      start: p,
      end: p + g
      // oldBlocks: null,
    }, ru(a, c, E, m))) : a != null && a.kind === Xt.COPY && a.end === y ? a.end += g : (a = {
      kind: Xt.COPY,
      start: y,
      end: y + g
      // oldBlocks: [checksum]
    }, ru(a, c, E, m));
  }
  return d > 0 && r.info(`File${s.name === "file" ? "" : " " + s.name} has ${d} changed blocks`), c;
}
const g4 = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function ru(e, t, r, n) {
  if (g4 && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const a = [i.start, i.end, e.start, e.end].reduce((s, c) => s < c ? s : c);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${Xt[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - a} until ${i.end - a} and ${e.start - a} until ${e.end - a}`);
    }
  }
  t.push(e);
}
function v4(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let a = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const c = e.checksums[s], l = e.sizes[s], f = i.get(c);
    if (f === void 0)
      n.set(c, a), i.set(c, l);
    else if (r.debug != null) {
      const o = f === l ? "(same size)" : `(size: ${f}, this size: ${l})`;
      r.debug(`${c} duplicated in blockmap ${o}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    a += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function nu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.DataSplitter = void 0;
Nr.copyData = ad;
const ui = de, y4 = Ze, _4 = bn, E4 = ir, iu = Buffer.from(`\r
\r
`);
var wt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(wt || (wt = {}));
function ad(e, t, r, n, i) {
  const a = (0, y4.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  a.on("error", n), a.once("end", i), a.pipe(t, {
    end: !1
  });
}
class w4 extends _4.Writable {
  constructor(t, r, n, i, a, s) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = a, this.finishHandler = s, this.partIndex = -1, this.headerListBuffer = null, this.readState = wt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, ui.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === wt.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = wt.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === wt.BODY)
          this.readState = wt.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, ui.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const c = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (c < s)
            await this.copyExistingData(c, s);
          else if (c > s)
            throw (0, ui.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = wt.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, a = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, a), this.remainingPartDataCount = n - (a - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const a = () => {
        if (t === r) {
          n();
          return;
        }
        const s = this.options.tasks[t];
        if (s.kind !== E4.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        ad(s, this.out, this.options.oldFileFd, i, () => {
          t++, a();
        });
      };
      a();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(iu, r);
    if (n !== -1)
      return n + iu.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, ui.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((a, s) => {
      i.on("error", s), i.once("drain", () => {
        i.removeListener("error", s), a();
      });
    });
  }
}
Nr.DataSplitter = w4;
var sa = {};
Object.defineProperty(sa, "__esModule", { value: !0 });
sa.executeTasksUsingMultipleRangeRequests = b4;
sa.checkIsRangesSupported = Ds;
const Rs = de, au = Nr, su = ir;
function b4(e, t, r, n, i) {
  const a = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const c = s + 1e3;
    S4(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, c),
      oldFileFd: n
    }, r, () => a(c), i);
  };
  return a;
}
function S4(e, t, r, n, i) {
  let a = "bytes=", s = 0;
  const c = /* @__PURE__ */ new Map(), l = [];
  for (let d = t.start; d < t.end; d++) {
    const u = t.tasks[d];
    u.kind === su.OperationKind.DOWNLOAD && (a += `${u.start}-${u.end - 1}, `, c.set(s, d), s++, l.push(u.end - u.start));
  }
  if (s <= 1) {
    const d = (u) => {
      if (u >= t.end) {
        n();
        return;
      }
      const h = t.tasks[u++];
      if (h.kind === su.OperationKind.COPY)
        (0, au.copyData)(h, r, t.oldFileFd, i, () => d(u));
      else {
        const p = e.createRequestOptions();
        p.headers.Range = `bytes=${h.start}-${h.end - 1}`;
        const m = e.httpExecutor.createRequest(p, (g) => {
          g.on("error", i), Ds(g, i) && (g.pipe(r, {
            end: !1
          }), g.once("end", () => d(u)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(m, i), m.end();
      }
    };
    d(t.start);
    return;
  }
  const f = e.createRequestOptions();
  f.headers.Range = a.substring(0, a.length - 2);
  const o = e.httpExecutor.createRequest(f, (d) => {
    if (!Ds(d, i))
      return;
    const u = (0, Rs.safeGetHeader)(d, "content-type"), h = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(u);
    if (h == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${u}"`));
      return;
    }
    const p = new au.DataSplitter(r, t, c, h[1] || h[2], l, n);
    p.on("error", i), d.pipe(p), d.on("end", () => {
      setTimeout(() => {
        o.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
}
function Ds(e, t) {
  if (e.statusCode >= 400)
    return t((0, Rs.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, Rs.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
oa.ProgressDifferentialDownloadCallbackTransform = void 0;
const C4 = bn;
var Er;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Er || (Er = {}));
class A4 extends C4.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Er.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Er.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = Er.COPY;
  }
  beginRangeDownload() {
    this.operationType = Er.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
oa.ProgressDifferentialDownloadCallbackTransform = A4;
Object.defineProperty(Nn, "__esModule", { value: !0 });
Nn.DifferentialDownloader = void 0;
const Vr = de, ts = Ft, P4 = Ze, x4 = Nr, T4 = Lt, fi = ir, ou = sa, I4 = oa;
class O4 {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, Vr.configureRequestUrl)(this.options.newUrl, t), (0, Vr.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, fi.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let a = 0, s = 0;
    for (const l of i) {
      const f = l.end - l.start;
      l.kind === fi.OperationKind.DOWNLOAD ? a += f : s += f;
    }
    const c = this.blockAwareFileInfo.size;
    if (a + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== c)
      throw new Error(`Internal error, size mismatch: downloadSize: ${a}, copySize: ${s}, newSize: ${c}`);
    return n.info(`Full: ${lu(c)}, To download: ${lu(a)} (${Math.round(a / (c / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, ts.close)(i.descriptor).catch((a) => {
      this.logger.error(`cannot close file "${i.path}": ${a}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((a) => {
      try {
        this.logger.error(`cannot close files: ${a}`);
      } catch (s) {
        try {
          console.error(s);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, ts.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, ts.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const a = (0, P4.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, c) => {
      const l = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const E = [];
        let y = 0;
        for (const _ of t)
          _.kind === fi.OperationKind.DOWNLOAD && (E.push(_.end - _.start), y += _.end - _.start);
        const S = {
          expectedByteCounts: E,
          grandTotal: y
        };
        f = new I4.ProgressDifferentialDownloadCallbackTransform(S, this.options.cancellationToken, this.options.onProgress), l.push(f);
      }
      const o = new Vr.DigestTransform(this.blockAwareFileInfo.sha512);
      o.isValidateOnEnd = !1, l.push(o), a.on("finish", () => {
        a.close(() => {
          r.splice(1, 1);
          try {
            o.validate();
          } catch (E) {
            c(E);
            return;
          }
          s(void 0);
        });
      }), l.push(a);
      let d = null;
      for (const E of l)
        E.on("error", c), d == null ? d = E : d = d.pipe(E);
      const u = l[0];
      let h;
      if (this.options.isUseMultipleRangeRequest) {
        h = (0, ou.executeTasksUsingMultipleRangeRequests)(this, t, u, n, c), h(0);
        return;
      }
      let p = 0, m = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const g = this.createRequestOptions();
      g.redirect = "manual", h = (E) => {
        var y, S;
        if (E >= t.length) {
          this.fileMetadataBuffer != null && u.write(this.fileMetadataBuffer), u.end();
          return;
        }
        const _ = t[E++];
        if (_.kind === fi.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, x4.copyData)(_, u, n, c, () => h(E));
          return;
        }
        const A = `bytes=${_.start}-${_.end - 1}`;
        g.headers.range = A, (S = (y = this.logger) === null || y === void 0 ? void 0 : y.debug) === null || S === void 0 || S.call(y, `download range: ${A}`), f && f.beginRangeDownload();
        const I = this.httpExecutor.createRequest(g, (T) => {
          T.on("error", c), T.on("aborted", () => {
            c(new Error("response has been aborted by the server"));
          }), T.statusCode >= 400 && c((0, Vr.createHttpError)(T)), T.pipe(u, {
            end: !1
          }), T.once("end", () => {
            f && f.endRangeDownload(), ++p === 100 ? (p = 0, setTimeout(() => h(E), 1e3)) : h(E);
          });
        });
        I.on("redirect", (T, $, C) => {
          this.logger.info(`Redirect to ${R4(C)}`), m = C, (0, Vr.configureRequestUrl)(new T4.URL(m), g), I.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(I, c), I.end();
      }, h(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let a = 0;
    if (await this.request(i, (s) => {
      s.copy(n, a), a += s.length;
    }), a !== n.length)
      throw new Error(`Received data length ${a} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const a = this.httpExecutor.createRequest(t, (s) => {
        (0, ou.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", r), s.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(a, i), a.end();
    });
  }
}
Nn.DifferentialDownloader = O4;
function lu(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function R4(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(aa, "__esModule", { value: !0 });
aa.GenericDifferentialDownloader = void 0;
const D4 = Nn;
class N4 extends D4.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
aa.GenericDifferentialDownloader = N4;
var Ut = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = de;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(a) {
      this.emitter = a;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(a) {
      n(this.emitter, "login", a);
    }
    progress(a) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, a);
    }
    updateDownloaded(a) {
      n(this.emitter, e.UPDATE_DOWNLOADED, a);
    }
    updateCancelled(a) {
      n(this.emitter, "update-cancelled", a);
    }
  }
  e.UpdaterSignal = r;
  function n(i, a, s) {
    i.on(a, s);
  }
})(Ut);
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.NoOpLogger = Tt.AppUpdater = void 0;
const xe = de, L4 = Sn, k4 = $i, F4 = zu, Ke = Ft, U4 = we, rs = zi, Je = se, Wt = Kh, cu = Rn, M4 = Zi, uu = Jh, $4 = Dn, ns = ea, is = Xu, B4 = aa, hr = Ut;
class qo extends F4.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, xe.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, xe.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, uu.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new sd();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new rs.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  /**
   * Allows developer to override default logic for determining if the user is below the rollout threshold.
   * The default logic compares the staging percentage with numerical representation of user ID.
   * An override can define custom logic, or bypass it if needed.
   */
  get isUserWithinRollout() {
    return this._isUserWithinRollout;
  }
  set isUserWithinRollout(t) {
    t && (this._isUserWithinRollout = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new hr.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (a) => this.checkIfUpdateSupported(a), this._isUserWithinRollout = (a) => this.isStagingMatch(a), this.clientPromise = null, this.stagingUserIdPromise = new rs.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new rs.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (a) => {
      this._logger.error(`Error: ${a.stack || a.message}`);
    }), r == null ? (this.app = new M4.ElectronAppAdapter(), this.httpExecutor = new uu.ElectronHttpExecutor((a, s) => this.emit("login", a, s))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, Wt.parse)(n);
    if (i == null)
      throw (0, xe.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = H4(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new $4.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, ns.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, ns.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = qo.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new Zt.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, s = xe.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${s}, user id: ${i}`), s < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, Wt.parse)(t.version);
    if (r == null)
      throw (0, xe.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, Wt.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const a = (0, Wt.gt)(r, n), s = (0, Wt.lt)(r, n);
    return a ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, k4.release)();
    if (r)
      try {
        if ((0, Wt.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, ns.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new xe.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, xe.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new xe.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, xe.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof xe.CancellationError))
        try {
          this.dispatchError(i);
        } catch (a) {
          this._logger.warn(`Cannot dispatch error event: ${a.stack || a}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(hr.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, U4.load)(await (0, Ke.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = Je.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, Ke.readFile)(t, "utf-8");
      if (xe.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = xe.UUID.v5((0, L4.randomBytes)(4096), xe.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, Ke.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = Je.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new cu.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(hr.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (y) => this.emit(hr.DOWNLOAD_PROGRESS, y));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, a = i.version, s = r.packageInfo;
    function c() {
      const y = decodeURIComponent(t.fileInfo.url.pathname);
      return y.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? Je.basename(y) : t.fileInfo.info.url;
    }
    const l = await this.getOrCreateDownloadHelper(), f = l.cacheDirForPendingUpdate;
    await (0, Ke.mkdir)(f, { recursive: !0 });
    const o = c();
    let d = Je.join(f, o);
    const u = s == null ? null : Je.join(f, `package-${a}${Je.extname(s.path) || ".7z"}`), h = async (y) => {
      await l.setDownloadedFile(d, u, i, r, o, y), await t.done({
        ...i,
        downloadedFile: d
      });
      const S = Je.join(f, "current.blockmap");
      return await (0, Ke.pathExists)(S) && await (0, Ke.copyFile)(S, Je.join(l.cacheDir, "current.blockmap")), u == null ? [d] : [d, u];
    }, p = this._logger, m = await l.validateDownloadedPath(d, i, r, p);
    if (m != null)
      return d = m, await h(!1);
    const g = async () => (await l.clear().catch(() => {
    }), await (0, Ke.unlink)(d).catch(() => {
    })), E = await (0, cu.createTempUpdateFile)(`temp-${o}`, f, p);
    try {
      await t.task(E, n, u, g), await (0, xe.retry)(() => (0, Ke.rename)(E, d), {
        retries: 60,
        interval: 500,
        shouldRetry: (y) => y instanceof Error && /^EBUSY:/.test(y.message) ? !0 : (p.warn(`Cannot rename temp file to final file: ${y.message || y.stack}`), !1)
      });
    } catch (y) {
      throw await g(), y instanceof xe.CancellationError && (p.info("cancelled"), this.emit("update-cancelled", i)), y;
    }
    return p.info(`New version ${a} has been downloaded to ${d}`), await h(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, a) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const s = r.updateInfoAndProvider.provider, c = await s.getBlockMapFiles(t.url, this.app.version, r.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${c[0]}", new: ${c[1]})`);
      const l = async (p) => {
        const m = await this.httpExecutor.downloadToBuffer(p, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (m == null || m.length === 0)
          throw new Error(`Blockmap "${p.href}" is empty`);
        try {
          return JSON.parse((0, is.gunzipSync)(m).toString());
        } catch (g) {
          throw new Error(`Cannot parse blockmap "${p.href}", error: ${g}`);
        }
      }, f = {
        newUrl: t.url,
        oldFile: Je.join(this.downloadedUpdateHelper.cacheDir, a),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: s.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(hr.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (p) => this.emit(hr.DOWNLOAD_PROGRESS, p));
      const o = async (p, m) => {
        const g = Je.join(m, "current.blockmap");
        await (0, Ke.outputFile)(g, (0, is.gzipSync)(JSON.stringify(p)));
      }, d = async (p) => {
        const m = Je.join(p, "current.blockmap");
        try {
          if (await (0, Ke.pathExists)(m))
            return JSON.parse((0, is.gunzipSync)(await (0, Ke.readFile)(m)).toString());
        } catch (g) {
          this._logger.warn(`Cannot parse blockmap "${m}", error: ${g}`);
        }
        return null;
      }, u = await l(c[1]);
      await o(u, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let h = await d(this.downloadedUpdateHelper.cacheDir);
      return h == null && (h = await l(c[0])), await new B4.GenericDifferentialDownloader(t.info, this.httpExecutor, f).download(h, u), !1;
    } catch (s) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), this._testOnlyOptions != null)
        throw s;
      return !0;
    }
  }
}
Tt.AppUpdater = qo;
function H4(e) {
  const t = (0, Wt.prerelease)(e);
  return t != null && t.length > 0;
}
class sd {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
Tt.NoOpLogger = sd;
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.BaseUpdater = void 0;
const fu = Mi, q4 = Tt;
class j4 extends q4.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Zt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, a = n == null ? null : n.downloadedFileInfo;
    if (i == null || a == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: a.isAdminRightsRequired
      });
    } catch (s) {
      return this.dispatchError(s), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, fu.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: s, stdout: c, stderr: l } = i;
    if (a != null)
      throw this._logger.error(l), a;
    if (s != null && s !== 0)
      throw this._logger.error(l), new Error(`Command ${t} exited with code ${s}`);
    return c.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((a, s) => {
      try {
        const c = { stdio: i, env: n, detached: !0 }, l = (0, fu.spawn)(t, r, c);
        l.on("error", (f) => {
          s(f);
        }), l.unref(), l.pid !== void 0 && a(!0);
      } catch (c) {
        s(c);
      }
    });
  }
}
nr.BaseUpdater = j4;
var pn = {}, Ln = {};
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const dr = Ft, G4 = Nn, V4 = Xu;
class W4 extends G4.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = od(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await z4(this.options.oldFile), i);
  }
}
Ln.FileWithEmbeddedBlockMapDifferentialDownloader = W4;
function od(e) {
  return JSON.parse((0, V4.inflateRawSync)(e).toString());
}
async function z4(e) {
  const t = await (0, dr.open)(e, "r");
  try {
    const r = (await (0, dr.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, dr.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, dr.read)(t, i, 0, i.length, r - n.length - i.length), await (0, dr.close)(t), od(i);
  } catch (r) {
    throw await (0, dr.close)(t), r;
  }
}
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.AppImageUpdater = void 0;
const hu = de, du = Mi, Y4 = Ft, X4 = Ze, Wr = se, K4 = nr, J4 = Ln, Q4 = fe, pu = Ut;
class Z4 extends K4.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Q4.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, hu.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, s, i, r, t)) && await this.httpExecutor.download(n.url, i, a), await (0, Y4.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, a) {
    try {
      const s = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: a.requestHeaders,
        cancellationToken: a.cancellationToken
      };
      return this.listenerCount(pu.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (c) => this.emit(pu.DOWNLOAD_PROGRESS, c)), await new J4.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, hu.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, X4.unlinkSync)(r);
    let n;
    const i = Wr.basename(r), a = this.installerPath;
    if (a == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    Wr.basename(a) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = Wr.join(Wr.dirname(r), Wr.basename(a)), (0, du.execFileSync)("mv", ["-f", a, n]), n !== r && this.emit("appimage-filename-updated", n);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, du.execFileSync)(n, [], { env: s })), !0;
  }
}
pn.AppImageUpdater = Z4;
var mn = {}, Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.LinuxUpdater = void 0;
const eE = nr;
class tE extends eE.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /**
   * Returns true if the current process is running as root.
   */
  isRunningAsRoot() {
    var t;
    return ((t = process.getuid) === null || t === void 0 ? void 0 : t.call(process)) === 0;
  }
  /**
   * Sanitizies the installer path for using with command line tools.
   */
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  runCommandWithSudoIfNeeded(t) {
    if (this.isRunningAsRoot())
      return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(t[0], t.slice(1));
    const { name: r } = this.app, n = `"${r} would like to update"`, i = this.sudoWithArgs(n);
    this._logger.info(`Running as non-root user, using sudo to install: ${i}`);
    let a = '"';
    return (/pkexec/i.test(i[0]) || i[0] === "sudo") && (a = ""), this.spawnSyncLog(i[0], [...i.length > 1 ? i.slice(1) : [], `${a}/bin/bash`, "-c", `'${t.join(" ")}'${a}`]);
  }
  sudoWithArgs(t) {
    const r = this.determineSudoCommand(), n = [r];
    return /kdesudo/i.test(r) ? (n.push("--comment", t), n.push("-c")) : /gksudo/i.test(r) ? n.push("--message", t) : /pkexec/i.test(r) && n.push("--disable-internal-agent"), n;
  }
  hasCommand(t) {
    try {
      return this.spawnSyncLog("command", ["-v", t]), !0;
    } catch {
      return !1;
    }
  }
  determineSudoCommand() {
    const t = ["gksudo", "kdesudo", "pkexec", "beesu"];
    for (const r of t)
      if (this.hasCommand(r))
        return r;
    return "sudo";
  }
  /**
   * Detects the package manager to use based on the available commands.
   * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
   * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
   * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
   * @param pms - An array of package manager commands to check for, in priority order.
   * @returns The detected package manager command or "unknown" if none are found.
   */
  detectPackageManager(t) {
    var r;
    const n = (r = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || r === void 0 ? void 0 : r.trim();
    if (n)
      return n;
    for (const i of t)
      if (this.hasCommand(i))
        return i;
    return this._logger.warn(`No package manager found in the list: ${t.join(", ")}. Defaulting to the first one: ${t[0]}`), t[0];
  }
}
Lr.LinuxUpdater = tE;
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.DebUpdater = void 0;
const rE = fe, mu = Ut, nE = Lr;
class jo extends nE.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, rE.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(mu.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(mu.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const n = ["dpkg", "apt"], i = this.detectPackageManager(n);
    try {
      jo.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (a) {
      return this.dispatchError(a), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    var a;
    if (t === "dpkg")
      try {
        n(["dpkg", "-i", r]);
      } catch (s) {
        i.warn((a = s.message) !== null && a !== void 0 ? a : s), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), n(["apt-get", "install", "-f", "-y"]);
      }
    else if (t === "apt")
      i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), n([
        "apt",
        "install",
        "-y",
        "--allow-unauthenticated",
        // needed for unsigned .debs
        "--allow-downgrades",
        // allow lower version installs
        "--allow-change-held-packages",
        r
      ]);
    else
      throw new Error(`Package manager ${t} not supported`);
  }
}
mn.DebUpdater = jo;
var gn = {};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.PacmanUpdater = void 0;
const gu = Ut, iE = fe, aE = Lr;
class Go extends aE.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, iE.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(gu.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(gu.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      Go.installWithCommandRunner(r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (n) {
      return this.dispatchError(n), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n) {
    var i;
    try {
      r(["pacman", "-U", "--noconfirm", t]);
    } catch (a) {
      n.warn((i = a.message) !== null && i !== void 0 ? i : a), n.warn("pacman installation failed, attempting to update package database and retry");
      try {
        r(["pacman", "-Sy", "--noconfirm"]), r(["pacman", "-U", "--noconfirm", t]);
      } catch (s) {
        throw n.error("Retry after pacman -Sy failed"), s;
      }
    }
  }
}
gn.PacmanUpdater = Go;
var vn = {};
Object.defineProperty(vn, "__esModule", { value: !0 });
vn.RpmUpdater = void 0;
const vu = Ut, sE = fe, oE = Lr;
class Vo extends oE.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, sE.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(vu.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(vu.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(n);
    try {
      Vo.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (a) {
      return this.dispatchError(a), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    if (t === "zypper")
      return n(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", r]);
    if (t === "dnf")
      return n(["dnf", "install", "--nogpgcheck", "-y", r]);
    if (t === "yum")
      return n(["yum", "install", "--nogpgcheck", "-y", r]);
    if (t === "rpm")
      return i.warn("Installing with rpm only (no dependency resolution)."), n(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", r]);
    throw new Error(`Package manager ${t} not supported`);
  }
}
vn.RpmUpdater = Vo;
var yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.MacUpdater = void 0;
const yu = de, as = Ft, lE = Ze, _u = se, cE = Np, uE = Tt, fE = fe, Eu = Mi, wu = Sn;
class hE extends uE.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = Zt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let a = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), a = (0, Eu.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${a})`);
    } catch (d) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${d}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const u = (0, Eu.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${u}`), s = s || u;
    } catch (d) {
      n.warn(`uname shell command to check for arm64 failed: ${d}`);
    }
    s = s || process.arch === "arm64" || a;
    const c = (d) => {
      var u;
      return d.url.pathname.includes("arm64") || ((u = d.info.url) === null || u === void 0 ? void 0 : u.includes("arm64"));
    };
    s && r.some(c) ? r = r.filter((d) => s === c(d)) : r = r.filter((d) => !c(d));
    const l = (0, fE.findFile)(r, "zip", ["pkg", "dmg"]);
    if (l == null)
      throw (0, yu.newError)(`ZIP file not provided: ${(0, yu.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const f = t.updateInfoAndProvider.provider, o = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: l,
      downloadUpdateOptions: t,
      task: async (d, u) => {
        const h = _u.join(this.downloadedUpdateHelper.cacheDir, o), p = () => (0, as.pathExistsSync)(h) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let m = !0;
        p() && (m = await this.differentialDownloadInstaller(l, t, d, f, o)), m && await this.httpExecutor.download(l.url, d, u);
      },
      done: async (d) => {
        if (!t.disableDifferentialDownload)
          try {
            const u = _u.join(this.downloadedUpdateHelper.cacheDir, o);
            await (0, as.copyFile)(d.downloadedFile, u);
          } catch (u) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${u.message}`);
          }
        return this.updateDownloaded(l, d);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, a = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, as.stat)(i)).size, s = this._logger, c = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${c})`), this.server = (0, cE.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${c})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${c})`);
    });
    const l = (f) => {
      const o = f.address();
      return typeof o == "string" ? o : `http://127.0.0.1:${o == null ? void 0 : o.port}`;
    };
    return await new Promise((f, o) => {
      const d = (0, wu.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), u = Buffer.from(`autoupdater:${d}`, "ascii"), h = `/${(0, wu.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (p, m) => {
        const g = p.url;
        if (s.info(`${g} requested`), g === "/") {
          if (!p.headers.authorization || p.headers.authorization.indexOf("Basic ") === -1) {
            m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), s.warn("No authenthication info");
            return;
          }
          const S = p.headers.authorization.split(" ")[1], _ = Buffer.from(S, "base64").toString("ascii"), [A, I] = _.split(":");
          if (A !== "autoupdater" || I !== d) {
            m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const T = Buffer.from(`{ "url": "${l(this.server)}${h}" }`);
          m.writeHead(200, { "Content-Type": "application/json", "Content-Length": T.length }), m.end(T);
          return;
        }
        if (!g.startsWith(h)) {
          s.warn(`${g} requested, but not supported`), m.writeHead(404), m.end();
          return;
        }
        s.info(`${h} requested by Squirrel.Mac, pipe ${i}`);
        let E = !1;
        m.on("finish", () => {
          E || (this.nativeUpdater.removeListener("error", o), f([]));
        });
        const y = (0, lE.createReadStream)(i);
        y.on("error", (S) => {
          try {
            m.end();
          } catch (_) {
            s.warn(`cannot end response: ${_}`);
          }
          E = !0, this.nativeUpdater.removeListener("error", o), o(new Error(`Cannot pipe "${i}": ${S}`));
        }), m.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": a
        }), y.pipe(m);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${c})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${c})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${u.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", o), this.nativeUpdater.checkForUpdates()) : f([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
yn.MacUpdater = hE;
var _n = {}, Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
Wo.verifySignature = pE;
const bu = de, ld = Mi, dE = $i, Su = se;
function cd(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function pE(e, t, r) {
  return new Promise((n, i) => {
    const a = t.replace(/'/g, "''");
    r.info(`Verifying signature ${a}`), (0, ld.execFile)(...cd(`"Get-AuthenticodeSignature -LiteralPath '${a}' | ConvertTo-Json -Compress"`, 20 * 1e3), (s, c, l) => {
      var f;
      try {
        if (s != null || l) {
          ss(r, s, l, i), n(null);
          return;
        }
        const o = mE(c);
        if (o.Status === 0) {
          try {
            const p = Su.normalize(o.Path), m = Su.normalize(t);
            if (r.info(`LiteralPath: ${p}. Update Path: ${m}`), p !== m) {
              ss(r, new Error(`LiteralPath of ${p} is different than ${m}`), l, i), n(null);
              return;
            }
          } catch (p) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = p.message) !== null && f !== void 0 ? f : p.stack}`);
          }
          const u = (0, bu.parseDn)(o.SignerCertificate.Subject);
          let h = !1;
          for (const p of e) {
            const m = (0, bu.parseDn)(p);
            if (m.size ? h = Array.from(m.keys()).every((E) => m.get(E) === u.get(E)) : p === u.get("CN") && (r.warn(`Signature validated using only CN ${p}. Please add your full Distinguished Name (DN) to publisherNames configuration`), h = !0), h) {
              n(null);
              return;
            }
          }
        }
        const d = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(o, (u, h) => u === "RawData" ? void 0 : h, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${d}`), n(d);
      } catch (o) {
        ss(r, o, null, i), n(null);
        return;
      }
    });
  });
}
function mE(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function ss(e, t, r, n) {
  if (gE()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, ld.execFileSync)(...cd("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function gE() {
  const e = dE.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(_n, "__esModule", { value: !0 });
_n.NsisUpdater = void 0;
const hi = de, Cu = se, vE = nr, yE = Ln, Au = Ut, _E = fe, EE = Ft, wE = Wo, Pu = Lt;
class bE extends vE.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, wE.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, _E.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, a, s, c) => {
        const l = n.packageInfo, f = l != null && s != null;
        if (f && t.disableWebInstaller)
          throw (0, hi.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !f && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (f || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, hi.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, a);
        const o = await this.verifySignature(i);
        if (o != null)
          throw await c(), (0, hi.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${o}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (f && await this.differentialDownloadWebPackage(t, l, s, r))
          try {
            await this.httpExecutor.download(new Pu.URL(l.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (d) {
            try {
              await (0, EE.unlink)(s);
            } catch {
            }
            throw d;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const a = () => {
      this.spawnLog(Cu.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), a(), !0) : (this.spawnLog(r, n).catch((s) => {
      const c = s.code;
      this._logger.info(`Cannot run installer: error code: ${c}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), c === "UNKNOWN" || c === "EACCES" ? a() : c === "ENOENT" ? Zt.shell.openPath(r).catch((l) => this.dispatchError(l)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const a = {
        newUrl: new Pu.URL(r.path),
        oldFile: Cu.join(this.downloadedUpdateHelper.cacheDir, hi.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(Au.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(Au.DOWNLOAD_PROGRESS, s)), await new yE.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, a).download();
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "win32";
    }
    return !1;
  }
}
_n.NsisUpdater = bE;
(function(e) {
  var t = Te && Te.__createBinding || (Object.create ? function(g, E, y, S) {
    S === void 0 && (S = y);
    var _ = Object.getOwnPropertyDescriptor(E, y);
    (!_ || ("get" in _ ? !E.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
      return E[y];
    } }), Object.defineProperty(g, S, _);
  } : function(g, E, y, S) {
    S === void 0 && (S = y), g[S] = E[y];
  }), r = Te && Te.__exportStar || function(g, E) {
    for (var y in g) y !== "default" && !Object.prototype.hasOwnProperty.call(E, y) && t(E, g, y);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = Ft, i = se;
  var a = nr;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return a.BaseUpdater;
  } });
  var s = Tt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var c = fe;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return c.Provider;
  } });
  var l = pn;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var f = mn;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return f.DebUpdater;
  } });
  var o = gn;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return o.PacmanUpdater;
  } });
  var d = vn;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return d.RpmUpdater;
  } });
  var u = yn;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return u.MacUpdater;
  } });
  var h = _n;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return h.NsisUpdater;
  } }), r(Ut, e);
  let p;
  function m() {
    if (process.platform === "win32")
      p = new _n.NsisUpdater();
    else if (process.platform === "darwin")
      p = new yn.MacUpdater();
    else {
      p = new pn.AppImageUpdater();
      try {
        const g = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(g))
          return p;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const E = (0, n.readFileSync)(g).toString().trim();
        switch (console.info("Found package-type:", E), E) {
          case "deb":
            p = new mn.DebUpdater();
            break;
          case "rpm":
            p = new vn.RpmUpdater();
            break;
          case "pacman":
            p = new gn.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (g) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", g.message);
      }
    }
    return p;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => p || m()
  });
})(Me);
function di(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ns = { exports: {} }, Ls = { exports: {} }, Ve = {}, te = {};
te.__esModule = !0;
te.extend = ud;
te.indexOf = xE;
te.escapeExpression = TE;
te.isEmpty = IE;
te.createFrame = OE;
te.blockParams = RE;
te.appendContextPath = DE;
var SE = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;",
  "=": "&#x3D;"
}, CE = /[&<>"'`=]/g, AE = /[&<>"'`=]/;
function PE(e) {
  return SE[e];
}
function ud(e) {
  for (var t = 1; t < arguments.length; t++)
    for (var r in arguments[t])
      Object.prototype.hasOwnProperty.call(arguments[t], r) && (e[r] = arguments[t][r]);
  return e;
}
var zo = Object.prototype.toString;
te.toString = zo;
var ks = function(t) {
  return typeof t == "function";
};
ks(/x/) && (te.isFunction = ks = function(e) {
  return typeof e == "function" && zo.call(e) === "[object Function]";
});
te.isFunction = ks;
var fd = Array.isArray || function(e) {
  return e && typeof e == "object" ? zo.call(e) === "[object Array]" : !1;
};
te.isArray = fd;
function xE(e, t) {
  for (var r = 0, n = e.length; r < n; r++)
    if (e[r] === t)
      return r;
  return -1;
}
function TE(e) {
  if (typeof e != "string") {
    if (e && e.toHTML)
      return e.toHTML();
    if (e == null)
      return "";
    if (!e)
      return e + "";
    e = "" + e;
  }
  return AE.test(e) ? e.replace(CE, PE) : e;
}
function IE(e) {
  return !e && e !== 0 ? !0 : !!(fd(e) && e.length === 0);
}
function OE(e) {
  var t = ud({}, e);
  return t._parent = e, t;
}
function RE(e, t) {
  return e.path = t, e;
}
function DE(e, t) {
  return (e ? e + "." : "") + t;
}
var Fs = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  var r = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
  function n(i, a) {
    var s = a && a.loc, c = void 0, l = void 0, f = void 0, o = void 0;
    s && (c = s.start.line, l = s.end.line, f = s.start.column, o = s.end.column, i += " - " + c + ":" + f);
    for (var d = Error.prototype.constructor.call(this, i), u = 0; u < r.length; u++)
      this[r[u]] = d[r[u]];
    Error.captureStackTrace && Error.captureStackTrace(this, n);
    try {
      s && (this.lineNumber = c, this.endLineNumber = l, Object.defineProperty ? (Object.defineProperty(this, "column", {
        value: f,
        enumerable: !0
      }), Object.defineProperty(this, "endColumn", {
        value: o,
        enumerable: !0
      })) : (this.column = f, this.endColumn = o));
    } catch {
    }
  }
  n.prototype = new Error(), t.default = n, e.exports = t.default;
})(Fs, Fs.exports);
var We = Fs.exports, kn = {}, Us = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  var r = te;
  t.default = function(n) {
    n.registerHelper("blockHelperMissing", function(i, a) {
      var s = a.inverse, c = a.fn;
      if (i === !0)
        return c(this);
      if (i === !1 || i == null)
        return s(this);
      if (r.isArray(i))
        return i.length > 0 ? (a.ids && (a.ids = [a.name]), n.helpers.each(i, a)) : s(this);
      if (a.data && a.ids) {
        var l = r.createFrame(a.data);
        l.contextPath = r.appendContextPath(a.data.contextPath, a.name), a = { data: l };
      }
      return c(i, a);
    });
  }, e.exports = t.default;
})(Us, Us.exports);
var NE = Us.exports, Ms = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  function r(s) {
    return s && s.__esModule ? s : { default: s };
  }
  var n = te, i = We, a = r(i);
  t.default = function(s) {
    s.registerHelper("each", function(c, l) {
      if (!l)
        throw new a.default("Must pass iterator to #each");
      var f = l.fn, o = l.inverse, d = 0, u = "", h = void 0, p = void 0;
      l.data && l.ids && (p = n.appendContextPath(l.data.contextPath, l.ids[0]) + "."), n.isFunction(c) && (c = c.call(this)), l.data && (h = n.createFrame(l.data));
      function m(_, A, I) {
        h && (h.key = _, h.index = A, h.first = A === 0, h.last = !!I, p && (h.contextPath = p + _)), u = u + f(c[_], {
          data: h,
          blockParams: n.blockParams([c[_], _], [p + _, null])
        });
      }
      if (c && typeof c == "object")
        if (n.isArray(c))
          for (var g = c.length; d < g; d++)
            d in c && m(d, d, d === c.length - 1);
        else if (typeof Symbol == "function" && c[Symbol.iterator]) {
          for (var E = [], y = c[Symbol.iterator](), S = y.next(); !S.done; S = y.next())
            E.push(S.value);
          c = E;
          for (var g = c.length; d < g; d++)
            m(d, d, d === c.length - 1);
        } else
          (function() {
            var _ = void 0;
            Object.keys(c).forEach(function(A) {
              _ !== void 0 && m(_, d - 1), _ = A, d++;
            }), _ !== void 0 && m(_, d - 1, !0);
          })();
      return d === 0 && (u = o(this)), u;
    });
  }, e.exports = t.default;
})(Ms, Ms.exports);
var LE = Ms.exports, $s = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  function r(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var n = We, i = r(n);
  t.default = function(a) {
    a.registerHelper("helperMissing", function() {
      if (arguments.length !== 1)
        throw new i.default('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    });
  }, e.exports = t.default;
})($s, $s.exports);
var kE = $s.exports, Bs = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  function r(s) {
    return s && s.__esModule ? s : { default: s };
  }
  var n = te, i = We, a = r(i);
  t.default = function(s) {
    s.registerHelper("if", function(c, l) {
      if (arguments.length != 2)
        throw new a.default("#if requires exactly one argument");
      return n.isFunction(c) && (c = c.call(this)), !l.hash.includeZero && !c || n.isEmpty(c) ? l.inverse(this) : l.fn(this);
    }), s.registerHelper("unless", function(c, l) {
      if (arguments.length != 2)
        throw new a.default("#unless requires exactly one argument");
      return s.helpers.if.call(this, c, {
        fn: l.inverse,
        inverse: l.fn,
        hash: l.hash
      });
    });
  }, e.exports = t.default;
})(Bs, Bs.exports);
var FE = Bs.exports, Hs = { exports: {} };
(function(e, t) {
  t.__esModule = !0, t.default = function(r) {
    r.registerHelper("log", function() {
      for (var n = [void 0], i = arguments[arguments.length - 1], a = 0; a < arguments.length - 1; a++)
        n.push(arguments[a]);
      var s = 1;
      i.hash.level != null ? s = i.hash.level : i.data && i.data.level != null && (s = i.data.level), n[0] = s, r.log.apply(r, n);
    });
  }, e.exports = t.default;
})(Hs, Hs.exports);
var UE = Hs.exports, qs = { exports: {} };
(function(e, t) {
  t.__esModule = !0, t.default = function(r) {
    r.registerHelper("lookup", function(n, i, a) {
      return n && a.lookupProperty(n, i);
    });
  }, e.exports = t.default;
})(qs, qs.exports);
var ME = qs.exports, js = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  function r(s) {
    return s && s.__esModule ? s : { default: s };
  }
  var n = te, i = We, a = r(i);
  t.default = function(s) {
    s.registerHelper("with", function(c, l) {
      if (arguments.length != 2)
        throw new a.default("#with requires exactly one argument");
      n.isFunction(c) && (c = c.call(this));
      var f = l.fn;
      if (n.isEmpty(c))
        return l.inverse(this);
      var o = l.data;
      return l.data && l.ids && (o = n.createFrame(l.data), o.contextPath = n.appendContextPath(l.data.contextPath, l.ids[0])), f(c, {
        data: o,
        blockParams: n.blockParams([c], [o && o.contextPath])
      });
    });
  }, e.exports = t.default;
})(js, js.exports);
var $E = js.exports;
kn.__esModule = !0;
kn.registerDefaultHelpers = ew;
kn.moveHelperToHooks = tw;
function ar(e) {
  return e && e.__esModule ? e : { default: e };
}
var BE = NE, HE = ar(BE), qE = LE, jE = ar(qE), GE = kE, VE = ar(GE), WE = FE, zE = ar(WE), YE = UE, XE = ar(YE), KE = ME, JE = ar(KE), QE = $E, ZE = ar(QE);
function ew(e) {
  HE.default(e), jE.default(e), VE.default(e), zE.default(e), XE.default(e), JE.default(e), ZE.default(e);
}
function tw(e, t, r) {
  e.helpers[t] && (e.hooks[t] = e.helpers[t], r || (e.helpers[t] = void 0));
}
var Yo = {}, Gs = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  var r = te;
  t.default = function(n) {
    n.registerDecorator("inline", function(i, a, s, c) {
      var l = i;
      return a.partials || (a.partials = {}, l = function(f, o) {
        var d = s.partials;
        s.partials = r.extend({}, d, a.partials);
        var u = i(f, o);
        return s.partials = d, u;
      }), a.partials[c.args[0]] = c.fn, l;
    });
  }, e.exports = t.default;
})(Gs, Gs.exports);
var rw = Gs.exports;
Yo.__esModule = !0;
Yo.registerDefaultDecorators = sw;
function nw(e) {
  return e && e.__esModule ? e : { default: e };
}
var iw = rw, aw = nw(iw);
function sw(e) {
  aw.default(e);
}
var Vs = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  var r = te, n = {
    methodMap: ["debug", "info", "warn", "error"],
    level: "info",
    // Maps a given level value to the `methodMap` indexes above.
    lookupLevel: function(a) {
      if (typeof a == "string") {
        var s = r.indexOf(n.methodMap, a.toLowerCase());
        s >= 0 ? a = s : a = parseInt(a, 10);
      }
      return a;
    },
    // Can be overridden in the host environment
    log: function(a) {
      if (a = n.lookupLevel(a), typeof console < "u" && n.lookupLevel(n.level) <= a) {
        var s = n.methodMap[a];
        console[s] || (s = "log");
        for (var c = arguments.length, l = Array(c > 1 ? c - 1 : 0), f = 1; f < c; f++)
          l[f - 1] = arguments[f];
        console[s].apply(console, l);
      }
    }
  };
  t.default = n, e.exports = t.default;
})(Vs, Vs.exports);
var hd = Vs.exports, kr = {};
kr.__esModule = !0;
kr.createProtoAccessControl = uw;
kr.resultIsAllowed = fw;
kr.resetLoggedProperties = dw;
function ow(e) {
  return e && e.__esModule ? e : { default: e };
}
var xu = te, lw = hd, cw = ow(lw), Fi = /* @__PURE__ */ Object.create(null);
function uw(e) {
  var t = /* @__PURE__ */ Object.create(null);
  t.__proto__ = !1, xu.extend(t, e.allowedProtoProperties);
  var r = /* @__PURE__ */ Object.create(null);
  return r.constructor = !1, r.__defineGetter__ = !1, r.__defineSetter__ = !1, r.__lookupGetter__ = !1, r.__lookupSetter__ = !1, xu.extend(r, e.allowedProtoMethods), {
    properties: {
      whitelist: t,
      defaultValue: e.allowProtoPropertiesByDefault
    },
    methods: {
      whitelist: r,
      defaultValue: e.allowProtoMethodsByDefault
    }
  };
}
function fw(e, t, r) {
  return Tu(typeof e == "function" ? t.methods : t.properties, r);
}
function Tu(e, t) {
  return e.whitelist[t] !== void 0 ? e.whitelist[t] === !0 : e.defaultValue !== void 0 ? e.defaultValue : (hw(t), !1);
}
function hw(e) {
  Fi[e] !== !0 && (Fi[e] = !0, cw.default.log("error", 'Handlebars: Access has been denied to resolve the property "' + e + `" because it is not an "own property" of its parent.
You can add a runtime option to disable the check or this warning:
See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details`));
}
function dw() {
  Object.keys(Fi).forEach(function(e) {
    delete Fi[e];
  });
}
Ve.__esModule = !0;
Ve.HandlebarsEnvironment = Ws;
function dd(e) {
  return e && e.__esModule ? e : { default: e };
}
var zt = te, pw = We, os = dd(pw), mw = kn, gw = Yo, vw = hd, Ui = dd(vw), yw = kr, _w = "4.7.9";
Ve.VERSION = _w;
var Ew = 8;
Ve.COMPILER_REVISION = Ew;
var ww = 7;
Ve.LAST_COMPATIBLE_COMPILER_REVISION = ww;
var bw = {
  1: "<= 1.0.rc.2",
  // 1.0.rc.2 is actually rev2 but doesn't report it
  2: "== 1.0.0-rc.3",
  3: "== 1.0.0-rc.4",
  4: "== 1.x.x",
  5: "== 2.0.0-alpha.x",
  6: ">= 2.0.0-beta.1",
  7: ">= 4.0.0 <4.3.0",
  8: ">= 4.3.0"
};
Ve.REVISION_CHANGES = bw;
var ls = "[object Object]";
function Ws(e, t, r) {
  this.helpers = e || {}, this.partials = t || {}, this.decorators = r || {}, mw.registerDefaultHelpers(this), gw.registerDefaultDecorators(this);
}
Ws.prototype = {
  constructor: Ws,
  logger: Ui.default,
  log: Ui.default.log,
  registerHelper: function(t, r) {
    if (zt.toString.call(t) === ls) {
      if (r)
        throw new os.default("Arg not supported with multiple helpers");
      zt.extend(this.helpers, t);
    } else
      this.helpers[t] = r;
  },
  unregisterHelper: function(t) {
    delete this.helpers[t];
  },
  registerPartial: function(t, r) {
    if (zt.toString.call(t) === ls)
      zt.extend(this.partials, t);
    else {
      if (typeof r > "u")
        throw new os.default('Attempting to register a partial called "' + t + '" as undefined');
      this.partials[t] = r;
    }
  },
  unregisterPartial: function(t) {
    delete this.partials[t];
  },
  registerDecorator: function(t, r) {
    if (zt.toString.call(t) === ls) {
      if (r)
        throw new os.default("Arg not supported with multiple decorators");
      zt.extend(this.decorators, t);
    } else
      this.decorators[t] = r;
  },
  unregisterDecorator: function(t) {
    delete this.decorators[t];
  },
  /**
   * Reset the memory of illegal property accesses that have already been logged.
   * @deprecated should only be used in handlebars test-cases
   */
  resetLoggedPropertyAccesses: function() {
    yw.resetLoggedProperties();
  }
};
var Sw = Ui.default.log;
Ve.log = Sw;
Ve.createFrame = zt.createFrame;
Ve.logger = Ui.default;
var zs = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  function r(n) {
    this.string = n;
  }
  r.prototype.toString = r.prototype.toHTML = function() {
    return "" + this.string;
  }, t.default = r, e.exports = t.default;
})(zs, zs.exports);
var Cw = zs.exports, Mt = {}, Xo = {};
Xo.__esModule = !0;
Xo.wrapHelper = Aw;
function Aw(e, t) {
  if (typeof e != "function")
    return e;
  var r = function() {
    var i = arguments[arguments.length - 1];
    return arguments[arguments.length - 1] = t(i), e.apply(this, arguments);
  };
  return r;
}
Mt.__esModule = !0;
Mt.checkRevision = Rw;
Mt.template = Dw;
Mt.wrapProgram = wi;
Mt.resolvePartial = Nw;
Mt.invokePartial = Lw;
Mt.noop = pd;
function Pw(e) {
  return e && e.__esModule ? e : { default: e };
}
function xw(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
  return t.default = e, t;
}
var Tw = te, wr = xw(Tw), Iw = We, dt = Pw(Iw), pt = Ve, Iu = kn, Ow = Xo, Ou = kr;
function Rw(e) {
  var t = e && e[0] || 1, r = pt.COMPILER_REVISION;
  if (!(t >= pt.LAST_COMPATIBLE_COMPILER_REVISION && t <= pt.COMPILER_REVISION))
    if (t < pt.LAST_COMPATIBLE_COMPILER_REVISION) {
      var n = pt.REVISION_CHANGES[r], i = pt.REVISION_CHANGES[t];
      throw new dt.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + i + ").");
    } else
      throw new dt.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").");
}
function Dw(e, t) {
  if (!t)
    throw new dt.default("No environment passed to template");
  if (!e || !e.main)
    throw new dt.default("Unknown template object: " + typeof e);
  e.main.decorator = e.main_d, t.VM.checkRevision(e.compiler);
  var r = e.compiler && e.compiler[0] === 7;
  function n(s, c, l) {
    l.hash && (c = wr.extend({}, c, l.hash), l.ids && (l.ids[0] = !0)), s = t.VM.resolvePartial.call(this, s, c, l), l.hooks = this.hooks, l.protoAccessControl = this.protoAccessControl;
    var f = t.VM.invokePartial.call(this, s, c, l);
    if (f == null && t.compile && (l.partials[l.name] = t.compile(s, e.compilerOptions, t), f = l.partials[l.name](c, l)), f != null) {
      if (l.indent) {
        for (var o = f.split(`
`), d = 0, u = o.length; d < u && !(!o[d] && d + 1 === u); d++)
          o[d] = l.indent + o[d];
        f = o.join(`
`);
      }
      return f;
    } else
      throw new dt.default("The partial " + l.name + " could not be compiled when running in runtime-only mode");
  }
  var i = {
    strict: function(c, l, f) {
      if (!c || !(l in c))
        throw new dt.default('"' + l + '" not defined in ' + c, {
          loc: f
        });
      return i.lookupProperty(c, l);
    },
    lookupProperty: function(c, l) {
      var f = c[l];
      if (f == null || Object.prototype.hasOwnProperty.call(c, l) || Ou.resultIsAllowed(f, i.protoAccessControl, l))
        return f;
    },
    lookup: function(c, l) {
      for (var f = c.length, o = 0; o < f; o++) {
        var d = c[o] && i.lookupProperty(c[o], l);
        if (d != null)
          return d;
      }
    },
    lambda: function(c, l) {
      return typeof c == "function" ? c.call(l) : c;
    },
    escapeExpression: wr.escapeExpression,
    invokePartial: n,
    fn: function(c) {
      var l = e[c];
      return l.decorator = e[c + "_d"], l;
    },
    programs: [],
    program: function(c, l, f, o, d) {
      var u = this.programs[c], h = this.fn(c);
      return l || d || o || f ? u = wi(this, c, h, l, f, o, d) : u || (u = this.programs[c] = wi(this, c, h)), u;
    },
    data: function(c, l) {
      for (; c && l--; )
        c = c._parent;
      return c;
    },
    mergeIfNeeded: function(c, l) {
      var f = c || l;
      return c && l && c !== l && (f = wr.extend({}, l, c)), f;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),
    noop: t.VM.noop,
    compilerInfo: e.compiler
  };
  function a(s) {
    var c = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1], l = c.data;
    a._setup(c), !c.partial && e.useData && (l = kw(s, l));
    var f = void 0, o = e.useBlockParams ? [] : void 0;
    e.useDepths && (c.depths ? f = s != c.depths[0] ? [s].concat(c.depths) : c.depths : f = [s]);
    function d(u) {
      return "" + e.main(i, u, i.helpers, i.partials, l, o, f);
    }
    return d = md(e.main, d, i, c.depths || [], l, o), d(s, c);
  }
  return a.isTop = !0, a._setup = function(s) {
    if (s.partial)
      i.protoAccessControl = s.protoAccessControl, i.helpers = s.helpers, i.partials = s.partials, i.decorators = s.decorators, i.hooks = s.hooks;
    else {
      var c = {};
      Ru(c, t.helpers, i), Ru(c, s.helpers, i), i.helpers = c, e.usePartial && (i.partials = i.mergeIfNeeded(s.partials, t.partials)), (e.usePartial || e.useDecorators) && (i.decorators = wr.extend({}, t.decorators, s.decorators)), i.hooks = {}, i.protoAccessControl = Ou.createProtoAccessControl(s);
      var l = s.allowCallsToHelperMissing || r;
      Iu.moveHelperToHooks(i, "helperMissing", l), Iu.moveHelperToHooks(i, "blockHelperMissing", l);
    }
  }, a._child = function(s, c, l, f) {
    if (e.useBlockParams && !l)
      throw new dt.default("must pass block params");
    if (e.useDepths && !f)
      throw new dt.default("must pass parent depths");
    return wi(i, s, e[s], c, 0, l, f);
  }, a;
}
function wi(e, t, r, n, i, a, s) {
  function c(l) {
    var f = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1], o = s;
    return s && l != s[0] && !(l === e.nullContext && s[0] === null) && (o = [l].concat(s)), r(e, l, e.helpers, e.partials, f.data || n, a && [f.blockParams].concat(a), o);
  }
  return c = md(r, c, e, s, n, a), c.program = t, c.depth = s ? s.length : 0, c.blockParams = i || 0, c;
}
function Nw(e, t, r) {
  return e ? !e.call && !r.name && (r.name = e, e = bi(r.partials, e)) : r.name === "@partial-block" ? e = bi(r.data, "partial-block") : e = bi(r.partials, r.name), e;
}
function Lw(e, t, r) {
  var n = bi(r.data, "partial-block");
  r.partial = !0, r.ids && (r.data.contextPath = r.ids[0] || r.data.contextPath);
  var i = void 0;
  if (r.fn && r.fn !== pd && function() {
    r.data = pt.createFrame(r.data);
    var a = r.fn;
    i = r.data["partial-block"] = function(c) {
      var l = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
      return l.data = pt.createFrame(l.data), l.data["partial-block"] = n, a(c, l);
    }, a.partials && (r.partials = wr.extend({}, r.partials, a.partials));
  }(), e === void 0 && i && (e = i), e === void 0)
    throw new dt.default("The partial " + r.name + " could not be found");
  if (e instanceof Function)
    return e(t, r);
}
function pd() {
  return "";
}
function bi(e, t) {
  if (e && Object.prototype.hasOwnProperty.call(e, t))
    return e[t];
}
function kw(e, t) {
  return (!t || !("root" in t)) && (t = t ? pt.createFrame(t) : {}, t.root = e), t;
}
function md(e, t, r, n, i, a) {
  if (e.decorator) {
    var s = {};
    t = e.decorator(t, s, r, n && n[0], i, a, n), wr.extend(t, s);
  }
  return t;
}
function Ru(e, t, r) {
  t && Object.keys(t).forEach(function(n) {
    var i = t[n];
    e[n] = Fw(i, r);
  });
}
function Fw(e, t) {
  var r = t.lookupProperty;
  return Ow.wrapHelper(e, function(n) {
    return n.lookupProperty = r, n;
  });
}
var Ys = { exports: {} };
(function(e, t) {
  t.__esModule = !0, t.default = function(r) {
    (function() {
      typeof globalThis != "object" && (Object.prototype.__defineGetter__("__magic__", function() {
        return this;
      }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__);
    })();
    var n = globalThis.Handlebars;
    r.noConflict = function() {
      return globalThis.Handlebars === r && (globalThis.Handlebars = n), r;
    };
  }, e.exports = t.default;
})(Ys, Ys.exports);
var gd = Ys.exports;
(function(e, t) {
  t.__esModule = !0;
  function r(y) {
    return y && y.__esModule ? y : { default: y };
  }
  function n(y) {
    if (y && y.__esModule)
      return y;
    var S = {};
    if (y != null)
      for (var _ in y)
        Object.prototype.hasOwnProperty.call(y, _) && (S[_] = y[_]);
    return S.default = y, S;
  }
  var i = Ve, a = n(i), s = Cw, c = r(s), l = We, f = r(l), o = te, d = n(o), u = Mt, h = n(u), p = gd, m = r(p);
  function g() {
    var y = new a.HandlebarsEnvironment();
    return d.extend(y, a), y.SafeString = c.default, y.Exception = f.default, y.Utils = d, y.escapeExpression = d.escapeExpression, y.VM = h, y.template = function(S) {
      return h.template(S, y);
    }, y;
  }
  var E = g();
  E.create = g, m.default(E), E.default = E, t.default = E, e.exports = t.default;
})(Ls, Ls.exports);
var Uw = Ls.exports, Xs = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  var r = {
    // Public API used to evaluate derived attributes regarding AST nodes
    helpers: {
      // a mustache is definitely a helper if:
      // * it is an eligible helper, and
      // * it has at least one parameter or hash segment
      helperExpression: function(i) {
        return i.type === "SubExpression" || (i.type === "MustacheStatement" || i.type === "BlockStatement") && !!(i.params && i.params.length || i.hash);
      },
      scopedId: function(i) {
        return /^\.|this\b/.test(i.original);
      },
      // an ID is simple if it only has one part, and that part is not
      // `..` or `this`.
      simpleId: function(i) {
        return i.parts.length === 1 && !r.helpers.scopedId(i) && !i.depth;
      }
    }
  };
  t.default = r, e.exports = t.default;
})(Xs, Xs.exports);
var vd = Xs.exports, Fn = {}, Ks = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  var r = function() {
    var n = {
      trace: function() {
      },
      yy: {},
      symbols_: { error: 2, root: 3, program: 4, EOF: 5, program_repetition0: 6, statement: 7, mustache: 8, block: 9, rawBlock: 10, partial: 11, partialBlock: 12, content: 13, COMMENT: 14, CONTENT: 15, openRawBlock: 16, rawBlock_repetition0: 17, END_RAW_BLOCK: 18, OPEN_RAW_BLOCK: 19, helperName: 20, openRawBlock_repetition0: 21, openRawBlock_option0: 22, CLOSE_RAW_BLOCK: 23, openBlock: 24, block_option0: 25, closeBlock: 26, openInverse: 27, block_option1: 28, OPEN_BLOCK: 29, openBlock_repetition0: 30, openBlock_option0: 31, openBlock_option1: 32, CLOSE: 33, OPEN_INVERSE: 34, openInverse_repetition0: 35, openInverse_option0: 36, openInverse_option1: 37, openInverseChain: 38, OPEN_INVERSE_CHAIN: 39, openInverseChain_repetition0: 40, openInverseChain_option0: 41, openInverseChain_option1: 42, inverseAndProgram: 43, INVERSE: 44, inverseChain: 45, inverseChain_option0: 46, OPEN_ENDBLOCK: 47, OPEN: 48, mustache_repetition0: 49, mustache_option0: 50, OPEN_UNESCAPED: 51, mustache_repetition1: 52, mustache_option1: 53, CLOSE_UNESCAPED: 54, OPEN_PARTIAL: 55, partialName: 56, partial_repetition0: 57, partial_option0: 58, openPartialBlock: 59, OPEN_PARTIAL_BLOCK: 60, openPartialBlock_repetition0: 61, openPartialBlock_option0: 62, param: 63, sexpr: 64, OPEN_SEXPR: 65, sexpr_repetition0: 66, sexpr_option0: 67, CLOSE_SEXPR: 68, hash: 69, hash_repetition_plus0: 70, hashSegment: 71, ID: 72, EQUALS: 73, blockParams: 74, OPEN_BLOCK_PARAMS: 75, blockParams_repetition_plus0: 76, CLOSE_BLOCK_PARAMS: 77, path: 78, dataName: 79, STRING: 80, NUMBER: 81, BOOLEAN: 82, UNDEFINED: 83, NULL: 84, DATA: 85, pathSegments: 86, SEP: 87, $accept: 0, $end: 1 },
      terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
      productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
      performAction: function(c, l, f, o, d, u, h) {
        var p = u.length - 1;
        switch (d) {
          case 1:
            return u[p - 1];
          case 2:
            this.$ = o.prepareProgram(u[p]);
            break;
          case 3:
            this.$ = u[p];
            break;
          case 4:
            this.$ = u[p];
            break;
          case 5:
            this.$ = u[p];
            break;
          case 6:
            this.$ = u[p];
            break;
          case 7:
            this.$ = u[p];
            break;
          case 8:
            this.$ = u[p];
            break;
          case 9:
            this.$ = {
              type: "CommentStatement",
              value: o.stripComment(u[p]),
              strip: o.stripFlags(u[p], u[p]),
              loc: o.locInfo(this._$)
            };
            break;
          case 10:
            this.$ = {
              type: "ContentStatement",
              original: u[p],
              value: u[p],
              loc: o.locInfo(this._$)
            };
            break;
          case 11:
            this.$ = o.prepareRawBlock(u[p - 2], u[p - 1], u[p], this._$);
            break;
          case 12:
            this.$ = { path: u[p - 3], params: u[p - 2], hash: u[p - 1] };
            break;
          case 13:
            this.$ = o.prepareBlock(u[p - 3], u[p - 2], u[p - 1], u[p], !1, this._$);
            break;
          case 14:
            this.$ = o.prepareBlock(u[p - 3], u[p - 2], u[p - 1], u[p], !0, this._$);
            break;
          case 15:
            this.$ = { open: u[p - 5], path: u[p - 4], params: u[p - 3], hash: u[p - 2], blockParams: u[p - 1], strip: o.stripFlags(u[p - 5], u[p]) };
            break;
          case 16:
            this.$ = { path: u[p - 4], params: u[p - 3], hash: u[p - 2], blockParams: u[p - 1], strip: o.stripFlags(u[p - 5], u[p]) };
            break;
          case 17:
            this.$ = { path: u[p - 4], params: u[p - 3], hash: u[p - 2], blockParams: u[p - 1], strip: o.stripFlags(u[p - 5], u[p]) };
            break;
          case 18:
            this.$ = { strip: o.stripFlags(u[p - 1], u[p - 1]), program: u[p] };
            break;
          case 19:
            var m = o.prepareBlock(u[p - 2], u[p - 1], u[p], u[p], !1, this._$), g = o.prepareProgram([m], u[p - 1].loc);
            g.chained = !0, this.$ = { strip: u[p - 2].strip, program: g, chain: !0 };
            break;
          case 20:
            this.$ = u[p];
            break;
          case 21:
            this.$ = { path: u[p - 1], strip: o.stripFlags(u[p - 2], u[p]) };
            break;
          case 22:
            this.$ = o.prepareMustache(u[p - 3], u[p - 2], u[p - 1], u[p - 4], o.stripFlags(u[p - 4], u[p]), this._$);
            break;
          case 23:
            this.$ = o.prepareMustache(u[p - 3], u[p - 2], u[p - 1], u[p - 4], o.stripFlags(u[p - 4], u[p]), this._$);
            break;
          case 24:
            this.$ = {
              type: "PartialStatement",
              name: u[p - 3],
              params: u[p - 2],
              hash: u[p - 1],
              indent: "",
              strip: o.stripFlags(u[p - 4], u[p]),
              loc: o.locInfo(this._$)
            };
            break;
          case 25:
            this.$ = o.preparePartialBlock(u[p - 2], u[p - 1], u[p], this._$);
            break;
          case 26:
            this.$ = { path: u[p - 3], params: u[p - 2], hash: u[p - 1], strip: o.stripFlags(u[p - 4], u[p]) };
            break;
          case 27:
            this.$ = u[p];
            break;
          case 28:
            this.$ = u[p];
            break;
          case 29:
            this.$ = {
              type: "SubExpression",
              path: u[p - 3],
              params: u[p - 2],
              hash: u[p - 1],
              loc: o.locInfo(this._$)
            };
            break;
          case 30:
            this.$ = { type: "Hash", pairs: u[p], loc: o.locInfo(this._$) };
            break;
          case 31:
            this.$ = { type: "HashPair", key: o.id(u[p - 2]), value: u[p], loc: o.locInfo(this._$) };
            break;
          case 32:
            this.$ = o.id(u[p - 1]);
            break;
          case 33:
            this.$ = u[p];
            break;
          case 34:
            this.$ = u[p];
            break;
          case 35:
            this.$ = { type: "StringLiteral", value: u[p], original: u[p], loc: o.locInfo(this._$) };
            break;
          case 36:
            this.$ = { type: "NumberLiteral", value: Number(u[p]), original: Number(u[p]), loc: o.locInfo(this._$) };
            break;
          case 37:
            this.$ = { type: "BooleanLiteral", value: u[p] === "true", original: u[p] === "true", loc: o.locInfo(this._$) };
            break;
          case 38:
            this.$ = { type: "UndefinedLiteral", original: void 0, value: void 0, loc: o.locInfo(this._$) };
            break;
          case 39:
            this.$ = { type: "NullLiteral", original: null, value: null, loc: o.locInfo(this._$) };
            break;
          case 40:
            this.$ = u[p];
            break;
          case 41:
            this.$ = u[p];
            break;
          case 42:
            this.$ = o.preparePath(!0, u[p], this._$);
            break;
          case 43:
            this.$ = o.preparePath(!1, u[p], this._$);
            break;
          case 44:
            u[p - 2].push({ part: o.id(u[p]), original: u[p], separator: u[p - 1] }), this.$ = u[p - 2];
            break;
          case 45:
            this.$ = [{ part: o.id(u[p]), original: u[p] }];
            break;
          case 46:
            this.$ = [];
            break;
          case 47:
            u[p - 1].push(u[p]);
            break;
          case 48:
            this.$ = [];
            break;
          case 49:
            u[p - 1].push(u[p]);
            break;
          case 50:
            this.$ = [];
            break;
          case 51:
            u[p - 1].push(u[p]);
            break;
          case 58:
            this.$ = [];
            break;
          case 59:
            u[p - 1].push(u[p]);
            break;
          case 64:
            this.$ = [];
            break;
          case 65:
            u[p - 1].push(u[p]);
            break;
          case 70:
            this.$ = [];
            break;
          case 71:
            u[p - 1].push(u[p]);
            break;
          case 78:
            this.$ = [];
            break;
          case 79:
            u[p - 1].push(u[p]);
            break;
          case 82:
            this.$ = [];
            break;
          case 83:
            u[p - 1].push(u[p]);
            break;
          case 86:
            this.$ = [];
            break;
          case 87:
            u[p - 1].push(u[p]);
            break;
          case 90:
            this.$ = [];
            break;
          case 91:
            u[p - 1].push(u[p]);
            break;
          case 94:
            this.$ = [];
            break;
          case 95:
            u[p - 1].push(u[p]);
            break;
          case 98:
            this.$ = [u[p]];
            break;
          case 99:
            u[p - 1].push(u[p]);
            break;
          case 100:
            this.$ = [u[p]];
            break;
          case 101:
            u[p - 1].push(u[p]);
            break;
        }
      },
      table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
      defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
      parseError: function(c, l) {
        throw new Error(c);
      },
      parse: function(c) {
        var l = this, f = [0], o = [null], d = [], u = this.table, h = "", p = 0, m = 0;
        this.lexer.setInput(c), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, typeof this.lexer.yylloc > "u" && (this.lexer.yylloc = {});
        var g = this.lexer.yylloc;
        d.push(g);
        var E = this.lexer.options && this.lexer.options.ranges;
        typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
        function y() {
          var K;
          return K = l.lexer.lex() || 1, typeof K != "number" && (K = l.symbols_[K] || K), K;
        }
        for (var S, _, A, I, T = {}, $, C, F, H; ; ) {
          if (_ = f[f.length - 1], this.defaultActions[_] ? A = this.defaultActions[_] : ((S === null || typeof S > "u") && (S = y()), A = u[_] && u[_][S]), typeof A > "u" || !A.length || !A[0]) {
            var G = "";
            {
              H = [];
              for ($ in u[_]) this.terminals_[$] && $ > 2 && H.push("'" + this.terminals_[$] + "'");
              this.lexer.showPosition ? G = "Parse error on line " + (p + 1) + `:
` + this.lexer.showPosition() + `
Expecting ` + H.join(", ") + ", got '" + (this.terminals_[S] || S) + "'" : G = "Parse error on line " + (p + 1) + ": Unexpected " + (S == 1 ? "end of input" : "'" + (this.terminals_[S] || S) + "'"), this.parseError(G, { text: this.lexer.match, token: this.terminals_[S] || S, line: this.lexer.yylineno, loc: g, expected: H });
            }
          }
          if (A[0] instanceof Array && A.length > 1)
            throw new Error("Parse Error: multiple actions possible at state: " + _ + ", token: " + S);
          switch (A[0]) {
            case 1:
              f.push(S), o.push(this.lexer.yytext), d.push(this.lexer.yylloc), f.push(A[1]), S = null, m = this.lexer.yyleng, h = this.lexer.yytext, p = this.lexer.yylineno, g = this.lexer.yylloc;
              break;
            case 2:
              if (C = this.productions_[A[1]][1], T.$ = o[o.length - C], T._$ = { first_line: d[d.length - (C || 1)].first_line, last_line: d[d.length - 1].last_line, first_column: d[d.length - (C || 1)].first_column, last_column: d[d.length - 1].last_column }, E && (T._$.range = [d[d.length - (C || 1)].range[0], d[d.length - 1].range[1]]), I = this.performAction.call(T, h, m, p, this.yy, A[1], o, d), typeof I < "u")
                return I;
              C && (f = f.slice(0, -1 * C * 2), o = o.slice(0, -1 * C), d = d.slice(0, -1 * C)), f.push(this.productions_[A[1]][0]), o.push(T.$), d.push(T._$), F = u[f[f.length - 2]][f[f.length - 1]], f.push(F);
              break;
            case 3:
              return !0;
          }
        }
        return !0;
      }
    }, i = function() {
      var s = {
        EOF: 1,
        parseError: function(l, f) {
          if (this.yy.parser)
            this.yy.parser.parseError(l, f);
          else
            throw new Error(l);
        },
        setInput: function(l) {
          return this._input = l, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
        },
        input: function() {
          var l = this._input[0];
          this.yytext += l, this.yyleng++, this.offset++, this.match += l, this.matched += l;
          var f = l.match(/(?:\r\n?|\n).*/g);
          return f ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), l;
        },
        unput: function(l) {
          var f = l.length, o = l.split(/(?:\r\n?|\n)/g);
          this._input = l + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - f - 1), this.offset -= f;
          var d = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), o.length - 1 && (this.yylineno -= o.length - 1);
          var u = this.yylloc.range;
          return this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: o ? (o.length === d.length ? this.yylloc.first_column : 0) + d[d.length - o.length].length - o[0].length : this.yylloc.first_column - f
          }, this.options.ranges && (this.yylloc.range = [u[0], u[0] + this.yyleng - f]), this;
        },
        more: function() {
          return this._more = !0, this;
        },
        less: function(l) {
          this.unput(this.match.slice(l));
        },
        pastInput: function() {
          var l = this.matched.substr(0, this.matched.length - this.match.length);
          return (l.length > 20 ? "..." : "") + l.substr(-20).replace(/\n/g, "");
        },
        upcomingInput: function() {
          var l = this.match;
          return l.length < 20 && (l += this._input.substr(0, 20 - l.length)), (l.substr(0, 20) + (l.length > 20 ? "..." : "")).replace(/\n/g, "");
        },
        showPosition: function() {
          var l = this.pastInput(), f = new Array(l.length + 1).join("-");
          return l + this.upcomingInput() + `
` + f + "^";
        },
        next: function() {
          if (this.done)
            return this.EOF;
          this._input || (this.done = !0);
          var l, f, o, d, u;
          this._more || (this.yytext = "", this.match = "");
          for (var h = this._currentRules(), p = 0; p < h.length && (o = this._input.match(this.rules[h[p]]), !(o && (!f || o[0].length > f[0].length) && (f = o, d = p, !this.options.flex))); p++)
            ;
          return f ? (u = f[0].match(/(?:\r\n?|\n).*/g), u && (this.yylineno += u.length), this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: u ? u[u.length - 1].length - u[u.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + f[0].length
          }, this.yytext += f[0], this.match += f[0], this.matches = f, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(f[0].length), this.matched += f[0], l = this.performAction.call(this, this.yy, this, h[d], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), l || void 0) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
        },
        lex: function() {
          var l = this.next();
          return typeof l < "u" ? l : this.lex();
        },
        begin: function(l) {
          this.conditionStack.push(l);
        },
        popState: function() {
          return this.conditionStack.pop();
        },
        _currentRules: function() {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        },
        topState: function() {
          return this.conditionStack[this.conditionStack.length - 2];
        },
        pushState: function(l) {
          this.begin(l);
        }
      };
      return s.options = {}, s.performAction = function(l, f, o, d) {
        function u(h, p) {
          return f.yytext = f.yytext.substring(h, f.yyleng - p + h);
        }
        switch (o) {
          case 0:
            if (f.yytext.slice(-2) === "\\\\" ? (u(0, 1), this.begin("mu")) : f.yytext.slice(-1) === "\\" ? (u(0, 1), this.begin("emu")) : this.begin("mu"), f.yytext) return 15;
            break;
          case 1:
            return 15;
          case 2:
            return this.popState(), 15;
          case 3:
            return this.begin("raw"), 15;
          case 4:
            return this.popState(), this.conditionStack[this.conditionStack.length - 1] === "raw" ? 15 : (u(5, 9), "END_RAW_BLOCK");
          case 5:
            return 15;
          case 6:
            return this.popState(), 14;
          case 7:
            return 65;
          case 8:
            return 68;
          case 9:
            return 19;
          case 10:
            return this.popState(), this.begin("raw"), 23;
          case 11:
            return 55;
          case 12:
            return 60;
          case 13:
            return 29;
          case 14:
            return 47;
          case 15:
            return this.popState(), 44;
          case 16:
            return this.popState(), 44;
          case 17:
            return 34;
          case 18:
            return 39;
          case 19:
            return 51;
          case 20:
            return 48;
          case 21:
            this.unput(f.yytext), this.popState(), this.begin("com");
            break;
          case 22:
            return this.popState(), 14;
          case 23:
            return 48;
          case 24:
            return 73;
          case 25:
            return 72;
          case 26:
            return 72;
          case 27:
            return 87;
          case 28:
            break;
          case 29:
            return this.popState(), 54;
          case 30:
            return this.popState(), 33;
          case 31:
            return f.yytext = u(1, 2).replace(/\\"/g, '"'), 80;
          case 32:
            return f.yytext = u(1, 2).replace(/\\'/g, "'"), 80;
          case 33:
            return 85;
          case 34:
            return 82;
          case 35:
            return 82;
          case 36:
            return 83;
          case 37:
            return 84;
          case 38:
            return 81;
          case 39:
            return 75;
          case 40:
            return 77;
          case 41:
            return 72;
          case 42:
            return f.yytext = f.yytext.replace(/\\([\\\]])/g, "$1"), 72;
          case 43:
            return "INVALID";
          case 44:
            return 5;
        }
      }, s.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/], s.conditions = { mu: { rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], inclusive: !1 }, emu: { rules: [2], inclusive: !1 }, com: { rules: [6], inclusive: !1 }, raw: { rules: [3, 4, 5], inclusive: !1 }, INITIAL: { rules: [0, 1, 44], inclusive: !0 } }, s;
    }();
    n.lexer = i;
    function a() {
      this.yy = {};
    }
    return a.prototype = n, n.Parser = a, new a();
  }();
  t.default = r, e.exports = t.default;
})(Ks, Ks.exports);
var Mw = Ks.exports, Js = { exports: {} }, Qs = { exports: {} };
(function(e, t) {
  t.__esModule = !0;
  function r(f) {
    return f && f.__esModule ? f : { default: f };
  }
  var n = We, i = r(n);
  function a() {
    this.parents = [];
  }
  a.prototype = {
    constructor: a,
    mutating: !1,
    // Visits a given value. If mutating, will replace the value if necessary.
    acceptKey: function(o, d) {
      var u = this.accept(o[d]);
      if (this.mutating) {
        if (u && !a.prototype[u.type])
          throw new i.default('Unexpected node type "' + u.type + '" found when accepting ' + d + " on " + o.type);
        o[d] = u;
      }
    },
    // Performs an accept operation with added sanity check to ensure
    // required keys are not removed.
    acceptRequired: function(o, d) {
      if (this.acceptKey(o, d), !o[d])
        throw new i.default(o.type + " requires " + d);
    },
    // Traverses a given array. If mutating, empty respnses will be removed
    // for child elements.
    acceptArray: function(o) {
      for (var d = 0, u = o.length; d < u; d++)
        this.acceptKey(o, d), o[d] || (o.splice(d, 1), d--, u--);
    },
    accept: function(o) {
      if (o) {
        if (!this[o.type])
          throw new i.default("Unknown type: " + o.type, o);
        this.current && this.parents.unshift(this.current), this.current = o;
        var d = this[o.type](o);
        if (this.current = this.parents.shift(), !this.mutating || d)
          return d;
        if (d !== !1)
          return o;
      }
    },
    Program: function(o) {
      this.acceptArray(o.body);
    },
    MustacheStatement: s,
    Decorator: s,
    BlockStatement: c,
    DecoratorBlock: c,
    PartialStatement: l,
    PartialBlockStatement: function(o) {
      l.call(this, o), this.acceptKey(o, "program");
    },
    ContentStatement: function() {
    },
    CommentStatement: function() {
    },
    SubExpression: s,
    PathExpression: function() {
    },
    StringLiteral: function() {
    },
    NumberLiteral: function() {
    },
    BooleanLiteral: function() {
    },
    UndefinedLiteral: function() {
    },
    NullLiteral: function() {
    },
    Hash: function(o) {
      this.acceptArray(o.pairs);
    },
    HashPair: function(o) {
      this.acceptRequired(o, "value");
    }
  };
  function s(f) {
    this.acceptRequired(f, "path"), this.acceptArray(f.params), this.acceptKey(f, "hash");
  }
  function c(f) {
    s.call(this, f), this.acceptKey(f, "program"), this.acceptKey(f, "inverse");
  }
  function l(f) {
    this.acceptRequired(f, "name"), this.acceptArray(f.params), this.acceptKey(f, "hash");
  }
  t.default = a, e.exports = t.default;
})(Qs, Qs.exports);
var Ko = Qs.exports;
(function(e, t) {
  t.__esModule = !0;
  function r(o) {
    return o && o.__esModule ? o : { default: o };
  }
  var n = Ko, i = r(n);
  function a() {
    var o = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
    this.options = o;
  }
  a.prototype = new i.default(), a.prototype.Program = function(o) {
    var d = !this.options.ignoreStandalone, u = !this.isRootSeen;
    this.isRootSeen = !0;
    for (var h = o.body, p = 0, m = h.length; p < m; p++) {
      var g = h[p], E = this.accept(g);
      if (E) {
        var y = s(h, p, u), S = c(h, p, u), _ = E.openStandalone && y, A = E.closeStandalone && S, I = E.inlineStandalone && y && S;
        E.close && l(h, p, !0), E.open && f(h, p, !0), d && I && (l(h, p), f(h, p) && g.type === "PartialStatement" && (g.indent = /([ \t]+$)/.exec(h[p - 1].original)[1])), d && _ && (l((g.program || g.inverse).body), f(h, p)), d && A && (l(h, p), f((g.inverse || g.program).body));
      }
    }
    return o;
  }, a.prototype.BlockStatement = a.prototype.DecoratorBlock = a.prototype.PartialBlockStatement = function(o) {
    this.accept(o.program), this.accept(o.inverse);
    var d = o.program || o.inverse, u = o.program && o.inverse, h = u, p = u;
    if (u && u.chained)
      for (h = u.body[0].program; p.chained; )
        p = p.body[p.body.length - 1].program;
    var m = {
      open: o.openStrip.open,
      close: o.closeStrip.close,
      // Determine the standalone candiacy. Basically flag our content as being possibly standalone
      // so our parent can determine if we actually are standalone
      openStandalone: c(d.body),
      closeStandalone: s((h || d).body)
    };
    if (o.openStrip.close && l(d.body, null, !0), u) {
      var g = o.inverseStrip;
      g.open && f(d.body, null, !0), g.close && l(h.body, null, !0), o.closeStrip.open && f(p.body, null, !0), !this.options.ignoreStandalone && s(d.body) && c(h.body) && (f(d.body), l(h.body));
    } else o.closeStrip.open && f(d.body, null, !0);
    return m;
  }, a.prototype.Decorator = a.prototype.MustacheStatement = function(o) {
    return o.strip;
  }, a.prototype.PartialStatement = a.prototype.CommentStatement = function(o) {
    var d = o.strip || {};
    return {
      inlineStandalone: !0,
      open: d.open,
      close: d.close
    };
  };
  function s(o, d, u) {
    d === void 0 && (d = o.length);
    var h = o[d - 1], p = o[d - 2];
    if (!h)
      return u;
    if (h.type === "ContentStatement")
      return (p || !u ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(h.original);
  }
  function c(o, d, u) {
    d === void 0 && (d = -1);
    var h = o[d + 1], p = o[d + 2];
    if (!h)
      return u;
    if (h.type === "ContentStatement")
      return (p || !u ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(h.original);
  }
  function l(o, d, u) {
    var h = o[d == null ? 0 : d + 1];
    if (!(!h || h.type !== "ContentStatement" || !u && h.rightStripped)) {
      var p = h.value;
      h.value = h.value.replace(u ? /^\s+/ : /^[ \t]*\r?\n?/, ""), h.rightStripped = h.value !== p;
    }
  }
  function f(o, d, u) {
    var h = o[d == null ? o.length - 1 : d - 1];
    if (!(!h || h.type !== "ContentStatement" || !u && h.leftStripped)) {
      var p = h.value;
      return h.value = h.value.replace(u ? /\s+$/ : /[ \t]+$/, ""), h.leftStripped = h.value !== p, h.leftStripped;
    }
  }
  t.default = a, e.exports = t.default;
})(Js, Js.exports);
var $w = Js.exports, ze = {};
ze.__esModule = !0;
ze.SourceLocation = qw;
ze.id = jw;
ze.stripFlags = Gw;
ze.stripComment = Vw;
ze.preparePath = Ww;
ze.prepareMustache = zw;
ze.prepareRawBlock = Yw;
ze.prepareBlock = Xw;
ze.prepareProgram = Kw;
ze.preparePartialBlock = Jw;
function Bw(e) {
  return e && e.__esModule ? e : { default: e };
}
var Hw = We, Jo = Bw(Hw);
function Qo(e, t) {
  if (t = t.path ? t.path.original : t, e.path.original !== t) {
    var r = { loc: e.path.loc };
    throw new Jo.default(e.path.original + " doesn't match " + t, r);
  }
}
function qw(e, t) {
  this.source = e, this.start = {
    line: t.first_line,
    column: t.first_column
  }, this.end = {
    line: t.last_line,
    column: t.last_column
  };
}
function jw(e) {
  return /^\[.*\]$/.test(e) ? e.substring(1, e.length - 1) : e;
}
function Gw(e, t) {
  return {
    open: e.charAt(2) === "~",
    close: t.charAt(t.length - 3) === "~"
  };
}
function Vw(e) {
  return e.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
}
function Ww(e, t, r) {
  r = this.locInfo(r);
  for (var n = e ? "@" : "", i = [], a = 0, s = 0, c = t.length; s < c; s++) {
    var l = t[s].part, f = t[s].original !== l;
    if (n += (t[s].separator || "") + l, !f && (l === ".." || l === "." || l === "this")) {
      if (i.length > 0)
        throw new Jo.default("Invalid path: " + n, { loc: r });
      l === ".." && a++;
    } else
      i.push(l);
  }
  return {
    type: "PathExpression",
    data: e,
    depth: a,
    parts: i,
    original: n,
    loc: r
  };
}
function zw(e, t, r, n, i, a) {
  var s = n.charAt(3) || n.charAt(2), c = s !== "{" && s !== "&", l = /\*/.test(n);
  return {
    type: l ? "Decorator" : "MustacheStatement",
    path: e,
    params: t,
    hash: r,
    escaped: c,
    strip: i,
    loc: this.locInfo(a)
  };
}
function Yw(e, t, r, n) {
  Qo(e, r), n = this.locInfo(n);
  var i = {
    type: "Program",
    body: t,
    strip: {},
    loc: n
  };
  return {
    type: "BlockStatement",
    path: e.path,
    params: e.params,
    hash: e.hash,
    program: i,
    openStrip: {},
    inverseStrip: {},
    closeStrip: {},
    loc: n
  };
}
function Xw(e, t, r, n, i, a) {
  n && n.path && Qo(e, n);
  var s = /\*/.test(e.open);
  t.blockParams = e.blockParams;
  var c = void 0, l = void 0;
  if (r) {
    if (s)
      throw new Jo.default("Unexpected inverse block on decorator", r);
    r.chain && (r.program.body[0].closeStrip = n.strip), l = r.strip, c = r.program;
  }
  return i && (i = c, c = t, t = i), {
    type: s ? "DecoratorBlock" : "BlockStatement",
    path: e.path,
    params: e.params,
    hash: e.hash,
    program: t,
    inverse: c,
    openStrip: e.strip,
    inverseStrip: l,
    closeStrip: n && n.strip,
    loc: this.locInfo(a)
  };
}
function Kw(e, t) {
  if (!t && e.length) {
    var r = e[0].loc, n = e[e.length - 1].loc;
    r && n && (t = {
      source: r.source,
      start: {
        line: r.start.line,
        column: r.start.column
      },
      end: {
        line: n.end.line,
        column: n.end.column
      }
    });
  }
  return {
    type: "Program",
    body: e,
    strip: {},
    loc: t
  };
}
function Jw(e, t, r, n) {
  return Qo(e, r), {
    type: "PartialBlockStatement",
    name: e.path,
    params: e.params,
    hash: e.hash,
    program: t,
    openStrip: e.strip,
    closeStrip: r && r.strip,
    loc: this.locInfo(n)
  };
}
Fn.__esModule = !0;
Fn.parseWithoutProcessing = yd;
Fn.parse = sb;
function Qw(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
  return t.default = e, t;
}
function Zo(e) {
  return e && e.__esModule ? e : { default: e };
}
var Zw = Mw, Zs = Zo(Zw), eb = $w, tb = Zo(eb), rb = ze, nb = Qw(rb), ib = We, zr = Zo(ib), ab = te;
Fn.parser = Zs.default;
var Si = {};
ab.extend(Si, nb);
function yd(e, t) {
  if (e.type === "Program")
    return ob(e), e;
  Zs.default.yy = Si, Si.locInfo = function(n) {
    return new Si.SourceLocation(t && t.srcName, n);
  };
  var r = Zs.default.parse(e);
  return r;
}
function sb(e, t) {
  var r = yd(e, t), n = new tb.default(t);
  return n.accept(r);
}
function ob(e) {
  eo(e);
}
function eo(e) {
  if (e != null) {
    if (Array.isArray(e)) {
      e.forEach(eo);
      return;
    }
    if (typeof e == "object") {
      if (e.type === "PathExpression") {
        if (!lb(e.depth))
          throw new zr.default("Invalid AST: PathExpression.depth must be an integer");
        if (!Array.isArray(e.parts))
          throw new zr.default("Invalid AST: PathExpression.parts must be an array");
        for (var t = 0; t < e.parts.length; t++)
          if (typeof e.parts[t] != "string")
            throw new zr.default("Invalid AST: PathExpression.parts must only contain strings");
      } else if (e.type === "NumberLiteral") {
        if (typeof e.value != "number" || !isFinite(e.value))
          throw new zr.default("Invalid AST: NumberLiteral.value must be a number");
      } else if (e.type === "BooleanLiteral" && typeof e.value != "boolean")
        throw new zr.default("Invalid AST: BooleanLiteral.value must be a boolean");
      Object.keys(e).forEach(function(r) {
        r !== "loc" && eo(e[r]);
      });
    }
  }
}
function lb(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e && e >= 0;
}
var Un = {};
Un.__esModule = !0;
Un.Compiler = to;
Un.precompile = hb;
Un.compile = db;
function _d(e) {
  return e && e.__esModule ? e : { default: e };
}
var cb = We, nn = _d(cb), En = te, ub = vd, Yr = _d(ub), fb = [].slice;
function to() {
}
to.prototype = {
  compiler: to,
  equals: function(t) {
    var r = this.opcodes.length;
    if (t.opcodes.length !== r)
      return !1;
    for (var n = 0; n < r; n++) {
      var i = this.opcodes[n], a = t.opcodes[n];
      if (i.opcode !== a.opcode || !Ed(i.args, a.args))
        return !1;
    }
    r = this.children.length;
    for (var n = 0; n < r; n++)
      if (!this.children[n].equals(t.children[n]))
        return !1;
    return !0;
  },
  guid: 0,
  compile: function(t, r) {
    return this.sourceNode = [], this.opcodes = [], this.children = [], this.options = r, this.stringParams = r.stringParams, this.trackIds = r.trackIds, r.blockParams = r.blockParams || [], r.knownHelpers = En.extend(/* @__PURE__ */ Object.create(null), {
      helperMissing: !0,
      blockHelperMissing: !0,
      each: !0,
      if: !0,
      unless: !0,
      with: !0,
      log: !0,
      lookup: !0
    }, r.knownHelpers), this.accept(t);
  },
  compileProgram: function(t) {
    var r = new this.compiler(), n = r.compile(t, this.options), i = this.guid++;
    return this.usePartial = this.usePartial || n.usePartial, this.children[i] = n, this.useDepths = this.useDepths || n.useDepths, i;
  },
  accept: function(t) {
    if (!this[t.type])
      throw new nn.default("Unknown type: " + t.type, t);
    this.sourceNode.unshift(t);
    var r = this[t.type](t);
    return this.sourceNode.shift(), r;
  },
  Program: function(t) {
    this.options.blockParams.unshift(t.blockParams);
    for (var r = t.body, n = r.length, i = 0; i < n; i++)
      this.accept(r[i]);
    return this.options.blockParams.shift(), this.isSimple = n === 1, this.blockParams = t.blockParams ? t.blockParams.length : 0, this;
  },
  BlockStatement: function(t) {
    Du(t);
    var r = t.program, n = t.inverse;
    r = r && this.compileProgram(r), n = n && this.compileProgram(n);
    var i = this.classifySexpr(t);
    i === "helper" ? this.helperSexpr(t, r, n) : i === "simple" ? (this.simpleSexpr(t), this.opcode("pushProgram", r), this.opcode("pushProgram", n), this.opcode("emptyHash"), this.opcode("blockValue", t.path.original)) : (this.ambiguousSexpr(t, r, n), this.opcode("pushProgram", r), this.opcode("pushProgram", n), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append");
  },
  DecoratorBlock: function(t) {
    var r = t.program && this.compileProgram(t.program), n = this.setupFullMustacheParams(t, r, void 0), i = t.path;
    this.useDecorators = !0, this.opcode("registerDecorator", n.length, i.original);
  },
  PartialStatement: function(t) {
    this.usePartial = !0;
    var r = t.program;
    r && (r = this.compileProgram(t.program));
    var n = t.params;
    if (n.length > 1)
      throw new nn.default("Unsupported number of partial arguments: " + n.length, t);
    n.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : n.push({ type: "PathExpression", parts: [], depth: 0 }));
    var i = t.name.original, a = t.name.type === "SubExpression";
    a && this.accept(t.name), this.setupFullMustacheParams(t, r, void 0, !0);
    var s = t.indent || "";
    this.options.preventIndent && s && (this.opcode("appendContent", s), s = ""), this.opcode("invokePartial", a, i, s), this.opcode("append");
  },
  PartialBlockStatement: function(t) {
    this.PartialStatement(t);
  },
  MustacheStatement: function(t) {
    this.SubExpression(t), t.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append");
  },
  Decorator: function(t) {
    this.DecoratorBlock(t);
  },
  ContentStatement: function(t) {
    t.value && this.opcode("appendContent", t.value);
  },
  CommentStatement: function() {
  },
  SubExpression: function(t) {
    Du(t);
    var r = this.classifySexpr(t);
    r === "simple" ? this.simpleSexpr(t) : r === "helper" ? this.helperSexpr(t) : this.ambiguousSexpr(t);
  },
  ambiguousSexpr: function(t, r, n) {
    var i = t.path, a = i.parts[0], s = r != null || n != null;
    this.opcode("getContext", i.depth), this.opcode("pushProgram", r), this.opcode("pushProgram", n), i.strict = !0, this.accept(i), this.opcode("invokeAmbiguous", a, s);
  },
  simpleSexpr: function(t) {
    var r = t.path;
    r.strict = !0, this.accept(r), this.opcode("resolvePossibleLambda");
  },
  helperSexpr: function(t, r, n) {
    var i = this.setupFullMustacheParams(t, r, n), a = t.path, s = a.parts[0];
    if (this.options.knownHelpers[s])
      this.opcode("invokeKnownHelper", i.length, s);
    else {
      if (this.options.knownHelpersOnly)
        throw new nn.default("You specified knownHelpersOnly, but used the unknown helper " + s, t);
      a.strict = !0, a.falsy = !0, this.accept(a), this.opcode("invokeHelper", i.length, a.original, Yr.default.helpers.simpleId(a));
    }
  },
  PathExpression: function(t) {
    this.addDepth(t.depth), this.opcode("getContext", t.depth);
    var r = t.parts[0], n = Yr.default.helpers.scopedId(t), i = !t.depth && !n && this.blockParamIndex(r);
    i ? this.opcode("lookupBlockParam", i, t.parts) : r ? t.data ? (this.options.data = !0, this.opcode("lookupData", t.depth, t.parts, t.strict)) : this.opcode("lookupOnContext", t.parts, t.falsy, t.strict, n) : this.opcode("pushContext");
  },
  StringLiteral: function(t) {
    this.opcode("pushString", t.value);
  },
  NumberLiteral: function(t) {
    this.opcode("pushLiteral", t.value);
  },
  BooleanLiteral: function(t) {
    this.opcode("pushLiteral", t.value);
  },
  UndefinedLiteral: function() {
    this.opcode("pushLiteral", "undefined");
  },
  NullLiteral: function() {
    this.opcode("pushLiteral", "null");
  },
  Hash: function(t) {
    var r = t.pairs, n = 0, i = r.length;
    for (this.opcode("pushHash"); n < i; n++)
      this.pushParam(r[n].value);
    for (; n--; )
      this.opcode("assignToHash", r[n].key);
    this.opcode("popHash");
  },
  // HELPERS
  opcode: function(t) {
    this.opcodes.push({
      opcode: t,
      args: fb.call(arguments, 1),
      loc: this.sourceNode[0].loc
    });
  },
  addDepth: function(t) {
    t && (this.useDepths = !0);
  },
  classifySexpr: function(t) {
    var r = Yr.default.helpers.simpleId(t.path), n = r && !!this.blockParamIndex(t.path.parts[0]), i = !n && Yr.default.helpers.helperExpression(t), a = !n && (i || r);
    if (a && !i) {
      var s = t.path.parts[0], c = this.options;
      c.knownHelpers[s] ? i = !0 : c.knownHelpersOnly && (a = !1);
    }
    return i ? "helper" : a ? "ambiguous" : "simple";
  },
  pushParams: function(t) {
    for (var r = 0, n = t.length; r < n; r++)
      this.pushParam(t[r]);
  },
  pushParam: function(t) {
    var r = t.value != null ? t.value : t.original || "";
    if (this.stringParams)
      r.replace && (r = r.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), t.depth && this.addDepth(t.depth), this.opcode("getContext", t.depth || 0), this.opcode("pushStringParam", r, t.type), t.type === "SubExpression" && this.accept(t);
    else {
      if (this.trackIds) {
        var n = void 0;
        if (t.parts && !Yr.default.helpers.scopedId(t) && !t.depth && (n = this.blockParamIndex(t.parts[0])), n) {
          var i = t.parts.slice(1).join(".");
          this.opcode("pushId", "BlockParam", n, i);
        } else
          r = t.original || r, r.replace && (r = r.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")), this.opcode("pushId", t.type, r);
      }
      this.accept(t);
    }
  },
  setupFullMustacheParams: function(t, r, n, i) {
    var a = t.params;
    return this.pushParams(a), this.opcode("pushProgram", r), this.opcode("pushProgram", n), t.hash ? this.accept(t.hash) : this.opcode("emptyHash", i), a;
  },
  blockParamIndex: function(t) {
    for (var r = 0, n = this.options.blockParams.length; r < n; r++) {
      var i = this.options.blockParams[r], a = i && En.indexOf(i, t);
      if (i && a >= 0)
        return [r, a];
    }
  }
};
function hb(e, t, r) {
  if (e == null || typeof e != "string" && e.type !== "Program")
    throw new nn.default("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + e);
  t = t || {}, "data" in t || (t.data = !0), t.compat && (t.useDepths = !0);
  var n = r.parse(e, t), i = new r.Compiler().compile(n, t);
  return new r.JavaScriptCompiler().compile(i, t);
}
function db(e, t, r) {
  if (t === void 0 && (t = {}), e == null || typeof e != "string" && e.type !== "Program")
    throw new nn.default("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + e);
  t = En.extend({}, t), "data" in t || (t.data = !0), t.compat && (t.useDepths = !0);
  var n = void 0;
  function i() {
    var s = r.parse(e, t), c = new r.Compiler().compile(s, t), l = new r.JavaScriptCompiler().compile(c, t, void 0, !0);
    return r.template(l);
  }
  function a(s, c) {
    return n || (n = i()), n.call(this, s, c);
  }
  return a._setup = function(s) {
    return n || (n = i()), n._setup(s);
  }, a._child = function(s, c, l, f) {
    return n || (n = i()), n._child(s, c, l, f);
  }, a;
}
function Ed(e, t) {
  if (e === t)
    return !0;
  if (En.isArray(e) && En.isArray(t) && e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (!Ed(e[r], t[r]))
        return !1;
    return !0;
  }
}
function Du(e) {
  if (!e.path.parts) {
    var t = e.path;
    e.path = {
      type: "PathExpression",
      data: !1,
      depth: 0,
      parts: [t.original + ""],
      original: t.original + "",
      loc: t.loc
    };
  }
}
var ro = { exports: {} }, no = { exports: {} }, Xr = {}, cs = {}, pi = {}, mi = {}, Nu;
function pb() {
  if (Nu) return mi;
  Nu = 1;
  var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  return mi.encode = function(t) {
    if (0 <= t && t < e.length)
      return e[t];
    throw new TypeError("Must be between 0 and 63: " + t);
  }, mi.decode = function(t) {
    var r = 65, n = 90, i = 97, a = 122, s = 48, c = 57, l = 43, f = 47, o = 26, d = 52;
    return r <= t && t <= n ? t - r : i <= t && t <= a ? t - i + o : s <= t && t <= c ? t - s + d : t == l ? 62 : t == f ? 63 : -1;
  }, mi;
}
var Lu;
function wd() {
  if (Lu) return pi;
  Lu = 1;
  var e = pb(), t = 5, r = 1 << t, n = r - 1, i = r;
  function a(c) {
    return c < 0 ? (-c << 1) + 1 : (c << 1) + 0;
  }
  function s(c) {
    var l = (c & 1) === 1, f = c >> 1;
    return l ? -f : f;
  }
  return pi.encode = function(l) {
    var f = "", o, d = a(l);
    do
      o = d & n, d >>>= t, d > 0 && (o |= i), f += e.encode(o);
    while (d > 0);
    return f;
  }, pi.decode = function(l, f, o) {
    var d = l.length, u = 0, h = 0, p, m;
    do {
      if (f >= d)
        throw new Error("Expected more digits in base 64 VLQ value.");
      if (m = e.decode(l.charCodeAt(f++)), m === -1)
        throw new Error("Invalid base64 digit: " + l.charAt(f - 1));
      p = !!(m & i), m &= n, u = u + (m << h), h += t;
    } while (p);
    o.value = s(u), o.rest = f;
  }, pi;
}
var us = {}, ku;
function Mn() {
  return ku || (ku = 1, function(e) {
    function t(_, A, I) {
      if (A in _)
        return _[A];
      if (arguments.length === 3)
        return I;
      throw new Error('"' + A + '" is a required argument.');
    }
    e.getArg = t;
    var r = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, n = /^data:.+\,.+$/;
    function i(_) {
      var A = _.match(r);
      return A ? {
        scheme: A[1],
        auth: A[2],
        host: A[3],
        port: A[4],
        path: A[5]
      } : null;
    }
    e.urlParse = i;
    function a(_) {
      var A = "";
      return _.scheme && (A += _.scheme + ":"), A += "//", _.auth && (A += _.auth + "@"), _.host && (A += _.host), _.port && (A += ":" + _.port), _.path && (A += _.path), A;
    }
    e.urlGenerate = a;
    function s(_) {
      var A = _, I = i(_);
      if (I) {
        if (!I.path)
          return _;
        A = I.path;
      }
      for (var T = e.isAbsolute(A), $ = A.split(/\/+/), C, F = 0, H = $.length - 1; H >= 0; H--)
        C = $[H], C === "." ? $.splice(H, 1) : C === ".." ? F++ : F > 0 && (C === "" ? ($.splice(H + 1, F), F = 0) : ($.splice(H, 2), F--));
      return A = $.join("/"), A === "" && (A = T ? "/" : "."), I ? (I.path = A, a(I)) : A;
    }
    e.normalize = s;
    function c(_, A) {
      _ === "" && (_ = "."), A === "" && (A = ".");
      var I = i(A), T = i(_);
      if (T && (_ = T.path || "/"), I && !I.scheme)
        return T && (I.scheme = T.scheme), a(I);
      if (I || A.match(n))
        return A;
      if (T && !T.host && !T.path)
        return T.host = A, a(T);
      var $ = A.charAt(0) === "/" ? A : s(_.replace(/\/+$/, "") + "/" + A);
      return T ? (T.path = $, a(T)) : $;
    }
    e.join = c, e.isAbsolute = function(_) {
      return _.charAt(0) === "/" || r.test(_);
    };
    function l(_, A) {
      _ === "" && (_ = "."), _ = _.replace(/\/$/, "");
      for (var I = 0; A.indexOf(_ + "/") !== 0; ) {
        var T = _.lastIndexOf("/");
        if (T < 0 || (_ = _.slice(0, T), _.match(/^([^\/]+:\/)?\/*$/)))
          return A;
        ++I;
      }
      return Array(I + 1).join("../") + A.substr(_.length + 1);
    }
    e.relative = l;
    var f = function() {
      var _ = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in _);
    }();
    function o(_) {
      return _;
    }
    function d(_) {
      return h(_) ? "$" + _ : _;
    }
    e.toSetString = f ? o : d;
    function u(_) {
      return h(_) ? _.slice(1) : _;
    }
    e.fromSetString = f ? o : u;
    function h(_) {
      if (!_)
        return !1;
      var A = _.length;
      if (A < 9 || _.charCodeAt(A - 1) !== 95 || _.charCodeAt(A - 2) !== 95 || _.charCodeAt(A - 3) !== 111 || _.charCodeAt(A - 4) !== 116 || _.charCodeAt(A - 5) !== 111 || _.charCodeAt(A - 6) !== 114 || _.charCodeAt(A - 7) !== 112 || _.charCodeAt(A - 8) !== 95 || _.charCodeAt(A - 9) !== 95)
        return !1;
      for (var I = A - 10; I >= 0; I--)
        if (_.charCodeAt(I) !== 36)
          return !1;
      return !0;
    }
    function p(_, A, I) {
      var T = g(_.source, A.source);
      return T !== 0 || (T = _.originalLine - A.originalLine, T !== 0) || (T = _.originalColumn - A.originalColumn, T !== 0 || I) || (T = _.generatedColumn - A.generatedColumn, T !== 0) || (T = _.generatedLine - A.generatedLine, T !== 0) ? T : g(_.name, A.name);
    }
    e.compareByOriginalPositions = p;
    function m(_, A, I) {
      var T = _.generatedLine - A.generatedLine;
      return T !== 0 || (T = _.generatedColumn - A.generatedColumn, T !== 0 || I) || (T = g(_.source, A.source), T !== 0) || (T = _.originalLine - A.originalLine, T !== 0) || (T = _.originalColumn - A.originalColumn, T !== 0) ? T : g(_.name, A.name);
    }
    e.compareByGeneratedPositionsDeflated = m;
    function g(_, A) {
      return _ === A ? 0 : _ === null ? 1 : A === null ? -1 : _ > A ? 1 : -1;
    }
    function E(_, A) {
      var I = _.generatedLine - A.generatedLine;
      return I !== 0 || (I = _.generatedColumn - A.generatedColumn, I !== 0) || (I = g(_.source, A.source), I !== 0) || (I = _.originalLine - A.originalLine, I !== 0) || (I = _.originalColumn - A.originalColumn, I !== 0) ? I : g(_.name, A.name);
    }
    e.compareByGeneratedPositionsInflated = E;
    function y(_) {
      return JSON.parse(_.replace(/^\)]}'[^\n]*\n/, ""));
    }
    e.parseSourceMapInput = y;
    function S(_, A, I) {
      if (A = A || "", _ && (_[_.length - 1] !== "/" && A[0] !== "/" && (_ += "/"), A = _ + A), I) {
        var T = i(I);
        if (!T)
          throw new Error("sourceMapURL could not be parsed");
        if (T.path) {
          var $ = T.path.lastIndexOf("/");
          $ >= 0 && (T.path = T.path.substring(0, $ + 1));
        }
        A = c(a(T), A);
      }
      return s(A);
    }
    e.computeSourceURL = S;
  }(us)), us;
}
var fs = {}, Fu;
function bd() {
  if (Fu) return fs;
  Fu = 1;
  var e = Mn(), t = Object.prototype.hasOwnProperty, r = typeof Map < "u";
  function n() {
    this._array = [], this._set = r ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  return n.fromArray = function(a, s) {
    for (var c = new n(), l = 0, f = a.length; l < f; l++)
      c.add(a[l], s);
    return c;
  }, n.prototype.size = function() {
    return r ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  }, n.prototype.add = function(a, s) {
    var c = r ? a : e.toSetString(a), l = r ? this.has(a) : t.call(this._set, c), f = this._array.length;
    (!l || s) && this._array.push(a), l || (r ? this._set.set(a, f) : this._set[c] = f);
  }, n.prototype.has = function(a) {
    if (r)
      return this._set.has(a);
    var s = e.toSetString(a);
    return t.call(this._set, s);
  }, n.prototype.indexOf = function(a) {
    if (r) {
      var s = this._set.get(a);
      if (s >= 0)
        return s;
    } else {
      var c = e.toSetString(a);
      if (t.call(this._set, c))
        return this._set[c];
    }
    throw new Error('"' + a + '" is not in the set.');
  }, n.prototype.at = function(a) {
    if (a >= 0 && a < this._array.length)
      return this._array[a];
    throw new Error("No element indexed by " + a);
  }, n.prototype.toArray = function() {
    return this._array.slice();
  }, fs.ArraySet = n, fs;
}
var hs = {}, Uu;
function mb() {
  if (Uu) return hs;
  Uu = 1;
  var e = Mn();
  function t(n, i) {
    var a = n.generatedLine, s = i.generatedLine, c = n.generatedColumn, l = i.generatedColumn;
    return s > a || s == a && l >= c || e.compareByGeneratedPositionsInflated(n, i) <= 0;
  }
  function r() {
    this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  return r.prototype.unsortedForEach = function(i, a) {
    this._array.forEach(i, a);
  }, r.prototype.add = function(i) {
    t(this._last, i) ? (this._last = i, this._array.push(i)) : (this._sorted = !1, this._array.push(i));
  }, r.prototype.toArray = function() {
    return this._sorted || (this._array.sort(e.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
  }, hs.MappingList = r, hs;
}
var Mu;
function Sd() {
  if (Mu) return cs;
  Mu = 1;
  var e = wd(), t = Mn(), r = bd().ArraySet, n = mb().MappingList;
  function i(a) {
    a || (a = {}), this._file = t.getArg(a, "file", null), this._sourceRoot = t.getArg(a, "sourceRoot", null), this._skipValidation = t.getArg(a, "skipValidation", !1), this._sources = new r(), this._names = new r(), this._mappings = new n(), this._sourcesContents = null;
  }
  return i.prototype._version = 3, i.fromSourceMap = function(s) {
    var c = s.sourceRoot, l = new i({
      file: s.file,
      sourceRoot: c
    });
    return s.eachMapping(function(f) {
      var o = {
        generated: {
          line: f.generatedLine,
          column: f.generatedColumn
        }
      };
      f.source != null && (o.source = f.source, c != null && (o.source = t.relative(c, o.source)), o.original = {
        line: f.originalLine,
        column: f.originalColumn
      }, f.name != null && (o.name = f.name)), l.addMapping(o);
    }), s.sources.forEach(function(f) {
      var o = f;
      c !== null && (o = t.relative(c, f)), l._sources.has(o) || l._sources.add(o);
      var d = s.sourceContentFor(f);
      d != null && l.setSourceContent(f, d);
    }), l;
  }, i.prototype.addMapping = function(s) {
    var c = t.getArg(s, "generated"), l = t.getArg(s, "original", null), f = t.getArg(s, "source", null), o = t.getArg(s, "name", null);
    this._skipValidation || this._validateMapping(c, l, f, o), f != null && (f = String(f), this._sources.has(f) || this._sources.add(f)), o != null && (o = String(o), this._names.has(o) || this._names.add(o)), this._mappings.add({
      generatedLine: c.line,
      generatedColumn: c.column,
      originalLine: l != null && l.line,
      originalColumn: l != null && l.column,
      source: f,
      name: o
    });
  }, i.prototype.setSourceContent = function(s, c) {
    var l = s;
    this._sourceRoot != null && (l = t.relative(this._sourceRoot, l)), c != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[t.toSetString(l)] = c) : this._sourcesContents && (delete this._sourcesContents[t.toSetString(l)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
  }, i.prototype.applySourceMap = function(s, c, l) {
    var f = c;
    if (c == null) {
      if (s.file == null)
        throw new Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
        );
      f = s.file;
    }
    var o = this._sourceRoot;
    o != null && (f = t.relative(o, f));
    var d = new r(), u = new r();
    this._mappings.unsortedForEach(function(h) {
      if (h.source === f && h.originalLine != null) {
        var p = s.originalPositionFor({
          line: h.originalLine,
          column: h.originalColumn
        });
        p.source != null && (h.source = p.source, l != null && (h.source = t.join(l, h.source)), o != null && (h.source = t.relative(o, h.source)), h.originalLine = p.line, h.originalColumn = p.column, p.name != null && (h.name = p.name));
      }
      var m = h.source;
      m != null && !d.has(m) && d.add(m);
      var g = h.name;
      g != null && !u.has(g) && u.add(g);
    }, this), this._sources = d, this._names = u, s.sources.forEach(function(h) {
      var p = s.sourceContentFor(h);
      p != null && (l != null && (h = t.join(l, h)), o != null && (h = t.relative(o, h)), this.setSourceContent(h, p));
    }, this);
  }, i.prototype._validateMapping = function(s, c, l, f) {
    if (c && typeof c.line != "number" && typeof c.column != "number")
      throw new Error(
        "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
      );
    if (!(s && "line" in s && "column" in s && s.line > 0 && s.column >= 0 && !c && !l && !f)) {
      if (s && "line" in s && "column" in s && c && "line" in c && "column" in c && s.line > 0 && s.column >= 0 && c.line > 0 && c.column >= 0 && l)
        return;
      throw new Error("Invalid mapping: " + JSON.stringify({
        generated: s,
        source: l,
        original: c,
        name: f
      }));
    }
  }, i.prototype._serializeMappings = function() {
    for (var s = 0, c = 1, l = 0, f = 0, o = 0, d = 0, u = "", h, p, m, g, E = this._mappings.toArray(), y = 0, S = E.length; y < S; y++) {
      if (p = E[y], h = "", p.generatedLine !== c)
        for (s = 0; p.generatedLine !== c; )
          h += ";", c++;
      else if (y > 0) {
        if (!t.compareByGeneratedPositionsInflated(p, E[y - 1]))
          continue;
        h += ",";
      }
      h += e.encode(p.generatedColumn - s), s = p.generatedColumn, p.source != null && (g = this._sources.indexOf(p.source), h += e.encode(g - d), d = g, h += e.encode(p.originalLine - 1 - f), f = p.originalLine - 1, h += e.encode(p.originalColumn - l), l = p.originalColumn, p.name != null && (m = this._names.indexOf(p.name), h += e.encode(m - o), o = m)), u += h;
    }
    return u;
  }, i.prototype._generateSourcesContent = function(s, c) {
    return s.map(function(l) {
      if (!this._sourcesContents)
        return null;
      c != null && (l = t.relative(c, l));
      var f = t.toSetString(l);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, f) ? this._sourcesContents[f] : null;
    }, this);
  }, i.prototype.toJSON = function() {
    var s = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return this._file != null && (s.file = this._file), this._sourceRoot != null && (s.sourceRoot = this._sourceRoot), this._sourcesContents && (s.sourcesContent = this._generateSourcesContent(s.sources, s.sourceRoot)), s;
  }, i.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  }, cs.SourceMapGenerator = i, cs;
}
var Kr = {}, ds = {}, $u;
function gb() {
  return $u || ($u = 1, function(e) {
    e.GREATEST_LOWER_BOUND = 1, e.LEAST_UPPER_BOUND = 2;
    function t(r, n, i, a, s, c) {
      var l = Math.floor((n - r) / 2) + r, f = s(i, a[l], !0);
      return f === 0 ? l : f > 0 ? n - l > 1 ? t(l, n, i, a, s, c) : c == e.LEAST_UPPER_BOUND ? n < a.length ? n : -1 : l : l - r > 1 ? t(r, l, i, a, s, c) : c == e.LEAST_UPPER_BOUND ? l : r < 0 ? -1 : r;
    }
    e.search = function(n, i, a, s) {
      if (i.length === 0)
        return -1;
      var c = t(
        -1,
        i.length,
        n,
        i,
        a,
        s || e.GREATEST_LOWER_BOUND
      );
      if (c < 0)
        return -1;
      for (; c - 1 >= 0 && a(i[c], i[c - 1], !0) === 0; )
        --c;
      return c;
    };
  }(ds)), ds;
}
var ps = {}, Bu;
function vb() {
  if (Bu) return ps;
  Bu = 1;
  function e(n, i, a) {
    var s = n[i];
    n[i] = n[a], n[a] = s;
  }
  function t(n, i) {
    return Math.round(n + Math.random() * (i - n));
  }
  function r(n, i, a, s) {
    if (a < s) {
      var c = t(a, s), l = a - 1;
      e(n, c, s);
      for (var f = n[s], o = a; o < s; o++)
        i(n[o], f) <= 0 && (l += 1, e(n, l, o));
      e(n, l + 1, o);
      var d = l + 1;
      r(n, i, a, d - 1), r(n, i, d + 1, s);
    }
  }
  return ps.quickSort = function(n, i) {
    r(n, i, 0, n.length - 1);
  }, ps;
}
var Hu;
function yb() {
  if (Hu) return Kr;
  Hu = 1;
  var e = Mn(), t = gb(), r = bd().ArraySet, n = wd(), i = vb().quickSort;
  function a(f, o) {
    var d = f;
    return typeof f == "string" && (d = e.parseSourceMapInput(f)), d.sections != null ? new l(d, o) : new s(d, o);
  }
  a.fromSourceMap = function(f, o) {
    return s.fromSourceMap(f, o);
  }, a.prototype._version = 3, a.prototype.__generatedMappings = null, Object.defineProperty(a.prototype, "_generatedMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings;
    }
  }), a.prototype.__originalMappings = null, Object.defineProperty(a.prototype, "_originalMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings;
    }
  }), a.prototype._charIsMappingSeparator = function(o, d) {
    var u = o.charAt(d);
    return u === ";" || u === ",";
  }, a.prototype._parseMappings = function(o, d) {
    throw new Error("Subclasses must implement _parseMappings");
  }, a.GENERATED_ORDER = 1, a.ORIGINAL_ORDER = 2, a.GREATEST_LOWER_BOUND = 1, a.LEAST_UPPER_BOUND = 2, a.prototype.eachMapping = function(o, d, u) {
    var h = d || null, p = u || a.GENERATED_ORDER, m;
    switch (p) {
      case a.GENERATED_ORDER:
        m = this._generatedMappings;
        break;
      case a.ORIGINAL_ORDER:
        m = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var g = this.sourceRoot;
    m.map(function(E) {
      var y = E.source === null ? null : this._sources.at(E.source);
      return y = e.computeSourceURL(g, y, this._sourceMapURL), {
        source: y,
        generatedLine: E.generatedLine,
        generatedColumn: E.generatedColumn,
        originalLine: E.originalLine,
        originalColumn: E.originalColumn,
        name: E.name === null ? null : this._names.at(E.name)
      };
    }, this).forEach(o, h);
  }, a.prototype.allGeneratedPositionsFor = function(o) {
    var d = e.getArg(o, "line"), u = {
      source: e.getArg(o, "source"),
      originalLine: d,
      originalColumn: e.getArg(o, "column", 0)
    };
    if (u.source = this._findSourceIndex(u.source), u.source < 0)
      return [];
    var h = [], p = this._findMapping(
      u,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      t.LEAST_UPPER_BOUND
    );
    if (p >= 0) {
      var m = this._originalMappings[p];
      if (o.column === void 0)
        for (var g = m.originalLine; m && m.originalLine === g; )
          h.push({
            line: e.getArg(m, "generatedLine", null),
            column: e.getArg(m, "generatedColumn", null),
            lastColumn: e.getArg(m, "lastGeneratedColumn", null)
          }), m = this._originalMappings[++p];
      else
        for (var E = m.originalColumn; m && m.originalLine === d && m.originalColumn == E; )
          h.push({
            line: e.getArg(m, "generatedLine", null),
            column: e.getArg(m, "generatedColumn", null),
            lastColumn: e.getArg(m, "lastGeneratedColumn", null)
          }), m = this._originalMappings[++p];
    }
    return h;
  }, Kr.SourceMapConsumer = a;
  function s(f, o) {
    var d = f;
    typeof f == "string" && (d = e.parseSourceMapInput(f));
    var u = e.getArg(d, "version"), h = e.getArg(d, "sources"), p = e.getArg(d, "names", []), m = e.getArg(d, "sourceRoot", null), g = e.getArg(d, "sourcesContent", null), E = e.getArg(d, "mappings"), y = e.getArg(d, "file", null);
    if (u != this._version)
      throw new Error("Unsupported version: " + u);
    m && (m = e.normalize(m)), h = h.map(String).map(e.normalize).map(function(S) {
      return m && e.isAbsolute(m) && e.isAbsolute(S) ? e.relative(m, S) : S;
    }), this._names = r.fromArray(p.map(String), !0), this._sources = r.fromArray(h, !0), this._absoluteSources = this._sources.toArray().map(function(S) {
      return e.computeSourceURL(m, S, o);
    }), this.sourceRoot = m, this.sourcesContent = g, this._mappings = E, this._sourceMapURL = o, this.file = y;
  }
  s.prototype = Object.create(a.prototype), s.prototype.consumer = a, s.prototype._findSourceIndex = function(f) {
    var o = f;
    if (this.sourceRoot != null && (o = e.relative(this.sourceRoot, o)), this._sources.has(o))
      return this._sources.indexOf(o);
    var d;
    for (d = 0; d < this._absoluteSources.length; ++d)
      if (this._absoluteSources[d] == f)
        return d;
    return -1;
  }, s.fromSourceMap = function(o, d) {
    var u = Object.create(s.prototype), h = u._names = r.fromArray(o._names.toArray(), !0), p = u._sources = r.fromArray(o._sources.toArray(), !0);
    u.sourceRoot = o._sourceRoot, u.sourcesContent = o._generateSourcesContent(
      u._sources.toArray(),
      u.sourceRoot
    ), u.file = o._file, u._sourceMapURL = d, u._absoluteSources = u._sources.toArray().map(function(I) {
      return e.computeSourceURL(u.sourceRoot, I, d);
    });
    for (var m = o._mappings.toArray().slice(), g = u.__generatedMappings = [], E = u.__originalMappings = [], y = 0, S = m.length; y < S; y++) {
      var _ = m[y], A = new c();
      A.generatedLine = _.generatedLine, A.generatedColumn = _.generatedColumn, _.source && (A.source = p.indexOf(_.source), A.originalLine = _.originalLine, A.originalColumn = _.originalColumn, _.name && (A.name = h.indexOf(_.name)), E.push(A)), g.push(A);
    }
    return i(u.__originalMappings, e.compareByOriginalPositions), u;
  }, s.prototype._version = 3, Object.defineProperty(s.prototype, "sources", {
    get: function() {
      return this._absoluteSources.slice();
    }
  });
  function c() {
    this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
  }
  s.prototype._parseMappings = function(o, d) {
    for (var u = 1, h = 0, p = 0, m = 0, g = 0, E = 0, y = o.length, S = 0, _ = {}, A = {}, I = [], T = [], $, C, F, H, G; S < y; )
      if (o.charAt(S) === ";")
        u++, S++, h = 0;
      else if (o.charAt(S) === ",")
        S++;
      else {
        for ($ = new c(), $.generatedLine = u, H = S; H < y && !this._charIsMappingSeparator(o, H); H++)
          ;
        if (C = o.slice(S, H), F = _[C], F)
          S += C.length;
        else {
          for (F = []; S < H; )
            n.decode(o, S, A), G = A.value, S = A.rest, F.push(G);
          if (F.length === 2)
            throw new Error("Found a source, but no line and column");
          if (F.length === 3)
            throw new Error("Found a source and line, but no column");
          _[C] = F;
        }
        $.generatedColumn = h + F[0], h = $.generatedColumn, F.length > 1 && ($.source = g + F[1], g += F[1], $.originalLine = p + F[2], p = $.originalLine, $.originalLine += 1, $.originalColumn = m + F[3], m = $.originalColumn, F.length > 4 && ($.name = E + F[4], E += F[4])), T.push($), typeof $.originalLine == "number" && I.push($);
      }
    i(T, e.compareByGeneratedPositionsDeflated), this.__generatedMappings = T, i(I, e.compareByOriginalPositions), this.__originalMappings = I;
  }, s.prototype._findMapping = function(o, d, u, h, p, m) {
    if (o[u] <= 0)
      throw new TypeError("Line must be greater than or equal to 1, got " + o[u]);
    if (o[h] < 0)
      throw new TypeError("Column must be greater than or equal to 0, got " + o[h]);
    return t.search(o, d, p, m);
  }, s.prototype.computeColumnSpans = function() {
    for (var o = 0; o < this._generatedMappings.length; ++o) {
      var d = this._generatedMappings[o];
      if (o + 1 < this._generatedMappings.length) {
        var u = this._generatedMappings[o + 1];
        if (d.generatedLine === u.generatedLine) {
          d.lastGeneratedColumn = u.generatedColumn - 1;
          continue;
        }
      }
      d.lastGeneratedColumn = 1 / 0;
    }
  }, s.prototype.originalPositionFor = function(o) {
    var d = {
      generatedLine: e.getArg(o, "line"),
      generatedColumn: e.getArg(o, "column")
    }, u = this._findMapping(
      d,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      e.compareByGeneratedPositionsDeflated,
      e.getArg(o, "bias", a.GREATEST_LOWER_BOUND)
    );
    if (u >= 0) {
      var h = this._generatedMappings[u];
      if (h.generatedLine === d.generatedLine) {
        var p = e.getArg(h, "source", null);
        p !== null && (p = this._sources.at(p), p = e.computeSourceURL(this.sourceRoot, p, this._sourceMapURL));
        var m = e.getArg(h, "name", null);
        return m !== null && (m = this._names.at(m)), {
          source: p,
          line: e.getArg(h, "originalLine", null),
          column: e.getArg(h, "originalColumn", null),
          name: m
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, s.prototype.hasContentsOfAllSources = function() {
    return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(o) {
      return o == null;
    }) : !1;
  }, s.prototype.sourceContentFor = function(o, d) {
    if (!this.sourcesContent)
      return null;
    var u = this._findSourceIndex(o);
    if (u >= 0)
      return this.sourcesContent[u];
    var h = o;
    this.sourceRoot != null && (h = e.relative(this.sourceRoot, h));
    var p;
    if (this.sourceRoot != null && (p = e.urlParse(this.sourceRoot))) {
      var m = h.replace(/^file:\/\//, "");
      if (p.scheme == "file" && this._sources.has(m))
        return this.sourcesContent[this._sources.indexOf(m)];
      if ((!p.path || p.path == "/") && this._sources.has("/" + h))
        return this.sourcesContent[this._sources.indexOf("/" + h)];
    }
    if (d)
      return null;
    throw new Error('"' + h + '" is not in the SourceMap.');
  }, s.prototype.generatedPositionFor = function(o) {
    var d = e.getArg(o, "source");
    if (d = this._findSourceIndex(d), d < 0)
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    var u = {
      source: d,
      originalLine: e.getArg(o, "line"),
      originalColumn: e.getArg(o, "column")
    }, h = this._findMapping(
      u,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      e.getArg(o, "bias", a.GREATEST_LOWER_BOUND)
    );
    if (h >= 0) {
      var p = this._originalMappings[h];
      if (p.source === u.source)
        return {
          line: e.getArg(p, "generatedLine", null),
          column: e.getArg(p, "generatedColumn", null),
          lastColumn: e.getArg(p, "lastGeneratedColumn", null)
        };
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }, Kr.BasicSourceMapConsumer = s;
  function l(f, o) {
    var d = f;
    typeof f == "string" && (d = e.parseSourceMapInput(f));
    var u = e.getArg(d, "version"), h = e.getArg(d, "sections");
    if (u != this._version)
      throw new Error("Unsupported version: " + u);
    this._sources = new r(), this._names = new r();
    var p = {
      line: -1,
      column: 0
    };
    this._sections = h.map(function(m) {
      if (m.url)
        throw new Error("Support for url field in sections not implemented.");
      var g = e.getArg(m, "offset"), E = e.getArg(g, "line"), y = e.getArg(g, "column");
      if (E < p.line || E === p.line && y < p.column)
        throw new Error("Section offsets must be ordered and non-overlapping.");
      return p = g, {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: E + 1,
          generatedColumn: y + 1
        },
        consumer: new a(e.getArg(m, "map"), o)
      };
    });
  }
  return l.prototype = Object.create(a.prototype), l.prototype.constructor = a, l.prototype._version = 3, Object.defineProperty(l.prototype, "sources", {
    get: function() {
      for (var f = [], o = 0; o < this._sections.length; o++)
        for (var d = 0; d < this._sections[o].consumer.sources.length; d++)
          f.push(this._sections[o].consumer.sources[d]);
      return f;
    }
  }), l.prototype.originalPositionFor = function(o) {
    var d = {
      generatedLine: e.getArg(o, "line"),
      generatedColumn: e.getArg(o, "column")
    }, u = t.search(
      d,
      this._sections,
      function(p, m) {
        var g = p.generatedLine - m.generatedOffset.generatedLine;
        return g || p.generatedColumn - m.generatedOffset.generatedColumn;
      }
    ), h = this._sections[u];
    return h ? h.consumer.originalPositionFor({
      line: d.generatedLine - (h.generatedOffset.generatedLine - 1),
      column: d.generatedColumn - (h.generatedOffset.generatedLine === d.generatedLine ? h.generatedOffset.generatedColumn - 1 : 0),
      bias: o.bias
    }) : {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, l.prototype.hasContentsOfAllSources = function() {
    return this._sections.every(function(o) {
      return o.consumer.hasContentsOfAllSources();
    });
  }, l.prototype.sourceContentFor = function(o, d) {
    for (var u = 0; u < this._sections.length; u++) {
      var h = this._sections[u], p = h.consumer.sourceContentFor(o, !0);
      if (p)
        return p;
    }
    if (d)
      return null;
    throw new Error('"' + o + '" is not in the SourceMap.');
  }, l.prototype.generatedPositionFor = function(o) {
    for (var d = 0; d < this._sections.length; d++) {
      var u = this._sections[d];
      if (u.consumer._findSourceIndex(e.getArg(o, "source")) !== -1) {
        var h = u.consumer.generatedPositionFor(o);
        if (h) {
          var p = {
            line: h.line + (u.generatedOffset.generatedLine - 1),
            column: h.column + (u.generatedOffset.generatedLine === h.line ? u.generatedOffset.generatedColumn - 1 : 0)
          };
          return p;
        }
      }
    }
    return {
      line: null,
      column: null
    };
  }, l.prototype._parseMappings = function(o, d) {
    this.__generatedMappings = [], this.__originalMappings = [];
    for (var u = 0; u < this._sections.length; u++)
      for (var h = this._sections[u], p = h.consumer._generatedMappings, m = 0; m < p.length; m++) {
        var g = p[m], E = h.consumer._sources.at(g.source);
        E = e.computeSourceURL(h.consumer.sourceRoot, E, this._sourceMapURL), this._sources.add(E), E = this._sources.indexOf(E);
        var y = null;
        g.name && (y = h.consumer._names.at(g.name), this._names.add(y), y = this._names.indexOf(y));
        var S = {
          source: E,
          generatedLine: g.generatedLine + (h.generatedOffset.generatedLine - 1),
          generatedColumn: g.generatedColumn + (h.generatedOffset.generatedLine === g.generatedLine ? h.generatedOffset.generatedColumn - 1 : 0),
          originalLine: g.originalLine,
          originalColumn: g.originalColumn,
          name: y
        };
        this.__generatedMappings.push(S), typeof S.originalLine == "number" && this.__originalMappings.push(S);
      }
    i(this.__generatedMappings, e.compareByGeneratedPositionsDeflated), i(this.__originalMappings, e.compareByOriginalPositions);
  }, Kr.IndexedSourceMapConsumer = l, Kr;
}
var ms = {}, qu;
function _b() {
  if (qu) return ms;
  qu = 1;
  var e = Sd().SourceMapGenerator, t = Mn(), r = /(\r?\n)/, n = 10, i = "$$$isSourceNode$$$";
  function a(s, c, l, f, o) {
    this.children = [], this.sourceContents = {}, this.line = s ?? null, this.column = c ?? null, this.source = l ?? null, this.name = o ?? null, this[i] = !0, f != null && this.add(f);
  }
  return a.fromStringWithSourceMap = function(c, l, f) {
    var o = new a(), d = c.split(r), u = 0, h = function() {
      var y = _(), S = _() || "";
      return y + S;
      function _() {
        return u < d.length ? d[u++] : void 0;
      }
    }, p = 1, m = 0, g = null;
    return l.eachMapping(function(y) {
      if (g !== null)
        if (p < y.generatedLine)
          E(g, h()), p++, m = 0;
        else {
          var S = d[u] || "", _ = S.substr(0, y.generatedColumn - m);
          d[u] = S.substr(y.generatedColumn - m), m = y.generatedColumn, E(g, _), g = y;
          return;
        }
      for (; p < y.generatedLine; )
        o.add(h()), p++;
      if (m < y.generatedColumn) {
        var S = d[u] || "";
        o.add(S.substr(0, y.generatedColumn)), d[u] = S.substr(y.generatedColumn), m = y.generatedColumn;
      }
      g = y;
    }, this), u < d.length && (g && E(g, h()), o.add(d.splice(u).join(""))), l.sources.forEach(function(y) {
      var S = l.sourceContentFor(y);
      S != null && (f != null && (y = t.join(f, y)), o.setSourceContent(y, S));
    }), o;
    function E(y, S) {
      if (y === null || y.source === void 0)
        o.add(S);
      else {
        var _ = f ? t.join(f, y.source) : y.source;
        o.add(new a(
          y.originalLine,
          y.originalColumn,
          _,
          S,
          y.name
        ));
      }
    }
  }, a.prototype.add = function(c) {
    if (Array.isArray(c))
      c.forEach(function(l) {
        this.add(l);
      }, this);
    else if (c[i] || typeof c == "string")
      c && this.children.push(c);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + c
      );
    return this;
  }, a.prototype.prepend = function(c) {
    if (Array.isArray(c))
      for (var l = c.length - 1; l >= 0; l--)
        this.prepend(c[l]);
    else if (c[i] || typeof c == "string")
      this.children.unshift(c);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + c
      );
    return this;
  }, a.prototype.walk = function(c) {
    for (var l, f = 0, o = this.children.length; f < o; f++)
      l = this.children[f], l[i] ? l.walk(c) : l !== "" && c(l, {
        source: this.source,
        line: this.line,
        column: this.column,
        name: this.name
      });
  }, a.prototype.join = function(c) {
    var l, f, o = this.children.length;
    if (o > 0) {
      for (l = [], f = 0; f < o - 1; f++)
        l.push(this.children[f]), l.push(c);
      l.push(this.children[f]), this.children = l;
    }
    return this;
  }, a.prototype.replaceRight = function(c, l) {
    var f = this.children[this.children.length - 1];
    return f[i] ? f.replaceRight(c, l) : typeof f == "string" ? this.children[this.children.length - 1] = f.replace(c, l) : this.children.push("".replace(c, l)), this;
  }, a.prototype.setSourceContent = function(c, l) {
    this.sourceContents[t.toSetString(c)] = l;
  }, a.prototype.walkSourceContents = function(c) {
    for (var l = 0, f = this.children.length; l < f; l++)
      this.children[l][i] && this.children[l].walkSourceContents(c);
    for (var o = Object.keys(this.sourceContents), l = 0, f = o.length; l < f; l++)
      c(t.fromSetString(o[l]), this.sourceContents[o[l]]);
  }, a.prototype.toString = function() {
    var c = "";
    return this.walk(function(l) {
      c += l;
    }), c;
  }, a.prototype.toStringWithSourceMap = function(c) {
    var l = {
      code: "",
      line: 1,
      column: 0
    }, f = new e(c), o = !1, d = null, u = null, h = null, p = null;
    return this.walk(function(m, g) {
      l.code += m, g.source !== null && g.line !== null && g.column !== null ? ((d !== g.source || u !== g.line || h !== g.column || p !== g.name) && f.addMapping({
        source: g.source,
        original: {
          line: g.line,
          column: g.column
        },
        generated: {
          line: l.line,
          column: l.column
        },
        name: g.name
      }), d = g.source, u = g.line, h = g.column, p = g.name, o = !0) : o && (f.addMapping({
        generated: {
          line: l.line,
          column: l.column
        }
      }), d = null, o = !1);
      for (var E = 0, y = m.length; E < y; E++)
        m.charCodeAt(E) === n ? (l.line++, l.column = 0, E + 1 === y ? (d = null, o = !1) : o && f.addMapping({
          source: g.source,
          original: {
            line: g.line,
            column: g.column
          },
          generated: {
            line: l.line,
            column: l.column
          },
          name: g.name
        })) : l.column++;
    }), this.walkSourceContents(function(m, g) {
      f.setSourceContent(m, g);
    }), { code: l.code, map: f };
  }, ms.SourceNode = a, ms;
}
var ju;
function Eb() {
  return ju || (ju = 1, Xr.SourceMapGenerator = Sd().SourceMapGenerator, Xr.SourceMapConsumer = yb().SourceMapConsumer, Xr.SourceNode = _b().SourceNode), Xr;
}
(function(e, t) {
  t.__esModule = !0;
  var r = te, n = void 0;
  try {
    var i = Eb();
    n = i.SourceNode;
  } catch {
  }
  n || (n = function(c, l, f, o) {
    this.src = "", o && this.add(o);
  }, n.prototype = {
    add: function(l) {
      r.isArray(l) && (l = l.join("")), this.src += l;
    },
    prepend: function(l) {
      r.isArray(l) && (l = l.join("")), this.src = l + this.src;
    },
    toStringWithSourceMap: function() {
      return { code: this.toString() };
    },
    toString: function() {
      return this.src;
    }
  });
  function a(c, l, f) {
    if (r.isArray(c)) {
      for (var o = [], d = 0, u = c.length; d < u; d++)
        o.push(l.wrap(c[d], f));
      return o;
    } else if (typeof c == "boolean" || typeof c == "number")
      return c + "";
    return c;
  }
  function s(c) {
    this.srcFile = c, this.source = [];
  }
  s.prototype = {
    isEmpty: function() {
      return !this.source.length;
    },
    prepend: function(l, f) {
      this.source.unshift(this.wrap(l, f));
    },
    push: function(l, f) {
      this.source.push(this.wrap(l, f));
    },
    merge: function() {
      var l = this.empty();
      return this.each(function(f) {
        l.add(["  ", f, `
`]);
      }), l;
    },
    each: function(l) {
      for (var f = 0, o = this.source.length; f < o; f++)
        l(this.source[f]);
    },
    empty: function() {
      var l = this.currentLocation || { start: {} };
      return new n(l.start.line, l.start.column, this.srcFile);
    },
    wrap: function(l) {
      var f = arguments.length <= 1 || arguments[1] === void 0 ? this.currentLocation || { start: {} } : arguments[1];
      return l instanceof n ? l : (l = a(l, this, f), new n(f.start.line, f.start.column, this.srcFile, l));
    },
    functionCall: function(l, f, o) {
      return o = this.generateList(o), this.wrap([l, f ? "." + f + "(" : "(", o, ")"]);
    },
    quotedString: function(l) {
      return '"' + (l + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
    },
    objectLiteral: function(l) {
      var f = this, o = [];
      Object.keys(l).forEach(function(u) {
        var h = a(l[u], f);
        h !== "undefined" && o.push([f.quotedString(u), ":", h]);
      });
      var d = this.generateList(o);
      return d.prepend("{"), d.add("}"), d;
    },
    generateList: function(l) {
      for (var f = this.empty(), o = 0, d = l.length; o < d; o++)
        o && f.add(","), f.add(a(l[o], this));
      return f;
    },
    generateArray: function(l) {
      var f = this.generateList(l);
      return f.prepend("["), f.add("]"), f;
    }
  }, t.default = s, e.exports = t.default;
})(no, no.exports);
var wb = no.exports;
(function(e, t) {
  t.__esModule = !0;
  function r(u) {
    return u && u.__esModule ? u : { default: u };
  }
  var n = Ve, i = We, a = r(i), s = te, c = wb, l = r(c);
  function f(u) {
    this.value = u;
  }
  function o() {
  }
  o.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(h, p) {
      return this.internalNameLookup(h, p);
    },
    depthedLookup: function(h) {
      return [this.aliasable("container.lookup"), "(depths, ", JSON.stringify(h), ")"];
    },
    compilerInfo: function() {
      var h = n.COMPILER_REVISION, p = n.REVISION_CHANGES[h];
      return [h, p];
    },
    appendToBuffer: function(h, p, m) {
      return s.isArray(h) || (h = [h]), h = this.source.wrap(h, p), this.environment.isSimple ? ["return ", h, ";"] : m ? ["buffer += ", h, ";"] : (h.appendToBuffer = !0, h);
    },
    initializeBuffer: function() {
      return this.quotedString("");
    },
    // END PUBLIC API
    internalNameLookup: function(h, p) {
      return this.lookupPropertyFunctionIsUsed = !0, ["lookupProperty(", h, ",", JSON.stringify(p), ")"];
    },
    lookupPropertyFunctionIsUsed: !1,
    compile: function(h, p, m, g) {
      this.environment = h, this.options = p, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !g, this.name = this.environment.name, this.isChild = !!m, this.context = m || {
        decorators: [],
        programs: [],
        environments: []
      }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = { list: [] }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], this.compileChildren(h, p), this.useDepths = this.useDepths || h.useDepths || h.useDecorators || this.options.compat, this.useBlockParams = this.useBlockParams || h.useBlockParams;
      var E = h.opcodes, y = void 0, S = void 0, _ = void 0, A = void 0;
      for (_ = 0, A = E.length; _ < A; _++)
        y = E[_], this.source.currentLocation = y.loc, S = S || y.loc, this[y.opcode].apply(this, y.args);
      if (this.source.currentLocation = S, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length)
        throw new a.default("Compile completed with content left on stack");
      this.decorators.isEmpty() ? this.decorators = void 0 : (this.useDecorators = !0, this.decorators.prepend(["var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), `;
`]), this.decorators.push("return fn;"), g ? this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]) : (this.decorators.prepend(`function(fn, props, container, depth0, data, blockParams, depths) {
`), this.decorators.push(`}
`), this.decorators = this.decorators.merge()));
      var I = this.createFunctionContext(g);
      if (this.isChild)
        return I;
      var T = {
        compiler: this.compilerInfo(),
        main: I
      };
      this.decorators && (T.main_d = this.decorators, T.useDecorators = !0);
      var $ = this.context, C = $.programs, F = $.decorators;
      for (_ = 0, A = C.length; _ < A; _++)
        T[_] = C[_], F[_] && (T[_ + "_d"] = F[_], T.useDecorators = !0);
      return this.environment.usePartial && (T.usePartial = !0), this.options.data && (T.useData = !0), this.useDepths && (T.useDepths = !0), this.useBlockParams && (T.useBlockParams = !0), this.options.compat && (T.compat = !0), g ? T.compilerOptions = this.options : (T.compiler = JSON.stringify(T.compiler), this.source.currentLocation = { start: { line: 1, column: 0 } }, T = this.objectLiteral(T), p.srcName ? (T = T.toStringWithSourceMap({ file: p.destName }), T.map = T.map && T.map.toString()) : T = T.toString()), T;
    },
    preamble: function() {
      this.lastContext = 0, this.source = new l.default(this.options.srcName), this.decorators = new l.default(this.options.srcName);
    },
    createFunctionContext: function(h) {
      var p = this, m = "", g = this.stackVars.concat(this.registers.list);
      g.length > 0 && (m += ", " + g.join(", "));
      var E = 0;
      Object.keys(this.aliases).forEach(function(_) {
        var A = p.aliases[_];
        A.children && A.referenceCount > 1 && (m += ", alias" + ++E + "=" + _, A.children[0] = "alias" + E);
      }), this.lookupPropertyFunctionIsUsed && (m += ", " + this.lookupPropertyFunctionVarDeclaration());
      var y = ["container", "depth0", "helpers", "partials", "data"];
      (this.useBlockParams || this.useDepths) && y.push("blockParams"), this.useDepths && y.push("depths");
      var S = this.mergeSource(m);
      return h ? (y.push(S), Function.apply(this, y)) : this.source.wrap(["function(", y.join(","), `) {
  `, S, "}"]);
    },
    mergeSource: function(h) {
      var p = this.environment.isSimple, m = !this.forceBuffer, g = void 0, E = void 0, y = void 0, S = void 0;
      return this.source.each(function(_) {
        _.appendToBuffer ? (y ? _.prepend("  + ") : y = _, S = _) : (y && (E ? y.prepend("buffer += ") : g = !0, S.add(";"), y = S = void 0), E = !0, p || (m = !1));
      }), m ? y ? (y.prepend("return "), S.add(";")) : E || this.source.push('return "";') : (h += ", buffer = " + (g ? "" : this.initializeBuffer()), y ? (y.prepend("return buffer + "), S.add(";")) : this.source.push("return buffer;")), h && this.source.prepend("var " + h.substring(2) + (g ? "" : `;
`)), this.source.merge();
    },
    lookupPropertyFunctionVarDeclaration: function() {
      return `
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }
    `.trim();
    },
    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function(h) {
      var p = this.aliasable("container.hooks.blockHelperMissing"), m = [this.contextName(0)];
      this.setupHelperArgs(h, 0, m);
      var g = this.popStack();
      m.splice(1, 0, g), this.push(this.source.functionCall(p, "call", m));
    },
    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      var h = this.aliasable("container.hooks.blockHelperMissing"), p = [this.contextName(0)];
      this.setupHelperArgs("", 0, p, !0), this.flushInline();
      var m = this.topStack();
      p.splice(1, 0, m), this.pushSource(["if (!", this.lastHelper, ") { ", m, " = ", this.source.functionCall(h, "call", p), "}"]);
    },
    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(h) {
      this.pendingContent ? h = this.pendingContent + h : this.pendingLocation = this.source.currentLocation, this.pendingContent = h;
    },
    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      if (this.isInline())
        this.replaceStack(function(p) {
          return [" != null ? ", p, ' : ""'];
        }), this.pushSource(this.appendToBuffer(this.popStack()));
      else {
        var h = this.popStack();
        this.pushSource(["if (", h, " != null) { ", this.appendToBuffer(h, void 0, !0), " }"]), this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"]);
      }
    },
    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]));
    },
    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(h) {
      this.lastContext = h;
    },
    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral(this.contextName(this.lastContext));
    },
    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(h, p, m, g) {
      var E = 0;
      !g && this.options.compat && !this.lastContext ? this.push(this.depthedLookup(h[E++])) : this.pushContext(), this.resolvePath("context", h, E, p, m);
    },
    // [lookupBlockParam]
    //
    // On stack, before: ...
    // On stack, after: blockParam[name], ...
    //
    // Looks up the value of `parts` on the given block param and pushes
    // it onto the stack.
    lookupBlockParam: function(h, p) {
      this.useBlockParams = !0, this.push(["blockParams[", h[0], "][", h[1], "]"]), this.resolvePath("context", p, 1);
    },
    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function(h, p, m) {
      h ? this.pushStackLiteral("container.data(data, " + h + ")") : this.pushStackLiteral("data"), this.resolvePath("data", p, 0, !0, m);
    },
    resolvePath: function(h, p, m, g, E) {
      var y = this;
      if (this.options.strict || this.options.assumeObjects) {
        this.push(d(this.options.strict && E, this, p, m, h));
        return;
      }
      for (var S = p.length, _ = function(I) {
        y.replaceStack(function(T) {
          var $ = y.nameLookup(T, p[I], h);
          return g ? [" && ", $] : [" != null ? ", $, " : ", T];
        });
      }, A = m; A < S; A++)
        _(A);
    },
    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]);
    },
    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(h, p) {
      this.pushContext(), this.pushString(p), p !== "SubExpression" && (typeof h == "string" ? this.pushString(h) : this.pushStackLiteral(h));
    },
    emptyHash: function(h) {
      this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), this.pushStackLiteral(h ? "undefined" : "{}");
    },
    pushHash: function() {
      this.hash && this.hashes.push(this.hash), this.hash = { values: {}, types: [], contexts: [], ids: [] };
    },
    popHash: function() {
      var h = this.hash;
      this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(h.ids)), this.stringParams && (this.push(this.objectLiteral(h.contexts)), this.push(this.objectLiteral(h.types))), this.push(this.objectLiteral(h.values));
    },
    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(h) {
      this.pushStackLiteral(this.quotedString(h));
    },
    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(h) {
      this.pushStackLiteral(h);
    },
    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(h) {
      h != null ? this.pushStackLiteral(this.programExpression(h)) : this.pushStackLiteral(null);
    },
    // [registerDecorator]
    //
    // On stack, before: hash, program, params..., ...
    // On stack, after: ...
    //
    // Pops off the decorator's parameters, invokes the decorator,
    // and inserts the decorator into the decorators list.
    registerDecorator: function(h, p) {
      var m = this.nameLookup("decorators", p, "decorator"), g = this.setupHelperArgs(p, h);
      this.decorators.push(["var decorator = ", m, ";"]), this.decorators.push(['if (typeof decorator !== "function") { throw new Error(', this.quotedString('Missing decorator: "' + p + '"'), "); }"]), this.decorators.push(["fn = ", this.decorators.functionCall("decorator", "", ["fn", "props", "container", g]), " || fn;"]);
    },
    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(h, p, m) {
      var g = this.popStack(), E = this.setupHelper(h, p), y = [];
      m && y.push(E.name), y.push(g), this.options.strict || y.push(this.aliasable("container.hooks.helperMissing"));
      var S = ["(", this.itemsSeparatedBy(y, "||"), ")"], _ = this.source.functionCall(S, "call", E.callParams);
      this.push(_);
    },
    itemsSeparatedBy: function(h, p) {
      var m = [];
      m.push(h[0]);
      for (var g = 1; g < h.length; g++)
        m.push(p, h[g]);
      return m;
    },
    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(h, p) {
      var m = this.setupHelper(h, p);
      this.push(this.source.functionCall(m.name, "call", m.callParams));
    },
    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(h, p) {
      this.useRegister("helper");
      var m = this.popStack();
      this.emptyHash();
      var g = this.setupHelper(0, h, p), E = this.lastHelper = this.nameLookup("helpers", h, "helper"), y = ["(", "(helper = ", E, " || ", m, ")"];
      this.options.strict || (y[0] = "(helper = ", y.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"))), this.push(["(", y, g.paramsInit ? ["),(", g.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", g.callParams), " : helper))"]);
    },
    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(h, p, m) {
      var g = [], E = this.setupParams(p, 1, g);
      h && (p = this.popStack(), delete E.name), m && (E.indent = JSON.stringify(m)), E.helpers = "helpers", E.partials = "partials", E.decorators = "container.decorators", h ? g.unshift(p) : g.unshift(this.nameLookup("partials", p, "partial")), this.options.compat && (E.depths = "depths"), E = this.objectLiteral(E), g.push(E), this.push(this.source.functionCall("container.invokePartial", "", g));
    },
    // [assignToHash]
    //
    // On stack, before: value, ..., hash, ...
    // On stack, after: ..., hash, ...
    //
    // Pops a value off the stack and assigns it to the current hash
    assignToHash: function(h) {
      var p = this.popStack(), m = void 0, g = void 0, E = void 0;
      this.trackIds && (E = this.popStack()), this.stringParams && (g = this.popStack(), m = this.popStack());
      var y = this.hash;
      m && (y.contexts[h] = m), g && (y.types[h] = g), E && (y.ids[h] = E), y.values[h] = p;
    },
    pushId: function(h, p, m) {
      h === "BlockParam" ? this.pushStackLiteral("blockParams[" + p[0] + "].path[" + p[1] + "]" + (m ? " + " + JSON.stringify("." + m) : "")) : h === "PathExpression" ? this.pushString(p) : h === "SubExpression" ? this.pushStackLiteral("true") : this.pushStackLiteral("null");
    },
    // HELPERS
    compiler: o,
    compileChildren: function(h, p) {
      for (var m = h.children, g = void 0, E = void 0, y = 0, S = m.length; y < S; y++) {
        g = m[y], E = new this.compiler();
        var _ = this.matchExistingProgram(g);
        if (_ == null) {
          var A = this.context.programs.push("") - 1;
          g.index = A, g.name = "program" + A, this.context.programs[A] = E.compile(g, p, this.context, !this.precompile), this.context.decorators[A] = E.decorators, this.context.environments[A] = g, this.useDepths = this.useDepths || E.useDepths, this.useBlockParams = this.useBlockParams || E.useBlockParams, g.useDepths = this.useDepths, g.useBlockParams = this.useBlockParams;
        } else
          g.index = _.index, g.name = "program" + _.index, this.useDepths = this.useDepths || _.useDepths, this.useBlockParams = this.useBlockParams || _.useBlockParams;
      }
    },
    matchExistingProgram: function(h) {
      for (var p = 0, m = this.context.environments.length; p < m; p++) {
        var g = this.context.environments[p];
        if (g && g.equals(h))
          return g;
      }
    },
    programExpression: function(h) {
      var p = this.environment.children[h], m = [p.index, "data", p.blockParams];
      return (this.useBlockParams || this.useDepths) && m.push("blockParams"), this.useDepths && m.push("depths"), "container.program(" + m.join(", ") + ")";
    },
    useRegister: function(h) {
      this.registers[h] || (this.registers[h] = !0, this.registers.list.push(h));
    },
    push: function(h) {
      return h instanceof f || (h = this.source.wrap(h)), this.inlineStack.push(h), h;
    },
    pushStackLiteral: function(h) {
      this.push(new f(h));
    },
    pushSource: function(h) {
      this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0), h && this.source.push(h);
    },
    replaceStack: function(h) {
      var p = ["("], m = void 0, g = void 0, E = void 0;
      if (!this.isInline())
        throw new a.default("replaceStack on non-inline");
      var y = this.popStack(!0);
      if (y instanceof f)
        m = [y.value], p = ["(", m], E = !0;
      else {
        g = !0;
        var S = this.incrStack();
        p = ["((", this.push(S), " = ", y, ")"], m = this.topStack();
      }
      var _ = h.call(this, m);
      E || this.popStack(), g && this.stackSlot--, this.push(p.concat(_, ")"));
    },
    incrStack: function() {
      return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName();
    },
    topStackName: function() {
      return "stack" + this.stackSlot;
    },
    flushInline: function() {
      var h = this.inlineStack;
      this.inlineStack = [];
      for (var p = 0, m = h.length; p < m; p++) {
        var g = h[p];
        if (g instanceof f)
          this.compileStack.push(g);
        else {
          var E = this.incrStack();
          this.pushSource([E, " = ", g, ";"]), this.compileStack.push(E);
        }
      }
    },
    isInline: function() {
      return this.inlineStack.length;
    },
    popStack: function(h) {
      var p = this.isInline(), m = (p ? this.inlineStack : this.compileStack).pop();
      if (!h && m instanceof f)
        return m.value;
      if (!p) {
        if (!this.stackSlot)
          throw new a.default("Invalid stack pop");
        this.stackSlot--;
      }
      return m;
    },
    topStack: function() {
      var h = this.isInline() ? this.inlineStack : this.compileStack, p = h[h.length - 1];
      return p instanceof f ? p.value : p;
    },
    contextName: function(h) {
      return this.useDepths && h ? "depths[" + h + "]" : "depth" + h;
    },
    quotedString: function(h) {
      return this.source.quotedString(h);
    },
    objectLiteral: function(h) {
      return this.source.objectLiteral(h);
    },
    aliasable: function(h) {
      var p = this.aliases[h];
      return p ? (p.referenceCount++, p) : (p = this.aliases[h] = this.source.wrap(h), p.aliasable = !0, p.referenceCount = 1, p);
    },
    setupHelper: function(h, p, m) {
      var g = [], E = this.setupHelperArgs(p, h, g, m), y = this.nameLookup("helpers", p, "helper"), S = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
      return {
        params: g,
        paramsInit: E,
        name: y,
        callParams: [S].concat(g)
      };
    },
    setupParams: function(h, p, m) {
      var g = {}, E = [], y = [], S = [], _ = !m, A = void 0;
      _ && (m = []), g.name = this.quotedString(h), g.hash = this.popStack(), this.trackIds && (g.hashIds = this.popStack()), this.stringParams && (g.hashTypes = this.popStack(), g.hashContexts = this.popStack());
      var I = this.popStack(), T = this.popStack();
      (T || I) && (g.fn = T || "container.noop", g.inverse = I || "container.noop");
      for (var $ = p; $--; )
        A = this.popStack(), m[$] = A, this.trackIds && (S[$] = this.popStack()), this.stringParams && (y[$] = this.popStack(), E[$] = this.popStack());
      return _ && (g.args = this.source.generateArray(m)), this.trackIds && (g.ids = this.source.generateArray(S)), this.stringParams && (g.types = this.source.generateArray(y), g.contexts = this.source.generateArray(E)), this.options.data && (g.data = "data"), this.useBlockParams && (g.blockParams = "blockParams"), g;
    },
    setupHelperArgs: function(h, p, m, g) {
      var E = this.setupParams(h, p, m);
      return E.loc = JSON.stringify(this.source.currentLocation), E = this.objectLiteral(E), g ? (this.useRegister("options"), m.push("options"), ["options=", E]) : m ? (m.push(E), "") : E;
    }
  }, function() {
    for (var u = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), h = o.RESERVED_WORDS = {}, p = 0, m = u.length; p < m; p++)
      h[u[p]] = !0;
  }(), o.isValidJavaScriptVariableName = function(u) {
    return !o.RESERVED_WORDS[u] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(u);
  };
  function d(u, h, p, m, g) {
    var E = h.popStack(), y = p.length;
    u && y--;
    for (var S = m; S < y; S++)
      E = h.nameLookup(E, p[S], g);
    return u ? [h.aliasable("container.strict"), "(", E, ", ", h.quotedString(p[y]), ", ", JSON.stringify(h.source.currentLocation), " )"] : E;
  }
  t.default = o, e.exports = t.default;
})(ro, ro.exports);
var bb = ro.exports;
(function(e, t) {
  t.__esModule = !0;
  function r(y) {
    return y && y.__esModule ? y : { default: y };
  }
  var n = Uw, i = r(n), a = vd, s = r(a), c = Fn, l = Un, f = bb, o = r(f), d = Ko, u = r(d), h = gd, p = r(h), m = i.default.create;
  function g() {
    var y = m();
    return y.compile = function(S, _) {
      return l.compile(S, _, y);
    }, y.precompile = function(S, _) {
      return l.precompile(S, _, y);
    }, y.AST = s.default, y.Compiler = l.Compiler, y.JavaScriptCompiler = o.default, y.Parser = c.parser, y.parse = c.parse, y.parseWithoutProcessing = c.parseWithoutProcessing, y;
  }
  var E = g();
  E.create = g, p.default(E), E.Visitor = u.default, E.default = E, t.default = E, e.exports = t.default;
})(Ns, Ns.exports);
var Sb = Ns.exports, la = {};
la.__esModule = !0;
la.print = xb;
la.PrintVisitor = ce;
function Cb(e) {
  return e && e.__esModule ? e : { default: e };
}
var Ab = Ko, Pb = Cb(Ab);
function xb(e) {
  return new ce().accept(e);
}
function ce() {
  this.padding = 0;
}
ce.prototype = new Pb.default();
ce.prototype.pad = function(e) {
  for (var t = "", r = 0, n = this.padding; r < n; r++)
    t += "  ";
  return t += e + `
`, t;
};
ce.prototype.Program = function(e) {
  var t = "", r = e.body, n = void 0, i = void 0;
  if (e.blockParams) {
    var a = "BLOCK PARAMS: [";
    for (n = 0, i = e.blockParams.length; n < i; n++)
      a += " " + e.blockParams[n];
    a += " ]", t += this.pad(a);
  }
  for (n = 0, i = r.length; n < i; n++)
    t += this.accept(r[n]);
  return this.padding--, t;
};
ce.prototype.MustacheStatement = function(e) {
  return this.pad("{{ " + this.SubExpression(e) + " }}");
};
ce.prototype.Decorator = function(e) {
  return this.pad("{{ DIRECTIVE " + this.SubExpression(e) + " }}");
};
ce.prototype.BlockStatement = ce.prototype.DecoratorBlock = function(e) {
  var t = "";
  return t += this.pad((e.type === "DecoratorBlock" ? "DIRECTIVE " : "") + "BLOCK:"), this.padding++, t += this.pad(this.SubExpression(e)), e.program && (t += this.pad("PROGRAM:"), this.padding++, t += this.accept(e.program), this.padding--), e.inverse && (e.program && this.padding++, t += this.pad("{{^}}"), this.padding++, t += this.accept(e.inverse), this.padding--, e.program && this.padding--), this.padding--, t;
};
ce.prototype.PartialStatement = function(e) {
  var t = "PARTIAL:" + e.name.original;
  return e.params[0] && (t += " " + this.accept(e.params[0])), e.hash && (t += " " + this.accept(e.hash)), this.pad("{{> " + t + " }}");
};
ce.prototype.PartialBlockStatement = function(e) {
  var t = "PARTIAL BLOCK:" + e.name.original;
  return e.params[0] && (t += " " + this.accept(e.params[0])), e.hash && (t += " " + this.accept(e.hash)), t += " " + this.pad("PROGRAM:"), this.padding++, t += this.accept(e.program), this.padding--, this.pad("{{> " + t + " }}");
};
ce.prototype.ContentStatement = function(e) {
  return this.pad("CONTENT[ '" + e.value + "' ]");
};
ce.prototype.CommentStatement = function(e) {
  return this.pad("{{! '" + e.value + "' }}");
};
ce.prototype.SubExpression = function(e) {
  for (var t = e.params, r = [], n = void 0, i = 0, a = t.length; i < a; i++)
    r.push(this.accept(t[i]));
  return t = "[" + r.join(", ") + "]", n = e.hash ? " " + this.accept(e.hash) : "", this.accept(e.path) + " " + t + n;
};
ce.prototype.PathExpression = function(e) {
  var t = e.parts.join("/");
  return (e.data ? "@" : "") + "PATH:" + t;
};
ce.prototype.StringLiteral = function(e) {
  return '"' + e.value + '"';
};
ce.prototype.NumberLiteral = function(e) {
  return "NUMBER{" + e.value + "}";
};
ce.prototype.BooleanLiteral = function(e) {
  return "BOOLEAN{" + e.value + "}";
};
ce.prototype.UndefinedLiteral = function() {
  return "UNDEFINED";
};
ce.prototype.NullLiteral = function() {
  return "NULL";
};
ce.prototype.Hash = function(e) {
  for (var t = e.pairs, r = [], n = 0, i = t.length; n < i; n++)
    r.push(this.accept(t[n]));
  return "HASH{" + r.join(", ") + "}";
};
ce.prototype.HashPair = function(e) {
  return e.key + "=" + this.accept(e.value);
};
var ca = Sb.default, Cd = la;
ca.PrintVisitor = Cd.PrintVisitor;
ca.print = Cd.print;
var Tb = ca;
function Gu(e, t) {
  var r = Ze, n = r.readFileSync(t, "utf8");
  e.exports = ca.compile(n);
}
typeof di < "u" && di.extensions && (di.extensions[".handlebars"] = Gu, di.extensions[".hbs"] = Gu);
const Ib = /* @__PURE__ */ Ku(Tb);
class Ob {
  /**
   * Get the path to the PDF templates directory
   * Handles both dev and packaged app contexts
   */
  static getTemplateDir() {
    if (process.env.VITE_DEV_SERVER_URL)
      return lr.join(process.cwd(), "public", "pdf_templates");
    {
      const t = process.resourcesPath || lr.join(lr.dirname(xt.getAppPath()), "..");
      return lr.join(t, "public", "pdf_templates");
    }
  }
  /**
   * Load and compile a Handlebars template
   */
  static async loadTemplate(t) {
    const r = this.getTemplateDir(), n = lr.join(r, `${t}.html`);
    if (!Hr.existsSync(n))
      throw new Error(`Sablon nem található: ${t}`);
    const i = Hr.readFileSync(n, "utf-8");
    return Ib.compile(i);
  }
  /**
   * Render a template with the provided payload
   */
  static async renderTemplate(t, r) {
    try {
      return t(r);
    } catch (n) {
      throw new Error(`Sablon renderelés hiba: ${n instanceof Error ? n.message : "Ismeretlen hiba"}`);
    }
  }
  /**
   * Generate a PDF from HTML content
   * Uses Electron's built-in webContents.printToPDF() for reliable PDF generation
   */
  static async generatePdf(t, r) {
    const n = lr.dirname(r);
    Hr.existsSync(n) || Hr.mkdirSync(n, { recursive: !0 });
    const i = new so({
      webPreferences: {
        sandbox: !0
      },
      show: !1
    });
    try {
      await i.webContents.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(t)}`);
      const a = await i.webContents.printToPDF({
        margins: {
          marginType: "printableArea"
        },
        pageSize: "A4",
        printBackground: !0
      });
      return await Hr.promises.writeFile(r, a), { success: !0, pageCount: Math.max(1, Math.ceil(a.length / 15e3)) };
    } catch (a) {
      throw new Error(`PDF generálás hiba: ${a instanceof Error ? a.message : "Ismeretlen hiba"}`);
    } finally {
      i.isDestroyed() || i.destroy();
    }
  }
  /**
   * Save and optionally open the generated PDF
   */
  static async saveAndOpen(t, r = !0) {
    if (r)
      try {
        const { default: n } = await import("./index-DjjNooYy.js");
        n(t).catch((i) => {
          console.warn(
            `Nem sikerult megnyitni a PDF-et: ${i instanceof Error ? i.message : "Ismeretlen hiba"}`
          );
        });
      } catch (n) {
        console.warn(`Nem sikerült megnyitni a PDF-et: ${n instanceof Error ? n.message : "Ismeretlen hiba"}`);
      }
  }
  /**
   * Create a schematic PDF for a company with employees
   * Main entry point for PDF generation
   */
  static async createSchematicPdf(t) {
    try {
      const r = await this.loadTemplate(t.templateId), n = await this.renderTemplate(r, t.payload), { pageCount: i } = await this.generatePdf(n, t.outputPath);
      return await this.saveAndOpen(t.outputPath, t.autoOpen ?? !0), {
        success: !0,
        outputPath: t.outputPath,
        pageCount: i
      };
    } catch (r) {
      return {
        success: !1,
        error: r instanceof Error ? r.message : "Ismeretlen hiba történt a PDF generálás során"
      };
    }
  }
}
const wn = ve.dirname(Tp(import.meta.url));
process.env.APP_ROOT = ve.join(wn, "..");
const io = process.env.VITE_DEV_SERVER_URL, Zb = ve.join(process.env.APP_ROOT, "dist-electron"), Rb = ve.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = io ? ve.join(process.env.APP_ROOT, "public") : Rb;
let j, Nt = !1, sr = !1, ao = !1, Ue = "", Qt = 0, Pt = "";
function Ad() {
  j = new so({
    icon: ve.join(process.env.VITE_PUBLIC, "balazslogo.svg"),
    title: "Navigator Studio",
    webPreferences: {
      preload: ve.join(wn, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1,
      sandbox: !1
    },
    frame: !1,
    autoHideMenuBar: !1
    // ← hides the menu/toolbar
  }), j.webContents.on("did-finish-load", () => {
    j == null || j.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), io ? j.loadURL(io) : j.loadFile(ve.join(wn, "../dist/index.html")), j.on("close", async (e) => {
    if (!Nt && !sr || ao)
      return;
    e.preventDefault();
    const t = Nt;
    (await gs.showMessageBox(j, {
      type: "question",
      buttons: t ? ["Mégse", "Bezárás és letöltés megszakítása"] : ["Mégse", "Bezárás és frissítés telepítése"],
      defaultId: 1,
      cancelId: 0,
      title: t ? "Frissítés letöltése folyamatban" : "Frissítés telepítése",
      message: t ? "A frissítés jelenleg töltődik." : "A frissítés letöltődött.",
      detail: t ? "Ha most bezárod az alkalmazást, a letöltés megszakad. Biztosan be szeretnéd zárni?" : "Az alkalmazás bezárásakor a frissítés települ. Biztosan be szeretnéd zárni most?",
      noLink: !0
    })).response === 1 && (ao = !0, j == null || j.close());
  });
}
function Db(e) {
  e && Vu.openPath(e).then((t) => {
    t && console.error("Failed to open file:", t);
  });
}
xt.on("window-all-closed", () => {
  process.platform !== "darwin" && (xt.quit(), j = null);
});
xt.on("activate", () => {
  so.getAllWindows().length === 0 && Ad();
});
Ge.handle("minimize-window", () => {
  j == null || j.minimize();
});
Ge.handle("maximize-window", () => {
  j != null && j.isMaximized() ? j.unmaximize() : j == null || j.maximize();
});
Ge.handle("close-window", () => {
  j == null || j.close();
});
Ge.handle("run-executable", (e, t, r = []) => new Promise((n, i) => {
  var o, d;
  const a = xt.isPackaged ? ve.join(process.resourcesPath, "public") : ve.join(wn, "../public"), s = ve.join(a, t);
  console.log("Running exe:", s, "with args:", r);
  const c = Ip(s, r, {
    windowsHide: !0,
    cwd: ve.dirname(s)
  });
  let l = "", f = "";
  (o = c.stdout) == null || o.on("data", (u) => {
    const h = Rl.decode(u, "win1250");
    l += h, e.sender.send("exe-stdout", h);
  }), (d = c.stderr) == null || d.on("data", (u) => {
    const h = Rl.decode(u, "win1250");
    f += h, e.sender.send("exe-stderr", h);
  }), c.on("close", (u) => {
    u === 0 ? n(l || "Executed successfully") : i(f || `Process exited with code ${u}`);
  }), c.on("error", (u) => i(u.message));
}));
Ge.handle("open-folder", async (e, t) => {
  try {
    Ze.existsSync(t) || (Ze.mkdirSync(t, { recursive: !0 }), console.log("Folder created:", t));
    const r = await Vu.openPath(t);
    if (r)
      throw console.error("Failed to open folder:", r), new Error(r);
    return "Folder opened successfully";
  } catch (r) {
    throw console.error("Error opening folder:", r), r;
  }
});
Ge.handle("open-file", async (e, t) => {
  const r = xt.isPackaged ? ve.join(process.resourcesPath, "public") : ve.join(wn, "../public");
  return Db(ve.join(r, t)), !0;
});
Ge.handle("select-folder", async (e, t) => {
  const r = {
    properties: ["openDirectory", "createDirectory"],
    defaultPath: t
  }, n = j ? await gs.showOpenDialog(j, r) : await gs.showOpenDialog(r);
  return n.canceled || n.filePaths.length === 0 ? null : n.filePaths[0];
});
Ge.handle("get-public-path", (e, ...t) => {
  const r = xt.isPackaged ? ve.join(process.resourcesPath, "public") : ve.join(process.cwd(), "public");
  return ve.join(r, ...t);
});
Ge.handle("pdf-create-schematic", async (e, t) => {
  try {
    return console.log("PDF creation request received:", { companyId: t.companyId, templateId: t.templateId }), await Ob.createSchematicPdf(t);
  } catch (r) {
    return console.error("PDF creation error:", r), {
      success: !1,
      error: r instanceof Error ? r.message : "PDF generálás hiba"
    };
  }
});
Me.autoUpdater.autoDownload = !1;
Me.autoUpdater.autoInstallOnAppQuit = !0;
Me.autoUpdater.on("checking-for-update", () => {
  Nt = !1, sr = !1, Ue = "Checking for updates...", Qt = 0, Pt = "", j == null || j.webContents.send("update-status", Ue), console.log("Checking for updates...");
});
Me.autoUpdater.on("update-available", () => {
  Nt = !0, sr = !1, Ue = "Update available. Starting download...", Qt = 0, Pt = "", j == null || j.webContents.send("update-status", Ue), console.log("Update available, starting download..."), Me.autoUpdater.downloadUpdate();
});
Me.autoUpdater.on("update-not-available", () => {
  Nt = !1, sr = !1, Ue = "", Qt = 0, Pt = "", j == null || j.webContents.send("update-status", Ue), console.log("Already up to date.");
});
Me.autoUpdater.on("download-progress", (e) => {
  Qt = Math.round(e.percent), Ue || (Ue = "Update available. Starting download..."), j == null || j.webContents.send("update-status", Ue), j == null || j.webContents.send("update-progress", Qt), console.log(`Download progress: ${Qt}%`);
});
Me.autoUpdater.on("update-downloaded", () => {
  Nt = !1, sr = !0, Ue = "Update ready. Restart to install.", Pt = "", j == null || j.webContents.send("update-status", Ue), j == null || j.webContents.send("update-ready"), console.log("Update downloaded and ready to install.");
});
Me.autoUpdater.on("error", (e) => {
  Nt = !1, sr = !1, Ue = "", Pt = e.message, j == null || j.webContents.send("update-status", Ue), j == null || j.webContents.send("update-error", Pt), console.error("Update error:", Pt);
});
Ge.handle("check-for-updates", async () => {
  try {
    const e = await Me.autoUpdater.checkForUpdates();
    return { found: !!(e != null && e.updateInfo) };
  } catch (e) {
    throw console.error("Error checking for updates:", e), e;
  }
});
Ge.handle("get-update-state", () => ({
  status: Ue,
  progress: Qt,
  error: Pt,
  isReady: sr,
  isDownloading: Nt
}));
Ge.handle("restart-and-install", () => {
  ao = !0, Me.autoUpdater.quitAndInstall();
});
xt.whenReady().then(() => {
  Ad(), Me.autoUpdater.checkForUpdates(), setInterval(() => {
    Me.autoUpdater.checkForUpdates();
  }, 10 * 60 * 1e3);
});
export {
  Zb as M,
  Rb as R,
  io as V,
  Te as c,
  Ku as g,
  Db as o
};
