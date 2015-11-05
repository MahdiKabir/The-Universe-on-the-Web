$(document).ready(function() {
	var header = document.getElementsByTagName('header')[0];
	var header_image = document.getElementById('header-image');
	var title = document.getElementById('title');
	//var navigator = document.getElementById('navigator');
	var content = document.getElementById('content');
	var figures = document.getElementsByTagName('figure');
	var slideshows = document.getElementsByClassName('data-slideshow');
	var body = document.getElementsByTagName('body')[0];
	
	var resize_timer, scroll_timer;
	$(window).resize(function() {clearTimeout(resize_timer); resize_timer = setTimeout(onResize, 100);});
	$(window).scroll(function() {clearTimeout(scroll_timer); scroll_timer = setTimeout(onScroll,  20);});
	onResize();
	onScroll();
	
	$('.data-slideshow').unslider({
		speed: 500,
		delay: false,
		keys: true,
		dots: false,
		arrows: false,
		autoplay: false
	});
	
	$('.slideshow-arrow').click(function(event) {
		var classes = this.className.split(' ');
		var ssid = '#' + classes[1], direction = classes[2];
		var data = $(ssid).unslider().data('unslider');
		
		event.preventDefault();
		
		switch (direction)
		{
			case "prev":
				data['prev']();
			case "next":
				data['next']();
		}
		
		$(this).scrollTo();
		data.calculate(data.current);
	});
	
	$(window).bind('resize', function () {
	});
	
	function updateFigures()
	{
		var len_i = figures.length;
		for (var i = 0; i < len_i; i++)
		{
			var image_present = false;
			var caption_present = false;
			var new_height = 0, new_width = 0;
			var fig_img, fig_cap;
			
			var len_j = figures[i].children.length;
			for (var j = 0; j < len_j; j++)
			{
				switch (figures[i].children[j].tagName)
				{
					case "IMG":
						if (figures[i].children[j].src !== null)
						{
							image_present = true;
							fig_img = figures[i].children[j];
						}
						break;
					case "SPAN":
						caption_present = true;
						fig_cap = figures[i].children[j];
						break;
				}
			}
			
			if (image_present)
			{
				var img_width = toString(new_width), img_height = toString(new_height);
				
				if (fig_img.style.width  !== "") img_width  = fig_img.style.width;
					else img_width  = fig_img.width + "px";
				if (fig_img.style.height !== "") img_height = fig_img.style.height;
					else img_height = fig_img.height + "px";
				
				figures[i].style.width  = img_width;
				figures[i].style.height = img_height;
			}
			
			if (caption_present)
			{
				fig_cap.style.width = (new_width - 24) + "px";
			}
		}
	}
	
	/*len_i = slideshows.length;
	for (var i = 0; i < len_i; i++)
	{
		var ssheaders = slideshows.getElementsBySelector('div>div');
		
		var len_j = ssheaders.length;
		for (var j = 0; j < len_j; j++)
		{
			ssheaders.add
			
		}
	
	
	}*/
	
	function onScroll()
	{
		// Update the page title/header.
		if ($(window).scrollLeft > 0)
			window.scrollTo(0, $(window).scrollTop);
		
		var beyondTrigger = isScrolledBeyond(header_image, 78);
		var heightTitle = title.scrollHeight + 56;
		//var navigator_timeout;
		
		if (checkChange(beyondTrigger))
		{
			if (beyondTrigger > 0)
			{
				title.className = "title-animate";
				header.className = "header-animate";
				header.style.top = "-" + heightTitle + "px";
				//navigator.style.display = "";
			} else {
				title.className = "";
				header.className = "";
				header.style.top = "0";
				//navigator.style.display = "none";
			}
		}
		
		function isScrolledBeyond(elem, offset)
		{
			return (Math.max(($(window).scrollTop() + offset) - ($(elem).offset().top + $(elem).height()), 0));
		}
		
		function checkChange(now)
		{
			var now_bool = now > 0;
			
			if (typeof this.last_change === 'undefined' || this.last_change !== now_bool)
			{
				this.last_change = now_bool;
				return true;
			}
			
			return false;
		}
	}
	
	// Limit image widths to maximum screen width.
	function onResize()
	{
		// Call specific element handlers.
		updateFigures();
		
		function viewport()
		{
			var w=window, d=document, e=d.documentElement, g=d.getElementsByTagName('body')[0];
			return { width : (w.innerWidth||e.clientWidth||g.clientWidth), height : (w.innerHeight||e.clientHeight||g.clientHeight) };
		}
		
		var bounds = viewport()
		
		if (title.classname === "")
			title.style.marginLeft = -bounds.width + "px"
		
		// Resize images.
		var images = document.getElementsByTagName('img');
		for (var i in images)
		{
			var maxWidth = bounds.width;
			/*
			if (images[i].naturalWidth > maxWidth)
				images[i].style.width = "100%";//maxWidth + "px";*/
		}
	}
	
	function simulateKeyPress(character) {
		jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
	}
});

