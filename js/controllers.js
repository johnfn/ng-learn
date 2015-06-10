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
        function PostDetailController($scope) {
            this.$scope = $scope;
            $scope.test = "testing.";
        }
        return PostDetailController;
    })();
    clone.PostDetailController = PostDetailController;
})(clone || (clone = {}));
//# sourceMappingURL=controllers.js.map