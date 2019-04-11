(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{119:function(e,t,n){},123:function(e,t,n){"use strict";(function(e){var r=n(20),a=n(2),i=n(46),c=n.n(i),o=n(34),s=n.n(o),l=n(121),u=n.n(l),h=n(38),d=n.n(h),f=function(){function t(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(r.a)(this,t),this.keyPair=null,e&&(this.keyPair=c.a.ECPair.makeRandom())}return Object(a.a)(t,[{key:"toWIF",value:function(){return this.keyPair.toWIF()}},{key:"toAddress",value:function(){return c.a.payments.p2pkh({pubkey:this.keyPair.publicKey}).address}}],[{key:"fromWIF",value:function(e){var n=new t(!1);return n.keyPair=c.a.ECPair.fromWIF(e),n}},{key:"getAddress",value:function(e){return c.a.payments.p2pkh({pubkey:s.a.decode(e)}).address}},{key:"encodeSignature",value:function(t,n,r){return r&&(n+=4),e.concat([e.alloc(1,n+27),t])}},{key:"decodeSignature",value:function(e){if(65!==e.length)throw new Error("Invalid signature length");var t=e.readUInt8(0)-27;if(t>7)throw new Error("Invalid signature parameter");return{compressed:!!(4&t),recovery:3&t,signature:e.slice(1)}}}]),Object(a.a)(t,[{key:"publicKey",value:function(){return s.a.encode(this.keyPair.publicKey).toString()}},{key:"sign",value:function(e){var n=u.a.sign(d()("sha256").update(e).digest(),this.keyPair.privateKey);return s.a.encode(t.encodeSignature(n.signature,n.recovery,!0)).toString()}}],[{key:"recoverAddress",value:function(n,r){var a=d()("sha256").update(r).digest();e.isBuffer(n)||(n=s.a.decode(n));var i=t.decodeSignature(n),c=s.a.encode(u.a.recover(a,i.signature,i.recovery,!0)).toString();return t.getAddress(c)}}]),t}();t.a=f}).call(this,n(29).Buffer)},271:function(e,t,n){e.exports=n(499)},276:function(e,t,n){},283:function(e,t){},287:function(e,t){},309:function(e,t){},31:function(e,t,n){"use strict";var r=n(123),a=n(65),i=n(20),c=n(2),o=n(46),s=n(34),l=n.n(s),u=function(){function e(){Object(i.a)(this,e)}return Object(c.a)(e,null,[{key:"saveBlock",value:function(e,t){var n=t+"+"+e.height.toString();return localStorage.setItem(n,e.toJSON())}},{key:"getBlock",value:function(e,t){var n=t+"+"+e.toString();return localStorage.getItem(n)}},{key:"getChainCount",value:function(e){var t=e;return null==localStorage.getItem(t)?0:parseInt(localStorage.getItem(t))}},{key:"updateChainCount",value:function(e,t){var n=e;return localStorage.setItem(n,t.toString())}}]),e}(),h=function(){function e(t,n){Object(i.a)(this,e),this.code=t,this.desc=n}return Object(c.a)(e,null,[{key:"BlockValidationError",value:function(t){return new e("BlockValidationError",t)}},{key:"InvalidBlockError",value:function(t){return new e("InvalidBlockError",t)}},{key:"ForkError",value:function(t){return new e("ForkError",t)}},{key:"ExistBlockError",value:function(t){return new e("ExistBlockError",t)}},{key:"MismatchedIDError",value:function(t){return new e("MismatchedIDError",t)}}]),e}(),d=function(){function e(t){Object(i.a)(this,e),this.key=null,this.id=t}return Object(c.a)(e,null,[{key:"fromPrivateKey",value:function(t){var n=new e(t.toAddress());return n.key=t,n}}]),Object(c.a)(e,[{key:"updateChainCount",value:function(e){u.updateChainCount(this.id,e)}},{key:"getBlock",value:function(e){var t=u.getBlock(e,this.id);return null==t?null:a.a.fromJSON(t)}},{key:"createBlock",value:function(e,t){var n=new a.a;return n.payload=e,n.height=t,n.prevHash="",n.height>0&&(n.prevHash=this.getBlock(n.height-1).blockHash),n.blockHash=l.a.encode(o.crypto.sha256(n.dataForHashing,"utf8")),n.signature=this.key.sign(n.dataForHashing),n}},{key:"validateBlock",value:function(e){if(!1===e.isValid())return h.InvalidBlockError("block hash or signature is invalid");if(e.chainID!==this.id)return h.MismatchedIDError("the block id mismatch chain id");var t=this.getBlock(e.height);return null!=t?t.prevHash!==e.prevHash||t.blockHash!==e.blockHash?h.ForkError("the blockchain is forked"):h.ExistBlockError("block already exist"):null}},{key:"saveBlock",value:function(e){return null==this.validateBlock(e)&&(u.saveBlock(e,this.id),null===this.count?this.updateChainCount(e.height):e.height+1>this.count&&this.updateChainCount(e.height+1),!0)}},{key:"count",get:function(){return u.getChainCount(this.id)}},{key:"isEmpty",get:function(){return 0===u.getChainCount(this.id)}}]),e}();n.d(t,"c",function(){return r.a}),n.d(t,"a",function(){return a.a}),n.d(t,"b",function(){return d})},311:function(e,t){},499:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(33),c=n.n(i),o=(n(276),n(20)),s=n(2),l=n(25),u=n(24),h=n(26),d=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;Object(o.a)(this,e),this.type=t,this.data=n,this.id=null===r?e.generateID():r}return Object(s.a)(e,null,[{key:"generateID",value:function(){return Math.random().toString(36).substr(2)}},{key:"fromJSON",value:function(t){var n=JSON.parse(t);return e.fromDict(n)}},{key:"fromDict",value:function(t){var n=new e;return n.type=t.type,n.data=t.data,n.id=t.id,n}},{key:"fromBehavior",value:function(t){var n=new RegExp("(.)([A-Z][a-z]+)"),r=new RegExp("([a-z0-9][A-Z])"),a=t.constructor.name;return new e((a=(a=a.replace(n,"$1:$2")).replace(r,"$1:$2")).toLowerCase(),t.toDict())}},{key:"fromError",value:function(t){return new e("error",t.toDict())}}]),Object(s.a)(e,[{key:"toDict",value:function(){return{type:this.type,data:this.data,id:this.id}}},{key:"toJSON",value:function(){return JSON.stringify(this.toDict())}}]),e}(),f=n(194),v=n.n(f),m=n(120),p=n.n(m),k=v()(p.a);k.setLevel("TRACE");var b=new(n(64).EventEmitter),y={chains:["123XZfk9FWKyQoBCgBEiwDA4q1o9RdUSyB","1rmj3NjgDbCqRG7P2Be73xxwXzaW63ycm"],peers:["ws://hk.infnote.com:32767"]},g=n(31),O=function(){function e(){Object(o.a)(this,e)}return Object(s.a)(e,[{key:"react",value:function(){}},{key:"validate",value:function(){}}]),e}(),E=function(e){function t(e,n){var r;return Object(o.a)(this,t),(r=Object(l.a)(this,Object(u.a)(t).call(this))).code=e,r.desc=n,r}return Object(h.a)(t,e),Object(s.a)(t,[{key:"toDict",value:function(){return{code:this.code,desc:this.desc}}},{key:"toJSON",value:function(){return JSON.stringify(this.toDict())}},{key:"validate",value:function(){return null}},{key:"react",value:function(){return[]}}],[{key:"invalidMessageError",value:function(e){return new t("InvalidMessage",e)}},{key:"invalidBehaviorError",value:function(e){return new t("InvalidBehaviorError",e)}},{key:"incompatibleProtocolVersion",value:function(e){return new t("IncompatibleProtocolVersionError",e)}},{key:"badRequestError",value:function(e){return new t("BadRequestError",e)}},{key:"JSONDecodeError",value:function(e){return new t("JSONDecodeError",e)}},{key:"chainNotAcceptError",value:function(e){return new t("ChainNotAcceptError",e)}},{key:"blockValidationError",value:function(e){return new t(e.code,e.desc)}},{key:"URLError",value:function(e){return new t("URLError",e)}},{key:"DuplicateBroadcastError",value:function(e){return new t("DuplicateBroadcastError",e+"has already existed")}}]),t}(O),j=n(45),w=n.n(j),S=n(195),D=n.n(S),C={},P=null,N=function(){function e(){Object(o.a)(this,e),this.handler=null}return Object(s.a)(e,null,[{key:"shared",value:function(){return null===P&&(P=new e),P}}]),e}(),I=function(e){function t(e){var n;return Object(o.a)(this,t),n=Object(l.a)(this,Object(u.a)(t).call(this)),e&&t.getMembers().forEach(function(t){return n[t]=e[t]}),n}return Object(h.a)(t,e),Object(s.a)(t,null,[{key:"getMembers",value:function(){return["version","peers","chains","platform","full_node"]}},{key:"create",value:function(){var e={};for(var n in y.chains){var r=new g.b(y.chains[n]);e[r.id]=r.count}var a=new D.a;return new t({version:"1.1",peers:H.getPeersCount(),chains:e,platform:a.getBrowser(),full_node:!1})}}]),Object(s.a)(t,[{key:"toJSON",value:function(){return JSON.stringify(this.toDict())}},{key:"toDict",value:function(){var e=this,n={};return t.getMembers().forEach(function(t){return n[t]=e[t]}),n}},{key:"validate",value:function(){return"1.1"!==this.version?E.incompatibleProtocolVersion("only accept v1.1 protocol"):this.peers<0?E.badRequestError('"peers" needs to be a non-negative number'):null}},{key:"react",value:function(){var e=[];for(var t in this.peers>0&&e.push(new B({count:this.peers})),Object.keys(this.chains)){var n=Object.keys(this.chains)[t],r=this.chains[n];if(!1!==y.chains.includes(n)){var a=new g.b(n);a.count>=r||e.push(new J({chain_id:n,from:a.count,to:r-1}))}}return e}}]),t}(O),B=function(e){function t(e){var n;return Object(o.a)(this,t),n=Object(l.a)(this,Object(u.a)(t).call(this)),e&&t.getMembers().forEach(function(t){return n[t]=e[t]}),n}return Object(h.a)(t,e),Object(s.a)(t,null,[{key:"getMembers",value:function(){return["count"]}}]),Object(s.a)(t,[{key:"toJSON",value:function(){return JSON.stringify(this.toDict())}},{key:"toDict",value:function(){var e=this,n={};return t.getMembers().forEach(function(t){return n[t]=e[t]}),n}},{key:"validate",value:function(){return this.count<=0?E.badRequestError('"count" needs to be a non-negative number'):null}},{key:"react",value:function(){var e=[];return e.push(new M({peers:H.getPeers(this.count)})),e}}]),t}(O),M=function(e){function t(e){var n;return Object(o.a)(this,t),n=Object(l.a)(this,Object(u.a)(t).call(this)),e&&t.getMembers().forEach(function(t){return n[t]=e[t]}),n}return Object(h.a)(t,e),Object(s.a)(t,null,[{key:"getMembers",value:function(){return["peers"]}}]),Object(s.a)(t,[{key:"toJSON",value:function(){return JSON.stringify(this.toDict())}},{key:"toDict",value:function(){var e=this,n={};return t.getMembers().forEach(function(t){return n[t]=e[t]}),n}},{key:"validate",value:function(){for(var e in this.peers){var t=w.a.parse(this.peers[e]).protocol;if("wss:"!==t&&"ws:"!==t)return E.URLError("not a websocket URL")}return null}},{key:"react",value:function(){return H.addPeers(this.peers),[]}}]),t}(O),J=function(e){function t(e){var n;return Object(o.a)(this,t),n=Object(l.a)(this,Object(u.a)(t).call(this)),e&&t.getMembers().forEach(function(t){return n[t]=e[t]}),n}return Object(h.a)(t,e),Object(s.a)(t,null,[{key:"getMembers",value:function(){return["chain_id","from","to"]}}]),Object(s.a)(t,[{key:"toJSON",value:function(){return JSON.stringify(this.toDict())}},{key:"toDict",value:function(){var e=this,n={};return t.getMembers().forEach(function(t){return n[t]=e[t]}),n}},{key:"validate",value:function(){return!1===y.chains.includes(this.chain_id)?E.chainNotAcceptError(this.Chain_id):this.from>this.to?E.badRequestError('"from" must greater or equal "to"'):new g.b(this.chain_id).count<this.from?E.badRequestError("request not existed blocks"):null}},{key:"react",value:function(){for(var e=[],t=[],n=0,r=new g.b(this.chain_id),a=this.from;a<=this.to;a++){var i=r.getBlock(a);if(null==i)break;n+i.size>102400?(e.push(new x({blocks:t})),(t=[]).push(i.toDict()),n=i.size):(t.push(i.toDict()),n+=i.size)}return t.length>0&&e.push(new x({blocks:t})),e}}]),t}(O),x=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this))).blockObjects=[],e&&t.getMembers().forEach(function(t){return n[t]=e[t]}),n}return Object(h.a)(t,e),Object(s.a)(t,null,[{key:"getMembers",value:function(){return["blocks"]}}]),Object(s.a)(t,[{key:"toJSON",value:function(){return JSON.stringify(this.toDict())}},{key:"toDict",value:function(){var e=this,n={};return t.getMembers().forEach(function(t){return n[t]=e[t]}),n}},{key:"validate",value:function(){for(var e in this.blocks){var t=this.blocks[e],n=g.a.fromDict(t);if(!1===y.chains.includes(n.chainID))return E.chainNotAcceptError(n.chainID());var r=new g.b(n.chainID).validateBlock(n);if(null!=r)return E.blockValidationError(r);this.blockObjects.push(n)}return null}},{key:"react",value:function(){for(var e in this.blockObjects){var t=this.blockObjects[e];new g.b(t.chainID).saveBlock(t)}return[]}}]),t}(O),A=function(e){function t(e,n,r){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this))).blockObject=null,a.messageID=n,a.address=r,e&&t.getMembers().forEach(function(t){return a[t]=e[t]}),a}return Object(h.a)(t,e),Object(s.a)(t,null,[{key:"getMembers",value:function(){return["block"]}},{key:"create",value:function(e){return new t({block:e.toDict()})}}]),Object(s.a)(t,[{key:"toJSON",value:function(){return JSON.stringify(this.toDict())}},{key:"toDict",value:function(){var e=this,n={};return t.getMembers().forEach(function(t){return n[t]=e[t]}),n}},{key:"validate",value:function(){if(!0===C[this.messageID])return E.DuplicateBroadcastError(this.messageID);if(this.blockObject=g.a.fromDict(this.block),!1===y.chains.includes(this.blockObject.chainID))return E.chainNotAcceptError(this.blockObject.chainID);var e=new g.b(this.blockObject.chainID).validateBlock(this.blockObject);return null!=e?E.blockValidationError(e):null}},{key:"react",value:function(){var e=this.blockObject.chainID;return!0===new g.b(e).saveBlock(this.blockObject)&&!0!==C[this.messageID]&&null!==N.shared().handler&&(N.shared().handler(this),C[this.messageID]=!0,b.emit("NEW_BLOCK",e)),[]}}]),t}(O),L=function(){function e(t){Object(o.a)(this,e),this.url=t,this.socket=null}return Object(s.a)(e,[{key:"connect",value:function(e,t,n){var r=this;try{this.socket=new WebSocket(this.url)}catch(a){return k.info(a),!1}this.socket.onopen=function(){var e=r.socket.url;k.info(e+" is connected.");var t=I.create(),a=new d("info",t.toDict());r.socket.send(a.toJSON()),k.info("sent info to "+e),n&&n(r)},this.socket.onerror=function(e){var t=r.socket.url;k.info("got socket error from "+t+":\n"+JSON.stringify(e))},this.socket.onclose=function(){var e=r.socket.url;k.info(e+" is closed."),t&&t(r)},this.socket.onmessage=function(t){var n=r.socket.url;if(e){var a=e(t.data,n);a&&a.length>0&&a.forEach(function(e){r.socket.send(e.toJSON())})}}}},{key:"close",value:function(){this.socket.close(1e3)}},{key:"send",value:function(e){this.socket.send(e)}},{key:"isConnect",get:function(){return!!this.socket&&this.socket.readyState===this.socket.OPEN}}]),e}(),R=function(){function e(){Object(o.a)(this,e)}return Object(s.a)(e,null,[{key:"savePeers",value:function(e){return localStorage.setItem("peers",JSON.stringify(e))}},{key:"getPeers",value:function(){return null==localStorage.getItem("peers")?[]:JSON.parse(localStorage.getItem("peers"))}},{key:"addPeer",value:function(t){var n=e.getPeers(),r=w.a.parse(t),a=!0;for(var i in n){var c=w.a.parse(n[i]);c.hostname===r.hostname&&c.port===r.port&&(a=!1)}a&&(n.push(t),e.savePeers(n))}},{key:"removePeers",value:function(t){var n=e.getPeers();t.map(function(e){return e.url}).forEach(function(e){n.indexOf(e)>=0&&n.splice(n.indexOf(e),1)}),e.savePeers(n)}},{key:"migrate",value:function(){localStorage.setItem("migrated","true")}},{key:"isMigrated",value:function(){return null!==localStorage.getItem("migrated")}}]),e}(),H=function(){function e(){Object(o.a)(this,e)}return Object(s.a)(e,null,[{key:"migrate",value:function(){!1===R.isMigrated()&&e.addPeers(y.peers),R.migrate()}},{key:"savePeers",value:function(e){R.savePeers(e)}},{key:"getPeers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return 0===e?R.getPeers():R.getPeers().slice(0,e)}},{key:"getPeersCount",value:function(){return R.getPeers().length}},{key:"addPeers",value:function(e){for(var t in e){var n=w.a.parse(e[t]),r="ws:"===n.protocol?80:443;null!==n.port&&(r=n.port);var a="/";null!=n.path&&(a=n.path);var i=n.protocol+"//"+n.hostname+":"+r+a;R.addPeer(i)}}},{key:"removePeers",value:function(e){R.removePeers(e)}}]),e}();function _(e,t){var n=d.fromJSON(e),r=n.data,a=null;if("info"===n.type)a=new I(r);else if("request:blocks"===n.type)a=new J(r);else if("request:peers"===n.type)a=new B(r);else if("response:blocks"===n.type)a=new x(r);else if("response:peers"===n.type)a=new M(r);else if("broadcast:block"===n.type)a=new A(r,n.id,t);else{if("error"!==n.type)return[d.fromError(E.invalidMessageError("can not match the message type"))];a=new E(r)}k.info("message received, type: "+n.type);var i=a.validate();return null!==i?(k.info("error message generated: "+i.desc),[d.fromError(i)]):a.react().reduce(function(e,t){var n=d.fromBehavior(t);return e.push(n),k.info("response message generated, type: "+n.type),e},[])}var q=function(){function e(){var t=this;Object(o.a)(this,e),this.handleClose=function(e){for(var n in t.peers)if(t.peers[n]===e)return void t.peers.splice(n,1)},this.handleConnection=function(e){t.peers.push(e)},this.handleBroadcast=function(e){t.broadcastBlock(e.blockObject,e.address,e.messageID)},this.peers=[],this.addPeers(H.getPeers()),N.shared().handler=this.handleBroadcast}return Object(s.a)(e,[{key:"addPeers",value:function(e){for(var t in e){new L(e[t]).connect(_,this.handleClose,this.handleConnection)}}}]),Object(s.a)(e,[{key:"broadcastBlock",value:function(e,t,n){for(var r in this.peers)if(this.peers[r].url!==t)try{var a=A.create(e).toDict(),i=new d("broadcast:block",a,n);this.peers[r].send(i.toJSON())}catch(c){k.info("failed to broadcast the block to "+this.peers[r].url+" due to "+c)}}},{key:"getAllCurrentPeers",value:function(){var e=[];for(var t in this.peers)e.push(this.peers[t].url);return e}}]),e}(),F=n(198),V=n(19),W=n(54),K=n.n(W),z=n(18),T=n(55),U=n.n(T),$=n(197),Z=n.n($),G=function(e){function t(){var e,n;Object(o.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={menuOpen:null,modalOpen:null,url:null},n.handleOpenPeerModal=function(){n.setState({modalOpen:!0,menuOpen:!1})},n.handleAddPeer=function(){H.addPeers([n.state.url]),n.handleModalClose(),b.emit("PEER_ADDED")},n.handleClick=function(e){n.setState({menuOpen:!0})},n.handleClose=function(){n.setState({menuOpen:null})},n.handleModalClose=function(){n.setState({modalOpen:null})},n.handleChange=function(){return function(e){n.setState({url:e.target.value})}},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state,n=t.menuOpen,r=t.modalOpen,i=a.a.createElement(K.a,{open:Boolean(r),onClose:this.handleModalClose},a.a.createElement("div",{className:e.paper},a.a.createElement(V.k,{required:!0,id:"standard-required",label:"Required",defaultValue:"(Enter peer url)",className:e.textField,margin:"normal",onChange:this.handleChange()}),a.a.createElement("div",null,a.a.createElement(V.b,{variant:"contained",color:"primary",onClick:this.handleAddPeer},"Add"))));return a.a.createElement(V.a,{position:"static",className:e.navbar},a.a.createElement(V.l,null,a.a.createElement(V.i,{id:"navMenu",open:Boolean(n),onClose:this.handleClose},a.a.createElement(V.j,{onClick:this.handleOpenPeerModal},"Add Peer")),a.a.createElement(U.a,{"aria-label":"Menu",onClick:this.handleClick},a.a.createElement(Z.a,null)),a.a.createElement(V.m,{variant:"h6",color:"inherit"},"Infnote Chain Browser")),i)}}]),t}(r.Component),X=Object(z.withStyles)(function(e){return{navbar:Object(F.a)({},e.mixins.toolbar,{flex:"0 0 auto",width:"100%"}),paper:{position:"absolute",width:50*e.spacing.unit,backgroundColor:e.palette.background.paper,boxShadow:e.shadows[5],padding:4*e.spacing.unit,outline:"none"},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:200}}})(G),Q=(n(119),function(e){function t(){var e,n;Object(o.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={selectedIndex:-1},n.handleRemove=function(e){n.setState({selectedIndex:-1}),b.emit("PEER_REMOVED",e)},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.state.selectedIndex,n=this.props,r=n.peers,i=n.onSelect;return a.a.createElement(V.d,{item:!0,className:"drawer"},a.a.createElement(V.m,{variant:"title",className:"title"},"Peer List"),a.a.createElement(V.e,null,r.map(function(n,r){return a.a.createElement(V.f,{button:!0,selected:t===r,key:r,onClick:function(){e.setState({selectedIndex:r}),i(n)()}},a.a.createElement(V.h,{primary:n.url,primaryTypographyProps:{className:"element"}}),a.a.createElement(V.g,null,a.a.createElement(U.a,{"aria-label":"Comments",onClick:e.handleRemove.bind(e,n)},"-")))})))}}]),t}(r.Component)),Y=function(e){function t(){var e,n;Object(o.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={selectedIndex:-1},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.state.selectedIndex,n=this.props,r=n.chains,i=n.onSelect;return a.a.createElement(V.d,{item:!0,className:"drawer"},a.a.createElement(V.m,{variant:"title",className:"title"},"Chain List"),a.a.createElement(V.e,null,Object.keys(r).map(function(n,c){return a.a.createElement(V.f,{button:!0,selected:t===c,key:c,onClick:function(){e.setState({selectedIndex:c}),i(n)()}},a.a.createElement(V.h,{primary:n,primaryTypographyProps:{className:"element"},secondary:"Block Count: "+r[n]}))})))}}]),t}(r.Component),ee=function(e){function t(){var e,n;Object(o.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={selectedIndex:-1},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.state.selectedIndex,n=this.props,r=n.onSelect,i=n.blocks;return a.a.createElement(V.d,{item:!0,className:"drawer"},a.a.createElement(V.m,{variant:"title",className:"title"},"Block List"),a.a.createElement(V.e,null,i.map(function(n){return a.a.createElement(V.f,{button:!0,selected:t===n,key:n,onClick:function(){e.setState({selectedIndex:n}),r(n)()}},a.a.createElement(V.h,{primary:n,primaryTypographyProps:{className:"element"}}))})))}}]),t}(r.Component);var te=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.block,n=e.classes;if(!t)return a.a.createElement(V.d,{item:!0});var r,i=new Date(1e3*t.time),c="",o=!1;try{c=JSON.parse(atob(t.payload)),"string"!=typeof(r=c)&&(r=JSON.stringify(r,void 0,2)),c=(r=r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="null"),'<span class="'+t+'">'+e+"</span>"}),o=!0}catch(s){t.payload.length>1e3&&(c=atob(t.payload).slice(0,500)+" ...("+(t.payload.length-1e3)+" bytes follow)")}return a.a.createElement(V.d,{item:!0,className:n.content},a.a.createElement(V.m,{variant:"title"},"Block Detail"),a.a.createElement("div",{className:n.space}),a.a.createElement(V.m,{variant:"overline"},"Time"),a.a.createElement(V.m,{variant:"subtitle1",className:n.value},i.toLocaleDateString()+" "+i.toLocaleTimeString()),a.a.createElement(V.c,null),a.a.createElement("div",{className:n.space}),a.a.createElement(V.m,{variant:"overline"},"Block Hash"),a.a.createElement(V.m,{variant:"subtitle1",className:n.value},t.hash),a.a.createElement(V.c,null),a.a.createElement("div",{className:n.space}),a.a.createElement(V.m,{variant:"overline"},"Previous Hash"),a.a.createElement(V.m,{variant:"subtitle1",className:n.value},0===t.prev_hash.length?"-":t.prev_hash),a.a.createElement(V.c,null),a.a.createElement("div",{className:n.space}),a.a.createElement(V.m,{variant:"overline"},"Signature"),a.a.createElement(V.m,{variant:"subtitle1",className:n.value},t.signature),a.a.createElement(V.c,null),a.a.createElement("div",{className:n.space}),a.a.createElement(V.m,{variant:"overline"},"Payload (",t.payload.length," bytes)"),o?a.a.createElement(V.m,{component:"pre",className:n.value,style:{color:"#D4D4D4"},dangerouslySetInnerHTML:{__html:c}}):a.a.createElement(V.m,{component:"pre",className:n.value,style:{color:"#D4D4D4"}},c))}}]),t}(r.Component),ne=Object(z.withStyles)(function(e){return{content:{width:0,flex:"1 1 auto",height:"100%",wordBreak:"break-word",padding:2*e.spacing.unit,overflow:"scroll"},value:{fontFamily:"Roboto Mono"},space:{height:3*e.spacing.unit}}})(te),re=function(e){function t(){var e,n;Object(o.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={peers:[],selectedPeer:null,selectedChain:null,chainList:{},blockList:[],block:null},n.handleIncomingBlock=function(e){if(!n.state.selectedPeer)return!1;var t=Object.assign({},n.state.chainList);if(Object.keys(n.state.chainList).filter(function(t){return t===e}).forEach(function(e){t[e]+=1}),n.setState({chainList:t}),n.state.selectedChain===e){var r=n.state.blockList.slice(0);r.unshift(r.length),n.setState({blockList:r})}},n.handlePeerAdded=function(){var e=H.getPeers().map(function(e){return new L(e)});n.setState({peers:e})},n.handlePeerRemoved=function(e){H.removePeers([e]);var t=n.state.peers;t.splice(t.indexOf(e.url),1),n.setState({peers:t,selectedPeer:null,selectedChain:null,chainList:{},blockList:[],block:null})},n.handleSelectPeer=function(e){return function(){var t=n.state.selectedPeer;e!==t&&(t&&t.close(),e.isConnect&&e.close(),n.setState({selectedPeer:e}),e.connect(function(e){var t=d.fromJSON(e);if("info"===t.type)n.setState({chainList:t.data.chains});else if("response:blocks"===t.type){var r=t.data.blocks;r.length>0&&n.setState({block:r[0]})}}))}},n.handleSelectChain=function(e){return function(){for(var t=[],r=n.state.chainList[e]-1;r>=0;r--)t.push(r);n.setState({selectedChain:e,blockList:t})}},n.handleSelectBlock=function(e){return function(){var t=n.state,r=t.selectedPeer,a=t.selectedChain;r.send(JSON.stringify({id:d.generateID(),type:"request:blocks",data:{chain_id:a,from:e,to:e}}))}},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){b.on("NEW_BLOCK",this.handleIncomingBlock.bind(this)),b.on("PEER_REMOVED",this.handlePeerRemoved.bind(this)),b.on("PEER_ADDED",this.handlePeerAdded.bind(this));var e=H.getPeers().map(function(e){return new L(e)});this.setState({peers:e})}},{key:"render",value:function(){var e=this.props.classes,t=this.state,n=t.peers,r=t.chainList,i=t.blockList,c=t.block;return a.a.createElement(V.d,{container:!0,className:e.grid,direction:"row"},a.a.createElement(Q,{peers:n,onSelect:this.handleSelectPeer}),a.a.createElement(Y,{chains:r,onSelect:this.handleSelectChain}),a.a.createElement(ee,{blocks:i,onSelect:this.handleSelectBlock}),a.a.createElement(ne,{block:c}))}}]),t}(r.Component),ae=Object(z.withStyles)(function(e){return{grid:{flex:"1 1 auto"}}})(re),ie=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){this.service=new q}},{key:"render",value:function(){var e=this.props.classes;return a.a.createElement("div",{className:e.container},a.a.createElement(X,null),a.a.createElement(ae,null))}}]),t}(r.Component),ce=Object(z.withStyles)(function(e){return{container:{position:"fixed",left:0,right:0,top:0,bottom:0,display:"flex",flexDirection:"column"}}})(ie);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(ce,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()}),H.migrate()},65:function(e,t,n){"use strict";(function(e){var r=n(20),a=n(2),i=n(34),c=n.n(i),o=n(31),s=n(38),l=n.n(s),u=function(){function t(){Object(r.a)(this,t),this.blockHash="",this.prevHash="",this.time=0,this.signature="",this.height=0,this.payload=""}return Object(a.a)(t,null,[{key:"fromJSON",value:function(e){var n=JSON.parse(e);return t.fromDict(n)}},{key:"fromDict",value:function(e){var n=new t;return n.blockHash=e.hash,n.prevHash=e.prev_hash,n.time=e.time,n.signature=e.signature,n.height=e.height,n.payload=e.payload,n}}]),Object(a.a)(t,[{key:"toDict",value:function(){return{hash:this.blockHash,time:this.time,signature:this.signature,height:this.height,payload:this.payload,prev_hash:this.prevHash}}},{key:"isValid",value:function(){return(0===this.height||null!=this.prevHash&&this.prevHash.length>0)&&c.a.encode(l()("sha256").update(this.dataForHashing).digest())===this.blockHash}},{key:"toJSON",value:function(){return JSON.stringify(this.toDict())}},{key:"isGenesis",get:function(){return 0===this.height}},{key:"dataForHashing",get:function(){var t=this.toDict(),n=t.height.toString()+t.time.toString(),r=new e(n);t.height>0&&(r=e.concat([r,c.a.decode(t.prev_hash)]));var a=e.from(t.payload,"base64");return e.concat([r,a])}},{key:"chainID",get:function(){return o.c.recoverAddress(this.signature,this.dataForHashing)}}]),t}();t.a=u}).call(this,n(29).Buffer)}},[[271,2,1]]]);
//# sourceMappingURL=main.9a2d4ebd.chunk.js.map