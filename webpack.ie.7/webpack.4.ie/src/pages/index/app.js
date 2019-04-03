import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';
import List from './list';
var list = new List(document.body);
list.load();
list.on('hello', (msg)=>{
    window.alert(msg);
});
window.list = list;
