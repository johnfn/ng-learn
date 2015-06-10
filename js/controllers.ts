/// <reference path="defs.d.ts" />

module clone {
    interface ITest extends ng.IScope {
        posts: HNPost[];
        updateQuery: (newValue: string) => void;
        vm: PhoneListCtrl;
        query: string;
        data: number[];
        debug: string;
    }

    export class PostListService {
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }

        getPosts(): ng.IPromise<number[]> {
            var $http = this.$http;
            var $q = this.$q;

            var deferred = $q.defer();

            $http.get("https://hacker-news.firebaseio.com/v0/topstories.json")
                .success((data: number[]) => {
                    deferred.resolve(data.slice(0, 20));
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
        private id: number;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }

        getPost(id: number): ng.IPromise<HNPost> {
            var $http = this.$http;
            var $q = this.$q;

            var deferred = $q.defer();

            $http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .success((data: HNPost) => {
                    deferred.resolve(data);
                })
                .error((errorMessage: string) => {
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
            private individualPostService: IndividualPostService
        ) {

            $scope.vm = this;
            $scope.posts = [];

            postListService
                .getPosts()
                .then((ids: number[]) => this.loadPosts(ids));
        }

        loadPosts(ids: number[]): void {
            ids.map((id, i) => {
                this.individualPostService
                    .getPost(id)
                    .then((post: HNPost) => {
                        this.$scope.posts[i] = post
                    });
            });
        }
    }

    interface IPostDetailScope extends ng.IScope {
        test: string;
    }

    export class PostDetailController {
        constructor(
            private $scope: IPostDetailScope
        ) {
            $scope.test = "testing.";
        }
    }
}