(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{20:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return c})),a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return i}));var n=a(1),o=a.n(n);function r(e,t){return new Promise((function(a,n){fetch("https://api-dvc-teamwork.herokuapp.com/api/v1"+e,{method:"POST",body:JSON.stringify(t),mode:"cors",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){a(e)})).catch((function(e){n(e)}))}))}function c(e,t){var a=o.a.get("twk-userData")?"Bearer "+o.a.get("twk-userData").token:"";return new Promise((function(n,o){fetch("https://api-dvc-teamwork.herokuapp.com/api/v1"+e,{method:"POST",body:JSON.stringify(t),mode:"cors",headers:{Authorization:a,"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){n(e)})).catch((function(e){o(e)}))}))}function l(e){var t=o.a.get("twk-userData")?"Bearer "+o.a.get("twk-userData").token:"";return new Promise((function(a,n){fetch("https://api-dvc-teamwork.herokuapp.com/api/v1"+e,{method:"DELETE",mode:"cors",headers:{Authorization:t,"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){a(e)})).catch((function(e){n(e)}))}))}function i(e){var t=o.a.get("twk-userData")?"Bearer "+o.a.get("twk-userData").token:"";return new Promise((function(a,n){fetch("https://api-dvc-teamwork.herokuapp.com/api/v1"+e,{method:"GET",mode:"cors",headers:{Authorization:t,"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){a(e)})).catch((function(e){n(e)}))}))}},24:function(e,t,a){},30:function(e,t,a){e.exports=a(50)},35:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(27),c=a.n(r),l=(a(35),a(10)),i=a(11),s=a(13),u=a(12),m=a(6),h=a(14),p=a(1),d=a.n(p),f=(a(24),a(21)),b=(a(25),a(20)),v=a(7),E=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={email:"",password:""},a.login=a.login.bind(Object(m.a)(a)),a.onChange=a.onChange.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"login",value:function(){var e=this;this.state.email&&this.state.password&&Object(b.b)("/auth/signin",this.state).then((function(t){var a=t;"success"===a.status?(d.a.set("twk-userData",a.data),1===a.data.role?e.props.history.push("/users"):e.props.history.push("/feed")):alert(a.error)}))}},{key:"onChange",value:function(e){this.setState(Object(f.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){return d.a.get("twk-userData")&&1===d.a.get("twk-userData").role?o.a.createElement(v.a,{to:"/users"}):d.a.get("twk-userData")&&2===d.a.get("twk-userData").role?o.a.createElement(v.a,{to:"/feed"}):o.a.createElement("div",{className:"auth-wrapper"},o.a.createElement("div",{className:"auth-inner"},o.a.createElement("h3",null,"Sign In"),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Email address"),o.a.createElement("input",{name:"email",type:"email",className:"form-control",placeholder:"Enter email",onChange:this.onChange})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Password"),o.a.createElement("input",{name:"password",type:"password",className:"form-control",placeholder:"Enter password",onChange:this.onChange})),o.a.createElement("div",{className:"form-group"},o.a.createElement("div",{className:"custom-control custom-checkbox"},o.a.createElement("input",{type:"checkbox",className:"custom-control-input",id:"customCheck1"}),o.a.createElement("label",{className:"custom-control-label",htmlFor:"customCheck1"},"Remember me"))),o.a.createElement("input",{type:"submit",value:"Login",onClick:this.login,className:"btn btn-primary btn-block"})))}}]),t}(o.a.Component),g=(o.a.Component,a(8)),k=Object(n.lazy)((function(){return a.e(6).then(a.bind(null,54))})),w=Object(n.lazy)((function(){return a.e(4).then(a.bind(null,55))})),j=Object(n.lazy)((function(){return a.e(3).then(a.bind(null,52))})),y=Object(n.lazy)((function(){return a.e(5).then(a.bind(null,53))})),N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).logout=a.logout.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"logout",value:function(){d.a.remove("twk-userData"),window.location.reload()}},{key:"render",value:function(){var e;return d.a.get("twk-userData")&&(e=o.a.createElement("input",{type:"submit",value:"Logout",onClick:this.logout,className:"btn btn-danger"})),o.a.createElement("div",{className:"App"},o.a.createElement(g.a,null,o.a.createElement(n.Suspense,{fallback:o.a.createElement("div",null,"Loading...")},o.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light fixed-top"},o.a.createElement("div",{className:"container"},o.a.createElement(g.b,{to:"/"},o.a.createElement("div",{className:"navbar-brand"},"TeamWork")),o.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarTogglerDemo02"},o.a.createElement("ul",{className:"navbar-nav ml-auto"},o.a.createElement("li",{className:"nav-item"},o.a.createElement(g.b,{to:"/feed"},o.a.createElement("div",{className:"nav-link",href:"#"},"Feed"))),o.a.createElement("li",{className:"nav-item"},o.a.createElement(g.b,{to:"/articles"},o.a.createElement("div",{className:"nav-link",href:"#"},"Articles"))),o.a.createElement("li",{className:"nav-item"},o.a.createElement(g.b,{to:"/gifs"},o.a.createElement("div",{className:"nav-link",href:"#"},"Gifs"))),o.a.createElement("li",{className:"nav-item"},e))))),o.a.createElement(v.d,null,o.a.createElement(v.b,{exact:!0,path:"/",component:E}),o.a.createElement(v.b,{path:"/login",component:E}),o.a.createElement(v.b,{exact:!0,path:"/users",component:k}),o.a.createElement(v.b,{exact:!0,path:"/feed",component:w}),o.a.createElement(v.b,{exact:!0,path:"/articles",component:j}),o.a.createElement(v.b,{exact:!0,path:"/gifs",component:y})))))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[30,1,2]]]);
//# sourceMappingURL=main.d61bab07.chunk.js.map