/**
* Version: 1.8.3
* Title: Eleditor 移动端富文本编辑器
* Site: https://eleditor.fixel.cn
* Author: Try
*/
// (function(w){
import jQuery from 'jquery';
import './css/base.css';

var _debug = false;
var _namespace = 'Eleditor';
var _notctname = ['INPUT', 'IMG', 'TEXTAREA'];
var _toolnames = {
	insertProduct: '插商品',
	insertText: '插文字',
	editText: '改文字',
	insertImage: '插图片',
	// insertLink: '插链接',
	insertHr: '水平线',
	// "delete": '删除',
	// deleteBefore: '删除前',
	// deleteAfter: '删除后',
	deleteThis: '删除',
	undo: '撤销',
	cancel: '取消',
};
var _editorTpl = '';
var $ = jQuery;
var w = window;
// w[_namespace] = function(){};

// if( typeof jQuery === 'undefined' && typeof Zepto === 'undefined' ){
// 	return console.warn('|--Eleditor 请引入jQuery或者Zepto！模块化环境请把依赖全局安装');
// }else if( typeof $ === 'undefined' ){
// 	var $ = typeof jQuery != 'undefined' ? jQuery : Zepto;
// }

// var _scriptPath = function(func){
// 	var _js = document.scripts;
// 	_js = _js[ _js.length - 1 ].src.substring(0, _js[ _js.length-1 ].src.lastIndexOf("/") + 1 );
// 	func(_js);
// 	return _js;
// }(function(s){
// 	var _buildLib = '<link rel="stylesheet" href="'+s+'/libs/Eleditor/layout/base.css'+(_debug ? '?v=' + (+new Date()) : '')+'">';
// 	$('head').append(_buildLib);
// });
var _inArray = function(s,a){
    for(var i in a){
        if(a[i]==s){
            return true;
        }
    }
    return false;
};
var _formatInnerText = function (t) {
      var s = t.replace(/\ +/g, "");
      s = t.replace(/[ ]/g, "");
      s = t.replace(/[\r\n]/g, "");
      return s.replace(/(^\s*)|(\s*$)/g, "");
  };
var _getLayerMaxZIndex = function(){
    var _max = Math.max.apply(null,
    　　$.map($('body *'), function(e) {
    		var _$e = $(e);
			if (_$e.css('position') != 'static')
				return parseInt(_$e.css('z-index')) || 1;
    }));
    return (_max + '').indexOf('Infinity') >= 0 ? 1 : _max + 1;
};

var _genEditorUid = function(){
	return _namespace + '' + +new Date;
};

var _correctHtmlStructure = function(){

	var _$wrap = arguments[0],
		_empty = arguments[1];


	$.each(_$wrap.find('iframe,audio,video'), function() {
		var _$this = $(this),
			_tagName = this.tagName.toLocaleLowerCase();

		if( !_$this.parent().hasClass('Eleditor-'+_tagName+'-area') ){
			$(this).wrap('<div class="Eleditor-'+_tagName+'-area"></div>');
		}
	});



	if( _formatInnerText(_$wrap.text()) == '' && _$wrap.find('img,iframe,video').length === 0 ){
		_$wrap.append(_empty);
	}

	if( _$wrap.find('*').length === 0 ){
		_$wrap.html('<p class="Eleditor-placeholder">'+_$wrap.html()+'</p>');
	}
};

