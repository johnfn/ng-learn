/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    var Thingy = (function () {
        function Thingy(name) {
            this.name = name;
        }
        return Thingy;
    })();
    var PostListService = (function () {
        function PostListService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        PostListService.prototype.getPosts = function () {
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
        return PostListService;
    })();
    clone.PostListService = PostListService;
    var IndividualPostService = (function () {
        function IndividualPostService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        IndividualPostService.prototype.getPost = function () {
            var $http = this.$http;
            var $q = this.$q;
            var deferred = $q.defer();
            $http.get("https://hacker-news.firebaseio.com/v0/item/9680982.json")
                .success(function (data) {
            })
                .error(function (errorMessage) {
                console.log(errorMessage);
                deferred.reject(errorMessage);
            });
            return deferred.promise;
        };
        return IndividualPostService;
    })();
    clone.IndividualPostService = IndividualPostService;
    var PhoneListCtrl = (function () {
        function PhoneListCtrl($scope, $filter, postListService, individualPostService) {
            this.$scope = $scope;
            this.$filter = $filter;
            this.postListService = postListService;
            this.individualPostService = individualPostService;
            $scope.vm = this;
            $scope.searchResults = [];
            $scope.phones = [
                new Thingy("Test one"),
                new Thingy("Different test"),
                new Thingy("Wow, its a new thingy.")
            ];
            postListService
                .getPosts()
                .then(this.loadPosts);
        }
        PhoneListCtrl.prototype.loadPosts = function (ids) {
            console.log(ids);
        };
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
        return PhoneListCtrl;
    })();
    clone.PhoneListCtrl = PhoneListCtrl;
})(clone || (clone = {}));
/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    function searchMatchDirective() {
        return {
            templateUrl: "templates/search-match.html",
            restrict: 'E'
        };
    }
    clone.searchMatchDirective = searchMatchDirective;
})(clone || (clone = {}));
/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    angular.module("clone", [])
        .controller('phoneListCtrl', clone.PhoneListCtrl)
        .directive('searchMatchDirective', clone.searchMatchDirective)
        .service('postListService', clone.PostListService)
        .service('individualPostService', clone.IndividualPostService);
})(clone || (clone = {}));
//# sourceMappingURL=main.js.map