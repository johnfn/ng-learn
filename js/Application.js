/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    angular.module("clone", [])
        .controller('phoneListCtrl', clone.PhoneListCtrl)
        .directive('searchMatchDirective', clone.searchMatchDirective)
        .service('postList', clone.PostListFactory);
})(clone || (clone = {}));
//# sourceMappingURL=Application.js.map