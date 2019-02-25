/* 
 * Miscellaneous OGN Javascript Functions
 */


/*
 * Signup Form
 */
jQuery(document).ready(function(e){
    function t(){
        var t=e("#ogncustom-signup-form-email").attr("value");
        var n=t.indexOf("@");
        var r=t.lastIndexOf(".");
        if(n<1||r<n+2||r+2>=t.length){
            return"invalid";
            return false}else{return"valid"}}

    e("#ogncustom-signup-form-name").keyup(function(){
        var t=e("#ogncustom-signup-form-name").val();
        if(t==null||t==""){e(".ogncustom-signup-form-name-valid").html("Please enter your name.")}
        else{e(".ogncustom-signup-form-name-valid").html("")}});
    e("#ogncustom-signup-form-email").keyup(function(){
        var n=e("#ogncustom-signup-form-email").val();var r=t(n);
        e(".ogncustom-signup-form-email-empty").html(r+" email address")});
    e("#ogncustom-signup-form-mgs").keyup(function(){
        var t=e("#ogncustom-signup-form-mgs").val();
        if(t==null||t==""){
            e(".ogncustom-signup-form-mgs-valid").html("Please write your message.")}else{
            e(".ogncustom-signup-form-mgs-valid").html("")}
        });
    e("button#ogncustom-signup-form-submit").click(function(){e(".sending").css("display","block");
        var t=e("#ogncustom-signup-form-name").val();
        var n=e("#ogncustom-signup-form-email").val();
        var r=e("#ogncustom-signup-form-mgs").val();
        if(t==null||t==""||(t.match(/[^A-Za-z0-9]/) !== null)){
            e(".ogncustom-signup-form-name-valid").html("Please enter your login name - Alphanumerics only")
        }else{
            e(".ogncustom-signup-form-name-valid").html("")}
        if(n==null||n==""){e(".ogncustom-signup-form-email-empty").html("Please enter a valid email.")
        }else{
            e(".ogncustom-signup-form-email-empty").html("")}
        if(r==null||r==""){
            e(".ogncustom-signup-form-mgs-valid").html("Please enter your message.")
        }else{
            e(".ogncustom-signup-form-mgs-valid").html("")}});
    e("#ogncustom-signup-form-allsites").click(function(){
        e("#ogncustom-signup-form-sites input[name='sites[]']").prop('checked', true);
    });
    e("#ogncustom-signup-form-nosites").click(function(){
        e("#ogncustom-signup-form-sites input[name='sites[]']").prop('checked', false);
    });    
    e("#ogncustom-signup-form-submit").click(function(){
        var n=e("#ogncustom-signup-form-name").val();
        var r=e("#ogncustom-signup-form-email").val();
        var i=e("#ogncustom-signup-form-mgs").val();
        var checked = []
        e("#ogncustom-signup-form-sites input[name='sites[]']:checked").each(function ()
        {
            checked.push(parseInt(e(this).val()));
        });
        if(!n==""&&t()=="valid"&&!i==""&&checked.length>0){
            e.ajax({type:"POST",url:ogn_params.ajaxurl,data:{action:"ogncustom_signup_form_send",name:n,email:r,mgs:i,sites:checked},success:function(t){
                    e("#ogncustom-signup-form-submit-success").html(t);
                    var n=e("#mail-sent-success").attr("success");
                    if(n==1){
                        e(".sending").hide()
                        e("#ogncustom-signup-form").hide();
                    };
                }});
        }else{           
            e("#ogncustom-signup-form-submit-success").html('<span style="color:#f00; font-weight: bold;">Error - Please fill in all fields, and make sure you have selected at least one site.</span>');            
        }
    });
})