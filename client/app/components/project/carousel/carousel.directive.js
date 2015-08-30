(function(angular, $){
	angular.module('folio.components.project.carouselDirective', ['ui.bootstrap', 'ngAnimate', 'folio.components.project.imageLoad'])
	.directive('folioCarousel', ['$sce', '$timeout', '$animate', function($sce, $timeout, $animate){
		return {
			templateUrl: '/app/components/project/carousel/carousel.html',
			replace: true,
			restrict: 'E',
			scope: {
				medias: '=',
				currentSlide: '='
			},
			link: function(scope){
				scope.$sce = $sce;

				scope.$watch('::medias', function(media){
					scope.slides = _.map(media, function(media){
							var slide = {
								text: $sce.trustAsHtml(media.caption),
								mediaLink: media.publicLink,
								type: media.type,
								media: media
							};

							return slide;
					});

				});

				scope.$watch(function () {
				  for (var i = 0; i < scope.slides.length; i++) {
				    if (scope.slides[i].active) {
				      scope.currentIndex = i;
				      return scope.slides[i];
				    }
				  }
				}, function (currentSlide, previousSlide) {
				  if (currentSlide !== previousSlide) {
				    scope.currentSlide = currentSlide;

				    $timeout(function(){
				    	if(scope.currentIndex === 0){
				    		enableDrag();
				    	}
				    	// Hack to detect the event when the animation is over and slide is active
				    	$animate.on('addClass', $('.carousel').find('.item').eq(scope.currentIndex), function (element, phase) {
				          if (phase === 'close') {
				          	enableDrag();
				            $animate.off('addClass', element);
				          }
				        });
				    });

				  }
				});

				function enableDrag(){
					var img = $('.carousel').find('img[src="'+scope.currentSlide.mediaLink+'"]');
		            if(img.length){
			    		dragImage(img);
			    	}
				}

				function dragImage(I){
					if(I.data('draggable-image')){
						return;
					}

					I.attr('data-draggable-image', 1);
					var display = I.parent('.media');
	                var Vx = display.offset().left,
	                    Vy = display.offset().top,
	                    Vw = display.outerWidth(),
	                    Vh = display.outerHeight(),
	                    Vpy = parseInt(display.css('padding-top')),
	                    Vpx = parseInt(display.css('padding-left')),
	                    Iw = I.width(),
	                    Ih = I.height(),
	                    x1,y1,x2,y2,
	                    xc = !isNaN(parseInt(I.data('xcenter'))) ? parseInt(I.data('xcenter')) : I.data('xcenter').replace(/\s*/,''),
	                    yc = !isNaN(parseInt(I.data('ycenter'))) ? parseInt(I.data('ycenter')) : I.data('ycenter').replace(/\s*/,''),
	                    xt = -(xc - Vw/2), //first implementation xc = coordinate of the focus point on the image
	                    yt = -(yc - Vh/2);

	              //The image is normally bigger than the frame, a minimum size is set in drupal but I.height = frame.height should be handled
	              //If image is not bigger than the frame
	               if(Iw <= Vw && Ih > Vh){
	               //height overflow
	                    x1 = Vx + Vpx;
	                    y1 = Vy + Vh - Ih;
	                    x2 = Vx + Vw - Iw - Vpx;
	                    y2 = Vy;
	                    //console.log("Iw <= Vw && Ih > Vh height overflow", I);
	               }
	               if(Iw > Vw && Ih <= Vh){
	               //width overflow
	                    x1 = Vx + Vw - Iw;
	                    y1 = Vy + Vpy;
	                    x2 = Vx;
	                    y2 = Vy + Vh - Ih - Vpy;
	                    //console.log("Iw > Vw && Ih <= Vh width overflow", I);
	               }
	               if(Iw <= Vw && Ih <= Vh){
	               //none overflow
	                    x1 = Vx + Vpx;
	                    y1 = Vy + Vpy;
	                    x2 = Vx + Vw - Iw - Vpx;
	                    y2 = Vy + Vh - Ih - Vpy;
	                    //console.log("Iw <= Vw && Ih <= Vh none overflow", I);
	               }
	               if(Iw >= Vw && Ih >= Vh){
	               //all overflow
	                    x1 = Vx + Vw - Iw - Vpx;
	                    y1 = Vy + Vh - Ih - Vpy;
	                    x2 = Vx + Vpx;
	                    y2 = Vy + Vpy;
	                    //console.log("Iw >= Vw && Ih >= Vh all overflow", I);
	               }

	               if(xc == 'center'){
	                   xt = -(Iw - Vw)/2;
	               }

	               if(yc == 'center'){
	                   yt = -(Ih - Vh)/2;
	               }

	               if(xc == 'left'){
	                   xt = 0;
	               }

	               if(yc == 'top'){
	                   yt = 0;
	               }

	               if(xc == 'right'){
	                   xt = -(Iw - Vw);
	               }

	               if(yc == 'bottom'){
	                   yt = -(Ih - Vh);
	               }

	                I.css({
	                    'cursor' : 'move',
	                    'top' : yt + 'px',
	                    'left' : xt + 'px'
	                 })
	                 .draggable({
	                    containment : [x1,y1,x2,y2]
	                });

            	}

			}
		};
	}]);
})(window.angular, window.jQuery);