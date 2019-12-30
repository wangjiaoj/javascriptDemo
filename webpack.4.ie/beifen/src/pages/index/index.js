import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';
import List from '../../components/list/index.js';
import '../../components/common.css';
var list = new List(document.body);
list.load();
list.on('hello', (msg) => {
    window.alert(msg);
});
window.list = list;