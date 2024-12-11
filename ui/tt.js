
const load = f => (name, ...args) =>
    map.has(name) ? f(map.get(name), ...args) : null

const load1 = function (f) {
    return function (name, ...args) {
        return map.has(name) ? f(map.get(name), ...args) : null;
    }
}