/// <reference path="defs.d.ts" />

module clone {
  angular.module("clone", [])
    .controller('phoneListCtrl', PhoneListCtrl)
    .directive('searchMatchDirective', searchMatchDirective)
    .service('postList', PostListFactory)
  ;
}