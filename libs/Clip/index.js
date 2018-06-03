/**
 * @author simon huang
 * @version 0.3
 * @date 2018-5-5
 */

import jQuery from 'jquery'
import './css/base.css'
var round = function(n){return n >> 0;},
	touchDevice = ("ontouchstart" in window),
	_START = touchDevice?"touchstart":"mousedown",
	_MOVE = touchDevice?"touchmove":"mousemove",
	_END = touchDevice?"touchend":"mouseup",
	_TRANSITION_END_EVENT = "transitionend",
	prefix = (/webkit/i).test(navigator.appVersion) ? "webkit" : (/firefox/i).test(navigator.userAgent) ? 'Moz' : "opera" in window ? "O" : "",
	has3d = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(),
	hasTransform = prefix + "Transform" in document.documentElement.style,
	tdOpen = "translate" + (has3d ? "3d(" : "("),
	tdClose = has3d ? ",0)" : ")",
	rTranslate = /(?:translate3d\(-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0)(?:px)?,\s*-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0)(?:px)?,\s*-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0)(?:px)?\))/,
	rScale = /(?:scale\(-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0),\s*-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0))\)/;

var Draggable = function(options) {
	return new Draggable.prototype.init(options);
}

Draggable.prototype = {
	handleEvent : function(event){
		switch(event.type){
			case _START :
				if (!touchDevice && event.button !== 0) return;
				this.touchStart(event);
			break;
			case _MOVE :
				this.touchMove(event);
			break;
			case _END :
				this.touchEnd(event);
			break;
			case _TRANSITION_END_EVENT:
				this.transitionEnd(event);
			break;
		}
	},
	init : function(options){
		options = options||{};
		// this.validate = false;

		var element = options.element = typeof(options.element) == "string" ? jQuery(options.element) : options.element;

		this.options = {
				left : 0,
				top : 0,
				xSwap : options.xSwap == undefined ? true : options.xSwap,
				ySwap : options.ySwap == undefined ? true : options.ySwap,
				obstacle : true,
				constract : false,
				domModified : false,
				transTime : "300ms",
				momentum : true,
				noRollBack : false,
				scrollOffset: 0,
				zoom: false,
				zoomMin: options.zoomMin != 0 ? options.zoomMin : 1,
				zoomMax: options.zoomMax != 0 ? options.zoomMax : 4,
				onZoomEnd : options.onZoomEnd,
				// setInCenter : options.setInCenter || false,
				onBeforeScrollStart : function (e) { e.preventDefault(); },
				onScrollStart: null,
				onScrollMove: null,
				onScrollEnd: null,
				scrollWidth : 0,
				scrollHeight : 0,
				clipWidth: options.clipWidth,
				clipHeight: options.clipHeight,
				clipTop: options.clipTop,
				clipLeft: options.clipLeft,
		};

		if(typeof options == "object") {
			for(var p in options) {
				this.options[p] = options[p];
			}
		}
		// jQuery("#snap").text("oo:"+this.options.onZoomEnd)
		// alert(this.options.scrollOffset)
		// var elem = jQuery(dom);
		var self = this;
		this.left = this.options.left;
		this.top = this.options.top;
		this.scale = 1;

		this.scroll = element[0];//this.view.children[0];
		this.view = element.parent()[0];

		this.scrollWidth = this.options.scrollWidth;
		this.scrollHeight = this.options.scrollHeight;

		this.cWidth = this.options.clipWidth;
		this.cHeight = this.options.clipHeight;

		jQuery(this.scroll).addClass("swapanim");

		this.repaint();
		console.log(this.options.zoomMin)
		// console.log(this.cLeft +','+ this.cTop +','+ this.cRight +',' + this.cBottom)

		// this.options.setInCenter && this.inCenter();

		var oValue = this.scroll.style[prefix + "Transform"],
			nValue = tdOpen + this.left + "px," + this.top + "px" + tdClose;

		if(rTranslate.test(oValue)){
			this.scroll.style[prefix + "Transform"] = oValue.replace(rTranslate, nValue);
		}
		else{
			this.scroll.style[prefix + "Transform"] += nValue;
		}


				// console.log(this.scroll.style[prefix + 'Transform']);
		this.scroll.addEventListener(_START,this,false);
	},
	/*
	inCenter : function() {
		this.left = Math.round((this.viewWidth - this.contentWidth) / 2);
		this.top = Math.round((this.viewHeight - this.contentHeight) / 2);

		// if(this.viewWidth > this.contentWidth) {
			// this.xSwap = false;
		// }
		// if(this.viewHeight > this.contentHeight) {
			// this.ySwap = false;
		// }
	},
	*/
	repaint:function(oClipWidth, oClipHeight){
		//axis x
		this.viewWidth = this.view.clientWidth || 1;
		this.contentWidth = this.scrollWidth || this.scroll.offsetWidth;//+parseInt(window.getComputedStyle(this.view).paddingLeft)*2;
		this.swapWidth = this.viewWidth - this.contentWidth;
		// this.swapX = this.contentWidth > this.viewWidth;
		//axis y
		this.minSwapY = -this.options.scrollOffset || 0;
		this.viewHeight = this.view.clientHeight || 1;
		this.contentHeight = this.scrollHeight || this.scroll.offsetHeight + this.minSwapY;//+parseInt(window.getComputedStyle(this.view).paddingTop)*2;
		this.swapHeight = this.viewHeight - this.contentHeight + this.minSwapY;
		// this.swapY = this.contentHeight > this.viewHeight;
		// alert(this.contentHeight)
		// console.log(this.swapWidth);
		// this.oWidth = this.view.offsetWidth;
		// this.oHeight = this.view.offsetHeight;

		this.oClipWidth = oClipWidth ? oClipWidth : this.contentWidth;
		this.oClipHeight = oClipHeight ? oClipHeight : this.contentHeight;

		this.cLeft = ( this.viewWidth - this.cWidth ) / 2;
		this.cTop = ( this.viewHeight - this.cHeight ) / 2;
		this.cRight = this.cLeft + this.cWidth;
		this.cBottom = this.cTop + this.cHeight;

		// this.options.zoomMin = 1 / (Math.max(this.contentWidth, this.contentHeight) / this.cWidth);

		if (this.options.onRefresh) this.options.onRefresh.call(this);

		this.xSwap = this.options.xSwap || Math.abs(this.swapWidth) >= 0;
		this.ySwap = this.options.ySwap || ( !this.xSwap || this.contentHeight > this.viewHeight );

		var offset = this.offset(this.view);
		this.viewOffsetLeft = -offset.left;
		this.viewOffsetTop = -offset.top;
		// this.scroll.style[prefix + 'TransitionDuration'] = '0';
		// !this.options.constract && this.reset(300);

		return this;
	},
	position:function(x,y) {
		// console.log("X:"+this.xSwap);
		x = this.xSwap ? x : 0;
		y = this.ySwap ? y : 0;
		// this.scroll.style[prefix + "Transform"] = tdOpen + x + "px," + y + "px" + tdClose;
		// console.log(this.scroll.style[prefix + 'Transform'])
		var oValue = this.scroll.style[prefix + "Transform"],
			nValue = tdOpen + x + "px," + y + "px" + tdClose;
		this.scroll.style[prefix + "Transform"] = oValue.replace(rTranslate, nValue);
		this.left = x;
		this.top = y;
	},

	duration:function(t) {
		t = ( t || 0 ) + "ms";
		this.scroll.style[prefix + "TransitionDuration"] = t;
	},

	touchStart:function(event) {
			var tap = touchDevice ? event.touches[0] : event,
				matrix, left, top, c1, c2;

			if (this.options.onBeforeScrollStart) this.options.onBeforeScrollStart.call(this, event);

			this.duration("0");
			this.moved = false;
			this.zoomed = false;
			this.startTime = event.timeStamp || new Date().now();
			this.distance = 0;

			// Zoom
			if (this.options.zoom && touchDevice && event.touches.length > 1) {

				c1 = Math.abs(event.touches[0].pageX - event.touches[1].pageX);
				c2 = Math.abs(event.touches[0].pageY - event.touches[1].pageY);
				this.touchesDistStart = Math.sqrt(c1 * c1 + c2 * c2);

				this.originX = Math.abs(event.touches[0].pageX + event.touches[1].pageX - this.viewOffsetLeft * 2) / 2 - this.left;
				this.originY = Math.abs(event.touches[0].pageY + event.touches[1].pageY - this.viewOffsetTop * 2) / 2 - this.top;

			}

			if (this.options.momentum) {
				// Very lame general purpose alternative to CSSMatrix
				matrix = getComputedStyle(this.scroll, null)[prefix + "Transform"].replace(/[^0-9-.,]/g, "").split(",");
				left = matrix[4] * 1;
				top = matrix[5] * 1;

				if (left != this.left || top != this.top) {
					// this.steps = [];
					this.position(left, top);
				}

			}

			this.distanceX = 0;
			this.distanceY = 0;
			this.absDistanceX = 0;
			this.absDistanceY = 0;

			this.touchX = tap.pageX;
			this.touchY = tap.pageY;
			this.scrollStartX = this.left;
			this.scrollStartY = this.top;

			// var returnValue = this.options.touchstart&&this.options.touchstart.call(this);
			// if(returnValue === false) return;
			if (this.options.onScrollStart) this.options.onScrollStart.call(this, event);

			this.scroll.addEventListener(_MOVE,this,false);
			this.scroll.addEventListener(_END,this,false);
		},
		touchMove:function(event){
			// console.log("move")
			var tap = touchDevice ? event.touches[0] : event,
				pageX = tap.pageX,
				pageY = tap.pageY,
				dx = pageX - this.touchX,
				dy = pageY - this.touchY,
				scrollX = this.left + dx,
				scrollY = this.top + dy,
				time = event.timeStamp || new Date().now(),
				c1, c2, scale;

			// Zoom
			if (this.options.zoom && touchDevice && event.touches.length > 1) {
				c1 = Math.abs(event.touches[0].pageX - event.touches[1].pageX);
				c2 = Math.abs(event.touches[0].pageY - event.touches[1].pageY);
				this.touchesDist = Math.sqrt(c1 * c1 + c2 * c2);

				this.zoomed = true;

				scale = 1 / this.touchesDistStart * this.touchesDist * this.scale;

				// if(scale >= this.options.zoomMax) return;
				if (scale < this.options.zoomMin) scale = 0.5 * this.options.zoomMin * Math.pow(2.0, scale / this.options.zoomMin);
				else if (scale > this.options.zoomMax) scale = 2.0 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / scale);

				// if (this.options.autoZoomMin && (scrollX > this.cLeft || scrollY > this.cTop || (scrollX + this.oClipWidth) < this.cRight || (scrollY + this.oClipHeight) < this.cBottom)) {
				// 	alert("ok")
				// }

				this.lastScale = scale / this.scale;

				scrollX = this.originX - this.originX * this.lastScale + this.left;
				scrollY = this.originY - this.originY * this.lastScale + this.top;

				// this.scroll.style[transform] = 'translate(' + newX + 'px,' + newY + 'px) scale(' + scale + ')' + translateZ;
				// this.position(scrollX, scrollY);
				var nValue = tdOpen + scrollX + "px," + scrollY + "px" + tdClose + " scale(" + scale + ", " + scale + ")";

				this.scroll.style[prefix + "Transform"] = nValue;

				return;
			}

			this.touchX = pageX;
			this.touchY = pageY;

			if(this.options.constract) {
				if (scrollX < 0) {
					scrollX = 0;
					return;
				}
				else if (scrollX > this.swapWidth) {
					scrollX = this.swapWidth;
					return;
				}
				else if (scrollY < 0) {
					scrollY = 0;
					return;
				}
				else if (scrollY > this.swapHeight) {
					scrollY = this.swapHeight;
					return;
				}
			}
			else {
				if (scrollX > 0 || scrollX < this.swapWidth) {
					scrollX = this.options.obstacle ? this.left + (dx / 2) : scrollX >= 0 || this.swapWidth >= 0 ? 0 : this.swapWidth;
				}
				if (scrollY > this.minSwapY || scrollY < this.swapHeight) {
					scrollY = this.options.obstacle ? this.top + (dy / 2) : scrollY >= this.minSwapY || this.swapHeight >= 0 ? this.minSwapY : this.swapHeight;
				}
			}

			this.distanceX += dx;
			this.distanceY += dy;
			this.absDistanceX = Math.abs(this.distanceX);
			this.absDistanceY = Math.abs(this.distanceY);

			if (this.absDistanceX < 6 && this.absDistanceY < 6) {
				return;
			}

			// console.log(this.cLeft+','+this.cTop+','+this.cRight+','+this.cBottom)
			// 禁止拖出截图区域
			// if (scrollX > this.cLeft || scrollY > this.cTop || (scrollX + this.oClipWidth) < this.cRight || (scrollY + this.oClipHeight) < this.cBottom) {
			// 	return
			// }

			this.moved = true;

			// console.log("X:"+scrollX);
			// console.log("Y:"+scrollY);

			this.position(scrollX, scrollY);

			if (time - this.startTime > 300) {
				this.startTime = time;
				this.scrollStartX = this.left;
				this.scrollStartY = this.top;
			}

			if (this.options.onScrollMove) this.options.onScrollMove.call(this, event);
			// var returnValue = this.options.touchmove&&this.options.touchmove.call(this,event);
			// if(returnValue === false) return;
		},
		touchEnd:function(event){
			var tap = touchDevice ? event.changedTouches[0] : event,
				momentumX = { dist:0, time:0 },
				momentumY = { dist:0, time:0 },
				duration = ( event.timeStamp || new Date().now() ) - this.startTime,
				left = this.left,
				top = this.top,
				newDuration,
				scale;

			this.scroll.removeEventListener(_MOVE,this,false);
			this.scroll.removeEventListener(_END,this,false);

			this.options.touchEnd&&this.options.touchEnd.call(this,event);

			if (this.zoomed) {
				scale = this.scale * this.lastScale;
				scale = Math.max(this.options.zoomMin, scale);
				scale = Math.min(this.options.zoomMax, scale);
				this.lastScale = scale / this.scale;
				this.scale = scale;

				this.left = this.originX - this.originX * this.lastScale + this.left;
				this.top = this.originY - this.originY * this.lastScale + this.top;

				this.scroll.style[prefix + "TransitionDuration"] = "200ms";
				// this.scroll.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + that.scale + ')' + translateZ;
				var nValue = tdOpen + this.left + "px," + this.top + "px" + tdClose + " scale(" + this.scale + ", " + this.scale + ")";
				this.scroll.style[prefix + "Transform"] = nValue;

				this.zoomed = false;

				this.repaint(this.contentWidth * this.scale, this.contentHeight * this.scale);

				if (this.options.onZoomEnd) this.options.onZoomEnd.call(this, event);
				return;
			}

			if(!this.options.constract) {
				if (duration < 300 && this.options.momentum) {

					var maxScrollUpperX = -this.left,
						minScrollLowerX = this.contentWidth - this.viewWidth + this.left,
						maxScrollUpperY = -this.top,
						minScrollLowerY = this.swapHeight < 0 ? this.contentHeight - this.viewHeight + this.top - this.minSwapY : 0;
					momentumX = left ? this.momentum(left - this.scrollStartX, duration, maxScrollUpperX, minScrollLowerX, this.options.obstacle ? this.viewWidth : 0) : momentumX;
					momentumY = top ? this.momentum(top - this.scrollStartY, duration, maxScrollUpperY, minScrollLowerY, this.options.obstacle ? this.viewHeight : 0) : momentumY;

					left = this.left + momentumX.dist;
					top = this.top + momentumY.dist;

					if ((this.left > 0 && left > 0) || (this.left < this.swapWidth && left < this.swapWidth)) momentumX = { dist:0, time:0 };
					if ((this.top > this.minSwapY && top > this.minSwapY) || (this.top < this.swapHeight && top < this.swapHeight)) momentumY = { dist:0, time:0 };
				}

				if (this.options.noRollBack) return;

				if (momentumX.dist || momentumY.dist) {

					newDuration = Math.max(Math.max(momentumX.time, momentumY.time), 10);

					this.scrollTo(round(left), round(top), newDuration);
					// alert(this.element.style[prefix + 'TransitionDuration'])
					this.options.touchEnd&&this.options.touchEnd.call(this,event);

					return;
				}

				this.reset(300);
			}
		},

		scrollTo:function(newPositionX,newPositionY,newDuration){
			// alert(newPositionY)
			this.scroll.removeEventListener(_TRANSITION_END_EVENT, this, false);
			this.steps = [];
			this.moved = false;

			this.steps.push({left:newPositionX,top:newPositionY,time:newDuration||0});

			this.scrollTimer();
		},

		offset: function (el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;

			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}

			return { left: left, top: top };
		},

		scrollTimer : function(){
			var step;

			if(!this.steps.length){
				this.reset(400);
				return;
			}

			step = this.steps.shift();

			if (this.left == step.left && this.top == step.top) {
				step.time = 0;
			}

			this.moved = true;
			this.duration(step.time);
			this.position(step.left, step.top);
			if (step.time) this.scroll.addEventListener(_TRANSITION_END_EVENT,this,false);
			else this.reset(0);
		},

		reset:function(time){
			var resetX = this.left >= 0 ? 0 : this.left < this.swapWidth ? this.swapWidth : this.left,
				resetY = this.top >= this.minSwapY || this.swapHeight > 0 ? this.minSwapY : this.top < this.swapHeight ? this.swapHeight : this.top;

			if (resetX == this.left && resetY == this.top) {
				if (this.moved) {
					if (this.options.onScrollEnd) this.options.onScrollEnd.call(this);		// Execute custom code on scroll end
					this.moved = false;
				}
				return;
			}

			this.scrollTo(resetX, resetY, time || 0);
		},

		transitionEnd: function (event) {
			if (event.target != this.scroll) return;
			this.scroll.removeEventListener(_TRANSITION_END_EVENT,this,false);
			this.scrollTimer();
		},

		momentum: function (dist, time, maxDistUpper, maxDistLower,size) {
			var deceleration = 0.0007,// ( Math.abs(dist) * 2 ) / ( time * time ) ,// 0.0006,
				speed = Math.abs(dist) / time,
				newDist = (speed * speed) / (2 * deceleration),
				newTime = 0, outsideDist = 0;
				// alert(deceleration)
			// Proportinally reduce speed if we are outside of the boundaries
			if (dist > 0 && newDist > maxDistUpper) {
				outsideDist = size / (6 / (newDist / speed * deceleration));
				maxDistUpper = maxDistUpper + outsideDist;
				speed = speed * maxDistUpper / newDist;
				newDist = maxDistUpper;
			} else if (dist < 0 && newDist > maxDistLower) {
				outsideDist = size / (6 / (newDist / speed * deceleration));
				maxDistLower = maxDistLower + outsideDist;
				speed = speed * maxDistLower / newDist;
				newDist = maxDistLower;
			}

			newDist = newDist * (dist < 0 ? -1 : 1);
			newTime = speed / deceleration;

			return { dist: newDist, time: round(newTime) };
		},
		destory : function() {
			this.scroll.removeEventListener(_START,this,false);
			this.scroll.removeEventListener(_MOVE,this,false);
			this.scroll.removeEventListener(_END,this,false);
			this.scroll.removeEventListener("webkitTransitionEnd", this, false);
		}
}

