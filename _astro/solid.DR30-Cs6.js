const o={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return D(this.context.count)},getNextContextId(){return D(this.context.count++)}};function D(t){const e=String(t),s=e.length-1;return o.context.id+(s?String.fromCharCode(96+s):"")+e}function g(t){o.context=t}function q(){return{...o.context,id:o.getNextContextId(),count:0}}const tt=(t,e)=>t===e,xt=Symbol("solid-proxy"),vt=Symbol("solid-track"),A={equals:tt};let M=X;const p=1,E=2,V={owned:null,cleanups:null,context:null,owner:null};var l=null;let L=null,et=null,i=null,c=null,a=null,$=0;function nt(t,e){const s=i,n=l,r=t.length===0,u=e===void 0?n:e,f=r?V:{owned:null,cleanups:null,context:u?u.context:null,owner:u},N=r?t:()=>t(()=>h(()=>C(f)));l=f,i=null;try{return x(N,!0)}finally{i=s,l=n}}function H(t,e){e=e?Object.assign({},A,e):A;const s={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},n=r=>(typeof r=="function"&&(r=r(s.value)),W(s,r));return[Q.bind(s),n]}function st(t,e,s){const n=R(t,e,!1,p);m(n)}function rt(t,e,s){M=ht;const n=R(t,e,!1,p),r=k&&K(k);r&&(n.suspense=r),n.user=!0,a?a.push(n):m(n)}function w(t,e,s){s=s?Object.assign({},A,s):A;const n=R(t,e,!0,0);return n.observers=null,n.observerSlots=null,n.comparator=s.equals||void 0,m(n),Q.bind(n)}function yt(t){return x(t,!1)}function h(t){if(i===null)return t();const e=i;i=null;try{return t()}finally{i=e}}function St(t){rt(()=>h(t))}function ut(t){return l===null||(l.cleanups===null?l.cleanups=[t]:l.cleanups.push(t)),t}function Ct(){return i}function ot(){return l}function lt(t){a.push.apply(a,t),t.length=0}function G(t,e){const s=Symbol("context");return{id:s,Provider:dt(s),defaultValue:t}}function K(t){let e;return l&&l.context&&(e=l.context[t.id])!==void 0?e:t.defaultValue}function it(t){const e=w(t),s=w(()=>P(e()));return s.toArray=()=>{const n=s();return Array.isArray(n)?n:n!=null?[n]:[]},s}let k;function ct(){return k||(k=G())}function Q(){if(this.sources&&this.state)if(this.state===p)m(this);else{const t=c;c=null,x(()=>O(this),!1),c=t}if(i){const t=this.observers?this.observers.length:0;i.sources?(i.sources.push(this),i.sourceSlots.push(t)):(i.sources=[this],i.sourceSlots=[t]),this.observers?(this.observers.push(i),this.observerSlots.push(i.sources.length-1)):(this.observers=[i],this.observerSlots=[i.sources.length-1])}return this.value}function W(t,e,s){let n=t.value;return(!t.comparator||!t.comparator(n,e))&&(t.value=e,t.observers&&t.observers.length&&x(()=>{for(let r=0;r<t.observers.length;r+=1){const u=t.observers[r],f=L&&L.running;f&&L.disposed.has(u),(f?!u.tState:!u.state)&&(u.pure?c.push(u):a.push(u),u.observers&&Y(u)),f||(u.state=p)}if(c.length>1e6)throw c=[],new Error},!1)),e}function m(t){if(!t.fn)return;C(t);const e=$;ft(t,t.value,e)}function ft(t,e,s){let n;const r=l,u=i;i=l=t;try{n=t.fn(e)}catch(f){return t.pure&&(t.state=p,t.owned&&t.owned.forEach(C),t.owned=null),t.updatedAt=s+1,z(f)}finally{i=u,l=r}(!t.updatedAt||t.updatedAt<=s)&&(t.updatedAt!=null&&"observers"in t?W(t,n):t.value=n,t.updatedAt=s)}function R(t,e,s,n=p,r){const u={fn:t,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:l,context:l?l.context:null,pure:s};return l===null||l!==V&&(l.owned?l.owned.push(u):l.owned=[u]),u}function F(t){if(t.state===0)return;if(t.state===E)return O(t);if(t.suspense&&h(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<$);)t.state&&e.push(t);for(let s=e.length-1;s>=0;s--)if(t=e[s],t.state===p)m(t);else if(t.state===E){const n=c;c=null,x(()=>O(t,e[0]),!1),c=n}}function x(t,e){if(c)return t();let s=!1;e||(c=[]),a?s=!0:a=[],$++;try{const n=t();return at(s),n}catch(n){s||(a=null),c=null,z(n)}}function at(t){if(c&&(X(c),c=null),t)return;const e=a;a=null,e.length&&x(()=>M(e),!1)}function X(t){for(let e=0;e<t.length;e++)F(t[e])}function ht(t){let e,s=0;for(e=0;e<t.length;e++){const n=t[e];n.user?t[s++]=n:F(n)}if(o.context){if(o.count){o.effects||(o.effects=[]),o.effects.push(...t.slice(0,s));return}g()}for(o.effects&&(o.done||!o.count)&&(t=[...o.effects,...t],s+=o.effects.length,delete o.effects),e=0;e<s;e++)F(t[e])}function O(t,e){t.state=0;for(let s=0;s<t.sources.length;s+=1){const n=t.sources[s];if(n.sources){const r=n.state;r===p?n!==e&&(!n.updatedAt||n.updatedAt<$)&&F(n):r===E&&O(n,e)}}}function Y(t){for(let e=0;e<t.observers.length;e+=1){const s=t.observers[e];s.state||(s.state=E,s.pure?c.push(s):a.push(s),s.observers&&Y(s))}}function C(t){let e;if(t.sources)for(;t.sources.length;){const s=t.sources.pop(),n=t.sourceSlots.pop(),r=s.observers;if(r&&r.length){const u=r.pop(),f=s.observerSlots.pop();n<r.length&&(u.sourceSlots[f]=n,r[n]=u,s.observerSlots[n]=f)}}if(t.tOwned){for(e=t.tOwned.length-1;e>=0;e--)C(t.tOwned[e]);delete t.tOwned}if(t.owned){for(e=t.owned.length-1;e>=0;e--)C(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0}function pt(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function z(t,e=l){throw pt(t)}function P(t){if(typeof t=="function"&&!t.length)return P(t());if(Array.isArray(t)){const e=[];for(let s=0;s<t.length;s++){const n=P(t[s]);Array.isArray(n)?e.push.apply(e,n):e.push(n)}return e}return t}function dt(t,e){return function(n){let r;return st(()=>r=h(()=>(l.context={...l.context,[t]:n.value},it(()=>n.children))),void 0),r}}let B=!1;function mt(){B=!0}function gt(t,e){if(B&&o.context){const s=o.context;g(q());const n=h(()=>t(e||{}));return g(s),n}return h(()=>t(e||{}))}const wt=t=>`Stale read from <${t}>.`;function At(t){const e=t.keyed,s=w(()=>t.when,void 0,{equals:(n,r)=>e?n===r:!n==!r});return w(()=>{const n=s();if(n){const r=t.children;return typeof r=="function"&&r.length>0?h(()=>r(e?n:()=>{if(!h(s))throw wt("Show");return t.when})):r}return t.fallback},void 0,void 0)}const bt=G();function Et(t){let e=0,s,n,r,u,f;const[N,T]=H(!1),J=ct(),v={increment:()=>{++e===1&&T(!0)},decrement:()=>{--e===0&&T(!1)},inFallback:N,effects:[],resolved:!1},Z=ot();if(o.context&&o.load){const y=o.getContextId();let b=o.load(y);if(b&&(typeof b!="object"||b.status!=="success"?r=b:o.gather(y)),r&&r!=="$$f"){const[U,S]=H(void 0,{equals:!1});u=U,r.then(()=>{if(o.done)return S();o.gather(y),g(n),S(),g()},I=>{f=I,S()})}}const j=K(bt);j&&(s=j.register(v.inFallback));let d;return ut(()=>d&&d()),gt(J.Provider,{value:v,get children(){return w(()=>{if(f)throw f;if(n=o.context,u)return u(),u=void 0;n&&r==="$$f"&&g();const y=w(()=>t.children);return w(b=>{const U=v.inFallback(),{showContent:S=!0,showFallback:I=!0}=s?s():{};if((!U||r&&r!=="$$f")&&S)return v.resolved=!0,d&&d(),d=n=r=void 0,lt(v.effects),y();if(I)return d?b:nt(_=>(d=_,n&&(g({id:n.id+"F",count:0}),n=void 0),t.fallback),Z)})})}})}export{xt as $,At as S,gt as a,vt as b,H as c,yt as d,Et as e,st as f,Ct as g,nt as h,mt as i,ut as j,St as o,o as s,h as u};
