function s() {
    var t = 1

    function cs() {
        return (function nl(s) {
            t = t * s
            return arguments.callee.caller;
        })(arguments[0])
    }
    cs.toString = function() {
        return t
    }
    return cs(arguments[0])
}