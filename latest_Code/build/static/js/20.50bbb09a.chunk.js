(this["webpackJsonpberry-material-react-free"]=this["webpackJsonpberry-material-react-free"]||[]).push([[20],{693:function(e,t,a){"use strict";a.r(t);var c=a(11),n=a(0),r=a(236),i=a(237),b=a(696),o=(a(29),a(91)),s=a(63),l=a(127),d=(a(171),a(232)),u=a(90),j=a(1),O=[],f=["Sl. No","Name","Mobile Number","Branch Id","Date & Time"],m=Object(d.a)((function(e){return{actionsContainer:{display:"flex",alignItems:"center",justifyContent:"end"}}}));t.default=function(){m();var e=Object(u.a)(),t=Object(n.useState)(!0),a=Object(c.a)(t,2),d=(a[0],a[1],Object(n.useState)(!0)),h=Object(c.a)(d,2),p=(h[0],h[1]),g=Object(n.useState)([]),v=Object(c.a)(g,2),y=v[0],S=v[1],x=Object(n.useState)(!1),I=Object(c.a)(x,2),M=I[0],N=I[1],T=Object(n.useState)(!1),k=Object(c.a)(T,2),w=(k[0],k[1],Object(n.useState)([])),C=Object(c.a)(w,2),q=C[0],B=(C[1],Object(n.useState)(!1)),D=Object(c.a)(B,2),E=D[0],H=(D[1],Object(n.useState)([null])),J=Object(c.a)(H,2),L=(J[0],J[1],Object(n.useState)(!1)),F=Object(c.a)(L,2);F[0],F[1];Object(n.useEffect)((function(){p(!0),e.get("http://43.204.210.119/api/request/trading/").then((function(e){p(!1),console.log(e.data.List),S(e.data.List)})).catch((function(e){return console.log(e)}))}),[M]);var R=E?q:y;return console.log(R,E),O=null===R||void 0===R?void 0:R.map((function(e,t){return{id:t+1,name:null===e||void 0===e?void 0:e.bidder.fullname,mobileNumber:null===e||void 0===e?void 0:e.bidder.contactNumber,branchId:null===e||void 0===e?void 0:e.branchId,dateTime:Object(b.a)(new Date("".concat(e.created_at)),"yyyy-MM-dd HH:MM:SS")}})),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("div",{children:Object(j.jsx)(o.a,{title:"Trading Enquiry",children:Object(j.jsx)(s.a,{children:y.length<=0?Object(j.jsx)(r.a,{sx:{display:"flex",justifyContent:"center",alignItems:"center",p:1,m:1,bgcolor:"background.paper",borderRadius:1},children:Object(j.jsx)(i.a,{color:"secondary"})}):Object(j.jsx)(l.a,{column:f,data:O,setBanner:S,setIsUpdateTable:N})})})})})}}}]);
//# sourceMappingURL=20.50bbb09a.chunk.js.map