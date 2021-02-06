/**
 * @author simon huang
 * @version 0.3
 * @date 2018-4-20
 */
import jQuery from 'jquery'
import './css/base.css'
const round = function(n){return n >> 0;}
const touchDevice = ("ontouchstart" in window)
const _START = touchDevice?"touchstart":"mousedown"
const _MOVE = touchDevice?"touchmove":"mousemove"
const _END = touchDevice?"touchend":"mouseup"
const _TRANSITION_END_EVENT = "transitionend"
const prefix = (/webkit/i).test(navigator.appVersion) ? "webkit" : (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : ''
const has3d = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix()
const hasTransform = prefix + "Transform" in document.documentElement.style
const tdOpen = "translate" + (has3d ? "3d(" : "(")
const tdClose = has3d ? ",0)" : ")"
const rTranslate = /(?:translate3d\(-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0)(?:px)?,\s*-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0)(?:px)?,\s*-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0)(?:px)?\))/
const rScale = /(?:scale\(-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0),\s*-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|[1-9]\d*|0))\)/

const Draggable = function(options) {
  return new Draggable.prototype.init(options);
}

Draggable.prototype = {
      handleEvent : function(event){
        switch(event.type){
                case _START :
                        if (!touchDevice && event.button !== 0) return
                        this.touchStart(event)
                        break
                case _MOVE :
                        this.touchMove(event)
                        break
                case _END :
                        this.touchEnd(event)
                        break
                case _TRANSITION_END_EVENT:
                        this.transitionEnd(event)
                        break
        }
      },
      init : function(options){
        options = options||{}
        // this.validate = false;

        const element = options.element = typeof(options.element) == "string" ? jQuery(options.element) : options.element

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
                onBeforeScrollStart : function (e) { e.preventDefault() },
                onScrollStart: null,
                onScrollMove: null,
                onScrollEnd: null,
                scrollWidth : 0,
                scrollHeight : 0,
                clipImgWidth : options.clipImgWidth,
                clipImgHeight : options.clipImgHeight
        };

        if(typeof options == "object") {
                for(let p in options) {
                        this.options[p] = options[p]
                }
        }
        const self = this
        this.left = this.options.left
        this.top = this.options.top
        this.scale = 1

        this.scroll = element[0] // this.view.children[0]
        this.view = element.parent()[0]

        this.scrollWidth = this.options.scrollWidth
        this.scrollHeight = this.options.scrollHeight

        jQuery(this.scroll).addClass("swapanim")

        this.repaint()

        // this.options.setInCenter && this.inCenter()

        const oValue = this.scroll.style[prefix + "Transform"]
        const nValue = tdOpen + this.left + "px," + this.top + "px" + tdClose

        if (rTranslate.test(oValue)) {
                this.scroll.style[prefix + "Transform"] = oValue.replace(rTranslate, nValue)
        } else {
                this.scroll.style[prefix + "Transform"] += nValue
        }


        // console.log(this.scroll.style[prefix + 'Transform']);
        this.scroll.addEventListener(_START,this,false)
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
      repaint: function () {
        //axis x
        this.viewWidth = this.view.clientWidth || 1
        this.contentWidth = this.scrollWidth || this.scroll.offsetWidth // +parseInt(window.getComputedStyle(this.view).paddingLeft)*2;
        this.swapWidth = this.viewWidth - this.contentWidth
        // this.swapX = this.contentWidth > this.viewWidth
        //axis y
        this.minSwapY = -this.options.scrollOffset || 0
        this.viewHeight = this.view.clientHeight || 1
        this.contentHeight = this.scrollHeight || this.scroll.offsetHeight + this.minSwapY//+parseInt(window.getComputedStyle(this.view).paddingTop)*2;
        this.swapHeight = this.viewHeight - this.contentHeight + this.minSwapY
        // this.swapY = this.contentHeight > this.viewHeight;
        // alert(this.contentHeight)
        // console.log(this.swapWidth);
        if (this.options.onRefresh) this.options.onRefresh.call(this)

        this.xSwap = this.options.xSwap || Math.abs(this.swapWidth) >= 0;
        this.ySwap = this.options.ySwap || ( !this.xSwap || this.contentHeight > this.viewHeight )

        const offset = this.offset(this.view)
        this.viewOffsetLeft = -offset.left
        this.viewOffsetTop = -offset.top
        // this.scroll.style[prefix + 'TransitionDuration'] = '0';
        // !this.options.constract && this.reset(300);
        return this
      },
      position: function (x,y) {
              // console.log("X:"+this.xSwap);
              const scrollW = jQuery(this.scroll).width()*this.scale
              const scrollH = jQuery(this.scroll).height()*this.scale
              if (x > 0) {
                      x = 0
              } else if (x < this.viewWidth - scrollW) {
                      x = this.viewWidth - scrollW
              }
              if (y > 0) {
                      y = 0;
              } else if (y < this.viewHeight - scrollH) {
                      y = this.viewHeight - scrollH
              }
              x = this.xSwap ? x : 0
              y = this.ySwap ? y : 0
              // this.scroll.style[prefix + "Transform"] = tdOpen + x + "px," + y + "px" + tdClose;
              // console.log(this.scroll.style[prefix + 'Transform'])
              const oValue = this.scroll.style[prefix + "Transform"]
              const nValue = tdOpen + x + "px," + y + "px" + tdClose
              this.scroll.style[prefix + "Transform"] = oValue.replace(rTranslate, nValue)
              this.left = x
              this.top = y
      },

      duration: function(t) {
              t = ( t || 0 ) + "ms"
              this.scroll.style[prefix + "TransitionDuration"] = t
      },

      touchStart: function (event) {
              const tap = touchDevice ? event.touches[0] : event
              let matrix = null
              let left = 0
              let top = 0
              let c1 = 0
              let c2 = 0

              if (this.options.onBeforeScrollStart) this.options.onBeforeScrollStart.call(this, event)

              this.duration("0")
              this.moved = false
              this.zoomed = false
              this.startTime = event.timeStamp || new Date().now()
              this.distance = 0

              // Zoom
              if (this.options.zoom && touchDevice && event.touches.length > 1) {

                      c1 = Math.abs(event.touches[0].pageX - event.touches[1].pageX)
                      c2 = Math.abs(event.touches[0].pageY - event.touches[1].pageY)
                      this.touchesDistStart = Math.sqrt(c1 * c1 + c2 * c2)

                      this.originX = Math.abs(event.touches[0].pageX + event.touches[1].pageX - this.viewOffsetLeft * 2) / 2 - this.left
                      this.originY = Math.abs(event.touches[0].pageY + event.touches[1].pageY - this.viewOffsetTop * 2) / 2 - this.top

              }

              if (this.options.momentum) {
                      // Very lame general purpose alternative to CSSMatrix
                      matrix = getComputedStyle(this.scroll, null)[prefix + "Transform"].replace(/[^0-9-.,]/g, "").split(",")
                      left = matrix[4] * 1
                      top = matrix[5] * 1

                      if (left != this.left || top != this.top) {
                              // this.steps = [];
                              this.position(left, top)
                      }

              }

              this.distanceX = 0
              this.distanceY = 0
              this.absDistanceX = 0
              this.absDistanceY = 0

              this.touchX = tap.pageX
              this.touchY = tap.pageY
              this.scrollStartX = this.left
              this.scrollStartY = this.top

              // var returnValue = this.options.touchstart&&this.options.touchstart.call(this);
              // if(returnValue === false) return;
              if (this.options.onScrollStart) this.options.onScrollStart.call(this, event)

              this.scroll.addEventListener(_MOVE,this,false)
              this.scroll.addEventListener(_END,this,false)
      },
      touchMove: function(event) {
              // console.log("move")
              const tap = touchDevice ? event.touches[0] : event
              let pageX = tap.pageX
              let pageY = tap.pageY
              let dx = pageX - this.touchX
              let dy = pageY - this.touchY
              let scrollX = this.left + dx
              let scrollY = this.top + dy
              let time = event.timeStamp || new Date().now()
              let c1 = null
              let c2 = null
              let scale = null

              // Zoom
              if (this.options.zoom && touchDevice && event.touches.length > 1) {
                      console.log("move zoom")
                      c1 = Math.abs(event.touches[0].pageX - event.touches[1].pageX)
                      c2 = Math.abs(event.touches[0].pageY - event.touches[1].pageY)
                      this.touchesDist = Math.sqrt(c1 * c1 + c2 * c2)

                      this.zoomed = true

                      scale = 1 / this.touchesDistStart * this.touchesDist * this.scale

                      // if(scale >= this.options.zoomMax) return;

                      if (scale < this.options.zoomMin) scale = 0.5 * this.options.zoomMin * Math.pow(2.0, scale / this.options.zoomMin)
                      else if (scale > this.options.zoomMax) scale = 2.0 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / scale)

                      this.lastScale = scale / this.scale
                      let curscale = scale
                      if(curscale < this.options.ozoomMin)curscale = this.options.ozoomMin

                      scrollX = this.originX - this.originX * this.lastScale + this.left
                      scrollY = this.originY - this.originY * this.lastScale + this.top

                      // this.scroll.style[transform] = 'translate(' + newX + 'px,' + newY + 'px) scale(' + scale + ')' + translateZ;
                      // this.position(scrollX, scrollY);


                      const scrollW = this.options.clipImgWidth * curscale
                      const scrollH = this.options.clipImgWidth * curscale
                      if (scrollX > 0) {
                              scrollX = 0
                      } else if (scrollX < this.viewWidth - scrollW) {
                              scrollX = this.viewWidth - scrollW
                      }
                      if (scrollY > 0) {
                              scrollY = 0
                      } else if (scrollX < this.viewHeight - scrollH) {
                              scrollX = this.viewHeight - scrollH
                      }

                      const nValue = tdOpen + scrollX + "px," + scrollY + "px" + tdClose + " scale(" + curscale + ", " + curscale + ")"

                      this.scroll.style[prefix + "Transform"] = nValue

                      return
              }

              this.touchX = pageX
              this.touchY = pageY

              if (this.options.constract) {
                      if (scrollX < 0) {
                              scrollX = 0
                              return
                      } else if (scrollX > this.swapWidth) {
                              scrollX = this.swapWidth
                              return
                      } else if (scrollY < 0) {
                              scrollY = 0
                              return
                      } else if (scrollY > this.swapHeight) {
                              scrollY = this.swapHeight
                              return
                      }
              } else {
                      if (scrollX > 0 || scrollX < this.swapWidth) {
                              scrollX = this.options.obstacle ? this.left + (dx / 2) : scrollX >= 0 || this.swapWidth >= 0 ? 0 : this.swapWidth
                      }
                      if (scrollY > this.minSwapY || scrollY < this.swapHeight) {
                              scrollY = this.options.obstacle ? this.top + (dy / 2) : scrollY >= this.minSwapY || this.swapHeight >= 0 ? this.minSwapY : this.swapHeight
                      }
              }

              this.distanceX += dx
              this.distanceY += dy
              this.absDistanceX = Math.abs(this.distanceX)
              this.absDistanceY = Math.abs(this.distanceY)

              if (this.absDistanceX < 6 && this.absDistanceY < 6) {
                      return
              }

              this.moved = true

              // console.log("X:"+scrollX);
              // console.log("Y:"+scrollY);

              this.position(scrollX, scrollY)

              if (time - this.startTime > 300) {
                      this.startTime = time
                      this.scrollStartX = this.left
                      this.scrollStartY = this.top
              }

              if (this.options.onScrollMove) this.options.onScrollMove.call(this, event)
              // var returnValue = this.options.touchmove&&this.options.touchmove.call(this,event);
              // if(returnValue === false) return;
      },
      touchEnd: function(event) {
              const tap = touchDevice ? event.changedTouches[0] : event
              let momentumX = { dist:0, time:0 }
              let momentumY = { dist:0, time:0 }
              let duration = ( event.timeStamp || new Date().now() ) - this.startTime
              let left = this.left
              let top = this.top
              let newDuration = null
              let scale = null

              this.scroll.removeEventListener(_MOVE,this,false)
              this.scroll.removeEventListener(_END,this,false)

              this.options.touchend && this.options.touchend.call(this,event)
              if (this.zoomed) {
                      scale = this.scale * this.lastScale
                      scale = Math.max(this.options.zoomMin, scale)
                      scale = Math.min(this.options.zoomMax, scale)
                      this.lastScale = scale / this.scale
                      this.scale = scale

                      this.left = this.originX - this.originX * this.lastScale + this.left
                      this.top = this.originY - this.originY * this.lastScale + this.top

                      let transX = this.left
                      let transY = this.top
                      if(this.scale < this.options.ozoomMin)this.scale = this.options.ozoomMin
                      const scrollW = jQuery(this.scroll).width() * this.scale
                      const scrollH = jQuery(this.scroll).height() * this.scale
                      if (transX > 0) {
                              transX = 0
                      } else if (transX < this.viewWidth - scrollW) {
                              transX = this.viewWidth - scrollW
                      }
                      if (transY > 0) {
                              transY = 0
                      } else if (transY < this.viewHeight - scrollH) {
                              transY = this.viewHeight - scrollH
                      }
                      this.left = transX
                      this.top = transY

                      this.scroll.style[prefix + "TransitionDuration"] = "200ms"
                      // this.scroll.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + that.scale + ')' + translateZ;
                      const nValue = tdOpen + this.left + "px," + this.top + "px" + tdClose + " scale(" + this.scale + ", " + this.scale + ")"
                      this.scroll.style[prefix + "Transform"] = nValue

                      this.zoomed = false
                      this.repaint()

                      if (this.options.onZoomEnd) this.options.onZoomEnd.call(this, event)
                      return
              }

              if (!this.options.constract) {
                      if (duration < 300 && this.options.momentum) {
                              let maxScrollUpperX = -this.left
                              let minScrollLowerX = this.contentWidth - this.viewWidth + this.left
                              let maxScrollUpperY = -this.top
                              let minScrollLowerY = this.swapHeight < 0 ? this.contentHeight - this.viewHeight + this.top - this.minSwapY : 0
                              momentumX = left ? this.momentum(left - this.scrollStartX, duration, maxScrollUpperX, minScrollLowerX, this.options.obstacle ? this.viewWidth : 0) : momentumX
                              momentumY = top ? this.momentum(top - this.scrollStartY, duration, maxScrollUpperY, minScrollLowerY, this.options.obstacle ? this.viewHeight : 0) : momentumY

                              left = this.left + momentumX.dist
                              top = this.top + momentumY.dist

                              if ((this.left > 0 && left > 0) || (this.left < this.swapWidth && left < this.swapWidth)) momentumX = { dist:0, time:0 }
                              if ((this.top > this.minSwapY && top > this.minSwapY) || (this.top < this.swapHeight && top < this.swapHeight)) momentumY = { dist:0, time:0 }
                      }
                      if (this.options.noRollBack) return
                      if (momentumX.dist || momentumY.dist) {
                              newDuration = Math.max(Math.max(momentumX.time, momentumY.time), 10)
                              this.scrollTo(round(left), round(top), newDuration)
                              this.options.touchend&&this.options.touchend.call(this,event)
                              return
                      }
                      this.reset(300)
              }
      },
      scrollTo: function(newPositionX,newPositionY,newDuration) {
              this.scroll.removeEventListener(_TRANSITION_END_EVENT, this, false)
              this.steps = []
              this.moved = false

              this.steps.push({left:newPositionX,top:newPositionY,time:newDuration||0})

              this.scrollTimer()
      },
      offset: function (el) {
              let left = -el.offsetLeft
              let top = -el.offsetTop

              while (el = el.offsetParent) {
                      left -= el.offsetLeft
                      top -= el.offsetTop
              }

              return { left: left, top: top }
      },

      scrollTimer: function(){
              let step = null

              if (!this.steps.length) {
                      this.reset(400)
                      return
              }

              step = this.steps.shift()

              if (this.left == step.left && this.top == step.top) {
                      step.time = 0
              }

              this.moved = true
              this.duration(step.time)
              this.position(step.left, step.top)
              if (step.time) this.scroll.addEventListener(_TRANSITION_END_EVENT,this,false)
              else this.reset(0)
      },

      reset: function(time){
              const resetX = this.left >= 0 ? 0 : this.left < this.swapWidth ? this.swapWidth : this.left
              const resetY = this.top >= this.minSwapY || this.swapHeight > 0 ? this.minSwapY : this.top < this.swapHeight ? this.swapHeight : this.top
              if (resetX == this.left && resetY == this.top) {
                      if (this.moved) {
                              if (this.options.onScrollEnd) this.options.onScrollEnd.call(this)
                              this.moved = false
                      }
                      return
              }

              this.scrollTo(resetX, resetY, time || 0)
      },

      transitionEnd: function (event) {
              if (event.target != this.scroll) return
              this.scroll.removeEventListener(_TRANSITION_END_EVENT,this,false)
              this.scrollTimer()
      },

      momentum: function (dist, time, maxDistUpper, maxDistLower,size) {
              const deceleration = 0.0007 // ( Math.abs(dist) * 2 ) / ( time * time ) ,// 0.0006,
              let speed = Math.abs(dist) / time
              let newDist = (speed * speed) / (2 * deceleration)
              let newTime = 0
              let outsideDist = 0
              if (dist > 0 && newDist > maxDistUpper) {
                      outsideDist = size / (6 / (newDist / speed * deceleration))
                      maxDistUpper = maxDistUpper + outsideDist
                      speed = speed * maxDistUpper / newDist
                      newDist = maxDistUpper
              } else if (dist < 0 && newDist > maxDistLower) {
                      outsideDist = size / (6 / (newDist / speed * deceleration))
                      maxDistLower = maxDistLower + outsideDist
                      speed = speed * maxDistLower / newDist
                      newDist = maxDistLower
              }

              newDist = newDist * (dist < 0 ? -1 : 1)
              newTime = speed / deceleration

              return { dist: newDist, time: round(newTime) }
      },
      destory: function() {
              this.scroll.removeEventListener(_START,this,false)
              this.scroll.removeEventListener(_MOVE,this,false)
              this.scroll.removeEventListener(_END,this,false)
              this.scroll.removeEventListener("webkitTransitionEnd", this, false)
      }
}