Draggable.prototype.init.prototype = Draggable.prototype;

var Clip = function(options) {
	return new Clip.prototype.init(options);
}

Clip.prototype = {
	handleEvent : function(event){
		switch(event.type){
			case _START :
				if (!touchDevice && event.button !== 0) return;
				this.cutStart(event);
			break;
			case _MOVE :
				this.cutMove(event);
			break;
			case _END :
				this.cutEnd(event);
			break;
			case _TRANSITION_END_EVENT:
				this.transitionEnd(event);
			break;
		}
	},
	init : function(options) {
		var self = this;
		var view = this.view = typeof(options.view) == "string" ? jQuery(options.view) : options.view;
		var clipElement = typeof(options.clipElement) == "string" ? jQuery(options.clipElement) : options.clipElement;
		this.snapshot = typeof(options.snapshot) == "string" ? jQuery(options.snapshot) : options.snapshot;
		this.options = options;
		this.cWidth = this.options.clipWidth || 0;
		this.cHeight = this.options.clipHeight || 0;
		this.oWidth = this.view[0].offsetWidth;
		this.oHeight = this.view[0].offsetHeight;
		this.oClipWidth = clipElement[0].offsetWidth;
		this.oClipHeight = clipElement[0].offsetHeight;
		this.cLeft = ( this.oWidth - this.cWidth ) / 2;
		this.cTop = ( this.oHeight - this.cHeight ) / 2;
		// this.draggable = Draggable({ element : clipElement, setInCenter : options.setInCenter, noRollBack : true });

		this.repaint(clipElement);

		var toolbar = this.toolbarElement = this.toolbar();
		this.buildFrame();

		/*
		clipElement[0].onmouseover = function() {
			toolbar.removeClass("hidden");
		}
		clipElement[0].onmouseout = function() {
			toolbar.addClass("hidden");
		}
		toolbar[0].onmouseover = function(event){
			toolbar.removeClass("hidden");
		}
		toolbar[0].onmouseout = function(event) {
			toolbar.addClass("hidden");
		}
		*/
	},
	buildFrame : function() {
		// var width = this.cLeft = ( this.oWidth - this.cWidth ) / 2;
		// var height = this.cTop = ( this.oHeight - this.cHeight ) / 2;
		var frameTop = jQuery("<div class='clip-frame top'/>").css({"width" : this.oWidth, "height" : this.cTop}).insertBefore(this.clipElement),
			frameBottom = jQuery("<div class='clip-frame bottom'/>").css({"width" : this.oWidth, "height" : this.cTop}).insertBefore(this.clipElement),
			frameLeft = jQuery("<div class='clip-frame left'/>").css({"width" : this.cLeft, "height" : this.cHeight, "top" : this.cTop}).insertBefore(this.clipElement),
			frameRight = jQuery("<div class='clip-frame right'/>").css({"width" : this.cLeft, "height" : this.cHeight, "top" : this.cTop}).insertBefore(this.clipElement);
	},
	inCenter : function() {
		this.left = Math.round((this.oWidth - this.oClipWidth) / 2),
		this.top = Math.round((this.oHeight - this.oClipHeight) / 2);

		var // oValue = this.clipElement[0].style[prefix + "Transform"],
			nValue = tdOpen + this.left + "px," + this.top + "px" + tdClose;
		this.clipElement[0].style[prefix + "Transform"] = nValue;//oValue.replace(rTranslate, nValue);

		// console.log(this.clipElement[0].style[prefix + "Transform"])
	},
	zoomInitial : function() {
		//zoom
		this.multiple = 1;
		this.zoomMin = this.options.zoomMin || 0;
		this.zoomMax = this.options.zoomMax || 0;
		this.zoomOutFlag = true;
		this.zoomInFlag = true;

		var nValue = "scale(" + this.multiple + ", " + this.multiple + ")",
			oValue = this.clipElement[0].style[prefix + "Transform"];

		if(rScale.test(oValue)) {
			this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rScale, nValue);
		}
		else {
			this.clipElement[0].style[prefix + "Transform"] += nValue;
		}

		/*
		if(this.oClipWidth <= this.oWidth && this.oClipHeight <= this.oHeight) {
			zoomOutBtn.addClass("disable-state");
		}

		if(this.oClipWidth > this.oClipHeight) {
			this.limitDownMultiple = this.oWidth / this.oClipWidth;
		}
		else {
			this.limitDownMultiple = this.oHeight / this.oClipHeight;
		}
		*/

		if(this.oClipWidth <= this.cWidth && this.oClipHeight <= this.cHeight) {
			// this.zoomOutBtn.addClass("disable-state");
			if(this.oClipWidth > this.oClipHeight) {
				this.zoomMax = this.cHeight / this.oClipHeight;
			}
			else{
				this.zoomMax = this.cWidth / this.oClipWidth;
			}
			this.zoomMin = this.zoomMin || 1;
			return;
		}
		if(this.zoomMin) return;
		if(this.oClipWidth > this.oClipHeight) {
			this.zoomMin = this.cWidth / this.oClipWidth;
		}
		else {
			this.zoomMin = this.cHeight / this.oClipHeight;
		}
		this.zoomMax = this.zoomMax || 1;
	},
	repaint : function(clipElement) {
		var self = this;
		this.clipElement = clipElement;
		this.oClipWidth = clipElement[0].offsetWidth;
		this.oClipHeight = clipElement[0].offsetHeight;

		this.options.setInCenter && this.inCenter();

		this.zoomInitial();
		this.computed();
		this.draggable = this.draggable ? this.draggable.repaint(this.oClipWidth, this.oClipHeight) :
		Draggable({
			element : clipElement,
			left : this.left,
			top : this.top,
			noRollBack : true,
			zoom: true,
			zoomMin: this.zoomMin,
			zoomMax: this.zoomMax,
			autoZoomMin: this.options.zoomMin ? false : true,
			clipWidth: this.cWidth,
			clipHeight: this.cHeight,
			touchEnd: function() {
				self.computed();
			},
			onZoomEnd : function() {
				self.multiple = this.scale;

				if(self.multiple < self.zoomMax) {
					self.zoomInFlag = true;
				}
				else if(self.multiple > self.zoomMin){
					self.zoomOutFlag = true;
				}
				self.computed();
				// if(this.lastScale >= self.zoomMax) {
					// self.zoomInBtn.addClass("disable-state");
				// }
			}
		});

	},
	toolbar : function() {
		var self = this;
		var box = jQuery("<div class='toolbar'/>").insertAfter(this.view),
			bar = jQuery("<div class='button-b button-g'/>").appendTo(box),
			zoomOutBtn = this.zoomOutBtn = jQuery("<button class='button button-radius'><span class='icon zoom-out-icon'/></button>").appendTo(bar),
			zoomInBtn = this.zoomInBtn = jQuery("<button class='button button-radius'><span class='icon zoom-in-icon'/></button>").appendTo(bar);
			// confirmBtn = this.confirmBtn = jQuery("<button class='button button-radius'><span class='icon confirm-icon'/></button>").appendTo(bar);
			// cutBtn = jQuery("<button class='button button-radius'><span class='icon cut-icon'/></button>").appendTo(bar);

		zoomOutBtn[0].onclick = function() {
			if(zoomOutBtn.hasClass("disable-state")) return;
			self.zoomout();
		}

		zoomInBtn[0].onclick = function() {

			if(zoomInBtn.hasClass("disable-state")) return;
			self.zoomin();
		}

		// confirmBtn[0].onclick = function() {
		// 	if(confirmBtn.hasClass("disable-state")) return;
		// 	var matrix1 = getComputedStyle(self.clipElement[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',');
		// 	// var matrix2 = getComputedStyle(self.snap[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',');
		// 	var left = self.cLeft - matrix1[4] * 1,
		// 		top = self.cTop - matrix1[5] * 1,
		// 		width = self.cWidth,
		// 		height = self.cHeight;
    //
		// 	self.options.onConfirm && self.options.onConfirm.apply(self, [left, top, width, height, self.oClipWidth, self.oClipHeight, self.multiple]);
		// }

		//cut
		/*
		cutBtn[0].onclick = function() {
			bar.addClass("hidden");
			self.cut();
		}
		*/

		return bar;
	},
	computed: function() {
		var matrix1 = getComputedStyle(this.clipElement[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',');
		// var matrix2 = getComputedStyle(self.snap[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',');
		// console.log(this.cLeft)
		var left = this.cLeft - matrix1[4] * 1,
			top = this.cTop - matrix1[5] * 1,
			width = this.cWidth,
			height = this.cHeight;
		this.value = {
			left: left,
			top: top,
			width: width,
			height: height,
			clipWidth: this.oClipWidth,
			clipHeight: this.oClipHeight,
			scale: this.multiple
		}
	},
	zoomout : function() {

		this.clipElement[0].style[prefix + "TransitionDuration"] = "200ms";
		this.zoomInBtn.removeClass("disable-state");

		if(this.zoomOutFlag) {
			this.multiple -= 0.1;
			this.zoomInFlag = true;
		}
		if(this.multiple < this.zoomMin) {
			this.zoomOutFlag = false;
			this.multiple = this.zoomMin;
			this.zoomOutBtn.addClass("disable-state");
		}

		this.oClipWidth = this.clipElement[0].offsetWidth * this.multiple;
		this.oClipHeight = this.clipElement[0].offsetHeight * this.multiple;

		if(this.options.setInCenter) {
			this.draggable.left = (this.oWidth - this.oClipWidth) / 2;
			this.draggable.top = (this.oHeight - this.oClipHeight) / 2;
			var oValue = this.clipElement[0].style[prefix + "Transform"],
				nValue = tdOpen + this.draggable.left + "px," + this.draggable.top + "px" + tdClose;
			this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rTranslate, nValue);
		}
		this.draggable.scale = this.multiple;

		var nValue = "scale(" + this.multiple + ", " + this.multiple + ")",
			oValue = this.clipElement[0].style[prefix + "Transform"];

		this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rScale, nValue);

		this.clipElement[0].addEventListener(_TRANSITION_END_EVENT, this, false);
		this.draggable && this.draggable.repaint(this.oClipWidth, this.oClipHeight);
		this.computed();
	},
	zoomin : function() {

		this.clipElement[0].style[prefix + "TransitionDuration"] = "200ms";
		this.zoomOutBtn.removeClass("disable-state");

		if(this.zoomInFlag) {
			this.multiple += 0.1;
			this.zoomOutFlag = true;
		}
		if(this.multiple > this.zoomMax) {
			this.zoomInFlag = false;
			this.multiple = this.zoomMax;
			this.zoomInBtn.addClass("disable-state");
		}

		this.oClipWidth = this.clipElement[0].offsetWidth * this.multiple;
		this.oClipHeight = this.clipElement[0].offsetHeight * this.multiple;

		if(this.options.setInCenter) {
			this.draggable.left = (this.oWidth - this.oClipWidth) / 2;
			this.draggable.top = (this.oHeight - this.oClipHeight) / 2;
			var oValue = this.clipElement[0].style[prefix + "Transform"],
				nValue = tdOpen + this.draggable.left + "px," + this.draggable.top + "px" + tdClose;
			this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rTranslate, nValue);
		}
		this.draggable.scale = this.multiple;
		var nValue = "scale(" + this.multiple + ", " + this.multiple + ")",
			oValue = this.clipElement[0].style[prefix + "Transform"];
		this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rScale, nValue);
		this.clipElement[0].addEventListener(_TRANSITION_END_EVENT, this, false);
		this.draggable && this.draggable.repaint(this.oClipWidth, this.oClipHeight);
		this.computed();
	},
	/*
	confirmbar : function() {
		var self = this;
		var bar = jQuery("<div class='button-b button-g toolbar'/>").appendTo(this.element),
			confirmBtn = this.confirmBtn = jQuery("<button class='button button-radius disable-state'><span class='icon confirm-icon'/></button>").appendTo(bar),
			cancelBtn = this.cancelBtn = jQuery("<button class='button button-radius'><span class='icon cancel-icon'/></button>").appendTo(bar);

		confirmBtn[0].onclick = function() {
			if(confirmBtn.hasClass("disable-state")) return;
			var matrix1 = getComputedStyle(self.clipElement[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',');
			var matrix2 = getComputedStyle(self.snap[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',');
			var left = Math.abs(matrix1[4] * 1) + matrix2[4] * 1,
				top = Math.abs(matrix1[5] * 1) + matrix2[5] * 1,
				width = self.snap[0].offsetWidth,
				height = self.snap[0].offsetHeight;

			self.options.onConfirm && self.options.onConfirm.apply(self, [left, top, width, height, self.oClipWidth, self.oClipHeight, self.multiple]);
		}

		cancelBtn[0].onclick = function() {
			self.destory();
			bar.remove();
			self.toolbarElement.removeClass("hidden");
		}

		return bar;
	},
	cut : function() {
		var width = this.oWidth,
			height = this.oHeight;

		if(this.oClipWidth < this.oWidth) {
			width = this.oClipWidth;
		}

		if(this.oClipHeight < this.oHeight) {
			height = this.oClipHeight;
		}

		var overlay = this.overlay = jQuery("<div class='overlay'/>").css({ "width" : width, "height" : height }).appendTo(this.element);

		this.confirmbarElement = this.confirmbar();

		this.overlay[0].addEventListener(_START, this, false);
	},
	cutStart : function(event) {
		var tap = touchDevice ? event.touches[0] : event,
			left, top;
		event.preventDefault();
		this.moved = false;
		this.startTime = event.timeStamp || new Date().now();

		this.touchStartX = tap.pageX;
		this.touchStartY = tap.pageY;

		this.snap = jQuery("<div class='snap'/>").appendTo(this.overlay);
		this.tips = jQuery("<span class='pixel-tips'/>").appendTo(this.snap);
		this.snap[0].style[prefix+"Transform"] = tdOpen + this.touchStartX + "px," + this.touchStartY + "px" + tdClose;
		this.overlay[0].addEventListener(_MOVE,this,false);
		this.overlay[0].addEventListener(_END,this,false);
	},
	cutMove : function(event) {
		var tap = touchDevice ? event.touches[0] : event,
			moveX = tap.pageX,
			moveY = tap.pageY,
			dx =  moveX - this.touchStartX,
			dy = moveY - this.touchStartX;

		if(this.moveLocked && dx > 0 && dx < this.snap[0].offsetWidth) {
			this.moveLocked = false;
			this.snap.css({"width" : dx, "height" : dx});
			this.tips.text(this.snap[0].offsetWidth + " x " + this.snap[0].offsetHeight);
		}

		if(this.touchStartX + this.snap[0].offsetWidth >= this.overlay[0].offsetWidth ||
			this.touchStartY + this.snap[0].offsetHeight >= this.overlay[0].offsetHeight) {
			this.moveLocked = true;
			return;
		}

		if(dx > 0) {
			this.snap.css({"width" : dx, "height" : dx});
			this.tips.text(this.snap[0].offsetWidth + " x " + this.snap[0].offsetHeight);
		}
		this.canvasSnap();
		this.moved = true;
	},
	cutEnd : function() {
		var self = this;
		this.confirmBtn.removeClass("disable-state");
		this.overlay[0].removeEventListener(_START,this,false);
		this.overlay[0].removeEventListener(_MOVE,this,false);
		this.overlay[0].removeEventListener(_END,this,false);
		Draggable({element : this.snap, xSwap : true, ySwap : true, constract : true, left : this.touchStartX, top : this.touchStartY, onScrollMove : function() {
			self.canvasSnap();
		}})
	},
	*/
	transitionEnd : function() {
		this.clipElement[0].removeEventListener(_TRANSITION_END_EVENT, this, false);
		this.draggable.scrollWidth = this.oClipWidth;
		this.draggable.scrollHeight = this.oClipHeight;
		// this.draggable.repaint();
	},
	destory : function() {
		this.draggable.destory();
		this.clipElement.find(".clip-frame").remove();
		this.toolbarElement.remove();
		this.snap && this.snap.remove();
	},
	canvasSnap : function() {
		var matrix1 = getComputedStyle(this.clipElement[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',');
		var matrix2 = getComputedStyle(this.snap[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',');
		var sx = ( Math.abs(matrix1[4] * 1) + matrix2[4] * 1 ) / this.multiple, // 缩放x轴位置
			sy = ( Math.abs(matrix1[5] * 1) + matrix2[5] * 1 ) / this.multiple, // 缩放y轴位置
			sWidth = this.snap[0].offsetWidth / this.multiple, // 缩放后源宽度
			sHeight = this.snap[0].offsetHeight / this.multiple, // 缩放后源高度
			dWidth = this.snap[0].offsetWidth,
			dHeight = this.snap[0].offsetHeight;
			cWidth = this.options.canvasWidth || dWidth,
			cHeight =  this.options.canvasHeight || dHeight;
		this.snapshot.empty();
		var canvas = jQuery("<canvas/>").appendTo(this.snapshot);
		var ctx = canvas[0].getContext("2d");
		this.canvas = canvas[0];
		canvas[0].width = cWidth;
		canvas[0].height = cHeight;
		ctx.drawImage(this.clipElement[0].children[0],
						sx, sy, sWidth, sHeight, 0, 0, cWidth, cHeight);
	},
	imageDataURL : function() {
		return this.canvas.toDataURL("image/png");
	}
}

Clip.prototype.init.prototype = Clip.prototype;

export default Clip
