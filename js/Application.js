/// <reference path="defs.d.ts" />
// TODO: Is there a way to register these things automatically? There should be.
// TODO ^ I can use decorators... whoah... @_@
// TODO I think I would have to use some sort of setTimeout(0) thing to ensure all decorators were read first...
// ... Or some sort of ordering thing...
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
//# sourceMappingURL=Application.js.map