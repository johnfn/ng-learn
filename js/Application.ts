/// <reference path="defs.d.ts" />

// TODO: Is there a way to register these things automatically? There should be.
// TODO ^ I can use decorators... whoah... @_@
// TODO I think I would have to use some sort of setTimeout(0) thing to ensure all decorators were read first...
// ... Or some sort of ordering thing...

module clone {
    angular.module("clone", ["ngRoute"])
        .controller('phoneListCtrl', PhoneListCtrl)
        .controller('postDetailController', PostDetailController)
        .directive('searchMatchDirective', searchMatchDirective)
        .service('postListService', PostListService)
        .service('individualPostService', IndividualPostService)
        .config(($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider
                .when("/:id", {
                    templateUrl: "partials/post-detail.html",
                    controller: "postDetailController"
                })
                .when("/", {
                    templateUrl: "partials/main.html",
                    controller: "phoneListCtrl"
                });
        })
  ;
}