$(document).ready(function() {
    let submit = $($('.isb')[0].content.cloneNode(true)),
    _alert = () => {
        /* Exec setinterval/settimeout immediately? */
        $('.url-input').closest('div').addClass('ionull');
        setTimeout(function() {
            $('.url-input').closest('div').removeClass('ionull');
        },500);

        let pulse = setInterval(function() {
            $('.url-input').closest('div').addClass('ionull');
            setTimeout(function() {
                $('.url-input').closest('div').removeClass('ionull');
            },500);
        },1000);

        setTimeout(function() {
            clearInterval(pulse);
        },2000);
    },
     _p = (i) => {
	if(i && /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(i)) {
            $.ajax({
				url: "https://urlshortener-hd.herokuapp.com/api/shorturl/new",
				type: "POST",
				data: {
                    url: i,
                },
				beforeSend: function() {
                    $('.p-h').text('Processing...');
				},
				success: (d) => {
                    //d = $.trim(d);
                    console.log(d, d['short_url']);
                    $('.p-h').text(d['short_url']);
                    /* 
                        {"_id":"5ff56b24f2a76a2e40a0691b",
                        "longUrl":"https://devcenter.heroku.com/articles/heroku-cli",
                        "shortUrl":"http://localhost:3000/5wDO-wSwY",
                        "urlCode":"5wDO-wSwY","date":"Wed Jan 06 2021 10:47:48 GMT+0300 (East Africa Time)",
                        "__v":0}
                    */
				},
				error: (e) => {
                    console.log(JSON.stringify(e));
					$('.p-h').text(JSON.stringify(e));
				} 
			});
        } else {
            _alert();
        }
    };
    
    $('.url-input').closest('div').addClass('iw-custom').append(submit);

    $('.s').click(
        () => {
            let _i = $('.url-input').val();
            _p(_i);
        }
    );

    $('.url-shortener').submit(
        () => {
            let _i = $('.url-input').val();
            _p(_i);
            return false;
        }
    );

    /* @Clipboard.js impl: clipboard handler */
    new ClipboardJS('.copy-url');
});
