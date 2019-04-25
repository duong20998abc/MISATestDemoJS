//Class Validate Data
//Created by NBDUONG (18/4/2019)
class Validate {

    //Constructor
    //Created By NBDUONG (18/4/2019)
    constructor() {
        this.validateInput();
    };

    //Function built to validate input from Form
    //Created By NBDUONG (18/4/2019)
    validateInput() {
        var flag = true;
        $('#formDetail input').removeClass('border-red');
        $('#formDetail input').each(function () {
            if ($(this).val() === '') {
                $(this).addClass('border-red');
                flag = false;
            }
        });
        return flag;
    }
}

var validate = new Validate();