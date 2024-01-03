
(function($) {
    
    $.fn.loadScroll = function(duration) {
    
        var $window = $('body'),
            images = this,
            inview,
            loaded;

        images.one('loadScroll', function() {
            
            if (this.getAttribute('data-src')) {
                this.setAttribute('src',
                this.getAttribute('data-src'));
                this.removeAttribute('data-src');
                
                if (duration) {
                    
                    $(this).hide()
                           .fadeIn(duration)
                           .add('img')
                           .removeAttr('style');
                    
                } else return false;
            }
            
        });
    

        inview = images.filter(function() {
            var a = $window.scrollTop(),
                b = $window.height(),
                c = $(this).offset().top,
                d = $(this).height();
                
            return c + d >= a && c <= b - a;
        });

        loaded = inview.trigger('loadScroll');
        images = images.not(loaded);


        $window.scroll(function() {

            inview = images.filter(function() {
                
                var a = $window.scrollTop(),
                    b = $window.height(),
                    c = $(this).offset().top,
                    d = $(this).height();
                    
                return c + d >= a && c <= a + b;
                
            });
            
            loaded = inview.trigger('loadScroll');
            images = images.not(loaded);
                    
        });
    };
    
})(jQuery);