$(function() {
   //탭메뉴 
   $('.tab-nav a').click(function(e){
      e.preventDefault();
      $('.tab-nav a').removeClass('active');
      $(this).addClass('active');
      var id=$(this).attr('href');
      $('.tab-contents .content').hide();
      $(id).show();
      // 탭메뉴의 컨텐츠가 변경될때마다 ul의 높이 구하기
      ulHeight();
   })    
   
   //리사이즈 될때마다 ul의 높이 구하기
   $(window).resize(function(){
      ulHeight();
   }).resize();

   //장바구니, 위시리스트에 담길 리스트 묶음(ul)의 높이 구하기 
   function ulHeight(){
      var windowH=$(window).height();
      var tabH=$('.tab-nav').outerHeight();
      var topH=$('.tab-contents .content').not(':hidden').find('.top').outerHeight();
      var bottomH=$('.tab-contents .content').not(':hidden').find('.bottom').outerHeight();        
      var ulH=windowH-(tabH+topH+bottomH);
      $('.tab-contents .content').not(':hidden').find('ul').height(ulH);
   }

   //3자리마다 콤마찍기
   function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

   // 데이터 가져오기
   var cart =getCart();
   if (cart==null) {
      $.ajax({
         url:'js/product.json',
         success:function(data) {
            console.log(data);
            setCart(data);
            productList(data);
         }
      })
   }else{
      productList(cart);
   }

   // 데이터 가져오기 - 상품 목록 띄우기

   function productList(data){
        for (const i in data){
      $('.item .row').append(
         `<li data-key=${data[i].key}>
            <div class="wrap">
               <img src=${data[i]["img"]} alt="">
               <div class="box">
                  <h2>${data[i]["name"]}</h2>
                  <span class="price">${data[i]["price"]}</span>            
                  <div class="btn-group">
                  <button class="fas fa-heart ${data[i]["like"]}"></button>
                  <button class="fas fa-shopping-cart ${data[i]["shopping"]}"></button>
                  </div>
               </div>
            </div>
         </li>`);
    }
 
   }
   

   // 저장소에 저장하기

   function setCart(cart) {
      var cartJSON=JSON.stringify(cart);
      localStorage.setItem('cart',cartJSON);
   }
   
   // 저장소에서 가져오기
   
   function getCart() {
      var cartJSON=localStorage.getItem('cart');
      return JSON.parse(cartJSON);
   }


   // 위시리스트 추가하기
   $('.btn-group button').click(function(e) {
      e.preventDefault();
      if(!$(this).hasClass('on')){//on이 없어서 추가할거다
         $(this).addClass('on');
         var key=$(this).parents('li').data("key");
         console.log(key);
         
         var cart=getCart();
         console.log(cart);

         
         for (const i in cart) {
            if (cart[i]["key"]==key){
               cart[i]["like"]=="on";      
            }
         }
      }
      else{
         alert('이미 담고 있습니다');
      }
      
   })



})