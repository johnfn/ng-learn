/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    angular.module("clone", ["ngRoute"])
        .controller('phoneListCtrl', clone.PhoneListCtrl)
        .directive('searchMatchDirective', clone.searchMatchDirective)
        .service('postListService', clone.PostListService)
        .service('individualPostService', clone.IndividualPostService)
        .config(function ($routeProvider) {
        $routeProvider
            .when("/:id", {
            templateUrl: "partials/post-detail.html",
            controller: "PostDetailController"
        })
            .when("/", {
            templateUrl: "index.html",
            controller: "phoneListCtrl"
        });
    });
})(clone || (clone = {}));
//# sourceMappingURL=Application.js.map