Draggable.prototype.init.prototype = Draggable.prototype

const Clip = function (options) {
      return new Clip.prototype.init(options);
}

Clip.prototype = {
      handleEvent: function (event) {
              switch(event.type) {
                      case _START :
                              if (!touchDevice && event.button !== 0) return
                              this.cutStart(event)
                              break
                      case _MOVE :
                              this.cutMove(event)
                              break
                      case _END :
                              this.cutEnd(event)
                              break
                      case _TRANSITION_END_EVENT:
                              this.transitionEnd(event)
                              break
              }
      },
      init: function (options) {
              const self = this
              const view = this.view = typeof(options.view) == "string" ? jQuery(options.view) : options.view
              this.viewWidth = view.width()
              this.viewHeight = view.height()
              const clipElement = typeof(options.clipElement) == "string" ? jQuery(options.clipElement) : options.clipElement
              this.snapshot = typeof(options.snapshot) == "string" ? jQuery(options.snapshot) : options.snapshot
              this.options = options
              this.cWidth = this.options.clipWidth || 0
              this.cHeight = this.options.clipHeight || 0
              this.oWidth = this.view[0].offsetWidth
              this.oHeight = this.view[0].offsetHeight
              this.oClipWidth = clipElement[0].offsetWidth
              this.oClipHeight = clipElement[0].offsetHeight

              // this.draggable = Draggable({ element : clipElement, setInCenter : options.setInCenter, noRollBack : true });
              this.repaint(clipElement)

              this.toolbarElement = this.toolbar()
              this.buildFrame()
              this.options.initCallback && this.options.initCallback(this)
      },
      buildFrame: function () {
              let width = this.cLeft = ( this.oWidth - this.cWidth ) / 2
              let height = this.cTop = ( this.oHeight - this.cHeight ) / 2

              const frameTop = jQuery("<div class='clip-frame top'/>").css({"width" : this.oWidth, "height" : height}).insertBefore(this.clipElement)
              const frameBottom = jQuery("<div class='clip-frame bottom'/>").css({"width" : this.oWidth, "height" : height}).insertBefore(this.clipElement)
              const frameLeft = jQuery("<div class='clip-frame left'/>").css({"width" : width, "height" : this.cHeight, "top" : height}).insertBefore(this.clipElement)
              const frameRight = jQuery("<div class='clip-frame right'/>").css({"width" : width, "height" : this.cHeight, "top" : height}).insertBefore(this.clipElement)
      },
      inCenter: function () {
              this.left = Math.round((this.oWidth - this.oClipWidth) / 2)
              this.top = Math.round((this.oHeight - this.oClipHeight) / 2)

              // oValue = this.clipElement[0].style[prefix + "Transform"],
              const nValue = tdOpen + this.left + "px," + this.top + "px" + tdClose
              this.clipElement[0].style[prefix + "Transform"] = nValue
      },
      zoomInitial: function () {
              //zoom
              this.multiple = 1
              this.zoomMin = this.options.zoomMin || 0
              this.zoomMax = this.options.zoomMax || 0
              this.zoomOutFlag = true
              this.zoomInFlag = true

              const nValue = "scale(" + this.multiple + ", " + this.multiple + ")"
              const oValue = this.clipElement[0].style[prefix + "Transform"]

              if (rScale.test(oValue)) {
                  this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rScale, nValue)
              } else {
                  this.clipElement[0].style[prefix + "Transform"] += nValue
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

              if (this.oClipWidth <= this.cWidth && this.oClipHeight <= this.cHeight) {
                      // this.zoomOutBtn.addClass("disable-state");
                      if (this.oClipWidth > this.oClipHeight) {
                              this.zoomMax = this.cHeight / this.oClipHeight
                      } else {
                              this.zoomMax = this.cWidth / this.oClipWidth
                      }
                      this.zoomMin = this.zoomMin || 1
                      return
              }

              if (this.oClipWidth > this.oClipHeight) {
                      this.zoomMin = this.cWidth / this.oClipWidth
              } else {
                      this.zoomMin = this.cHeight / this.oClipHeight
              }
              this.zoomMax = this.zoomMax || 1
      },
      repaint: function (clipElement) {
              const self = this
              this.clipElement = clipElement
              this.oClipWidth = clipElement[0].offsetWidth
              this.oClipHeight = clipElement[0].offsetHeight

              this.options.setInCenter && this.inCenter()

              this.zoomInitial()
              // console.log(this.limitDownMultiple)
              this.draggable = this.draggable ? this.draggable.repaint() :
                      Draggable({
                              element: clipElement,
                              left: this.left,
                              top: this.top,
                              noRollBack: true,
                              zoom: true,
                              zoomMin: this.zoomMin,
                              zoomMax: this.zoomMax,
                              ozoomMin: this.options.zoomMin,
                              ozoomMax: this.options.zoomMax,
                              clipImgWidth: this.options.clipImgWidth,
                              clipImgHeight: this.options.clipImgHeight,
                              onZoomEnd: function() {
                                      self.multiple = this.scale

                                      if (self.multiple < self.zoomMax) {
                                              self.zoomInFlag = true;
                                      } else if (self.multiple > self.zoomMin){
                                              self.zoomOutFlag = true
                                      }
                                      // if(this.lastScale >= self.zoomMax) {
                                      // self.zoomInBtn.addClass("disable-state");
                                      // }
                              }
                      })

      },
      toolbar: function () {
              const self = this
              const bar = jQuery("<div class='button-b button-g cliptoolbar '/>").appendTo(this.view)
              const zoomOutBtn = jQuery("<button class='clip-button button-radius'><span class='clipicon zoom-out-icon'></span></button>").appendTo(bar)
              const zoomInBtn  = jQuery("<button class='clip-button'><span class='clipicon zoom-in-icon'></span></button>").appendTo(bar)
              const confirmBtn = jQuery("<button class='clip-button button-radius'><span class='clipicon confirm-icon'></span></button>").appendTo(bar)
              // cutBtn = jQuery("<button class='clip-button button-radius'><span class='icon cut-icon'/></button>").appendTo(bar);
              this.zoomOutBtn = zoomOutBtn
              this.zoomInBtn = zoomInBtn
              this.confirmBtn = confirmBtn
              zoomOutBtn[0].onclick = function (event) {
                      event.preventDefault()
                      if (zoomOutBtn.hasClass("disable-state")) return
                      self.zoomout()
              }

              zoomInBtn[0].onclick = function (event) {
                      event.preventDefault()
                      if (zoomInBtn.hasClass("disable-state")) return
                      self.zoomin()
              }

              confirmBtn[0].onclick = function (event) {
                      event.preventDefault()
                      if (confirmBtn.hasClass("disable-state")) return
                      const matrix1 = getComputedStyle(self.clipElement[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',')
                      // var matrix2 = getComputedStyle(self.snap[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',');
                      const left = self.cLeft - matrix1[4] * 1
                      const top = self.cTop - matrix1[5] * 1
                      const width = self.cWidth
                      const height = self.cHeight

                      self.options.onConfirm && self.options.onConfirm.apply(self, [left, top, width, height, self.oClipWidth, self.oClipHeight, self.multiple])
              }
              return bar
      },
      zoomout : function() {
              this.clipElement[0].style[prefix + "TransitionDuration"] = "200ms"
              this.zoomInBtn.removeClass("disable-state")

              if (this.zoomOutFlag) {
                      this.multiple -= 0.1
                      this.zoomInFlag = true
              }
              if (this.multiple < this.options.ozoomMin) {
                      this.zoomOutFlag = false
                      this.multiple = this.options.ozoomMin
                      this.zoomOutBtn.addClass("disable-state")
              }

              this.oClipWidth = Math.round(this.clipElement[0].offsetWidth * this.multiple)
              this.oClipHeight = Math.round(this.clipElement[0].offsetHeight * this.multiple)

              if(this.multiple < this.options.ozoomMin)this.multiple = this.options.ozoomMin

              if(this.options.setInCenter) {
                      this.draggable.left = Math.round((this.oWidth - this.oClipWidth) / 2)
                      this.draggable.top = Math.round((this.oHeight - this.oClipHeight) / 2)

                      const scrollW = this.options.clipImgWidth * this.multiple
                      const scrollH = this.options.clipImgWidth * this.multiple
                      if (this.draggable.left > 0) {
                              this.draggable.left = 0
                      } else if (this.draggable.left < this.viewWidth - scrollW) {
                              this.draggable.left = this.viewWidth - scrollW
                      }
                      if (this.draggable.top > 0) {
                              this.draggable.top = 0
                      } else if (this.draggable.top < this.viewHeight - scrollH) {
                              this.draggable.top = this.viewHeight - scrollH
                      }

                      const oValue = this.clipElement[0].style[prefix + "Transform"]
                      const nValue = tdOpen + this.draggable.left + "px," + this.draggable.top + "px" + tdClose

                      this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rTranslate, nValue)
              }

              this.draggable.scale = this.multiple
              const nValue = "scale(" + this.multiple + ", " + this.multiple + ")"
              const oValue = this.clipElement[0].style[prefix + "Transform"]
              this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rScale, nValue)
              this.clipElement[0].addEventListener(_TRANSITION_END_EVENT, this, false)
      },
      zoomin: function () {
              console.log(this.options)
              this.multiple = parseFloat(this.multiple)
              this.clipElement[0].style[prefix + "TransitionDuration"] = "200ms"
              this.zoomOutBtn.removeClass("disable-state")

              if (this.zoomInFlag) {
                      this.multiple += 0.1
                      this.zoomOutFlag = true
              }
              if (this.multiple > this.zoomMax) {
                      this.zoomInFlag = false
                      this.multiple = this.zoomMax
                      this.zoomInBtn.addClass("disable-state")
              }

              this.oClipWidth = Math.round(this.clipElement[0].offsetWidth * this.multiple)
              this.oClipHeight = Math.round(this.clipElement[0].offsetHeight * this.multiple)

              if (this.multiple < this.options.ozoomMin)this.multiple = this.options.ozoomMin

              if (this.options.setInCenter) {
                      this.draggable.left = Math.round((this.oWidth - this.oClipWidth) / 2)
                      this.draggable.top = Math.round((this.oHeight - this.oClipHeight) / 2)

                      const scrollW = this.options.clipImgWidth * this.multiple
                      const scrollH = this.options.clipImgWidth * this.multiple
                      if (this.draggable.left > 0) {
                              this.draggable.left = 0
                      } else if (this.draggable.left < this.viewWidth - scrollW) {
                              this.draggable.left = this.viewWidth - scrollW
                      }
                      if (this.draggable.top > 0) {
                              this.draggable.top = 0
                      } else if (this.draggable.top < this.viewHeight - scrollH) {
                              this.draggable.top = this.viewHeight - scrollH
                      }

                      const oValue = this.clipElement[0].style[prefix + "Transform"]
                      const nValue = tdOpen + this.draggable.left + "px," + this.draggable.top + "px" + tdClose
                      this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rTranslate, nValue)
              }
              this.draggable.scale = this.multiple

              const nValue = "scale(" + this.multiple + ", " + this.multiple + ")"
              const oValue = this.clipElement[0].style[prefix + "Transform"]
              this.clipElement[0].style[prefix + "Transform"] = oValue.replace(rScale, nValue)
              this.clipElement[0].addEventListener(_TRANSITION_END_EVENT, this, false)
      },
      transitionEnd: function () {
              this.clipElement[0].removeEventListener(_TRANSITION_END_EVENT, this, false)
              this.draggable.scrollWidth = this.oClipWidth
              this.draggable.scrollHeight = this.oClipHeight
              // this.draggable.repaint();
      },
      canvasSnap: function () {
              const matrix1 = getComputedStyle(this.clipElement[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',')
              const matrix2 = getComputedStyle(this.snap[0], null)[prefix + "Transform"].replace(/[^0-9-.,]/g, '').split(',')
              const sx = ( Math.abs(matrix1[4] * 1) + matrix2[4] * 1 ) / this.multiple // 缩放x轴位置
              const sy = ( Math.abs(matrix1[5] * 1) + matrix2[5] * 1 ) / this.multiple // 缩放y轴位置
              const sWidth = this.snap[0].offsetWidth / this.multiple // 缩放后源宽度
              const sHeight = this.snap[0].offsetHeight / this.multiple // 缩放后源高度
              const dWidth = this.snap[0].offsetWidth
              const dHeight = this.snap[0].offsetHeight
              const cWidth = this.options.canvasWidth || dWidth
              const cHeight =  this.options.canvasHeight || dHeight
              this.snapshot.empty()
              const canvas = jQuery("<canvas/>").appendTo(this.snapshot)
              const ctx = canvas[0].getContext("2d")
              this.canvas = canvas[0]
              canvas[0].width = cWidth
              canvas[0].height = cHeight
              ctx.drawImage(this.clipElement[0].children[0],
                      sx, sy, sWidth, sHeight, 0, 0, cWidth, cHeight)
      },
      imageDataURL: function () {
              return this.canvas.toDataURL("image/png")
      }
}

Clip.prototype.init.prototype = Clip.prototype

export default Clip
