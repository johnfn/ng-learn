/// <reference path="../typings/tsd.d.ts" />
var clone;
(function (clone) {
    var PhonecatApp = (function () {
        function PhonecatApp($scope) {
            this.$scope = $scope;
            $scope.phones = [
                { 'name': 'Nexus S',
                    'snippet': 'Fast just got faster with Nexus S.' },
                { 'name': 'Motorola XOOM™ with Wi-Fi',
                    'snippet': 'The Next, Next Generation tablet.' },
                { 'name': 'MOTOROLA XOOM™',
                    'snippet': 'The Next, Next Generation tablet.' }];
        }
        PhonecatApp.$inject = [
            '$scope'
        ];
        return PhonecatApp;
    })();
    clone.PhonecatApp = PhonecatApp;
})(clone || (clone = {}));
//# sourceMappingURL=main.js.map