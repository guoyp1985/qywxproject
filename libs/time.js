const weekDays = [ "日", '一', '二', '三', '四', '五', '六' ]
const	mill = 1000
const TIME_HEX = {
	SECOND : 1000,
	MINUTE : 60,
	HALF_DAY : 12,
	DAY : 24
}
const TIME_UNIT = {
	SECOND : 1000,
	MINUTE : 60000,
	HOUR : 3600000,
	HALFDAY : 43200000,
	DAY : 86400000,
	WEEK : 604800000,
	MONTH : 2592000000,
	YEAR : 31536000000
}
class Time {
	constructor(isodate) {
		this._date = isodate ? new Date(isodate) : new Date()
		this._now = new Date()
	}
	time() { return this._date.getTime() }
	date() { return this._date.getDate() }
	day () { return this._date.getDay() }
	year() { return this._date.getFullYear() }
	month() { return this._date.getMonth() + 1 }
	hour () { return this._date.getHours() }
	minute() { return this._date.getMinutes() }
	second() { return this._date.getSeconds() }
	millisecond() { return this._date.getMilliseconds() }
	todayTimeBegin() { return this._now.getTime() - this._now.getHours() * TIME_UNIT.HOUR - this._now.getMinutes() * TIME_UNIT.MINUTE - this._now.getSeconds() * TIME_HEX.SECOND }
	yesterdayTimeBegin() { return this.todayTimeBegin() - TIME_UNIT.DAY }
	sevenDaysTimeBegin() { return this.todayTimeBegin() - TIME_UNIT.WEEK }
	deltaTime() { return Math.max(this._now.getTime(),this._date.getTime()) - Math.min(this._now.getTime(),this._date.getTime()) }
	format() {
		const time = this.time()
		let minute = this.minute()
		const hour = this.hour()
		const date = this.date()
		const month = this.month()
		const year = this.year()
		const yesterdayTimeBegin = this.yesterdayTimeBegin()
		const todayTimeBegin = this.todayTimeBegin()
		const deltaTime = this.deltaTime()
		minute = minute < 10 ? "0" + minute : minute
		if( time > yesterdayTimeBegin && time < todayTimeBegin ) {
			return "昨天" + hour + ":" + minute
		} else if( time < yesterdayTimeBegin ) {
			return year + "-" + month + "-" + date + " "
		}
		if( deltaTime < TIME_UNIT.MINUTE ) {
			return "刚刚"
		}
		if( deltaTime > TIME_UNIT.MINUTE && deltaTime < TIME_UNIT.HOUR ) {
			return parseInt( deltaTime / TIME_UNIT.MINUTE ) + "分钟前"
		}
		if( deltaTime > TIME_UNIT.HOUR && deltaTime < TIME_UNIT.DAY ) {
			return parseInt( deltaTime / TIME_UNIT.HOUR ) + "小时" + parseInt( deltaTime % TIME_UNIT.HOUR / TIME_UNIT.MINUTE ) + "分钟前"
		}
	}
	format1() {
		const time = this.time()
		let minute = this.minute()
		const hour = this.hour()
		const date = this.date()
		const month = this.month()
		const year = this.year()
		const yesterdayTimeBegin = this.yesterdayTimeBegin()
		const todayTimeBegin = this.todayTimeBegin()
		const deltaTime = this.deltaTime()
		minute = minute < 10 ? "0" + minute : minute
		if( time > yesterdayTimeBegin && time < todayTimeBegin ) {
			return "昨天" + hour + ":" + minute
		} else if( time < yesterdayTimeBegin ) {
			return year + "-" + month + "-" + date + " "
		}
		if( deltaTime < TIME_UNIT.MINUTE ) {
			return "刚刚"
		}
		if( deltaTime > TIME_UNIT.MINUTE && deltaTime < TIME_UNIT.HOUR ) {
			return parseInt( deltaTime / TIME_UNIT.MINUTE ) + "分钟前"
		}
		if( deltaTime > TIME_UNIT.HOUR && deltaTime < TIME_UNIT.DAY ) {
			return parseInt( deltaTime / TIME_UNIT.HOUR ) + "小时前"
		}
	}
	format2 () {
		const time = this.time()
		let minute = this.minute()
		const hour = this.hour()
		const date = this.date()
		const day = this.day()
		const month = this.month()
		const year = this.year()
		const yesterdayTimeBegin = this.yesterdayTimeBegin()
		const sevenDaysTimeBegin = this.sevenDaysTimeBegin()
		const todayTimeBegin = this.todayTimeBegin()
		// const deltaTime = this.deltaTime()
		minute = minute < 10 ? "0" + minute : minute
		if( time > yesterdayTimeBegin && time < todayTimeBegin ) {
			return "昨天" + hour + ":" + minute
		} else if ( time > sevenDaysTimeBegin && time < yesterdayTimeBegin ) {
			return "星期" + weekDays[ this.day() ] + " " + hour + ":" + minute
		} else if( time < sevenDaysTimeBegin ) {
			return year + "年" + month + "月" + date + "日 " + hour + ":" + minute
		} else {
			return hour + ":" + minute
		}
	}
	formatSimple () {
		const time = this.time()
		let minute = this.minute()
		const hour = this.hour()
		const date = this.date()
		const day = this.day()
		const month = this.month()
		const year = this.year()
		const yesterdayTimeBegin = this.yesterdayTimeBegin()
		const sevenDaysTimeBegin = this.sevenDaysTimeBegin()
		const todayTimeBegin = this.todayTimeBegin()
		// const deltaTime = this.deltaTime()
		minute = minute < 10 ? "0" + minute : minute
		if (time > todayTimeBegin) {
			return "今天"
		} else if( time > yesterdayTimeBegin && time < todayTimeBegin ) {
			return "昨天"
		} else if ( time > sevenDaysTimeBegin && time < yesterdayTimeBegin ) {
			return "星期" + weekDays[ this.day() ]
		} else if( time < sevenDaysTimeBegin ) {
			return month + "月" + date + "日 "
		} else {
			return year + "-" + month + "-" + date
		}
	}
	dateFormat (format) {
		if( this._date == "Invalid Date") return "--"
		let o = {
			"M+" : this.month(), //month
			"d+" : this.date(), //day
			"h+" : this.hour(), //hour
			"m+" : this.minute(), //minute
			"s+" : this.second(),
			"q+" : Math.floor( ( this.month() + 2 ) / 3 ), //quarter
			"S" : this.millisecond() //millisecond
		}
		if( /(y+)/.test(format) ) {
			format = format.replace( RegExp.$1, (this.year() + "" ).substr(4 - RegExp.$1.length))
		}
		for( let k in o ) {
			if( new RegExp("("+ k +")").test(format) ) {
				format = format.replace( RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00"+ o[k]).substr((""+ o[k]).length) )
			}
		}
		return format
	}
	clock(callback) {
		let self = this, deltaTime, dateStr, set
		if( ( deltaTime = Math.abs( this._now.getTime() - this._date.getTime() ) ) < TIME_UNIT.MINUTE ) { // 本地时间与服务器时间偏差太大时直接使用服务器时间
			new Time(self.time() + deltaTime)
		}
		set = function () {
			dateStr = self.month() + "月" + self.date() + "日" + "周" + weekDays[ self.day() ] + self.dateFormat("hh:mm:ss")
			new Time(self.time() + mill)
			callback.call(self, dateStr)
		}
		set()
		setInterval(set, mill)
	}
	timer(endMillSeconds) {
		let start = Math.round( this.time() * 0.001 ) * 1000, years, months, days, hours, minutes, seconds, lefts, dateStr
		if( endMillSeconds - start > 0 ) {
			// console.log(endMillSeconds - start)
			years = Math.floor( ( endMillSeconds - start ) / TIME_UNIT.YEAR )
			lefts = ( endMillSeconds - start ) % TIME_UNIT.YEAR
			months = Math.floor( lefts / TIME_UNIT.MONTH ) || Math.floor( ( endMillSeconds - start ) / TIME_UNIT.MONTH )
			lefts = ( endMillSeconds - start ) % TIME_UNIT.MONTH
			days = Math.floor ( lefts / TIME_UNIT.DAY ) || Math.floor( ( endMillSeconds - start ) / TIME_UNIT.DAY )
			lefts = ( endMillSeconds - start ) % TIME_UNIT.DAY
			hours = Math.floor( lefts / TIME_UNIT.HOUR ) || Math.floor( ( endMillSeconds - start ) / TIME_UNIT.HOUR )
			lefts = ( endMillSeconds - start ) % TIME_UNIT.HOUR
			minutes = Math.floor( lefts / TIME_UNIT.MINUTE ) || Math.floor( ( endMillSeconds - start ) / TIME_UNIT.MINUTE )
			lefts = ( endMillSeconds - start ) % TIME_UNIT.MINUTE
			seconds = Math.floor( lefts / TIME_UNIT.SECOND ) || ( endMillSeconds - start ) % TIME_UNIT.SECOND
		}
		dateStr = years ? years + "年" : ""
		dateStr += months ? months + "月" : ""
		dateStr += days ? days + "天" :  ""
		dateStr += hours ? hours + "小时" : ""
		dateStr += minutes ? minutes + "分" : ""
		dateStr += ( hours && !minutes ? minutes + "分" : "" ) + seconds + "秒"
		return dateStr
	}
	secondsCounter (startMillSeconds) {
		const diffs = new Date().getTime() - startMillSeconds
		let seconds = Math.floor( diffs / TIME_UNIT.SECOND )
		return seconds
	}
}

Time.seconds = function (seconds) {
	return seconds + "\'\'"
}

export default Time
