import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';
import Event from '../../components/EventEmitter';
import '../../components/common.css';
import '../../components/ifind-ui.css';
var list = new Event();

list.on('hello', (msg) => {
    window.alert(msg);
});