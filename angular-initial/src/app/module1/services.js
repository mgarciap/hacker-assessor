function Module1Service($http) {
    var url = 'http://...';
    
    return {
        query: function(search) {
            var query = {
                params: search || ''
            };
            
            return $http.get(url, query)
                .then(function(response) {
                    return response.data;
                });
        },
        get: function(id) {
            return $http.get(url + '/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    };
}
