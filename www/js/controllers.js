angular.module('starter.controllers', ['chart.js','ionic','ionic-color-picker'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout , $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  
  // Triggered in the login modal to close it

  $scope.closeLogin = function() {
    $scope.loginModal.hide();
    $ionicPopup.alert({
              title: 'Success',
              content: 'Anda Berhasil Hello World!!!'
            }).then(function(res) {
              console.log('Test Alert Box');
            });    
  };

  

  
  // Create the login modal that we will use later
  
  
  //*******************************************************************************************
  //* end proses pengeluaran

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
      $scope.loginModal.remove();
      $scope.pengeluaranModal.remove();
      $scope.pemasukanModal.remove();
      $scope.tambahModal.remove();

  });


})


.controller('popoverCtrl', function($scope, $ionicPopover) {

  // .fromTemplate() method
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
})

.factory("items", function(){
  var items = {};
  items.isi=[
    { title: 'makan', jumlah: 2000, id: 1 },
    { title: 'minum', jumlah: 2000, id: 2 },
    { title: 'ngopi', jumlah: 2000, id: 3 },
    { title: 'burjo', jumlah: 2000, id: 4 },
    { title: 'Rap',   jumlah: 0, id: 5 },
    { title: 'Cowbe', jumlah: null, id: 6 }
  ];
  return items;
})

.controller('PlaylistsCtrl', function($scope, items) {
  $scope.items = items;
  $scope.addItem = function (index) {
        items.isi.push({            
            title: $scope.newItemName
        });
    }
})

.controller('tambahCtrl',function($scope, $ionicModal, $timeout , $ionicPopup, $cordovaSQLite,$filter){
$ionicModal.fromTemplateUrl('templates/tambah.html', {    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.tambahModal = modal;
  });
  // Open the login modal
  $scope.tambah = function() {
    $scope.tambahModal.show();
  };

  // Triggered in the login modal to close it
  $scope.closeTambah = function() {
    $scope.tambahModal.hide();    
    
  };
   $scope.$on('$destroy', function() {      
      $scope.tambahModal.remove();
  });
       
       var bulan = [];
       var sumtotal = [];
       var total = 0;

       var gb = "";
       var bulanP = [];
       var sumtotalP = [];
       var totalP = 0;

       var query = "SELECT pemasukan.*,sum(pemasukan.jumlah) as total,substr(tanggal, 1, 7) grouBln FROM pemasukan group by grouBln";
       var data =  $cordovaSQLite.execute(db, query).then(function(res) {
           if(res.rows.length > 0) {                
               for(i=0;i<res.rows.length;i++){                    
                  sumtotal[i] = res.rows.item(i).total;
                  // total += (res.rows.item(i)).total;                                    
                  bulan[i] = $filter('date')(new Date(res.rows.item(i).tanggal), "MMMM");
                  sumtotalP[i] = 0;
                      gb = res.rows.item(i).grouBln;
                      var query2 = "SELECT pengeluaran.*, sum(pengeluaran.jumlah) as jumlah, substr(tanggal, 1, 7) grouBlns FROM pengeluaran group by grouBlns";
                      //var query2 = "SELECT tanggal,sum(jumlah) jumlah FROM pengeluaran where substr(tanggal, 1, 7)='"+gb+"' group by jumlah";
                      var data2 =  $cordovaSQLite.execute(db, query2).then(function(res) {
                         if(res.rows.length > 0) {                
                             for(i=0;i<res.rows.length;i++){                    
                                sumtotalP[i] = res.rows.item(i).jumlah;                                
                                bulanP[i] = $filter('date')(new Date(res.rows.item(i).tanggal), "MMMM");                
                             }                             
                         } else {                            
                            console.log(sumtotalP);
                         }
                      }, function (err) {
                         console.error(err);
                      });
               }               
           } else {
               console.log("No results found");
           }
       }, function (err) {
           console.error(err);
       });

       
   //console.log();
       $scope.labels = bulan;
       $scope.series = ['Pemasukan','Pengeluaran'];
       $scope.colour = ['#00FF00','#FF0000'];
       $scope.datass = [sumtotal,sumtotalP];       

})


.controller('PlaylistCtrl', function($scope, $stateParams) {
})

  //color pic
