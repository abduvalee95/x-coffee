console.log("Signup frontend javascript file");

    $(function () {
        const fileTarget = $(".file-box .upload-hidden");
        let filename;

        fileTarget.on("change", function () {
            if (window.FileReader) {
                const uploadFile = $(this)[0].files[0],
                      fileType = uploadFile["type"],
                      valideImageType = ["image/jpeg","image/jpg","image/png"];
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
        const memberNick = $(".member-nick").val(),
              memberPhone = $(".member-phone").val(),
              memberPassword = $(".member-password").val(),
              confirmPassword = $(".confirm-password").val();
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