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

    export class PostListService {
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

    interface HNPost {
        by: string;
        descendants: number;
        id: number;
        kids: number[];
        score: number;
        text: string;
        time: number;
        title: string;
        type: string;
        url: string;
    }

    export class IndividualPostService {
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }

        getPost(): ng.IPromise<HNPost> {
            var $http = this.$http;
            var $q = this.$q;

            var deferred = $q.defer();

            $http.get("https://hacker-news.firebaseio.com/v0/item/9680982.json")
                .success((data: HNPost) => {

                })
                .error((errorMessage: string) => {
                    console.log(errorMessage);

                    deferred.reject(errorMessage);
                });

            return deferred.promise;
        }
    }

    export class PhoneListCtrl {
        constructor(
            private $scope: ITest,
            private $filter: ng.IFilterService,
            private postListService: PostListService,
            private individualPostService: IndividualPostService) {

            $scope.vm = this;

            $scope.searchResults = [];
            $scope.phones = [
                new Thingy("Test one"),
                new Thingy("Different test"),
                new Thingy("Wow, its a new thingy.")
            ];

            postListService
                .getPosts()
                .then(this.loadPosts);
        }

        loadPosts(ids: number[]) {
            console.log(ids);
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