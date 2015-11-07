"use strict"



/* --------- SLIDER WIDGET --------- */

var SliderWidget = (function(){

  var _insertValues = function($this) {
    var container = $this.closest('.filter__slider'),
        from = container.find('.filter__slider-input_from'),
        to = container.find('.filter__slider-input_to');

    var values = $this.slider('option', 'values');

    from.val(values[0]);
    to.val(values[1]);
  };

  return {
    init : function(){

      $(".filter__slider_element").each(function(){

        var $this = $(this),
            min = parseInt($this.data('min')),
            max = parseInt($this.data('max'));

        $this.slider({
          range: true,
          min: min,
          max: max,
          values: [min, max],
          slide: function() {
            _insertValues($this);
          },
          create: function(){
            _insertValues($this);
          }
        });

      });

    }
  };

}());



/* --------- RATING WIDGET --------- */

var RatingWidget = (function(){

  var _letTheStarsShine = function(ratingAmount){
    var starsArray = [];

    for (var i = 0; i < 5; i++){
      var starClassName = (i < ratingAmount) ? 'products__rating-stars-item products__rating-stars-item_filled' : 'products__rating-stars-item';

      var star = $('<li>', {
        class : starClassName
      });

      starsArray.push(star);
    }

    return starsArray;
  };

  var _generateMarkup = function(ratingAmount, elementToAppend){
    var ul = $('<ul>',{
      class : 'products__rating-stars',
      html : _letTheStarsShine(ratingAmount)
    });

    var ratingDisplay  = $('<div>',{
      class : 'products__rating-amount',
      text : ratingAmount
    });

    elementToAppend.append([ul, ratingDisplay]);
  };

  return {
    init: function(){
      $(".products__rating").each(function(){
        var $this = $(this),
            ratingAmount = parseInt($this.data('rating'));

        _generateMarkup(ratingAmount, $this);
      });
    }
  };
}());



/* --------- VIEW STATE CHANGE --------- */

var ViewStateChange = function(){

  var _previousClass = '';

  var _changeState = function($this){
    var item = $this.closest('.sort__view-item'),
        view = item.data('view'),
        listOfItems = $('#products__list'),
        modificationPrefix = 'products__list_',
        classOfViewState = modificationPrefix + view;

    if (_previousClass == ''){
      _previousClass = listOfItems.attr('class');
    }

    _changeActiveClass($this);
    listOfItems.attr('class', _previousClass + ' ' + classOfViewState);
  };

  var _changeActiveClass = function($this){
    $this.closest('.sort__view-item').addClass('active')
    .siblings().removeClass('active');
  };

  return {
    init : function(){
      $('.sort__view-link').on('click', function(event) {
        event.preventDefault();

          _changeState($(this));
      });
    }
  };
}();



/* --------- SLIDE SHOW --------- */

var SlideShow = function(){

  var _changeSlide = function($this){
    var container = $this.closest('.products__slideshow'),
        path = $this.find('img').attr('src'),
        display = container.find('.products__slideshow-img');

    _changeActiveClass($this);

    display.fadeOut(function(){
      $(this).attr('src', path).fadeIn();
    });
  };

  var _changeActiveClass = function($this){
    $this.closest('.products__slideshow-item').addClass('active')
    .siblings().removeClass('active');
  };

  return {
    init : function(){
      $('.products__slideshow-link').on('click', function(e){
        e.preventDefault();

        _changeSlide($(this));

      });
    }
  };
}();




/* --------- ACCORDEON --------- */

var Accordeon = (function(){

  var _openSection = function($this) {
    var container = $this.closest('.filter__item'),
        content = container.find('.filter__content'),
        otherContent = $this.closest('.filter').find('.filter__content');

    if (!container.hasClass('active')) {
      otherContent.slideUp().closest('.filter__item').removeClass('active');
      container.addClass('active');
      content.stop(true, true).slideDown();
    } else {
      container.removeClass('active');
      content.stop(true, true).slideUp();
    }

  };

  return {
    init : function() {
      $('.filter__title').on('click', function(event) {
        event.preventDefault();

        var $this = $(this);

        _openSection($this);

      });
    }
  };
}());



/* --------- DOCUMENT READY --------- */

$(document).ready(function(){

  if($('.filter').length) {
    Accordeon.init();
  }

  if ($('.products__slideshow').length){
    SlideShow.init();
  }

  $('.sort__view_rows').addClass('active');

  ViewStateChange.init();

  if ($('.filter__slider_element').length){
    SliderWidget.init();
  }

  if ($('.products__rating').length){
    RatingWidget.init();
  }

  if ($('.sort__select-elem').length){
    $('.sort__select-elem').select2({
      minimumResultsForSearch: Infinity
    });
  }

  $('.filter__reset').on('click', function(event){
    event.preventDefault();

    var $this = $(this),
        container = $this.closest('.filter__item'),
        checkBoxes = container.find('input:checkbox');

    checkBoxes.each(function(){
      $(this).removeProp('checked');
    });
  });




  /* --------- COLUMNIZER --------- */

  $('.attention__text').columnize({
    width: 530
  });

});
