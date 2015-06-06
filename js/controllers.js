/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    var Thingy = (function () {
        function Thingy(name) {
            this.name = name;
        }
        return Thingy;
    })();
    var PostListFactory = (function () {
        function PostListFactory($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        PostListFactory.prototype.getPosts = function () {
            var $http = this.$http;
            var $q = this.$q;
            var deferred = $q.defer();
            $http.get("https://hacker-news.firebaseio.com/v0/topstories.json")
                .success(function (data) {
                deferred.resolve(data.slice(0, 10));
            })
                .error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };
        return PostListFactory;
    })();
    clone.PostListFactory = PostListFactory;
    var PhoneListCtrl = (function () {
        // TODO: It appears that you can define your own scope types
        // TODO: Hmm, some smart ppl say to use 'this'
        function PhoneListCtrl($scope, $filter, $http, postListFactory) {
            this.$scope = $scope;
            this.$filter = $filter;
            this.$http = $http;
            this.postListFactory = postListFactory;
            $scope.vm = this;
            $scope.searchResults = [];
            $scope.phones = [
                new Thingy("Test one"),
                new Thingy("Different test"),
                new Thingy("Wow, its a new thingy.")
            ];
            postListFactory
                .getPosts()
                .then(function (result) {
                $scope.data = result;
                $scope.$broadcast("ids-loaded");
            });
        }
        PhoneListCtrl.prototype.resetList = function () {
            var list = this.$scope.phones;
            for (var i = 0; i < list.length; i++) {
                list[i].isPartOfSearch = false;
            }
        };
        PhoneListCtrl.prototype.updateQuery = function (newQuery) {
            var filterResult = this.$filter('filter')(this.$scope.phones, this.$scope.query);
            newQuery = newQuery.toUpperCase();
            for (var i = 0; i < filterResult.length; i++) {
                var startIndex = filterResult[i].name.toUpperCase().indexOf(newQuery);
                var name = filterResult[i].name;
                filterResult[i].beforeMatch = name.substr(0, startIndex);
                filterResult[i].match = name.substr(startIndex, newQuery.length);
                filterResult[i].afterMatch = name.substr(startIndex + newQuery.length);
            }
            this.$scope.searchResults = filterResult;
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        PhoneListCtrl.$inject = [
            '$scope',
            '$filter',
            '$http',
            'postList'
        ];
        return PhoneListCtrl;
    })();
    clone.PhoneListCtrl = PhoneListCtrl;
})(clone || (clone = {}));
//# sourceMappingURL=controllers.js.map