$(document).ready(function (){
    window.addEventListener("load", function() {
        function slugify(titleStr){
            titleStr = titleStr.replace(/^\s+|\s+$/g, '');
            titleStr = titleStr.toLowerCase();
            titleStr = titleStr.replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '') 
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            return titleStr;       
        }
        (function($) {
            const cats_select = $('#id_cats');
            cats_select.focusout(function (){
                console.log('sssssss');
            })
            // var csrfToken = $("input[name=csrfmiddlewaretoken]").val();

            const cats = $('[name=cats]');
            const props = $('[name=props]');
            console.log(cats);
            cats.on('change', function (){
                console.log($(this).val());
            })
            
            $('#id_slug').attr('readonly', true)
            $('#id_title').keyup(function () {
                $('#id_slug').val(slugify($(this).val()));
            })
            $('#id_name').keyup(function () {
                $('#id_slug').val(slugify($(this).val()));
            })
        })(django.jQuery);
    });
})