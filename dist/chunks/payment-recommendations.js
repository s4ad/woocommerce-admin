(window.__wcAdmin_webpackJsonp=window.__wcAdmin_webpackJsonp||[]).push([[45],{510:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var c=n(7);function o(e){const{createNotice:t}=Object(c.dispatch)("core/notices");e.error_data&&e.errors&&Object.keys(e.errors).length?Object.keys(e.errors).forEach(n=>{t("error",e.errors[n].join(" "))}):e.message&&t(e.code?"error":"success",e.message)}},543:function(e,t,n){"use strict";var c=Object.assign||function(e){for(var t,n=1;n<arguments.length;n++)for(var c in t=arguments[n])Object.prototype.hasOwnProperty.call(t,c)&&(e[c]=t[c]);return e};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.size,o=void 0===n?24:n,r=e.onClick,i=(e.icon,e.className),s=function(e,t){var n={};for(var c in e)0<=t.indexOf(c)||Object.prototype.hasOwnProperty.call(e,c)&&(n[c]=e[c]);return n}(e,["size","onClick","icon","className"]),m=["gridicon","gridicons-external",i,(t=o,!(0!=t%18)&&"needs-offset"),!1,!1].filter(Boolean).join(" ");return a.default.createElement("svg",c({className:m,height:o,width:o,onClick:r},s,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}),a.default.createElement("g",null,a.default.createElement("path",{d:"M19 13v6c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V7c0-1.105.895-2 2-2h6v2H5v12h12v-6h2zM13 3v2h4.586l-7.793 7.793 1.414 1.414L19 6.414V11h2V3h-8z"})))};var o,r=n(5),a=(o=r)&&o.__esModule?o:{default:o};e.exports=t.default},607:function(e,t,n){},626:function(e,t,n){"use strict";n.r(t),n.d(t,"getPaymentRecommendationData",(function(){return g}));var c=n(0),o=n(2),r=n(7),a=n(30),i=n(3),s=n(21),m=n(17),d=n(11),l=n(16),u=n(543),p=n.n(u),_=n(14),b=(n(607),n(510));function g(e){const{getRecommendedPlugins:t}=e(d.PLUGINS_STORE_NAME),n=t("payments");return{recommendedPlugins:n,isLoading:void 0===n}}const O=document.querySelector('[data-gateway_id="pre_install_woocommerce_payments_promotion"]');t.default=()=>{const[e,t]=Object(c.useState)(null),{installAndActivatePlugins:n,dismissRecommendedPlugins:u,invalidateResolution:w}=Object(r.useDispatch)(d.PLUGINS_STORE_NAME),{createNotice:j}=Object(r.useDispatch)("core/notices"),{recommendedPlugins:h,isLoading:f}=Object(r.useSelect)(g),y=Object(c.useRef)(!1),v=h&&h.length>0;if(Object(c.useEffect)(()=>{if((v||O&&!f)&&!y.current){y.current=!0;const e=(h||[]).reduce((e,t)=>t.plugins&&t.plugins.length>0?{...e,[t.plugins[0].replace(/\-/g,"_")+"_displayed"]:!0}:e,{woocommerce_payments_displayed:!!O});Object(l.recordEvent)("settings_payments_recommendations_pageview",e)}},[v,O,f]),!v)return null;const E=async()=>{Object(l.recordEvent)("settings_payments_recommendations_dismiss",{});await u("payments")?w("getRecommendedPlugins",["payments"]):j("error",Object(o.__)('There was a problem hiding the "Recommended ways to get paid" card.',"woocommerce-admin"))},k=(h||[]).map(r=>({key:r.id,title:Object(c.createElement)(c.Fragment,null,r.title,r.recommended&&Object(c.createElement)(s.Pill,null,Object(o.__)("Recommended","woocommerce-admin"))),content:Object(a.decodeEntities)(r.content),after:Object(c.createElement)(i.Button,{isSecondary:!0,onClick:()=>(c=>{e||(t(c.id),Object(l.recordEvent)("settings_payments_recommendations_setup",{extension_selected:c.plugins[0]}),n([c.plugins[0]]).then(()=>{window.location.href=Object(_.getAdminLink)(c["setup-link"].replace("/wp-admin/",""))}).catch(e=>{Object(b.a)(e),t(null)}))})(r),isBusy:e===r.id,disabled:!!e},r["button-text"]),before:Object(c.createElement)("img",{src:r.image,alt:""})}));return Object(c.createElement)(i.Card,{size:"medium",className:"woocommerce-recommended-payments-card"},Object(c.createElement)(i.CardHeader,null,Object(c.createElement)("div",{className:"woocommerce-recommended-payments-card__header"},Object(c.createElement)(m.Text,{variant:"title.small",as:"p",size:"20",lineHeight:"28px"},Object(o.__)("Recommended ways to get paid","woocommerce-admin")),Object(c.createElement)(m.Text,{className:"woocommerce-recommended-payments__header-heading",variant:"caption",as:"p",size:"12",lineHeight:"16px"},Object(o.__)('We recommend adding one of the following payment extensions to your store. The extension will be installed and activated for you when you click "Get started".',"woocommerce-admin"))),Object(c.createElement)("div",{className:"woocommerce-card__menu woocommerce-card__header-item"},Object(c.createElement)(s.EllipsisMenu,{label:Object(o.__)("Task List Options","woocommerce-admin"),renderContent:()=>Object(c.createElement)("div",{className:"woocommerce-review-activity-card__section-controls"},Object(c.createElement)(i.Button,{onClick:E},Object(o.__)("Hide this","woocommerce-admin")))}))),Object(c.createElement)(s.List,{items:k}),Object(c.createElement)(i.CardFooter,null,Object(c.createElement)(i.Button,{href:"https://woocommerce.com/product-category/woocommerce-extensions/payment-gateways/?utm_source=payments_recommendations",target:"_blank",isTertiary:!0},Object(o.__)("See more options","woocommerce-admin"),Object(c.createElement)(p.a,{size:18}))))}}}]);