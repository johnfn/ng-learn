/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
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
                deferred.resolve(data.slice(0, 20));
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
        IndividualPostService.prototype.getPost = function (id) {
            var $http = this.$http;
            var $q = this.$q;
            var deferred = $q.defer();
            $http.get("https://hacker-news.firebaseio.com/v0/item/" + id + ".json")
                .success(function (data) {
                deferred.resolve(data);
            })
                .error(function (errorMessage) {
                deferred.reject(errorMessage);
            });
            return deferred.promise;
        };
        return IndividualPostService;
    })();
    clone.IndividualPostService = IndividualPostService;
    var PhoneListCtrl = (function () {
        function PhoneListCtrl($scope, $filter, postListService, individualPostService) {
            var _this = this;
            this.$scope = $scope;
            this.$filter = $filter;
            this.postListService = postListService;
            this.individualPostService = individualPostService;
            $scope.vm = this;
            $scope.posts = [];
            postListService
                .getPosts()
                .then(function (ids) { return _this.loadPosts(ids); });
        }
        PhoneListCtrl.prototype.loadPosts = function (ids) {
            var _this = this;
            ids.map(function (id, i) {
                _this.individualPostService
                    .getPost(id)
                    .then(function (post) {
                    _this.$scope.posts[i] = post;
                });
            });
        };
        return PhoneListCtrl;
    })();
    clone.PhoneListCtrl = PhoneListCtrl;
    var PostDetailController = (function () {
        function PostDetailController($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.test = $routeParams.id;
        }
        return PostDetailController;
    })();
    clone.PostDetailController = PostDetailController;
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
    angular.module("clone", ["ngRoute"])
        .controller('phoneListCtrl', clone.PhoneListCtrl)
        .controller('postDetailController', clone.PostDetailController)
        .directive('searchMatchDirective', clone.searchMatchDirective)
        .service('postListService', clone.PostListService)
        .service('individualPostService', clone.IndividualPostService)
        .config(function ($routeProvider) {
        $routeProvider
            .when("/:id", {
            templateUrl: "partials/post-detail.html",
            controller: "postDetailController"
        })
            .when("/", {
            templateUrl: "partials/main.html",
            controller: "phoneListCtrl"
        });
    });
})(clone || (clone = {}));
//# sourceMappingURL=main.js.map