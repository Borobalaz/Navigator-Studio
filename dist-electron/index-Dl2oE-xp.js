import X from "node:process";
import { Buffer as $r } from "node:buffer";
import te from "node:path";
import { fileURLToPath as Bt } from "node:url";
import $t, { ChildProcess as Tn } from "node:child_process";
import At from "node:fs/promises";
import Nt, { createWriteStream as $n, createReadStream as An, constants as Ar } from "node:fs";
import { g as re, c as Z } from "./main-CdR7C2yv.js";
import ye from "os";
import ve, { promises as On } from "fs";
import Ge from "path";
import Or from "child_process";
import Cr from "assert";
import Gr from "events";
import Rr from "buffer";
import Re from "stream";
import Br from "util";
import Cn, { constants as Nr } from "node:os";
import { debuglog as Gn } from "node:util";
var Ot = { exports: {} };
const Mr = ve;
let at;
function Rn() {
  try {
    return Mr.statSync("/.dockerenv"), !0;
  } catch {
    return !1;
  }
}
function Bn() {
  try {
    return Mr.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return !1;
  }
}
var Nn = () => (at === void 0 && (at = Rn() || Bn()), at);
const Mn = ye, Ln = ve, tr = Nn, rr = () => {
  if (process.platform !== "linux")
    return !1;
  if (Mn.release().toLowerCase().includes("microsoft"))
    return !tr();
  try {
    return Ln.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !tr() : !1;
  } catch {
    return !1;
  }
};
process.env.__IS_WSL_TEST__ ? Ot.exports = rr : Ot.exports = rr();
var _n = Ot.exports;
const De = /* @__PURE__ */ re(_n);
function Be(e, t, o) {
  const n = (a) => Object.defineProperty(e, t, { value: a, enumerable: !0, writable: !0 });
  return Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    get() {
      const a = o();
      return n(a), a;
    },
    set(a) {
      n(a);
    }
  }), e;
}
var Lr = {}, _r = { exports: {} };
(function(e) {
  var t = function(o) {
    var n = 1e7, a = 7, c = 9007199254740992, l = A(c), y = "0123456789abcdefghijklmnopqrstuvwxyz", b = typeof BigInt == "function";
    function d(r, i, s, u) {
      return typeof r > "u" ? d[0] : typeof i < "u" ? +i == 10 && !s ? E(r) : En(r, i, s, u) : E(r);
    }
    function f(r, i) {
      this.value = r, this.sign = i, this.isSmall = !1;
    }
    f.prototype = Object.create(d.prototype);
    function h(r) {
      this.value = r, this.sign = r < 0, this.isSmall = !0;
    }
    h.prototype = Object.create(d.prototype);
    function g(r) {
      this.value = r;
    }
    g.prototype = Object.create(d.prototype);
    function I(r) {
      return -c < r && r < c;
    }
    function A(r) {
      return r < 1e7 ? [r] : r < 1e14 ? [r % 1e7, Math.floor(r / 1e7)] : [r % 1e7, Math.floor(r / 1e7) % 1e7, Math.floor(r / 1e14)];
    }
    function O(r) {
      M(r);
      var i = r.length;
      if (i < 4 && R(r, l) < 0)
        switch (i) {
          case 0:
            return 0;
          case 1:
            return r[0];
          case 2:
            return r[0] + r[1] * n;
          default:
            return r[0] + (r[1] + r[2] * n) * n;
        }
      return r;
    }
    function M(r) {
      for (var i = r.length; r[--i] === 0; ) ;
      r.length = i + 1;
    }
    function D(r) {
      for (var i = new Array(r), s = -1; ++s < r; )
        i[s] = 0;
      return i;
    }
    function j(r) {
      return r > 0 ? Math.floor(r) : Math.ceil(r);
    }
    function H(r, i) {
      var s = r.length, u = i.length, m = new Array(s), p = 0, v = n, w, S;
      for (S = 0; S < u; S++)
        w = r[S] + i[S] + p, p = w >= v ? 1 : 0, m[S] = w - p * v;
      for (; S < s; )
        w = r[S] + p, p = w === v ? 1 : 0, m[S++] = w - p * v;
      return p > 0 && m.push(p), m;
    }
    function x(r, i) {
      return r.length >= i.length ? H(r, i) : H(i, r);
    }
    function Y(r, i) {
      var s = r.length, u = new Array(s), m = n, p, v;
      for (v = 0; v < s; v++)
        p = r[v] - m + i, i = Math.floor(p / m), u[v] = p - i * m, i += 1;
      for (; i > 0; )
        u[v++] = i % m, i = Math.floor(i / m);
      return u;
    }
    f.prototype.add = function(r) {
      var i = E(r);
      if (this.sign !== i.sign)
        return this.subtract(i.negate());
      var s = this.value, u = i.value;
      return i.isSmall ? new f(Y(s, Math.abs(u)), this.sign) : new f(x(s, u), this.sign);
    }, f.prototype.plus = f.prototype.add, h.prototype.add = function(r) {
      var i = E(r), s = this.value;
      if (s < 0 !== i.sign)
        return this.subtract(i.negate());
      var u = i.value;
      if (i.isSmall) {
        if (I(s + u)) return new h(s + u);
        u = A(Math.abs(u));
      }
      return new f(Y(u, Math.abs(s)), s < 0);
    }, h.prototype.plus = h.prototype.add, g.prototype.add = function(r) {
      return new g(this.value + E(r).value);
    }, g.prototype.plus = g.prototype.add;
    function K(r, i) {
      var s = r.length, u = i.length, m = new Array(s), p = 0, v = n, w, S;
      for (w = 0; w < u; w++)
        S = r[w] - p - i[w], S < 0 ? (S += v, p = 1) : p = 0, m[w] = S;
      for (w = u; w < s; w++) {
        if (S = r[w] - p, S < 0) S += v;
        else {
          m[w++] = S;
          break;
        }
        m[w] = S;
      }
      for (; w < s; w++)
        m[w] = r[w];
      return M(m), m;
    }
    function L(r, i, s) {
      var u;
      return R(r, i) >= 0 ? u = K(r, i) : (u = K(i, r), s = !s), u = O(u), typeof u == "number" ? (s && (u = -u), new h(u)) : new f(u, s);
    }
    function ce(r, i, s) {
      var u = r.length, m = new Array(u), p = -i, v = n, w, S;
      for (w = 0; w < u; w++)
        S = r[w] + p, p = Math.floor(S / v), S %= v, m[w] = S < 0 ? S + v : S;
      return m = O(m), typeof m == "number" ? (s && (m = -m), new h(m)) : new f(m, s);
    }
    f.prototype.subtract = function(r) {
      var i = E(r);
      if (this.sign !== i.sign)
        return this.add(i.negate());
      var s = this.value, u = i.value;
      return i.isSmall ? ce(s, Math.abs(u), this.sign) : L(s, u, this.sign);
    }, f.prototype.minus = f.prototype.subtract, h.prototype.subtract = function(r) {
      var i = E(r), s = this.value;
      if (s < 0 !== i.sign)
        return this.add(i.negate());
      var u = i.value;
      return i.isSmall ? new h(s - u) : ce(u, Math.abs(s), s >= 0);
    }, h.prototype.minus = h.prototype.subtract, g.prototype.subtract = function(r) {
      return new g(this.value - E(r).value);
    }, g.prototype.minus = g.prototype.subtract, f.prototype.negate = function() {
      return new f(this.value, !this.sign);
    }, h.prototype.negate = function() {
      var r = this.sign, i = new h(-this.value);
      return i.sign = !r, i;
    }, g.prototype.negate = function() {
      return new g(-this.value);
    }, f.prototype.abs = function() {
      return new f(this.value, !1);
    }, h.prototype.abs = function() {
      return new h(Math.abs(this.value));
    }, g.prototype.abs = function() {
      return new g(this.value >= 0 ? this.value : -this.value);
    };
    function xe(r, i) {
      var s = r.length, u = i.length, m = s + u, p = D(m), v = n, w, S, T, C, $;
      for (T = 0; T < s; ++T) {
        C = r[T];
        for (var N = 0; N < u; ++N)
          $ = i[N], w = C * $ + p[T + N], S = Math.floor(w / v), p[T + N] = w - S * v, p[T + N + 1] += S;
      }
      return M(p), p;
    }
    function ne(r, i) {
      var s = r.length, u = new Array(s), m = n, p = 0, v, w;
      for (w = 0; w < s; w++)
        v = r[w] * i + p, p = Math.floor(v / m), u[w] = v - p * m;
      for (; p > 0; )
        u[w++] = p % m, p = Math.floor(p / m);
      return u;
    }
    function Le(r, i) {
      for (var s = []; i-- > 0; ) s.push(0);
      return s.concat(r);
    }
    function ue(r, i) {
      var s = Math.max(r.length, i.length);
      if (s <= 30) return xe(r, i);
      s = Math.ceil(s / 2);
      var u = r.slice(s), m = r.slice(0, s), p = i.slice(s), v = i.slice(0, s), w = ue(m, v), S = ue(u, p), T = ue(x(m, u), x(v, p)), C = x(x(w, Le(K(K(T, w), S), s)), Le(S, 2 * s));
      return M(C), C;
    }
    function Qe(r, i) {
      return -0.012 * r - 0.012 * i + 15e-6 * r * i > 0;
    }
    f.prototype.multiply = function(r) {
      var i = E(r), s = this.value, u = i.value, m = this.sign !== i.sign, p;
      if (i.isSmall) {
        if (u === 0) return d[0];
        if (u === 1) return this;
        if (u === -1) return this.negate();
        if (p = Math.abs(u), p < n)
          return new f(ne(s, p), m);
        u = A(p);
      }
      return Qe(s.length, u.length) ? new f(ue(s, u), m) : new f(xe(s, u), m);
    }, f.prototype.times = f.prototype.multiply;
    function _e(r, i, s) {
      return r < n ? new f(ne(i, r), s) : new f(xe(i, A(r)), s);
    }
    h.prototype._multiplyBySmall = function(r) {
      return I(r.value * this.value) ? new h(r.value * this.value) : _e(Math.abs(r.value), A(Math.abs(this.value)), this.sign !== r.sign);
    }, f.prototype._multiplyBySmall = function(r) {
      return r.value === 0 ? d[0] : r.value === 1 ? this : r.value === -1 ? this.negate() : _e(Math.abs(r.value), this.value, this.sign !== r.sign);
    }, h.prototype.multiply = function(r) {
      return E(r)._multiplyBySmall(this);
    }, h.prototype.times = h.prototype.multiply, g.prototype.multiply = function(r) {
      return new g(this.value * E(r).value);
    }, g.prototype.times = g.prototype.multiply;
    function Ee(r) {
      var i = r.length, s = D(i + i), u = n, m, p, v, w, S;
      for (v = 0; v < i; v++) {
        w = r[v], p = 0 - w * w;
        for (var T = v; T < i; T++)
          S = r[T], m = 2 * (w * S) + s[v + T] + p, p = Math.floor(m / u), s[v + T] = m - p * u;
        s[v + i] = p;
      }
      return M(s), s;
    }
    f.prototype.square = function() {
      return new f(Ee(this.value), !1);
    }, h.prototype.square = function() {
      var r = this.value * this.value;
      return I(r) ? new h(r) : new f(Ee(A(Math.abs(this.value))), !1);
    }, g.prototype.square = function(r) {
      return new g(this.value * this.value);
    };
    function et(r, i) {
      var s = r.length, u = i.length, m = n, p = D(i.length), v = i[u - 1], w = Math.ceil(m / (2 * v)), S = ne(r, w), T = ne(i, w), C, $, N, Q, J, it, st;
      for (S.length <= s && S.push(0), T.push(0), v = T[u - 1], $ = s - u; $ >= 0; $--) {
        for (C = m - 1, S[$ + u] !== v && (C = Math.floor((S[$ + u] * m + S[$ + u - 1]) / v)), N = 0, Q = 0, it = T.length, J = 0; J < it; J++)
          N += C * T[J], st = Math.floor(N / m), Q += S[$ + J] - (N - st * m), N = st, Q < 0 ? (S[$ + J] = Q + m, Q = -1) : (S[$ + J] = Q, Q = 0);
        for (; Q !== 0; ) {
          for (C -= 1, N = 0, J = 0; J < it; J++)
            N += S[$ + J] - m + T[J], N < 0 ? (S[$ + J] = N + m, N = 0) : (S[$ + J] = N, N = 1);
          Q += N;
        }
        p[$] = C;
      }
      return S = P(S, w)[0], [O(p), O(S)];
    }
    function tt(r, i) {
      for (var s = r.length, u = i.length, m = [], p = [], v = n, w, S, T, C, $; s; ) {
        if (p.unshift(r[--s]), M(p), R(p, i) < 0) {
          m.push(0);
          continue;
        }
        S = p.length, T = p[S - 1] * v + p[S - 2], C = i[u - 1] * v + i[u - 2], S > u && (T = (T + 1) * v), w = Math.ceil(T / C);
        do {
          if ($ = ne(i, w), R($, p) <= 0) break;
          w--;
        } while (w);
        m.push(w), p = K(p, $);
      }
      return m.reverse(), [O(m), O(p)];
    }
    function P(r, i) {
      var s = r.length, u = D(s), m = n, p, v, w, S;
      for (w = 0, p = s - 1; p >= 0; --p)
        S = w * m + r[p], v = j(S / i), w = S - v * i, u[p] = v | 0;
      return [u, w | 0];
    }
    function G(r, i) {
      var s, u = E(i);
      if (b)
        return [new g(r.value / u.value), new g(r.value % u.value)];
      var m = r.value, p = u.value, v;
      if (p === 0) throw new Error("Cannot divide by zero");
      if (r.isSmall)
        return u.isSmall ? [new h(j(m / p)), new h(m % p)] : [d[0], r];
      if (u.isSmall) {
        if (p === 1) return [r, d[0]];
        if (p == -1) return [r.negate(), d[0]];
        var w = Math.abs(p);
        if (w < n) {
          s = P(m, w), v = O(s[0]);
          var S = s[1];
          return r.sign && (S = -S), typeof v == "number" ? (r.sign !== u.sign && (v = -v), [new h(v), new h(S)]) : [new f(v, r.sign !== u.sign), new h(S)];
        }
        p = A(w);
      }
      var T = R(m, p);
      if (T === -1) return [d[0], r];
      if (T === 0) return [d[r.sign === u.sign ? 1 : -1], d[0]];
      m.length + p.length <= 200 ? s = et(m, p) : s = tt(m, p), v = s[0];
      var C = r.sign !== u.sign, $ = s[1], N = r.sign;
      return typeof v == "number" ? (C && (v = -v), v = new h(v)) : v = new f(v, C), typeof $ == "number" ? (N && ($ = -$), $ = new h($)) : $ = new f($, N), [v, $];
    }
    f.prototype.divmod = function(r) {
      var i = G(this, r);
      return {
        quotient: i[0],
        remainder: i[1]
      };
    }, g.prototype.divmod = h.prototype.divmod = f.prototype.divmod, f.prototype.divide = function(r) {
      return G(this, r)[0];
    }, g.prototype.over = g.prototype.divide = function(r) {
      return new g(this.value / E(r).value);
    }, h.prototype.over = h.prototype.divide = f.prototype.over = f.prototype.divide, f.prototype.mod = function(r) {
      return G(this, r)[1];
    }, g.prototype.mod = g.prototype.remainder = function(r) {
      return new g(this.value % E(r).value);
    }, h.prototype.remainder = h.prototype.mod = f.prototype.remainder = f.prototype.mod, f.prototype.pow = function(r) {
      var i = E(r), s = this.value, u = i.value, m, p, v;
      if (u === 0) return d[1];
      if (s === 0) return d[0];
      if (s === 1) return d[1];
      if (s === -1) return i.isEven() ? d[1] : d[-1];
      if (i.sign)
        return d[0];
      if (!i.isSmall) throw new Error("The exponent " + i.toString() + " is too large.");
      if (this.isSmall && I(m = Math.pow(s, u)))
        return new h(j(m));
      for (p = this, v = d[1]; u & !0 && (v = v.times(p), --u), u !== 0; )
        u /= 2, p = p.square();
      return v;
    }, h.prototype.pow = f.prototype.pow, g.prototype.pow = function(r) {
      var i = E(r), s = this.value, u = i.value, m = BigInt(0), p = BigInt(1), v = BigInt(2);
      if (u === m) return d[1];
      if (s === m) return d[0];
      if (s === p) return d[1];
      if (s === BigInt(-1)) return i.isEven() ? d[1] : d[-1];
      if (i.isNegative()) return new g(m);
      for (var w = this, S = d[1]; (u & p) === p && (S = S.times(w), --u), u !== m; )
        u /= v, w = w.square();
      return S;
    }, f.prototype.modPow = function(r, i) {
      if (r = E(r), i = E(i), i.isZero()) throw new Error("Cannot take modPow with modulus 0");
      var s = d[1], u = this.mod(i);
      for (r.isNegative() && (r = r.multiply(d[-1]), u = u.modInv(i)); r.isPositive(); ) {
        if (u.isZero()) return d[0];
        r.isOdd() && (s = s.multiply(u).mod(i)), r = r.divide(2), u = u.square().mod(i);
      }
      return s;
    }, g.prototype.modPow = h.prototype.modPow = f.prototype.modPow;
    function R(r, i) {
      if (r.length !== i.length)
        return r.length > i.length ? 1 : -1;
      for (var s = r.length - 1; s >= 0; s--)
        if (r[s] !== i[s]) return r[s] > i[s] ? 1 : -1;
      return 0;
    }
    f.prototype.compareAbs = function(r) {
      var i = E(r), s = this.value, u = i.value;
      return i.isSmall ? 1 : R(s, u);
    }, h.prototype.compareAbs = function(r) {
      var i = E(r), s = Math.abs(this.value), u = i.value;
      return i.isSmall ? (u = Math.abs(u), s === u ? 0 : s > u ? 1 : -1) : -1;
    }, g.prototype.compareAbs = function(r) {
      var i = this.value, s = E(r).value;
      return i = i >= 0 ? i : -i, s = s >= 0 ? s : -s, i === s ? 0 : i > s ? 1 : -1;
    }, f.prototype.compare = function(r) {
      if (r === 1 / 0)
        return -1;
      if (r === -1 / 0)
        return 1;
      var i = E(r), s = this.value, u = i.value;
      return this.sign !== i.sign ? i.sign ? 1 : -1 : i.isSmall ? this.sign ? -1 : 1 : R(s, u) * (this.sign ? -1 : 1);
    }, f.prototype.compareTo = f.prototype.compare, h.prototype.compare = function(r) {
      if (r === 1 / 0)
        return -1;
      if (r === -1 / 0)
        return 1;
      var i = E(r), s = this.value, u = i.value;
      return i.isSmall ? s == u ? 0 : s > u ? 1 : -1 : s < 0 !== i.sign ? s < 0 ? -1 : 1 : s < 0 ? 1 : -1;
    }, h.prototype.compareTo = h.prototype.compare, g.prototype.compare = function(r) {
      if (r === 1 / 0)
        return -1;
      if (r === -1 / 0)
        return 1;
      var i = this.value, s = E(r).value;
      return i === s ? 0 : i > s ? 1 : -1;
    }, g.prototype.compareTo = g.prototype.compare, f.prototype.equals = function(r) {
      return this.compare(r) === 0;
    }, g.prototype.eq = g.prototype.equals = h.prototype.eq = h.prototype.equals = f.prototype.eq = f.prototype.equals, f.prototype.notEquals = function(r) {
      return this.compare(r) !== 0;
    }, g.prototype.neq = g.prototype.notEquals = h.prototype.neq = h.prototype.notEquals = f.prototype.neq = f.prototype.notEquals, f.prototype.greater = function(r) {
      return this.compare(r) > 0;
    }, g.prototype.gt = g.prototype.greater = h.prototype.gt = h.prototype.greater = f.prototype.gt = f.prototype.greater, f.prototype.lesser = function(r) {
      return this.compare(r) < 0;
    }, g.prototype.lt = g.prototype.lesser = h.prototype.lt = h.prototype.lesser = f.prototype.lt = f.prototype.lesser, f.prototype.greaterOrEquals = function(r) {
      return this.compare(r) >= 0;
    }, g.prototype.geq = g.prototype.greaterOrEquals = h.prototype.geq = h.prototype.greaterOrEquals = f.prototype.geq = f.prototype.greaterOrEquals, f.prototype.lesserOrEquals = function(r) {
      return this.compare(r) <= 0;
    }, g.prototype.leq = g.prototype.lesserOrEquals = h.prototype.leq = h.prototype.lesserOrEquals = f.prototype.leq = f.prototype.lesserOrEquals, f.prototype.isEven = function() {
      return (this.value[0] & 1) === 0;
    }, h.prototype.isEven = function() {
      return (this.value & 1) === 0;
    }, g.prototype.isEven = function() {
      return (this.value & BigInt(1)) === BigInt(0);
    }, f.prototype.isOdd = function() {
      return (this.value[0] & 1) === 1;
    }, h.prototype.isOdd = function() {
      return (this.value & 1) === 1;
    }, g.prototype.isOdd = function() {
      return (this.value & BigInt(1)) === BigInt(1);
    }, f.prototype.isPositive = function() {
      return !this.sign;
    }, h.prototype.isPositive = function() {
      return this.value > 0;
    }, g.prototype.isPositive = h.prototype.isPositive, f.prototype.isNegative = function() {
      return this.sign;
    }, h.prototype.isNegative = function() {
      return this.value < 0;
    }, g.prototype.isNegative = h.prototype.isNegative, f.prototype.isUnit = function() {
      return !1;
    }, h.prototype.isUnit = function() {
      return Math.abs(this.value) === 1;
    }, g.prototype.isUnit = function() {
      return this.abs().value === BigInt(1);
    }, f.prototype.isZero = function() {
      return !1;
    }, h.prototype.isZero = function() {
      return this.value === 0;
    }, g.prototype.isZero = function() {
      return this.value === BigInt(0);
    }, f.prototype.isDivisibleBy = function(r) {
      var i = E(r);
      return i.isZero() ? !1 : i.isUnit() ? !0 : i.compareAbs(2) === 0 ? this.isEven() : this.mod(i).isZero();
    }, g.prototype.isDivisibleBy = h.prototype.isDivisibleBy = f.prototype.isDivisibleBy;
    function B(r) {
      var i = r.abs();
      if (i.isUnit()) return !1;
      if (i.equals(2) || i.equals(3) || i.equals(5)) return !0;
      if (i.isEven() || i.isDivisibleBy(3) || i.isDivisibleBy(5)) return !1;
      if (i.lesser(49)) return !0;
    }
    function U(r, i) {
      for (var s = r.prev(), u = s, m = 0, p, v, w; u.isEven(); ) u = u.divide(2), m++;
      e: for (v = 0; v < i.length; v++)
        if (!r.lesser(i[v]) && (w = t(i[v]).modPow(u, r), !(w.isUnit() || w.equals(s)))) {
          for (p = m - 1; p != 0; p--) {
            if (w = w.square().mod(r), w.isUnit()) return !1;
            if (w.equals(s)) continue e;
          }
          return !1;
        }
      return !0;
    }
    f.prototype.isPrime = function(r) {
      var i = B(this);
      if (i !== o) return i;
      var s = this.abs(), u = s.bitLength();
      if (u <= 64)
        return U(s, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
      for (var m = Math.log(2) * u.toJSNumber(), p = Math.ceil(r === !0 ? 2 * Math.pow(m, 2) : m), v = [], w = 0; w < p; w++)
        v.push(t(w + 2));
      return U(s, v);
    }, g.prototype.isPrime = h.prototype.isPrime = f.prototype.isPrime, f.prototype.isProbablePrime = function(r, i) {
      var s = B(this);
      if (s !== o) return s;
      for (var u = this.abs(), m = r === o ? 5 : r, p = [], v = 0; v < m; v++)
        p.push(t.randBetween(2, u.minus(2), i));
      return U(u, p);
    }, g.prototype.isProbablePrime = h.prototype.isProbablePrime = f.prototype.isProbablePrime, f.prototype.modInv = function(r) {
      for (var i = t.zero, s = t.one, u = E(r), m = this.abs(), p, v, w; !m.isZero(); )
        p = u.divide(m), v = i, w = u, i = s, u = m, s = v.subtract(p.multiply(s)), m = w.subtract(p.multiply(m));
      if (!u.isUnit()) throw new Error(this.toString() + " and " + r.toString() + " are not co-prime");
      return i.compare(0) === -1 && (i = i.add(r)), this.isNegative() ? i.negate() : i;
    }, g.prototype.modInv = h.prototype.modInv = f.prototype.modInv, f.prototype.next = function() {
      var r = this.value;
      return this.sign ? ce(r, 1, this.sign) : new f(Y(r, 1), this.sign);
    }, h.prototype.next = function() {
      var r = this.value;
      return r + 1 < c ? new h(r + 1) : new f(l, !1);
    }, g.prototype.next = function() {
      return new g(this.value + BigInt(1));
    }, f.prototype.prev = function() {
      var r = this.value;
      return this.sign ? new f(Y(r, 1), !0) : ce(r, 1, this.sign);
    }, h.prototype.prev = function() {
      var r = this.value;
      return r - 1 > -c ? new h(r - 1) : new f(l, !0);
    }, g.prototype.prev = function() {
      return new g(this.value - BigInt(1));
    };
    for (var F = [1]; 2 * F[F.length - 1] <= n; ) F.push(2 * F[F.length - 1]);
    var q = F.length, V = F[q - 1];
    function Kt(r) {
      return Math.abs(r) <= n;
    }
    f.prototype.shiftLeft = function(r) {
      var i = E(r).toJSNumber();
      if (!Kt(i))
        throw new Error(String(i) + " is too large for shifting.");
      if (i < 0) return this.shiftRight(-i);
      var s = this;
      if (s.isZero()) return s;
      for (; i >= q; )
        s = s.multiply(V), i -= q - 1;
      return s.multiply(F[i]);
    }, g.prototype.shiftLeft = h.prototype.shiftLeft = f.prototype.shiftLeft, f.prototype.shiftRight = function(r) {
      var i, s = E(r).toJSNumber();
      if (!Kt(s))
        throw new Error(String(s) + " is too large for shifting.");
      if (s < 0) return this.shiftLeft(-s);
      for (var u = this; s >= q; ) {
        if (u.isZero() || u.isNegative() && u.isUnit()) return u;
        i = G(u, V), u = i[1].isNegative() ? i[0].prev() : i[0], s -= q - 1;
      }
      return i = G(u, F[s]), i[1].isNegative() ? i[0].prev() : i[0];
    }, g.prototype.shiftRight = h.prototype.shiftRight = f.prototype.shiftRight;
    function rt(r, i, s) {
      i = E(i);
      for (var u = r.isNegative(), m = i.isNegative(), p = u ? r.not() : r, v = m ? i.not() : i, w = 0, S = 0, T = null, C = null, $ = []; !p.isZero() || !v.isZero(); )
        T = G(p, V), w = T[1].toJSNumber(), u && (w = V - 1 - w), C = G(v, V), S = C[1].toJSNumber(), m && (S = V - 1 - S), p = T[0], v = C[0], $.push(s(w, S));
      for (var N = s(u ? 1 : 0, m ? 1 : 0) !== 0 ? t(-1) : t(0), Q = $.length - 1; Q >= 0; Q -= 1)
        N = N.multiply(V).add(t($[Q]));
      return N;
    }
    f.prototype.not = function() {
      return this.negate().prev();
    }, g.prototype.not = h.prototype.not = f.prototype.not, f.prototype.and = function(r) {
      return rt(this, r, function(i, s) {
        return i & s;
      });
    }, g.prototype.and = h.prototype.and = f.prototype.and, f.prototype.or = function(r) {
      return rt(this, r, function(i, s) {
        return i | s;
      });
    }, g.prototype.or = h.prototype.or = f.prototype.or, f.prototype.xor = function(r) {
      return rt(this, r, function(i, s) {
        return i ^ s;
      });
    }, g.prototype.xor = h.prototype.xor = f.prototype.xor;
    var nt = 1 << 30, Sn = (n & -n) * (n & -n) | nt;
    function ke(r) {
      var i = r.value, s = typeof i == "number" ? i | nt : typeof i == "bigint" ? i | BigInt(nt) : i[0] + i[1] * n | Sn;
      return s & -s;
    }
    function Zt(r, i) {
      if (i.compareTo(r) <= 0) {
        var s = Zt(r, i.square(i)), u = s.p, m = s.e, p = u.multiply(i);
        return p.compareTo(r) <= 0 ? { p, e: m * 2 + 1 } : { p: u, e: m * 2 };
      }
      return { p: t(1), e: 0 };
    }
    f.prototype.bitLength = function() {
      var r = this;
      return r.compareTo(t(0)) < 0 && (r = r.negate().subtract(t(1))), r.compareTo(t(0)) === 0 ? t(0) : t(Zt(r, t(2)).e).add(t(1));
    }, g.prototype.bitLength = h.prototype.bitLength = f.prototype.bitLength;
    function Vt(r, i) {
      return r = E(r), i = E(i), r.greater(i) ? r : i;
    }
    function ot(r, i) {
      return r = E(r), i = E(i), r.lesser(i) ? r : i;
    }
    function Jt(r, i) {
      if (r = E(r).abs(), i = E(i).abs(), r.equals(i)) return r;
      if (r.isZero()) return i;
      if (i.isZero()) return r;
      for (var s = d[1], u, m; r.isEven() && i.isEven(); )
        u = ot(ke(r), ke(i)), r = r.divide(u), i = i.divide(u), s = s.multiply(u);
      for (; r.isEven(); )
        r = r.divide(ke(r));
      do {
        for (; i.isEven(); )
          i = i.divide(ke(i));
        r.greater(i) && (m = i, i = r, r = m), i = i.subtract(r);
      } while (!i.isZero());
      return s.isUnit() ? r : r.multiply(s);
    }
    function bn(r, i) {
      return r = E(r).abs(), i = E(i).abs(), r.divide(Jt(r, i)).multiply(i);
    }
    function xn(r, i, s) {
      r = E(r), i = E(i);
      var u = s || Math.random, m = ot(r, i), p = Vt(r, i), v = p.subtract(m).add(1);
      if (v.isSmall) return m.add(Math.floor(u() * v));
      for (var w = Ie(v, n).value, S = [], T = !0, C = 0; C < w.length; C++) {
        var $ = T ? w[C] + (C + 1 < w.length ? w[C + 1] / n : 0) : n, N = j(u() * $);
        S.push(N), N < w[C] && (T = !1);
      }
      return m.add(d.fromArray(S, n, !1));
    }
    var En = function(r, i, s, u) {
      s = s || y, r = String(r), u || (r = r.toLowerCase(), s = s.toLowerCase());
      var m = r.length, p, v = Math.abs(i), w = {};
      for (p = 0; p < s.length; p++)
        w[s[p]] = p;
      for (p = 0; p < m; p++) {
        var S = r[p];
        if (S !== "-" && S in w && w[S] >= v) {
          if (S === "1" && v === 1) continue;
          throw new Error(S + " is not a valid digit in base " + i + ".");
        }
      }
      i = E(i);
      var T = [], C = r[0] === "-";
      for (p = C ? 1 : 0; p < r.length; p++) {
        var S = r[p];
        if (S in w) T.push(E(w[S]));
        else if (S === "<") {
          var $ = p;
          do
            p++;
          while (r[p] !== ">" && p < r.length);
          T.push(E(r.slice($ + 1, p)));
        } else throw new Error(S + " is not a valid character");
      }
      return Yt(T, i, C);
    };
    function Yt(r, i, s) {
      var u = d[0], m = d[1], p;
      for (p = r.length - 1; p >= 0; p--)
        u = u.add(r[p].times(m)), m = m.times(i);
      return s ? u.negate() : u;
    }
    function In(r, i) {
      return i = i || y, r < i.length ? i[r] : "<" + r + ">";
    }
    function Ie(r, i) {
      if (i = t(i), i.isZero()) {
        if (r.isZero()) return { value: [0], isNegative: !1 };
        throw new Error("Cannot convert nonzero numbers to base 0.");
      }
      if (i.equals(-1)) {
        if (r.isZero()) return { value: [0], isNegative: !1 };
        if (r.isNegative())
          return {
            value: [].concat.apply(
              [],
              Array.apply(null, Array(-r.toJSNumber())).map(Array.prototype.valueOf, [1, 0])
            ),
            isNegative: !1
          };
        var s = Array.apply(null, Array(r.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
        return s.unshift([1]), {
          value: [].concat.apply([], s),
          isNegative: !1
        };
      }
      var u = !1;
      if (r.isNegative() && i.isPositive() && (u = !0, r = r.abs()), i.isUnit())
        return r.isZero() ? { value: [0], isNegative: !1 } : {
          value: Array.apply(null, Array(r.toJSNumber())).map(Number.prototype.valueOf, 1),
          isNegative: u
        };
      for (var m = [], p = r, v; p.isNegative() || p.compareAbs(i) >= 0; ) {
        v = p.divmod(i), p = v.quotient;
        var w = v.remainder;
        w.isNegative() && (w = i.minus(w).abs(), p = p.next()), m.push(w.toJSNumber());
      }
      return m.push(p.toJSNumber()), { value: m.reverse(), isNegative: u };
    }
    function Qt(r, i, s) {
      var u = Ie(r, i);
      return (u.isNegative ? "-" : "") + u.value.map(function(m) {
        return In(m, s);
      }).join("");
    }
    f.prototype.toArray = function(r) {
      return Ie(this, r);
    }, h.prototype.toArray = function(r) {
      return Ie(this, r);
    }, g.prototype.toArray = function(r) {
      return Ie(this, r);
    }, f.prototype.toString = function(r, i) {
      if (r === o && (r = 10), r !== 10 || i) return Qt(this, r, i);
      for (var s = this.value, u = s.length, m = String(s[--u]), p = "0000000", v; --u >= 0; )
        v = String(s[u]), m += p.slice(v.length) + v;
      var w = this.sign ? "-" : "";
      return w + m;
    }, h.prototype.toString = function(r, i) {
      return r === o && (r = 10), r != 10 || i ? Qt(this, r, i) : String(this.value);
    }, g.prototype.toString = h.prototype.toString, g.prototype.toJSON = f.prototype.toJSON = h.prototype.toJSON = function() {
      return this.toString();
    }, f.prototype.valueOf = function() {
      return parseInt(this.toString(), 10);
    }, f.prototype.toJSNumber = f.prototype.valueOf, h.prototype.valueOf = function() {
      return this.value;
    }, h.prototype.toJSNumber = h.prototype.valueOf, g.prototype.valueOf = g.prototype.toJSNumber = function() {
      return parseInt(this.toString(), 10);
    };
    function er(r) {
      if (I(+r)) {
        var i = +r;
        if (i === j(i))
          return b ? new g(BigInt(i)) : new h(i);
        throw new Error("Invalid integer: " + r);
      }
      var s = r[0] === "-";
      s && (r = r.slice(1));
      var u = r.split(/e/i);
      if (u.length > 2) throw new Error("Invalid integer: " + u.join("e"));
      if (u.length === 2) {
        var m = u[1];
        if (m[0] === "+" && (m = m.slice(1)), m = +m, m !== j(m) || !I(m)) throw new Error("Invalid integer: " + m + " is not a valid exponent.");
        var p = u[0], v = p.indexOf(".");
        if (v >= 0 && (m -= p.length - v - 1, p = p.slice(0, v) + p.slice(v + 1)), m < 0) throw new Error("Cannot include negative exponent part for integers");
        p += new Array(m + 1).join("0"), r = p;
      }
      var w = /^([0-9][0-9]*)$/.test(r);
      if (!w) throw new Error("Invalid integer: " + r);
      if (b)
        return new g(BigInt(s ? "-" + r : r));
      for (var S = [], T = r.length, C = a, $ = T - C; T > 0; )
        S.push(+r.slice($, T)), $ -= C, $ < 0 && ($ = 0), T -= C;
      return M(S), new f(S, s);
    }
    function Pn(r) {
      if (b)
        return new g(BigInt(r));
      if (I(r)) {
        if (r !== j(r)) throw new Error(r + " is not an integer.");
        return new h(r);
      }
      return er(r.toString());
    }
    function E(r) {
      return typeof r == "number" ? Pn(r) : typeof r == "string" ? er(r) : typeof r == "bigint" ? new g(r) : r;
    }
    for (var oe = 0; oe < 1e3; oe++)
      d[oe] = E(oe), oe > 0 && (d[-oe] = E(-oe));
    return d.one = d[1], d.zero = d[0], d.minusOne = d[-1], d.max = Vt, d.min = ot, d.gcd = Jt, d.lcm = bn, d.isInstance = function(r) {
      return r instanceof f || r instanceof h || r instanceof g;
    }, d.randBetween = xn, d.fromArray = function(r, i, s) {
      return Yt(r.map(E), E(i || 10), s);
    }, d;
  }();
  e.hasOwnProperty("exports") && (e.exports = t);
})(_r);
var kn = _r.exports;
(function(e) {
  const t = ve, o = kn;
  e.maxObjectSize = 100 * 1e3 * 1e3, e.maxObjectCount = 32768;
  const n = 9783072e5, a = e.UID = function(d) {
    this.UID = d;
  };
  e.parseFile = function(d, f) {
    return new Promise(function(h, g) {
      function I(A) {
        let O = null, M;
        try {
          M = c(A), h(M);
        } catch (D) {
          O = D, g(O);
        } finally {
          f && f(O, M);
        }
      }
      if (Buffer.isBuffer(d))
        return I(d);
      t.readFile(d, function(A, O) {
        if (A)
          return g(A), f(A);
        I(O);
      });
    });
  };
  const c = e.parseBuffer = function(d) {
    if (d.slice(0, 6).toString("utf8") !== "bplist")
      throw new Error("Invalid binary plist. Expected 'bplist' at offset 0.");
    const h = d.slice(d.length - 32, d.length), g = h.readUInt8(6), I = h.readUInt8(7), A = y(h, 8), O = y(h, 16), M = y(h, 24);
    if (A > e.maxObjectCount)
      throw new Error("maxObjectCount exceeded");
    const D = [];
    for (let H = 0; H < A; H++) {
      const x = d.slice(M + H * g, M + (H + 1) * g);
      D[H] = l(x, 0);
    }
    function j(H) {
      const x = D[H], Y = d[x], K = (Y & 240) >> 4, L = Y & 15;
      switch (K) {
        case 0:
          return ce();
        case 1:
          return ne();
        case 8:
          return Le();
        case 2:
          return ue();
        case 3:
          return Qe();
        case 4:
          return _e();
        case 5:
          return Ee();
        case 6:
          return Ee(!0);
        case 10:
          return et();
        case 13:
          return tt();
        default:
          throw new Error("Unhandled type 0x" + K.toString(16));
      }
      function ce() {
        switch (L) {
          case 0:
            return null;
          case 8:
            return !1;
          case 9:
            return !0;
          case 15:
            return null;
          default:
            throw new Error("Unhandled simple type 0x" + K.toString(16));
        }
      }
      function xe(P) {
        let G = "", R;
        for (R = 0; R < P.length && P[R] == 0; R++)
          ;
        for (; R < P.length; R++) {
          const B = "00" + P[R].toString(16);
          G += B.substr(B.length - 2);
        }
        return G;
      }
      function ne() {
        const P = Math.pow(2, L);
        if (L == 4) {
          const G = d.slice(x + 1, x + 1 + P), R = xe(G);
          return o(R, 16);
        }
        if (L == 3)
          return d.readInt32BE(x + 1);
        if (P < e.maxObjectSize)
          return l(d.slice(x + 1, x + 1 + P));
        throw new Error("To little heap space available! Wanted to read " + P + " bytes, but only " + e.maxObjectSize + " are available.");
      }
      function Le() {
        const P = L + 1;
        if (P < e.maxObjectSize)
          return new a(l(d.slice(x + 1, x + 1 + P)));
        throw new Error("To little heap space available! Wanted to read " + P + " bytes, but only " + e.maxObjectSize + " are available.");
      }
      function ue() {
        const P = Math.pow(2, L);
        if (P < e.maxObjectSize) {
          const G = d.slice(x + 1, x + 1 + P);
          if (P === 4)
            return G.readFloatBE(0);
          if (P === 8)
            return G.readDoubleBE(0);
        } else
          throw new Error("To little heap space available! Wanted to read " + P + " bytes, but only " + e.maxObjectSize + " are available.");
      }
      function Qe() {
        L != 3 && console.error("Unknown date type :" + L + ". Parsing anyway...");
        const P = d.slice(x + 1, x + 9);
        return new Date(n + 1e3 * P.readDoubleBE(0));
      }
      function _e() {
        let P = 1, G = L;
        if (L == 15) {
          const R = d[x + 1], B = (R & 240) / 16;
          B != 1 && console.error("0x4: UNEXPECTED LENGTH-INT TYPE! " + B);
          const U = R & 15, F = Math.pow(2, U);
          P = 2 + F, F < 3, G = l(d.slice(x + 2, x + 2 + F));
        }
        if (G < e.maxObjectSize)
          return d.slice(x + P, x + P + G);
        throw new Error("To little heap space available! Wanted to read " + G + " bytes, but only " + e.maxObjectSize + " are available.");
      }
      function Ee(P) {
        P = P || 0;
        let G = "utf8", R = L, B = 1;
        if (L == 15) {
          const U = d[x + 1], F = (U & 240) / 16;
          F != 1 && console.err("UNEXPECTED LENGTH-INT TYPE! " + F);
          const q = U & 15, V = Math.pow(2, q);
          B = 2 + V, V < 3, R = l(d.slice(x + 2, x + 2 + V));
        }
        if (R *= P + 1, R < e.maxObjectSize) {
          let U = Buffer.from(d.slice(x + B, x + B + R));
          return P && (U = b(U), G = "ucs2"), U.toString(G);
        }
        throw new Error("To little heap space available! Wanted to read " + R + " bytes, but only " + e.maxObjectSize + " are available.");
      }
      function et() {
        let P = L, G = 1;
        if (L == 15) {
          const B = d[x + 1], U = (B & 240) / 16;
          U != 1 && console.error("0xa: UNEXPECTED LENGTH-INT TYPE! " + U);
          const F = B & 15, q = Math.pow(2, F);
          G = 2 + q, q < 3, P = l(d.slice(x + 2, x + 2 + q));
        }
        if (P * I > e.maxObjectSize)
          throw new Error("To little heap space available!");
        const R = [];
        for (let B = 0; B < P; B++) {
          const U = l(d.slice(x + G + B * I, x + G + (B + 1) * I));
          R[B] = j(U);
        }
        return R;
      }
      function tt() {
        let P = L, G = 1;
        if (L == 15) {
          const B = d[x + 1], U = (B & 240) / 16;
          U != 1 && console.error("0xD: UNEXPECTED LENGTH-INT TYPE! " + U);
          const F = B & 15, q = Math.pow(2, F);
          G = 2 + q, q < 3, P = l(d.slice(x + 2, x + 2 + q));
        }
        if (P * 2 * I > e.maxObjectSize)
          throw new Error("To little heap space available!");
        const R = {};
        for (let B = 0; B < P; B++) {
          const U = l(d.slice(x + G + B * I, x + G + (B + 1) * I)), F = l(d.slice(x + G + P * I + B * I, x + G + P * I + (B + 1) * I)), q = j(U), V = j(F);
          R[q] = V;
        }
        return R;
      }
    }
    return [j(O)];
  };
  function l(d, f) {
    f = f || 0;
    let h = 0;
    for (let g = f; g < d.length; g++)
      h <<= 8, h |= d[g] & 255;
    return h;
  }
  function y(d, f) {
    return d.slice(f, f + 8).readUInt32BE(4, 8);
  }
  function b(d) {
    const f = d.length;
    for (let h = 0; h < f; h += 2) {
      const g = d[h];
      d[h] = d[h + 1], d[h + 1] = g;
    }
    return d;
  }
})(Lr);
const Fn = /* @__PURE__ */ re(Lr), jn = ye, nr = jn.homedir();
var Un = (e) => {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return nr ? e.replace(/^~(?=$|\/|\\)/, nr) : e;
};
const Dn = /* @__PURE__ */ re(Un), qn = Number(ye.release().split(".")[0]), Hn = Dn(qn >= 14 ? "~/Library/Preferences/com.apple.LaunchServices/com.apple.launchservices.secure.plist" : "~/Library/Preferences/com.apple.LaunchServices.plist");
async function zn() {
  if (process.platform !== "darwin")
    throw new Error("macOS only");
  let e = "com.apple.Safari", t;
  try {
    t = await On.readFile(Hn);
  } catch (a) {
    if (a.code === "ENOENT")
      return e;
    throw a;
  }
  const o = Fn.parseBuffer(t), n = o && o[0].LSHandlers;
  if (!n || n.length === 0)
    return e;
  for (const a of n)
    if (a.LSHandlerURLScheme === "http" && a.LSHandlerRoleAll) {
      e = a.LSHandlerRoleAll;
      break;
    }
  return e;
}
var we = { exports: {} }, Se = { exports: {} }, ct, or;
function Wn() {
  if (or) return ct;
  or = 1, ct = n, n.sync = a;
  var e = ve;
  function t(c, l) {
    var y = l.pathExt !== void 0 ? l.pathExt : process.env.PATHEXT;
    if (!y || (y = y.split(";"), y.indexOf("") !== -1))
      return !0;
    for (var b = 0; b < y.length; b++) {
      var d = y[b].toLowerCase();
      if (d && c.substr(-d.length).toLowerCase() === d)
        return !0;
    }
    return !1;
  }
  function o(c, l, y) {
    return !c.isSymbolicLink() && !c.isFile() ? !1 : t(l, y);
  }
  function n(c, l, y) {
    e.stat(c, function(b, d) {
      y(b, b ? !1 : o(d, c, l));
    });
  }
  function a(c, l) {
    return o(e.statSync(c), c, l);
  }
  return ct;
}
var ut, ir;
function Xn() {
  if (ir) return ut;
  ir = 1, ut = t, t.sync = o;
  var e = ve;
  function t(c, l, y) {
    e.stat(c, function(b, d) {
      y(b, b ? !1 : n(d, l));
    });
  }
  function o(c, l) {
    return n(e.statSync(c), l);
  }
  function n(c, l) {
    return c.isFile() && a(c, l);
  }
  function a(c, l) {
    var y = c.mode, b = c.uid, d = c.gid, f = l.uid !== void 0 ? l.uid : process.getuid && process.getuid(), h = l.gid !== void 0 ? l.gid : process.getgid && process.getgid(), g = parseInt("100", 8), I = parseInt("010", 8), A = parseInt("001", 8), O = g | I, M = y & A || y & I && d === h || y & g && b === f || y & O && f === 0;
    return M;
  }
  return ut;
}
var ze;
process.platform === "win32" || Z.TESTING_WINDOWS ? ze = Wn() : ze = Xn();
var Kn = Mt;
Mt.sync = Zn;
function Mt(e, t, o) {
  if (typeof t == "function" && (o = t, t = {}), !o) {
    if (typeof Promise != "function")
      throw new TypeError("callback not provided");
    return new Promise(function(n, a) {
      Mt(e, t || {}, function(c, l) {
        c ? a(c) : n(l);
      });
    });
  }
  ze(e, t || {}, function(n, a) {
    n && (n.code === "EACCES" || t && t.ignoreErrors) && (n = null, a = !1), o(n, a);
  });
}
function Zn(e, t) {
  try {
    return ze.sync(e, t || {});
  } catch (o) {
    if (t && t.ignoreErrors || o.code === "EACCES")
      return !1;
    throw o;
  }
}
const pe = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", kr = Ge, Vn = pe ? ";" : ":", Fr = Kn, jr = (e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }), Ur = (e, t) => {
  const o = t.colon || Vn, n = e.match(/\//) || pe && e.match(/\\/) ? [""] : [
    // windows always checks the cwd first
    ...pe ? [process.cwd()] : [],
    ...(t.path || process.env.PATH || /* istanbul ignore next: very unusual */
    "").split(o)
  ], a = pe ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", c = pe ? a.split(o) : [""];
  return pe && e.indexOf(".") !== -1 && c[0] !== "" && c.unshift(""), {
    pathEnv: n,
    pathExt: c,
    pathExtExe: a
  };
}, Dr = (e, t, o) => {
  typeof t == "function" && (o = t, t = {}), t || (t = {});
  const { pathEnv: n, pathExt: a, pathExtExe: c } = Ur(e, t), l = [], y = (d) => new Promise((f, h) => {
    if (d === n.length)
      return t.all && l.length ? f(l) : h(jr(e));
    const g = n[d], I = /^".*"$/.test(g) ? g.slice(1, -1) : g, A = kr.join(I, e), O = !I && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + A : A;
    f(b(O, d, 0));
  }), b = (d, f, h) => new Promise((g, I) => {
    if (h === a.length)
      return g(y(f + 1));
    const A = a[h];
    Fr(d + A, { pathExt: c }, (O, M) => {
      if (!O && M)
        if (t.all)
          l.push(d + A);
        else
          return g(d + A);
      return g(b(d, f, h + 1));
    });
  });
  return o ? y(0).then((d) => o(null, d), o) : y(0);
}, Jn = (e, t) => {
  t = t || {};
  const { pathEnv: o, pathExt: n, pathExtExe: a } = Ur(e, t), c = [];
  for (let l = 0; l < o.length; l++) {
    const y = o[l], b = /^".*"$/.test(y) ? y.slice(1, -1) : y, d = kr.join(b, e), f = !b && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + d : d;
    for (let h = 0; h < n.length; h++) {
      const g = f + n[h];
      try {
        if (Fr.sync(g, { pathExt: a }))
          if (t.all)
            c.push(g);
          else
            return g;
      } catch {
      }
    }
  }
  if (t.all && c.length)
    return c;
  if (t.nothrow)
    return null;
  throw jr(e);
};
var Yn = Dr;
Dr.sync = Jn;
var Lt = { exports: {} };
const qr = (e = {}) => {
  const t = e.env || process.env;
  return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(t).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
};
Lt.exports = qr;
Lt.exports.default = qr;
var Hr = Lt.exports;
const sr = Ge, Qn = Yn, eo = Hr;
function ar(e, t) {
  const o = e.options.env || process.env, n = process.cwd(), a = e.options.cwd != null, c = a && process.chdir !== void 0 && !process.chdir.disabled;
  if (c)
    try {
      process.chdir(e.options.cwd);
    } catch {
    }
  let l;
  try {
    l = Qn.sync(e.command, {
      path: o[eo({ env: o })],
      pathExt: t ? sr.delimiter : void 0
    });
  } catch {
  } finally {
    c && process.chdir(n);
  }
  return l && (l = sr.resolve(a ? e.options.cwd : "", l)), l;
}
function to(e) {
  return ar(e) || ar(e, !0);
}
var ro = to, _t = {};
const Ct = /([()\][%!^"`<>&|;, *?])/g;
function no(e) {
  return e = e.replace(Ct, "^$1"), e;
}
function oo(e, t) {
  return e = `${e}`, e = e.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"'), e = e.replace(/(?=(\\+?)?)\1$/, "$1$1"), e = `"${e}"`, e = e.replace(Ct, "^$1"), t && (e = e.replace(Ct, "^$1")), e;
}
_t.command = no;
_t.argument = oo;
var io = /^#!(.*)/;
const so = io;
var ao = (e = "") => {
  const t = e.match(so);
  if (!t)
    return null;
  const [o, n] = t[0].replace(/#! ?/, "").split(" "), a = o.split("/").pop();
  return a === "env" ? n : n ? `${a} ${n}` : a;
};
const lt = ve, co = ao;
function uo(e) {
  const o = Buffer.alloc(150);
  let n;
  try {
    n = lt.openSync(e, "r"), lt.readSync(n, o, 0, 150, 0), lt.closeSync(n);
  } catch {
  }
  return co(o.toString());
}
var lo = uo;
const fo = Ge, cr = ro, ur = _t, po = lo, mo = process.platform === "win32", ho = /\.(?:com|exe)$/i, go = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function yo(e) {
  e.file = cr(e);
  const t = e.file && po(e.file);
  return t ? (e.args.unshift(e.file), e.command = t, cr(e)) : e.file;
}
function vo(e) {
  if (!mo)
    return e;
  const t = yo(e), o = !ho.test(t);
  if (e.options.forceShell || o) {
    const n = go.test(t);
    e.command = fo.normalize(e.command), e.command = ur.command(e.command), e.args = e.args.map((c) => ur.argument(c, n));
    const a = [e.command].concat(e.args).join(" ");
    e.args = ["/d", "/s", "/c", `"${a}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
  }
  return e;
}
function wo(e, t, o) {
  t && !Array.isArray(t) && (o = t, t = null), t = t ? t.slice(0) : [], o = Object.assign({}, o);
  const n = {
    command: e,
    args: t,
    options: o,
    file: void 0,
    original: {
      command: e,
      args: t
    }
  };
  return o.shell ? n : vo(n);
}
var So = wo;
const kt = process.platform === "win32";
function Ft(e, t) {
  return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${t} ${e.command}`,
    path: e.command,
    spawnargs: e.args
  });
}
function bo(e, t) {
  if (!kt)
    return;
  const o = e.emit;
  e.emit = function(n, a) {
    if (n === "exit") {
      const c = zr(a, t);
      if (c)
        return o.call(e, "error", c);
    }
    return o.apply(e, arguments);
  };
}
function zr(e, t) {
  return kt && e === 1 && !t.file ? Ft(t.original, "spawn") : null;
}
function xo(e, t) {
  return kt && e === 1 && !t.file ? Ft(t.original, "spawnSync") : null;
}
var Eo = {
  hookChildProcess: bo,
  verifyENOENT: zr,
  verifyENOENTSync: xo,
  notFoundError: Ft
};
const Wr = Or, jt = So, Ut = Eo;
function Xr(e, t, o) {
  const n = jt(e, t, o), a = Wr.spawn(n.command, n.args, n.options);
  return Ut.hookChildProcess(a, n), a;
}
function Io(e, t, o) {
  const n = jt(e, t, o), a = Wr.spawnSync(n.command, n.args, n.options);
  return a.error = a.error || Ut.verifyENOENTSync(a.status, n), a;
}
Se.exports = Xr;
Se.exports.spawn = Xr;
Se.exports.sync = Io;
Se.exports._parse = jt;
Se.exports._enoent = Ut;
var Kr = Se.exports;
const Po = /* @__PURE__ */ re(Kr);
var To = (e) => {
  const t = typeof e == "string" ? `
` : 10, o = typeof e == "string" ? "\r" : 13;
  return e[e.length - 1] === t && (e = e.slice(0, e.length - 1)), e[e.length - 1] === o && (e = e.slice(0, e.length - 1)), e;
}, Dt = { exports: {} };
Dt.exports;
(function(e) {
  const t = Ge, o = Hr, n = (a) => {
    a = {
      cwd: process.cwd(),
      path: process.env[o()],
      execPath: process.execPath,
      ...a
    };
    let c, l = t.resolve(a.cwd);
    const y = [];
    for (; c !== l; )
      y.push(t.join(l, "node_modules/.bin")), c = l, l = t.resolve(l, "..");
    const b = t.resolve(a.cwd, a.execPath, "..");
    return y.push(b), y.concat(a.path).join(t.delimiter);
  };
  e.exports = n, e.exports.default = n, e.exports.env = (a) => {
    a = {
      env: process.env,
      ...a
    };
    const c = { ...a.env }, l = o({ env: c });
    return a.path = c[l], c[l] = e.exports(a), c;
  };
})(Dt);
var $o = Dt.exports, Ze = { exports: {} }, qt = { exports: {} };
const Zr = (e, t) => {
  for (const o of Reflect.ownKeys(t))
    Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(t, o));
  return e;
};
qt.exports = Zr;
qt.exports.default = Zr;
var Ao = qt.exports;
const Oo = Ao, We = /* @__PURE__ */ new WeakMap(), Vr = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let o, n = 0;
  const a = e.displayName || e.name || "<anonymous>", c = function(...l) {
    if (We.set(c, ++n), n === 1)
      o = e.apply(this, l), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${a}\` can only be called once`);
    return o;
  };
  return Oo(c, e), We.set(c, n), c;
};
Ze.exports = Vr;
Ze.exports.default = Vr;
Ze.exports.callCount = (e) => {
  if (!We.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return We.get(e);
};
var Co = Ze.exports, ge = {}, Ve = {}, Je = {};
Object.defineProperty(Je, "__esModule", { value: !0 });
Je.SIGNALS = void 0;
const Go = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
];
Je.SIGNALS = Go;
var ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.SIGRTMAX = ae.getRealtimeSignals = void 0;
const Ro = function() {
  const e = Yr - Jr + 1;
  return Array.from({ length: e }, Bo);
};
ae.getRealtimeSignals = Ro;
const Bo = function(e, t) {
  return {
    name: `SIGRT${t + 1}`,
    number: Jr + t,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix"
  };
}, Jr = 34, Yr = 64;
ae.SIGRTMAX = Yr;
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.getSignals = void 0;
var No = ye, Mo = Je, Lo = ae;
const _o = function() {
  const e = (0, Lo.getRealtimeSignals)();
  return [...Mo.SIGNALS, ...e].map(ko);
};
Ve.getSignals = _o;
const ko = function({
  name: e,
  number: t,
  description: o,
  action: n,
  forced: a = !1,
  standard: c
}) {
  const {
    signals: { [e]: l }
  } = No.constants, y = l !== void 0;
  return { name: e, number: y ? l : t, description: o, supported: y, action: n, forced: a, standard: c };
};
Object.defineProperty(ge, "__esModule", { value: !0 });
ge.signalsByNumber = ge.signalsByName = void 0;
var Fo = ye, Qr = Ve, jo = ae;
const Uo = function() {
  return (0, Qr.getSignals)().reduce(Do, {});
}, Do = function(e, { name: t, number: o, description: n, supported: a, action: c, forced: l, standard: y }) {
  return {
    ...e,
    [t]: { name: t, number: o, description: n, supported: a, action: c, forced: l, standard: y }
  };
}, qo = Uo();
ge.signalsByName = qo;
const Ho = function() {
  const e = (0, Qr.getSignals)(), t = jo.SIGRTMAX + 1, o = Array.from({ length: t }, (n, a) => zo(a, e));
  return Object.assign({}, ...o);
}, zo = function(e, t) {
  const o = Wo(e, t);
  if (o === void 0)
    return {};
  const { name: n, description: a, supported: c, action: l, forced: y, standard: b } = o;
  return {
    [e]: {
      name: n,
      number: e,
      description: a,
      supported: c,
      action: l,
      forced: y,
      standard: b
    }
  };
}, Wo = function(e, t) {
  const o = t.find(({ name: n }) => Fo.constants.signals[n] === e);
  return o !== void 0 ? o : t.find((n) => n.number === e);
}, Xo = Ho();
ge.signalsByNumber = Xo;
const { signalsByName: Ko } = ge, Zo = ({ timedOut: e, timeout: t, errorCode: o, signal: n, signalDescription: a, exitCode: c, isCanceled: l }) => e ? `timed out after ${t} milliseconds` : l ? "was canceled" : o !== void 0 ? `failed with ${o}` : n !== void 0 ? `was killed with ${n} (${a})` : c !== void 0 ? `failed with exit code ${c}` : "failed", Vo = ({
  stdout: e,
  stderr: t,
  all: o,
  error: n,
  signal: a,
  exitCode: c,
  command: l,
  escapedCommand: y,
  timedOut: b,
  isCanceled: d,
  killed: f,
  parsed: { options: { timeout: h } }
}) => {
  c = c === null ? void 0 : c, a = a === null ? void 0 : a;
  const g = a === void 0 ? void 0 : Ko[a].description, I = n && n.code, O = `Command ${Zo({ timedOut: b, timeout: h, errorCode: I, signal: a, signalDescription: g, exitCode: c, isCanceled: d })}: ${l}`, M = Object.prototype.toString.call(n) === "[object Error]", D = M ? `${O}
${n.message}` : O, j = [D, t, e].filter(Boolean).join(`
`);
  return M ? (n.originalMessage = n.message, n.message = j) : n = new Error(j), n.shortMessage = D, n.command = l, n.escapedCommand = y, n.exitCode = c, n.signal = a, n.signalDescription = g, n.stdout = e, n.stderr = t, o !== void 0 && (n.all = o), "bufferedData" in n && delete n.bufferedData, n.failed = !0, n.timedOut = !!b, n.isCanceled = d, n.killed = f && !b, n;
};
var Jo = Vo, Ht = { exports: {} };
const qe = ["stdin", "stdout", "stderr"], Yo = (e) => qe.some((t) => e[t] !== void 0), en = (e) => {
  if (!e)
    return;
  const { stdio: t } = e;
  if (t === void 0)
    return qe.map((n) => e[n]);
  if (Yo(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${qe.map((n) => `\`${n}\``).join(", ")}`);
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  const o = Math.max(t.length, qe.length);
  return Array.from({ length: o }, (n, a) => t[a]);
};
Ht.exports = en;
Ht.exports.node = (e) => {
  const t = en(e);
  return t === "ipc" ? "ipc" : t === void 0 || typeof t == "string" ? [t, t, t, "ipc"] : t.includes("ipc") ? t : [...t, "ipc"];
};
var Qo = Ht.exports, de = { exports: {} }, ft = { exports: {} }, lr;
function ei() {
  return lr || (lr = 1, function(e) {
    e.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ], process.platform !== "win32" && e.exports.push(
      "SIGVTALRM",
      "SIGXCPU",
      "SIGXFSZ",
      "SIGUSR2",
      "SIGTRAP",
      "SIGSYS",
      "SIGQUIT",
      "SIGIOT"
      // should detect profiler and enable/disable accordingly.
      // see #21
      // 'SIGPROF'
    ), process.platform === "linux" && e.exports.push(
      "SIGIO",
      "SIGPOLL",
      "SIGPWR",
      "SIGSTKFLT",
      "SIGUNUSED"
    );
  }(ft)), ft.exports;
}
var _ = Z.process;
const ie = function(e) {
  return e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "function";
};
if (!ie(_))
  de.exports = function() {
    return function() {
    };
  };
else {
  var ti = Cr, Pe = ei(), ri = /^win/i.test(_.platform), Fe = Gr;
  typeof Fe != "function" && (Fe = Fe.EventEmitter);
  var z;
  _.__signal_exit_emitter__ ? z = _.__signal_exit_emitter__ : (z = _.__signal_exit_emitter__ = new Fe(), z.count = 0, z.emitted = {}), z.infinite || (z.setMaxListeners(1 / 0), z.infinite = !0), de.exports = function(e, t) {
    if (!ie(Z.process))
      return function() {
      };
    ti.equal(typeof e, "function", "a callback must be provided for exit handler"), Te === !1 && fr();
    var o = "exit";
    t && t.alwaysLast && (o = "afterexit");
    var n = function() {
      z.removeListener(o, e), z.listeners("exit").length === 0 && z.listeners("afterexit").length === 0 && pt();
    };
    return z.on(o, e), n;
  };
  var pt = function() {
    !Te || !ie(Z.process) || (Te = !1, Pe.forEach(function(t) {
      try {
        _.removeListener(t, dt[t]);
      } catch {
      }
    }), _.emit = mt, _.reallyExit = pr, z.count -= 1);
  };
  de.exports.unload = pt;
  var le = function(t, o, n) {
    z.emitted[t] || (z.emitted[t] = !0, z.emit(t, o, n));
  }, dt = {};
  Pe.forEach(function(e) {
    dt[e] = function() {
      if (ie(Z.process)) {
        var o = _.listeners(e);
        o.length === z.count && (pt(), le("exit", null, e), le("afterexit", null, e), ri && e === "SIGHUP" && (e = "SIGINT"), _.kill(_.pid, e));
      }
    };
  }), de.exports.signals = function() {
    return Pe;
  };
  var Te = !1, fr = function() {
    Te || !ie(Z.process) || (Te = !0, z.count += 1, Pe = Pe.filter(function(t) {
      try {
        return _.on(t, dt[t]), !0;
      } catch {
        return !1;
      }
    }), _.emit = oi, _.reallyExit = ni);
  };
  de.exports.load = fr;
  var pr = _.reallyExit, ni = function(t) {
    ie(Z.process) && (_.exitCode = t || /* istanbul ignore next */
    0, le("exit", _.exitCode, null), le("afterexit", _.exitCode, null), pr.call(_, _.exitCode));
  }, mt = _.emit, oi = function(t, o) {
    if (t === "exit" && ie(Z.process)) {
      o !== void 0 && (_.exitCode = o);
      var n = mt.apply(this, arguments);
      return le("exit", _.exitCode, null), le("afterexit", _.exitCode, null), n;
    } else
      return mt.apply(this, arguments);
  };
}
var ii = de.exports;
const si = ye, ai = ii, ci = 1e3 * 5, ui = (e, t = "SIGTERM", o = {}) => {
  const n = e(t);
  return li(e, t, o, n), n;
}, li = (e, t, o, n) => {
  if (!fi(t, o, n))
    return;
  const a = di(o), c = setTimeout(() => {
    e("SIGKILL");
  }, a);
  c.unref && c.unref();
}, fi = (e, { forceKillAfterTimeout: t }, o) => pi(e) && t !== !1 && o, pi = (e) => e === si.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", di = ({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return ci;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, mi = (e, t) => {
  e.kill() && (t.isCanceled = !0);
}, hi = (e, t, o) => {
  e.kill(t), o(Object.assign(new Error("Timed out"), { timedOut: !0, signal: t }));
}, gi = (e, { timeout: t, killSignal: o = "SIGTERM" }, n) => {
  if (t === 0 || t === void 0)
    return n;
  let a;
  const c = new Promise((y, b) => {
    a = setTimeout(() => {
      hi(e, o, b);
    }, t);
  }), l = n.finally(() => {
    clearTimeout(a);
  });
  return Promise.race([c, l]);
}, yi = ({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, vi = async (e, { cleanup: t, detached: o }, n) => {
  if (!t || o)
    return n;
  const a = ai(() => {
    e.kill();
  });
  return n.finally(() => {
    a();
  });
};
var wi = {
  spawnedKill: ui,
  spawnedCancel: mi,
  setupTimeout: gi,
  validateTimeout: yi,
  setExitHandler: vi
};
const ee = (e) => e !== null && typeof e == "object" && typeof e.pipe == "function";
ee.writable = (e) => ee(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
ee.readable = (e) => ee(e) && e.readable !== !1 && typeof e._read == "function" && typeof e._readableState == "object";
ee.duplex = (e) => ee.writable(e) && ee.readable(e);
ee.transform = (e) => ee.duplex(e) && typeof e._transform == "function";
var Si = ee, Ne = { exports: {} };
const { PassThrough: bi } = Re;
var xi = (e) => {
  e = { ...e };
  const { array: t } = e;
  let { encoding: o } = e;
  const n = o === "buffer";
  let a = !1;
  t ? a = !(o || n) : o = o || "utf8", n && (o = null);
  const c = new bi({ objectMode: a });
  o && c.setEncoding(o);
  let l = 0;
  const y = [];
  return c.on("data", (b) => {
    y.push(b), a ? l = y.length : l += b.length;
  }), c.getBufferedValue = () => t ? y : n ? Buffer.concat(y, l) : y.join(""), c.getBufferedLength = () => l, c;
};
const { constants: Ei } = Rr, Ii = Re, { promisify: Pi } = Br, Ti = xi, $i = Pi(Ii.pipeline);
let tn = class extends Error {
  constructor() {
    super("maxBuffer exceeded"), this.name = "MaxBufferError";
  }
};
async function zt(e, t) {
  if (!e)
    throw new Error("Expected a stream");
  t = {
    maxBuffer: 1 / 0,
    ...t
  };
  const { maxBuffer: o } = t, n = Ti(t);
  return await new Promise((a, c) => {
    const l = (y) => {
      y && n.getBufferedLength() <= Ei.MAX_LENGTH && (y.bufferedData = n.getBufferedValue()), c(y);
    };
    (async () => {
      try {
        await $i(e, n), a();
      } catch (y) {
        l(y);
      }
    })(), n.on("data", () => {
      n.getBufferedLength() > o && l(new tn());
    });
  }), n.getBufferedValue();
}
Ne.exports = zt;
Ne.exports.buffer = (e, t) => zt(e, { ...t, encoding: "buffer" });
Ne.exports.array = (e, t) => zt(e, { ...t, array: !0 });
Ne.exports.MaxBufferError = tn;
var Ai = Ne.exports;
const { PassThrough: Oi } = Re;
var rn = function() {
  var e = [], t = new Oi({ objectMode: !0 });
  return t.setMaxListeners(0), t.add = o, t.isEmpty = n, t.on("unpipe", a), Array.prototype.slice.call(arguments).forEach(o), t;
  function o(c) {
    return Array.isArray(c) ? (c.forEach(o), this) : (e.push(c), c.once("end", a.bind(null, c)), c.once("error", t.emit.bind(t, "error")), c.pipe(t, { end: !1 }), this);
  }
  function n() {
    return e.length == 0;
  }
  function a(c) {
    e = e.filter(function(l) {
      return l !== c;
    }), !e.length && t.readable && t.end();
  }
};
const Ci = /* @__PURE__ */ re(rn), nn = Si, dr = Ai, Gi = rn, Ri = (e, t) => {
  t === void 0 || e.stdin === void 0 || (nn(t) ? t.pipe(e.stdin) : e.stdin.end(t));
}, Bi = (e, { all: t }) => {
  if (!t || !e.stdout && !e.stderr)
    return;
  const o = Gi();
  return e.stdout && o.add(e.stdout), e.stderr && o.add(e.stderr), o;
}, ht = async (e, t) => {
  if (e) {
    e.destroy();
    try {
      return await t;
    } catch (o) {
      return o.bufferedData;
    }
  }
}, gt = (e, { encoding: t, buffer: o, maxBuffer: n }) => {
  if (!(!e || !o))
    return t ? dr(e, { encoding: t, maxBuffer: n }) : dr.buffer(e, { maxBuffer: n });
}, Ni = async ({ stdout: e, stderr: t, all: o }, { encoding: n, buffer: a, maxBuffer: c }, l) => {
  const y = gt(e, { encoding: n, buffer: a, maxBuffer: c }), b = gt(t, { encoding: n, buffer: a, maxBuffer: c }), d = gt(o, { encoding: n, buffer: a, maxBuffer: c * 2 });
  try {
    return await Promise.all([l, y, b, d]);
  } catch (f) {
    return Promise.all([
      { error: f, signal: f.signal, timedOut: f.timedOut },
      ht(e, y),
      ht(t, b),
      ht(o, d)
    ]);
  }
}, Mi = ({ input: e }) => {
  if (nn(e))
    throw new TypeError("The `input` option cannot be a stream in sync mode");
};
var Li = {
  handleInput: Ri,
  makeAllStream: Bi,
  getSpawnedResult: Ni,
  validateInputSync: Mi
};
const _i = (async () => {
})().constructor.prototype, ki = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(_i, e)
]), Fi = (e, t) => {
  for (const [o, n] of ki) {
    const a = typeof t == "function" ? (...c) => Reflect.apply(n.value, t(), c) : n.value.bind(t);
    Reflect.defineProperty(e, o, { ...n, value: a });
  }
  return e;
}, ji = (e) => new Promise((t, o) => {
  e.on("exit", (n, a) => {
    t({ exitCode: n, signal: a });
  }), e.on("error", (n) => {
    o(n);
  }), e.stdin && e.stdin.on("error", (n) => {
    o(n);
  });
});
var Ui = {
  mergePromise: Fi,
  getSpawnedPromise: ji
};
const on = (e, t = []) => Array.isArray(t) ? [e, ...t] : [e], Di = /^[\w.-]+$/, qi = /"/g, Hi = (e) => typeof e != "string" || Di.test(e) ? e : `"${e.replace(qi, '\\"')}"`, zi = (e, t) => on(e, t).join(" "), Wi = (e, t) => on(e, t).map((o) => Hi(o)).join(" "), Xi = / +/g, Ki = (e) => {
  const t = [];
  for (const o of e.trim().split(Xi)) {
    const n = t[t.length - 1];
    n && n.endsWith("\\") ? t[t.length - 1] = `${n.slice(0, -1)} ${o}` : t.push(o);
  }
  return t;
};
var Zi = {
  joinCommand: zi,
  getEscapedCommand: Wi,
  parseCommand: Ki
};
const Vi = Ge, Gt = Or, Ji = Kr, Yi = To, Qi = $o, es = Co, Xe = Jo, sn = Qo, { spawnedKill: ts, spawnedCancel: rs, setupTimeout: ns, validateTimeout: os, setExitHandler: is } = wi, { handleInput: ss, getSpawnedResult: as, makeAllStream: cs, validateInputSync: us } = Li, { mergePromise: mr, getSpawnedPromise: ls } = Ui, { joinCommand: an, parseCommand: cn, getEscapedCommand: un } = Zi, fs = 1e3 * 1e3 * 100, ps = ({ env: e, extendEnv: t, preferLocal: o, localDir: n, execPath: a }) => {
  const c = t ? { ...process.env, ...e } : e;
  return o ? Qi.env({ env: c, cwd: n, execPath: a }) : c;
}, ln = (e, t, o = {}) => {
  const n = Ji._parse(e, t, o);
  return e = n.command, t = n.args, o = n.options, o = {
    maxBuffer: fs,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: o.cwd || process.cwd(),
    execPath: process.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    ...o
  }, o.env = ps(o), o.stdio = sn(o), process.platform === "win32" && Vi.basename(e, ".exe") === "cmd" && t.unshift("/q"), { file: e, args: t, options: o, parsed: n };
}, Oe = (e, t, o) => typeof t != "string" && !Buffer.isBuffer(t) ? o === void 0 ? void 0 : "" : e.stripFinalNewline ? Yi(t) : t, Ye = (e, t, o) => {
  const n = ln(e, t, o), a = an(e, t), c = un(e, t);
  os(n.options);
  let l;
  try {
    l = Gt.spawn(n.file, n.args, n.options);
  } catch (I) {
    const A = new Gt.ChildProcess(), O = Promise.reject(Xe({
      error: I,
      stdout: "",
      stderr: "",
      all: "",
      command: a,
      escapedCommand: c,
      parsed: n,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    return mr(A, O);
  }
  const y = ls(l), b = ns(l, n.options, y), d = is(l, n.options, b), f = { isCanceled: !1 };
  l.kill = ts.bind(null, l.kill.bind(l)), l.cancel = rs.bind(null, l, f);
  const g = es(async () => {
    const [{ error: I, exitCode: A, signal: O, timedOut: M }, D, j, H] = await as(l, n.options, d), x = Oe(n.options, D), Y = Oe(n.options, j), K = Oe(n.options, H);
    if (I || A !== 0 || O !== null) {
      const L = Xe({
        error: I,
        exitCode: A,
        signal: O,
        stdout: x,
        stderr: Y,
        all: K,
        command: a,
        escapedCommand: c,
        parsed: n,
        timedOut: M,
        isCanceled: f.isCanceled,
        killed: l.killed
      });
      if (!n.options.reject)
        return L;
      throw L;
    }
    return {
      command: a,
      escapedCommand: c,
      exitCode: 0,
      stdout: x,
      stderr: Y,
      all: K,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  });
  return ss(l, n.options.input), l.all = cs(l, n.options), mr(l, g);
};
we.exports = Ye;
we.exports.sync = (e, t, o) => {
  const n = ln(e, t, o), a = an(e, t), c = un(e, t);
  us(n.options);
  let l;
  try {
    l = Gt.spawnSync(n.file, n.args, n.options);
  } catch (d) {
    throw Xe({
      error: d,
      stdout: "",
      stderr: "",
      all: "",
      command: a,
      escapedCommand: c,
      parsed: n,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    });
  }
  const y = Oe(n.options, l.stdout, l.error), b = Oe(n.options, l.stderr, l.error);
  if (l.error || l.status !== 0 || l.signal !== null) {
    const d = Xe({
      stdout: y,
      stderr: b,
      error: l.error,
      signal: l.signal,
      exitCode: l.status,
      command: a,
      escapedCommand: c,
      parsed: n,
      timedOut: l.error && l.error.code === "ETIMEDOUT",
      isCanceled: !1,
      killed: l.signal !== null
    });
    if (!n.options.reject)
      return d;
    throw d;
  }
  return {
    command: a,
    escapedCommand: c,
    exitCode: 0,
    stdout: y,
    stderr: b,
    failed: !1,
    timedOut: !1,
    isCanceled: !1,
    killed: !1
  };
};
we.exports.command = (e, t) => {
  const [o, ...n] = cn(e);
  return Ye(o, n, t);
};
we.exports.commandSync = (e, t) => {
  const [o, ...n] = cn(e);
  return Ye.sync(o, n, t);
};
we.exports.node = (e, t, o = {}) => {
  t && !Array.isArray(t) && typeof t == "object" && (o = t, t = []);
  const n = sn.node(o), a = process.execArgv.filter((y) => !y.startsWith("--inspect")), {
    nodePath: c = process.execPath,
    nodeOptions: l = a
  } = o;
  return Ye(
    c,
    [
      ...l,
      e,
      ...Array.isArray(t) ? t : []
    ],
    {
      ...o,
      stdin: void 0,
      stdout: void 0,
      stderr: void 0,
      stdio: n,
      shell: !1
    }
  );
};
var ds = we.exports;
const ms = /* @__PURE__ */ re(ds);
async function hs(e) {
  if (process.platform !== "darwin")
    throw new Error("macOS only");
  const { stdout: t } = await ms("osascript", ["-e", e]);
  return t;
}
async function gs(e) {
  return hs(`tell application "Finder" to set app_path to application file id "${e}" as string
tell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`);
}
function ys(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.toLowerCase().replace(/(?:^|\s|-)\S/g, (t) => t.toUpperCase());
}
function vs(e) {
  const t = typeof e == "string" ? `
` : 10, o = typeof e == "string" ? "\r" : 13;
  return e[e.length - 1] === t && (e = e.slice(0, -1)), e[e.length - 1] === o && (e = e.slice(0, -1)), e;
}
function fn(e = {}) {
  const {
    env: t = process.env,
    platform: o = process.platform
  } = e;
  return o !== "win32" ? "PATH" : Object.keys(t).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
}
const ws = ({
  cwd: e = X.cwd(),
  path: t = X.env[fn()],
  preferLocal: o = !0,
  execPath: n = X.execPath,
  addExecPath: a = !0
} = {}) => {
  const c = e instanceof URL ? Bt(e) : e, l = te.resolve(c), y = [];
  return o && Ss(y, l), a && bs(y, n, l), [...y, t].join(te.delimiter);
}, Ss = (e, t) => {
  let o;
  for (; o !== t; )
    e.push(te.join(t, "node_modules/.bin")), o = t, t = te.resolve(t, "..");
}, bs = (e, t, o) => {
  const n = t instanceof URL ? Bt(t) : t;
  e.push(te.resolve(o, n, ".."));
}, xs = ({ env: e = X.env, ...t } = {}) => {
  e = { ...e };
  const o = fn({ env: e });
  return t.path = e[o], e[o] = ws(t), e;
}, Es = (e, t, o, n) => {
  if (o === "length" || o === "prototype" || o === "arguments" || o === "caller")
    return;
  const a = Object.getOwnPropertyDescriptor(e, o), c = Object.getOwnPropertyDescriptor(t, o);
  !Is(a, c) && n || Object.defineProperty(e, o, c);
}, Is = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, Ps = (e, t) => {
  const o = Object.getPrototypeOf(t);
  o !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, o);
}, Ts = (e, t) => `/* Wrapped ${e}*/
${t}`, $s = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), As = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Os = (e, t, o) => {
  const n = o === "" ? "" : `with ${o.trim()}() `, a = Ts.bind(null, n, t.toString());
  Object.defineProperty(a, "name", As), Object.defineProperty(e, "toString", { ...$s, value: a });
};
function Cs(e, t, { ignoreNonConfigurable: o = !1 } = {}) {
  const { name: n } = e;
  for (const a of Reflect.ownKeys(t))
    Es(e, t, a, o);
  return Ps(e, t), Os(e, t, n), e;
}
const Ke = /* @__PURE__ */ new WeakMap(), pn = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let o, n = 0;
  const a = e.displayName || e.name || "<anonymous>", c = function(...l) {
    if (Ke.set(c, ++n), n === 1)
      o = e.apply(this, l), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${a}\` can only be called once`);
    return o;
  };
  return Cs(c, e), Ke.set(c, n), c;
};
pn.callCount = (e) => {
  if (!Ke.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Ke.get(e);
};
const Gs = () => {
  const e = mn - dn + 1;
  return Array.from({ length: e }, Rs);
}, Rs = (e, t) => ({
  name: `SIGRT${t + 1}`,
  number: dn + t,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
}), dn = 34, mn = 64, Bs = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
], hn = () => {
  const e = Gs();
  return [...Bs, ...e].map(Ns);
}, Ns = ({
  name: e,
  number: t,
  description: o,
  action: n,
  forced: a = !1,
  standard: c
}) => {
  const {
    signals: { [e]: l }
  } = Nr, y = l !== void 0;
  return { name: e, number: y ? l : t, description: o, supported: y, action: n, forced: a, standard: c };
}, Ms = () => {
  const e = hn();
  return Object.fromEntries(e.map(Ls));
}, Ls = ({
  name: e,
  number: t,
  description: o,
  supported: n,
  action: a,
  forced: c,
  standard: l
}) => [e, { name: e, number: t, description: o, supported: n, action: a, forced: c, standard: l }], _s = Ms(), ks = () => {
  const e = hn(), t = mn + 1, o = Array.from({ length: t }, (n, a) => Fs(a, e));
  return Object.assign({}, ...o);
}, Fs = (e, t) => {
  const o = js(e, t);
  if (o === void 0)
    return {};
  const { name: n, description: a, supported: c, action: l, forced: y, standard: b } = o;
  return {
    [e]: {
      name: n,
      number: e,
      description: a,
      supported: c,
      action: l,
      forced: y,
      standard: b
    }
  };
}, js = (e, t) => {
  const o = t.find(({ name: n }) => Nr.signals[n] === e);
  return o !== void 0 ? o : t.find((n) => n.number === e);
};
ks();
const Us = ({ timedOut: e, timeout: t, errorCode: o, signal: n, signalDescription: a, exitCode: c, isCanceled: l }) => e ? `timed out after ${t} milliseconds` : l ? "was canceled" : o !== void 0 ? `failed with ${o}` : n !== void 0 ? `was killed with ${n} (${a})` : c !== void 0 ? `failed with exit code ${c}` : "failed", hr = ({
  stdout: e,
  stderr: t,
  all: o,
  error: n,
  signal: a,
  exitCode: c,
  command: l,
  escapedCommand: y,
  timedOut: b,
  isCanceled: d,
  killed: f,
  parsed: { options: { timeout: h, cwd: g = X.cwd() } }
}) => {
  c = c === null ? void 0 : c, a = a === null ? void 0 : a;
  const I = a === void 0 ? void 0 : _s[a].description, A = n && n.code, M = `Command ${Us({ timedOut: b, timeout: h, errorCode: A, signal: a, signalDescription: I, exitCode: c, isCanceled: d })}: ${l}`, D = Object.prototype.toString.call(n) === "[object Error]", j = D ? `${M}
${n.message}` : M, H = [j, t, e].filter(Boolean).join(`
`);
  return D ? (n.originalMessage = n.message, n.message = H) : n = new Error(H), n.shortMessage = j, n.command = l, n.escapedCommand = y, n.exitCode = c, n.signal = a, n.signalDescription = I, n.stdout = e, n.stderr = t, n.cwd = g, o !== void 0 && (n.all = o), "bufferedData" in n && delete n.bufferedData, n.failed = !0, n.timedOut = !!b, n.isCanceled = d, n.killed = f && !b, n;
}, He = ["stdin", "stdout", "stderr"], Ds = (e) => He.some((t) => e[t] !== void 0), qs = (e) => {
  if (!e)
    return;
  const { stdio: t } = e;
  if (t === void 0)
    return He.map((n) => e[n]);
  if (Ds(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${He.map((n) => `\`${n}\``).join(", ")}`);
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  const o = Math.max(t.length, He.length);
  return Array.from({ length: o }, (n, a) => t[a]);
};
var me = { exports: {} }, yt = { exports: {} }, gr;
function Hs() {
  return gr || (gr = 1, function(e) {
    e.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ], process.platform !== "win32" && e.exports.push(
      "SIGVTALRM",
      "SIGXCPU",
      "SIGXFSZ",
      "SIGUSR2",
      "SIGTRAP",
      "SIGSYS",
      "SIGQUIT",
      "SIGIOT"
      // should detect profiler and enable/disable accordingly.
      // see #21
      // 'SIGPROF'
    ), process.platform === "linux" && e.exports.push(
      "SIGIO",
      "SIGPOLL",
      "SIGPWR",
      "SIGSTKFLT",
      "SIGUNUSED"
    );
  }(yt)), yt.exports;
}
var k = Z.process;
const se = function(e) {
  return e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "function";
};
if (!se(k))
  me.exports = function() {
    return function() {
    };
  };
else {
  var zs = Cr, $e = Hs(), Ws = /^win/i.test(k.platform), je = Gr;
  typeof je != "function" && (je = je.EventEmitter);
  var W;
  k.__signal_exit_emitter__ ? W = k.__signal_exit_emitter__ : (W = k.__signal_exit_emitter__ = new je(), W.count = 0, W.emitted = {}), W.infinite || (W.setMaxListeners(1 / 0), W.infinite = !0), me.exports = function(e, t) {
    if (!se(Z.process))
      return function() {
      };
    zs.equal(typeof e, "function", "a callback must be provided for exit handler"), Ae === !1 && yr();
    var o = "exit";
    t && t.alwaysLast && (o = "afterexit");
    var n = function() {
      W.removeListener(o, e), W.listeners("exit").length === 0 && W.listeners("afterexit").length === 0 && vt();
    };
    return W.on(o, e), n;
  };
  var vt = function() {
    !Ae || !se(Z.process) || (Ae = !1, $e.forEach(function(t) {
      try {
        k.removeListener(t, wt[t]);
      } catch {
      }
    }), k.emit = St, k.reallyExit = vr, W.count -= 1);
  };
  me.exports.unload = vt;
  var fe = function(t, o, n) {
    W.emitted[t] || (W.emitted[t] = !0, W.emit(t, o, n));
  }, wt = {};
  $e.forEach(function(e) {
    wt[e] = function() {
      if (se(Z.process)) {
        var o = k.listeners(e);
        o.length === W.count && (vt(), fe("exit", null, e), fe("afterexit", null, e), Ws && e === "SIGHUP" && (e = "SIGINT"), k.kill(k.pid, e));
      }
    };
  }), me.exports.signals = function() {
    return $e;
  };
  var Ae = !1, yr = function() {
    Ae || !se(Z.process) || (Ae = !0, W.count += 1, $e = $e.filter(function(t) {
      try {
        return k.on(t, wt[t]), !0;
      } catch {
        return !1;
      }
    }), k.emit = Ks, k.reallyExit = Xs);
  };
  me.exports.load = yr;
  var vr = k.reallyExit, Xs = function(t) {
    se(Z.process) && (k.exitCode = t || /* istanbul ignore next */
    0, fe("exit", k.exitCode, null), fe("afterexit", k.exitCode, null), vr.call(k, k.exitCode));
  }, St = k.emit, Ks = function(t, o) {
    if (t === "exit" && se(Z.process)) {
      o !== void 0 && (k.exitCode = o);
      var n = St.apply(this, arguments);
      return fe("exit", k.exitCode, null), fe("afterexit", k.exitCode, null), n;
    } else
      return St.apply(this, arguments);
  };
}
var Zs = me.exports;
const Vs = /* @__PURE__ */ re(Zs), Js = 1e3 * 5, Ys = (e, t = "SIGTERM", o = {}) => {
  const n = e(t);
  return Qs(e, t, o, n), n;
}, Qs = (e, t, o, n) => {
  if (!ea(t, o, n))
    return;
  const a = ra(o), c = setTimeout(() => {
    e("SIGKILL");
  }, a);
  c.unref && c.unref();
}, ea = (e, { forceKillAfterTimeout: t }, o) => ta(e) && t !== !1 && o, ta = (e) => e === Cn.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", ra = ({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return Js;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, na = (e, t) => {
  e.kill() && (t.isCanceled = !0);
}, oa = (e, t, o) => {
  e.kill(t), o(Object.assign(new Error("Timed out"), { timedOut: !0, signal: t }));
}, ia = (e, { timeout: t, killSignal: o = "SIGTERM" }, n) => {
  if (t === 0 || t === void 0)
    return n;
  let a;
  const c = new Promise((y, b) => {
    a = setTimeout(() => {
      oa(e, o, b);
    }, t);
  }), l = n.finally(() => {
    clearTimeout(a);
  });
  return Promise.race([c, l]);
}, sa = ({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, aa = async (e, { cleanup: t, detached: o }, n) => {
  if (!t || o)
    return n;
  const a = Vs(() => {
    e.kill();
  });
  return n.finally(() => {
    a();
  });
};
function gn(e) {
  return e !== null && typeof e == "object" && typeof e.pipe == "function";
}
function wr(e) {
  return gn(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
}
const ca = (e) => e instanceof Tn && typeof e.then == "function", bt = (e, t, o) => {
  if (typeof o == "string")
    return e[t].pipe($n(o)), e;
  if (wr(o))
    return e[t].pipe(o), e;
  if (!ca(o))
    throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
  if (!wr(o.stdin))
    throw new TypeError("The target child process's stdin must be available.");
  return e[t].pipe(o.stdin), o;
}, ua = (e) => {
  e.stdout !== null && (e.pipeStdout = bt.bind(void 0, e, "stdout")), e.stderr !== null && (e.pipeStderr = bt.bind(void 0, e, "stderr")), e.all !== void 0 && (e.pipeAll = bt.bind(void 0, e, "all"));
};
var Me = { exports: {} };
const { PassThrough: la } = Re;
var fa = (e) => {
  e = { ...e };
  const { array: t } = e;
  let { encoding: o } = e;
  const n = o === "buffer";
  let a = !1;
  t ? a = !(o || n) : o = o || "utf8", n && (o = null);
  const c = new la({ objectMode: a });
  o && c.setEncoding(o);
  let l = 0;
  const y = [];
  return c.on("data", (b) => {
    y.push(b), a ? l = y.length : l += b.length;
  }), c.getBufferedValue = () => t ? y : n ? Buffer.concat(y, l) : y.join(""), c.getBufferedLength = () => l, c;
};
const { constants: pa } = Rr, da = Re, { promisify: ma } = Br, ha = fa, ga = ma(da.pipeline);
class yn extends Error {
  constructor() {
    super("maxBuffer exceeded"), this.name = "MaxBufferError";
  }
}
async function Wt(e, t) {
  if (!e)
    throw new Error("Expected a stream");
  t = {
    maxBuffer: 1 / 0,
    ...t
  };
  const { maxBuffer: o } = t, n = ha(t);
  return await new Promise((a, c) => {
    const l = (y) => {
      y && n.getBufferedLength() <= pa.MAX_LENGTH && (y.bufferedData = n.getBufferedValue()), c(y);
    };
    (async () => {
      try {
        await ga(e, n), a();
      } catch (y) {
        l(y);
      }
    })(), n.on("data", () => {
      n.getBufferedLength() > o && l(new yn());
    });
  }), n.getBufferedValue();
}
Me.exports = Wt;
Me.exports.buffer = (e, t) => Wt(e, { ...t, encoding: "buffer" });
Me.exports.array = (e, t) => Wt(e, { ...t, array: !0 });
Me.exports.MaxBufferError = yn;
var ya = Me.exports;
const Sr = /* @__PURE__ */ re(ya), va = (e) => {
  if (e !== void 0)
    throw new TypeError("The `input` and `inputFile` options cannot be both set.");
}, wa = ({ input: e, inputFile: t }) => typeof t != "string" ? e : (va(e), An(t)), Sa = (e, t) => {
  const o = wa(t);
  o !== void 0 && (gn(o) ? o.pipe(e.stdin) : e.stdin.end(o));
}, ba = (e, { all: t }) => {
  if (!t || !e.stdout && !e.stderr)
    return;
  const o = Ci();
  return e.stdout && o.add(e.stdout), e.stderr && o.add(e.stderr), o;
}, xt = async (e, t) => {
  if (!(!e || t === void 0)) {
    e.destroy();
    try {
      return await t;
    } catch (o) {
      return o.bufferedData;
    }
  }
}, Et = (e, { encoding: t, buffer: o, maxBuffer: n }) => {
  if (!(!e || !o))
    return t ? Sr(e, { encoding: t, maxBuffer: n }) : Sr.buffer(e, { maxBuffer: n });
}, xa = async ({ stdout: e, stderr: t, all: o }, { encoding: n, buffer: a, maxBuffer: c }, l) => {
  const y = Et(e, { encoding: n, buffer: a, maxBuffer: c }), b = Et(t, { encoding: n, buffer: a, maxBuffer: c }), d = Et(o, { encoding: n, buffer: a, maxBuffer: c * 2 });
  try {
    return await Promise.all([l, y, b, d]);
  } catch (f) {
    return Promise.all([
      { error: f, signal: f.signal, timedOut: f.timedOut },
      xt(e, y),
      xt(t, b),
      xt(o, d)
    ]);
  }
}, Ea = (async () => {
})().constructor.prototype, Ia = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(Ea, e)
]), br = (e, t) => {
  for (const [o, n] of Ia) {
    const a = typeof t == "function" ? (...c) => Reflect.apply(n.value, t(), c) : n.value.bind(t);
    Reflect.defineProperty(e, o, { ...n, value: a });
  }
}, Pa = (e) => new Promise((t, o) => {
  e.on("exit", (n, a) => {
    t({ exitCode: n, signal: a });
  }), e.on("error", (n) => {
    o(n);
  }), e.stdin && e.stdin.on("error", (n) => {
    o(n);
  });
}), vn = (e, t = []) => Array.isArray(t) ? [e, ...t] : [e], Ta = /^[\w.-]+$/, $a = /"/g, Aa = (e) => typeof e != "string" || Ta.test(e) ? e : `"${e.replace($a, '\\"')}"`, Oa = (e, t) => vn(e, t).join(" "), Ca = (e, t) => vn(e, t).map((o) => Aa(o)).join(" "), Ga = Gn("execa").enabled, Ue = (e, t) => String(e).padStart(t, "0"), Ra = () => {
  const e = /* @__PURE__ */ new Date();
  return `${Ue(e.getHours(), 2)}:${Ue(e.getMinutes(), 2)}:${Ue(e.getSeconds(), 2)}.${Ue(e.getMilliseconds(), 3)}`;
}, Ba = (e, { verbose: t }) => {
  t && X.stderr.write(`[${Ra()}] ${e}
`);
}, Na = 1e3 * 1e3 * 100, Ma = ({ env: e, extendEnv: t, preferLocal: o, localDir: n, execPath: a }) => {
  const c = t ? { ...X.env, ...e } : e;
  return o ? xs({ env: c, cwd: n, execPath: a }) : c;
}, La = (e, t, o = {}) => {
  const n = Po._parse(e, t, o);
  return e = n.command, t = n.args, o = n.options, o = {
    maxBuffer: Na,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: o.cwd || X.cwd(),
    execPath: X.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    verbose: Ga,
    ...o
  }, o.env = Ma(o), o.stdio = qs(o), X.platform === "win32" && te.basename(e, ".exe") === "cmd" && t.unshift("/q"), { file: e, args: t, options: o, parsed: n };
}, It = (e, t, o) => typeof t != "string" && !$r.isBuffer(t) ? o === void 0 ? void 0 : "" : e.stripFinalNewline ? vs(t) : t;
function wn(e, t, o) {
  const n = La(e, t, o), a = Oa(e, t), c = Ca(e, t);
  Ba(c, n.options), sa(n.options);
  let l;
  try {
    l = $t.spawn(n.file, n.args, n.options);
  } catch (I) {
    const A = new $t.ChildProcess(), O = Promise.reject(hr({
      error: I,
      stdout: "",
      stderr: "",
      all: "",
      command: a,
      escapedCommand: c,
      parsed: n,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    return br(A, O), A;
  }
  const y = Pa(l), b = ia(l, n.options, y), d = aa(l, n.options, b), f = { isCanceled: !1 };
  l.kill = Ys.bind(null, l.kill.bind(l)), l.cancel = na.bind(null, l, f);
  const g = pn(async () => {
    const [{ error: I, exitCode: A, signal: O, timedOut: M }, D, j, H] = await xa(l, n.options, d), x = It(n.options, D), Y = It(n.options, j), K = It(n.options, H);
    if (I || A !== 0 || O !== null) {
      const L = hr({
        error: I,
        exitCode: A,
        signal: O,
        stdout: x,
        stderr: Y,
        all: K,
        command: a,
        escapedCommand: c,
        parsed: n,
        timedOut: M,
        isCanceled: f.isCanceled || (n.options.signal ? n.options.signal.aborted : !1),
        killed: l.killed
      });
      if (!n.options.reject)
        return L;
      throw L;
    }
    return {
      command: a,
      escapedCommand: c,
      exitCode: 0,
      stdout: x,
      stderr: Y,
      all: K,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  });
  return Sa(l, n.options), l.all = ba(l, n.options), ua(l), br(l, g), l;
}
const _a = {
  AppXq0fevzme2pys62n3e0fbqa7peapykr8v: { name: "Edge", id: "com.microsoft.edge.old" },
  MSEdgeDHTML: { name: "Edge", id: "com.microsoft.edge" },
  // On macOS, it's "com.microsoft.edgemac"
  MSEdgeHTM: { name: "Edge", id: "com.microsoft.edge" },
  // Newer Edge/Win10 releases
  "IE.HTTP": { name: "Internet Explorer", id: "com.microsoft.ie" },
  FirefoxURL: { name: "Firefox", id: "org.mozilla.firefox" },
  ChromeHTML: { name: "Chrome", id: "com.google.chrome" }
};
class xr extends Error {
}
async function ka(e = wn) {
  const t = await e("reg", [
    "QUERY",
    " HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice",
    "/v",
    "ProgId"
  ]), o = /ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(t.stdout);
  if (!o)
    throw new xr(`Cannot find Windows browser in stdout: ${JSON.stringify(t.stdout)}`);
  const { id: n } = o.groups, a = _a[n];
  if (!a)
    throw new xr(`Unknown browser ID: ${n}`);
  return a;
}
async function Fa() {
  if (X.platform === "linux") {
    const { stdout: e } = await wn("xdg-mime", ["query", "default", "x-scheme-handler/http"]);
    return {
      name: ys(e.trim().replace(/.desktop$/, "").replace("-", " ")),
      id: e
    };
  }
  if (X.platform === "darwin") {
    const e = await zn();
    return { name: await gs(e), id: e };
  }
  if (X.platform === "win32")
    return ka();
  throw new Error("Only macOS, Linux, and Windows are supported");
}
let Pt;
function ja() {
  try {
    return Nt.statSync("/.dockerenv"), !0;
  } catch {
    return !1;
  }
}
function Ua() {
  try {
    return Nt.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return !1;
  }
}
function Da() {
  return Pt === void 0 && (Pt = ja() || Ua()), Pt;
}
let Tt;
const qa = () => {
  try {
    return Nt.statSync("/run/.containerenv"), !0;
  } catch {
    return !1;
  }
};
function Ha() {
  return Tt === void 0 && (Tt = qa() || Da()), Tt;
}
const Rt = te.dirname(Bt(import.meta.url)), Er = te.join(Rt, "xdg-open"), { platform: he, arch: Ir } = X, za = /* @__PURE__ */ (() => {
  const e = "/mnt/";
  let t;
  return async function() {
    if (t)
      return t;
    const o = "/etc/wsl.conf";
    let n = !1;
    try {
      await At.access(o, Ar.F_OK), n = !0;
    } catch {
    }
    if (!n)
      return e;
    const a = await At.readFile(o, { encoding: "utf8" }), c = new RegExp("(?<!#.*)root\\s*=\\s*(?<mountPoint>.*)", "g").exec(a);
    return c ? (t = c.groups.mountPoint.trim(), t = t.endsWith("/") ? t : `${t}/`, t) : e;
  };
})(), Pr = async (e, t) => {
  let o;
  for (const n of e)
    try {
      return await t(n);
    } catch (a) {
      o = a;
    }
  throw o;
}, Ce = async (e) => {
  if (e = {
    wait: !1,
    background: !1,
    newInstance: !1,
    allowNonzeroExitCode: !1,
    ...e
  }, Array.isArray(e.app))
    return Pr(e.app, (y) => Ce({
      ...e,
      app: y
    }));
  let { name: t, arguments: o = [] } = e.app ?? {};
  if (o = [...o], Array.isArray(t))
    return Pr(t, (y) => Ce({
      ...e,
      app: {
        name: y,
        arguments: o
      }
    }));
  if (t === "browser" || t === "browserPrivate") {
    const y = {
      "com.google.chrome": "chrome",
      "google-chrome.desktop": "chrome",
      "org.mozilla.firefox": "firefox",
      "firefox.desktop": "firefox",
      "com.microsoft.msedge": "edge",
      "com.microsoft.edge": "edge",
      "microsoft-edge.desktop": "edge"
    }, b = {
      chrome: "--incognito",
      firefox: "--private-window",
      edge: "--inPrivate"
    }, d = await Fa();
    if (d.id in y) {
      const f = y[d.id];
      return t === "browserPrivate" && o.push(b[f]), Ce({
        ...e,
        app: {
          name: be[f],
          arguments: o
        }
      });
    }
    throw new Error(`${d.name} is not supported as a default browser`);
  }
  let n;
  const a = [], c = {};
  if (he === "darwin")
    n = "open", e.wait && a.push("--wait-apps"), e.background && a.push("--background"), e.newInstance && a.push("--new"), t && a.push("-a", t);
  else if (he === "win32" || De && !Ha() && !t) {
    const y = await za();
    n = De ? `${y}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe` : `${X.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`, a.push(
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-EncodedCommand"
    ), De || (c.windowsVerbatimArguments = !0);
    const b = ["Start"];
    e.wait && b.push("-Wait"), t ? (b.push(`"\`"${t}\`""`), e.target && o.push(e.target)) : e.target && b.push(`"${e.target}"`), o.length > 0 && (o = o.map((d) => `"\`"${d}\`""`), b.push("-ArgumentList", o.join(","))), e.target = $r.from(b.join(" "), "utf16le").toString("base64");
  } else {
    if (t)
      n = t;
    else {
      const y = !Rt || Rt === "/";
      let b = !1;
      try {
        await At.access(Er, Ar.X_OK), b = !0;
      } catch {
      }
      n = X.versions.electron ?? (he === "android" || y || !b) ? "xdg-open" : Er;
    }
    o.length > 0 && a.push(...o), e.wait || (c.stdio = "ignore", c.detached = !0);
  }
  e.target && a.push(e.target), he === "darwin" && o.length > 0 && a.push("--args", ...o);
  const l = $t.spawn(n, a, c);
  return e.wait ? new Promise((y, b) => {
    l.once("error", b), l.once("close", (d) => {
      if (!e.allowNonzeroExitCode && d > 0) {
        b(new Error(`Exited with code ${d}`));
        return;
      }
      y(l);
    });
  }) : (l.unref(), l);
}, pc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError("Expected a `target`");
  return Ce({
    ...t,
    target: e
  });
}, dc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError("Expected a `name`");
  const { arguments: o = [] } = t ?? {};
  if (o != null && !Array.isArray(o))
    throw new TypeError("Expected `appArguments` as Array type");
  return Ce({
    ...t,
    app: {
      name: e,
      arguments: o
    }
  });
};
function Tr(e) {
  if (typeof e == "string" || Array.isArray(e))
    return e;
  const { [Ir]: t } = e;
  if (!t)
    throw new Error(`${Ir} is not supported`);
  return t;
}
function Xt({ [he]: e }, { wsl: t }) {
  if (t && De)
    return Tr(t);
  if (!e)
    throw new Error(`${he} is not supported`);
  return Tr(e);
}
const be = {};
Be(be, "chrome", () => Xt({
  darwin: "google chrome",
  win32: "chrome",
  linux: ["google-chrome", "google-chrome-stable", "chromium"]
}, {
  wsl: {
    ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    x64: ["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe", "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]
  }
}));
Be(be, "firefox", () => Xt({
  darwin: "firefox",
  win32: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
  linux: "firefox"
}, {
  wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe"
}));
Be(be, "edge", () => Xt({
  darwin: "microsoft edge",
  win32: "msedge",
  linux: ["microsoft-edge", "microsoft-edge-dev"]
}, {
  wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
}));
Be(be, "browser", () => "browser");
Be(be, "browserPrivate", () => "browserPrivate");
export {
  be as apps,
  pc as default,
  dc as openApp
};
