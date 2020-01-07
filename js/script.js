
var footerHeight;
var myMap = false;

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

jQuery(document).ready(function($) {

  $('a[href="#"]').click(function(event){
    event.preventDefault();
  });

  $( window ).on( "orientationchange", function( event ) {
    //if(iSlider) iSlider.after();
     // footerMargin();
      setSameHeight();
  });

	$(window).load(function(){
    $('.winwid').text( $(window).innerWidth() ); // remove on release

  /*  $('body').removeClass('xs-menu-show');
    $('.setoff-box').removeClass('expand');
    $('.menu-toggle').removeClass('expand'); */

     // footerMargin();
      setSameHeight();
	}); // --- window.load

	$(window).resize(function(){
    $('.winwid').text( $(window).innerWidth() ); // remove on release

  /*  $('body').removeClass('xs-menu-show');
    $('.setoff-box').removeClass('expand');
    $('.menu-toggle').removeClass('expand'); */

		    waitForFinalEvent(function(){
          //footerMargin();
          setSameHeight();
		    }, 250, "some unique string");


	}); // --- window.resize

  $('.mob-menu-btn').on('click', function(){
    $('.mob-menu-box').toggleClass('expand');
    return false;
  });
  $('.mob-menu-box nav a').on('click', function(){
    $('.mob-menu-box').removeClass('expand');
    return true;
  });

/*
  // бустрап меняет класс panel-collapse, но никак не отмечает panel-heading
  // в зависимости от распахнутости. Для чего следующее
  $('.panel-group').on('hidden.bs.collapse', function (el) {
    $(el.target).parent().find('.panel-heading').removeClass('opened');
  });

  $('.panel-group').on('shown.bs.collapse', function (el) {
    el.preventDefault();
    $(el.target).parent().find('.panel-heading').addClass('opened');
    $('body, html').scrollTo( ($( $(el.target).parent().find('.panel-heading')).offset().top - 5)+'px', 10 );
  });
  // -- panel-collapse
*/


/*
  if( $('.service-item').length ) {
    var spanWidth;
    $('.service-item h2').each(function(i){
      spanWidth = $(this).find('span').eq(0).width() +16;
      $(this).find('span').eq(1).css({
        left: spanWidth+'px',
      })
    });
  }
*/

  if( $('.pnt-img').length ) { // точки "Из чего состоит"
    var thImg;
      $('.pnt-img').each(function(){
        if( $(this).find('img').length ) {
          thImg = $(this).find('img');
          $(this).css('backgroundImage', 'url('+ $(thImg).attr('src') +')');
          $(thImg).hide();
        }
      });
    var thPnt;
     $('.mapmark').on('click', function(e){
        thPnt = $(this).data('point');
        $('.mapmark').removeClass('active');
        $(this).addClass('active');
        if( $('.points-info .pnt'+thPnt).length ) {
          $('.pntinfo.active').removeClass('active');
          $('.pntinfo.pnt'+thPnt).addClass('active');
        }
        return false;
     });

    	$(window).resize(function(){
    		    waitForFinalEvent(function(){
              consistFix();
    		    }, 250, "some unique string");
    	}); // --- window.resize



  } // -- точки "Из чего состоит"

  if( $('.system-types').length ) { // какие системы автоматического полива бывают?
    var thTab;
    $('.st-rootlet').on('click', function(event){
      thTab = $(this).data('tab');
      $('.st-rootlet').removeClass('active');
      $('[data-tab="'+thTab+'"]').addClass('active');
          $('.st-item').removeClass('active');
          $('.st-tab'+thTab).addClass('active');
    });
  } // -- какие бывают

  if( $('.how-make-item').length ) { // точки "Из чего состоит"
    var thImg;
      $('.how-make-item').each(function(){
        if( $(this).find('img').length ) {
          thImg = $(this).find('img');
          $(this).css('backgroundImage', 'url('+ $(thImg).attr('src') +')');
          $(thImg).hide();
        }
      });
  }

  if( $('.a-bgimg').length ) {
    var thImg;
      $('.a-bgimg').each(function(){
        if( $(this).find('img').length ) {
          thImg = $(this).find('img');
          $(this).css('backgroundImage', 'url('+ $(thImg).attr('src') +')');
          $(thImg).hide();
        }
      });
  }

  if( $('.cb-select').length ) {
    $('.cb-select').on('click', function(){
      $('.cb-select-drop').show(150);
      $(document).one('click', function(){
        $('.cb-select-drop').hide(100);
      });
      return false;
    });
  }

  if( $('.ci-title').length ) {
    var selfToggled;
    $('.ci-title > h2').on('click', function(){
      // вот такое странное переключение, а иначе бустраповские классы типа visible-xs не перебить видимость
      selfToggled = $(this).closest('.catalog-item').find('.toggle360');
      if( $(selfToggled).length ) {
        $(selfToggled).removeClass('toggle360').addClass('toggle360-on');
      } else {
        selfToggled = $(this).closest('.catalog-item').find('.toggle360-on');
        $(selfToggled).removeClass('toggle360-on').addClass('toggle360');
      }

      return false;
    });
  } // переключаем видимость элементов каталога на стр. бренда при ширине <= 480 (см. коммент в CSS)

  if( $('.portfolio').length ) {

	  		$('.portfolio a.colorbox').colorbox({
	  			 slideshow: true,
					 onOpen: function(){
	           $("#colorbox").addClass("objbox");
					 },
					 className:'objpopup',
					 loop:true,
					 preloading:true,
					 maxWidth:'98%',
					 maxHeight:'80%',
					 scrolling:false,
					 slideshowSpeed:5000,
					 rel:'portslide',
            onComplete: function(){
                var title = $(this).parent().find('.pf-data').html();
                $('#cboxTitle').html(title);
            }
				});

  } // --на странице "Портфолио"


  if( $('#map').length ) {

      function init() {
        myMap = new ymaps.Map('map', { center: [55.80801988815369, 37.37851994091727], zoom: 16 });
        if( $(window).width() < 700 ) myMap.setCenter([55.8084799, 37.38281709], 15, 'MAP');

      		var myPlacemark1 = new ymaps.Placemark(
      		[55.8084799, 37.38281709] , {
                hintContent: 'МКАД, 65-й километр, вл. 1'
            }, {
                iconImageHref: '../img/map-point.png', // картинка иконки
                iconImageSize: [129, 129], // размеры картинки
                iconImageOffset: [-84, -10] // смещение картинки
            });
      		myMap.geoObjects.add(myPlacemark1);
      }
			  ymaps.ready(init);
  }


}); //--- /document.ready -------------------

