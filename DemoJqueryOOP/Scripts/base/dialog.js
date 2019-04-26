//Class Dialog to Handling Dialog Events
// Created by NBDUONG (18/4/2019)
var context;
class Dialog {
    // Constructor function for Dialog Object
    // Created by NBDUONG (18/4/2019)
    constructor(element, width, height, scope) {
        context = this;
        this.dialog = this.createDialog(element, width, height, scope);
        this.addDatePicker();
        $('.ui-dialog-title').css('color', 'white').css('font-size', '14pt').css('font-weight', 'bold');
        $('.ui-dialog-titlebar-close').text('X');
        this.getSelectMenu();
        //this.openDialog();
        //this.closeDialog();
    }

    createDialog(element, width, height, scope) {
        var dialog;
        dialog = $(element).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
            buttons: {
                "Lưu": scope.saveEditCustomer,
                "Thêm": scope.saveAddCustomer,
                "Đóng": context.closeDialog
            }
        });

        return dialog;
    }

    //Add DateTimePicker in Input birthday
    // Created by NBDUONG (18/4/2019)
    addDatePicker(element) {
        $(element).datepicker({
            changeMonth: true,
            changeYear: true,
            defaultDate: new Date(),
            yearRange: "1900:2099",
            dateFormat: "dd/mm/yy"
        });
    }

    //Select Option with multiple choices
    // Created by NBDUONG (18/4/2019)
    getSelectMenu(element) {
        $(element).selectmenu({});
    }

    //Open a dialog
    // Created by NBDUONG (18/4/2019)
    openDialog() {
        this.dialog.dialog('open');
        $('#formDetail input').removeClass('border-red');
        $('#formDetail input').each(function () {
            $(this).val("");
        });
    }

    //Close a dialog
    // Created by NBDUONG (18/4/2019)
    closeDialog() {
        context.dialog.dialog('close');
        $('#formDetail input').removeClass('border-red');
    }

    save() {
        alert("Save");
    }
}
