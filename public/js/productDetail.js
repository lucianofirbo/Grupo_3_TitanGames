window.addEventListener('load', function(){
    new Glider(document.querySelector('.slider-list'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: '.slider-ind',
        arrows: {
            prev: '.slider-prev',
            next: '.slider-next'
        },
        responsive: [
            {
              //>= 775px
              breakpoint: 450,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: '2',
                slidesToScroll: '2',
/*                 itemWidth: 150,
                duration: 0.25 */
              }
            },{
              //1024px
              breakpoint: 769,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              }
            }
          ]
    });
});