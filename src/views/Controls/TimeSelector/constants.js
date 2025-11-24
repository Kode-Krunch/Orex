const CAROUSEL_SETTINGS = {
  dots: false,
  infinite: false,
  speed: 200,
  draggable: true,
  swipeToSlide: true,
  slidesToShow: 15,
  slidesToScroll: 15,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
  ],
};

export { CAROUSEL_SETTINGS };
