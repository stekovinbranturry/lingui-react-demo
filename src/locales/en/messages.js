/* eslint-disable */module.exports={languageData:{"plurals":function(n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}},messages:{"Add":"Add","Edit <0>src/App.js</0> and save to reload.":"Edit <0>src/App.js</0> and save to reload.","LL dddd":"LL dddd","Learn React":"Learn React","Minus":"Minus","Switch to English":"Switch to English","This is footer":"This is footer","This is {test}":function(a){return["This is ",a("test")]},"switch.btn":"\u5207\u6362\u5230\u4E2D\u6587","test":"test","{0}\u5206\u949F\u524D":function(a){return[a("0")," mins ago"]},"{0}\u5C0F\u65F6\u524D":function(a){return[a("0")," hrs ago"]},"{count, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}":function(a){return[a("count","selectordinal",{one:["#","st"],two:["#","nd"],few:["#","rd"],other:["#","th"]})]},"{gender, select, male {His book} female {Her book} other {Their book}}":function(a){return[a("gender","select",{male:"His book",female:"Her book",other:"Their book"})]},"{hrs}\u5C0F\u65F6\u524D":function(a){return[a("hrs")," hrs ago"]},"{messagesCount, plural, =0 {There's # message in your inbox} =1 {There's # message in your inbox} other {There're # messages in your inbox}}":function(a){return[a("messagesCount","plural",{0:["There's ","#"," message in your inbox"],1:["There's ","#"," message in your inbox"],other:["There're ","#"," messages in your inbox"]})]},"{mins}\u5206\u949F\u524D":function(a){return[a("mins")," mins ago"]},"\u521A\u521A":"Just now","\u524D\u5929":"DBY","\u6628\u5929":"Yesterday"}};