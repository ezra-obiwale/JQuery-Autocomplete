(function () {
	$.strToObj = function (str) {
		var obj = {},
				arr = str.replace(/[\{\}]/g, '').split(',');
		$.each(arr, function () {
			var _arr = this.split(':');
			obj[_arr[0].replace(/[\"\']/g, '').trim()] = _arr[1].replace(/[\"\']/g, '').trim();
		});
		return obj;
	};
	$.checkAutocompleteData = function (input, data) {
		var isAllowed = false;
		$.each(data, function (i, v) {
			if (v && v.toLowerCase().indexOf($(input).val().toLowerCase()) !== -1) {
				isAllowed = true;
				return false;
			}
		});
		return isAllowed;
	};
	$.loadAutocompleteData = function (input, ul, config, data) {
		var before = $(input).data('beforeListing') ?
				$(input).data('beforeListing') :
				config.beforeListing,
				list = $(input).data('list') ?
				$(input).data('list') :
				config.list
				, after = $(input).data('afterListing') ?
				$(input).data('afterListing') :
				config.afterListing;

		if (typeof before === 'string' && window[before])
			before = window[before];
		if (typeof list === 'string' && window[list])
			list = window[list];
		if (typeof after === 'string' && window[after])
			after = window[after];

		if (typeof before === 'function')
			before.call($(input), $(ul), data);
		var check = $(input).data('siftData') || config.sift_data || false;
		if (!data) {
			data = config.data;
			check = true;
		}
		$.each(data, function () {
			if (check && !$.checkAutocompleteData(input, this))
				return;
			if (typeof list === 'function')
				list.call($(input), $(ul).append('<li />').children().last(), this);
		});
		if (typeof after === 'function')
			after.call($(input), $(ul), data);
	};
	$.fn.autocomplete = function (settings) {
		var config = {
			url: '',
			ul_class: '',
			data: [],
			min_chars: 3,
			delay: 300,
			method: 'get',
			request_data: {},
			data_key: '',
			sift_data: false,
			beforeListing: function (ul, resp) {
				$(ul).html('');
			},
			list: function (li, data) {
				$.each(data, function () {
					$(li).append('<p>' + this + '</p>');
				});
			},
			afterListing: function (ul, resp) {

			}
		};
		$.extend(config, settings);
		var to = [];
		this.each(function (i) {
			$(this).prop('autocomplete', 'off');
			var _config = {};
			$.extend(_config, config);
			if ($(this).data('jqAutocomplete')) {
				var data = $(this).data('jqAutocomplete');
				$.extend(_config, typeof data === 'object' ? data : $.strToObj($(this).data('jqAutocomplete')));
			}
			to.push(undefined);
			$(this).data('aci', i).on('keyup', function () {
				clearTimeout(to[$(this).data('aci')]);
				to[$(this).data('aci')] = setTimeout(function () {
					var timeout = $(this).data('minChars') || _config.min_chars || 3;
					var $input = $(this),
							$ul = $input.closest('.auto-completing').find('ul.completing-list');
					if (!$input.val() || $input.val().length < timeout) {
						$ul.html('');
						return;
					}
					var request_data = $input.data('requestData') ? $input.data('requestData')
							: _config.request_data;
					if (_config.data.length && _config.lastRequestData == request_data) {
						$.loadAutocompleteData($input, $ul, _config);
					} else if (_config.url.length || $input.data('url')) {
						_config.lastRequestData = request_data;
						if (typeof request_data == 'string') {
							request_data += '&query=' + $(this).val().trim();
						}
						else if (typeof request_data == 'object') {
							request_data.query = $(this).val().trim();
						}
						else {
							request_data = $(this).val().trim();
						}
						$[$input.data('method') || _config.method]($input.data('url') || _config.url, request_data, function (resp) {
							var dataKey = $input.data('dataKey') || _config.data_key,
									data = dataKey ? resp[dataKey] : resp,
									check = $input.data('siftData') || _config.sift_data || false;
							if (check) {
								_config.data = data;
							}
							$.loadAutocompleteData($input, $ul, _config, data);
						}, 'json');
					}
				}.bind(this), _config.delay);
			}).wrap('<div/>').parent().addClass('auto-completing').append('<ul class="completing-list ' + ($(this).data('ulClass') || _config.ul_class) + '"/>');
		});
		return this;
	};
	$(function () {
		$('[data-jq-autocomplete]').autocomplete();
	});
})(jQuery);
