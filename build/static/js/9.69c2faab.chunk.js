(this["webpackJsonpberry-material-react-free"]=this["webpackJsonpberry-material-react-free"]||[]).push([[9],{400:function(e,t,r){"use strict";var n=r(5),a=Object(n.a)("div")((function(e){return{backgroundColor:e.theme.palette.primary.light,minHeight:"100vh"}}));t.a=a},401:function(e,t,r){"use strict";var n=r(14),a=r(44),i=r(236),s=r(91),c=r(1),o=["children"];t.a=function(e){var t=e.children,r=Object(a.a)(e,o);return Object(c.jsx)(s.a,Object(n.a)(Object(n.a)({sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1},r),{},{children:Object(c.jsx)(i.a,{sx:{p:{xs:2,sm:3,xl:5}},children:t})}))}},402:function(e,t,r){"use strict";var n=r(11),a=r(0),i=r(714),s=r(695),c=r(1),o=Object(a.forwardRef)((function(e,t){var r,a,o,l,d=e.children,j=e.type,u=e.direction,b=e.offset,m=e.scale;switch(u){case"up":case"left":o=b,l=0;break;default:o=0,l=b}var h=Object(i.a)(o,l),x=Object(n.a)(h,2),O=x[0],p=x[1],g=Object(i.a)(o,l),f=Object(n.a)(g,2),v=f[0],w=f[1];switch(j){case"rotate":return Object(c.jsx)(s.a.div,{ref:t,animate:{rotate:360},transition:{repeat:1/0,repeatType:"loop",duration:2,repeatDelay:0},children:d});case"slide":return"up"===u||"down"===u?Object(c.jsx)(s.a.div,{ref:t,animate:{y:void 0!==v?v:""},onHoverEnd:function(){return w()},onHoverStart:function(){return w()},children:d}):Object(c.jsx)(s.a.div,{ref:t,animate:{x:void 0!==O?O:""},onHoverEnd:function(){return p()},onHoverStart:function(){return p()},children:d});default:return"number"===typeof m&&(m={hover:m,tap:m}),Object(c.jsx)(s.a.div,{ref:t,whileHover:{scale:null===(r=m)||void 0===r?void 0:r.hover},whileTap:{scale:null===(a=m)||void 0===a?void 0:a.tap},children:d})}}));o.defaultProps={type:"scale",offset:10,direction:"right",scale:{hover:1,tap:.9}},t.a=o},403:function(e,t,r){"use strict";t.a=r.p+"static/media/social-google.9887eb8e.svg"},404:function(e,t,r){"use strict";var n=r(292),a=r(55),i=r(703),s=r(1);t.a=function(){return Object(s.jsxs)(n.a,{direction:"row",justifyContent:"space-between",children:[Object(s.jsx)(a.a,{variant:"subtitle2",component:i.a,href:"https://berrydashboard.io",target:"_blank",underline:"hover",children:"berrydashboard.io"}),Object(s.jsx)(a.a,{variant:"subtitle2",component:i.a,href:"https://codedthemes.com",target:"_blank",underline:"hover",children:"\xa9 codedthemes.com"})]})}},704:function(e,t,r){"use strict";r.r(t);var n=r(32),a=r(20),i=r(297),s=r(306),c=r(292),o=r(55),l=r(166),d=r(400),j=r(401),u=r(135),b=r(14),m=r(43),h=r(64),x=r(11),O=r(0),p=r(34),g=r(235),f=r(236),v=r(315),w=r(305),y=r(309),C=r(317),k=r(712),P=r(329),S=r(713),N=r(699),B=r(335),I=r(128),q=r(134),E=r(403),W=r(402),R=r(149),z=r.n(R),F=function(e){return e<2?{label:"Poor",color:z.a.errorMain}:e<3?{label:"Weak",color:z.a.warningDark}:e<4?{label:"Normal",color:z.a.orangeMain}:e<5?{label:"Good",color:z.a.successMain}:e<6?{label:"Strong",color:z.a.successDark}:{label:"Poor",color:z.a.errorMain}},H=function(e){var t=0;return e.length>5&&(t+=1),e.length>7&&(t+=1),function(e){return new RegExp(/[0-9]/).test(e)}(e)&&(t+=1),function(e){return new RegExp(/[!#@$%^&*)(+=._-]/).test(e)}(e)&&(t+=1),function(e){return new RegExp(/[a-z]/).test(e)&&new RegExp(/[A-Z]/).test(e)}(e)&&(t+=1),t},A=r(470),D=r.n(A),M=r(471),G=r.n(M),V=r(136),T=r(1),_=function(e){var t=Object.assign({},e),r=Object(a.a)(),c=Object(V.a)(),d=(Object(q.a)(),Object(i.a)(r.breakpoints.down("md"))),j=Object(p.c)((function(e){return e.customization})),u=Object(O.useState)(!1),R=Object(x.a)(u,2),z=R[0],A=R[1],M=Object(O.useState)(!1),_=Object(x.a)(M,2),J=_[0],L=_[1],U=Object(O.useState)(!0),Z=Object(x.a)(U,2),$=Z[0],K=Z[1],Q=Object(O.useState)(0),X=Object(x.a)(Q,2),Y=X[0],ee=X[1],te=Object(O.useState)(),re=Object(x.a)(te,2),ne=re[0],ae=re[1],ie=function(){var e=Object(h.a)(Object(m.a)().mark((function e(){return Object(m.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.error("Register");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),se=function(){A(!z)},ce=function(){L(!J)},oe=function(e){e.preventDefault()},le=function(e){var t=H(e);ee(t),ae(F(t))};return Object(O.useEffect)((function(){le("123456")}),[]),Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)(s.a,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:[Object(T.jsx)(s.a,{item:!0,xs:12,children:Object(T.jsx)(W.a,{children:Object(T.jsxs)(g.a,{variant:"outlined",fullWidth:!0,onClick:ie,size:"large",sx:{color:"grey.700",backgroundColor:r.palette.grey[50],borderColor:r.palette.grey[100]},children:[Object(T.jsx)(f.a,{sx:{mr:{xs:1,sm:2,width:20}},children:Object(T.jsx)("img",{src:E.a,alt:"google",width:16,height:16,style:{marginRight:d?8:16}})}),"Sign up with Google"]})})}),Object(T.jsx)(s.a,{item:!0,xs:12,children:Object(T.jsxs)(f.a,{sx:{alignItems:"center",display:"flex"},children:[Object(T.jsx)(l.a,{sx:{flexGrow:1},orientation:"horizontal"}),Object(T.jsx)(g.a,{variant:"outlined",sx:{cursor:"unset",m:2,py:.5,px:7,borderColor:"".concat(r.palette.grey[100]," !important"),color:"".concat(r.palette.grey[900],"!important"),fontWeight:500,borderRadius:"".concat(j.borderRadius,"px")},disableRipple:!0,disabled:!0,children:"OR"}),Object(T.jsx)(l.a,{sx:{flexGrow:1},orientation:"horizontal"})]})}),Object(T.jsx)(s.a,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:Object(T.jsx)(f.a,{sx:{mb:2},children:Object(T.jsx)(o.a,{variant:"subtitle1",children:"Sign up with Email address"})})})]}),Object(T.jsx)(I.a,{initialValues:{firstname:"",lastname:"",username:"",email:"",contactNumber:"",password:"",confirmPassword:""},validationSchema:B.c().shape({firstname:B.e().max(255).required("First Name is required"),lastname:B.e().max(255).required("Last Name is required"),username:B.e().max(255).required("Username is required"),contactNumber:B.b().required("Contact Number is required"),email:B.e().email("Must be a valid email").max(255).required("Email Id is required"),password:B.e().max(255).required("Password is required"),confirmPassword:B.e().oneOf([B.d("password")],"Both the password should be same").required("Confirm Password is required")}),onSubmit:function(){var e=Object(h.a)(Object(m.a)().mark((function e(t,r){return Object(m.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.setErrors,r.setStatus,r.setSubmitting,console.log(Object(b.a)(Object(b.a)({},t),{},{role:"superadmin"}),"values"),c.post("/admin/register",Object(b.a)(Object(b.a)({},t),{},{role:"superadmin"})).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),children:function(e){var a=e.errors,i=e.handleBlur,c=e.handleChange,l=e.handleSubmit,d=e.isSubmitting,j=e.touched,u=e.values;return Object(T.jsxs)("form",Object(b.a)(Object(b.a)({noValidate:!0,onSubmit:l},t),{},{children:[Object(T.jsxs)(v.a,{fullWidth:!0,error:Boolean(j.firstname&&a.firstname),sx:Object(b.a)({},r.typography.customInput),children:[Object(T.jsx)(w.a,{htmlFor:"outlined-adornment-firstname-register",children:"First Name"}),Object(T.jsx)(y.a,{id:"outlined-adornment-firstname-register",name:"firstname",onChange:c,onBlur:i,value:u.firstname,margin:"normal",type:"text",defaultValue:""}),j.firstname&&a.firstname&&Object(T.jsx)(C.a,{error:!0,id:"standard-weight-helper-text--register",children:a.firstname})]}),Object(T.jsxs)(v.a,{fullWidth:!0,error:Boolean(j.lastname&&a.lastname),sx:Object(b.a)({},r.typography.customInput),children:[Object(T.jsx)(w.a,{htmlFor:"outlined-adornment-lastname-register",children:"Last Name"}),Object(T.jsx)(y.a,{id:"outlined-adornment-lastname-register",name:"lastname",onChange:c,onBlur:i,value:u.lastname,margin:"normal",type:"text",defaultValue:""}),j.lastname&&a.lastname&&Object(T.jsx)(C.a,{error:!0,id:"standard-weight-helper-text--register",children:a.lastname})]}),Object(T.jsxs)(v.a,{fullWidth:!0,error:Boolean(j.username&&a.username),sx:Object(b.a)({},r.typography.customInput),children:[Object(T.jsx)(w.a,{htmlFor:"outlined-adornment-username-register",children:"User Name"}),Object(T.jsx)(y.a,{id:"outlined-adornment-username-register",name:"username",onChange:c,onBlur:i,value:u.username,type:"text",defaultValue:""}),j.username&&a.username&&Object(T.jsx)(C.a,{error:!0,id:"standard-weight-helper-text--register",children:a.username})]}),Object(T.jsxs)(v.a,{fullWidth:!0,error:Boolean(j.email&&a.email),sx:Object(b.a)({},r.typography.customInput),children:[Object(T.jsx)(w.a,{htmlFor:"outlined-adornment-email-register",children:"Email Address"}),Object(T.jsx)(y.a,{id:"outlined-adornment-email-register",type:"email",name:"email",value:u.email,onBlur:i,onChange:c,inputProps:{}}),j.email&&a.email&&Object(T.jsx)(C.a,{error:!0,id:"standard-weight-helper-text--register",children:a.email})]}),Object(T.jsxs)(v.a,{fullWidth:!0,error:Boolean(j.contactNumber&&a.contactNumber),sx:Object(b.a)({},r.typography.customInput),children:[Object(T.jsx)(w.a,{htmlFor:"outlined-adornment-contactNumber-register",children:"Contact Number"}),Object(T.jsx)(y.a,{id:"outlined-adornment-contactNumber-register",type:"number",name:"contactNumber",value:u.contactNumber,onBlur:i,onChange:c,inputProps:{}}),j.contactNumber&&a.contactNumber&&Object(T.jsx)(C.a,{error:!0,id:"standard-weight-helper-text--register",children:a.contactNumber})]}),Object(T.jsxs)(v.a,{fullWidth:!0,error:Boolean(j.password&&a.password),sx:Object(b.a)({},r.typography.customInput),children:[Object(T.jsx)(w.a,{htmlFor:"outlined-adornment-password-register",children:"Password"}),Object(T.jsx)(y.a,{id:"outlined-adornment-password-register",type:z?"text":"password",value:u.password,name:"password",label:"Password",onBlur:i,onChange:function(e){c(e),le(e.target.value)},endAdornment:Object(T.jsx)(k.a,{position:"end",children:Object(T.jsx)(P.a,{"aria-label":"toggle password visibility",onClick:se,onMouseDown:oe,edge:"end",size:"large",children:z?Object(T.jsx)(D.a,{}):Object(T.jsx)(G.a,{})})}),inputProps:{}}),j.password&&a.password&&Object(T.jsx)(C.a,{error:!0,id:"standard-weight-helper-text-password-register",children:a.password})]}),Object(T.jsxs)(v.a,{fullWidth:!0,error:Boolean(j.confirmPassword&&a.confirmPassword),sx:Object(b.a)({},r.typography.customInput),children:[Object(T.jsx)(w.a,{htmlFor:"outlined-adornment-cpassword-register",children:"Confirm Password"}),Object(T.jsx)(y.a,{id:"outlined-adornment-password-register",type:J?"text":"password",value:u.confirmPassword,name:"confirmPassword",label:"confirmPassword",onBlur:i,onChange:function(e){c(e),function(e){var t=H(e);ee(t),ae(F(t))}(e.target.value)},endAdornment:Object(T.jsx)(k.a,{position:"end",children:Object(T.jsx)(P.a,{"aria-label":"toggle password visibility",onClick:ce,onMouseDown:oe,edge:"end",size:"large",children:J?Object(T.jsx)(D.a,{}):Object(T.jsx)(G.a,{})})}),inputProps:{}}),j.password&&a.confirmPassword&&Object(T.jsx)(C.a,{error:!0,id:"standard-weight-helper-text-password-register",children:a.confirmPassword})]}),0!==Y&&Object(T.jsx)(v.a,{fullWidth:!0,children:Object(T.jsx)(f.a,{sx:{mb:2},children:Object(T.jsxs)(s.a,{container:!0,spacing:2,alignItems:"center",children:[Object(T.jsx)(s.a,{item:!0,children:Object(T.jsx)(f.a,{style:{backgroundColor:null===ne||void 0===ne?void 0:ne.color},sx:{width:85,height:8,borderRadius:"7px"}})}),Object(T.jsx)(s.a,{item:!0,children:Object(T.jsx)(o.a,{variant:"subtitle1",fontSize:"0.75rem",children:null===ne||void 0===ne?void 0:ne.label})})]})})}),Object(T.jsx)(s.a,{container:!0,alignItems:"center",justifyContent:"space-between",children:Object(T.jsx)(s.a,{item:!0,children:Object(T.jsx)(S.a,{control:Object(T.jsx)(N.a,{checked:$,onChange:function(e){return K(e.target.checked)},name:"checked",color:"primary"}),label:Object(T.jsxs)(o.a,{variant:"subtitle1",children:["Agree with \xa0",Object(T.jsx)(o.a,{variant:"subtitle1",component:n.b,to:"#",children:"Terms & Condition."})]})})})}),Object(T.jsx)(f.a,{sx:{mt:2},children:Object(T.jsx)(W.a,{children:Object(T.jsx)(g.a,{disableElevation:!0,disabled:d,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign up"})})})]}))}})]})},J=r(404);t.default=function(){var e=Object(a.a)(),t=Object(i.a)(e.breakpoints.down("md"));return Object(T.jsx)(d.a,{children:Object(T.jsxs)(s.a,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[Object(T.jsx)(s.a,{item:!0,xs:12,children:Object(T.jsx)(s.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:Object(T.jsx)(s.a,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:Object(T.jsx)(j.a,{children:Object(T.jsxs)(s.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[Object(T.jsx)(s.a,{item:!0,sx:{mb:3},children:Object(T.jsx)(n.b,{to:"#",children:Object(T.jsx)(u.a,{})})}),Object(T.jsx)(s.a,{item:!0,xs:12,children:Object(T.jsx)(s.a,{container:!0,direction:t?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:Object(T.jsx)(s.a,{item:!0,children:Object(T.jsxs)(c.a,{alignItems:"center",justifyContent:"center",spacing:1,children:[Object(T.jsx)(o.a,{color:e.palette.secondary.main,gutterBottom:!0,variant:t?"h3":"h2",children:"Sign up"}),Object(T.jsx)(o.a,{variant:"caption",fontSize:"16px",textAlign:t?"center":"inherit",children:"Enter your credentials to continue"})]})})})}),Object(T.jsx)(s.a,{item:!0,xs:12,children:Object(T.jsx)(_,{})}),Object(T.jsx)(s.a,{item:!0,xs:12,children:Object(T.jsx)(l.a,{})}),Object(T.jsx)(s.a,{item:!0,xs:12,children:Object(T.jsx)(s.a,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:Object(T.jsx)(o.a,{component:n.b,to:"/pages/login/login3",variant:"subtitle1",sx:{textDecoration:"none"},children:"Already have an account?"})})})]})})})})}),Object(T.jsx)(s.a,{item:!0,xs:12,sx:{m:3,mt:1},children:Object(T.jsx)(J.a,{})})]})})}}}]);
//# sourceMappingURL=9.69c2faab.chunk.js.map