'use strict';

angular.module('dashboardApp').factory('fundService' , ['$http', function($http){
  return {
    getFundList : function(){
      var res = $http.get('/resources/funds.json').then(function(result){
        return result.data;
      });
      return res;
    },
    getFund : function(fundCode){
      var res = $http.get('/resources/fund/' + fundCode + '.json').then(function(result){
        return result.data;
      });
      return res;
    }
  };
}]);

angular.module('dashboardApp').controller('MainCtrl', function ($scope, fundService) {
  $scope.selectedFund = [];
  $scope.funds = [];

  var fundSelectionChanged = function(data){
    if(data.selected){
      console.log('Selected fund is ' + data.entity.code);
    }
  };

  /* Top grid data */
  var res = fundService.getFundList();
  res.then(function(data){
    if(data.length > 0){
      $scope.funds = data;
      $scope.selectedFund[0] = data[0];
    }
  });

  /* Top grid columns initialisation */
  var cols =
  [
    {field:'code', displayName:'Code portefeuille'},
    {field:'label', displayName:'Libellé portefeuille'},
    {field:'devise', displayName:'Devise'},
    {field:'lastVal', displayName:'Dernière valo', cellFilter:'date:\'dd/MM/yyyy\''},
    {field:'nextVal', displayName:'Prochaine valo', cellFilter:'date:\'dd/MM/yyyy\''}
  ];

  /* Top grid options */
  $scope.fundsGridOptions =
  {
    data : 'funds',
    columnDefs : cols,
    enableColumnReordering : true,
    enableColumnResize : true,
    multiSelect : false,
    showFilter : true,
    showSelectionCheckbox : true,
    selectedItems : $scope.selectedFund,
    plugins : [new ngGridFlexibleHeightPlugin()],
    afterSelectionChange : fundSelectionChanged
  };
});
