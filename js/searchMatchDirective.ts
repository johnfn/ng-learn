/// <reference path="defs.d.ts" />

/**
 *
 * Created by grant on 6/4/15.
 */

module clone {
    export function searchMatchDirective(): ng.IDirective {
        return {
            templateUrl: "templates/search-match.html",
            restrict: 'E'
        };
    }
}