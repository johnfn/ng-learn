/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    var PhoneListCtrl = (function () {
        function PhoneListCtrl($scope) {
            this.$scope = $scope;
            $scope.phones = [
                { 'name': 'Nexus S',
                    'snippet': 'Fast just got faster with Nexus S.' },
                { 'name': 'Motorola XOOM™ with Wi-Fi',
                    'snippet': 'The Next, Next Generation tablet.' },
                { 'name': 'MOTOROLA XOOM™',
                    'snippet': 'The Next, Next Generation tablet.' }];
        }
        PhoneListCtrl.$inject = [
            '$scope'
        ];
        return PhoneListCtrl;
    })();
    clone.PhoneListCtrl = PhoneListCtrl;
})(clone || (clone = {}));
/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    angular.module("clone", [])
        .controller('phoneListCtrl', clone.PhoneListCtrl);
})(clone || (clone = {}));
//# sourceMappingURL=main.js.map