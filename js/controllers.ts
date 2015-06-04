/// <reference path="defs.d.ts" />

module clone {
  interface ITest extends ng.IScope {
    phones: {[key: string]: string}[];
  }

  export class PhoneListCtrl {

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = [
      '$scope'
    ];

    // TODO: It appears that you can define your own scope types
    // TODO: Hmm, some smart ppl say to use 'this'

    constructor(private $scope: ITest) {
      $scope.phones = [
        {'name': 'Nexus S',
         'snippet': 'Fast just got faster with Nexus S.'},
        {'name': 'Motorola XOOM™ with Wi-Fi',
         'snippet': 'The Next, Next Generation tablet.'},
        {'name': 'MOTOROLA XOOM™',
         'snippet': 'The Next, Next Generation tablet.'}];
    }
  }
 }