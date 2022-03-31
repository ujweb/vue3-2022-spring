"use strict";(self["webpackChunkvue3_2022_spring"]=self["webpackChunkvue3_2022_spring"]||[]).push([[340],{4722:function(t,e,a){a.d(e,{Z:function(){return _}});var l=a(6252);const s={class:"modal fade",id:"DangerModal","data-bs-keyboard":"false"},d={class:"modal-dialog modal-dialog-centered modal-dialog-scrollable"},i={class:"modal-content"},o={class:"modal-body p-3"},n={class:"mb-2"},r=(0,l._)("div",{class:"d-flex align-items-center justify-content-end mt-2"},[(0,l._)("button",{type:"button",class:"btn btn-primary","data-bs-dismiss":"modal"}," 我知道了 ")],-1);function c(t,e){return(0,l.wg)(),(0,l.iD)("div",s,[(0,l._)("div",d,[(0,l._)("div",i,[(0,l._)("div",o,[(0,l._)("h2",n,[(0,l.WI)(t.$slots,"title")]),(0,l._)("p",null,[(0,l.WI)(t.$slots,"default")]),r])])])])}var u=a(3744);const m={},p=(0,u.Z)(m,[["render",c]]);var _=p},9340:function(t,e,a){a.r(e),a.d(e,{default:function(){return Ht}});var l=a(6252),s=a(3577);const d={class:"d-flex align-items-center justify-content-between"},i=(0,l._)("h1",{class:"mb-0"},"訂單列表",-1),o={class:"row"},n={class:"col"},r={class:"table-responsive py-2"},c={class:"table text-center align-middle"},u=(0,l._)("thead",{class:"table-light"},[(0,l._)("tr",null,[(0,l._)("th",{width:"8%",scope:"col"},"#"),(0,l._)("th",{width:"14%",scope:"col"},"收單時間"),(0,l._)("th",{width:"14%",scope:"col"},"訂單編號"),(0,l._)("th",{width:"14%",scope:"col"},"訂單金額"),(0,l._)("th",{width:"14%",scope:"col"},"訂單狀態"),(0,l._)("th",{width:"14%",scope:"col"},"付款時間"),(0,l._)("th",{width:"22%",scope:"col"},"編輯")])],-1),m={class:"d-block text-secondary"},p={key:0,class:"text-success"},_={key:1,class:"text-danger"},h={key:0,class:"m-0"},g={class:"d-block text-secondary"},b={class:"d-block text-secondary"},w={key:1},y=["onClick"],k=["onClick"],v={key:0,class:"d-block"},f=(0,l.Uk)(" 是否刪除編號為 "),D={class:"text-danger"},x=(0,l.Uk)(" 的訂單？"),M=(0,l._)("br",null,null,-1),z={key:1,class:"d-block"},$=(0,l.Uk)(" 是否刪除"),O=(0,l._)("b",{class:"text-danger"},"全部",-1),U=(0,l.Uk)("訂單？"),S=(0,l._)("br",null,null,-1),j=[$,O,U,S],C=(0,l.Uk)(" 提醒您，刪除後將無法恢復 ");function N(t,e,a,$,O,U){const S=(0,l.up)("pagination-nav"),N=(0,l.up)("OrderModal"),T=(0,l.up)("SuccessModal"),W=(0,l.up)("DangerModal"),I=(0,l.up)("DeleteModal");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",d,[i,(0,l._)("button",{class:"btn btn-sm btn-danger",type:"button",onClick:e[0]||(e[0]=t=>{O.modal.title="清除訂單",U.openOrderModal(O.modal.title,{})})}," 清除所有訂單 ")]),(0,l._)("div",o,[(0,l._)("div",n,[(0,l._)("div",r,[(0,l._)("table",c,[u,(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(O.orders,((t,e)=>((0,l.wg)(),(0,l.iD)("tr",{key:t.id},[(0,l._)("td",null,(0,s.zw)(e+1),1),(0,l._)("td",null,[(0,l.Uk)((0,s.zw)(U.toDate(t.create_at))+" ",1),(0,l._)("small",m,(0,s.zw)(U.toTime(t.create_at)),1)]),(0,l._)("td",null,(0,s.zw)(t.id),1),(0,l._)("td",null,(0,s.zw)(U.toNumber(t.total)),1),(0,l._)("td",null,[t.is_paid?((0,l.wg)(),(0,l.iD)("span",p,"已付款")):((0,l.wg)(),(0,l.iD)("span",_,"未付款"))]),(0,l._)("td",null,[t.is_paid?((0,l.wg)(),(0,l.iD)("p",h,[(0,l._)("small",g,(0,s.zw)(t.paid_date),1),(0,l._)("small",b,(0,s.zw)(t.paid_time),1)])):((0,l.wg)(),(0,l.iD)("p",w,"-"))]),(0,l._)("td",null,[(0,l._)("button",{class:"btn btn-sm btn-primary me-1",type:"button",onClick:e=>{O.modal.title="訂單詳情",U.openOrderModal(O.modal.title,t)}}," 訂單詳情 ",8,y),(0,l._)("button",{class:"btn btn-sm btn-outline-danger",type:"button",onClick:e=>{O.modal.title="刪除訂單",U.openOrderModal(O.modal.title,t)}}," 刪除 ",8,k)])])))),128))])])])])]),(0,l.Wm)(S,{pages:O.paginations,onGetDatas:U.getOrder},null,8,["pages","onGetDatas"]),(0,l.Wm)(N,{modal:O.modal.temp,type:O.modal.title,onEmitOrderData:U.updatePaid},{title:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(O.modal.temp.id)+" "+(0,s.zw)(O.modal.title),1)])),_:1},8,["modal","type","onEmitOrderData"]),(0,l.Wm)(T,null,{title:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(O.modal.title),1)])),default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(O.modal.content),1)])),_:1}),(0,l.Wm)(W,null,{title:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(O.modal.title),1)])),default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(O.modal.content),1)])),_:1}),(0,l.Wm)(I,{modal:O.modal.temp,onEmitDelete:U.deleteOrder},{title:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(O.modal.title),1)])),default:(0,l.w5)((()=>["刪除訂單"===O.modal.title?((0,l.wg)(),(0,l.iD)("span",v,[f,(0,l._)("b",D,(0,s.zw)(O.modal.temp.id),1),x,M])):((0,l.wg)(),(0,l.iD)("span",z,j)),C])),_:1},8,["modal","onEmitDelete"])],64)}var T=a(4983),W=a(9963);const I=t=>((0,l.dD)("data-v-6b03eb28"),t=t(),(0,l.Cn)(),t),Z={class:"modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"},E={class:"modal-content"},L={class:"modal-body p-3"},q={class:"mb-2"},H={class:"row"},Y={class:"col-md-6"},G=I((()=>(0,l._)("h5",{class:"mb-1"},"訂購者資訊",-1))),J={class:"table"},K={key:0},P=I((()=>(0,l._)("th",{style:{width:"100px"}},"姓名",-1))),Q=I((()=>(0,l._)("th",null,"Email",-1))),V=I((()=>(0,l._)("th",null,"電話",-1))),A=I((()=>(0,l._)("th",null,"地址",-1))),B=I((()=>(0,l._)("th",null,"留言",-1))),F=I((()=>(0,l._)("h5",{class:"mt-5 mb-1"},"訂單細節",-1))),R={class:"table"},X=I((()=>(0,l._)("th",{style:{width:"100px"}},"下單時間",-1))),tt=I((()=>(0,l._)("th",null,"付款時間",-1))),et={key:0,class:"text-success"},at={key:1,class:"text-muted"},lt=I((()=>(0,l._)("th",null,"付款狀態",-1))),st={key:0,class:"text-success"},dt={key:1,class:"text-muted"},it={class:"col-md-6"},ot=I((()=>(0,l._)("h5",{class:"mb-1"},"訂單內容",-1))),nt={class:"table"},rt={key:0},ct={style:{width:"150px"}},ut=["src","alt"],mt={class:"card-title"},pt={class:"card-text"},_t={class:"text-secondary"},ht={class:"d-flex align-items-center justify-content-end"},gt=I((()=>(0,l._)("span",{class:"pe-1"},"數量",-1))),bt={class:"d-flex align-items-center justify-content-between"},wt=(0,l.Uk)(" 共 "),yt={class:"text-primary"},kt=(0,l.Uk)(" 項 "),vt=(0,l.Uk)(" 總金額："),ft={class:"fs-3 text-primary"},Dt={class:"d-flex align-items-center justify-content-end mt-2"},xt={class:"d-flex justify-content-end"},Mt={class:"form-check"},zt={class:"form-check-label",for:"flexCheckDefault"},$t={key:0},Ot={key:1},Ut={class:"d-flex align-items-center justify-content-end mt-2"},St=I((()=>(0,l._)("button",{type:"button",class:"btn btn-outline-secondary me-1","data-bs-dismiss":"modal"}," 取消 ",-1)));function jt(t,e,a,d,i,o){return(0,l.wg)(),(0,l.iD)("form",{class:"modal fade needs-validation",id:"orderModal","data-bs-backdrop":"static","data-bs-keyboard":"false",novalidate:"",onSubmit:e[2]||(e[2]=(0,W.iM)((()=>{}),["prevent"]))},[(0,l._)("div",Z,[(0,l._)("div",E,[(0,l._)("div",L,[(0,l._)("h2",q,[(0,l.WI)(t.$slots,"title",{},void 0,!0)]),(0,l._)("div",H,[(0,l._)("div",Y,[G,(0,l._)("table",J,[i.user?((0,l.wg)(),(0,l.iD)("tbody",K,[(0,l._)("tr",null,[P,(0,l._)("td",null,(0,s.zw)(i.user.name),1)]),(0,l._)("tr",null,[Q,(0,l._)("td",null,(0,s.zw)(i.user.email),1)]),(0,l._)("tr",null,[V,(0,l._)("td",null,(0,s.zw)(i.user.tel),1)]),(0,l._)("tr",null,[A,(0,l._)("td",null,(0,s.zw)(i.user.address),1)]),(0,l._)("tr",null,[B,(0,l._)("td",null,(0,s.zw)(i.data.message),1)])])):(0,l.kq)("",!0)]),F,(0,l._)("table",R,[(0,l._)("tbody",null,[(0,l._)("tr",null,[X,(0,l._)("td",null,(0,s.zw)(o.toDate(i.data.create_at)),1)]),(0,l._)("tr",null,[tt,(0,l._)("td",null,[i.data.paid_at?((0,l.wg)(),(0,l.iD)("span",et,(0,s.zw)(o.toDate(i.data.paid_at)),1)):((0,l.wg)(),(0,l.iD)("span",at,"-"))])]),(0,l._)("tr",null,[lt,(0,l._)("td",null,[i.data.is_paid?((0,l.wg)(),(0,l.iD)("span",st,"已付款")):((0,l.wg)(),(0,l.iD)("span",dt,"尚未付款"))])])])])]),(0,l._)("div",it,[ot,(0,l._)("table",nt,[i.user?((0,l.wg)(),(0,l.iD)("tbody",rt,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(i.details,(t=>((0,l.wg)(),(0,l.iD)("tr",{key:t.id},[(0,l._)("td",ct,[(0,l._)("img",{class:"img-fluid",src:t.product.imageUrl,alt:t.product.title},null,8,ut)]),(0,l._)("td",null,[(0,l._)("h5",mt,(0,s.zw)(t.product.title),1),(0,l._)("p",pt,[(0,l._)("small",_t," NT$ "+(0,s.zw)(o.toNumber(t.product.price)),1)])]),(0,l._)("td",null,[(0,l._)("div",ht,[gt,(0,l._)("span",null,[(0,l.Uk)((0,s.zw)(t.qty)+" ",1),(0,l._)("small",null,"/"+(0,s.zw)(t.product.unit),1)])])])])))),128))])):(0,l.kq)("",!0)]),(0,l._)("div",bt,[(0,l._)("div",null,[wt,(0,l._)("span",yt,(0,s.zw)(o.getTotalQty(i.details)),1),kt]),(0,l._)("div",null,[vt,(0,l._)("span",ft,(0,s.zw)(o.toNumber(i.data.total)),1)])])])]),(0,l._)("div",Dt,[(0,l._)("div",xt,[(0,l._)("div",Mt,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":e[0]||(e[0]=t=>i.data.is_paid=t)},null,512),[[W.e8,i.data.is_paid]]),(0,l._)("label",zt,[i.data.is_paid?((0,l.wg)(),(0,l.iD)("span",$t,"已付款")):((0,l.wg)(),(0,l.iD)("span",Ot,"未付款"))])])])]),(0,l._)("div",Ut,[St,(0,l._)("button",{type:"button",class:"btn btn-primary","data-bs-dismiss":"modal",onClick:e[1]||(e[1]=e=>t.$emit("emit-order-data",i.data))}," 更新付款狀態 ")])])])])],32)}var Ct={data(){return{data:{},user:{},details:[],title:null}},props:["modal","type"],emits:["emit-order-data"],methods:{toNumber(t){return Number.parseInt(t,10).toLocaleString()},toDate(t){const e=new Date(1e3*t);return e.toLocaleDateString()},getTotalQty(t){let e=0;return"undefined"!==typeof t&&Object.values(t).forEach((t=>{e+=t.qty})),e}},watch:{modal(){this.data=this.modal,this.user=this.modal.user,this.details=this.modal.products,this.title=this.type}}},Nt=a(3744);const Tt=(0,Nt.Z)(Ct,[["render",jt],["__scopeId","data-v-6b03eb28"]]);var Wt=Tt,It=a(5146),Zt=a(4722),Et=a(7393),Lt={data(){return{page:1,orders:[],paginations:{},bsModal:null,modal:{title:"",content:"",temp:{}}}},emits:["page-loading"],components:{OrderModal:Wt,SuccessModal:It.Z,DangerModal:Zt.Z,DeleteModal:Et.Z},mounted(){this.getOrder()},methods:{getOrder(t=1){const e=`https://vue3-course-api.hexschool.io/v2/api/ujhwang/admin/orders?page=${t}`;this.$emitter.emit("page-loading",!0),this.$http.get(e).then((t=>{this.$emitter.emit("page-loading",!1),this.paginations=t.data.pagination,this.orders=t.data.orders})).catch((t=>{console.dir(t),alert(t.response.data.message)}))},updatePaid(t){this.$emitter.emit("page-loading",!0);const e=`https://vue3-course-api.hexschool.io/v2/api/ujhwang/admin/order/${t.id}`,a=new Date,l=Math.floor(Date.now()/1e3),s={is_paid:t.is_paid,paid_at:l,paid_date:this.toDate(l),paid_time:`${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`};let d={};this.$http.put(e,{data:s}).then((t=>{d={title:"更新成功",content:t.data.message}})).catch((t=>{d={title:"更新失敗",content:t.response.data.message}})).finally((()=>{this.$emitter.emit("page-loading",!1),this.getOrder(),this.clearTemp(),this.openSuccessModal(d)}))},deleteOrder(t){this.$emitter.emit("page-loading",!0);let e={},a="";"刪除訂單"===this.modal.title?a=`https://vue3-course-api.hexschool.io/v2/api/ujhwang/admin/order/${t.id}`:"清除訂單"===this.modal.title&&(a="https://vue3-course-api.hexschool.io/v2/api/ujhwang/admin/orders/all"),this.$http.delete(a).then((t=>{e={title:"刪除成功",content:t.data.message}})).catch((t=>{e={title:"刪除失敗",content:t.response.data.message}})).finally((()=>{this.$emitter.emit("page-loading",!1),this.getOrder(),this.clearTemp(),this.openSuccessModal(e)}))},openOrderModal(t,e){"訂單詳情"===t?(this.bsModal=(0,T.$7)("orderModal"),this.modal.temp=JSON.parse(JSON.stringify(e))):("刪除訂單"===t||"清除訂單"===t)&&(this.bsModal=(0,T.$7)("deleteModal"),this.modal.temp=e),this.bsModal.show()},openSuccessModal(t){this.modal.title=t.title,this.modal.content=t.content,this.bsModal=(0,T.$7)("SuccessModal"),this.bsModal.show()},openDangerModal(t){this.modal.title=t.title,this.modal.content=t.content,this.bsModal=(0,T.$7)("DangerModal"),this.bsModal.show()},clearTemp(){this.modal.temp={}},toNumber(t){return Number.parseInt(t,10).toLocaleString()},toDate(t){const e=new Date(1e3*t);return e.toLocaleDateString()},toTime(t){const e=new Date(1e3*t);return e.toLocaleTimeString("it-IT")}}};const qt=(0,Nt.Z)(Lt,[["render",N]]);var Ht=qt}}]);
//# sourceMappingURL=340.a5159e6d.js.map