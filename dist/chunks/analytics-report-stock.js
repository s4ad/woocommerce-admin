(window.__wcAdmin_webpackJsonp=window.__wcAdmin_webpackJsonp||[]).push([[17],{581:function(e,t,o){"use strict";o.r(t),o.d(t,"default",(function(){return B}));o(64);var r=o(22),n=o.n(r),c=o(23),a=o.n(c),i=o(24),u=o.n(i),l=o(25),s=o.n(l),m=o(14),d=o.n(m),f=o(0),b=o(1),p=o.n(b),_=o(2),y=o(141),k=Object(y.applyFilters)("woocommerce_admin_stock_report_filters",[{label:Object(_.__)("Show","woocommerce-admin"),staticParams:["paged","per_page"],param:"type",showFilters:function(){return!0},filters:[{label:Object(_.__)("All Products","woocommerce-admin"),value:"all"},{label:Object(_.__)("Out of Stock","woocommerce-admin"),value:"outofstock"},{label:Object(_.__)("Low Stock","woocommerce-admin"),value:"lowstock"},{label:Object(_.__)("In Stock","woocommerce-admin"),value:"instock"},{label:Object(_.__)("On Backorder","woocommerce-admin"),value:"onbackorder"}]}]),v=Object(y.applyFilters)("woocommerce_admin_stock_report_advanced_filters",{}),w=o(18),O=o.n(w),j=(o(51),o(129),o(132)),h=o(145),g=o(50),S=o(281),C=o(85),R=o(606);function q(e,t,o){return!!t&&(e&&t<=o==="instock")}var F=o(598);function E(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,r=d()(e);if(t){var n=d()(this).constructor;o=Reflect.construct(r,arguments,n)}else o=r.apply(this,arguments);return s()(this,o)}}var P=Object(C.g)("stockStatuses",{}),V=function(e){u()(o,e);var t=E(o);function o(){var e;return n()(this,o),(e=t.call(this)).getHeadersContent=e.getHeadersContent.bind(O()(e)),e.getRowsContent=e.getRowsContent.bind(O()(e)),e.getSummary=e.getSummary.bind(O()(e)),e}return a()(o,[{key:"getHeadersContent",value:function(){return[{label:Object(_.__)("Product / Variation","woocommerce-admin"),key:"title",required:!0,isLeftAligned:!0,isSortable:!0},{label:Object(_.__)("SKU","woocommerce-admin"),key:"sku",isSortable:!0},{label:Object(_.__)("Status","woocommerce-admin"),key:"stock_status",isSortable:!0,defaultSort:!0},{label:Object(_.__)("Stock","woocommerce-admin"),key:"stock_quantity",isSortable:!0}]}},{key:"getRowsContent",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],o=this.props.query,r=Object(g.getPersistedQuery)(o);return t.map((function(t){var o=t.id,n=t.manage_stock,c=t.parent_id,a=t.sku,i=t.stock_quantity,u=t.stock_status,l=t.low_stock_amount,s=Object(j.decodeEntities)(t.name),m=Object(g.getNewPath)(r,"/analytics/products",{filter:"single_product",products:c||o}),d=Object(f.createElement)(h.Link,{href:m,type:"wc-admin"},s),b=Object(C.f)("post.php?action=edit&post="+(c||o));return[{display:d,value:s},{display:a,value:a},{display:q(u,i,l)?Object(f.createElement)(h.Link,{href:b,type:"wp-admin"},Object(_._x)("Low","Indication of a low quantity","woocommerce-admin")):Object(f.createElement)(h.Link,{href:b,type:"wp-admin"},P[u]),value:u},{display:n?Object(S.formatValue)(e.context.getCurrencyConfig(),"number",i):Object(_.__)("N/A","woocommerce-admin"),value:i}]}))}},{key:"getSummary",value:function(e){var t=e.products,o=void 0===t?0:t,r=e.outofstock,n=void 0===r?0:r,c=e.lowstock,a=void 0===c?0:c,i=e.instock,u=void 0===i?0:i,l=e.onbackorder,s=void 0===l?0:l,m=this.context.getCurrencyConfig();return[{label:Object(_._n)("product","products",o,"woocommerce-admin"),value:Object(S.formatValue)(m,"number",o)},{label:Object(_.__)("out of stock","woocommerce-admin"),value:Object(S.formatValue)(m,"number",n)},{label:Object(_.__)("low stock","woocommerce-admin"),value:Object(S.formatValue)(m,"number",a)},{label:Object(_.__)("on backorder","woocommerce-admin"),value:Object(S.formatValue)(m,"number",s)},{label:Object(_.__)("in stock","woocommerce-admin"),value:Object(S.formatValue)(m,"number",u)}]}},{key:"render",value:function(){var e=this.props,t=e.advancedFilters,o=e.filters,r=e.query;return Object(f.createElement)(R.a,{endpoint:"stock",getHeadersContent:this.getHeadersContent,getRowsContent:this.getRowsContent,getSummary:this.getSummary,summaryFields:["products","outofstock","lowstock","instock","onbackorder"],query:r,tableQuery:{orderby:r.orderby||"stock_status",order:r.order||"asc",type:r.type||"all"},title:Object(_.__)("Stock","woocommerce-admin"),filters:o,advancedFilters:t})}}]),o}(f.Component);V.contextType=F.a;var x=V,L=o(605);function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,r=d()(e);if(t){var n=d()(this).constructor;o=Reflect.construct(r,arguments,n)}else o=r.apply(this,arguments);return s()(this,o)}}var B=function(e){u()(o,e);var t=A(o);function o(){return n()(this,o),t.apply(this,arguments)}return a()(o,[{key:"render",value:function(){var e=this.props,t=e.query,o=e.path;return Object(f.createElement)(f.Fragment,null,Object(f.createElement)(L.a,{query:t,path:o,showDatePicker:!1,filters:k,advancedFilters:v,report:"stock"}),Object(f.createElement)(x,{query:t,filters:k,advancedFilters:v}))}}]),o}(f.Component);B.propTypes={query:p.a.object.isRequired}}}]);