.controller('MainCtrl', function($scope,$http, $ionicModal, $timeout , $ionicPopup, $cordovaSQLite, $stateParams){
    $scope.doSaveKategori = function() {            

            var data = $scope.kategoriData;
            //var data2 = $scope.datas;
            var query = "INSERT INTO kategori (nama) VALUES (?)";
            $cordovaSQLite.execute(db, query, [data.nama]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
                var alertPopup = $ionicPopup.alert({
                    title: 'Success',
                    template: 'data '+res.insertId+' berhasil disimpan'
                });
                var query = "SELECT * FROM kategori order by id desc";
                var data =  $cordovaSQLite.execute(db, query).then(function(res) {
                    if(res.rows.length > 0) {                
                        for(i=0;i<res.rows.length;i++){
                            data[i] = res.rows.item(i);          
                        }                
                        $scope.kategoris =data;                                                
                    } else {
                        console.log("No results found");
                    }
                }, function (err) {
                    console.error(err);
                });
                    
            }, function (err) {
                console.error(err);
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'data gagal disimpan'
                });
                
            });
    };

  // $scope.kategori = {
  //    first : null,
  //    warna : null,
  //    third : null
  // };

  // $scope.customColors = {
  //   "redcanaglia" : "#ff0000",
  //   "canaryblue" : "#33ffff"
  // };
})

// .controller('grafikCtrl',function($scope,$ionicModal, $ionicPopup,$cordovaSQLite,$state,$stateParams,$filter){
//       $scope.showchart=true;
//       $scope.hidechart=false;
      
//       var dataLabels = [];
//       var dataNilai = [];
//       var total = 0;      
//       var arr=[];

//       var queryx = "SELECT pemasukan.*,sum(pemasukan.jumlah) total,substr(tanggal, 1, 7) grouBln FROM pemasukan join kategori on pemasukan.kategori=kategori.id group by grouBln";
//       var data =  $cordovaSQLite.execute(db, queryx).then(function(res) {
//              if(res.rows.length > 0) {            
//                  for(i=0;i<res.rows.length;i++){                    
//                   var b = $filter('date')(new Date(res.rows.item(i).tanggal), "MMMM");                
//                      dataLabels[i] = b;
//                      total += res.rows.item(i).total;                                 
//                      arr[b] = total;
//                      dataNilai[i] = res.rows.item(i).total;                   
//                  }                                                                   
//                  // $scope.totalBulanArr = arr;
//                  // console.log(arr); 
//              } else {

//                  console.log("No results found");
//              }           

//            }, function (err) {
//              console.error(err);
//       });        
      
//       // console.log(arr);
//       $scope.labels = dataLabels;
//       $scope.datas = dataNilai;    


      

//       $scope.onClick = function (points, evt) {  
//         var labelClick = points[0]['label'];                  
//         $state.go('app.detilbulan',{'bln' : labelClick });
//       };

 

// })
// .controller('donatCtrl',function($scope,$ionicModal, $ionicPopup,$cordovaSQLite, $stateParams,$filter){
//        //routing detilbulan data
//       $scope.totalBulan = 0;      

//           var dataLabels = [];
//           var dataNilai = [];
//           var dataWarna = [];
//           var dataKategori = [];
//           var total = 0;

//           var cariBulan = "2000-"+$stateParams.bln+"20";
//           var filterBln = $filter('date')(new Date(cariBulan), "MM");
//           var queryx = "SELECT pemasukan.*,sum(pemasukan.jumlah) total,kategori.warna,kategori.nama namaKtg ,substr(pemasukan.tanggal,6,2) as tg FROM pemasukan join kategori on pemasukan.kategori=kategori.id where substr(tanggal, 6, 2)='"+filterBln+"' group by kategori.id";
//           var data =  $cordovaSQLite.execute(db, queryx).then(function(res) {
//               if(res.rows.length > 0) {            
//                      for(i=0;i<res.rows.length;i++){                    
//                          dataLabels[i] = $filter('date')(new Date(res.rows.item(i).tanggal), "MMMM");                
//                          total += (res.rows.item(i)).total;
//                          dataNilai[i] = res.rows.item(i).total;                   
//                          dataWarna[i] = res.rows.item(i).warna;                   
//                          dataKategori[i] = res.rows.item(i).namaKtg;
//                      }                                                                   
//                      $scope.totalBulan = total;      
//                  } else {
//                      console.log("No results found");
//                  }           

//                }, function (err) {
//                  console.error(err);
//           });
      
//         $scope.labelsdataDetilBulan = dataKategori;
//         $scope.dataDetilBulan = dataNilai;
//         $scope.dataDetilWarna = dataWarna;

// })
.directive("formatDate", function(){
  return {
   require: 'ngModel',
    link: function(scope, elem, attr, modelCtrl) {
      modelCtrl.$formatters.push(function(modelValue){
        return new Date(modelValue);
      })
    }
  }
})

.filter('dates', function($filter){
   return function(input){
    if(input == null){ return ""; } 
   
    var _date = $filter('date')(new Date(input), 'dd MMM yyyy');
   
    return _date.toUpperCase();

   };
  })

// .filter('tetap', function($filter){
//    return function(input){
//     if(input == false){ return "tetap"; }
//     var _tetap = $filter('tetap')(new toggle(input), 'tetap');
   
//     return _tetap.toUpperCase();    
    
//    };
//   })

.controller('forecastCtrl',function($scope, $ionicModal, $timeout , $ionicPopup){
  //forecast grafik
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ]; 

});