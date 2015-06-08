/// <reference path="defs.d.ts" />

module clone {
    angular.module("clone", ["ngRoute"])
        .controller('phoneListCtrl', PhoneListCtrl)
        .directive('searchMatchDirective', searchMatchDirective)
        .service('postListService', PostListService)
        .service('individualPostService', IndividualPostService)
        .config(($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider
                .when("/:id", {
                    templateUrl: "partials/post-detail.html",
                    controller: "PostDetailController"
                })
                .when("/", {
                    templateUrl: "index.html",
                    controller: "phoneListCtrl"
                });
        })
  ;
}