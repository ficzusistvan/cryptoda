(this.webpackJsonpcryptoda=this.webpackJsonpcryptoda||[]).push([[0],{239:function(e){e.exports=JSON.parse('{"zabo":{"sandbox":{"clientId":"MQKPuN4bzSaG54NcBTgLBUEHhzNLaHuh8WhtrsvGP6LVNcGAzywa7qGF25rYqk8L"},"live":{"clientId":"GdyLlPozx0TmPA0N7W8vpF9sI5XlqyLZ7fa9evsGRgjthe6Yn5ZrbOAikyUknKFx"}}}')},258:function(e,t,a){},293:function(e,t){},295:function(e,t){},309:function(e,t){},311:function(e,t){},330:function(e,t){},332:function(e,t){},360:function(e,t){},362:function(e,t){},363:function(e,t){},368:function(e,t){},370:function(e,t){},389:function(e,t){},401:function(e,t){},404:function(e,t){},508:function(e,t,a){},509:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a(1),r=a.n(n),s=a(29),o=a.n(s),i=(a(253),a(78));var l="SET_TEST",u=(Object(i.b)((function(e){return{test:e.testConfigs.test}}),(function(e){return{onSetTest:function(){e({type:l})}}}))((function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("h1",{children:"TTETSTTSTSTSTSTSTST"})})})),a(527)),j=a(511),d=a(512),b=a(23),p=(a(258),a(24)),O=a.n(p);a(82);function h(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsx)("h1",{children:"HomePage"})})})})}var x=a(17),f=a.n(x),m=a(25),g=a(14),v=a(6),y=a(26),S=a(35),C=a(18),_=a(513),w=function(){return{}};function P(e){var t=e.data,a=e.fetchData,s=e.loading,o=e.pageCount,i=e.getCellProps,l=void 0===i?w:i,u=r.a.useMemo((function(){return[{Header:"Rank",accessor:"cmc_rank"},{Header:"Name",accessor:"name",Cell:function(e){var t=e.row;return Object(c.jsx)(y.b,{href:"/cryptos/".concat(t.values.symbol),children:Object(c.jsx)("a",{children:t.values.name})})}},{Header:"Symbol",accessor:"symbol"},{Header:"Market capitalization",accessor:"quote.USD.market_cap",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values["quote.USD.market_cap"],displayType:"text",thousandSeparator:!0,prefix:"$"})}},{Header:"Circulating supply",accessor:"circulating_supply",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.circulating_supply,displayType:"text",thousandSeparator:!0})}},{Header:"Total supply",accessor:"total_supply",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.total_supply,displayType:"text",thousandSeparator:!0})}},{Header:"Max supply",accessor:"max_supply",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.max_supply,displayType:"text",thousandSeparator:!0})}},{Header:"Price",accessor:"quote.USD.price",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values["quote.USD.price"],displayType:"text",thousandSeparator:!0,prefix:"$",decimalScale:2})}},{Header:"Volume 24h",accessor:"quote.USD.volume_24h",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values["quote.USD.volume_24h"],displayType:"text",thousandSeparator:!0,prefix:"$"})}},{Header:"%1h",accessor:"quote.USD.percent_change_1h",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values["quote.USD.percent_change_1h"],displayType:"text",thousandSeparator:!0,suffix:"%",decimalScale:2})}},{Header:"%24h",accessor:"quote.USD.percent_change_24h",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values["quote.USD.percent_change_24h"],displayType:"text",thousandSeparator:!0,prefix:"%",decimalScale:2})}},{Header:"%7d",accessor:"quote.USD.percent_change_7d",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values["quote.USD.percent_change_7d"],displayType:"text",thousandSeparator:!0,prefix:"%",decimalScale:2})}}]}),[]),j=Object(S.useTable)({columns:u,data:t,initialState:{pageIndex:0},manualPagination:!0,pageCount:o},S.usePagination),d=j.getTableProps,b=j.getTableBodyProps,p=j.headerGroups,O=j.rows,h=j.prepareRow,x=j.page,f=j.canPreviousPage,m=j.canNextPage,g=j.pageOptions,P=j.pageCount,T=j.gotoPage,k=j.nextPage,U=j.previousPage,H=j.setPageSize,D=j.state,N=D.pageIndex,E=D.pageSize;return Object(n.useEffect)((function(){a({pageIndex:N,pageSize:E})}),[a,N,E]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("div",{children:Object(c.jsxs)("table",Object(v.a)(Object(v.a)({},d()),{},{className:"table table-hover",size:"small",children:[Object(c.jsx)("thead",{children:p.map((function(e){return Object(c.jsx)("tr",Object(v.a)(Object(v.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(c.jsx)("th",Object(v.a)(Object(v.a)({scope:"col"},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(c.jsxs)("tbody",Object(v.a)(Object(v.a)({},b()),{},{children:[O.map((function(e,t){return h(e),Object(c.jsx)("tr",Object(v.a)(Object(v.a)({className:"table-primary"},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(c.jsx)("td",Object(v.a)(Object(v.a)({},e.getCellProps([{className:"symbol"===e.column.id||"quote.USD.price"===e.column.id?"text-info":"quote.USD.percent_change_1h"===e.column.id||"quote.USD.percent_change_24h"===e.column.id||"quote.USD.percent_change_7d"===e.column.id?e.value>=0?"text-success":"text-danger":e.column.className},l(e)])),{},{children:e.render("Cell")}))}))}))})),Object(c.jsx)("tr",{children:s?Object(c.jsx)("td",{colSpan:"10000",children:"Loading..."}):Object(c.jsxs)("td",{colSpan:"10000",children:["Showing ",x.length," of ~",o*E," ","results"]})})]}))]}))}),Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"text-center",children:["Page"," ",Object(c.jsxs)("strong",{children:[N+1," of ",g.length]})]}),Object(c.jsx)(_.a,{min:0,value:N+1,max:g.length})]}),Object(c.jsxs)("div",{class:"btn-group",role:"group","aria-label":"Basic example",children:[Object(c.jsx)("button",{type:"button",class:"btn btn-secondary",onClick:function(){return T(0)},disabled:!f,children:"<<"}),Object(c.jsx)("button",{type:"button",class:"btn btn-secondary",onClick:function(){return U()},disabled:!f,children:"<"}),Object(c.jsx)("button",{type:"button",class:"btn btn-secondary",onClick:function(){return k()},disabled:!m,children:">"}),Object(c.jsx)("button",{type:"button",class:"btn btn-secondary",onClick:function(){return T(P-1)},disabled:!m,children:">>"})]}),Object(c.jsxs)("span",{children:[" ","| Go to page:"," ",Object(c.jsx)("input",{type:"number",defaultValue:N+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;T(t)},style:{width:"100px"}})]})," ",Object(c.jsx)("select",{value:E,onChange:function(e){H(Number(e.target.value))},children:[10,20,30,40,50].map((function(e){return Object(c.jsxs)("option",{value:e,children:["Show ",e]},e)}))})]})}function T(){var e=Object(n.useState)([]),t=Object(g.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(!1),o=Object(g.a)(s,2),i=o[0],l=o[1],u=Object(n.useState)(0),b=Object(g.a)(u,2),p=b[0],h=b[1],x=Object(n.useRef)(0),v=Object(n.useCallback)(function(){var e=Object(m.a)(f.a.mark((function e(t){var a,c,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,c=t.pageIndex,++x.current,l(!0),e.next=5,O.a.get("api/rates",{params:{pageIndex:c,pageSize:a}});case 5:n=e.sent,r(n.data),h(Math.ceil(1e3/a)),l(!1);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsx)("h1",{children:"Today's Cryptocurrency Prices by Market Cap"})})}),Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsx)(P,{data:a,fetchData:v,loading:i,pageCount:p})})})]})}var k=a(74),U=a(240),H=a(238),D=a.n(H),N=a(239),E=function(){return{}},R=["text-secondary","text-warning","text-danger","text-success","text-info"],M=new Map,q=new Map,F=0,z=0;function B(e){var t=e.data,a=e.loading,n=e.getCellProps,s=void 0===n?E:n,o=r.a.useMemo((function(){return[{Header:"Wallet",accessor:"type"},{Header:"Symbol",accessor:"symbol"},{Header:"Balance",accessor:"balance",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.balance,displayType:"text",thousandSeparator:!0})}},{Header:"Price in USD",accessor:"price_in_USD",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.price_in_USD,displayType:"text",thousandSeparator:!0,prefix:"$",decimalScale:2})}},{Header:"Value in USD",accessor:"value_in_USD",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.value_in_USD,displayType:"text",thousandSeparator:!0,prefix:"$",decimalScale:2})}},{Header:"Price in EUR",accessor:"price_in_EUR",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.price_in_EUR,displayType:"text",thousandSeparator:!0,suffix:" EUR",decimalScale:2})}},{Header:"Value in EUR",accessor:"value_in_EUR",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.value_in_EUR,displayType:"text",thousandSeparator:!0,suffix:" EUR",decimalScale:2})}}]}),[]),i=Object(S.useTable)({columns:o,data:t}),l=i.getTableProps,u=i.getTableBodyProps,j=i.headerGroups,d=i.rows,b=i.prepareRow;return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{children:Object(c.jsxs)("table",Object(v.a)(Object(v.a)({},l()),{},{className:"table table-hover",size:"small",children:[Object(c.jsx)("thead",{children:j.map((function(e){return Object(c.jsx)("tr",Object(v.a)(Object(v.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(c.jsx)("th",Object(v.a)(Object(v.a)({scope:"col"},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(c.jsxs)("tbody",Object(v.a)(Object(v.a)({},u()),{},{children:[d.map((function(e,t){return b(e),Object(c.jsx)("tr",Object(v.a)(Object(v.a)({className:"table-primary"},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(c.jsx)("td",Object(v.a)(Object(v.a)({},e.getCellProps([{className:"type"===e.column.id?(M.has(e.value)||(M.set(e.value,R[F++]),F>R.length-1&&(F=0)),M.get(e.value)):"symbol"===e.column.id?(q.has(e.value)||(q.set(e.value,R[z++]),z>R.length-1&&(z=0)),q.get(e.value)):"value_in_USD"===e.column.id||"value_in_EUR"===e.column.id?"text-success":e.column.className},s(e)])),{},{children:e.render("Cell")}))}))}))})),Object(c.jsx)("tr",{children:a&&Object(c.jsx)("td",{colSpan:"10000",children:"Loading..."})})]}))]}))})})}function I(){var e=Object(n.useState)([]),t=Object(g.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(0),o=Object(g.a)(s,2),i=o[0],l=o[1],u=Object(n.useState)(0),b=Object(g.a)(u,2),p=b[0],h=b[1],x=Object(n.useState)(!1),v=Object(g.a)(x,2),y=v[0],S=v[1],_=Object(n.useRef)();return Object(n.useEffect)((function(){console.log("useEffect 1 called..."),S(!0),function(){var e=Object(m.a)(f.a.mark((function e(){var t,a,c,n,s,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("api/portfolio");case 2:t=e.sent,a=0,c=0,n=Object(k.a)(t.data);try{for(n.s();!(s=n.n()).done;)o=s.value,a+=Number(o.value_in_USD),c+=Number(o.value_in_EUR)}catch(i){n.e(i)}finally{n.f()}r(t.data),l(a),h(c);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),S(!1)}),[]),Object(n.useEffect)((function(){console.log("useEffect 2 called..."),function(){var e=Object(m.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("init zabo"),e.next=3,D.a.init({clientId:N.zabo.live.clientId,env:"live"});case 3:_.current=e.sent;case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsx)("h1",{children:"Current Portfolio"})})}),Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsxs)("div",{class:"alert alert-success",children:[Object(c.jsxs)("p",{children:["Total balance in USD: ",Object(c.jsx)("strong",{children:Object(c.jsx)(C.a,{value:i,displayType:"text",thousandSeparator:!0,prefix:"$",decimalScale:2})})]}),Object(c.jsxs)("p",{children:["Total balance in Euro: ",Object(c.jsx)("strong",{children:Object(c.jsx)(C.a,{value:p,displayType:"text",thousandSeparator:!0,suffix:" EUR",decimalScale:2})})]})]})})}),Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsx)(U.a,{color:"primary",onClick:function(e){_.current.connect({provider:"blockFi"}).onConnection(function(){var e=Object(m.a)(f.a.mark((function e(t){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("api/zabo/create-zabo-user",{userId:"myliveuser",account:t});case 2:return a=e.sent,console.log("Created user: ",a.data),e.next=6,O.a.post("/api/portfolio",{});case 6:e.sent,console.log("Portfolio update run");case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).onError((function(e){console.error("account connection error:",e)}))},children:"Connect to Zabo for BlockFi access"})})}),Object(c.jsx)(B,{data:a,loading:y})]})}var G=a(241),L=a(242);a(414);function A(e){var t=e.children,a=e.width,n=void 0===a?1e3:a,r=e.height,s=void 0===r?600:r,o=e.resizable,i=void 0===o||o,l=e.style,u=void 0===l?{}:l,j=e.className;return Object(c.jsx)("div",{children:i?Object(c.jsx)(L.ResizableBox,{width:n,height:s,children:Object(c.jsx)("div",{style:Object(v.a)(Object(v.a)({},u),{},{width:"100%",height:"100%"}),className:j,children:t})}):Object(c.jsx)("div",{style:Object(v.a)({width:"".concat(n,"px"),height:"".concat(s,"px")},u),className:j,children:t})})}var $=a(125);function V(){var e=Object(n.useState)([]),t=Object(g.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)([]),o=Object(g.a)(s,2),i=o[0],l=o[1],u=Object(n.useState)(!1),b=Object(g.a)(u,2),p=(b[0],b[1]);Object(n.useEffect)((function(){console.log("useEffect 1 called..."),p(!0),function(){var e=Object(m.a)(f.a.mark((function e(){var t,a,c,n,s,o,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("api/portfolio/history");case 2:t=e.sent,a=t.data.map((function(e){return[e.timestamp,e.portfolio_in_USD]})),c=Object($.LTTB)(a,10),n=c.map((function(e){var t=new Date(e[0]);return t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),{primary:t,secondary:e[1]}})),r(n),s=t.data.map((function(e){return[e.timestamp,e.portfolio_in_EUR]})),o=Object($.LTTB)(s,10),i=o.map((function(e){var t=new Date(e[0]);return t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),{primary:t,secondary:e[1]}})),l(i);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),p(!1)}),[]);var h=Object(n.useMemo)((function(){return[{label:"USD price",data:a},{label:"EUR price",data:i}]}),[a,i]),x=Object(n.useMemo)((function(){return{showPoints:!0}}),[]),v=Object(n.useMemo)((function(){return[{primary:!0,type:"time",position:"bottom"},{type:"linear",position:"left"}]}),[]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsx)("h1",{children:"Portfolio History"})})}),Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:a.length>0&&i.length>0&&Object(c.jsx)(A,{children:Object(c.jsx)(G.Chart,{data:h,series:x,axes:v,tooltip:!0})})})})]})}var X=a(514),J=a(515),W=a(516),K=a(517),Z=a(518),Q=function(){return{}},Y=["text-secondary","text-warning","text-danger","text-success","text-info"],ee=new Map,te=0;function ae(e){var t=e.data,a=e.loading,n=e.getCellProps,s=void 0===n?Q:n,o=r.a.useMemo((function(){return[{Header:"To",accessor:"to"},{Header:"Amount",accessor:"amount",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.amount,displayType:"text",thousandSeparator:!0,decimalScale:2})}},{Header:"Currency",accessor:"currency"},{Header:"in USD",accessor:"inUSD",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.inUSD,displayType:"text",thousandSeparator:!0,decimalScale:2,prefix:"$"})}},{Header:"Timestamp",accessor:"timestamp"}]}),[]),i=Object(S.useTable)({columns:o,data:t}),l=i.getTableProps,u=i.getTableBodyProps,j=i.headerGroups,d=i.rows,b=i.prepareRow;return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{children:Object(c.jsxs)("table",Object(v.a)(Object(v.a)({},l()),{},{className:"table table-hover",size:"small",children:[Object(c.jsx)("thead",{children:j.map((function(e){return Object(c.jsx)("tr",Object(v.a)(Object(v.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(c.jsx)("th",Object(v.a)(Object(v.a)({scope:"col"},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(c.jsxs)("tbody",Object(v.a)(Object(v.a)({},u()),{},{children:[d.map((function(e,t){return b(e),Object(c.jsx)("tr",Object(v.a)(Object(v.a)({className:"table-primary"},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(c.jsx)("td",Object(v.a)(Object(v.a)({},e.getCellProps([{className:"to"===e.column.id?(ee.has(e.value)||(ee.set(e.value,Y[te++]),te>Y.length-1&&(te=0)),ee.get(e.value)):"amount"===e.column.id?"text-info":"inUSD"===e.column.id?"text-success":e.column.className},s(e)])),{},{children:e.render("Cell")}))}))}))})),Object(c.jsx)("tr",{children:a&&Object(c.jsx)("td",{colSpan:"10000",children:"Loading..."})})]}))]}))})})}var ce=a(243),ne=a.n(ce);function re(){var e=Object(n.useState)([]),t=Object(g.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(0),o=Object(g.a)(s,2),i=o[0],l=o[1],u=Object(n.useState)(!1),b=Object(g.a)(u,2),p=b[0],h=b[1],x=Object(n.useState)(0),v=Object(g.a)(x,2),y=v[0],S=v[1],_=Object(n.useState)("EUR"),w=Object(g.a)(_,2),P=w[0],T=w[1],H=Object(n.useState)("binance"),D=Object(g.a)(H,2),N=D[0],E=D[1],R=Object(n.useState)(new Date),M=Object(g.a)(R,2),q=M[0],F=M[1],z=Object(n.useState)(!1),B=Object(g.a)(z,2),I=B[0],G=B[1],L=function(){var e=Object(m.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("api/portfolio/investment",{amount:y,currency:P,to:N,timestamp:q});case 2:t=e.sent,G(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){console.log("useEffect 1 called..."),h(!0),function(){var e=Object(m.a)(f.a.mark((function e(){var t,a,c,n,s,o,i,u,j,d;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("http://api.exchangeratesapi.io/latest?symbols=USD,EUR,RON&access_key=17881812858dd74e212685251cfffebf");case 2:return t=e.sent,console.log(t.data),a=t.data.rates,e.next=7,O.a.get("api/portfolio/investment");case 7:c=e.sent,n=[],s=0,o=Object(k.a)(c.data);try{for(o.s();!(i=o.n()).done;)u=i.value,j=u,d=a[u.currency]/a.USD,j.inUSD=Number(u.amount)/d,n.push(j),s+=j.inUSD}catch(b){o.e(b)}finally{o.f()}r(n),l(s);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),h(!1)}),[I]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsx)("h1",{children:"Investments"})})}),Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsxs)("div",{class:"alert alert-success",children:["Total invested: ",Object(c.jsx)("strong",{children:Object(c.jsx)(C.a,{value:i,displayType:"text",thousandSeparator:!0,prefix:"$",decimalScale:2})})]})})}),Object(c.jsx)(ae,{data:a,loading:p}),Object(c.jsx)(X.a,{children:Object(c.jsxs)(J.a,{children:[Object(c.jsxs)(W.a,{children:[Object(c.jsx)(K.a,{for:"amount",children:"Amount"}),Object(c.jsx)(Z.a,{type:"number",name:"amount",id:"amount",placeholder:"0",value:y,onChange:function(e){return S(e.target.value)}})]}),Object(c.jsxs)(W.a,{children:[Object(c.jsx)(K.a,{for:"currency",children:"Currency"}),Object(c.jsx)(Z.a,{type:"currency",name:"text",id:"currency",placeholder:"EUR",value:P,onChange:function(e){return T(e.target.value)}})]}),Object(c.jsxs)(W.a,{children:[Object(c.jsx)(K.a,{for:"to",children:"To"}),Object(c.jsx)(Z.a,{type:"to",name:"text",id:"to",placeholder:"Binance",value:N,onChange:function(e){return E(e.target.value)}})]}),Object(c.jsxs)(W.a,{children:[Object(c.jsx)(K.a,{for:"investmentDate",children:"Investment date"}),Object(c.jsx)(ne.a,{selected:q,onChange:function(e){return F(e)}})]}),Object(c.jsx)(U.a,{onClick:L,children:"Add investment"})]})})]})}var se=function(){return{}},oe=["text-secondary","text-warning","text-danger","text-success","text-info"],ie=new Map,le=0;function ue(e){var t=e.data,a=e.loading,n=e.getCellProps,s=void 0===n?se:n,o=r.a.useMemo((function(){return[{Header:"Name",accessor:"currency"},{Header:"Quantity to buy",accessor:"quantityToBuy"},{Header:"Current price",accessor:"currentPrice",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.currentPrice,displayType:"text",thousandSeparator:!0,prefix:"$",decimalScale:2})}},{Header:"Adjusted percent",accessor:"percent",Cell:function(e){var t=e.row;return Object(c.jsx)(C.a,{value:t.values.percent,displayType:"text",thousandSeparator:!0,decimalScale:3})}}]}),[]),i=Object(S.useTable)({columns:o,data:t}),l=i.getTableProps,u=i.getTableBodyProps,j=i.headerGroups,d=i.rows,b=i.prepareRow;return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{children:Object(c.jsxs)("table",Object(v.a)(Object(v.a)({},l()),{},{className:"table table-hover",size:"small",children:[Object(c.jsx)("thead",{children:j.map((function(e){return Object(c.jsx)("tr",Object(v.a)(Object(v.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(c.jsx)("th",Object(v.a)(Object(v.a)({scope:"col"},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(c.jsxs)("tbody",Object(v.a)(Object(v.a)({},u()),{},{children:[d.map((function(e,t){return b(e),Object(c.jsx)("tr",Object(v.a)(Object(v.a)({className:"table-primary"},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(c.jsx)("td",Object(v.a)(Object(v.a)({},e.getCellProps([{className:"name"===e.column.id?(ie.has(e.value)||(ie.set(e.value,oe[le++]),le>oe.length-1&&(le=0)),ie.get(e.value)):e.column.className},s(e)])),{},{children:e.render("Cell")}))}))}))})),Object(c.jsx)("tr",{children:a&&Object(c.jsx)("td",{colSpan:"10000",children:"Loading..."})})]}))]}))})})}function je(){var e=Object(n.useState)({}),t=Object(g.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)([]),o=Object(g.a)(s,2),i=o[0],l=o[1],u=Object(n.useState)(!1),b=Object(g.a)(u,2),p=b[0],h=b[1];return Object(n.useEffect)((function(){console.log("useEffect 1 called..."),h(!0),function(){var e=Object(m.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("api/dca/config");case 2:t=e.sent,console.log(t.data),r(t.data.dcaConfig),l(t.data.entries);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),h(!1)}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsx)("h1",{children:"Fiat currency cost averaging configuration"})})}),Object(c.jsxs)(J.a,{children:[Object(c.jsx)("h3",{children:"Configure bot"}),Object(c.jsxs)(W.a,{check:!0,children:[Object(c.jsx)(Z.a,{type:"checkbox",name:"enable-bot-check",id:"enable-bot-check",checked:a.is_enabled}),Object(c.jsx)(K.a,{for:"enable-bot-check",check:!0,children:"Enable bot"})]}),Object(c.jsxs)(j.a,{form:!0,children:[Object(c.jsx)(d.a,{md:3,children:Object(c.jsxs)(W.a,{children:[Object(c.jsx)(K.a,{for:"amount-to-spend",children:"Amount to spend"}),Object(c.jsx)(Z.a,{type:"number",name:"amount-to-spend",id:"amount-to-spend",value:a.amount_to_spend})]})}),Object(c.jsx)(d.a,{md:3,children:Object(c.jsxs)(W.a,{children:[Object(c.jsx)(K.a,{for:"currency-to-spend",children:"Currency to spend"}),Object(c.jsx)(Z.a,{type:"text",name:"currency-to-spend",id:"currency-to-spend",value:a.currency_to_spend})]})}),Object(c.jsx)(d.a,{md:3,children:Object(c.jsxs)(W.a,{children:[Object(c.jsx)(K.a,{for:"buying-frequency",children:"Buying frequency"}),Object(c.jsx)(Z.a,{type:"text",name:"buying-frequency",id:"buying-frequency",value:a.buying_frequency})]})}),Object(c.jsx)(d.a,{md:3,children:Object(c.jsxs)(W.a,{children:[Object(c.jsx)(K.a,{for:"exchange-to-use",children:"Exchange to use"}),Object(c.jsxs)(Z.a,{type:"select",name:"select",id:"exchange-to-use",children:[Object(c.jsx)("option",{value:"binance",selected:"binance"===a.exchange_to_use,children:"Binance"}),Object(c.jsx)("option",{value:"coinbase",selected:"coinbase"===a.exchange_to_use,children:"Coinbase"})]})]})})]}),Object(c.jsx)("h3",{children:"Configure buying strategy"}),Object(c.jsx)(j.a,{form:!0,children:Object(c.jsx)(d.a,{md:3,children:Object(c.jsxs)(W.a,{children:[Object(c.jsx)(K.a,{for:"strategy",children:"Select strategy:"}),Object(c.jsxs)(Z.a,{type:"select",name:"select",id:"strategy",children:[Object(c.jsx)("option",{value:"top 5 crypto by market cap",selected:"top 5 crypto by market cap"===a.strategy_to_use,children:"Top 5 crypto by market cap"}),Object(c.jsx)("option",{value:"selected cryptos",selected:"selected cryptos"===a.strategy_to_use,children:"Selected cryptos"})]})]})})}),Object(c.jsx)(j.a,{form:!0,children:Object(c.jsx)(d.a,{md:3,children:Object(c.jsx)(U.a,{block:!0,color:"primary",children:"Save configuration"})})})]}),Object(c.jsx)("h4",{children:"Strategy current result:"}),Object(c.jsx)(ue,{data:i,loading:p})]})}var de=a(73),be={Cell:function(e){var t=e.value,a=e.row.index,r=e.column.id,s=e.updateMyData,o=Object(n.useState)(t),i=Object(g.a)(o,2),l=i[0],u=i[1];return Object(n.useEffect)((function(){u(t)}),[t]),Object(c.jsx)(Z.a,{value:l,onChange:function(e){u(e.target.value)},onBlur:function(){s(a,r,l)}})}};function pe(e){var t=e.data,a=e.updateMyData,n=e.skipPageReset,s=r.a.useMemo((function(){return[{Header:"Name",accessor:"type"},{Header:"Address",accessor:"address"},{Header:"Api Key",accessor:"api_key"},{Header:"Secret Key",accessor:"secret_key"},{Header:"Is CEX?",accessor:"is_cex"}]}),[]),o=Object(S.useTable)({columns:s,data:t,defaultColumn:be,autoResetPage:!n,updateMyData:a},S.usePagination),i=o.getTableProps,l=o.getTableBodyProps,u=o.headerGroups,j=o.prepareRow,d=o.page,b=o.canPreviousPage,p=o.canNextPage,O=o.pageOptions,h=o.pageCount,x=o.gotoPage,f=o.nextPage,m=o.previousPage,g=o.setPageSize,y=o.state,C=y.pageIndex,w=y.pageSize;return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("div",{children:Object(c.jsxs)("table",Object(v.a)(Object(v.a)({},i()),{},{children:[Object(c.jsx)("thead",{children:u.map((function(e){return Object(c.jsx)("tr",Object(v.a)(Object(v.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(c.jsx)("th",Object(v.a)(Object(v.a)({},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(c.jsx)("tbody",Object(v.a)(Object(v.a)({},l()),{},{children:d.map((function(e,t){return j(e),Object(c.jsx)("tr",Object(v.a)(Object(v.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(c.jsx)("td",Object(v.a)(Object(v.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))}),Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"text-center",children:["Page"," ",Object(c.jsxs)("strong",{children:[C+1," of ",O.length]})]}),Object(c.jsx)(_.a,{min:0,value:C+1,max:O.length})]}),Object(c.jsxs)("div",{class:"btn-group",role:"group","aria-label":"Basic example",children:[Object(c.jsx)("button",{type:"button",class:"btn btn-secondary",onClick:function(){return x(0)},disabled:!b,children:"<<"}),Object(c.jsx)("button",{type:"button",class:"btn btn-secondary",onClick:function(){return m()},disabled:!b,children:"<"}),Object(c.jsx)("button",{type:"button",class:"btn btn-secondary",onClick:function(){return f()},disabled:!p,children:">"}),Object(c.jsx)("button",{type:"button",class:"btn btn-secondary",onClick:function(){return x(h-1)},disabled:!p,children:">>"})]}),Object(c.jsxs)("span",{children:[" ","| Go to page:"," ",Object(c.jsx)("input",{type:"number",defaultValue:C+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;x(t)},style:{width:"100px"}})]})," ",Object(c.jsx)("select",{value:w,onChange:function(e){g(Number(e.target.value))},children:[10,20,30,40,50].map((function(e){return Object(c.jsxs)("option",{value:e,children:["Show ",e]},e)}))})]})}function Oe(){var e=Object(n.useState)(!1),t=Object(g.a)(e,2),a=(t[0],t[1]),r=Object(n.useState)([]),s=Object(g.a)(r,2),o=s[0],i=s[1],l=Object(n.useState)([]),u=Object(g.a)(l,2),b=u[0],p=u[1],h=Object(n.useState)(o),x=Object(g.a)(h,1)[0],y=Object(n.useState)(!1),S=Object(g.a)(y,2),C=S[0],_=S[1];Object(n.useEffect)((function(){a(!0),function(){var e=Object(m.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("api/wallet/user/".concat("myliveuser"));case 2:t=e.sent,console.log(t.data),i(t.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),a(!1)}),[]),Object(n.useEffect)((function(){a(!0),function(){var e=Object(m.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("api/wallet/supported");case 2:t=e.sent,p(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),a(!1)}),[]);Object(n.useEffect)((function(){_(!1)}),[o]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(j.a,{children:Object(c.jsx)(d.a,{children:Object(c.jsx)("h1",{children:"WalletPage"})})}),Object(c.jsx)(j.a,{children:Object(c.jsx)("button",{onClick:function(){return i(x)},children:"Reset Data"})}),Object(c.jsx)(pe,{data:o,updateMyData:function(e,t,a){_(!0),i((function(c){return c.map((function(n,r){return r===e?Object(v.a)(Object(v.a)({},c[e]),{},Object(de.a)({},t,a)):n}))}))},skipPageReset:C}),Object(c.jsxs)(j.a,{children:[Object(c.jsxs)(d.a,{children:[JSON.stringify(o),";"]}),Object(c.jsxs)(d.a,{children:[JSON.stringify(b),";"]})]})]})}var he=function(){return Object(c.jsx)(j.a,{className:"main",children:Object(c.jsx)(d.a,{children:Object(c.jsxs)(b.c,{children:[Object(c.jsx)(b.a,{exact:!0,path:"/",component:h}),Object(c.jsx)(b.a,{exact:!0,path:"/rates",component:T}),Object(c.jsx)(b.a,{exact:!0,path:"/portfolio",component:I}),Object(c.jsx)(b.a,{exact:!0,path:"/portfolio-history",component:V}),Object(c.jsx)(b.a,{exact:!0,path:"/investments",component:re}),Object(c.jsx)(b.a,{exact:!0,path:"/dca-config",component:je}),Object(c.jsx)(b.a,{exact:!0,path:"/wallets-config",component:Oe})]})})})},xe=a(519),fe=a(520),me=a(521),ge=a(522),ve=a(523),ye=a(524),Se=a(525),Ce=a(528),_e=a(529),we=a(530),Pe=a(526),Te=function(e){var t=Object(n.useState)(!1),a=Object(g.a)(t,2),r=a[0],s=a[1];return Object(c.jsx)("div",{children:Object(c.jsxs)(xe.a,{color:"dark",dark:!0,expand:"md",children:[Object(c.jsx)(fe.a,{tag:y.b,to:"/",children:"Cryptoda"}),Object(c.jsx)(me.a,{onClick:function(){return s(!r)}}),Object(c.jsx)(ge.a,{isOpen:r,navbar:!0,children:Object(c.jsxs)(ve.a,{className:"me-auto",navbar:!0,children:[Object(c.jsx)(ye.a,{children:Object(c.jsx)(Se.a,{tag:y.b,to:"rates",children:"Rates"})}),Object(c.jsx)(ye.a,{children:Object(c.jsx)(Se.a,{tag:y.b,to:"investments",children:"Investments"})}),Object(c.jsxs)(Ce.a,{nav:!0,inNavbar:!0,children:[Object(c.jsx)(_e.a,{nav:!0,caret:!0,children:"Portfolio"}),Object(c.jsxs)(we.a,{right:!0,children:[Object(c.jsx)(Pe.a,{tag:y.b,to:"portfolio",children:"Current"}),Object(c.jsx)(Pe.a,{tag:y.b,to:"portfolio-history",children:"History"})]})]}),Object(c.jsxs)(Ce.a,{nav:!0,inNavbar:!0,children:[Object(c.jsx)(_e.a,{nav:!0,caret:!0,children:"Configs"}),Object(c.jsxs)(we.a,{right:!0,children:[Object(c.jsx)(Pe.a,{tag:y.b,to:"dca-config",children:"Fiat Currency Cost Averaging"}),Object(c.jsx)(Pe.a,{tag:y.b,to:"wallets-config",children:"Wallets"})]})]})]})})]})})},ke=a(244),Ue=a(245),He=a(247),De=a(246),Ne=(a(508),function(e){Object(He.a)(a,e);var t=Object(De.a)(a);function a(){return Object(ke.a)(this,a),t.apply(this,arguments)}return Object(Ue.a)(a,[{key:"render",value:function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)(j.a,{className:"left-sidebar-1",children:Object(c.jsx)(d.a,{})})})}}]),a}(r.a.Component)),Ee=function(){return Object(c.jsxs)("div",{children:[Object(c.jsx)(Te,{}),Object(c.jsx)(u.a,{fluid:!0,children:Object(c.jsxs)(j.a,{children:[Object(c.jsx)(d.a,{sm:"2",children:Object(c.jsx)(Ne,{})}),Object(c.jsx)(d.a,{sm:"10",children:Object(c.jsx)(he,{})})]})})]})},Re=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,531)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),c(e),n(e),r(e),s(e)}))},Me=a(55),qe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case l:default:return e}},Fe=Object(Me.b)({testConfigs:qe}),ze=Object(Me.c)(Fe,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());o.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(i.a,{store:ze,children:Object(c.jsx)(y.a,{children:Object(c.jsx)(Ee,{})})})}),document.getElementById("root")),Re()}},[[509,1,2]]]);
//# sourceMappingURL=main.3cb7e33c.chunk.js.map