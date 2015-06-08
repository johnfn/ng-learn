/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    angular.module("clone", [])
        .controller('phoneListCtrl', clone.PhoneListCtrl)
        .directive('searchMatchDirective', clone.searchMatchDirective)
        .service('postListService', clone.PostListService)
        .service('individualPostService', clone.IndividualPostService);
})(clone || (clone = {}));
//# sourceMappingURL=Application.js.map