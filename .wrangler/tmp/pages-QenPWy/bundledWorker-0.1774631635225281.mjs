var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// ../.wrangler/tmp/bundle-zGYgfX/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// _worker.js
globalThis.process = {
  argv: [],
  env: {}
};
var ps = Object.create;
var Ze = Object.defineProperty;
var us = Object.getOwnPropertyDescriptor;
var fs = Object.getOwnPropertyNames;
var ms = Object.getPrototypeOf;
var hs = Object.prototype.hasOwnProperty;
var _ = (e4, t) => () => (e4 && (t = e4(e4 = 0)), t);
var de = (e4, t) => () => (t || e4((t = { exports: {} }).exports, t), t.exports);
var pe = (e4, t) => {
  for (var r in t)
    Ze(e4, r, { get: t[r], enumerable: true });
};
var gs = (e4, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let s of fs(t))
      !hs.call(e4, s) && s !== r && Ze(e4, s, { get: () => t[s], enumerable: !(n = us(t, s)) || n.enumerable });
  return e4;
};
var Te = (e4, t, r) => (r = e4 != null ? ps(ms(e4)) : {}, gs(t || !e4 || !e4.__esModule ? Ze(r, "default", { value: e4, enumerable: true }) : r, e4));
var Q;
var $e = _(() => {
  "use strict";
  Q = [];
});
function Qe(e4) {
  return e4.endsWith("/") ? e4 : e4 + "/";
}
function ue(e4) {
  return e4[0] === "/" ? e4 : "/" + e4;
}
function et(e4) {
  return e4.replace(/(?<!:)\/\/+/g, "/");
}
function Pe(e4) {
  return e4.endsWith("/") ? e4.slice(0, e4.length - 1) : e4;
}
function ys(e4) {
  return e4.startsWith("/") ? e4.substring(1) : e4;
}
function tt(e4) {
  return e4.replace(/^\/|\/$/g, "");
}
function ws(e4) {
  return typeof e4 == "string" || e4 instanceof String;
}
function D(...e4) {
  return e4.filter(ws).map((t, r) => r === 0 ? Pe(t) : r === e4.length - 1 ? ys(t) : tt(t)).join("/");
}
function ee(e4) {
  return /^(http|ftp|https|ws):?\/\//.test(e4) || e4.startsWith("data:");
}
function rt(e4) {
  return e4.replace(/\\/g, "/");
}
var fe = _(() => {
});
var st = de((nt) => {
  "use strict";
  nt.parse = vs;
  nt.serialize = xs;
  var bs = Object.prototype.toString, Ie = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function vs(e4, t) {
    if (typeof e4 != "string")
      throw new TypeError("argument str must be a string");
    for (var r = {}, n = t || {}, s = n.decode || Ss, i = 0; i < e4.length; ) {
      var a = e4.indexOf("=", i);
      if (a === -1)
        break;
      var o = e4.indexOf(";", i);
      if (o === -1)
        o = e4.length;
      else if (o < a) {
        i = e4.lastIndexOf(";", a - 1) + 1;
        continue;
      }
      var l = e4.slice(i, a).trim();
      if (r[l] === void 0) {
        var d = e4.slice(a + 1, o).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), r[l] = js(d, s);
      }
      i = o + 1;
    }
    return r;
  }
  function xs(e4, t, r) {
    var n = r || {}, s = n.encode || As;
    if (typeof s != "function")
      throw new TypeError("option encode is invalid");
    if (!Ie.test(e4))
      throw new TypeError("argument name is invalid");
    var i = s(t);
    if (i && !Ie.test(i))
      throw new TypeError("argument val is invalid");
    var a = e4 + "=" + i;
    if (n.maxAge != null) {
      var o = n.maxAge - 0;
      if (isNaN(o) || !isFinite(o))
        throw new TypeError("option maxAge is invalid");
      a += "; Max-Age=" + Math.floor(o);
    }
    if (n.domain) {
      if (!Ie.test(n.domain))
        throw new TypeError("option domain is invalid");
      a += "; Domain=" + n.domain;
    }
    if (n.path) {
      if (!Ie.test(n.path))
        throw new TypeError("option path is invalid");
      a += "; Path=" + n.path;
    }
    if (n.expires) {
      var l = n.expires;
      if (!Es(l) || isNaN(l.valueOf()))
        throw new TypeError("option expires is invalid");
      a += "; Expires=" + l.toUTCString();
    }
    if (n.httpOnly && (a += "; HttpOnly"), n.secure && (a += "; Secure"), n.partitioned && (a += "; Partitioned"), n.priority) {
      var d = typeof n.priority == "string" ? n.priority.toLowerCase() : n.priority;
      switch (d) {
        case "low":
          a += "; Priority=Low";
          break;
        case "medium":
          a += "; Priority=Medium";
          break;
        case "high":
          a += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (n.sameSite) {
      var c = typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite;
      switch (c) {
        case true:
          a += "; SameSite=Strict";
          break;
        case "lax":
          a += "; SameSite=Lax";
          break;
        case "strict":
          a += "; SameSite=Strict";
          break;
        case "none":
          a += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return a;
  }
  function Ss(e4) {
    return e4.indexOf("%") !== -1 ? decodeURIComponent(e4) : e4;
  }
  function As(e4) {
    return encodeURIComponent(e4);
  }
  function Es(e4) {
    return bs.call(e4) === "[object Date]" || e4 instanceof Date;
  }
  function js(e4, t) {
    try {
      return t(e4);
    } catch {
      return e4;
    }
  }
});
function A(e4, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e4}m`, s = `\x1B[${t}m`;
  return function(i) {
    return !Rs.enabled || i == null ? i : n + (~("" + i).indexOf(s) ? i.replace(r, s + n) : i) + s;
  };
}
var it;
var ar;
var or;
var cr;
var lr;
var Rs;
var Sc;
var Le;
var at;
var Ac;
var Ec;
var jc;
var Rc;
var Tc;
var $c;
var dr;
var Pc;
var pr;
var ur;
var Ic;
var Lc;
var Cc;
var kc;
var _c;
var Mc;
var Nc;
var Oc;
var Uc;
var Dc;
var Hc;
var Fc;
var zc;
var me = _(() => {
  lr = true;
  typeof process < "u" && ({ FORCE_COLOR: it, NODE_DISABLE_COLORS: ar, NO_COLOR: or, TERM: cr } = process.env || {}, lr = process.stdout && process.stdout.isTTY);
  Rs = { enabled: !ar && or == null && cr !== "dumb" && (it != null && it !== "0" || lr) };
  Sc = A(0, 0), Le = A(1, 22), at = A(2, 22), Ac = A(3, 23), Ec = A(4, 24), jc = A(7, 27), Rc = A(8, 28), Tc = A(9, 29), $c = A(30, 39), dr = A(31, 39), Pc = A(32, 39), pr = A(33, 39), ur = A(34, 39), Ic = A(35, 39), Lc = A(36, 39), Cc = A(37, 39), kc = A(90, 39), _c = A(90, 39), Mc = A(40, 49), Nc = A(41, 49), Oc = A(42, 49), Uc = A(43, 49), Dc = A(44, 49), Hc = A(45, 49), Fc = A(46, 49), zc = A(47, 49);
});
var Ts;
var $s;
var Ps;
var Is;
var fr;
var te = _(() => {
  ({ replace: Ts } = ""), $s = /[&<>'"]/g, Ps = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, Is = (e4) => Ps[e4], fr = (e4) => Ts.call(e4, $s, Is);
});
function mr(e4) {
  var t, r, n = "";
  if (typeof e4 == "string" || typeof e4 == "number")
    n += e4;
  else if (typeof e4 == "object")
    if (Array.isArray(e4)) {
      var s = e4.length;
      for (t = 0; t < s; t++)
        e4[t] && (r = mr(e4[t])) && (n && (n += " "), n += r);
    } else
      for (r in e4)
        e4[r] && (n && (n += " "), n += r);
  return n;
}
function ot() {
  for (var e4, t, r = 0, n = "", s = arguments.length; r < s; r++)
    (e4 = arguments[r]) && (t = mr(e4)) && (n && (n += " "), n += t);
  return n;
}
var re = _(() => {
});
var gr = de((Gc, hr) => {
  "use strict";
  var Ls = {}, Cs = Ls.hasOwnProperty, ks = function(t, r) {
    if (!t)
      return r;
    var n = {};
    for (var s in r)
      n[s] = Cs.call(t, s) ? t[s] : r[s];
    return n;
  }, _s2 = /[ -,\.\/:-@\[-\^`\{-~]/, Ms = /[ -,\.\/:-@\[\]\^`\{-~]/, Ns = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g, ct = function e4(t, r) {
    r = ks(r, e4.options), r.quotes != "single" && r.quotes != "double" && (r.quotes = "single");
    for (var n = r.quotes == "double" ? '"' : "'", s = r.isIdentifier, i = t.charAt(0), a = "", o = 0, l = t.length; o < l; ) {
      var d = t.charAt(o++), c = d.charCodeAt(), p = void 0;
      if (c < 32 || c > 126) {
        if (c >= 55296 && c <= 56319 && o < l) {
          var u = t.charCodeAt(o++);
          (u & 64512) == 56320 ? c = ((c & 1023) << 10) + (u & 1023) + 65536 : o--;
        }
        p = "\\" + c.toString(16).toUpperCase() + " ";
      } else
        r.escapeEverything ? _s2.test(d) ? p = "\\" + d : p = "\\" + c.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(d) ? p = "\\" + c.toString(16).toUpperCase() + " " : d == "\\" || !s && (d == '"' && n == d || d == "'" && n == d) || s && Ms.test(d) ? p = "\\" + d : p = d;
      a += p;
    }
    return s && (/^-[-\d]/.test(a) ? a = "\\-" + a.slice(1) : /\d/.test(i) && (a = "\\3" + i + " " + a.slice(1))), a = a.replace(Ns, function(w, f, h) {
      return f && f.length % 2 ? w : (f || "") + h;
    }), !s && r.wrap ? n + a + n : a;
  };
  ct.options = { escapeEverything: false, isIdentifier: false, quotes: "single", wrap: false };
  ct.version = "3.0.0";
  hr.exports = ct;
});
function Us(e4) {
  return e4.replace(/\r\n|\r(?!\n)|\n/g, `
`);
}
function Ds(e4, t) {
  if (!t || t.line === void 0 || t.column === void 0)
    return "";
  let r = Us(e4).split(`
`).map((a) => a.replace(/\t/g, "  ")), n = [];
  for (let a = -2; a <= 2; a++)
    r[t.line + a] && n.push(t.line + a);
  let s = 0;
  for (let a of n) {
    let o = `> ${a}`;
    o.length > s && (s = o.length);
  }
  let i = "";
  for (let a of n) {
    let o = a === t.line - 1;
    i += o ? "> " : "  ", i += `${a + 1} | ${r[a]}
`, o && (i += `${Array.from({ length: s }).join(" ")}  | ${Array.from({ length: t.column }).join(" ")}^
`);
  }
  return i;
}
async function Ur(e4, t, r, n) {
  let { request: s, url: i } = t, a = s.method.toUpperCase(), o = e4[a] ?? e4.ALL;
  if (!r && r === false && a !== "GET" && n.warn("router", `${i.pathname} ${Le(a)} requests are not available for a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` to enable.`), o === void 0)
    return n.warn("router", `No API Route handler exists for the method "${a}" for the route "${i.pathname}".
Found handlers: ${Object.keys(e4).map((d) => JSON.stringify(d)).join(", ")}
` + ("all" in e4 ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")), new Response(null, { status: 404 });
  if (typeof o != "function")
    return n.error("router", `The route "${i.pathname}" exports a value for the method "${a}", but it is of the type ${typeof o} instead of a function.`), new Response(null, { status: 500 });
  let l = await o.call(e4, t);
  return Nt.includes(l.status) && l.headers.set(ve, "no"), l;
}
function Hs(e4) {
  return !(e4.length !== 3 || !e4[0] || typeof e4[0] != "object");
}
function Dr(e4, t, r) {
  let n = t?.split("/").pop()?.replace(".astro", "") ?? "", s = (...i) => {
    if (!Hs(i))
      throw new m({ ...vr, message: vr.message(n) });
    return e4(...i);
  };
  return Object.defineProperty(s, "name", { value: n, writable: false }), s.isAstroComponentFactory = true, s.moduleId = t, s.propagation = r, s;
}
function Fs(e4) {
  return Dr(e4.factory, e4.moduleId, e4.propagation);
}
function G(e4, t, r) {
  return typeof e4 == "function" ? Dr(e4, t, r) : Fs(e4);
}
function zs() {
  return (t) => {
    if (typeof t == "string")
      throw new m({ ...xr, message: xr.message(JSON.stringify(t)) });
    let r = [...Object.values(t)];
    if (r.length === 0)
      throw new m({ ...Sr, message: Sr.message(JSON.stringify(t)) });
    return Promise.all(r.map((n) => n()));
  };
}
function q(e4) {
  return { site: e4 ? new URL(e4) : void 0, generator: `Astro v${Mt}`, glob: zs() };
}
function Ut(e4) {
  return !!e4 && typeof e4 == "object" && typeof e4.then == "function";
}
function Ws(e4) {
  return Object.prototype.toString.call(e4) === "[object HTMLString]";
}
function Ar(e4) {
  return e4 && typeof e4 == "object" && e4[Hr];
}
function Ce(e4) {
  return Object.defineProperty(e4, Fr, { value: true });
}
function Vs(e4) {
  return e4 && typeof e4 == "object" && e4[Fr];
}
function pt(e4, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e4))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e4);
  let n = e4.map((s) => Wr(s, t, r));
  return r.delete(e4), n;
}
function zr(e4, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e4))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e4);
  let n = Object.fromEntries(Object.entries(e4).map(([s, i]) => [s, Wr(i, t, r)]));
  return r.delete(e4), n;
}
function Wr(e4, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  switch (Object.prototype.toString.call(e4)) {
    case "[object Date]":
      return [k.Date, e4.toISOString()];
    case "[object RegExp]":
      return [k.RegExp, e4.source];
    case "[object Map]":
      return [k.Map, pt(Array.from(e4), t, r)];
    case "[object Set]":
      return [k.Set, pt(Array.from(e4), t, r)];
    case "[object BigInt]":
      return [k.BigInt, e4.toString()];
    case "[object URL]":
      return [k.URL, e4.toString()];
    case "[object Array]":
      return [k.JSON, pt(e4, t, r)];
    case "[object Uint8Array]":
      return [k.Uint8Array, Array.from(e4)];
    case "[object Uint16Array]":
      return [k.Uint16Array, Array.from(e4)];
    case "[object Uint32Array]":
      return [k.Uint32Array, Array.from(e4)];
    default:
      return e4 !== null && typeof e4 == "object" ? [k.Value, zr(e4, t, r)] : e4 === void 0 ? [k.Value] : [k.Value, e4];
  }
}
function Vr(e4, t) {
  return JSON.stringify(zr(e4, t));
}
function Bs(e4, t) {
  let r = { isPage: false, hydration: null, props: {}, propsWithoutTransitionAttributes: {} };
  for (let [n, s] of Object.entries(e4))
    if (n.startsWith("server:") && n === "server:root" && (r.isPage = true), n.startsWith("client:"))
      switch (r.hydration || (r.hydration = { directive: "", value: "", componentUrl: "", componentExport: { value: "" } }), n) {
        case "client:component-path": {
          r.hydration.componentUrl = s;
          break;
        }
        case "client:component-export": {
          r.hydration.componentExport.value = s;
          break;
        }
        case "client:component-hydration":
          break;
        case "client:display-name":
          break;
        default: {
          if (r.hydration.directive = n.split(":")[1], r.hydration.value = s, !t.has(r.hydration.directive)) {
            let i = Array.from(t.keys()).map((a) => `client:${a}`).join(", ");
            throw new Error(`Error: invalid hydration directive "${n}". Supported hydration methods: ${i}`);
          }
          if (r.hydration.directive === "media" && typeof r.hydration.value != "string")
            throw new m(Os);
          break;
        }
      }
    else
      r.props[n] = s, Br.includes(n) || (r.propsWithoutTransitionAttributes[n] = s);
  for (let n of Object.getOwnPropertySymbols(e4))
    r.props[n] = e4[n], r.propsWithoutTransitionAttributes[n] = e4[n];
  return r;
}
async function Gs(e4, t) {
  let { renderer: r, result: n, astroId: s, props: i, attrs: a } = e4, { hydrate: o, componentUrl: l, componentExport: d } = t;
  if (!d.value)
    throw new m({ ...br, message: br.message(t.displayName) });
  let c = { children: "", props: { uid: s } };
  if (a)
    for (let [u, w] of Object.entries(a))
      c.props[u] = ge(w);
  c.props["component-url"] = await n.resolve(decodeURI(l)), r.clientEntrypoint && (c.props["component-export"] = d.value, c.props["renderer-url"] = await n.resolve(decodeURI(r.clientEntrypoint)), c.props.props = ge(Vr(i, t))), c.props.ssr = "", c.props.client = o;
  let p = await n.resolve("astro:scripts/before-hydration.js");
  return p.length && (c.props["before-hydration-url"] = p), c.props.opts = ge(JSON.stringify({ name: t.displayName, value: t.hydrateArgs || "" })), Br.forEach((u) => {
    i[u] && (c.props[u] = i[u]);
  }), c;
}
function qs(e4) {
  let t = 0;
  if (e4.length === 0)
    return t;
  for (let r = 0; r < e4.length; r++) {
    let n = e4.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t;
}
function Js(e4) {
  let t, r = "", n = qs(e4), s = n < 0 ? "Z" : "";
  for (n = Math.abs(n); n >= ut; )
    t = n % ut, n = Math.floor(n / ut), r = mt[t] + r;
  return n > 0 && (r = mt[n] + r), s + r;
}
function Gr(e4) {
  return e4 == null ? false : e4.isAstroComponentFactory === true;
}
function Ys(e4, t) {
  let r = t.propagation || "none";
  return t.moduleId && e4.componentMetadata.has(t.moduleId) && r === "none" && (r = e4.componentMetadata.get(t.moduleId).propagation), r === "in-tree" || r === "self";
}
function Dt(e4) {
  return typeof e4 == "object" && !!e4[Xs];
}
function Qs(e4) {
  return e4._metadata.hasHydrationScript ? false : e4._metadata.hasHydrationScript = true;
}
function ei(e4, t) {
  return e4._metadata.hasDirectives.has(t) ? false : (e4._metadata.hasDirectives.add(t), true);
}
function Er(e4, t) {
  let n = e4.clientDirectives.get(t);
  if (!n)
    throw new Error(`Unknown directive: ${t}`);
  return n;
}
function ti(e4, t, r) {
  switch (t) {
    case "both":
      return `${Zs}<script>${Er(e4, r)};${Ks}<\/script>`;
    case "directive":
      return `<script>${Er(e4, r)}<\/script>`;
  }
  return "";
}
function ci(e4) {
  let t = "";
  for (let [r, n] of Object.entries(e4))
    t += `const ${ai(r)} = ${JSON.stringify(n)?.replace(/<\/script>/g, "\\x3C/script>")};
`;
  return S(t);
}
function Rr(e4) {
  return e4.length === 1 ? e4[0] : `${e4.slice(0, -1).join(", ")} or ${e4[e4.length - 1]}`;
}
function N(e4, t, r = true) {
  if (e4 == null)
    return "";
  if (e4 === false)
    return ni.test(t) || si.test(t) ? S(` ${t}="false"`) : "";
  if (ii.has(t))
    return console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`), "";
  if (t === "class:list") {
    let n = ne(ot(e4), r);
    return n === "" ? "" : S(` ${t.slice(0, -5)}="${n}"`);
  }
  if (t === "style" && !(e4 instanceof B)) {
    if (Array.isArray(e4) && e4.length === 2)
      return S(` ${t}="${ne(`${jr(e4[0])};${e4[1]}`, r)}"`);
    if (typeof e4 == "object")
      return S(` ${t}="${ne(jr(e4), r)}"`);
  }
  return t === "className" ? S(` class="${ne(e4, r)}"`) : e4 === true && (t.startsWith("data-") || ri.test(t)) ? S(` ${t}`) : S(` ${t}="${ne(e4, r)}"`);
}
function ht(e4, t = true) {
  let r = "";
  for (let [n, s] of Object.entries(e4))
    r += N(s, n, t);
  return S(r);
}
function he(e4, { props: t, children: r = "" }, n = true) {
  let { lang: s, "data-astro-id": i, "define:vars": a, ...o } = t;
  return a && (e4 === "style" && (delete o["is:global"], delete o["is:scoped"]), e4 === "script" && (delete o.hoist, r = ci(a) + `
` + r)), (r == null || r == "") && Ht.test(e4) ? `<${e4}${ht(o, n)} />` : `<${e4}${ht(o, n)}>${r}</${e4}>`;
}
function qr(e4) {
  let t = [], r = { write: (s) => t.push(s) }, n = e4(r);
  return Promise.resolve(n).catch(() => {
  }), { async renderToFinalDestination(s) {
    for (let i of t)
      s.write(i);
    r.write = (i) => s.write(i), await n;
  } };
}
function Tr() {
  let e4, t;
  return { promise: new Promise((n, s) => {
    e4 = n, t = s;
  }), resolve: e4, reject: t };
}
function $r(e4) {
  e4._metadata.hasRenderedHead = true;
  let t = Array.from(e4.styles).filter(ft).map((i) => i.props.rel === "stylesheet" ? he("link", i) : he("style", i));
  e4.styles.clear();
  let r = Array.from(e4.scripts).filter(ft).map((i) => he("script", i, false)), n = Array.from(e4.links).filter(ft).map((i) => he("link", i, false)), s = t.join(`
`) + n.join(`
`) + r.join(`
`);
  if (e4._metadata.extraHead.length > 0)
    for (let i of e4._metadata.extraHead)
      s += i;
  return S(s);
}
function* Jr() {
  yield Ce({ type: "head" });
}
function* J() {
  yield Ce({ type: "maybe-head" });
}
function di(e4) {
  return !!e4[gt];
}
function Ue(e4, t, r) {
  return !t && r ? Ue(e4, r) : { async render(n) {
    await se(n, typeof t == "function" ? t(e4) : t);
  } };
}
async function Y(e4, t, r) {
  let n = "", s = null, i = { write(o) {
    o instanceof Response || (typeof o == "object" && "type" in o && typeof o.type == "string" ? (s === null && (s = []), s.push(o)) : n += F(e4, o));
  } };
  return await Ue(e4, t, r).render(i), S(new ke(n, s));
}
async function Yr(e4, t = {}) {
  let r = null, n = {};
  return t && await Promise.all(Object.entries(t).map(([s, i]) => Y(e4, i).then((a) => {
    a.instructions && (r === null && (r = []), r.push(...a.instructions)), n[s] = a;
  }))), { slotInstructions: r, children: n };
}
function Ft(e4, t) {
  if (Vs(t)) {
    let r = t;
    switch (r.type) {
      case "directive": {
        let { hydration: n } = r, s = n && Qs(e4), i = n && ei(e4, n.directive), a = s ? "both" : i ? "directive" : null;
        if (a) {
          let o = ti(e4, a, n.directive);
          return S(o);
        } else
          return "";
      }
      case "head":
        return e4._metadata.hasRenderedHead || e4.partial ? "" : $r(e4);
      case "maybe-head":
        return e4._metadata.hasRenderedHead || e4._metadata.headInTree || e4.partial ? "" : $r(e4);
      case "renderer-hydration-script": {
        let { rendererSpecificHydrationScripts: n } = e4._metadata, { rendererName: s } = r;
        return n.has(s) ? "" : (n.add(s), r.render());
      }
      default:
        throw new Error(`Unknown chunk type: ${t.type}`);
    }
  } else {
    if (t instanceof Response)
      return "";
    if (di(t)) {
      let r = "", n = t;
      if (n.instructions)
        for (let s of n.instructions)
          r += Ft(e4, s);
      return r += t.toString(), r;
    }
  }
  return t.toString();
}
function F(e4, t) {
  return ArrayBuffer.isView(t) ? ui.decode(t) : Ft(e4, t);
}
function Xr(e4, t) {
  if (ArrayBuffer.isView(t))
    return t;
  {
    let r = Ft(e4, t);
    return ye.encode(r.toString());
  }
}
function fi(e4) {
  return !!e4 && typeof e4 == "object" && "render" in e4 && typeof e4.render == "function";
}
async function se(e4, t) {
  if (t = await t, t instanceof ke)
    e4.write(t);
  else if (Ws(t))
    e4.write(t);
  else if (Array.isArray(t)) {
    let r = t.map((n) => qr((s) => se(s, n)));
    for (let n of r)
      n && await n.renderToFinalDestination(e4);
  } else if (typeof t == "function")
    await se(e4, t());
  else if (typeof t == "string")
    e4.write(S(ge(t)));
  else if (!(!t && t !== 0))
    if (fi(t))
      await t.render(e4);
    else if (Qr(t))
      await t.render(e4);
    else if (gi(t))
      await t.render(e4);
    else if (ArrayBuffer.isView(t))
      e4.write(t);
    else if (typeof t == "object" && (Symbol.asyncIterator in t || Symbol.iterator in t))
      for await (let r of t)
        await se(e4, r);
    else
      e4.write(t);
}
function mi(e4, t) {
  if (e4 != null)
    for (let r of Object.keys(e4))
      r.startsWith("client:") && console.warn(`You are attempting to render <${t} ${r} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`);
}
function hi(e4, t, r, n, s = {}) {
  mi(n, t);
  let i = new yt(e4, n, s, r);
  return Ys(e4, r) && e4._metadata.propagators.add(i), i;
}
function gi(e4) {
  return typeof e4 == "object" && !!e4[Kr];
}
function Qr(e4) {
  return typeof e4 == "object" && !!e4[Zr];
}
function O(e4, ...t) {
  return new wt(e4, t);
}
async function en(e4, t, r, n, s = false, i) {
  let a = await Wt(e4, t, r, n, i);
  if (a instanceof Response)
    return a;
  let o = "", l = false, d = { write(c) {
    if (s && !l && (l = true, !e4.partial && !zt.test(String(c)))) {
      let p = e4.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
      o += p;
    }
    c instanceof Response || (o += F(e4, c));
  } };
  return await a.render(d), o;
}
async function yi(e4, t, r, n, s = false, i) {
  let a = await Wt(e4, t, r, n, i);
  if (a instanceof Response)
    return a;
  let o = false;
  return s && await tn(e4), new ReadableStream({ start(l) {
    let d = { write(c) {
      if (s && !o && (o = true, !e4.partial && !zt.test(String(c)))) {
        let u = e4.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        l.enqueue(ye.encode(u));
      }
      if (c instanceof Response)
        throw new m({ ...be });
      let p = Xr(e4, c);
      l.enqueue(p);
    } };
    (async () => {
      try {
        await a.render(d), l.close();
      } catch (c) {
        m.is(c) && !c.loc && c.setLocation({ file: i?.component }), setTimeout(() => l.error(c), 0);
      }
    })();
  } });
}
async function Wt(e4, t, r, n, s) {
  let i = await t(e4, r, n);
  if (i instanceof Response)
    return i;
  if (!Qr(i))
    throw new m({ ...yr, message: yr.message(s?.route, typeof i), location: { file: s?.component } });
  return Dt(i) ? i.content : i;
}
async function tn(e4) {
  let t = e4._metadata.propagators.values();
  for (; ; ) {
    let { value: r, done: n } = t.next();
    if (n)
      break;
    let s = await r.init(e4);
    Dt(s) && e4._metadata.extraHead.push(s.head);
  }
}
async function wi(e4, t, r, n, s = false, i) {
  let a = await Wt(e4, t, r, n, i);
  if (a instanceof Response)
    return a;
  let o = false;
  s && await tn(e4);
  let l = null, d = Tr(), c = [], p = { async next() {
    if (await d.promise, l)
      throw l;
    let f = 0;
    for (let g = 0, T = c.length; g < T; g++)
      f += c[g].length;
    let h = new Uint8Array(f), v = 0;
    for (let g = 0, T = c.length; g < T; g++) {
      let j = c[g];
      h.set(j, v), v += j.length;
    }
    return c.length = 0, { done: f === 0, value: h };
  } }, u = { write(f) {
    if (s && !o && (o = true, !e4.partial && !zt.test(String(f)))) {
      let v = e4.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
      c.push(ye.encode(v));
    }
    if (f instanceof Response)
      throw new m(be);
    let h = Xr(e4, f);
    h.length > 0 && (c.push(h), d.resolve(), d = Tr());
  } };
  return a.render(u).then(() => {
    d.resolve();
  }).catch((f) => {
    l = f, d.resolve();
  }), { [Symbol.asyncIterator]() {
    return p;
  } };
}
function bi(e4) {
  return typeof HTMLElement < "u" && HTMLElement.isPrototypeOf(e4);
}
async function vi(e4, t, r, n) {
  let s = xi(t), i = "";
  for (let a in r)
    i += ` ${a}="${ne(await r[a])}"`;
  return S(`<${s}${i}>${await Y(e4, n?.default)}</${s}>`);
}
function xi(e4) {
  let t = customElements.getName(e4);
  return t || e4.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
}
function Ai(e4) {
  switch (e4?.split(".").pop()) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue", "@astrojs/svelte", "@astrojs/lit"];
  }
}
function Ei(e4) {
  return e4 === pi;
}
function ji(e4) {
  return e4 && e4["astro:html"] === true;
}
function $i(e4, t) {
  let r = t ? Ti : Ri;
  return e4.replace(r, "");
}
async function Pi(e4, t, r, n, s = {}) {
  if (!r && !n["client:only"])
    throw new Error(`Unable to render ${t} because it is ${r}!
Did you forget to import the component or is it possible there is a typo?`);
  let { renderers: i, clientDirectives: a } = e4, o = { astroStaticSlot: true, displayName: t }, { hydration: l, isPage: d, props: c, propsWithoutTransitionAttributes: p } = Bs(n, a), u = "", w;
  l && (o.hydrate = l.directive, o.hydrateArgs = l.value, o.componentExport = l.componentExport, o.componentUrl = l.componentUrl);
  let f = Ai(o.componentUrl), h = i.filter((y) => y.name !== "astro:jsx"), { children: v, slotInstructions: b } = await Yr(e4, s), g;
  if (o.hydrate !== "only") {
    let y = false;
    try {
      y = r && r[Pr];
    } catch {
    }
    if (y) {
      let x = r[Pr];
      g = i.find(({ name: R }) => R === x);
    }
    if (!g) {
      let x;
      for (let R of i)
        try {
          if (await R.ssr.check.call({ result: e4 }, r, c, v)) {
            g = R;
            break;
          }
        } catch (W) {
          x ??= W;
        }
      if (!g && x)
        throw x;
    }
    if (!g && typeof HTMLElement == "function" && bi(r)) {
      let x = await vi(e4, r, n, s);
      return { render(R) {
        R.write(x);
      } };
    }
  } else {
    if (o.hydrateArgs) {
      let y = o.hydrateArgs, x = Ir.has(y) ? Ir.get(y) : y;
      g = i.find(({ name: R }) => R === `@astrojs/${x}` || R === x);
    }
    if (!g && h.length === 1 && (g = h[0]), !g) {
      let y = o.componentUrl?.split(".").pop();
      g = i.filter(({ name: x }) => x === `@astrojs/${y}` || x === y)[0];
    }
  }
  if (g)
    o.hydrate === "only" ? u = await Y(e4, s?.fallback) : (performance.now(), { html: u, attrs: w } = await g.ssr.renderToStaticMarkup.call({ result: e4 }, r, p, v, o));
  else {
    if (o.hydrate === "only")
      throw new m({ ...dt, message: dt.message(o.displayName), hint: dt.hint(f.map((y) => y.replace("@astrojs/", "")).join("|")) });
    if (typeof r != "string") {
      let y = h.filter((R) => f.includes(R.name)), x = h.length > 1;
      if (y.length === 0)
        throw new m({ ...lt, message: lt.message(o.displayName, o?.componentUrl?.split(".").pop(), x, h.length), hint: lt.hint(Rr(f.map((R) => "`" + R + "`"))) });
      if (y.length === 1)
        g = y[0], { html: u, attrs: w } = await g.ssr.renderToStaticMarkup.call({ result: e4 }, r, p, v, o);
      else
        throw new Error(`Unable to render ${o.displayName}!

This component likely uses ${Rr(f)},
but Astro encountered an error during server-side rendering.

Please ensure that ${o.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
    }
  }
  if (g && !g.clientEntrypoint && g.name !== "@astrojs/lit" && o.hydrate)
    throw new m({ ...wr, message: wr.message(t, o.hydrate, g.name) });
  if (!u && typeof r == "string") {
    let y = Ii(r), x = Object.values(v).join(""), R = O`<${y}${ht(c)}${S(x === "" && Ht.test(y) ? "/>" : `>${x}</${y}>`)}`;
    u = "";
    let W = { write(Re) {
      Re instanceof Response || (u += F(e4, Re));
    } };
    await R.render(W);
  }
  if (!l)
    return { render(y) {
      if (b)
        for (let x of b)
          y.write(x);
      d || g?.name === "astro:jsx" ? y.write(u) : u && u.length > 0 && y.write(S($i(u, g?.ssr?.supportsAstroStaticSlot ?? false)));
    } };
  let T = Js(`<!--${o.componentExport.value}:${o.componentUrl}-->
${u}
${Vr(c, o)}`), j = await Gs({ renderer: g, result: e4, astroId: T, props: c, attrs: w }, o), P = [];
  if (u) {
    if (Object.keys(v).length > 0)
      for (let y of Object.keys(v)) {
        let x = g?.ssr?.supportsAstroStaticSlot ? o.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot", R = y === "default" ? `<${x}>` : `<${x} name="${y}">`;
        u.includes(R) || P.push(y);
      }
  } else
    P = Object.keys(v);
  let L = P.length > 0 ? P.map((y) => `<template data-astro-template${y !== "default" ? `="${y}"` : ""}>${v[y]}</template>`).join("") : "";
  return j.children = `${u ?? ""}${L}`, j.children && (j.props["await-children"] = "", j.children += "<!--astro:end-->"), { render(y) {
    if (b)
      for (let x of b)
        y.write(x);
    y.write(Ce({ type: "directive", hydration: l })), l.directive !== "only" && g?.ssr.renderHydrationScript && y.write(Ce({ type: "renderer-hydration-script", rendererName: g.name, render: g.ssr.renderHydrationScript })), y.write(S(he("astro-island", j, false)));
  } };
}
function Ii(e4) {
  let t = /[&<>'"\s]+/;
  return t.test(e4) ? e4.trim().split(t)[0].trim() : e4;
}
async function Li(e4, t = {}) {
  let r = await Y(e4, t?.default);
  return { render(n) {
    r != null && n.write(r);
  } };
}
async function Ci(e4, t, r, n = {}) {
  let { slotInstructions: s, children: i } = await Yr(e4, n), a = t({ slots: i }), o = s ? s.map((l) => F(e4, l)).join("") : "";
  return { render(l) {
    l.write(S(o + a));
  } };
}
function ki(e4, t, r, n, s = {}) {
  let i = hi(e4, t, r, n, s);
  return { async render(a) {
    await i.render(a);
  } };
}
async function X(e4, t, r, n, s = {}) {
  return Ut(r) && (r = await r), Ei(r) ? await Li(e4, s) : (n = _i(n), ji(r) ? await Ci(e4, r, n, s) : Gr(r) ? ki(e4, t, r, n, s) : await Pi(e4, t, r, n, s));
}
function _i(e4) {
  if (e4["class:list"] !== void 0) {
    let t = e4["class:list"];
    delete e4["class:list"], e4.class = ot(e4.class, t), e4.class === "" && delete e4.class;
  }
  return e4;
}
async function bt(e4, t, r, n, s = {}, i = false, a) {
  let o = "", l = false, d = "";
  if (Mi(r))
    for (let c of J())
      d += F(e4, c);
  try {
    let c = { write(u) {
      if (i && !l && (l = true, !e4.partial && !/<!doctype html/i.test(String(u)))) {
        let w = e4.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        o += w + d;
      }
      u instanceof Response || (o += F(e4, u));
    } };
    await (await X(e4, t, r, n, s)).render(c);
  } catch (c) {
    throw m.is(c) && !c.loc && c.setLocation({ file: a?.component }), c;
  }
  return o;
}
function Mi(e4) {
  return !!e4?.[Si];
}
async function H(e4, t) {
  switch (true) {
    case t instanceof B:
      return t.toString().trim() === "" ? "" : t;
    case typeof t == "string":
      return S(ge(t));
    case typeof t == "function":
      return t;
    case (!t && t !== 0):
      return "";
    case Array.isArray(t):
      return S((await Promise.all(t.map((n) => H(e4, n)))).join(""));
  }
  let r;
  return t.props ? t.props[V.symbol] ? r = t.props[V.symbol] : r = new V(t) : r = new V(t), xt(e4, t, r);
}
async function xt(e4, t, r) {
  if (Ar(t)) {
    switch (true) {
      case !t.type:
        throw new Error(`Unable to render ${e4.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      case t.type === Symbol.for("astro:fragment"):
        return H(e4, t.props.children);
      case t.type.isAstroComponentFactory: {
        let n = {}, s = {};
        for (let [o, l] of Object.entries(t.props ?? {}))
          o === "children" || l && typeof l == "object" && l.$$slot ? s[o === "children" ? "default" : o] = () => H(e4, l) : n[o] = l;
        let i = await en(e4, t.type, n, s);
        if (i instanceof Response)
          throw i;
        return S(i);
      }
      case (!t.type && t.type !== 0):
        return "";
      case (typeof t.type == "string" && t.type !== Lr):
        return S(await Ni(e4, t.type, t.props ?? {}));
    }
    if (t.type) {
      let n = function(c) {
        if (Array.isArray(c))
          return c.map((p) => n(p));
        if (!Ar(c)) {
          a.default.push(c);
          return;
        }
        if ("slot" in c.props) {
          a[c.props.slot] = [...a[c.props.slot] ?? [], c], delete c.props.slot;
          return;
        }
        a.default.push(c);
      };
      if (typeof t.type == "function" && t.type["astro:renderer"] && r.increment(), typeof t.type == "function" && t.props["server:root"]) {
        let c = await t.type(t.props ?? {});
        return await H(e4, c);
      }
      if (typeof t.type == "function")
        if (r.haveNoTried() || r.isCompleted()) {
          Ui();
          try {
            let c = await t.type(t.props ?? {}), p;
            if (c?.[Hr])
              return p = await xt(e4, c, r), p;
            if (!c)
              return p = await xt(e4, c, r), p;
          } catch (c) {
            if (r.isCompleted())
              throw c;
            r.increment();
          } finally {
            Di();
          }
        } else
          r.increment();
      let { children: s = null, ...i } = t.props ?? {}, a = { default: [] };
      n(s);
      for (let [c, p] of Object.entries(i))
        p.$$slot && (a[c] = p, delete i[c]);
      let o = [], l = {};
      for (let [c, p] of Object.entries(a))
        o.push(H(e4, p).then((u) => {
          u.toString().trim().length !== 0 && (l[c] = () => u);
        }));
      await Promise.all(o), i[V.symbol] = r;
      let d;
      return t.type === Lr && t.props["client:only"] ? d = await bt(e4, t.props["client:display-name"] ?? "", null, i, l) : d = await bt(e4, typeof t.type == "function" ? t.type.name : t.type, t.type, i, l), S(d);
    }
  }
  return S(`${t}`);
}
async function Ni(e4, t, { children: r, ...n }) {
  return S(`<${t}${z(n)}${S((r == null || r == "") && Ht.test(t) ? "/>" : `>${r == null ? "" : await H(e4, Oi(t, r))}</${t}>`)}`);
}
function Oi(e4, t) {
  return typeof t == "string" && (e4 === "style" || e4 === "script") ? S(t) : t;
}
function Ui() {
  if (Vt++, !vt) {
    vt = console.error;
    try {
      console.error = Hi;
    } catch {
    }
  }
}
function Di() {
  Vt--;
}
function Hi(e4, ...t) {
  Vt > 0 && typeof e4 == "string" && e4.includes("Warning: Invalid hook call.") && e4.includes("https://reactjs.org/link/invalid-hook-call") || vt(e4, ...t);
}
async function rn(e4, t, r, n, s, i) {
  if (!Gr(t)) {
    e4._metadata.headInTree = e4.componentMetadata.get(t.moduleId)?.containsHead ?? false;
    let c = { ...r ?? {}, "server:root": true }, p = await bt(e4, t.name, t, c, {}, true, i), u = ye.encode(p);
    return new Response(u, { headers: new Headers([["Content-Type", "text/html; charset=utf-8"], ["Content-Length", u.byteLength.toString()]]) });
  }
  e4._metadata.headInTree = e4.componentMetadata.get(t.moduleId)?.containsHead ?? false;
  let a;
  if (s ? li ? a = await wi(e4, t, r, n, true, i) : a = await yi(e4, t, r, n, true, i) : a = await en(e4, t, r, n, true, i), a instanceof Response)
    return a;
  let o = e4.response, l = new Headers(o.headers);
  return !s && typeof a == "string" && (a = ye.encode(a), l.set("Content-Length", a.byteLength.toString())), i?.component.endsWith(".md") && l.set("Content-Type", "text/html; charset=utf-8"), new Response(a, { ...o, headers: l });
}
function z(e4 = {}, t, { class: r } = {}) {
  let n = "";
  r && (typeof e4.class < "u" ? e4.class += ` ${r}` : typeof e4["class:list"] < "u" ? e4["class:list"] = [e4["class:list"], r] : e4.class = r);
  for (let [s, i] of Object.entries(e4))
    n += N(i, s, true);
  return S(n);
}
var Xc;
var we;
var St;
var _e;
var yr;
var Os;
var lt;
var wr;
var dt;
var At;
var Et;
var Cr;
var jt;
var kr;
var Rt;
var br;
var vr;
var Tt;
var $t;
var _r;
var Pt;
var It;
var Lt;
var Mr;
var Me;
var ie;
var Ct;
var Nr;
var be;
var Or;
var Ne;
var kt;
var _t;
var xr;
var Sr;
var m;
var Mt;
var ve;
var ae;
var Nt;
var oe;
var Ot;
var Oe;
var ge;
var B;
var S;
var Hr;
var Fr;
var k;
var Br;
var mt;
var ut;
var Xs;
var Ks;
var Zs;
var Ht;
var ri;
var ni;
var si;
var ii;
var ai;
var ne;
var oi;
var jr;
var li;
var ft;
var gt;
var ke;
var pi;
var Pr;
var ye;
var ui;
var Kr;
var yt;
var Zr;
var wt;
var zt;
var Si;
var Ir;
var Ri;
var Ti;
var Lr;
var V;
var vt;
var Vt;
var ce = _(() => {
  "use strict";
  me();
  te();
  re();
  Xc = Te(gr(), 1), we = { name: "ClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in current adapter.", message: (e4) => `\`Astro.clientAddress\` is not available in the \`${e4}\` adapter. File an issue with the adapter to add support.` }, St = { name: "StaticClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in static mode.", message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.", hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR." }, _e = { name: "NoMatchingStaticPathFound", title: "No static path found for requested path.", message: (e4) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e4}\`.`, hint: (e4) => `Possible dynamic routes being matched: ${e4.join(", ")}.` }, yr = { name: "OnlyResponseCanBeReturned", title: "Invalid type returned by Astro page.", message: (e4, t) => `Route \`${e4 || ""}\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`, hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information." }, Os = { name: "MissingMediaQueryDirective", title: "Missing value for `client:media` directive.", message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided' }, lt = { name: "NoMatchingRenderer", title: "No matching renderer found.", message: (e4, t, r, n) => `Unable to render \`${e4}\`.

${n > 0 ? `There ${r ? "are" : "is"} ${n} renderer${r ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${r ? "none were" : "it was not"} able to server-side render \`${e4}\`.` : `No valid renderer was found ${t ? `for the \`.${t}\` file extension.` : "for this file extension."}`}`, hint: (e4) => `Did you mean to enable the ${e4} integration?

See https://docs.astro.build/en/guides/framework-components/ for more information on how to install and configure integrations.` }, wr = { name: "NoClientEntrypoint", title: "No client entrypoint specified in renderer.", message: (e4, t, r) => `\`${e4}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${r}\`.`, hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer." }, dt = { name: "NoClientOnlyHint", title: "Missing hint on client:only directive.", message: (e4) => `Unable to render \`${e4}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`, hint: (e4) => `Did you mean to pass \`client:only="${e4}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only` }, At = { name: "InvalidGetStaticPathsEntry", title: "Invalid entry inside getStaticPath's return value", message: (e4) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${e4}\``, hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, Et = { name: "InvalidGetStaticPathsReturn", title: "Invalid value returned by getStaticPaths.", message: (e4) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e4}\``, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, Cr = { name: "GetStaticPathsExpectedParams", title: "Missing params property on `getStaticPaths` route.", message: "Missing or empty required `params` property on `getStaticPaths` route.", hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, jt = { name: "GetStaticPathsInvalidRouteParam", title: "Invalid value for `getStaticPaths` route parameter.", message: (e4, t, r) => `Invalid getStaticPaths route parameter for \`${e4}\`. Expected undefined, a string or a number, received \`${r}\` (\`${t}\`)`, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, kr = { name: "GetStaticPathsRequired", title: "`getStaticPaths()` function required for dynamic routes.", message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.", hint: 'See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` or `output: "hybrid"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.' }, Rt = { name: "ReservedSlotName", title: "Invalid slot name.", message: (e4) => `Unable to create a slot named \`${e4}\`. \`${e4}\` is a reserved slot name. Please update the name of this slot.` }, br = { name: "NoMatchingImport", title: "No import found for component.", message: (e4) => `Could not render \`${e4}\`. No matching import has been found for \`${e4}\`.`, hint: "Please make sure the component is properly imported." }, vr = { name: "InvalidComponentArgs", title: "Invalid component arguments.", message: (e4) => `Invalid arguments passed to${e4 ? ` <${e4}>` : ""} component.`, hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`." }, Tt = { name: "PageNumberParamNotFound", title: "Page number param not found.", message: (e4) => `[paginate()] page number param \`${e4}\` not found in your filepath.`, hint: "Rename your file to `[page].astro` or `[...page].astro`." }, $t = { name: "ImageMissingAlt", title: 'Image missing required "alt" property.', message: 'Image missing "alt" property. "alt" text is required to describe important images on the page.', hint: 'Use an empty string ("") for decorative images.' }, _r = { name: "InvalidImageService", title: "Error while loading image service.", message: "There was an error loading the configured image service. Please see the stack trace for more information." }, Pt = { name: "MissingImageDimension", title: "Missing image dimensions", message: (e4, t) => `Missing ${e4 === "both" ? "width and height attributes" : `${e4} attribute`} for ${t}. When using remote images, both dimensions are required unless in order to avoid CLS.`, hint: "If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets). You can also use `inferSize={true}` for remote images to get the original dimensions." }, It = { name: "FailedToFetchRemoteImageDimensions", title: "Failed to retrieve remote image dimensions", message: (e4) => `Failed to get the dimensions for ${e4}.`, hint: "Verify your remote image URL is accurate, and that you are not using `inferSize` with a file located in your `public/` folder." }, Lt = { name: "UnsupportedImageFormat", title: "Unsupported image format", message: (e4, t, r) => `Received unsupported format \`${e4}\` from \`${t}\`. Currently only ${r.join(", ")} are supported by our image services.`, hint: "Using an `img` tag directly instead of the `Image` component might be what you're looking for." }, Mr = { name: "UnsupportedImageConversion", title: "Unsupported image conversion", message: "Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported." }, Me = { name: "PrerenderDynamicEndpointPathCollide", title: "Prerendered dynamic endpoint has path collision.", message: (e4) => `Could not render \`${e4}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`, hint: (e4) => `Rename \`${e4}\` to \`${e4.replace(/\.(?:js|ts)/, (t) => ".json" + t)}\`` }, ie = { name: "ExpectedImage", title: "Expected src to be an image.", message: (e4, t, r) => `Expected \`src\` property for \`getImage\` or \`<Image />\` to be either an ESM imported image or a string with the path of a remote image. Received \`${e4}\` (type: \`${t}\`).

Full serialized options received: \`${r}\`.`, hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct. If you're passing an async function, make sure to call and await it." }, Ct = { name: "ExpectedImageOptions", title: "Expected image options.", message: (e4) => `Expected getImage() parameter to be an object. Received \`${e4}\`.` }, Nr = { name: "IncompatibleDescriptorOptions", title: "Cannot set both `densities` and `widths`", message: "Only one of `densities` or `widths` can be specified. In most cases, you'll probably want to use only `widths` if you require specific widths.", hint: "Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors." }, be = { name: "ResponseSentError", title: "Unable to set response.", message: "The response has already been sent to the browser and cannot be altered." }, Or = { name: "MiddlewareNoDataOrNextCalled", title: "The middleware didn't return a `Response`.", message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function." }, Ne = { name: "MiddlewareNotAResponse", title: "The middleware returned something that is not a `Response` object.", message: "Any data returned from middleware must be a valid `Response` object." }, kt = { name: "LocalsNotAnObject", title: "Value assigned to `locals` is not accepted.", message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.", hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`." }, _t = { name: "LocalImageUsedWrongly", title: "Local images must be imported.", message: (e4) => `\`Image\`'s and \`getImage\`'s \`src\` parameter must be an imported image or an URL, it cannot be a string filepath. Received \`${e4}\`.`, hint: "If you want to use an image from your `src` folder, you need to either import it or if the image is coming from a content collection, use the [image() schema helper](https://docs.astro.build/en/guides/images/#images-in-content-collections). See https://docs.astro.build/en/guides/images/#src-required for more information on the `src` property." }, xr = { name: "AstroGlobUsedOutside", title: "Astro.glob() used outside of an Astro file.", message: (e4) => `\`Astro.glob(${e4})\` can only be used in \`.astro\` files. \`import.meta.glob(${e4})\` can be used instead to achieve a similar result.`, hint: "See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import" }, Sr = { name: "AstroGlobNoMatch", title: "Astro.glob() did not match any files.", message: (e4) => `\`Astro.glob(${e4})\` did not return any matching files.`, hint: "Check the pattern for typos." };
  m = class extends Error {
    loc;
    title;
    hint;
    frame;
    type = "AstroError";
    constructor(t, r) {
      let { name: n, title: s, message: i, stack: a, location: o, hint: l, frame: d } = t;
      super(i, r), this.title = s, this.name = n, i && (this.message = i), this.stack = a || this.stack, this.loc = o, this.hint = l, this.frame = d;
    }
    setLocation(t) {
      this.loc = t;
    }
    setName(t) {
      this.name = t;
    }
    setMessage(t) {
      this.message = t;
    }
    setHint(t) {
      this.hint = t;
    }
    setFrame(t, r) {
      this.frame = Ds(t, r);
    }
    static is(t) {
      return t.type === "AstroError";
    }
  }, Mt = "4.4.8", ve = "X-Astro-Reroute", ae = "X-Astro-Route-Type", Nt = [404, 500], oe = Symbol.for("astro.clientAddress"), Ot = Symbol.for("astro.locals"), Oe = Symbol.for("astro.responseSent");
  ge = fr, B = class extends String {
    get [Symbol.toStringTag]() {
      return "HTMLString";
    }
  }, S = (e4) => e4 instanceof B ? e4 : typeof e4 == "string" ? new B(e4) : e4;
  Hr = "astro:jsx";
  Fr = Symbol.for("astro:render");
  k = { Value: 0, JSON: 1, RegExp: 2, Date: 3, Map: 4, Set: 5, BigInt: 6, URL: 7, Uint8Array: 8, Uint16Array: 9, Uint32Array: 10 };
  Br = Object.freeze(["data-astro-transition-scope", "data-astro-transition-persist"]);
  mt = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY", ut = mt.length;
  Xs = Symbol.for("astro.headAndContent");
  Ks = '(()=>{var v=Object.defineProperty;var A=(c,s,a)=>s in c?v(c,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):c[s]=a;var d=(c,s,a)=>(A(c,typeof s!="symbol"?s+"":s,a),a);var u;{let c={0:t=>m(t),1:t=>a(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(a(t)),5:t=>new Set(a(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},s=t=>{let[e,n]=t;return e in c?c[e](n):void 0},a=t=>t.map(s),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([e,n])=>[e,s(n)]));customElements.get("astro-island")||customElements.define("astro-island",(u=class extends HTMLElement{constructor(){super(...arguments);d(this,"Component");d(this,"hydrator");d(this,"hydrate",async()=>{var f;if(!this.hydrator||!this.isConnected)return;let e=(f=this.parentElement)==null?void 0:f.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let n=this.querySelectorAll("astro-slot"),r={},l=this.querySelectorAll("template[data-astro-template]");for(let o of l){let i=o.closest(this.tagName);i!=null&&i.isSameNode(this)&&(r[o.getAttribute("data-astro-template")||"default"]=o.innerHTML,o.remove())}for(let o of n){let i=o.closest(this.tagName);i!=null&&i.isSameNode(this)&&(r[o.getAttribute("name")||"default"]=o.innerHTML)}let h;try{h=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(o){let i=this.getAttribute("component-url")||"<unknown>",b=this.getAttribute("component-export");throw b&&(i+=` (export ${b})`),console.error(`[hydrate] Error parsing props for component ${i}`,this.getAttribute("props"),o),o}let p;await this.hydrator(this)(this.Component,h,r,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});d(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),n.disconnect(),this.childrenConnectedCallback()},n=new MutationObserver(()=>{var r;((r=this.lastChild)==null?void 0:r.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});n.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}async start(){let e=JSON.parse(this.getAttribute("opts")),n=this.getAttribute("client");if(Astro[n]===void 0){window.addEventListener(`astro:${n}`,()=>this.start(),{once:!0});return}try{await Astro[n](async()=>{let r=this.getAttribute("renderer-url"),[l,{default:h}]=await Promise.all([import(this.getAttribute("component-url")),r?import(r):()=>()=>{}]),p=this.getAttribute("component-export")||"default";if(!p.includes("."))this.Component=l[p];else{this.Component=l;for(let y of p.split("."))this.Component=this.Component[y]}return this.hydrator=h,this.hydrate},e,this)}catch(r){console.error(`[astro-island] Error hydrating ${this.getAttribute("component-url")}`,r)}}attributeChangedCallback(){this.hydrate()}},d(u,"observedAttributes",["props"]),u))}})();', Zs = "<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>";
  Ht = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i, ri = /^(?:allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i, ni = /^(?:contenteditable|draggable|spellcheck|value)$/i, si = /^(?:autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i, ii = /* @__PURE__ */ new Set(["set:html", "set:text"]), ai = (e4) => e4.trim().replace(/(?!^)\b\w|\s+|\W+/g, (t, r) => /\W/.test(t) ? "" : r === 0 ? t : t.toUpperCase()), ne = (e4, t = true) => t ? String(e4).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : e4, oi = (e4) => e4.toLowerCase() === e4 ? e4 : e4.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`), jr = (e4) => Object.entries(e4).filter(([t, r]) => typeof r == "string" && r.trim() || typeof r == "number").map(([t, r]) => t[0] !== "-" && t[1] !== "-" ? `${oi(t)}:${r}` : `${t}:${r}`).join(";");
  li = typeof process < "u" && Object.prototype.toString.call(process) === "[object process]";
  ft = (e4, t, r) => {
    let n = JSON.stringify(e4.props), s = e4.children;
    return t === r.findIndex((i) => JSON.stringify(i.props) === n && i.children == s);
  };
  gt = Symbol.for("astro:slot-string"), ke = class extends B {
    instructions;
    [gt];
    constructor(t, r) {
      super(t), this.instructions = r, this[gt] = true;
    }
  };
  pi = Symbol.for("astro:fragment"), Pr = Symbol.for("astro:renderer"), ye = new TextEncoder(), ui = new TextDecoder();
  Kr = Symbol.for("astro.componentInstance"), yt = class {
    [Kr] = true;
    result;
    props;
    slotValues;
    factory;
    returnValue;
    constructor(t, r, n, s) {
      this.result = t, this.props = r, this.factory = s, this.slotValues = {};
      for (let i in n) {
        let a = false, o = n[i](t);
        this.slotValues[i] = () => a ? n[i](t) : (a = true, o);
      }
    }
    async init(t) {
      return this.returnValue !== void 0 ? this.returnValue : (this.returnValue = this.factory(t, this.props, this.slotValues), this.returnValue);
    }
    async render(t) {
      this.returnValue === void 0 && await this.init(this.result);
      let r = this.returnValue;
      Ut(r) && (r = await r), Dt(r) ? await r.content.render(t) : await se(t, r);
    }
  };
  Zr = Symbol.for("astro.renderTemplateResult"), wt = class {
    [Zr] = true;
    htmlParts;
    expressions;
    error;
    constructor(t, r) {
      this.htmlParts = t, this.error = void 0, this.expressions = r.map((n) => Ut(n) ? Promise.resolve(n).catch((s) => {
        if (!this.error)
          throw this.error = s, s;
      }) : n);
    }
    async render(t) {
      let r = this.expressions.map((n) => qr((s) => {
        if (n || n === 0)
          return se(s, n);
      }));
      for (let n = 0; n < this.htmlParts.length; n++) {
        let s = this.htmlParts[n], i = r[n];
        t.write(S(s)), i && await i.renderToFinalDestination(t);
      }
    }
  };
  zt = /<!doctype html/i;
  Si = Symbol.for("astro.needsHeadRendering"), Ir = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
  Ri = /<\/?astro-slot\b[^>]*>/g, Ti = /<\/?astro-static-slot\b[^>]*>/g;
  Lr = "astro-client-only", V = class {
    constructor(t) {
      this.vnode = t, this.count = 0;
    }
    count;
    increment() {
      this.count++;
    }
    haveNoTried() {
      return this.count === 0;
    }
    isCompleted() {
      return this.count > 2;
    }
    static symbol = Symbol("astro:jsx:skip");
  }, Vt = 0;
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((e4, t) => (e4[t.charCodeAt(0)] = t, e4), []);
  "-0123456789_".split("").reduce((e4, t) => (e4[t.charCodeAt(0)] = t, e4), []);
});
var fn = de((cl, un) => {
  "use strict";
  function Fe() {
    this._types = /* @__PURE__ */ Object.create(null), this._extensions = /* @__PURE__ */ Object.create(null);
    for (let e4 = 0; e4 < arguments.length; e4++)
      this.define(arguments[e4]);
    this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
  }
  Fe.prototype.define = function(e4, t) {
    for (let r in e4) {
      let n = e4[r].map(function(s) {
        return s.toLowerCase();
      });
      r = r.toLowerCase();
      for (let s = 0; s < n.length; s++) {
        let i = n[s];
        if (i[0] !== "*") {
          if (!t && i in this._types)
            throw new Error('Attempt to change mapping for "' + i + '" extension from "' + this._types[i] + '" to "' + r + '". Pass `force=true` to allow this, otherwise remove "' + i + '" from the list of extensions for "' + r + '".');
          this._types[i] = r;
        }
      }
      if (t || !this._extensions[r]) {
        let s = n[0];
        this._extensions[r] = s[0] !== "*" ? s : s.substr(1);
      }
    }
  };
  Fe.prototype.getType = function(e4) {
    e4 = String(e4);
    let t = e4.replace(/^.*[/\\]/, "").toLowerCase(), r = t.replace(/^.*\./, "").toLowerCase(), n = t.length < e4.length;
    return (r.length < t.length - 1 || !n) && this._types[r] || null;
  };
  Fe.prototype.getExtension = function(e4) {
    return e4 = /^\s*([^;\s]*)/.test(e4) && RegExp.$1, e4 && this._extensions[e4.toLowerCase()] || null;
  };
  un.exports = Fe;
});
var hn = de((ll, mn) => {
  mn.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
});
var yn = de((dl, gn) => {
  "use strict";
  var Xi = fn();
  gn.exports = new Xi(hn());
});
var Sn = {};
pe(Sn, { D: () => ze, a: () => U, b: () => Gt, c: () => Ve, i: () => We, n: () => sa });
function U(e4) {
  return typeof e4 == "object";
}
function We(e4) {
  return typeof e4 == "string";
}
function Ki(e4, t) {
  return Qi(e4, t.protocol) && xn(e4, t.hostname, true) && Zi(e4, t.port) && ea(e4, t.pathname, true);
}
function Zi(e4, t) {
  return !t || t === e4.port;
}
function Qi(e4, t) {
  return !t || t === e4.protocol.slice(0, -1);
}
function xn(e4, t, r) {
  if (t) {
    if (!r || !t.startsWith("*"))
      return t === e4.hostname;
    if (t.startsWith("**.")) {
      let n = t.slice(2);
      return n !== e4.hostname && e4.hostname.endsWith(n);
    } else if (t.startsWith("*.")) {
      let n = t.slice(1);
      return e4.hostname.replace(n, "").split(".").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function ea(e4, t, r) {
  if (t) {
    if (!r || !t.endsWith("*"))
      return t === e4.pathname;
    if (t.endsWith("/**")) {
      let n = t.slice(0, -2);
      return n !== e4.pathname && e4.pathname.startsWith(n);
    } else if (t.endsWith("/*")) {
      let n = t.slice(0, -1);
      return e4.pathname.replace(n, "").split("/").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function Ve(e4, { domains: t = [], remotePatterns: r = [] }) {
  if (!ee(e4))
    return false;
  let n = new URL(e4);
  return t.some((s) => xn(n, s)) || r.some((s) => Ki(n, s));
}
function Gt(e4) {
  return e4 ? "transform" in e4 : false;
}
function vn(e4) {
  let t = e4.width, r = e4.height;
  if (U(e4.src)) {
    let n = e4.src.width / e4.src.height;
    r && !t ? t = Math.round(r * n) : t && !r ? r = Math.round(t / n) : !t && !r && (t = e4.src.width, r = e4.src.height);
  }
  return { targetWidth: t, targetHeight: r };
}
var wn;
var bn;
var ze;
var ta;
var ra;
var na;
var sa;
var qt = _(() => {
  "use strict";
  fe();
  ce();
  wn = ["jpeg", "jpg", "png", "tiff", "webp", "gif", "svg", "avif"], bn = "webp", ze = ["src", "width", "height", "format", "quality"];
  ta = { propertiesToHash: ze, validateOptions(e4) {
    if (!e4.src || typeof e4.src != "string" && typeof e4.src != "object")
      throw new m({ ...ie, message: ie.message(JSON.stringify(e4.src), typeof e4.src, JSON.stringify(e4, (t, r) => r === void 0 ? null : r)) });
    if (U(e4.src)) {
      if (!wn.includes(e4.src.format))
        throw new m({ ...Lt, message: Lt.message(e4.src.format, e4.src.src, wn) });
      if (e4.widths && e4.densities)
        throw new m(Nr);
      if (e4.src.format === "svg" && (e4.format = "svg"), e4.src.format === "svg" && e4.format !== "svg" || e4.src.format !== "svg" && e4.format === "svg")
        throw new m(Mr);
    } else {
      if (e4.src.startsWith("/@fs/") || !ee(e4.src) && !e4.src.startsWith("/"))
        throw new m({ ..._t, message: _t.message(e4.src) });
      let t;
      if (!e4.width && !e4.height ? t = "both" : !e4.width && e4.height ? t = "width" : e4.width && !e4.height && (t = "height"), t)
        throw new m({ ...Pt, message: Pt.message(t, e4.src) });
    }
    return e4.format || (e4.format = bn), e4.width && (e4.width = Math.round(e4.width)), e4.height && (e4.height = Math.round(e4.height)), e4;
  }, getHTMLAttributes(e4) {
    let { targetWidth: t, targetHeight: r } = vn(e4), { src: n, width: s, height: i, format: a, quality: o, densities: l, widths: d, formats: c, ...p } = e4;
    return { ...p, width: t, height: r, loading: p.loading ?? "lazy", decoding: p.decoding ?? "async" };
  }, getSrcSet(e4) {
    let t = [], { targetWidth: r } = vn(e4), { widths: n, densities: s } = e4, i = e4.format ?? bn, a = e4.width, o = 1 / 0;
    U(e4.src) && (a = e4.src.width, o = a);
    let { width: l, height: d, ...c } = e4, p = [];
    if (s) {
      let u = s.map((f) => typeof f == "number" ? f : parseFloat(f)), w = u.sort().map((f) => Math.round(r * f));
      p.push(...w.map((f, h) => ({ maxTargetWidth: Math.min(f, o), descriptor: `${u[h]}x` })));
    } else
      n && p.push(...n.map((u) => ({ maxTargetWidth: Math.min(u, o), descriptor: `${u}w` })));
    for (let { maxTargetWidth: u, descriptor: w } of p) {
      let f = { ...c };
      u !== a ? f.width = u : e4.width && e4.height && (f.width = e4.width, f.height = e4.height), t.push({ transform: f, descriptor: w, attributes: { type: `image/${i}` } });
    }
    return t;
  }, getURL(e4, t) {
    let r = new URLSearchParams();
    if (U(e4.src))
      r.append("href", e4.src.src);
    else if (Ve(e4.src, t))
      r.append("href", e4.src);
    else
      return e4.src;
    return Object.entries({ w: "width", h: "height", q: "quality", f: "format" }).forEach(([i, a]) => {
      e4[a] && r.append(i, e4[a].toString());
    }), `${D("/", "/_image")}?${r}`;
  }, parseURL(e4) {
    let t = e4.searchParams;
    return t.has("href") ? { src: t.get("href"), width: t.has("w") ? parseInt(t.get("w")) : void 0, height: t.has("h") ? parseInt(t.get("h")) : void 0, format: t.get("f"), quality: t.get("q") } : void 0;
  } };
  ra = { ...ta, propertiesToHash: ["src"], async transform(e4, t) {
    return { data: e4, format: t.format };
  } }, na = ra, sa = Object.freeze(Object.defineProperty({ __proto__: null, default: na }, Symbol.toStringTag, { value: "Module" }));
});
var Dn = {};
pe(Dn, { GET: () => jo });
function M(e4, t, r, n) {
  r = r || 0;
  let s = n ? "BE" : "LE", i = "readUInt" + t + s;
  return oa[i](e4, r);
}
function ca(e4, t) {
  if (e4.length - t < 4)
    return;
  let r = $(e4, t);
  if (!(e4.length - t < r))
    return { name: E(e4, 4 + t, 8 + t), offset: t, size: r };
}
function K(e4, t, r) {
  for (; r < e4.length; ) {
    let n = ca(e4, r);
    if (!n)
      break;
    if (n.name === t)
      return n;
    r += n.size;
  }
}
function jn(e4, t) {
  let r = e4[t];
  return r === 0 ? 256 : r;
}
function Rn(e4, t) {
  let r = pa + t * ua;
  return { height: jn(e4, r + 1), width: jn(e4, r) };
}
function wa(e4, t, r) {
  let n = {};
  for (let s = t; s <= r; s += 4) {
    let i = E(e4, s, s + 4);
    i in Mn && (n[i] = 1);
  }
  if ("avif" in n)
    return "avif";
  if ("heic" in n || "heix" in n || "hevc" in n || "hevx" in n)
    return "heic";
  if ("mif1" in n || "msf1" in n)
    return "heif";
}
function Tn(e4, t) {
  let r = t + Sa;
  return [E(e4, t, r), $(e4, r)];
}
function $n(e4) {
  let t = Aa[e4];
  return { width: t, height: t, type: e4 };
}
function ka(e4) {
  return le(e4, 2, 6) === Ta;
}
function _a(e4, t) {
  return { height: qe(e4, t), width: qe(e4, t + 2) };
}
function Ma(e4, t) {
  let n = Yt + 8, s = M(e4, 16, n, t);
  for (let i = 0; i < s; i++) {
    let a = n + Ca + i * Pn, o = a + Pn;
    if (a > e4.length)
      return;
    let l = e4.slice(a, o);
    if (M(l, 16, 0, t) === 274)
      return M(l, 16, 2, t) !== 3 || M(l, 32, 4, t) !== 1 ? void 0 : M(l, 16, 8, t);
  }
}
function Na(e4, t) {
  let r = e4.slice($a, t), n = le(r, Yt, Yt + Pa), s = n === Ia;
  if (s || n === La)
    return Ma(r, s);
}
function Oa(e4, t) {
  if (t > e4.length)
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
}
function Je(e4) {
  let t = Ba.exec(e4);
  if (t)
    return Math.round(Number(t[1]) * (On[t[2]] || 1));
}
function Ga(e4) {
  let t = e4.split(" ");
  return { height: Je(t[3]), width: Je(t[2]) };
}
function qa(e4) {
  let t = e4.match(Be.width), r = e4.match(Be.height), n = e4.match(Be.viewbox);
  return { height: r && Je(r[2]), viewbox: n && Ga(n[2]), width: t && Je(t[2]) };
}
function Ja(e4) {
  return { height: e4.height, width: e4.width };
}
function Ya(e4, t) {
  let r = t.width / t.height;
  return e4.width ? { height: Math.floor(e4.width / r), width: e4.width } : e4.height ? { height: e4.height, width: Math.floor(e4.height * r) } : { height: t.height, width: t.width };
}
function Za(e4, t) {
  let r = M(e4, 32, 4, t);
  return e4.slice(r + 2);
}
function Qa(e4, t) {
  let r = M(e4, 16, 8, t);
  return (M(e4, 16, 10, t) << 16) + r;
}
function eo(e4) {
  if (e4.length > 24)
    return e4.slice(12);
}
function to(e4, t) {
  let r = {}, n = e4;
  for (; n && n.length; ) {
    let s = M(n, 16, 0, t), i = M(n, 16, 2, t), a = M(n, 32, 4, t);
    if (s === 0)
      break;
    a === 1 && (i === 3 || i === 4) && (r[s] = Qa(n, t)), n = eo(n);
  }
  return r;
}
function ro(e4) {
  let t = E(e4, 0, 2);
  if (t === "II")
    return "LE";
  if (t === "MM")
    return "BE";
}
function io(e4) {
  return { height: 1 + En(e4, 7), width: 1 + En(e4, 4) };
}
function ao(e4) {
  return { height: 1 + ((e4[4] & 15) << 10 | e4[3] << 2 | (e4[2] & 192) >> 6), width: 1 + ((e4[2] & 63) << 8 | e4[1]) };
}
function oo(e4) {
  return { height: An(e4, 8) & 16383, width: An(e4, 6) & 16383 };
}
function uo(e4) {
  let t = e4[0], r = po.get(t);
  return r && Ye.get(r).validate(e4) ? r : lo.find((n) => Ye.get(n).validate(e4));
}
function mo(e4) {
  let t = uo(e4);
  if (typeof t < "u") {
    if (fo.disabledTypes.indexOf(t) > -1)
      throw new TypeError("disabled file type: " + t);
    let r = Ye.get(t).calculate(e4);
    if (r !== void 0)
      return r.type = r.type ?? t, r;
  }
  throw new TypeError("unsupported file type: " + t);
}
async function ho(e4) {
  let t = await fetch(e4);
  if (!t.body || !t.ok)
    throw new Error("Failed to fetch image");
  let r = t.body.getReader(), n, s, i = new Uint8Array();
  for (; !n; ) {
    let a = await r.read();
    if (n = a.done, n)
      break;
    if (a.value) {
      s = a.value;
      let o = new Uint8Array(i.length + s.length);
      o.set(i, 0), o.set(s, i.length), i = o;
      try {
        let l = mo(i);
        if (l)
          return await r.cancel(), l;
      } catch {
      }
    }
  }
  throw new Error("Failed to parse the size");
}
async function Un() {
  if (!globalThis?.astroAsset?.imageService) {
    let { default: e4 } = await Promise.resolve().then(() => (qt(), Sn)).then((t) => t.n).catch((t) => {
      let r = new m(_r);
      throw r.cause = t, r;
    });
    return globalThis.astroAsset || (globalThis.astroAsset = {}), globalThis.astroAsset.imageService = e4, e4;
  }
  return globalThis.astroAsset.imageService;
}
async function go(e4, t) {
  if (!e4 || typeof e4 != "object")
    throw new m({ ...Ct, message: Ct.message(JSON.stringify(e4)) });
  if (typeof e4.src > "u")
    throw new m({ ...ie, message: ie.message(e4.src, "undefined", JSON.stringify(e4)) });
  let r = await Un(), n = { ...e4, src: typeof e4.src == "object" && "then" in e4.src ? (await e4.src).default ?? await e4.src : e4.src };
  if (e4.inferSize && We(n.src))
    try {
      let c = await ho(n.src);
      n.width ??= c.width, n.height ??= c.height, delete n.inferSize;
    } catch {
      throw new m({ ...It, message: It.message(n.src) });
    }
  let s = U(n.src) ? n.src.fsPath : n.src, i = U(n.src) ? n.src.clone ?? n.src : n.src;
  n.src = i;
  let a = r.validateOptions ? await r.validateOptions(n, t) : n, o = r.getSrcSet ? await r.getSrcSet(a, t) : [], l = await r.getURL(a, t), d = await Promise.all(o.map(async (c) => ({ transform: c.transform, url: await r.getURL(c.transform, t), descriptor: c.descriptor, attributes: c.attributes })));
  if (Gt(r) && globalThis.astroAsset.addStaticImage && !(We(a.src) && l === a.src)) {
    let c = r.propertiesToHash ?? ze;
    l = globalThis.astroAsset.addStaticImage(a, c, s), d = o.map((p) => ({ transform: p.transform, url: globalThis.astroAsset.addStaticImage(p.transform, c, s), descriptor: p.descriptor, attributes: p.attributes }));
  }
  return { rawOptions: n, options: a, src: l, srcSet: { values: d, attribute: d.map((c) => `${c.url} ${c.descriptor}`).join(", ") }, attributes: r.getHTMLAttributes !== void 0 ? await r.getHTMLAttributes(a, t) : {} };
}
async function Eo(e4) {
  try {
    let t = await fetch(e4);
    return t.ok ? await t.arrayBuffer() : void 0;
  } catch {
    return;
  }
}
var kn;
var ia;
var E;
var le;
var An;
var qe;
var C;
var En;
var aa;
var $;
var Z;
var oa;
var la;
var da;
var pa;
var ua;
var _n;
var fa;
var ma;
var ha;
var ga;
var ya;
var Mn;
var ba;
var va;
var xa;
var Sa;
var Aa;
var Ea;
var ja;
var Ra;
var Ta;
var $a;
var Yt;
var Pa;
var Ia;
var La;
var Pn;
var Ca;
var Ua;
var Da;
var Ha;
var Fa;
var In;
var za;
var Ln;
var Cn;
var Wa;
var Va;
var Nn;
var Be;
var Jt;
var On;
var Ba;
var Xa;
var Ka;
var no;
var so;
var co;
var Ye;
var lo;
var po;
var fo;
var yo;
var wo;
var bo;
var vo;
var xo;
var So;
var Ge;
var Ao;
var Xt;
var jo;
var Hn = _(() => {
  "use strict";
  fe();
  kn = Te(yn(), 1);
  ce();
  qt();
  te();
  re();
  ia = new TextDecoder(), E = (e4, t = 0, r = e4.length) => ia.decode(e4.slice(t, r)), le = (e4, t = 0, r = e4.length) => e4.slice(t, r).reduce((n, s) => n + ("0" + s.toString(16)).slice(-2), ""), An = (e4, t = 0) => {
    let r = e4[t] + e4[t + 1] * 256;
    return r | (r & 2 ** 15) * 131070;
  }, qe = (e4, t = 0) => e4[t] * 2 ** 8 + e4[t + 1], C = (e4, t = 0) => e4[t] + e4[t + 1] * 2 ** 8, En = (e4, t = 0) => e4[t] + e4[t + 1] * 2 ** 8 + e4[t + 2] * 2 ** 16, aa = (e4, t = 0) => e4[t] + e4[t + 1] * 2 ** 8 + e4[t + 2] * 2 ** 16 + (e4[t + 3] << 24), $ = (e4, t = 0) => e4[t] * 2 ** 24 + e4[t + 1] * 2 ** 16 + e4[t + 2] * 2 ** 8 + e4[t + 3], Z = (e4, t = 0) => e4[t] + e4[t + 1] * 2 ** 8 + e4[t + 2] * 2 ** 16 + e4[t + 3] * 2 ** 24, oa = { readUInt16BE: qe, readUInt16LE: C, readUInt32BE: $, readUInt32LE: Z };
  la = { validate: (e4) => E(e4, 0, 2) === "BM", calculate: (e4) => ({ height: Math.abs(aa(e4, 22)), width: Z(e4, 18) }) }, da = 1, pa = 6, ua = 16;
  _n = { validate(e4) {
    let t = C(e4, 0), r = C(e4, 4);
    return t !== 0 || r === 0 ? false : C(e4, 2) === da;
  }, calculate(e4) {
    let t = C(e4, 4), r = Rn(e4, 0);
    if (t === 1)
      return r;
    let n = [r];
    for (let s = 1; s < t; s += 1)
      n.push(Rn(e4, s));
    return { height: r.height, images: n, width: r.width };
  } }, fa = 2, ma = { validate(e4) {
    let t = C(e4, 0), r = C(e4, 4);
    return t !== 0 || r === 0 ? false : C(e4, 2) === fa;
  }, calculate: (e4) => _n.calculate(e4) }, ha = { validate: (e4) => Z(e4, 0) === 542327876, calculate: (e4) => ({ height: Z(e4, 12), width: Z(e4, 16) }) }, ga = /^GIF8[79]a/, ya = { validate: (e4) => ga.test(E(e4, 0, 6)), calculate: (e4) => ({ height: C(e4, 8), width: C(e4, 6) }) }, Mn = { avif: "avif", mif1: "heif", msf1: "heif", heic: "heic", heix: "heic", hevc: "heic", hevx: "heic" };
  ba = { validate(e4) {
    let t = E(e4, 4, 8), r = E(e4, 8, 12);
    return t === "ftyp" && r in Mn;
  }, calculate(e4) {
    let t = K(e4, "meta", 0), r = t && K(e4, "iprp", t.offset + 12), n = r && K(e4, "ipco", r.offset + 8), s = n && K(e4, "ispe", n.offset + 8);
    if (s)
      return { height: $(e4, s.offset + 16), width: $(e4, s.offset + 12), type: wa(e4, 8, t.offset) };
    throw new TypeError("Invalid HEIF, no size found");
  } }, va = 8, xa = 4, Sa = 4, Aa = { ICON: 32, "ICN#": 32, "icm#": 16, icm4: 16, icm8: 16, "ics#": 16, ics4: 16, ics8: 16, is32: 16, s8mk: 16, icp4: 16, icl4: 32, icl8: 32, il32: 32, l8mk: 32, icp5: 32, ic11: 32, ich4: 48, ich8: 48, ih32: 48, h8mk: 48, icp6: 64, ic12: 32, it32: 128, t8mk: 128, ic07: 128, ic08: 256, ic13: 256, ic09: 512, ic14: 512, ic10: 1024 };
  Ea = { validate: (e4) => E(e4, 0, 4) === "icns", calculate(e4) {
    let t = e4.length, r = $(e4, xa), n = va, s = Tn(e4, n), i = $n(s[0]);
    if (n += s[1], n === r)
      return i;
    let a = { height: i.height, images: [i], width: i.width };
    for (; n < r && n < t; )
      s = Tn(e4, n), i = $n(s[0]), n += s[1], a.images.push(i);
    return a;
  } }, ja = { validate: (e4) => le(e4, 0, 4) === "ff4fff51", calculate: (e4) => ({ height: $(e4, 12), width: $(e4, 8) }) }, Ra = { validate(e4) {
    if ($(e4, 4) !== 1783636e3 || $(e4, 0) < 1)
      return false;
    let t = K(e4, "ftyp", 0);
    return t ? $(e4, t.offset + 4) === 1718909296 : false;
  }, calculate(e4) {
    let t = K(e4, "jp2h", 0), r = t && K(e4, "ihdr", t.offset + 8);
    if (r)
      return { height: $(e4, r.offset + 8), width: $(e4, r.offset + 12) };
    throw new TypeError("Unsupported JPEG 2000 format");
  } }, Ta = "45786966", $a = 2, Yt = 6, Pa = 2, Ia = "4d4d", La = "4949", Pn = 12, Ca = 2;
  Ua = { validate: (e4) => le(e4, 0, 2) === "ffd8", calculate(e4) {
    e4 = e4.slice(4);
    let t, r;
    for (; e4.length; ) {
      let n = qe(e4, 0);
      if (e4[n] !== 255) {
        e4 = e4.slice(1);
        continue;
      }
      if (ka(e4) && (t = Na(e4, n)), Oa(e4, n), r = e4[n + 1], r === 192 || r === 193 || r === 194) {
        let s = _a(e4, n + 5);
        return t ? { height: s.height, orientation: t, width: s.width } : s;
      }
      e4 = e4.slice(n + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  } }, Da = { validate: (e4) => {
    let t = E(e4, 1, 7);
    return ["KTX 11", "KTX 20"].includes(t);
  }, calculate: (e4) => {
    let t = e4[5] === 49 ? "ktx" : "ktx2", r = t === "ktx" ? 36 : 20;
    return { height: Z(e4, r + 4), width: Z(e4, r), type: t };
  } }, Ha = `PNG\r

`, Fa = "IHDR", In = "CgBI", za = { validate(e4) {
    if (Ha === E(e4, 1, 8)) {
      let t = E(e4, 12, 16);
      if (t === In && (t = E(e4, 28, 32)), t !== Fa)
        throw new TypeError("Invalid PNG");
      return true;
    }
    return false;
  }, calculate(e4) {
    return E(e4, 12, 16) === In ? { height: $(e4, 36), width: $(e4, 32) } : { height: $(e4, 20), width: $(e4, 16) };
  } }, Ln = { P1: "pbm/ascii", P2: "pgm/ascii", P3: "ppm/ascii", P4: "pbm", P5: "pgm", P6: "ppm", P7: "pam", PF: "pfm" }, Cn = { default: (e4) => {
    let t = [];
    for (; e4.length > 0; ) {
      let r = e4.shift();
      if (r[0] !== "#") {
        t = r.split(" ");
        break;
      }
    }
    if (t.length === 2)
      return { height: parseInt(t[1], 10), width: parseInt(t[0], 10) };
    throw new TypeError("Invalid PNM");
  }, pam: (e4) => {
    let t = {};
    for (; e4.length > 0; ) {
      let r = e4.shift();
      if (r.length > 16 || r.charCodeAt(0) > 128)
        continue;
      let [n, s] = r.split(" ");
      if (n && s && (t[n.toLowerCase()] = parseInt(s, 10)), t.height && t.width)
        break;
    }
    if (t.height && t.width)
      return { height: t.height, width: t.width };
    throw new TypeError("Invalid PAM");
  } }, Wa = { validate: (e4) => E(e4, 0, 2) in Ln, calculate(e4) {
    let t = E(e4, 0, 2), r = Ln[t], n = E(e4, 3).split(/[\r\n]+/);
    return (Cn[r] || Cn.default)(n);
  } }, Va = { validate: (e4) => E(e4, 0, 4) === "8BPS", calculate: (e4) => ({ height: $(e4, 14), width: $(e4, 18) }) }, Nn = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/, Be = { height: /\sheight=(['"])([^%]+?)\1/, root: Nn, viewbox: /\sviewBox=(['"])(.+?)\1/i, width: /\swidth=(['"])([^%]+?)\1/ }, Jt = 2.54, On = { in: 96, cm: 96 / Jt, em: 16, ex: 8, m: 96 / Jt * 100, mm: 96 / Jt / 10, pc: 96 / 72 / 12, pt: 96 / 72, px: 1 }, Ba = new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(On).join("|")})?$`);
  Xa = { validate: (e4) => Nn.test(E(e4, 0, 1e3)), calculate(e4) {
    let t = E(e4).match(Be.root);
    if (t) {
      let r = qa(t[0]);
      if (r.width && r.height)
        return Ja(r);
      if (r.viewbox)
        return Ya(r, r.viewbox);
    }
    throw new TypeError("Invalid SVG");
  } }, Ka = { validate(e4) {
    return C(e4, 0) === 0 && C(e4, 4) === 0;
  }, calculate(e4) {
    return { height: C(e4, 14), width: C(e4, 12) };
  } };
  no = ["49492a00", "4d4d002a"], so = { validate: (e4) => no.includes(le(e4, 0, 4)), calculate(e4) {
    let t = ro(e4) === "BE", r = Za(e4, t), n = to(r, t), s = n[256], i = n[257];
    if (!s || !i)
      throw new TypeError("Invalid Tiff. Missing tags");
    return { height: i, width: s };
  } };
  co = { validate(e4) {
    let t = E(e4, 0, 4) === "RIFF", r = E(e4, 8, 12) === "WEBP", n = E(e4, 12, 15) === "VP8";
    return t && r && n;
  }, calculate(e4) {
    let t = E(e4, 12, 16);
    if (e4 = e4.slice(20, 30), t === "VP8X") {
      let n = e4[0], s = (n & 192) === 0, i = (n & 1) === 0;
      if (s && i)
        return io(e4);
      throw new TypeError("Invalid WebP");
    }
    if (t === "VP8 " && e4[0] !== 47)
      return oo(e4);
    let r = le(e4, 3, 6);
    if (t === "VP8L" && r !== "9d012a")
      return ao(e4);
    throw new TypeError("Invalid WebP");
  } }, Ye = /* @__PURE__ */ new Map([["bmp", la], ["cur", ma], ["dds", ha], ["gif", ya], ["heif", ba], ["icns", Ea], ["ico", _n], ["j2c", ja], ["jp2", Ra], ["jpg", Ua], ["ktx", Da], ["png", za], ["pnm", Wa], ["psd", Va], ["svg", Xa], ["tga", Ka], ["tiff", so], ["webp", co]]), lo = Array.from(Ye.keys()), po = /* @__PURE__ */ new Map([[56, "psd"], [66, "bmp"], [68, "dds"], [71, "gif"], [73, "tiff"], [77, "tiff"], [82, "webp"], [105, "icns"], [137, "png"], [255, "jpg"]]);
  fo = { disabledTypes: [] };
  yo = (e4) => {
    let t = e4.length, r = 0, n = 0, s = 8997, i = 0, a = 33826, o = 0, l = 40164, d = 0, c = 52210;
    for (; r < t; )
      s ^= e4.charCodeAt(r++), n = s * 435, i = a * 435, o = l * 435, d = c * 435, o += s << 8, d += a << 8, i += n >>> 16, s = n & 65535, o += i >>> 16, a = i & 65535, c = d + (o >>> 16) & 65535, l = o & 65535;
    return (c & 15) * 281474976710656 + l * 4294967296 + a * 65536 + (s ^ c >> 4);
  }, wo = (e4, t = false) => (t ? 'W/"' : '"') + yo(e4).toString(36) + e4.length.toString(36) + '"', bo = q(), vo = G(async (e4, t, r) => {
    let n = e4.createAstro(bo, t, r);
    n.self = vo;
    let s = n.props;
    if (s.alt === void 0 || s.alt === null)
      throw new m($t);
    typeof s.width == "string" && (s.width = parseInt(s.width)), typeof s.height == "string" && (s.height = parseInt(s.height));
    let i = await Xt(s), a = {};
    return i.srcSet.values.length > 0 && (a.srcset = i.srcSet.attribute), O`${J()}<img${N(i.src, "src")}${z(a)}${z(i.attributes)}>`;
  }, "C:/Users/P360R/Documents/GitHub/sekai-pages/node_modules/astro/components/Image.astro", void 0), xo = q(), So = G(async (e4, t, r) => {
    let n = e4.createAstro(xo, t, r);
    n.self = So;
    let s = ["webp"], i = "png", a = ["gif", "svg", "jpg", "jpeg"], { formats: o = s, pictureAttributes: l = {}, fallbackFormat: d, ...c } = n.props;
    if (c.alt === void 0 || c.alt === null)
      throw new m($t);
    let p = await Promise.all(o.map(async (v) => await Xt({ ...c, format: v, widths: c.widths, densities: c.densities }))), u = d ?? i;
    !d && U(c.src) && a.includes(c.src.format) && (u = c.src.format);
    let w = await Xt({ ...c, format: u, widths: c.widths, densities: c.densities }), f = {}, h = {};
    return c.sizes && (h.sizes = c.sizes), w.srcSet.values.length > 0 && (f.srcset = w.srcSet.attribute), O`${J()}<picture${z(l)}> ${Object.entries(p).map(([v, b]) => {
      let g = c.densities || !c.densities && !c.widths ? `${b.src}${b.srcSet.values.length > 0 ? ", " + b.srcSet.attribute : ""}` : b.srcSet.attribute;
      return O`<source${N(g, "srcset")}${N("image/" + b.options.format, "type")}${z(h)}>`;
    })} <img${N(w.src, "src")}${z(f)}${z(w.attributes)}> </picture>`;
  }, "C:/Users/P360R/Documents/GitHub/sekai-pages/node_modules/astro/components/Picture.astro", void 0), Ge = { service: { entrypoint: "astro/assets/services/noop", config: {} }, domains: [], remotePatterns: [] }, Ao = new URL("file:///C:/Users/P360R/Documents/GitHub/sekai-pages/dist/");
  new URL("_astro", Ao);
  Xt = async (e4) => await go(e4, Ge);
  jo = async ({ request: e4 }) => {
    try {
      let t = await Un();
      if (!("transform" in t))
        throw new Error("Configured image service is not a local service");
      let r = new URL(e4.url), n = await t.parseURL(r, Ge);
      if (!n?.src)
        throw new Error("Incorrect transform returned by `parseURL`");
      let s, i = ee(n.src) ? new URL(n.src) : new URL(n.src, r.origin);
      if (ee(n.src) && Ve(n.src, Ge) === false)
        return new Response("Forbidden", { status: 403 });
      if (s = await Eo(i), !s)
        return new Response("Not Found", { status: 404 });
      let { data: a, format: o } = await t.transform(new Uint8Array(s), n, Ge);
      return new Response(a, { status: 200, headers: { "Content-Type": kn.default.getType(o) ?? `image/${o}`, "Cache-Control": "public, max-age=31536000", ETag: wo(a.toString()), Date: (/* @__PURE__ */ new Date()).toUTCString() } });
    } catch (t) {
      return console.error("Could not process image request:", t), new Response(`Server Error: ${t}`, { status: 500 });
    }
  };
});
var Fn = {};
pe(Fn, { page: () => Ro, renderers: () => Q });
var Ro;
var zn = _(() => {
  "use strict";
  $e();
  Ro = () => Promise.resolve().then(() => (Hn(), Dn));
});
var Bn = {};
pe(Bn, { default: () => Vn, file: () => Io, url: () => Lo });
var To;
var Wn;
var $o;
var Ae;
var Po;
var Vn;
var Io;
var Lo;
var Gn = _(() => {
  "use strict";
  ce();
  me();
  te();
  re();
  To = q(), Wn = G(async (e4, t, r) => {
    let n = e4.createAstro(To, t, r);
    n.self = Wn;
    let { title: s } = n.props;
    return O`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${N(n.generator, "content")}><title>${s}</title>${Jr()}</head> <body> ${Ue(e4, r.default)} </body></html>`;
  }, "C:/Users/P360R/Documents/GitHub/sekai-pages/src/layouts/Layout.astro", void 0), $o = q(), Ae = G(async (e4, t, r) => {
    let n = e4.createAstro($o, t, r);
    n.self = Ae;
    let { href: s, title: i, body: a } = n.props;
    return O`${J()}<li class="link-card" data-astro-cid-dohjnao5> <a${N(s, "href")} data-astro-cid-dohjnao5> <h2 data-astro-cid-dohjnao5> ${i} <span data-astro-cid-dohjnao5>&rarr;</span> </h2> <p data-astro-cid-dohjnao5> ${a} </p> </a> </li> `;
  }, "C:/Users/P360R/Documents/GitHub/sekai-pages/src/components/Card.astro", void 0), Po = q(), Vn = G(async (e4, t, r) => {
    let n = e4.createAstro(Po, t, r);
    return n.self = Vn, O`${X(e4, "Layout", Wn, { title: "Sekai make your life better.", "data-astro-cid-j7pv25f6": true }, { default: (s) => O` ${J()}<main data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6><span class="text-gradient" data-astro-cid-j7pv25f6>Sekai</span> - Make your life better</h1> <!-- 
		<p class="instructions">
			To get started, open the directory <code>src/pages</code> in your project.<br />
			<strong>Code Challenge:</strong> Tweak the "Welcome to Astro" message above.
		</p>
		--> <ul role="list" class="link-card-grid" data-astro-cid-j7pv25f6> ${X(s, "Card", Ae, { href: "https://docs.astro.build/", title: "Documentation", body: "Learn how Astro works and explore the official API docs.", "data-astro-cid-j7pv25f6": true })} ${X(s, "Card", Ae, { href: "https://astro.build/integrations/", title: "Integrations", body: "Supercharge your project with new frameworks and libraries.", "data-astro-cid-j7pv25f6": true })} ${X(s, "Card", Ae, { href: "https://astro.build/themes/", title: "Themes", body: "Explore a galaxy of community-built starter themes.", "data-astro-cid-j7pv25f6": true })} ${X(s, "Card", Ae, { href: "https://astro.build/chat/", title: "Community", body: "Come say hi to our amazing Discord community. \u2764\uFE0F", "data-astro-cid-j7pv25f6": true })} </ul> </main> ` })} `;
  }, "C:/Users/P360R/Documents/GitHub/sekai-pages/src/pages/index.astro", void 0), Io = "C:/Users/P360R/Documents/GitHub/sekai-pages/src/pages/index.astro", Lo = "";
});
var qn = {};
pe(qn, { page: () => Co, renderers: () => Q });
var Co;
var Jn = _(() => {
  "use strict";
  $e();
  Co = () => Promise.resolve().then(() => (Gn(), Bn));
});
$e();
fe();
var el = Te(st(), 1);
me();
te();
re();
ce();
function Fi(e4) {
  for (var t = [], r = 0; r < e4.length; ) {
    var n = e4[r];
    if (n === "*" || n === "+" || n === "?") {
      t.push({ type: "MODIFIER", index: r, value: e4[r++] });
      continue;
    }
    if (n === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: r++, value: e4[r++] });
      continue;
    }
    if (n === "{") {
      t.push({ type: "OPEN", index: r, value: e4[r++] });
      continue;
    }
    if (n === "}") {
      t.push({ type: "CLOSE", index: r, value: e4[r++] });
      continue;
    }
    if (n === ":") {
      for (var s = "", i = r + 1; i < e4.length; ) {
        var a = e4.charCodeAt(i);
        if (a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a === 95) {
          s += e4[i++];
          continue;
        }
        break;
      }
      if (!s)
        throw new TypeError("Missing parameter name at ".concat(r));
      t.push({ type: "NAME", index: r, value: s }), r = i;
      continue;
    }
    if (n === "(") {
      var o = 1, l = "", i = r + 1;
      if (e4[i] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(i));
      for (; i < e4.length; ) {
        if (e4[i] === "\\") {
          l += e4[i++] + e4[i++];
          continue;
        }
        if (e4[i] === ")") {
          if (o--, o === 0) {
            i++;
            break;
          }
        } else if (e4[i] === "(" && (o++, e4[i + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(i));
        l += e4[i++];
      }
      if (o)
        throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!l)
        throw new TypeError("Missing pattern at ".concat(r));
      t.push({ type: "PATTERN", index: r, value: l }), r = i;
      continue;
    }
    t.push({ type: "CHAR", index: r, value: e4[r++] });
  }
  return t.push({ type: "END", index: r, value: "" }), t;
}
function zi(e4, t) {
  t === void 0 && (t = {});
  for (var r = Fi(e4), n = t.prefixes, s = n === void 0 ? "./" : n, i = "[^".concat(Vi(t.delimiter || "/#?"), "]+?"), a = [], o = 0, l = 0, d = "", c = function(L) {
    if (l < r.length && r[l].type === L)
      return r[l++].value;
  }, p = function(L) {
    var y = c(L);
    if (y !== void 0)
      return y;
    var x = r[l], R = x.type, W = x.index;
    throw new TypeError("Unexpected ".concat(R, " at ").concat(W, ", expected ").concat(L));
  }, u = function() {
    for (var L = "", y; y = c("CHAR") || c("ESCAPED_CHAR"); )
      L += y;
    return L;
  }; l < r.length; ) {
    var w = c("CHAR"), f = c("NAME"), h = c("PATTERN");
    if (f || h) {
      var v = w || "";
      s.indexOf(v) === -1 && (d += v, v = ""), d && (a.push(d), d = ""), a.push({ name: f || o++, prefix: v, suffix: "", pattern: h || i, modifier: c("MODIFIER") || "" });
      continue;
    }
    var b = w || c("ESCAPED_CHAR");
    if (b) {
      d += b;
      continue;
    }
    d && (a.push(d), d = "");
    var g = c("OPEN");
    if (g) {
      var v = u(), T = c("NAME") || "", j = c("PATTERN") || "", P = u();
      p("CLOSE"), a.push({ name: T || (j ? o++ : ""), pattern: T && !j ? i : j, prefix: v, suffix: P, modifier: c("MODIFIER") || "" });
      continue;
    }
    p("END");
  }
  return a;
}
function nn(e4, t) {
  return Wi(zi(e4, t), t);
}
function Wi(e4, t) {
  t === void 0 && (t = {});
  var r = Bi(t), n = t.encode, s = n === void 0 ? function(l) {
    return l;
  } : n, i = t.validate, a = i === void 0 ? true : i, o = e4.map(function(l) {
    if (typeof l == "object")
      return new RegExp("^(?:".concat(l.pattern, ")$"), r);
  });
  return function(l) {
    for (var d = "", c = 0; c < e4.length; c++) {
      var p = e4[c];
      if (typeof p == "string") {
        d += p;
        continue;
      }
      var u = l ? l[p.name] : void 0, w = p.modifier === "?" || p.modifier === "*", f = p.modifier === "*" || p.modifier === "+";
      if (Array.isArray(u)) {
        if (!f)
          throw new TypeError('Expected "'.concat(p.name, '" to not repeat, but got an array'));
        if (u.length === 0) {
          if (w)
            continue;
          throw new TypeError('Expected "'.concat(p.name, '" to not be empty'));
        }
        for (var h = 0; h < u.length; h++) {
          var v = s(u[h], p);
          if (a && !o[c].test(v))
            throw new TypeError('Expected all "'.concat(p.name, '" to match "').concat(p.pattern, '", but got "').concat(v, '"'));
          d += p.prefix + v + p.suffix;
        }
        continue;
      }
      if (typeof u == "string" || typeof u == "number") {
        var v = s(String(u), p);
        if (a && !o[c].test(v))
          throw new TypeError('Expected "'.concat(p.name, '" to match "').concat(p.pattern, '", but got "').concat(v, '"'));
        d += p.prefix + v + p.suffix;
        continue;
      }
      if (!w) {
        var b = f ? "an array" : "a string";
        throw new TypeError('Expected "'.concat(p.name, '" to be ').concat(b));
      }
    }
    return d;
  };
}
function Vi(e4) {
  return e4.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Bi(e4) {
  return e4 && e4.sensitive ? "" : "i";
}
var Gi = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
var xe = { debug: 20, info: 30, warn: 40, error: 50, silent: 90 };
function Bt(e4, t, r, n, s = true) {
  let i = e4.level, a = e4.dest, o = { label: r, level: t, message: n, newLine: s };
  qi(i, t) && a.write(o);
}
function qi(e4, t) {
  return xe[e4] <= xe[t];
}
function sn(e4, t, r, n = true) {
  return Bt(e4, "info", t, r, n);
}
function an(e4, t, r, n = true) {
  return Bt(e4, "warn", t, r, n);
}
function on(e4, t, r, n = true) {
  return Bt(e4, "error", t, r, n);
}
function cn(...e4) {
  "_astroGlobalDebug" in globalThis && globalThis._astroGlobalDebug(...e4);
}
function ln({ level: e4, label: t }) {
  let r = `${Gi.format(/* @__PURE__ */ new Date())}`, n = [];
  return e4 === "error" || e4 === "warn" ? (n.push(Le(r)), n.push(`[${e4.toUpperCase()}]`)) : n.push(r), t && n.push(`[${t}]`), e4 === "error" ? dr(n.join(" ")) : e4 === "warn" ? pr(n.join(" ")) : n.length === 1 ? at(n[0]) : at(n[0]) + " " + ur(n.splice(1).join(" "));
}
if (typeof process < "u") {
  let e4 = process;
  "argv" in e4 && Array.isArray(e4.argv) && (e4.argv.includes("--verbose") || e4.argv.includes("--silent"));
}
var De = class {
  options;
  constructor(t) {
    this.options = t;
  }
  info(t, r, n = true) {
    sn(this.options, t, r, n);
  }
  warn(t, r, n = true) {
    an(this.options, t, r, n);
  }
  error(t, r, n = true) {
    on(this.options, t, r, n);
  }
  debug(t, ...r) {
    cn(t, ...r);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(t) {
    return new Se(this.options, t);
  }
};
var Se = class e {
  options;
  label;
  constructor(t, r) {
    this.options = t, this.label = r;
  }
  fork(t) {
    return new e(this.options, t);
  }
  info(t) {
    sn(this.options, this.label, t);
  }
  warn(t) {
    an(this.options, this.label, t);
  }
  error(t) {
    on(this.options, this.label, t);
  }
  debug(t) {
    cn(this.label, t);
  }
};
function Ji(e4, t) {
  let r = e4.map((i) => "/" + i.map((a) => a.spread ? `:${a.content.slice(3)}(.*)?` : a.dynamic ? `:${a.content}` : a.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")).join(""), n = "";
  return t === "always" && e4.length && (n = "/"), nn(r + n);
}
function He(e4) {
  return { route: e4.route, type: e4.type, pattern: new RegExp(e4.pattern), params: e4.params, component: e4.component, generate: Ji(e4.segments, e4._meta.trailingSlash), pathname: e4.pathname || void 0, segments: e4.segments, prerender: e4.prerender, redirect: e4.redirect, redirectRoute: e4.redirectRoute ? He(e4.redirectRoute) : void 0, fallbackRoutes: e4.fallbackRoutes.map((t) => He(t)), isIndex: e4.isIndex };
}
function Yi(e4) {
  let t = [];
  for (let i of e4.routes) {
    t.push({ ...i, routeData: He(i.routeData) });
    let a = i;
    a.routeData = He(i.routeData);
  }
  let r = new Set(e4.assets), n = new Map(e4.componentMetadata), s = new Map(e4.clientDirectives);
  return { middleware(i, a) {
    return a();
  }, ...e4, assets: r, componentMetadata: n, clientDirectives: s, routes: t };
}
var dn = Yi({ adapterName: "@astrojs/cloudflare", routes: [{ file: "", links: [], scripts: [], styles: [], routeData: { type: "endpoint", isIndex: false, route: "/_image", pattern: "^\\/_image$", segments: [[{ content: "_image", dynamic: false, spread: false }]], params: [], component: "node_modules/astro/dist/assets/endpoint/generic.js", pathname: "/_image", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "inline", content: `:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;background:#13151a;background-size:224px}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}.link-card[data-astro-cid-dohjnao5]{list-style:none;display:flex;padding:1px;background-color:#23262d;background-image:none;background-size:400%;border-radius:7px;background-position:100%;transition:background-position .6s cubic-bezier(.22,1,.36,1);box-shadow:inset 0 0 0 1px #ffffff1a}.link-card[data-astro-cid-dohjnao5]>a[data-astro-cid-dohjnao5]{width:100%;text-decoration:none;line-height:1.4;padding:calc(1.5rem - 1px);border-radius:8px;color:#fff;background-color:#23262d;opacity:.8}h2[data-astro-cid-dohjnao5]{margin:0;font-size:1.25rem;transition:color .6s cubic-bezier(.22,1,.36,1)}p[data-astro-cid-dohjnao5]{margin-top:.5rem;margin-bottom:0}.link-card[data-astro-cid-dohjnao5]:is(:hover,:focus-within){background-position:0;background-image:var(--accent-gradient)}.link-card[data-astro-cid-dohjnao5]:is(:hover,:focus-within) h2[data-astro-cid-dohjnao5]{color:rgb(var(--accent-light))}main[data-astro-cid-j7pv25f6]{margin:auto;padding:1rem;width:800px;max-width:calc(100% - 2rem);color:#fff;font-size:20px;line-height:1.6}.astro-a[data-astro-cid-j7pv25f6]{position:absolute;top:-32px;left:50%;transform:translate(-50%);width:220px;height:auto;z-index:-1}h1[data-astro-cid-j7pv25f6]{font-size:3rem;font-weight:600;line-height:1;text-align:center;margin-bottom:1em}.text-gradient[data-astro-cid-j7pv25f6]{background-image:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:400%;background-position:0%}.instructions[data-astro-cid-j7pv25f6]{margin-bottom:2rem;border:1px solid rgba(var(--accent-light),25%);background:linear-gradient(rgba(var(--accent-dark),66%),rgba(var(--accent-dark),33%));padding:1.5rem;border-radius:8px}.instructions[data-astro-cid-j7pv25f6] code[data-astro-cid-j7pv25f6]{font-size:.8em;font-weight:700;background:rgba(var(--accent-light),12%);color:rgb(var(--accent-light));border-radius:4px;padding:.3em .4em}.instructions[data-astro-cid-j7pv25f6] strong[data-astro-cid-j7pv25f6]{color:rgb(var(--accent-light))}.link-card-grid[data-astro-cid-j7pv25f6]{display:grid;grid-template-columns:repeat(auto-fit,minmax(24ch,1fr));gap:2rem;padding:0}
` }], routeData: { route: "/", isIndex: true, type: "page", pattern: "^\\/$", segments: [], params: [], component: "src/pages/index.astro", pathname: "/", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }], base: "/", trailingSlash: "ignore", compressHTML: true, componentMetadata: [["C:/Users/P360R/Documents/GitHub/sekai-pages/src/pages/index.astro", { propagation: "none", containsHead: true }]], renderers: [], clientDirectives: [["idle", '(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();'], ["load", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();'], ["media", '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();'], ["only", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();'], ["visible", '(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();']], entryModules: { "\0@astrojs-ssr-virtual-entry": "_worker.mjs", "\0@astro-renderers": "renderers.mjs", "\0noop-middleware": "_noop-middleware.mjs", "/node_modules/astro/dist/assets/endpoint/generic.js": "chunks/pages/generic_Bkhi2Gkj.mjs", "/src/pages/index.astro": "chunks/pages/index_BhtUS7UJ.mjs", "\0@astrojs-manifest": "manifest_COTe_lrr.mjs", "\0@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js": "chunks/generic_CLMbMzwj.mjs", "\0@astro-page:src/pages/index@_@astro": "chunks/index_z2OH3bUt.mjs", "astro:scripts/before-hydration.js": "" }, assets: ["/favicon.svg", "/$server_build/renderers.mjs", "/$server_build/_noop-middleware.mjs", "/$server_build/_worker.mjs", "/$server_build/chunks/astro_DZp0k43g.mjs", "/$server_build/chunks/generic_CLMbMzwj.mjs", "/$server_build/chunks/index_z2OH3bUt.mjs", "/$server_build/chunks/astro/assets-service_BUHGfkEN.mjs", "/$server_build/chunks/pages/generic_Bkhi2Gkj.mjs", "/$server_build/chunks/pages/index_BhtUS7UJ.mjs"], buildFormat: "directory" });
fe();
ce();
var Ee = Te(st(), 1);
te();
re();
me();
var pn = (e4, t) => t();
function ko(e4, t) {
  switch (e4) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore":
      switch (t) {
        case "directory":
          return true;
        case "preserve":
        case "file":
          return false;
      }
  }
}
function _o(e4, t) {
  for (let r of t)
    if (typeof r == "string") {
      if (r === e4)
        return r;
    } else
      for (let n of r.codes)
        if (n === e4)
          return r.path;
  throw new Qt();
}
function I(e4) {
  return e4.replaceAll("_", "-").toLowerCase();
}
function Mo(e4) {
  return e4.map((t) => typeof t == "string" ? t : t.codes[0]);
}
var Qt = class extends Error {
  constructor() {
    super(`Astro encountered an unexpected line of code.
In most cases, this is not your fault, but a bug in astro code.
If there isn't one already, please create an issue.
https://astro.build/issues`);
  }
};
var No = /* @__PURE__ */ new Date(0);
var Yn = "deleted";
var Oo = Symbol.for("astro.responseSent");
var Xe = class {
  constructor(t) {
    this.value = t;
  }
  json() {
    if (this.value === void 0)
      throw new Error("Cannot convert undefined to an object.");
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    return this.value === "false" || this.value === "0" ? false : !!this.value;
  }
};
var je = class {
  #e;
  #r;
  #t;
  #n;
  constructor(t) {
    this.#e = t, this.#r = null, this.#t = null, this.#n = false;
  }
  delete(t, r) {
    let n = { expires: No };
    r?.domain && (n.domain = r.domain), r?.path && (n.path = r.path), this.#i().set(t, [Yn, (0, Ee.serialize)(t, Yn, n), false]);
  }
  get(t, r = void 0) {
    if (this.#t?.has(t)) {
      let [s, , i] = this.#t.get(t);
      return i ? new Xe(s) : void 0;
    }
    let n = this.#s(r);
    if (t in n) {
      let s = n[t];
      return new Xe(s);
    }
  }
  has(t, r = void 0) {
    if (this.#t?.has(t)) {
      let [, , s] = this.#t.get(t);
      return s;
    }
    return !!this.#s(r)[t];
  }
  set(t, r, n) {
    if (this.#n) {
      let a = new Error(`Astro.cookies.set() was called after the cookies had already been sent to the browser.
This may have happened if this method was called in an imported component.
Please make sure that Astro.cookies.set() is only called in the frontmatter of the main page.`);
      a.name = "Warning", console.warn(a);
    }
    let s;
    if (typeof r == "string")
      s = r;
    else {
      let a = r.toString();
      a === Object.prototype.toString.call(r) ? s = JSON.stringify(r) : s = a;
    }
    let i = {};
    if (n && Object.assign(i, n), this.#i().set(t, [s, (0, Ee.serialize)(t, s, i), true]), this.#e[Oo])
      throw new m({ ...be });
  }
  *headers() {
    if (this.#t != null)
      for (let [, t] of this.#t)
        yield t[1];
  }
  static consume(t) {
    return t.#n = true, t.headers();
  }
  #s(t = void 0) {
    return this.#r || this.#o(t), this.#r || (this.#r = {}), this.#r;
  }
  #i() {
    return this.#t || (this.#t = /* @__PURE__ */ new Map()), this.#t;
  }
  #o(t = void 0) {
    let r = this.#e.headers.get("cookie");
    r && (this.#r = (0, Ee.parse)(r, t));
  }
};
var ts = Symbol.for("astro.cookies");
function Uo(e4, t) {
  Reflect.set(e4, ts, t);
}
function Do(e4) {
  let t = Reflect.get(e4, ts);
  if (t != null)
    return t;
}
function* Xn(e4) {
  let t = Do(e4);
  if (!t)
    return [];
  for (let r of je.consume(t))
    yield r;
  return [];
}
var Ho = { write(e4) {
  let t = console.error;
  return xe[e4.level] < xe.error && (t = console.log), e4.label === "SKIP_FORMAT" ? t(e4.message) : t(ln(e4) + " " + e4.message), true;
} };
var Fo = { default() {
  return new Response(null, { status: 301 });
} };
var zo = { page: () => Promise.resolve(Fo), onRequest: (e4, t) => t(), renderers: [] };
function Wo(e4) {
  return e4?.type === "redirect";
}
function Vo(e4) {
  return e4?.type === "fallback";
}
async function Bo(e4) {
  let { request: { method: t }, routeData: r } = e4, { redirect: n, redirectRoute: s } = r, i = s && typeof n == "object" ? n.status : t === "GET" ? 301 : 308, a = { location: Go(e4) };
  return new Response(null, { status: i, headers: a });
}
function Go(e4) {
  let { params: t, routeData: { redirect: r, redirectRoute: n } } = e4;
  if (typeof n < "u")
    return n?.generate(t) || n?.pathname || "/";
  if (typeof r == "string") {
    let s = r;
    for (let i of Object.keys(t)) {
      let a = t[i];
      s = s.replace(`[${i}]`, a), s = s.replace(`[...${i}]`, a);
    }
    return s;
  } else if (typeof r > "u")
    return "/";
  return r.destination;
}
function rs(e4) {
  if (e4 === "*")
    return [{ locale: e4, qualityValue: void 0 }];
  let t = [], r = e4.split(",").map((n) => n.trim());
  for (let n of r) {
    let s = n.split(";").map((o) => o.trim()), i = s[0], a = s[1];
    if (s)
      if (a && a.startsWith("q=")) {
        let o = Number.parseFloat(a.slice(2));
        Number.isNaN(o) || o > 1 ? t.push({ locale: i, qualityValue: void 0 }) : t.push({ locale: i, qualityValue: o });
      } else
        t.push({ locale: i, qualityValue: void 0 });
  }
  return t;
}
function ns(e4, t) {
  let r = Mo(t).map(I);
  return e4.filter((n) => n.locale !== "*" ? r.includes(I(n.locale)) : true).sort((n, s) => {
    if (n.qualityValue && s.qualityValue) {
      if (n.qualityValue > s.qualityValue)
        return -1;
      if (n.qualityValue < s.qualityValue)
        return 1;
    }
    return 0;
  });
}
function ss(e4, t) {
  let r = e4.headers.get("Accept-Language"), n;
  if (r) {
    let i = ns(rs(r), t).at(0);
    if (i && i.locale !== "*")
      for (let a of t)
        if (typeof a == "string")
          I(a) === I(i.locale) && (n = a);
        else
          for (let o of a.codes)
            I(o) === I(i.locale) && (n = a.path);
  }
  return n;
}
function is(e4, t) {
  let r = e4.headers.get("Accept-Language"), n = [];
  if (r) {
    let s = ns(rs(r), t);
    if (s.length === 1 && s.at(0).locale === "*")
      return t.map((i) => typeof i == "string" ? i : i.codes.at(0));
    if (s.length > 0)
      for (let i of s)
        for (let a of t)
          if (typeof a == "string")
            I(a) === I(i.locale) && n.push(a);
          else
            for (let o of a.codes)
              o === i.locale && n.push(a.path);
  }
  return n;
}
function as(e4, t, r, n) {
  for (let s of e4.split("/"))
    for (let i of t)
      if (typeof i == "string") {
        if (!s.includes(i))
          continue;
        if (I(i) === I(s))
          return i;
      } else {
        if (i.path === s)
          return i.codes.at(0);
        for (let a of i.codes)
          if (I(a) === I(s))
            return a;
      }
  if (r === "pathname-prefix-other-locales" || r === "domains-prefix-other-locales")
    return n;
}
async function qo(e4, t, r) {
  let n = false, s, a = e4(t, async () => (n = true, s = r(), s));
  return await Promise.resolve(a).then(async (o) => {
    if (n)
      if (typeof o < "u") {
        if (!(o instanceof Response))
          throw new m(Ne);
        return o;
      } else {
        if (s)
          return s;
        throw new m(Ne);
      }
    else {
      if (typeof o > "u")
        throw new m(Or);
      if (o instanceof Response)
        return o;
      throw new m(Ne);
    }
  });
}
function Jo(...e4) {
  let t = e4.filter((n) => !!n), r = t.length;
  return r ? (n, s) => {
    return i(0, n);
    function i(a, o) {
      let l = t[a];
      return l(o, async () => a < r - 1 ? i(a + 1, o) : s());
    }
  } : (s, i) => i();
}
function Kn(e4, t) {
  let r = e4.split("/");
  for (let n of r)
    for (let s of t)
      if (typeof s == "string") {
        if (I(n) === I(s))
          return true;
      } else if (n === s.path)
        return true;
  return false;
}
function Yo(e4, t, r, n) {
  if (!e4)
    return (o, l) => l();
  let s = (o, l, d) => {
    if (o.pathname === t + "/" || o.pathname === t)
      return ko(r, n) ? d.redirect(`${Qe(D(t, e4.defaultLocale))}`) : d.redirect(`${D(t, e4.defaultLocale)}`);
    if (!Kn(o.pathname, e4.locales))
      return new Response(null, { status: 404, headers: l.headers });
  }, i = (o, l) => {
    let d = false;
    for (let c of o.pathname.split("/"))
      if (I(c) === I(e4.defaultLocale)) {
        d = true;
        break;
      }
    if (d) {
      let c = o.pathname.replace(`/${e4.defaultLocale}`, "");
      return l.headers.set("Location", c), new Response(null, { status: 404, headers: l.headers });
    }
  }, a = (o, l) => {
    if (!(o.pathname === t + "/" || o.pathname === t || Kn(o.pathname, e4.locales)))
      return new Response(null, { status: 404, headers: l.headers });
  };
  return async (o, l) => {
    let d = await l(), c = d.headers.get(ae);
    if (c !== "page" && c !== "fallback")
      return d;
    let { url: p, currentLocale: u } = o, { locales: w, defaultLocale: f, fallback: h, strategy: v } = e4;
    switch (e4.strategy) {
      case "domains-prefix-other-locales": {
        if (Kt(e4, u)) {
          let b = i(p, d);
          if (b)
            return b;
        }
        break;
      }
      case "pathname-prefix-other-locales": {
        let b = i(p, d);
        if (b)
          return b;
        break;
      }
      case "domains-prefix-always-no-redirect": {
        if (Kt(e4, u)) {
          let b = a(p, d);
          if (b)
            return b;
        }
        break;
      }
      case "pathname-prefix-always-no-redirect": {
        let b = a(p, d);
        if (b)
          return b;
        break;
      }
      case "pathname-prefix-always": {
        let b = s(p, d, o);
        if (b)
          return b;
        break;
      }
      case "domains-prefix-always": {
        if (Kt(e4, u)) {
          let b = s(p, d, o);
          if (b)
            return b;
        }
        break;
      }
    }
    if (d.status >= 300 && h) {
      let b = e4.fallback ? Object.keys(e4.fallback) : [], T = p.pathname.split("/").find((j) => {
        for (let P of w)
          if (typeof P == "string") {
            if (P === j)
              return true;
          } else if (P.path === j)
            return true;
        return false;
      });
      if (T && b.includes(T)) {
        let j = h[T], P = _o(j, w), L;
        return P === f && v === "pathname-prefix-other-locales" ? L = p.pathname.replace(`/${T}`, "") : L = p.pathname.replace(`/${T}`, `/${P}`), o.redirect(L);
      }
    }
    return d;
  };
}
function Kt(e4, t) {
  for (let r of Object.values(e4.domainLookupTable))
    if (r === t)
      return false;
  return true;
}
var Xo = ["string", "number", "undefined"];
function Ko([e4, t], r) {
  if (!Xo.includes(typeof t))
    throw new m({ ...jt, message: jt.message(e4, t, typeof t), location: { file: r } });
}
function Zo(e4, { ssr: t, route: r }) {
  if ((!t || r.prerender) && !e4.getStaticPaths)
    throw new m({ ...kr, location: { file: r.component } });
}
function Qo(e4, t, r) {
  if (!Array.isArray(e4))
    throw new m({ ...Et, message: Et.message(typeof e4), location: { file: r.component } });
  e4.forEach((n) => {
    if (typeof n == "object" && Array.isArray(n) || n === null)
      throw new m({ ...At, message: At.message(Array.isArray(n) ? "array" : typeof n) });
    if (n.params === void 0 || n.params === null || n.params && Object.keys(n.params).length === 0)
      throw new m({ ...Cr, location: { file: r.component } });
    for (let [s, i] of Object.entries(n.params))
      typeof i > "u" || typeof i == "string" || typeof i == "number" || t.warn("router", `getStaticPaths() returned an invalid path param: "${s}". A string, number or undefined value was expected, but got \`${JSON.stringify(i)}\`.`), typeof i == "string" && i === "" && t.warn("router", `getStaticPaths() returned an invalid path param: "${s}". \`undefined\` expected for an optional param, but got empty string.`);
  });
}
function os(e4, t) {
  let r = Object.entries(e4).reduce((n, s) => {
    Ko(s, t.component);
    let [i, a] = s;
    return a !== void 0 && (n[i] = typeof a == "string" ? tt(a) : a.toString()), n;
  }, {});
  return JSON.stringify(t.generate(r));
}
function ec(e4) {
  return function(r, n = {}) {
    let { pageSize: s, params: i, props: a } = n, o = s || 10, l = "page", d = i || {}, c = a || {}, p;
    if (e4.params.includes(`...${l}`))
      p = false;
    else if (e4.params.includes(`${l}`))
      p = true;
    else
      throw new m({ ...Tt, message: Tt.message(l) });
    let u = Math.max(1, Math.ceil(r.length / o));
    return [...Array(u).keys()].map((f) => {
      let h = f + 1, v = o === 1 / 0 ? 0 : (h - 1) * o, b = Math.min(v + o, r.length), g = { ...d, [l]: p || h > 1 ? String(h) : void 0 }, T = Zt(e4.generate({ ...g })), j = h === u ? void 0 : Zt(e4.generate({ ...g, page: String(h + 1) })), P = h === 1 ? void 0 : Zt(e4.generate({ ...g, page: !p && h - 1 === 1 ? void 0 : String(h - 1) }));
      return { params: g, props: { ...c, page: { data: r.slice(v, b), start: v, end: b - 1, size: o, total: r.length, currentPage: h, lastPage: u, url: { current: T, next: j, prev: P } } } };
    });
  };
}
function Zt(e4) {
  return e4 === "" ? "/" : e4;
}
async function tc({ mod: e4, route: t, routeCache: r, logger: n, ssr: s }) {
  let i = r.get(t);
  if (!e4)
    throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
  if (i?.staticPaths)
    return i.staticPaths;
  if (Zo(e4, { ssr: s, route: t }), s && !t.prerender) {
    let l = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
    return r.set(t, { ...i, staticPaths: l }), l;
  }
  let a = [];
  if (!e4.getStaticPaths)
    throw new Error("Unexpected Error.");
  a = await e4.getStaticPaths({ paginate: ec(t) }), Qo(a, n, t);
  let o = a;
  o.keyed = /* @__PURE__ */ new Map();
  for (let l of o) {
    let d = os(l.params, t);
    o.keyed.set(d, l);
  }
  return r.set(t, { ...i, staticPaths: o }), o;
}
var er = class {
  logger;
  cache = {};
  mode;
  constructor(t, r = "production") {
    this.logger = t, this.mode = r;
  }
  clearAll() {
    this.cache = {};
  }
  set(t, r) {
    let n = this.key(t);
    this.mode === "production" && this.cache[n]?.staticPaths && this.logger.warn(null, `Internal Warning: route cache overwritten. (${n})`), this.cache[n] = r;
  }
  get(t) {
    return this.cache[this.key(t)];
  }
  key(t) {
    return `${t.route}_${t.component}`;
  }
};
function rc(e4, t, r, n) {
  let s = os(t, r), i = e4.keyed.get(s);
  if (i)
    return i;
  n.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${s}`);
}
var tr = class {
  constructor(t, r, n, s, i, a, o, l = r.adapterName, d = r.clientDirectives, c = r.compressHTML, p = r.i18n, u = r.middleware, w = new er(t, n), f = r.site) {
    this.logger = t, this.manifest = r, this.mode = n, this.renderers = s, this.resolve = i, this.serverLike = a, this.streaming = o, this.adapterName = l, this.clientDirectives = d, this.compressHTML = c, this.i18n = p, this.middleware = u, this.routeCache = w, this.site = f, this.internalMiddleware = [Yo(p, r.base, r.trailingSlash, r.buildFormat)];
  }
  internalMiddleware;
};
async function nc(e4) {
  let { logger: t, mod: r, routeData: n, routeCache: s, pathname: i, serverLike: a } = e4;
  if (!n || n.pathname)
    return {};
  if (Wo(n) || Vo(n))
    return {};
  let o = cs(n, i);
  r && sc(n, r, o);
  let l = await tc({ mod: r, route: n, routeCache: s, logger: t, ssr: a }), d = rc(l, o, n, t);
  if (!d && (!a || n.prerender))
    throw new m({ ..._e, message: _e.message(i), hint: _e.hint([n.component]) });
  return d?.props ? { ...d.props } : {};
}
function cs(e4, t) {
  if (!e4.params.length)
    return {};
  let r = e4.pattern.exec(decodeURIComponent(t));
  if (!r)
    return {};
  let n = {};
  return e4.params.forEach((s, i) => {
    s.startsWith("...") ? n[s.slice(3)] = r[i + 1] ? r[i + 1] : void 0 : n[s] = r[i + 1];
  }), n;
}
function sc(e4, t, r) {
  if (e4.type === "endpoint" && t.getStaticPaths) {
    let n = e4.segments[e4.segments.length - 1], s = Object.values(r), i = s[s.length - 1];
    if (n.length === 1 && n[0].dynamic && i === void 0)
      throw new m({ ...Me, message: Me.message(e4.route), hint: Me.hint(e4.component), location: { file: e4.component } });
  }
}
function ic(e4) {
  if (e4 && e4.expressions?.length === 1)
    return e4.expressions[0];
}
var rr = class {
  #e;
  #r;
  #t;
  constructor(t, r, n) {
    if (this.#e = t, this.#r = r, this.#t = n, r)
      for (let s of Object.keys(r)) {
        if (this[s] !== void 0)
          throw new m({ ...Rt, message: Rt.message(s) });
        Object.defineProperty(this, s, { get() {
          return true;
        }, enumerable: true });
      }
  }
  has(t) {
    return this.#r ? !!this.#r[t] : false;
  }
  async render(t, r = []) {
    if (!this.#r || !this.has(t))
      return;
    let n = this.#e;
    if (!Array.isArray(r))
      this.#t.warn(null, `Expected second parameter to be an array, received a ${typeof r}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
    else if (r.length > 0) {
      let a = this.#r[t], o = typeof a == "function" ? await a(n) : await a, l = ic(o);
      if (l)
        return await Y(n, async () => typeof l == "function" ? l(...r) : l).then((c) => c);
      if (typeof o == "function")
        return await H(n, o(...r)).then((d) => d != null ? String(d) : d);
    }
    let s = await Y(n, this.#r[t]);
    return F(n, s);
  }
};
function ac(e4) {
  let { params: t, request: r, resolve: n, locals: s } = e4, i = new URL(r.url), a = new Headers();
  a.set("Content-Type", "text/html");
  let o = { status: e4.status, statusText: "OK", headers: a };
  Object.defineProperty(o, "headers", { value: o.headers, enumerable: true, writable: false });
  let l = e4.cookies, d, c, p, u = { styles: e4.styles ?? /* @__PURE__ */ new Set(), scripts: e4.scripts ?? /* @__PURE__ */ new Set(), links: e4.links ?? /* @__PURE__ */ new Set(), componentMetadata: e4.componentMetadata ?? /* @__PURE__ */ new Map(), renderers: e4.renderers, clientDirectives: e4.clientDirectives, compressHTML: e4.compressHTML, partial: e4.partial, pathname: e4.pathname, cookies: l, createAstro(w, f, h) {
    let v = new rr(u, h, e4.logger);
    return { __proto__: w, get clientAddress() {
      if (!(oe in r))
        throw e4.adapterName ? new m({ ...we, message: we.message(e4.adapterName) }) : new m(St);
      return Reflect.get(r, oe);
    }, get cookies() {
      return l || (l = new je(r), u.cookies = l, l);
    }, get preferredLocale() {
      if (d)
        return d;
      if (e4.locales)
        return d = ss(r, e4.locales), d;
    }, get preferredLocaleList() {
      if (c)
        return c;
      if (e4.locales)
        return c = is(r, e4.locales), c;
    }, get currentLocale() {
      if (p || e4.locales && (p = as(i.pathname, e4.locales, e4.strategy, e4.defaultLocale), p))
        return p;
    }, params: t, props: f, locals: s, request: r, url: i, redirect(g, T) {
      if (r[Oe])
        throw new m({ ...be });
      return new Response(null, { status: T || 302, headers: { Location: g } });
    }, response: o, slots: v };
  }, resolve: n, response: o, _metadata: { hasHydrationScript: false, rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(), hasRenderedHead: false, hasDirectives: /* @__PURE__ */ new Set(), headInTree: false, extraHead: [], propagators: /* @__PURE__ */ new Set() } };
  return u;
}
var Ke = class e2 {
  constructor(t, r, n, s, i, a, o, l = new je(i), d = cs(a, s), c = new URL(i.url)) {
    this.pipeline = t, this.locals = r, this.middleware = n, this.pathname = s, this.request = i, this.routeData = a, this.status = o, this.cookies = l, this.params = d, this.url = c;
  }
  static create({ locals: t = {}, middleware: r, pathname: n, pipeline: s, request: i, routeData: a, status: o = 200 }) {
    return new e2(s, t, Jo(...s.internalMiddleware, r ?? s.middleware), n, i, a, o);
  }
  async render(t) {
    let { cookies: r, middleware: n, pathname: s, pipeline: i, routeData: a } = this, { logger: o, routeCache: l, serverLike: d, streaming: c } = i, p = await nc({ mod: t, routeData: a, routeCache: l, pathname: s, logger: o, serverLike: d }), u = this.createAPIContext(p), { type: w } = a, h = await qo(n, u, w === "endpoint" ? () => Ur(t, u, d, o) : w === "redirect" ? () => Bo(this) : w === "page" ? async () => {
      let v = await this.createResult(t), b = await rn(v, t?.default, p, {}, c, a);
      return b.headers.set(ae, "page"), b;
    } : w === "fallback" ? () => new Response(null, { status: 500, headers: { [ae]: "fallback" } }) : () => {
      throw new Error("Unknown type of route: " + w);
    });
    return h.headers.get(ae) && h.headers.delete(ae), Uo(h, r), h;
  }
  createAPIContext(t) {
    let r = this, { cookies: n, params: s, pipeline: i, request: a, url: o } = this, l = `Astro v${Mt}`, d = (p, u = 302) => new Response(null, { status: u, headers: { Location: p } }), c = i.site ? new URL(i.site) : void 0;
    return { cookies: n, get currentLocale() {
      return r.computeCurrentLocale();
    }, generator: l, params: s, get preferredLocale() {
      return r.computePreferredLocale();
    }, get preferredLocaleList() {
      return r.computePreferredLocaleList();
    }, props: t, redirect: d, request: a, site: c, url: o, get clientAddress() {
      if (oe in a)
        return Reflect.get(a, oe);
      throw i.adapterName ? new m({ ...we, message: we.message(i.adapterName) }) : new m(St);
    }, get locals() {
      return r.locals;
    }, set locals(p) {
      if (typeof p != "object")
        throw new m(kt);
      r.locals = p, Reflect.set(a, Ot, p);
    } };
  }
  async createResult(t) {
    let { cookies: r, locals: n, params: s, pathname: i, pipeline: a, request: o, routeData: l, status: d } = this, { adapterName: c, clientDirectives: p, compressHTML: u, i18n: w, manifest: f, logger: h, renderers: v, resolve: b, site: g, serverLike: T } = a, { links: j, scripts: P, styles: L } = await a.headElements(l), y = await a.componentMetadata(l) ?? f.componentMetadata, { defaultLocale: x, locales: R, strategy: W } = w ?? {}, Re = !!t.partial;
    return ac({ adapterName: c, clientDirectives: p, componentMetadata: y, compressHTML: u, cookies: r, defaultLocale: x, locales: R, locals: n, logger: h, links: j, params: s, partial: Re, pathname: i, renderers: v, resolve: b, request: o, route: l.route, strategy: W, site: g, scripts: P, ssr: T, status: d, styles: L });
  }
  #e;
  computeCurrentLocale() {
    let { url: t, pipeline: { i18n: r }, routeData: n } = this;
    if (!r)
      return;
    let { defaultLocale: s, locales: i, strategy: a } = r;
    return this.#e ??= as(n.route, i, a, s);
  }
  #r;
  computePreferredLocale() {
    let { pipeline: { i18n: t }, request: r } = this;
    if (t)
      return this.#r ??= ss(r, t.locales);
  }
  #t;
  computePreferredLocaleList() {
    let { pipeline: { i18n: t }, request: r } = this;
    if (t)
      return this.#t ??= is(r, t.locales);
  }
};
function ir(e4, t, r) {
  return r ? D(r, rt(e4)) : t ? ue(D(t, rt(e4))) : e4;
}
function oc(e4, t, r) {
  return e4.type === "inline" ? { props: {}, children: e4.content } : { props: { rel: "stylesheet", href: ir(e4.src, t, r) }, children: "" };
}
function cc(e4, t, r) {
  return new Set(e4.map((n) => oc(n, t, r)));
}
function lc(e4, t, r) {
  return e4.type === "external" ? dc(e4.value, t, r) : { props: { type: "module" }, children: e4.value };
}
function dc(e4, t, r) {
  return { props: { type: "module", src: ir(e4, t, r) }, children: "" };
}
function Zn(e4, t) {
  let r = decodeURI(e4);
  return t.routes.find((n) => n.pattern.test(r) || n.fallbackRoutes.some((s) => s.pattern.test(r)));
}
var nr = class e3 extends tr {
  static create({ logger: t, manifest: r, mode: n, renderers: s, resolve: i, serverLike: a, streaming: o }) {
    return new e3(t, r, n, s, i, a, o);
  }
  headElements(t) {
    let r = this.manifest.routes.find((a) => a.routeData === t), n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), i = cc(r?.styles ?? []);
    for (let a of r?.scripts ?? [])
      "stage" in a ? a.stage === "head-inline" && s.add({ props: {}, children: a.children }) : s.add(lc(a));
    return { links: n, styles: i, scripts: s };
  }
  componentMetadata() {
  }
};
var _e2, _r2, _t2, _n2, _s, _i2, _o2, _p, p_fn, _l, l_fn, _u, u_fn, _f, f_fn, _a2, _a3, a_fn, _c2, c_fn, _m, m_fn, _d, d_fn;
var sr = (_a2 = class {
  constructor(t, r = true) {
    __privateAdd(this, _p);
    __privateAdd(this, _l);
    __privateAdd(this, _u);
    __privateAdd(this, _f);
    __privateAdd(this, _a3);
    __privateAdd(this, _c2);
    __privateAdd(this, _m);
    __privateAdd(this, _d);
    __privateAdd(this, _e2, void 0);
    __privateAdd(this, _r2, void 0);
    __privateAdd(this, _t2, new De({ dest: Ho, level: "info" }));
    __privateAdd(this, _n2, void 0);
    __privateAdd(this, _s, void 0);
    __privateAdd(this, _i2, void 0);
    __privateAdd(this, _o2, false);
    __privateSet(this, _e2, t), __privateSet(this, _r2, { routes: t.routes.map((n) => n.routeData) }), __privateSet(this, _n2, Pe(__privateGet(this, _e2).base)), __privateSet(this, _s, __privateMethod(this, _p, p_fn).call(this, r)), __privateSet(this, _i2, new Se(__privateGet(this, _t2).options, __privateGet(this, _e2).adapterName));
  }
  getAdapterLogger() {
    return __privateGet(this, _i2);
  }
  set setManifestData(t) {
    __privateSet(this, _r2, t);
  }
  removeBase(t) {
    return t.startsWith(__privateGet(this, _e2).base) ? t.slice(__privateGet(this, _n2).length + 1) : t;
  }
  match(t) {
    let r = new URL(t.url);
    if (__privateGet(this, _e2).assets.has(r.pathname))
      return;
    let n = __privateMethod(this, _u, u_fn).call(this, t);
    n || (n = ue(this.removeBase(r.pathname)));
    let s = Zn(n, __privateGet(this, _r2));
    if (!(!s || s.prerender))
      return s;
  }
  async render(t, r, n) {
    let s, i, a, o;
    if (r && ("addCookieHeader" in r || "clientAddress" in r || "locals" in r || "routeData" in r) ? ("addCookieHeader" in r && (o = r.addCookieHeader), "clientAddress" in r && (a = r.clientAddress), "routeData" in r && (s = r.routeData), "locals" in r && (i = r.locals)) : (s = r, i = n, (r || i) && __privateMethod(this, _f, f_fn).call(this)), i) {
      if (typeof i != "object")
        return __privateGet(this, _t2).error(null, new m(kt).stack), __privateMethod(this, _a3, a_fn).call(this, t, { status: 500 });
      Reflect.set(t, Ot, i);
    }
    if (a && Reflect.set(t, oe, a), t.url !== et(t.url) && (t = new Request(et(t.url), t)), s || (s = this.match(t)), !s)
      return __privateMethod(this, _a3, a_fn).call(this, t, { status: 404 });
    let l = __privateMethod(this, _l, l_fn).call(this, t), d = __privateMethod(this, _m, m_fn).call(this, s, l), c = await __privateMethod(this, _d, d_fn).call(this, s), p;
    try {
      p = await Ke.create({ pipeline: __privateGet(this, _s), locals: i, pathname: l, request: t, routeData: s, status: d }).render(await c.page());
    } catch (u) {
      return __privateGet(this, _t2).error(null, u.stack || u.message || String(u)), __privateMethod(this, _a3, a_fn).call(this, t, { status: 500 });
    }
    if (Nt.includes(p.status) && p.headers.get(ve) !== "no")
      return __privateMethod(this, _a3, a_fn).call(this, t, { response: p, status: p.status });
    if (p.headers.has(ve) && p.headers.delete(ve), o)
      for (let u of _a2.getSetCookieFromResponse(p))
        p.headers.append("set-cookie", u);
    return Reflect.set(p, Oe, true), p;
  }
  setCookieHeaders(t) {
    return Xn(t);
  }
}, _e2 = new WeakMap(), _r2 = new WeakMap(), _t2 = new WeakMap(), _n2 = new WeakMap(), _s = new WeakMap(), _i2 = new WeakMap(), _o2 = new WeakMap(), _p = new WeakSet(), p_fn = function(t = false) {
  return nr.create({ logger: __privateGet(this, _t2), manifest: __privateGet(this, _e2), mode: "production", renderers: __privateGet(this, _e2).renderers, resolve: async (r) => {
    if (!(r in __privateGet(this, _e2).entryModules))
      throw new Error(`Unable to resolve [${r}]`);
    let n = __privateGet(this, _e2).entryModules[r];
    switch (true) {
      case n.startsWith("data:"):
      case n.length === 0:
        return n;
      default:
        return ir(n, __privateGet(this, _e2).base, __privateGet(this, _e2).assetsPrefix);
    }
  }, serverLike: true, streaming: t });
}, _l = new WeakSet(), l_fn = function(t) {
  let r = new URL(t.url);
  return ue(this.removeBase(r.pathname));
}, _u = new WeakSet(), u_fn = function(t) {
  let r, n = new URL(t.url);
  if (__privateGet(this, _e2).i18n && (__privateGet(this, _e2).i18n.strategy === "domains-prefix-always" || __privateGet(this, _e2).i18n.strategy === "domains-prefix-other-locales" || __privateGet(this, _e2).i18n.strategy === "domains-prefix-always-no-redirect")) {
    let s = t.headers.get("X-Forwarded-Host"), i = t.headers.get("X-Forwarded-Proto");
    if (i ? i = i + ":" : i = n.protocol, s || (s = t.headers.get("Host")), s && i) {
      s = s.split(":")[0];
      try {
        let a, o = new URL(`${i}//${s}`);
        for (let [l, d] of Object.entries(__privateGet(this, _e2).i18n.domainLookupTable)) {
          let c = new URL(l);
          if (o.host === c.host && o.protocol === c.protocol) {
            a = d;
            break;
          }
        }
        a && (r = ue(D(I(a), this.removeBase(n.pathname))), n.pathname.endsWith("/") && (r = Qe(r)));
      } catch (a) {
        __privateGet(this, _t2).error("router", `Astro tried to parse ${i}//${s} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`), __privateGet(this, _t2).error("router", `Error: ${a}`);
      }
    }
  }
  return r;
}, _f = new WeakSet(), f_fn = function() {
  __privateGet(this, _o2) || (__privateGet(this, _t2).warn("deprecated", `The adapter ${__privateGet(this, _e2).adapterName} is using a deprecated signature of the 'app.render()' method. From Astro 4.0, locals and routeData are provided as properties on an optional object to this method. Using the old signature will cause an error in Astro 5.0. See https://github.com/withastro/astro/pull/9199 for more information.`), __privateSet(this, _o2, true));
}, _a3 = new WeakSet(), a_fn = async function(t, { status: r, response: n, skipMiddleware: s = false }) {
  let i = `/${r}${__privateGet(this, _e2).trailingSlash === "always" ? "/" : ""}`, a = Zn(i, __privateGet(this, _r2)), o = new URL(t.url);
  if (a) {
    if (a.prerender) {
      let c = a.route.endsWith(`/${r}`) ? ".html" : "", p = new URL(`${__privateGet(this, _n2)}/${r}${c}`, o), u = await fetch(p.toString()), w = { status: r };
      return __privateMethod(this, _c2, c_fn).call(this, u, n, w);
    }
    let d = await __privateMethod(this, _d, d_fn).call(this, a);
    try {
      let p = await Ke.create({ pipeline: __privateGet(this, _s), middleware: s ? (u, w) => w() : void 0, pathname: __privateMethod(this, _l, l_fn).call(this, t), request: t, routeData: a, status: r }).render(await d.page());
      return __privateMethod(this, _c2, c_fn).call(this, p, n);
    } catch {
      if (s === false)
        return __privateMethod(this, _a3, a_fn).call(this, t, { status: r, response: n, skipMiddleware: true });
    }
  }
  let l = __privateMethod(this, _c2, c_fn).call(this, new Response(null, { status: r }), n);
  return Reflect.set(l, Oe, true), l;
}, _c2 = new WeakSet(), c_fn = function(t, r, n) {
  if (!r)
    return n !== void 0 ? new Response(t.body, { status: n.status, statusText: t.statusText, headers: t.headers }) : t;
  let s = n?.status ? n.status : r.status === 200 ? t.status : r.status;
  try {
    r.headers.delete("Content-type");
  } catch {
  }
  return new Response(t.body, { status: s, statusText: s === 200 ? t.statusText : r.statusText, headers: new Headers([...Array.from(t.headers), ...Array.from(r.headers)]) });
}, _m = new WeakSet(), m_fn = function(t, r) {
  if (!t.pattern.exec(r)) {
    for (let s of t.fallbackRoutes)
      if (s.pattern.test(r))
        return 302;
  }
  let n = Pe(t.route);
  return n.endsWith("/404") ? 404 : n.endsWith("/500") ? 500 : 200;
}, _d = new WeakSet(), d_fn = async function(t) {
  if (t.type === "redirect")
    return zo;
  if (__privateGet(this, _e2).pageMap) {
    let r = __privateGet(this, _e2).pageMap.get(t.component);
    if (!r)
      throw new Error(`Unexpectedly unable to find a component instance for route ${t.route}`);
    return await r();
  } else {
    if (__privateGet(this, _e2).pageModule)
      return __privateGet(this, _e2).pageModule;
    throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
  }
}, __publicField(_a2, "getSetCookieFromResponse", Xn), _a2);
var pc = typeof process == "object" && Object.prototype.toString.call(process) === "[object process]";
function uc() {
  return new Proxy({}, { get: (e4, t) => {
    console.warn(`Unable to access \`import.meta\0.env.${t.toString()}\` on initialization as the Cloudflare platform only provides the environment variables per request. Please move the environment variable access inside a function that's only called after a request has been received.`);
  } });
}
pc || (process.env = uc());
function ls(e4) {
  let t = new sr(e4);
  return { default: { fetch: async (n, s, i) => {
    process.env = s;
    let { pathname: a } = new URL(n.url);
    if (e4.assets.has(a))
      return s.ASSETS.fetch(n);
    let o = t.match(n);
    Reflect.set(n, Symbol.for("astro.clientAddress"), n.headers.get("cf-connecting-ip"));
    let l = { runtime: { waitUntil: (c) => {
      i.waitUntil(c);
    }, env: s, cf: n.cf, caches } }, d = await t.render(n, { routeData: o, locals: l });
    if (t.setCookieHeaders)
      for (let c of t.setCookieHeaders(d))
        d.headers.append("Set-Cookie", c);
    return d;
  } } };
}
var Qn = Object.freeze(Object.defineProperty({ __proto__: null, createExports: ls }, Symbol.toStringTag, { value: "Module" }));
var fc = () => Promise.resolve().then(() => (zn(), Fn));
var mc = () => Promise.resolve().then(() => (Jn(), qn));
var hc = /* @__PURE__ */ new Map([["node_modules/astro/dist/assets/endpoint/generic.js", fc], ["src/pages/index.astro", mc]]);
var ds = Object.assign(dn, { pageMap: hc, renderers: Q, middleware: pn });
var gc = void 0;
var yc = ls(ds);
var Cl = yc.default;
var es = "start";
es in Qn && Qn[es](ds, gc);

// ../../../../AppData/Roaming/nvm/v18.17.1/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e4) {
      console.error("Failed to drain the unused request body.", e4);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../AppData/Roaming/nvm/v18.17.1/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e4) {
  return {
    name: e4?.name,
    message: e4?.message ?? String(e4),
    stack: e4?.stack,
    cause: e4?.cause === void 0 ? void 0 : reduceError(e4.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e4) {
    const error = reduceError(e4);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// ../.wrangler/tmp/bundle-zGYgfX/middleware-insertion-facade.js
var envWrappers = [void 0, wrap].filter(Boolean);
var facade = {
  ...Cl,
  envWrappers,
  middleware: [
    middleware_ensure_req_body_drained_default,
    middleware_miniflare3_json_error_default,
    ...Cl.middleware ? Cl.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;

// ../../../../AppData/Roaming/nvm/v18.17.1/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// ../.wrangler/tmp/bundle-zGYgfX/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env, ctx);
};
function getMaskedEnv(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv(env), ctx);
}
var middleware_loader_entry_default = facade2;
export {
  middleware_loader_entry_default as default,
  hc as pageMap
};
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

cssesc/cssesc.js:
  (*! https://mths.be/cssesc v3.0.0 by @mathias *)
*/
//# sourceMappingURL=bundledWorker-0.1774631635225281.mjs.map
