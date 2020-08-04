//Variáveis e padrões:
var mat=document.getElementsByTagName('img');
var images = [];
for (const element of mat) {
    images.push(element.src);
  //console.log(element);
}



var total = images.length - 1, /* images total number */
    current = 0,               /* image's index */
    startX = '',               /* touchstart X coordinate */ 
    startY = '',               /* touchstart Y coordinate */
    endX = '',                 /* touchend X coordinate */
    endY = '';                 /* touchend Y coordinate */
    swipeDuration = 1000,      /* max touch duration */
    swipeDistanceX = 50,       /* X-axis min touch distance */
    swipeDistanceY = 50,       /* Y-axis min touch distance */
    thresholdX = 30,           /* X-axis max touch displacement */
    thresholdY = 30;           /* Y-axis max touch displacement */
/* Pré-carregar imagens:

Coloque cada uma delas holdere anexe-as à innerdiv, no pageinitevento ou em qualquer outro evento da página do jQM .
*/
$(document).ready(function () {
    $.each(images, function (i, src) {
        $("<div class='holder hidden'><img src=" + src + " /></div>").appendTo(".inner");
    });
    $(".inner .holder:first-child").toggleClass("visible hidden");
});
/*
Interpretação de eventos de toque - vincule eventos de toque a innerdiv:

A duração e a distância do toque são adicionadas à comparação.
*/
$(document).on("touchstart", ".inner", function (e, ui) {
    startX = e.originalEvent.touches[0].pageX;
    startY = e.originalEvent.touches[0].pageY;
    start = new Date().getTime(); /* touch start */
    alert("touchstart")
}).on("touchmove", ".inner", function (e, ui) {

    /* prevent page from scrolling */
    e.preventDefault();

}).on("touchend", ".inner", function (e, ui) {
    endX = e.originalEvent.changedTouches[0].pageX;
    endY = e.originalEvent.changedTouches[0].pageY;
    end = new Date().getTime(); /* touch end */
    if ((end - start) < swipeDuration) {
      if (startX > endX && Math.abs(startY - endY) <= thresholdY && Math.abs(startX - endX) >= swipeDistanceX) {
        showImg(current, "left");
      } else if (startX < endX && Math.abs(startY - endY) <= thresholdY && Math.abs(startX - endX) >= swipeDistanceX) {
         showImg(current, "right");
      } else if (startY > endY && Math.abs(startX - endX) <= thresholdX && Math.abs(startY - endY) >= swipeDistanceY) {
        showImg(current, "up");
      } else if (startY < endY && Math.abs(startX - endX) <= thresholdX && Math.abs(startY - endY) >= swipeDistanceY) {
        showImg(current, "down");
      }
    }
});
/* Interpretação de eventos de toque - vincule eventos de toque a innerdiv:

A duração e a distância do toque são adicionadas à comparação.
*/

/*showImg(image index, swipe type)Função de transição :
Opacidade adicionada à animação.
*/
function showImg(index, type) {
    var distance;
    if (type == "left") {
        current = index;
        if (current >= 0 && current < total) {
            current++;
             distance = $(".visible").width();
            $(".inner .holder").eq(current).css({
                left: distance
            }).toggleClass("in hidden");

            $(".visible").animate({
                left: "-" + distance + "px",
                opacity: 0
            }, 600, function () {
                $(this).toggleClass("visible hidden").css({
                    top: "auto",
                    left: "auto"
                });
            });

            $(".in").animate({
                left: 0,
                opacity: 1
            }, 500, function () {
                $(this).toggleClass("in visible");
            });
        }
    }

    if (type == "up") {
        current = index;
        if (current >= 0 && current < total) {
            current++;
             distance = $(".visible").height();
            $(".inner .holder").eq(current).css({
                top: distance + "px"
            }).toggleClass("in hidden");

            $(".visible").animate({
                top: "-" + distance + "px",
                opacity: 0
            }, 600, function () {
                $(this).toggleClass("visible hidden").css({
                    top: "auto",
                    left: "auto"
                });
            });

            $(".in").animate({
                top: 0,
                opacity: 1
            }, 500, function () {
                $(this).toggleClass("in visible");
            });
        }
    }

    if (type == "right") {
        current = index;
        if (current > 0 && current <= total) {
            current--;
             distance = $(".visible").width();
            $(".inner .holder").eq(current).css({
                left: "-" + distance + "px"
            }).toggleClass("in hidden");

            $(".visible").animate({
                left: distance + "px",
                opacity: 0
            }, 600, function () {
                $(this).toggleClass("visible hidden").css({
                    top: "auto",
                    left: "auto"
                });
            });

            $(".in").animate({
                left: 0,
                opacity: 1
            }, 500, function () {
                $(this).toggleClass("in visible");
            });
        }
    }

    if (type == "down") {
        current = index;
        if (current > 0 && current <= total) {
            current--;
             distance = $(".holder").height();
            $(".inner .holder").eq(current).css({
                top: "-" + distance + "px"
            }).toggleClass("in hidden");

            $(".visible").animate({
                top: distance + "px",
                opacity: 0
            }, 600, function () {
                $(this).toggleClass("visible hidden").css({
                    top: "auto",
                    left: "auto"
                });
            });

            $(".in").animate({
                top: 0,
                opacity: 1
            }, 500, function () {
                $(this).toggleClass("in visible");
            });
        }
    }
}
