/*!
 * jQuery liScroll2 Plugin
 * http://www.johnstyle.fr/labs/jquery-liscroll-2/
 *
 * Copyright 2012, Jonathan Sahm
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.johnstyle.fr/license/
 *
 * Developed from jQuery liScroll Plugin of Gian Carlo Mingati
 * http://www.gcmingati.net/wordpress/wp-content/lab/jquery/newsticker/jq-liscroll/scrollanimate.html
 * 
 * @author Jonathan Sahm
 * @version 2.0
 * @requires jQuery v1.2.x or later
 *
 * Date: 2012-03-21
 */
(function($){
	$.fn.liScroll = function(options){
		options = $.extend({
			'velocity'		: 0.07,
			'direction' 	: 'left',
			'effect' 		: 'linear',
			'queue'			: false,
			'stopHover'		: true
		}, options);
		return this.each(function(i){
			var $this 		= $(this);
			var wrapWidth	= $this.parent().width();
			var offset		= wrapWidth;
			var totalWidth 	= wrapWidth;
			$this.css('width', $this.find('li').size()*4096);
			$this.find('li').css('float', options.direction);
			$this.find('li').each(function(i){
				totalWidth += $(this, i).outerWidth(true);
			});
			$this.hide();
			$this.css('width', totalWidth);			
			if(options.direction == 'right'){
				offset 		= totalWidth;
				wrapWidth 	= totalWidth;				
			}
			if(options.stopHover){
				$this.hover(function(){
					offset 		= parseFloat($this.css(options.direction));
					$(this).stop();
				}, function(){
					scrollText();
				});
			}
			setTimeout(function(){
				$this.show();
				scrollText();
			}, i*options.queue);
			function scrollText(){			
				$this.css(options.direction, offset);
				var width 				= (totalWidth-(wrapWidth-offset));
				var args 				= new Object();
				args[options.direction] = '-='+ width;
				$this.animate(args, width/options.velocity, options.effect, function(){
					offset = wrapWidth;
					scrollText();
				});
			}			
		});	
	};	
})(jQuery);