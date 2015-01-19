function Module1Controller(Module1Service, some_array) {
    var that = this;
    that.name = 'Module1Controller';
    that.items = some_array;
}

Module1Controller.resolve = {
    some_array: function() {
        return ['some here', 'some there'];
    }
};
