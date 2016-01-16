angular.module('detil-grafik.controllers', ['chart.js','ionic','ionic-color-picker'])
.controller('detil-grafikCtrl',function($scope,$ionicModal, $ionicPopup,$cordovaSQLite, $stateParams,$filter, $rootScope){
       //routing detilbulan data
      //$rootScope.totalBulan = 0;      
      $scope.totalBulanP = 0;
            

          var total = 0;          
          var pemasukanLabels = [];
          var pemasukanNilai = [];
          var pemasukanWarna = [];
          var pemasukanKategori = [];        
          
          
          var totalP = 0;
          var pengeluaranLabels = [];
          var pengeluaranNilai = [];
          var pengeluaranWarna = [];
          var pengeluaranKategori = [];

          var cariBulan = "2000-"+$stateParams.bln+"20";
          var filterBln = $filter('date')(new Date(cariBulan), "MM");
          var queryx = "SELECT pemasukan.*,sum(pemasukan.jumlah) total,kategori.warna,kategori.nama namaKtg ,substr(pemasukan.tanggal,6,2) as tg FROM pemasukan join kategori on pemasukan.kategori=kategori.id where substr(tanggal, 6, 2)='"+filterBln+"' group by kategori.id";
          var data =  $cordovaSQLite.execute(db, queryx).then(function(res) {
              if(res.rows.length > 0) {            
                     for(i=0;i<res.rows.length;i++){                    
                         pemasukanLabels[i] = $filter('date')(new Date(res.rows.item(i).tanggal), "MMMM");                
                         total += (res.rows.item(i)).total;                         
                         pemasukanNilai[i] = res.rows.item(i).total;                   
                         pemasukanWarna[i] = res.rows.item(i).warna;                   
                         pemasukanKategori[i] = res.rows.item(i).namaKtg;
                     }                                                                   
                     
                     $rootScope.totalBulan = total;
                     
                     console.log();      
                 } else {
                     console.log("No results found");
                 }           

               }, function (err) {
                 console.error(err);
          });
          
          var cariBulanP = "2000-"+$stateParams.blnP+"20";
          var filterBlnP = $filter('date')(new Date(cariBulanP), "MM");
          var queryY = "SELECT pengeluaran.*,sum(pengeluaran.jumlah) totalP,kategori.warna,kategori.nama namaKtgP ,substr(pengeluaran.tanggal,6,2) as tgP FROM pengeluaran join kategori on pengeluaran.kategori=kategori.id where substr(tanggal, 6, 2)='"+filterBlnP+"' group by kategori.id";
          var data =  $cordovaSQLite.execute(db, queryY).then(function(res) {
              if(res.rows.length > 0) {            
                     for(i=0;i<res.rows.length;i++){                    
                         pengeluaranLabels[i] = $filter('date')(new Date(res.rows.item(i).tanggal), "MMMM");                
                         totalP += (res.rows.item(i)).totalP;
                         pengeluaranNilai[i] = res.rows.item(i).totalP;                   
                         pengeluaranWarna[i] = res.rows.item(i).warna;                   
                         pengeluaranKategori[i] = res.rows.item(i).namaKtgP;
                         console.log(totalP);
                     }                                                                   
                     $scope.totalBulanP = totalP;                    
                           
                 } else {
                     console.log("No results found");
                 }           

               }, function (err) {
                 console.error(err);
          });

        
        
      
        $scope.labelsdataDetilBulan = pemasukanKategori;
        $scope.dataDetilBulan = pemasukanNilai;
        $scope.dataDetilWarna = pemasukanWarna;

        $scope.labelsdataDetilBulanP = pengeluaranKategori;
        $scope.dataDetilBulanP = pengeluaranNilai;
        $scope.dataDetilWarnaP = pengeluaranWarna;

        // $scope.warning = function(){
        //   var total = 0;
        //   var totalP = 0;
        //   var cariBulan = "2000-"+$stateParams.bln+"20";
        //   var filterBlnP = $filter('date')(new Date(cariBulanP), "MM");
        //   //var totjum = [];
        //   //var jumlah = "SELECT d.tot f, d.tg as u, sum(c.jumlah) tt, c.tanggal as yy from pengeluaran c  inner join (SELECT sum(a.jumlah) as tot, substr(a.tanggal,6,2) as tg FROM pemasukan a) d on d.tg = yy group by yy";
        //   var jumlah = "SELECT substr(tanggal, 6,2) as tg, sum(jumlah) as tot from (SELECT tanggal, jumlah FROM pemasukan union all SELECT tanggal, jumlah FROM pengeluaran ) b group by  "
        //   var data =  $cordovaSQLite.execute(db, jumlah).then(function(res) {
        //       if(res.rows.length > 0) {            
        //              for(i=0;i<res.rows.length;i++){                    
        //                  total  += (res.rows.item(i)).tot;
        //                  //totalP += (res.rows.item(i)).;
        //                  console.log(total);
        //                  //console.log(totalP);
        //              }                                                                                        
        //              $scope.totjum = total;
        //              $scope.totjumP = totalP;
        //              //var j = parseInt()
        //              console.log($scope.totjum);
        //              //console.log($scope.totjumP);      
        //          } else {
        //              console.log("No results found");
        //          }           

        //        }, function (err) {
        //          console.error(err);
        //   });
        //   //console.log($scope.totjum);

        // };
        //$scope.warning();

})