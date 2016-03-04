'use strict';

var FIGROLL_URL = 'https://app.figroll.io:2113/auth/register';

var signupForms = [
    $('#submitSignUpForm1'),
    $('#submitSignUpForm2')
];

signupForms.forEach(function( $form ) {
     $form.submit(function(evt, formData) {
        evt.preventDefault();
        var formData = {
            firstName: '?',
            lastName: '?',
            email:  $form.find("input[type=email]").val(),
            password:  $form.find("input[type=password]").val()
        };

        if (formData.email === "" && formData.password === "") {
            $form.find(".alert-info").addClass("alert--active");
            setTimeout(function() {
                $form.find(".alert-info").removeClass("alert--active");
            },3000);
        } else {
            $.ajax({
                type: 'POST',
                url: FIGROLL_URL,
                data: JSON.stringify(formData),
                contentType : 'application/json',
                dataType: 'json',
                success: function(data) {
                    $form.find(".alert-success").addClass("alert--active");
                    $form.find("input[type=email], input[type=password]").val("");
                },
                error: function(data) {
                    $form.find(".alert-danger").addClass("alert--active");
                    setTimeout(function() {
                        $form.find(".alert-danger").removeClass("alert--active");
                    },3000);
                }
            });
        }


        return false;
    });
})
