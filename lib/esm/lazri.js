function Qr(f) {
  return f.map((u) => {
    switch (u.type) {
      case "section":
        return Mr(u.content);
      case "blankline":
        return "";
      case "title":
        return Nr(u.content);
      case "heading":
        return Or(u.content);
      case "subheading":
        return Lr(u.content);
      case "indented":
        return zr(u.content);
      case "align-right":
        return Ur(u.content);
      case "ruler":
        return "<hr>";
    }
  }).join(`
`);
}
function Nr(f) {
  return `<h1>${f}</h1>`;
}
function Or(f) {
  return `<h2>${f}</h2>`;
}
function Lr(f) {
  return `<h3>${f}</h3>`;
}
function Mr(f) {
  return `<div class="section">${f.filter(({ type: u }) => u === "paragraph").map(({ content: u }) => _r(u)).join(`
`)}</div>`;
}
function _r(f) {
  return `<p>${f.filter(({ type: u }) => u === "sentence").map(({ content: u }) => J(u)).join(`<br>
`)}</p>`;
}
function zr(f) {
  return `<div class="indented section"><p>${f.filter((u) => u.type === "sentence").map(({ content: u }) => J(u)).join(`<br>
`)}</p></div>`;
}
function Ur(f) {
  return `<div data-align="right"><p>${f.filter((u) => u.type === "sentence").map(({ content: u }) => J(u)).join(`<br>
`)}</p></div>`;
}
function J(f) {
  return f.map(({ type: u, content: r }) => {
    switch (u) {
      case "text":
        return r;
      case "bouten":
        return Xr(r);
      case "rubi":
        return Gr(r);
      case "cite":
        return qr(r);
    }
  }).join("");
}
function Xr(f) {
  return `<em class="bouten">${f}</em>`;
}
function qr(f) {
  return `<cite>${f}</cite>`;
}
function Gr(f) {
  const { base: u, rubi: r } = f;
  return `<ruby>${u}<rp>\uFF08</rp><rt>${r}</rt><rp>\uFF09</rp></ruby>`;
}
function Jr(f, u) {
  function r() {
    this.constructor = f;
  }
  r.prototype = u.prototype, f.prototype = new r();
}
function j(f, u, r, h) {
  var g = Error.call(this, f);
  return Object.setPrototypeOf && Object.setPrototypeOf(g, j.prototype), g.expected = u, g.found = r, g.location = h, g.name = "SyntaxError", g;
}
Jr(j, Error);
function G(f, u, r) {
  return r = r || " ", f.length > u ? f : (u -= f.length, r += r.repeat(u), f + r.slice(0, u));
}
j.prototype.format = function(f) {
  var u = "Error: " + this.message;
  if (this.location) {
    var r = null, h;
    for (h = 0; h < f.length; h++)
      if (f[h].source === this.location.source) {
        r = f[h].text.split(/\r\n|\n|\r/g);
        break;
      }
    var g = this.location.start, m = this.location.source + ":" + g.line + ":" + g.column;
    if (r) {
      var w = this.location.end, C = G("", g.line.toString().length, " "), E = r[g.line - 1], p = g.line === w.line ? w.column : E.length + 1, o = p - g.column || 1;
      u += `
 --> ` + m + `
` + C + ` |
` + g.line + " | " + E + `
` + C + " | " + G("", g.column - 1, " ") + G("", o, "^");
    } else
      u += `
 at ` + m;
  }
  return u;
};
j.buildMessage = function(f, u) {
  var r = {
    literal: function(p) {
      return '"' + g(p.text) + '"';
    },
    class: function(p) {
      var o = p.parts.map(function(d) {
        return Array.isArray(d) ? m(d[0]) + "-" + m(d[1]) : m(d);
      });
      return "[" + (p.inverted ? "^" : "") + o.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(p) {
      return p.description;
    }
  };
  function h(p) {
    return p.charCodeAt(0).toString(16).toUpperCase();
  }
  function g(p) {
    return p.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(o) {
      return "\\x0" + h(o);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(o) {
      return "\\x" + h(o);
    });
  }
  function m(p) {
    return p.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(o) {
      return "\\x0" + h(o);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(o) {
      return "\\x" + h(o);
    });
  }
  function w(p) {
    return r[p.type](p);
  }
  function C(p) {
    var o = p.map(w), d, F;
    if (o.sort(), o.length > 0) {
      for (d = 1, F = 1; d < o.length; d++)
        o[d - 1] !== o[d] && (o[F] = o[d], F++);
      o.length = F;
    }
    switch (o.length) {
      case 1:
        return o[0];
      case 2:
        return o[0] + " or " + o[1];
      default:
        return o.slice(0, -1).join(", ") + ", or " + o[o.length - 1];
    }
  }
  function E(p) {
    return p ? '"' + g(p) + '"' : "end of input";
  }
  return "Expected " + C(f) + " but " + E(u) + " found.";
};
function Kr(f, u) {
  u = u !== void 0 ? u : {};
  var r = {}, h = u.grammarSource, g = { Doc: ve }, m = ve, w = "***", C = "======", E = "====", p = "==", o = "=", d = "        ", F = "                ", K = "    ", Q = "``", V = '""', W = "^", Y = "(", Z = ")", Ee = "\\", ee = `\r
`, re = /^[ ]/, k = /^[^\r\n]/, se = /^[^)\r\n]/, ne = /^[^(\r\n]/, Fe = /^[\\"`\^()%\-]/, Pe = /^[\r\n]/, Re = /^[ \t]/, Be = v("***", !1), je = v("======", !1), Se = v("====", !1), ie = v("==", !1), _ = ar(), te = v("=", !1), ke = v("        ", !1), Te = v("                ", !1), fe = P([" "], !1, !1), He = v("    ", !1), Ie = v("``", !1), T = P(["\r", `
`], !0, !1), De = v('""', !1), ae = v("^", !1), le = v("(", !1), ue = v(")", !1), ce = P([")", "\r", `
`], !0, !1), oe = P(["(", "\r", `
`], !0, !1), Ne = P(["\\", '"', "`", "^", "(", ")", "%", "-"], !1, !1), Oe = v("\\", !1), Le = v(`\r
`, !1), Me = P(["\r", `
`], !1, !1), _e = P([" ", "	"], !1, !1), ze = function() {
    return { type: "blankline" };
  }, Ue = function() {
    return { type: "ruler" };
  }, Xe = function(e) {
    return { type: "title", content: e };
  }, qe = function(e) {
    return { type: "heading", content: e };
  }, Ge = function(e) {
    return { type: "subheading", content: e };
  }, Je = function(e) {
    return { type: "text", content: e };
  }, Ke = function(e) {
    return { type: "indented", content: e };
  }, Qe = function(e) {
    return { type: "align-right", content: e };
  }, Ve = function(e) {
    return { type: "section", content: e };
  }, We = function(e) {
    return { type: "paragraph", content: e };
  }, Ye = function(e) {
    return { type: "sentence", content: e };
  }, Ze = function(e) {
    return e.join("");
  }, er = function(e) {
    return { type: "bouten", content: e };
  }, rr = function(e) {
    return e.join("");
  }, sr = function(e) {
    return { type: "cite", content: e };
  }, nr = function(e) {
    return e.join("");
  }, ir = function(e) {
    return e.join("");
  }, tr = function(e, n) {
    return { type: "rubi", content: { base: e, rubi: n } };
  }, fr = function(e) {
    return { type: "text", content: e.join("") };
  }, i = 0, H = [{ line: 1, column: 1 }], b = 0, z = [], l = 0, I;
  if ("startRule" in u) {
    if (!(u.startRule in g))
      throw new Error(`Can't start parsing from rule "` + u.startRule + '".');
    m = g[u.startRule];
  }
  function v(e, n) {
    return { type: "literal", text: e, ignoreCase: n };
  }
  function P(e, n, s) {
    return { type: "class", parts: e, inverted: n, ignoreCase: s };
  }
  function ar() {
    return { type: "any" };
  }
  function lr() {
    return { type: "end" };
  }
  function pe(e) {
    var n = H[e], s;
    if (n)
      return n;
    for (s = e - 1; !H[s]; )
      s--;
    for (n = H[s], n = {
      line: n.line,
      column: n.column
    }; s < e; )
      f.charCodeAt(s) === 10 ? (n.line++, n.column = 1) : n.column++, s++;
    return H[e] = n, n;
  }
  function ge(e, n) {
    var s = pe(e), t = pe(n);
    return {
      source: h,
      start: {
        offset: e,
        line: s.line,
        column: s.column
      },
      end: {
        offset: n,
        line: t.line,
        column: t.column
      }
    };
  }
  function c(e) {
    i < b || (i > b && (b = i, z = []), z.push(e));
  }
  function ur(e, n, s) {
    return new j(
      j.buildMessage(e, n),
      e,
      n,
      s
    );
  }
  function ve() {
    var e, n;
    for (e = [], n = $e(); n !== r; )
      e.push(n), n = $e();
    return e;
  }
  function $e() {
    var e;
    return e = S(), e === r && (e = he(), e === r && (e = wr())), e;
  }
  function S() {
    var e, n, s;
    if (e = i, n = [], s = $(), s !== r)
      for (; s !== r; )
        n.push(s), s = $();
    else
      n = r;
    return n !== r && (n = ze()), e = n, e;
  }
  function he() {
    var e;
    return e = cr(), e === r && (e = or(), e === r && (e = xr(), e === r && (e = Ar()))), e;
  }
  function cr() {
    var e, n, s, t;
    return e = i, n = i, l++, s = $(), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (f.substr(i, 3) === w ? (s = w, i += 3) : (s = r, l === 0 && c(Be)), s !== r ? (t = M(), t !== r ? e = Ue() : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function or() {
    var e;
    return e = gr(), e === r && (e = $r(), e === r && (e = dr())), e;
  }
  function pr() {
    var e, n, s, t, a;
    if (e = i, n = i, l++, s = $(), l--, s === r ? n = void 0 : (i = n, n = r), n !== r)
      if (f.substr(i, 6) === C ? (s = C, i += 6) : (s = r, l === 0 && c(je)), s !== r) {
        if (t = [], a = y(), a !== r)
          for (; a !== r; )
            t.push(a), a = y();
        else
          t = r;
        t !== r ? (n = [n, s, t], e = n) : (i = e, e = r);
      } else
        i = e, e = r;
    else
      i = e, e = r;
    return e;
  }
  function gr() {
    var e, n, s, t;
    return e = i, n = pr(), n !== r ? (s = U(), s !== r ? (t = X(), t !== r ? e = Xe(s) : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function vr() {
    var e, n, s, t, a;
    if (e = i, n = i, l++, s = $(), l--, s === r ? n = void 0 : (i = n, n = r), n !== r)
      if (f.substr(i, 4) === E ? (s = E, i += 4) : (s = r, l === 0 && c(Se)), s !== r) {
        if (t = [], a = y(), a !== r)
          for (; a !== r; )
            t.push(a), a = y();
        else
          t = r;
        t !== r ? (n = [n, s, t], e = n) : (i = e, e = r);
      } else
        i = e, e = r;
    else
      i = e, e = r;
    return e;
  }
  function $r() {
    var e, n, s, t;
    return e = i, n = vr(), n !== r ? (s = U(), s !== r ? (t = X(), t !== r ? e = qe(s) : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function hr() {
    var e, n, s, t, a;
    if (e = i, n = i, l++, s = $(), l--, s === r ? n = void 0 : (i = n, n = r), n !== r)
      if (f.substr(i, 2) === p ? (s = p, i += 2) : (s = r, l === 0 && c(ie)), s !== r) {
        if (t = [], a = y(), a !== r)
          for (; a !== r; )
            t.push(a), a = y();
        else
          t = r;
        t !== r ? (n = [n, s, t], e = n) : (i = e, e = r);
      } else
        i = e, e = r;
    else
      i = e, e = r;
    return e;
  }
  function dr() {
    var e, n, s, t;
    return e = i, n = hr(), n !== r ? (s = U(), s !== r ? (t = X(), t !== r ? e = Ge(s) : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function U() {
    var e, n;
    if (e = [], n = de(), n !== r)
      for (; n !== r; )
        e.push(n), n = de();
    else
      e = r;
    return e;
  }
  function de() {
    var e;
    return e = N(), e === r && (e = br()), e;
  }
  function br() {
    var e, n, s, t;
    if (e = i, n = i, s = [], t = be(), t !== r)
      for (; t !== r; )
        s.push(t), t = be();
    else
      s = r;
    return s !== r ? n = f.substring(n, i) : n = s, n !== r && (n = Je(n)), e = n, e;
  }
  function be() {
    var e, n, s;
    return e = i, n = i, l++, s = N(), s === r && (s = Ae(), s === r && (s = $())), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (f.length > i ? (s = f.charAt(i), i++) : (s = r, l === 0 && c(_)), s !== r ? (n = [n, s], e = n) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function X() {
    var e;
    return e = Ae(), e === r && (e = M()), e;
  }
  function Ae() {
    var e, n, s, t, a, x, q, B;
    if (e = i, n = i, l++, s = $(), l--, s === r ? n = void 0 : (i = n, n = r), n !== r) {
      if (s = [], t = y(), t !== r)
        for (; t !== r; )
          s.push(t), t = y();
      else
        s = r;
      if (s !== r) {
        if (t = i, a = i, f.substr(i, 2) === p ? (x = p, i += 2) : (x = r, l === 0 && c(ie)), x !== r) {
          for (q = [], f.charCodeAt(i) === 61 ? (B = o, i++) : (B = r, l === 0 && c(te)); B !== r; )
            q.push(B), f.charCodeAt(i) === 61 ? (B = o, i++) : (B = r, l === 0 && c(te));
          x = [x, q], a = x;
        } else
          i = a, a = r;
        a !== r ? t = f.substring(t, i) : t = a, t !== r ? (a = M(), a !== r ? (n = [n, s, t, a], e = n) : (i = e, e = r)) : (i = e, e = r);
      } else
        i = e, e = r;
    } else
      i = e, e = r;
    return e;
  }
  function Ar() {
    var e, n, s;
    if (e = i, n = [], s = me(), s === r && (s = S()), s !== r)
      for (; s !== r; )
        n.push(s), s = me(), s === r && (s = S());
    else
      n = r;
    return n !== r && (n = Ke(n)), e = n, e;
  }
  function mr() {
    var e, n, s;
    return e = i, n = i, l++, s = $(), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (f.substr(i, 8) === d ? (s = d, i += 8) : (s = r, l === 0 && c(ke)), s !== r ? (n = [n, s], e = n) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function me() {
    var e, n, s;
    return e = i, n = mr(), n !== r ? (s = D(), s !== r ? e = s : (i = e, e = r)) : (i = e, e = r), e;
  }
  function xr() {
    var e, n, s;
    if (e = i, n = [], s = xe(), s === r && (s = S()), s !== r)
      for (; s !== r; )
        n.push(s), s = xe(), s === r && (s = S());
    else
      n = r;
    return n !== r && (n = Qe(n)), e = n, e;
  }
  function yr() {
    var e, n, s, t, a;
    if (e = i, n = i, l++, s = $(), l--, s === r ? n = void 0 : (i = n, n = r), n !== r)
      if (f.substr(i, 16) === F ? (s = F, i += 16) : (s = r, l === 0 && c(Te)), s !== r) {
        for (t = [], re.test(f.charAt(i)) ? (a = f.charAt(i), i++) : (a = r, l === 0 && c(fe)); a !== r; )
          t.push(a), re.test(f.charAt(i)) ? (a = f.charAt(i), i++) : (a = r, l === 0 && c(fe));
        n = [n, s, t], e = n;
      } else
        i = e, e = r;
    else
      i = e, e = r;
    return e;
  }
  function xe() {
    var e, n, s;
    return e = i, n = yr(), n !== r ? (s = D(), s !== r ? e = s : (i = e, e = r)) : (i = e, e = r), e;
  }
  function wr() {
    var e, n, s, t;
    if (e = i, n = [], s = i, t = ye(), t !== r ? ($(), s = t) : (i = s, s = r), s !== r)
      for (; s !== r; )
        n.push(s), s = i, t = ye(), t !== r ? ($(), s = t) : (i = s, s = r);
    else
      n = r;
    return n !== r && (n = Ve(n)), e = n, e;
  }
  function ye() {
    var e, n, s;
    if (e = i, n = [], s = D(), s !== r)
      for (; s !== r; )
        n.push(s), s = D();
    else
      n = r;
    return n !== r && (n = We(n)), e = n, e;
  }
  function D() {
    var e, n, s, t;
    return e = i, n = i, l++, s = he(), s === r && (f.substr(i, 4) === K ? (s = K, i += 4) : (s = r, l === 0 && c(He)), s === r && (s = $())), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (s = Cr(), s !== r ? (t = M(), t !== r ? e = Ye(s) : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function Cr() {
    var e, n;
    if (e = [], n = we(), n !== r)
      for (; n !== r; )
        e.push(n), n = we();
    else
      e = r;
    return e;
  }
  function we() {
    var e;
    return e = N(), e === r && (e = Ir()), e;
  }
  function N() {
    var e;
    return e = Fr(), e === r && (e = Rr(), e === r && (e = Hr())), e;
  }
  function O() {
    var e, n, s;
    return e = i, n = i, l++, s = R(), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (f.substr(i, 2) === Q ? (s = Q, i += 2) : (s = r, l === 0 && c(Ie)), s !== r ? (n = [n, s], e = n) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function Er() {
    var e, n, s, t, a;
    if (e = i, n = [], s = A(), s === r && (s = i, t = i, l++, a = O(), l--, a === r ? t = void 0 : (i = t, t = r), t !== r ? (k.test(f.charAt(i)) ? (a = f.charAt(i), i++) : (a = r, l === 0 && c(T)), a !== r ? s = a : (i = s, s = r)) : (i = s, s = r)), s !== r)
      for (; s !== r; )
        n.push(s), s = A(), s === r && (s = i, t = i, l++, a = O(), l--, a === r ? t = void 0 : (i = t, t = r), t !== r ? (k.test(f.charAt(i)) ? (a = f.charAt(i), i++) : (a = r, l === 0 && c(T)), a !== r ? s = a : (i = s, s = r)) : (i = s, s = r));
    else
      n = r;
    return n !== r && (n = Ze(n)), e = n, e;
  }
  function Fr() {
    var e, n, s, t;
    return e = i, n = O(), n !== r ? (s = Er(), s !== r ? (t = O(), t !== r ? e = er(s) : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function L() {
    var e, n, s;
    return e = i, n = i, l++, s = R(), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (f.substr(i, 2) === V ? (s = V, i += 2) : (s = r, l === 0 && c(De)), s !== r ? (n = [n, s], e = n) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function Pr() {
    var e, n, s, t, a;
    if (e = i, n = [], s = A(), s === r && (s = i, t = i, l++, a = L(), l--, a === r ? t = void 0 : (i = t, t = r), t !== r ? (k.test(f.charAt(i)) ? (a = f.charAt(i), i++) : (a = r, l === 0 && c(T)), a !== r ? s = a : (i = s, s = r)) : (i = s, s = r)), s !== r)
      for (; s !== r; )
        n.push(s), s = A(), s === r && (s = i, t = i, l++, a = L(), l--, a === r ? t = void 0 : (i = t, t = r), t !== r ? (k.test(f.charAt(i)) ? (a = f.charAt(i), i++) : (a = r, l === 0 && c(T)), a !== r ? s = a : (i = s, s = r)) : (i = s, s = r));
    else
      n = r;
    return n !== r && (n = rr(n)), e = n, e;
  }
  function Rr() {
    var e, n, s, t;
    return e = i, n = L(), n !== r ? (s = Pr(), s !== r ? (t = L(), t !== r ? e = sr(s) : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function Br() {
    var e, n, s, t, a;
    return e = i, n = i, l++, s = i, t = R(), t !== r ? (f.charCodeAt(i) === 94 ? (a = W, i++) : (a = r, l === 0 && c(ae)), a !== r ? (t = [t, a], s = t) : (i = s, s = r)) : (i = s, s = r), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (f.charCodeAt(i) === 94 ? (s = W, i++) : (s = r, l === 0 && c(ae)), s !== r ? (n = [n, s], e = n) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function jr() {
    var e, n, s, t, a;
    return e = i, n = i, l++, s = i, t = R(), t !== r ? (f.charCodeAt(i) === 40 ? (a = Y, i++) : (a = r, l === 0 && c(le)), a !== r ? (t = [t, a], s = t) : (i = s, s = r)) : (i = s, s = r), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (f.charCodeAt(i) === 40 ? (s = Y, i++) : (s = r, l === 0 && c(le)), s !== r ? (n = [n, s], e = n) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function Sr() {
    var e, n, s, t, a;
    return e = i, n = i, l++, s = i, t = R(), t !== r ? (f.charCodeAt(i) === 41 ? (a = Z, i++) : (a = r, l === 0 && c(ue)), a !== r ? (t = [t, a], s = t) : (i = s, s = r)) : (i = s, s = r), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (f.charCodeAt(i) === 41 ? (s = Z, i++) : (s = r, l === 0 && c(ue)), s !== r ? (n = [n, s], e = n) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function kr() {
    var e, n, s;
    if (e = i, n = [], s = A(), s === r && (se.test(f.charAt(i)) ? (s = f.charAt(i), i++) : (s = r, l === 0 && c(ce))), s !== r)
      for (; s !== r; )
        n.push(s), s = A(), s === r && (se.test(f.charAt(i)) ? (s = f.charAt(i), i++) : (s = r, l === 0 && c(ce)));
    else
      n = r;
    return n !== r && (n = nr(n)), e = n, e;
  }
  function Tr() {
    var e, n, s;
    if (e = i, n = [], s = A(), s === r && (ne.test(f.charAt(i)) ? (s = f.charAt(i), i++) : (s = r, l === 0 && c(oe))), s !== r)
      for (; s !== r; )
        n.push(s), s = A(), s === r && (ne.test(f.charAt(i)) ? (s = f.charAt(i), i++) : (s = r, l === 0 && c(oe)));
    else
      n = r;
    return n !== r && (n = ir(n)), e = n, e;
  }
  function Hr() {
    var e, n, s, t, a, x;
    return e = i, n = Br(), n !== r ? (s = Tr(), s !== r ? (t = jr(), t !== r ? (a = kr(), a !== r ? (x = Sr(), x !== r ? e = tr(s, a) : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r)) : (i = e, e = r), e;
  }
  function Ir() {
    var e, n, s;
    if (e = i, n = [], s = A(), s === r && (s = Ce()), s !== r)
      for (; s !== r; )
        n.push(s), s = A(), s === r && (s = Ce());
    else
      n = r;
    return n !== r && (n = fr(n)), e = n, e;
  }
  function Ce() {
    var e, n, s;
    return e = i, n = i, l++, s = N(), s === r && (s = R(), s === r && (s = $())), l--, s === r ? n = void 0 : (i = n, n = r), n !== r ? (f.length > i ? (s = f.charAt(i), i++) : (s = r, l === 0 && c(_)), s !== r ? e = s : (i = e, e = r)) : (i = e, e = r), e;
  }
  function A() {
    var e, n, s;
    return e = i, n = R(), n !== r ? (Fe.test(f.charAt(i)) ? (s = f.charAt(i), i++) : (s = r, l === 0 && c(Ne)), s !== r ? e = s : (i = e, e = r)) : (i = e, e = r), e;
  }
  function R() {
    var e;
    return f.charCodeAt(i) === 92 ? (e = Ee, i++) : (e = r, l === 0 && c(Oe)), e;
  }
  function $() {
    var e;
    return f.substr(i, 2) === ee ? (e = ee, i += 2) : (e = r, l === 0 && c(Le)), e === r && (Pe.test(f.charAt(i)) ? (e = f.charAt(i), i++) : (e = r, l === 0 && c(Me))), e;
  }
  function y() {
    var e;
    return Re.test(f.charAt(i)) ? (e = f.charAt(i), i++) : (e = r, l === 0 && c(_e)), e;
  }
  function Dr() {
    var e, n;
    return e = i, l++, f.length > i ? (n = f.charAt(i), i++) : (n = r, l === 0 && c(_)), l--, n === r ? e = void 0 : (i = e, e = r), e;
  }
  function M() {
    var e;
    return e = $(), e === r && (e = Dr()), e;
  }
  if (I = m(), I !== r && i === f.length)
    return I;
  throw I !== r && i < f.length && c(lr()), ur(
    z,
    b < f.length ? f.charAt(b) : null,
    b < f.length ? ge(b, b + 1) : ge(b, b)
  );
}
const Vr = {
  parse: Kr
};
export {
  Vr as Lazri,
  Qr as htmlTransform
};