var _buildEditorModule = function(_toolbars, _uid){

	var _html = '<div class="Eleditor-wrap" style="z-index:'+_getLayerMaxZIndex()+'" id="'+_uid+'">\
					<div class="Eleditor-controller">\
					<ul>';
	for (var i = 0; i < _toolbars.length; i++) {
		var _it = _toolbars[i],
			_id = typeof _it === 'object' ? _it.id : _it,
			_tag = (typeof _it === 'object' && _it.tag) ? _it.tag.toLocaleLowerCase() : null,
			_name = typeof _it === 'object' ? _it.name : _toolnames[_it];
		_html += '<li event="'+_id+'" '+(_tag ? 'bind-tags="'+_tag+'"' : '')+' class="Eleditor-'+_id+'">'+_name+'</li>';
	}
	_html += '</ul>\
				</div>\
				<div class="Eleditor-loading"><p></p></div>\
				<div class="Eleditor-textEditor">\
					<div class="Eleditor-textStyle">\
						<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bold"></div></div>\
						<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-color"><span></span></div></div>\
						<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-linedecoration"></div></div>\
						<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bgColor"></div></div>\
						<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-fontSize"></div></div>\
						<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-lineHeight"></div></div>\
						<div class="Eleditor-textStyle-item">\
							<div class="Eleditor-textStyle-align Eleditor-textStyle-alignLeft" align="left"></div>\
						</div>\
						<div class="Eleditor-textStyle-item">\
							<div class="Eleditor-textStyle-align Eleditor-textStyle-alignCenter" align="center">\
							</div>\
						</div>\
						<div class="Eleditor-textStyle-item">\
							<div class="Eleditor-textStyle-align Eleditor-textStyle-alignRight" align="right">\
							</div>\
						</div>\
						<div class="Eleditor-textStyle-item Eleditor-textStyle-item-upImg">\
							<div class="Eleditor-textStyle-upImg"></div>\
						</div>\
					</div>\
					<div class="Eleditor-textEditor-colors">\
						<div class="Eleditor-textEditor-modulePane"><span></span></div>\
						<ul>\
							<li><span style="background-color:#232323;"></span></li>\
							<li><span style="background-color:#2196F3;"></span></li>\
							<li><span style="background-color:#795548;"></span></li>\
							<li><span style="background-color:#00BCD4;"></span></li>\
							<li><span style="background-color:#4CAF50;"></span></li>\
							<li><span style="background-color:#E666E5;"></span></li>\
							<li><span style="background-color:#FF9800;"></span></li>\
							<li><span style="background-color:#FF5722;"></span></li>\
							<li><span style="background-color:#ff2a1a;"></span></li>\
							<li><span style="background-color:#FFEB3B;"></span></li>\
							<li><span style="background-color:#ffffff;border: 1px solid #ccc;"></span></li>\
							<li>\
								<span class="Eleditor-inheritValue" style="background-color:transparent; border: 1px solid #dedede;">\
								</span>\
							</li>\
						</ul>\
					</div>\
					<div class="Eleditor-textEditor-fontsizes">\
						<div class="Eleditor-textEditor-modulePane"><span>字体大小</span></div>\
						<ul>\
							<li class="Eleditor-inheritValue">默认</li>\
							<li>14px</li>\
							<li>16px</li>\
							<li>20px</li>\
							<li>28px</li>\
							<li>35px</li>\
						</ul>\
					</div>\
					<div class="Eleditor-textEditor-lineheight">\
						<div class="Eleditor-textEditor-modulePane"><span>行高</span></div>\
						<ul>\
							<li class="Eleditor-inheritValue">默认</li>\
							<li>20px</li>\
							<li>25px</li>\
							<li>30px</li>\
							<li>35px</li>\
							<li>40px</li>\
						</ul>\
					</div>\
					<div class="Eleditor-textEditor-linedecorations">\
						<div class="Eleditor-textEditor-modulePane"><span>文本修饰</span></div>\
						<ul>\
							<li class="Eleditor-inheritValue">无</li>\
							<li style="text-decoration: overline">上划线修饰</li>\
							<li style="text-decoration: line-through">删除线修饰</li>\
							<li style="text-decoration: underline">下划线修饰</li>\
						</ul>\
					</div>\
					<div class="Eleditor-textEditor-formats formats-area">\
						<div class="Eleditor-textEditor-format">格式刷</div>\
						<div class="Eleditor-textEditor-clean">清空</div>\
					</div>\
					<div class="Eleditor-textEditor-formats btn-area">\
						<div class="Eleditor-cancel"><text class="font12 color-gray">取消</text></div>\
						<div class="Eleditor-commit"><text class="font12 color-green">保存</text></div>\
					</div>\
					<div class="Eleditor-inputarea">\
						<input placeholder="请输入超链接" type="text" />\
						<div placeholder="点击输入内容" class="textarea needsclick" contenteditable="true"></div>\
					</div>\
				</div>\
				<div class="Eleditor-delete-layer">\
					<div class="Eleditor-delete-tip">进入批量删除模式，点击段落进行删除</div>\
					<div class="Eleditor-delete-revoke"></div>\
					<div class="Eleditor-delete-clear"></div>\
					<div class="Eleditor-delete-back">返回继续编辑</div>\
				</div>\
			</div>';
			// <div class="Eleditor-method">\
			// 	<button class="Eleditor-cancel color-white" style="background-color:#c5c5c5;">取消</button>\
			// 	<button class="Eleditor-commit bg-green color-white">提交</button>\
			// </div>\
	return _html;
};

