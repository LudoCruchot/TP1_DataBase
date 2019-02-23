jQuery( document ).ready( function( $ ){
    
//navigation code            
    
    function ogn_nav_doclick( ) {
        $entry = $(this).parent();
        $entry.toggleClass( 'active' );
        $entry.children( 'ul' ).slideToggle( 'fast' );
        if ($entry.hasClass('not_loaded'))
        {
            //load child elements via ajax
            jQuery.ajax({
                url:ogn_params.ajaxurl, 
                type:'get',
                data: {
                    'action': 'ogn_ajaxnav',
                    'parent': $entry.attr('post_id')
                },
                success: function (response) {
                    //append the returned menu items
                    jQuery($entry).append(response);
                    //remove the flag so we don't reload again
                    jQuery($entry).removeClass('not_loaded');
                    //prepare the new items for use
                    //add a gap before each link for the expander
                    ogn_sethandlers();
                }
            });
        }
    }
    
    function ogn_sethandlers()
    {
        //add a gap before each link for the expander
        $( 'ul.ognajaxnav li.new a' ).before('<div class="ognmenugap"></div>');
        //set expanders on anything that has children
        $( 'ul.ognajaxnav li.new.page_item_has_children > div.ognmenugap' ).addClass('ognexpander'); 
        //mark everything active (active is actually inactive.. oh, just go with the flow, man) 
        $( 'ul.ognajaxnav li.new.page_item_has_children > div.ognexpander' ).parent().addClass('active'); 
        //unmark anything active that contains uls
        $( 'ul.ognajaxnav li.new.page_item_has_children.active').each( function (index){
            if ($(this).has('ul').length > 0)
            {
                $(this).removeClass('active');
            }
        });
        //add a click function to expanders
        $( 'ul.ognajaxnav li.new.page_item_has_children > div.ognexpander' ).click( ogn_nav_doclick );
        //remove the new tag
        $( 'ul.ognajaxnav li.new').removeClass('new');
    }
    
    ogn_sethandlers();

    //announcement code

    function ognSetCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function ognGetCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function clearAllCookies() {
        var cookies = document.cookie.split(";");
        for(var i=0; i < cookies.length; i++) {
            var equals = cookies[i].indexOf("=");
            var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    cookieConsent = ognGetCookie("cookieConsent");
    cookieConsentNo = ognGetCookie("cookieConsentNo");
    if ((cookieConsent === "") && (cookieConsentNo === ""))
    {
        var cookiediv = '<div id="cookieconsent" class="cookieconsent">'+
                        '<p>This website uses cookies to provide functionality, but which are not used to track your activity. By continuing to use this site, you agree to the use of these cookies.</p>'+
                        '<p>However, <i>in addition</i> to this, you may opt into your activity being tracked in order to help us improve our service.</p>'+
                        '<p>For more information, please <a href="//opengamingnetwork.com/cookie-policy" target="_new">click here</a></p>'+
                        '<p class="cookieconsentbuttons">'+
                        '<button id="cookieconsentok" type="button">OK</button>&nbsp;'+
                        '<button id="cookieconsentno" type="button">No, thank you</button>'+ 
                        '</p>'+
                        '</div>';
        $('body').append(cookiediv);
        $('div#cookieconsent').show();
        $('#cookieconsentok').click(function () {
            var date = new Date();           
            ognSetCookie("cookieConsent", date, 7300); //twenty year expiry, this ought to be enough!
            $('div.cookieconsent').remove();            
        });           
        $('#cookieconsentno').click(function () {
            var date = new Date();                       
            ognSetCookie("cookieConsentNo", date, 7300); //twenty year expiry, this ought to be enough!
            $('div.cookieconsent').remove();
        });                   
    }

    $.ajax({
        dataType: "json",            
        url:ogn_params.ajaxurl, 
        data: {'action': 'ogn_getannouncement'},
        type:'get',
        success: function (data) {
            thisannounce = data.thisannounce;
            announcetext = data.announcement;
            lastannounce = ognGetCookie("lastannounce");
            if (thisannounce > lastannounce)
            {
                ognSetCookie("lastannounce", thisannounce, 365); //one-year expiry       
                $('div.ognannouncement').html(announcetext);
                $('div.ognannouncement').addClass('active');      
                $('div.ognannouncement').removeClass('passive');
                $('div.ognannouncement-container').addClass('active');      
                $('div.ognannouncement-container').removeClass('passive');                
                $('div.ognannouncement').attr('announceid',thisannounce);
                //add button click handlers
                $('div.ognannouncement button#ognannouncement-ok').click( function () {
                    $('div.ognannouncement').addClass('passive');        
                    $('div.ognannouncement').removeClass('active');
                    $('div.ognannouncement-container').addClass('passive');      
                    $('div.ognannouncement-container').removeClass('active');                        
                });
                $('div.ognannouncement button#ognannouncement-more').click( function () {
                    window.location.href = $(this).attr("url");
                });                
            }
        }            
    });



});