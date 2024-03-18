console.log("Signup frontend javascript file");
/* class bolsa (".class") ID ("#memberid") HTML ("p")("button") */
 /*    $(function(){
        $(".member-nick").click(function(){
            // alert(" MEMBER-NICK BOSILDI")
            // alert($(".member-phone").val())
                // alert("yoqoladi",$(".member-phone").hide())
                // $(".member-phone").hide()
                //  $(".member-phone").toggle()
                //  $(".member-phone").animate({bottom: '25px'})
                 $(".member-phone").animate({opacity: '0.5'})
            
        });
        $("input").click(function(){
            //  alert(" BOSILDI")
            // $("input").css({"background-color": 'yellow', "font-size":'20px'})
            
        });


    }); 
    */

    $(function () {
        const fileTarget = $(".file-box .upload-hidden");
        let filename;

        fileTarget.on("change", function () {
            if (window.FileReader) {
                const uploadFile = $(this)[0].files[0];
                const fileType = uploadFile["type"];
                const valideImageType = ["image/jpeg","image/jpg","image/png"];
                if (!valideImageType.includes(fileType)){
                    alert("Please insert!!! only jpeg, jpg, and png")
                } else {
                    if (uploadFile) {         
                        console.log(URL.createObjectURL(uploadFile));
                        $(".upload-img-frame")
                        .attr("src",URL.createObjectURL(uploadFile))
                        .addClass("succes");
                    }
                    filename = $(this)[0].files[0].name;
                }
                $(this).siblings(".upload-name").val(filename);
            }
        });
    });

    function validateSignupForm() {
        // console.log("executed");
        const memberNick = $(".member-nick").val();
        const memberPhone = $(".member-phone").val();
        const memberPassword = $(".member-password").val();
        const confirmPassword = $(".confirm-password").val();
        // console.log(memberNick,memberPassword,memberPhone,confirmPassword);
        if ( memberNick == '' ||
             memberPhone == '' ||
             memberPassword == '' ||
             confirmPassword == '' 
        ){
            alert("Please insert all required inputs");
            return false;
        }

        if( memberPassword !== confirmPassword) {
            alert("Password differs please check!!!")
            return false;
        }

        const memberImage = $(".member-image").get(0).files[0] 
        ? $(".member-image").get(0).files[0].name 
        : null;
        if(!memberImage){
            alert ("Please insert logo");
            return false;
        }

    }