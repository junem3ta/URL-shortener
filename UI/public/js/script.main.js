$(document).ready(function() {
    let submit = $($('.isb')[0].content.cloneNode(true));
    $('.url-input').closest('div').addClass('iw-custom').append(submit);
    
    function _alert() {
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
    }

    function _p(i) {
        if(i) {
            $('.process-output p em').text(i);
        } else {
            _alert();
        }
    }

    $('.s').click(
        function() {
            let _i = $('.url-input').val();
            _p(_i);
        }
    );

    $('.url-shortener').submit(
        function(){
            let _i = $('.url-input').val();
            _p(_i);
            return false;
        }
    );

    /* @Clipboard.js impl: clipboard handler */
    new ClipboardJS('.copy-url');

});