var Eleditor = function(){

	console.log('|--Eleditor Initing');

	var _args = arguments[0];
	_args.upload = _args.upload || {};
	_args.toolbars = _args.toolbars || [];

		// _undolen = isNaN(_args._undolen) ? 10 : _args._undolen;
	var	_editorUid = _genEditorUid(),
			_historys = [],
			_placeHolder = _args.placeHolder || '<p class="Eleditor-placeholder">点击此处编辑内容</p>',
			_uploadRole = null;

	if( _args.toolbars.length === 0 ){
		_args.toolbars = [
			'insertProduct',
			'insertText',
			'editText',
			'insertImage',
			// 'insertLink',
			'insertHr',
			//'delete',
			//'deleteBefore',
			//'deleteAfter',
			'deleteThis',
			'undo',
			'cancel'
		];
	}
	if( _args.el instanceof jQuery ){
		var _$wrap = _args.el;
	}else{
		var _$wrap = $(_args.el);

		if( _$wrap.length === 0 ){
			return console.warn('|--Eleditor '+_args.el+'元素不存在，请在DOMContentLoaded后初始化Eleditor');
		}else if( _$wrap.length != 1 ){
			var _$wrap = $(_$wrap[0]);
		}

	}

	if( _$wrap.attr('Eleditor-Inited') === 'true' ){
		return console.warn('|--Eleditor '+_args.el+'已经绑定了Eleditor');
	}

	_$wrap.attr({'Eleditor-Inited': 'true', 'Eleditor-Uid': _editorUid});

	_correctHtmlStructure(_$wrap, _placeHolder);

	/*insert editor*/
	var _lastScrollH = null;
	var _$window = $(w);
	var _$scrollWrap = $('html,body');
	var _$editorWrap = $(_buildEditorModule(_args.toolbars, _editorUid));
	var _$editorController = _$editorWrap.find('.Eleditor-controller');
	var _$editorLoadingMask = _$editorWrap.find('.Eleditor-loading');
	var _$editorTextModule = _$editorWrap.find('.Eleditor-textEditor');
	var _$editorTextArea = _$editorTextModule.find(".Eleditor-inputarea .textarea");
	var _$editorUploadImageBtn = _$editorController.find(".Eleditor-insertImage");
	var _$editorBarUploadImageBtn = _$editorTextModule.find('.Eleditor-textStyle-item-upImg');
	var _$editorTextLinkArea = _$editorTextModule.find(".Eleditor-inputarea input");
	var _$editorColorModule = _$editorTextModule.find(".Eleditor-textEditor-colors");
	var _$editorFontsizeModule = _$editorTextModule.find(".Eleditor-textEditor-fontsizes");
	var _$editorUndoBtn = _$editorWrap.find(".Eleditor-undo");
	var _$editorLineheightModule = _$editorTextModule.find(".Eleditor-textEditor-lineheight");
	var _$editorLinedecorationsModule = _$editorTextModule.find(".Eleditor-textEditor-linedecorations");
	var _$editorDeleteLayer = _$editorWrap.find(".Eleditor-delete-layer");

	_$wrap.addClass('Eleditor-area');
	_$wrap.after(_$editorWrap);

	console.log('|--Eleditor Mounted To', _$wrap);

	/*bindEvent*/
	var _$selected = null,
		_imageUploader = null;

	var _showEditorControllerLayer = function(_$e){
		_$selected = _$e;
		_$e.addClass('Eleditor-active');

		var _calTop = _$e.offset().top + _$e.outerHeight();

		$.each(_$editorController.find('li'), function(i, e){
			var _$e = $(e),
				_tgs = _$e.attr('bind-tags');
			if( _tgs ){
				_tgs = _tgs.toLocaleLowerCase().split(',');
				if( _inArray(_$selected[0].tagName.toLocaleLowerCase(), _tgs) ){
					_$e.show();
				}else{
					_$e.hide();
				}
			}
		});

		_$editorController.show();
		_flushEditorControllerLayerPosi();

		if( typeof _$scrollWrap.animate === 'function' ){
			_$scrollWrap.stop().animate({scrollTop: (_calTop - 150) + 'px'}, 500);
		}else{
			_$scrollWrap.scrollTop((_calTop - 150) + 'px');
		}

		_imageUploader && _imageUploader.refresh();
	};

	var _flushEditorControllerLayerPosi = function(){
			if( _$selected ){
				_$editorController.css({
					top: _$selected[0].offsetTop + _$selected[0].offsetHeight,
					width: _$wrap.width() - 5
				});
				/*
				_$editorController.css({
					top: _$selected.offset().top + _$selected.outerHeight(),
					width: _$wrap.width() - 5
				});
				*/
			}
		},
		_hideEditorControllerLayer = function(){

			_$wrap.find('.Eleditor-active').removeClass('Eleditor-active');
			_$editorController.hide();
			_$selected = null;
		};

	var _showEditorDeleteLayer = function(){

			_flushEditorDeleteLayerHistoryBtn();

			_$wrap.addClass('Eleditor-deleteMode');
			_$editorDeleteLayer.show();
		},
		_flushEditorDeleteLayerHistoryBtn = function(){

			if( _historys.length > 0 ){
				_$editorWrap.find('.Eleditor-delete-revoke').removeClass('Eleditor-delete-revoke-disabled')
			}else{
				_$editorWrap.find('.Eleditor-delete-revoke').addClass('Eleditor-delete-revoke-disabled')
			}
		},
		_hideEditorDeleteLayer = function(){
			_$wrap.removeClass('Eleditor-deleteMode');
			_$editorDeleteLayer.hide();
		};

	var _showEditorWrapMask = function(){
			_$editorController.hide();
			_$editorWrap.addClass('Eleditor-mask');
			_lastScrollH = _$window.scrollTop();
			_$scrollWrap.addClass('Eleditor-scrollLocked');
		},
		_hideEditorWrapMask = function(){
			_$editorWrap.removeClass('Eleditor-mask');
			_$scrollWrap.removeClass('Eleditor-scrollLocked');
			_$window.scrollTop(_lastScrollH);
		};

	var _showLoadingMask = function(){
			_showEditorWrapMask();
			_$editorLoadingMask.show();
			_$editorLoadingMask.html('<p>'+arguments[0]+'</p>')
		},
		_hideLoadingMask = function(){
			_hideEditorWrapMask();
			_$editorLoadingMask.hide();
		};

	var _appendHistory = function(){

			_historys.push( _$wrap.html() );

			// if( _historys.length > _undolen ){
			// 	_historys.splice(0, 1)
			// }

			_flushHistoryBtn();
			_flushEditorDeleteLayerHistoryBtn();
			return true;
		},
		_revokeEdit = function(){

			if( _historys.length === 0 ){
				return;
			}

			_$wrap.html(_historys.pop());

			_flushHistoryBtn();
			_flushEditorDeleteLayerHistoryBtn();
			_hideEditorControllerLayer();
		},
		_flushHistoryBtn = function(){

			if( _historys.length == 0 ){
				_$editorUndoBtn.hide();
			}else{
				_$editorUndoBtn.show();
			}

		};

	var _syncRenderTextEditorView = function(){
		_$editorTextModule.attr('role', 'edit').show();
		// let node = _$editorTextArea;
		// let str = _$scrollWrap.eq(0).attr('class');
		// while (node[0]) {
		// 	str += node.attr('class') + '::::' + node.attr('style') + '<br/>';
		// 	node = node.parent();
		// }
		// _$editorTextArea.html(str)
		_$editorTextArea.html( _$selected.hasClass('Eleditor-placeholder') ? '' : _$selected.html() );
		_$editorTextArea.attr('style', _$selected.attr('style'));
		// _$editorTextArea.css({'width': '100%', 'height': '100%'});
		if( _$selected.css('font-weight') == 'bold' ){
			_$editorTextModule.find('.Eleditor-textStyle-bold').addClass('Eleditor-active');
		}

		if( _inArray(_$selected.css('text-decoration'), ['overline', 'line-through', 'underline']) ){
			_$editorTextModule.find('.Eleditor-textStyle-linedecoration').addClass('Eleditor-active');
		}
		if( _$selected[0].tagName == 'A' ){
			_$editorTextModule.attr('type', 'link');
			_$editorTextLinkArea.val(_$selected.attr('href'));
		}else{
			_$editorTextModule.attr('type', 'word');
		}

		var _selectAlign = _$selected.css('text-align');
		if( _inArray(_selectAlign, ['left', 'center', 'right']) ){
			_$editorTextModule.find('.Eleditor-textStyle-align[align='+_selectAlign+']').addClass('Eleditor-active');
		}else{
			_$editorTextModule.find('.Eleditor-textStyle-align').removeClass('Eleditor-active');
		}
		_$editorTextModule.find('.Eleditor-textStyle-color span').css('background-color', _$selected.css('color'));
	};

	if( typeof WebUploader != 'undefined' && typeof _args.uploader != 'function' ){

		//controller
		_imageUploader = WebUploader.create({
						auto: true, server: _args.upload.server || '/upload',
					    pick: _$editorUploadImageBtn, duplicate: true, resize: false,
					    fileSingleSizeLimit: _args.upload.fileSizeLimit ? _args.upload.fileSizeLimit*1024*1024 : undefined,
					    accept: Object.assign({
					    				title: 'Images',
					    				extensions: 'gif,jpg,jpeg,bmp,png,webp',
										mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png,image/webp'
									}, _args.upload.accept || {}),
					    fileVal: _args.upload.formName,
					});
		_imageUploader.on( 'uploadStart', function( _file, _percentage ) {
		    _showLoadingMask('上传图片中<span id="uploadProgress">1</span>%');
		});
		_imageUploader.on( 'uploadProgress', function( _file, _percentage ) {
		    $('#uploadProgress').html( parseFloat((_percentage * 100).toFixed(2)) );
		});
		// _uploadRole
		_imageUploader.on( 'error', function() {
		    if( arguments[0]=="Q_TYPE_DENIED" ) w.alert("请上传图片格式文件");
	        if( arguments[0]=="F_EXCEED_SIZE" ) w.alert("文件大小不能超过"+(arguments[1] / 1048576)+"M");
		});
		_imageUploader.on( 'uploadComplete', function() { _hideLoadingMask(); });
		_imageUploader.on( 'uploadSuccess', function( _file, _call ) {

			var _hasStyleBarBtn = $('#rt_'+_file.source.ruid).parents('.Eleditor-textStyle-item-upImg').length > 0;

		    if( _call.status == 1 ){

				if( _hasStyleBarBtn ){
					_$editorTextArea.append('<img src="'+_call.url+'">');
				}else{
			    	_appendHistory();

					_$selected.after( $('<img src="'+_call.url+'">') );

					if( _$selected.hasClass('Eleditor-placeholder') ){
						_$selected.remove();
					}
				}
		    }else{
		    	w.alert('上传失败：['+_call.msg+']');
		    }
		    if( !_hasStyleBarBtn ){
		    	_hideEditorControllerLayer();
		    }
		});

		_imageUploader.addButton({ id: _$editorBarUploadImageBtn });
		_$editorBarUploadImageBtn.addClass('Eleditor-webUploader-btn');

	}else if( typeof _args.uploader == 'function' ){

		var _uploaderHanlder = function(){

			var _hasStyleBarBtn = $(this).hasClass('Eleditor-textStyle-item-upImg');

			try{
				_args.uploader.call(this).then(function(_url){

					if( _hasStyleBarBtn ){
						_$editorTextArea.append('<img src="'+_url+'">');
					}else{
				    	_appendHistory();

						_$selected.after( $('<img src="'+_url+'">') );

						if( _$selected.hasClass('Eleditor-placeholder') ){
							_$selected.remove();
						}
					}

				}, function(_err){
					w.alert('上传失败：['+_err+']');
				});
			}catch(_e){
				console.warn(_e);
				console.warn('|--Eleditor 请检查uploader函数返回是否是标准Promise对象！');
			}

		}

		_$editorUploadImageBtn.click(_uploaderHanlder);
		_$editorBarUploadImageBtn.click(_uploaderHanlder);

	}else{
		_$editorBarUploadImageBtn.addClass('Eleditor-textStyle-item-upImg-disabled')
	}

	var _editorModuleEvents = {
    insertProduct: function(){
        _args.insertProductCallback && _args.insertProductCallback(function(data){
					//必须为div标签，其它标签会被拆分
					var disprice = data.price
					if (data.showprice && data.showprice != '') {
						disprice = data.showprice
					}
		      var rethtml = '<div linkurl="/product?id='+data.id+'&wid='+data.uploader+'" class="insertproduct db"><img class="v_middle imgcover" src="'+data.photo+'" /><div class="iteminfo">￥'+disprice+' | 查看详情</div></div>'
					//var rethtml = '<router-link to="/product?id='+data.id+'&wid='+data.uploader+'" class="insertproduct db"><img class="v_middle imgcover" src="'+data.photo+'" /><div class="iteminfo">￥'+data.price+' | 查看详情</div></router-link>'
						var _buildWordHtml = '';
            var _buildWordHtml = $(rethtml);

            _$selected.after(_buildWordHtml);
            _flushEditorControllerLayerPosi();
            _appendHistory({ m: 'insertNode', node: _buildWordHtml });

            _$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
            _$editorTextModule.find('.Eleditor-textStyle-color span').removeAttr('style');
            _$editorTextArea.removeAttr('style').html('');
            _$editorTextLinkArea.val('');
            _hideEditorWrapMask();
            _$editorTextModule.hide();
            _hideEditorControllerLayer();
						_args.clickInsertProduct && _args.clickInsertProduct(_buildWordHtml[0],data)
        });
    },
		insertText: function(){
			_showEditorWrapMask();
			_$editorTextModule.attr({'role': 'insert', 'type': 'word'}).show();
		},
		insertLink: function(){
			_showEditorWrapMask();
			_$editorTextModule.attr({'role': 'insert', 'type': 'link'}).show();
		},
		insertImage: function(){
			/*
			if( typeof WebUploader === 'undefined' && typeof _args.uploader != 'function' ){
				window.alert('上传参数未定义.');
			}
			*/
			_args.insertImageCallback && _args.insertImageCallback(function(returl){
				console.log('in insertimg callback')
				_appendHistory();
        // _appendHistory({ m: 'insertNode', node: _buildWordHtml });
        var _buildWordHtml = $('<img src="'+returl+'" style="display:block;margin:2px auto;" />');
        _$selected && _$selected.after(_buildWordHtml);
        _flushEditorControllerLayerPosi();

        _$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
        _$editorTextModule.find('.Eleditor-textStyle-color span').removeAttr('style');
        _$editorTextArea.removeAttr('style').html('');
        _$editorTextLinkArea.val('');
        _hideEditorWrapMask();
        _$editorTextModule.hide();
        _hideEditorControllerLayer();
      });
		},
		insertHr: function(){
			_appendHistory();

			var _$hr = $('<div class="horizontal-line" style="padding: 10px 0;border-bottom: 1px solid #aaa;margin-bottom: 20px;"></div>');
				_$selected.after(_$hr);

			_hideEditorControllerLayer();
			_args.cancelControler && _args.cancelControler();
			_args.changeTxt && _args.changeTxt();
		},
		editText: function(){
			if( _inArray(_$selected[0].tagName, _notctname) ){
				return this.insertText();
			}
			_showEditorWrapMask();
			_syncRenderTextEditorView();
		},
		"delete": function(){

			if( _$wrap.find('*').length == 1 ){
				_appendHistory();
				_$selected.remove();
			}else{
				_showEditorDeleteLayer();
			}
			_hideEditorControllerLayer();
			_correctHtmlStructure(_$wrap, _placeHolder);
			_args.cancelControler && _args.cancelControler();
			_args.changeTxt && _args.changeTxt();
		},
    deleteThis: function(){
            _appendHistory({ m: 'deleteNode', node: _$selected, pnode: _$selected.prev() });
            _$selected.remove();
            //editnews();
            _hideEditorControllerLayer();
            _correctHtmlStructure(_$wrap, _placeHolder);
						_args.cancelControler && _args.cancelControler();
						_args.changeTxt && _args.changeTxt();
    },
    deleteBefore: function(){
            var _$prev = _$selected.prev();
            _appendHistory({ m: 'deleteBeforeNode', node: _$selected, bnode: _$selected.prevAll() });
            var _$prev_prev;
            while (_$prev.length > 0) {
                    _$prev_prev = _$prev.prev();
                    _$prev.remove();
                    _$prev = _$prev_prev
            }
            var _$parent = _$selected.parent();
            while (_$parent.length > 0 && !_$parent.hasClass("Eleditor-area")) {
                    _$prev = _$parent.prev();
                    while (_$prev.length > 0) {
                            _$prev_prev = _$prev.prev();
                            _$prev.remove();
                            _$prev = _$prev_prev
                    }
                    _$parent = _$parent.parent()
            }
            //editnews();
            _hideEditorControllerLayer();
            _correctHtmlStructure(_$wrap, _placeHolder);
						_args.cancelControler && _args.cancelControler();
    },
    deleteAfter: function(){
            var _$next = _$selected.next();
            _appendHistory({ m: 'deleteAfterNode', node: _$selected, anode: _$selected.nextAll() });
            var _$next_next;
            while (_$next.length > 0) {
                    _$next_next = _$next.next();
                    _$next.remove();
                    _$next = _$next_next
            }
            var _$parent = _$selected.parent();
            while (_$parent.length > 0 && !_$parent.hasClass("Eleditor-area")) {
                    _$next = _$parent.next();
                    while (_$next.length > 0) {
                            _$next_next = _$next.next();
                            _$next.remove();
                            _$next = _$next_next
                    }
                    _$parent = _$parent.parent()
            }
            //editnews();
            _hideEditorControllerLayer();
            _correctHtmlStructure(_$wrap, _placeHolder);
						_args.cancelControler && _args.cancelControler();
    },
		undo: function(){
			_revokeEdit();
			_args.cancelControler && _args.cancelControler();
		},
		cancel: function(){
			_hideEditorControllerLayer();
			_args.cancelControler && _args.cancelControler();
		}
	};

	for (var i = 0; i < _args.toolbars.length; i++) {
		if( typeof _args.toolbars[i] === 'object' ){
			_editorModuleEvents[_args.toolbars[i].id] = _args.toolbars[i].handle;
		}
	};

	/*text area click*/
	_$window.on('resize', function(){
		_flushEditorControllerLayerPosi();
	});

	_$editorTextArea.on('blur', function(){
		document.body.scrollTop = 0;
	})

	_$editorController.on('click', 'ul li', function() {
		var _$this = $(this),
			_event = _$this.attr('event');
		if( typeof _editorModuleEvents[_event] === 'function' ){
			if( typeof _toolnames[_event] != 'undefined' ){
				_editorModuleEvents[_event]();
			}else{
				_editorModuleEvents[_event](_$selected, _$this) !== false && _editorModuleEvents.cancel();
			}
		}
	});

	_$editorWrap.on('click', '.Eleditor-delete-revoke', function() {
		_revokeEdit();
	});
	_$editorDeleteLayer.on('click', '.Eleditor-delete-clear', function() {

		if( !confirm('确定清空内容吗？') ){
			return;
		}

		var _$cloneNode = _$wrap.clone();
			_$cloneNode.find('.Eleditor-placeholder').remove();

		if( _formatInnerText(_$cloneNode.text()) != '' ){
			_appendHistory();
			_$wrap.html('');
			_correctHtmlStructure(_$wrap, _placeHolder);
		}
	});
	_$editorDeleteLayer.on('click', '.Eleditor-delete-back', function() {
		_hideEditorDeleteLayer();
	});

	/*textEditor*/
	_$editorTextModule.on('click', '.Eleditor-textStyle-bold', function() {
		_$editorTextArea.css("font-weight", $(this).hasClass("Eleditor-active") ? "normal" : "bold");
          $(this).toggleClass("Eleditor-active");
	});
	_$editorTextModule.on('click', '.Eleditor-textStyle-linedecoration', function() {
		_$editorLinedecorationsModule.show();
		$(this).addClass('Eleditor-active');
	});
	_$editorTextModule.on('click', '.Eleditor-textStyle-color,.Eleditor-textStyle-bgColor', function() {
		var _$this = $(this);
		var _role = _$this.hasClass('Eleditor-textStyle-bgColor') ? 'bgcolor' : 'color';
		_$editorColorModule.find('.Eleditor-textEditor-modulePane span').html(_role == 'bgcolor' ? '文字背景颜色' : '文字颜色');
		_$editorColorModule.attr('role', _role).show();
		$(this).addClass('Eleditor-active');
	});
	_$editorTextModule.on('click', '.Eleditor-textStyle-fontSize', function() {
		_$editorFontsizeModule.show();
		$(this).addClass('Eleditor-active');
	});
	_$editorTextModule.on('click', '.Eleditor-textStyle-lineHeight', function() {
		_$editorLineheightModule.show();
		$(this).addClass('Eleditor-active');
	});
	_$editorLinedecorationsModule.on('click', 'ul li', function() {
		if( !$(this).hasClass('Eleditor-inheritValue') ){
			_$editorTextArea.css("text-decoration", $(this).css('text-decoration'));
		}else{
			_$editorTextArea.css("text-decoration", 'inherit');
			_$editorTextModule.find('.Eleditor-textStyle-linedecoration').removeClass('Eleditor-active');
		}
		_$editorLinedecorationsModule.hide();
	});
	_$editorLineheightModule.on('click', 'ul li', function() {
		if( !$(this).hasClass('Eleditor-inheritValue') ){
			_$editorTextArea.css("line-height", $(this).html());
		}else{
			_$editorTextArea.css("line-height", 'inherit');
			_$editorTextModule.find('.Eleditor-textStyle-lineHeight').removeClass('Eleditor-active');
		}
		_$editorLineheightModule.hide();
	});
	_$editorFontsizeModule.on('click', 'ul li', function() {
		if( !$(this).hasClass('Eleditor-inheritValue') ){
			_$editorTextArea.css("font-size", $(this).html());
		}else{
			_$editorTextArea.css("font-size", 'inherit');
			_$editorTextModule.find('.Eleditor-textStyle-fontSize').removeClass('Eleditor-active');
		}
		_$editorFontsizeModule.hide();
	});

	_$editorTextModule.on('click', ".Eleditor-textStyle-align", function() {
		var _align = $(this).attr('align');
		_$editorTextArea.css({"text-align": _align, "display": 'block'});
		_$editorTextModule.find(".Eleditor-textStyle-align.Eleditor-active").removeClass('Eleditor-active');
		$(this).addClass('Eleditor-active');
	});

	_$editorTextModule.on('click', ".Eleditor-textEditor-format", function() {
		var _$cloneTextArea = _$editorTextArea,
			_removeAttrs = 'style width height border bgcolor align color';

		_$cloneTextArea.removeAttr(_removeAttrs);
		$.each(_$cloneTextArea.find('*'), function(_i, _e) {
			var _$eachElm = _$cloneTextArea.find(_e);
			if( _inArray(_e.tagName.toLocaleLowerCase(), ['script', 'style']) ){
				_$eachElm.remove();
			}else{
				_$eachElm.removeAttr(_removeAttrs);
			}
		});

		_$editorTextArea.html(_$cloneTextArea.html());
		_$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
	});

	_$editorTextModule.on('click', ".Eleditor-textEditor-clean", function() {
		confirm('确定清空内容（不可恢复）？') && _$editorTextArea.html("");
	});

	_$editorTextModule.on('click', ".Eleditor-cancel,.Eleditor-commit", function() {

		arguments[0].preventDefault();

		if( $(this).hasClass('Eleditor-commit') ){
			var _style = _$editorTextArea.attr('style') || '';
			var _content = _$editorTextArea.html();
			var _editAct = _$editorTextModule.attr('role') == 'edit';
			var _hasPlaceHolder = _$selected.hasClass('Eleditor-placeholder');

			if( !_content ){
				return alert('请输入内容文字');
			}

			_appendHistory();

			if( _editAct || (_hasPlaceHolder && _$editorTextModule.attr('type') != 'link') ){
				if( _$editorTextModule.attr('type') == 'link' ){
					_$selected.attr('href', _$editorTextLinkArea.val());
				}
				_$selected.attr('style', _style).removeClass('Eleditor-placeholder').html( _content );
			}else{

				var _buildWordHtml = '';
				if( _$editorTextModule.attr('type') == 'link' ){
					var _link = _$editorTextLinkArea.val();
					_buildWordHtml = '<a style="'+_style+'" href="'+_link+'">'+_content+'</a>';
				}else{
					_buildWordHtml = '<p style="'+_style+'">'+_content+"</p>";
				}
				_$selected.after( $(_buildWordHtml) );

				if( _hasPlaceHolder ){
					_$selected.remove();
				}
			}
			_args.changeTxt && _args.changeTxt(_content);
			_flushEditorControllerLayerPosi();
		}

		_$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
		_$editorTextModule.find('.Eleditor-textStyle-color span').removeAttr('style');
		_$editorTextArea.removeAttr('style').html('');
		_$editorTextLinkArea.val('');
		_hideEditorWrapMask();
		_$editorTextModule.hide();
		_hideEditorControllerLayer();
		_args.cancelControler && _args.cancelControler();
	});

	_$editorColorModule.on('click', 'ul li span', function() {
		var _color = $(this).css('background-color');
		if( _$editorColorModule.attr('role') == 'color' ){
			if( !$(this).hasClass('Eleditor-inheritValue') ){
				_$editorTextArea.css("color", _color);
				_$editorTextModule.find('.Eleditor-textStyle-color span').css("background-color", _color);
			}else{
				_$editorTextArea.css("color", 'inherit');
				_$editorTextModule.find('.Eleditor-textStyle-color').removeClass('Eleditor-active').find('span').removeAttr('style');
			}
		}else{
			if( !$(this).hasClass('Eleditor-inheritValue') ){
				_$editorTextArea.css("background-color", _color);
			}else{
				_$editorTextArea.css("background-color", 'inherit');
				_$editorTextModule.find('.Eleditor-textStyle-bgColor').removeClass('Eleditor-active');
			}
		}
		_$editorColorModule.hide();
	});

	/*controller*/
      _$wrap.on('click', '*', function(_e) {

		var _$this = $(this);

		if( _$wrap.hasClass('Eleditor-deleteMode') ){

			if( !_$this.hasClass('Eleditor-placeholder') ){

				_appendHistory();

				if( typeof _$this.fadeOut === 'function' ){
					_$this.fadeOut('fast', function(){
						_$this.remove();
						_correctHtmlStructure(_$wrap, _placeHolder);
					});
				}else{
					_$this.remove();
					_correctHtmlStructure(_$wrap, _placeHolder);
				}
			}

		}else if( !_$this.hasClass('Eleditor-active') ){
          	_hideEditorControllerLayer();
          	_hideEditorDeleteLayer();
          	_showEditorControllerLayer(_$this);
						_args.buildControler && _args.buildControler();
		}

          return _e.preventDefault() == 0;
      });


	return {
		clear: function(){
			_$wrap.html('');
			_correctHtmlStructure(_$wrap, _placeHolder);
		},
		revoke: function(){
			_revokeEdit();
		},
		append: function(){

			_hideEditorControllerLayer();

			var _object = arguments[0];

			if( !_object ){
				return;
			}

			var _$content = $(_object);

			if( typeof _object == 'string' && _$content.length == 0 ){
				_$content = $('<p>'+_object+'</p>');
			}

			if( _formatInnerText(_$content.text()) == '' ){
				return;
			}

			_$wrap.find('.Eleditor-placeholder').remove();
			_appendHistory();

			return _$wrap.append(_$content);
		},
		trigger: function(){

			var _event = arguments[0];

			if( _event == 'insertText' ){
				_$selected = _$wrap.find('>:last');
				_editorModuleEvents.insertText();
			}else if( _event == 'insertLink' ){
				_$selected = _$wrap.find('>:last');
				_editorModuleEvents.insertLink();
			}
		},
		saveState: function(){
			return _appendHistory();
		},
		getEditNode: function(){
			return _$selected;
		},
		getContent: function(){
			var _$cloneNode = _$wrap.clone();
				_$cloneNode.find('.Eleditor-placeholder').remove();

			return _formatInnerText(_$cloneNode.html());
		},
		getContentText: function(){
			var _$cloneNode = _$wrap.clone();
				_$cloneNode.find('.Eleditor-placeholder').remove();

			return _formatInnerText(_$cloneNode.text());
		},
		destory: function(){
			_$wrap.removeAttr('Eleditor-Inited Eleditor-Uid');
			_$wrap.removeClass('Eleditor-area');
			_$wrap.find('.Eleditor-placeholder').remove()
			_$wrap.off().find('.Eleditor-active').removeClass('Eleditor-active');
			_$editorWrap.find('*').off();
			_$editorWrap.remove();
			console.log('|--Eleditor '+_editorUid+' destoryed');
		}

	}
}

export default Eleditor
// })(window);
