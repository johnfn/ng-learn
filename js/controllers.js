/// <reference path="defs.d.ts" />
var clone;
(function (clone) {
    var Thingy = (function () {
        function Thingy(name) {
            this.name = name;
        }
        return Thingy;
    })();
    function PostList($resource) {
    }
    clone.PostList = PostList;
    var PhoneListCtrl = (function () {
        // TODO: It appears that you can define your own scope types
        // TODO: Hmm, some smart ppl say to use 'this'
        function PhoneListCtrl($scope, $filter) {
            this.$scope = $scope;
            this.$filter = $filter;
            $scope.vm = this;
            $scope.searchResults = [];
            $scope.phones = [
                new Thingy("Test one"),
                new Thingy("Different test"),
                new Thingy("Wow, its a new thingy.")
            ];
        }
        PhoneListCtrl.prototype.resetList = function () {
            var list = this.$scope.phones;
            for (var i = 0; i < list.length; i++) {
                list[i].isPartOfSearch = false;
            }
        };
        PhoneListCtrl.prototype.updateQuery = function (newQuery) {
            var filterResult = this.$filter('filter')(this.$scope.phones, this.$scope.query);
            newQuery = newQuery.toUpperCase();
            for (var i = 0; i < filterResult.length; i++) {
                var startIndex = filterResult[i].name.toUpperCase().indexOf(newQuery);
                var name = filterResult[i].name;
                filterResult[i].beforeMatch = name.substr(0, startIndex);
                filterResult[i].match = name.substr(startIndex, newQuery.length);
                filterResult[i].afterMatch = name.substr(startIndex + newQuery.length);
            }
            this.$scope.searchResults = filterResult;
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        PhoneListCtrl.$inject = [
            '$scope',
            '$filter'
        ];
        return PhoneListCtrl;
    })();
    clone.PhoneListCtrl = PhoneListCtrl;
})(clone || (clone = {}));
//# sourceMappingURL=controllers.js.map