/// <reference path="defs.d.ts" />

module clone {
    interface ITest extends ng.IScope {
        phones: Thingy[];
        updateQuery: (newValue: string) => void;
        vm: PhoneListCtrl;
        query: string;
        searchResults: Thingy[];
        data: number[];
        debug: string;
    }

    class Thingy {

        // Search related stuff
        public isPartOfSearch: boolean;
        public beforeMatch: string;
        public match: string;
        public afterMatch: string;

        constructor(public name: string) {

        }
    }

    export class PostListFactory {
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }

        getPosts(): ng.IPromise<number[]> {
            var $http = this.$http;
            var $q = this.$q;

            var deferred = $q.defer();

            $http.get("https://hacker-news.firebaseio.com/v0/topstories.json")
                .success((data: number[]) => {
                    deferred.resolve(data.slice(0, 10));
                })
                .error((data: string) => {
                    deferred.reject(data);
                });

            return deferred.promise;
        }
    }

    export class PhoneListCtrl {
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = [
            '$scope',
            '$filter',
            '$http',
            'postList'
        ];

        // TODO: It appears that you can define your own scope types
        // TODO: Hmm, some smart ppl say to use 'this'
        constructor(
            private $scope: ITest,
            private $filter: ng.IFilterService,
            private $http: ng.IHttpService,
            private postListFactory: PostListFactory) {

            $scope.vm = this;

            $scope.searchResults = [];
            $scope.phones = [
                new Thingy("Test one"),
                new Thingy("Different test"),
                new Thingy("Wow, its a new thingy.")
            ];

            postListFactory
                .getPosts()
                .then((result: number[]) => {
                    $scope.data = result;

                    $scope.$broadcast("ids-loaded");
                });
        }

        resetList() {
            var list = this.$scope.phones;
            for (var i = 0; i < list.length; i++) {
                list[i].isPartOfSearch = false;
            }
        }

        updateQuery(newQuery: string) {
            var filterResult: Thingy[] = this.$filter('filter')(this.$scope.phones, this.$scope.query);

            newQuery = newQuery.toUpperCase();

            for (var i = 0; i < filterResult.length; i++) {
                var startIndex = filterResult[i].name.toUpperCase().indexOf(newQuery);
                var name = filterResult[i].name;

                filterResult[i].beforeMatch = name.substr(0, startIndex);
                filterResult[i].match = name.substr(startIndex, newQuery.length);
                filterResult[i].afterMatch = name.substr(startIndex + newQuery.length);
            }

            this.$scope.searchResults = filterResult;
        }
    }
}