function consistFix() {
  if( $(window).width() < 955 ) return false;
  if($('.pntinfo-col:visible').length ) {
    if( $('.pntinfo-col:visible').height() > $('.consists-row').height()) {
      $('.consists-row').height( $('.pntinfo-col:visible').height() );
    }
    if ( $('.consists-row').height() < $('.points-map').height() ) {
      $('.consists-row').height( $('.points-map').height() );
    }
  }
  return false;
}

function footerMargin() {
  footerHeight = $('footer').height();
  $('footer').css('marginTop', '-'+footerHeight+'px' );
  $('.wrapper').css('paddingBottom', footerHeight+'px');
}

function setSameHeight() {
  if( $('.same-height').length ) {
    if( $(window).width() < 801 ) {
      $('.same-height').children('div').css('height', 'auto');
    } else {
      var sameChilds;
      var sameMax;
      $('.same-height:visible').each(function(){
        sameMax = 0;
        sameChilds = $(this).children('div');
        $(sameChilds).each(function(){
          sameMax = Math.max(sameMax, $(this).height());
        });
        $(sameChilds).height(sameMax);
      });
    }
  }
  if( $('.has-parent').length ) {
    if( $(window).width() < 801 ) {
      $('.has-parent').css('height', 'auto');
    } else {
        var thTopPadding, thBotPadding, thParentTopp, thParentBotp;
        $('.has-parent').each(function(){
          //thParentTopp = parseInt($(this).parent().css('paddingTop'));
          //thParentBotp = parseInt($(this).parent().css('paddingBottom'));
          thTopPadding = parseInt($(this).css('paddingTop'));
          thBotPadding = parseInt($(this).css('paddingBottom'));
          $(this).height( ($(this).parent().height() - (thTopPadding + thBotPadding) -2) );
        });
    }
  }

  if(myMap) {
    // console.log('map center fix');
    if( $(window).width() < 700 ) {
      myMap.setCenter([55.8084799, 37.38281709], 15, 'MAP');
    } else {
      myMap.setCenter([55.80801988815369, 37.37851994091727], 16, 'MAP');
    }
  }
}

//----------------------------------------------------------------------------------------
function attach_getName (str, item){
    if (str.lastIndexOf('\\')){
        var i = str.lastIndexOf('\\')+1;
    }
    else{
        var i = str.lastIndexOf('/')+1;
    }
    var filename = str.slice(i);
    jQuery(item).closest('.fileform').find('.fileformlabel').eq(0).text(filename);
}

//----------------------------------------------------------------------------------------------------
//  ScrollTo
;(function(k){'use strict';k(['jquery'],function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:!0};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}}return j})}(typeof define==='function'&&define.amd?define:function(a,b){if(typeof module!=='undefined'&&module.exports){module.exports=b(require('jquery'))}else{b(jQuery)}}));
//----------------------------------------------------------------------------------------------------
/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);
//----------------------------------------------------------------------------------------------------




