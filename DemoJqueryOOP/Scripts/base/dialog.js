//Class Dialog to Handling Dialog Events
// Created by NBDUONG (18/4/2019)
class Dialog {

    // Constructor function for Dialog Object
    // Created by NBDUONG (18/4/2019)
    constructor(element, width, height, buttons, header, scope) {
        if (!buttons) {
            buttons = this.buildButtons(scope ? scope : this);
        }
        this.dialog = $(element).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
            buttons: buttons,
            header: header,
            close: function () {
            }
        });

        this.addDatePicker();
        $('.ui-dialog-title').text(header);
        $('.ui-dialog-title').css('color', 'white').css('font-size', '14pt').css('font-weight', 'bold');
        $('.ui-dialog-titlebar-close').text('X');
        this.getSelectMenu();
        this.openDialog();
        this.closeDialog();
    }

    //build Buttons in Dialog
    //Created by NBDUONG (18/4/2019)
    buildButtons(scope) {
        var buttons = buttons = [{
            text: 'Lưu',
            icons: {
                primary: "ui-icon-check"
            },
            class: "djklfhsdjkfh",
            id: "btnSave",
            //Save when Click btn
            click: eval(scope)['btnSaveClick']
        }, {
            text: 'Đóng',
            icons: {
                primary: "ui-icon-cancel"
            },
            //Close Dialog when Click btn
            click: function () {
                $(this).dialog('close');
            }
        },
        {
            text: 'Giúp',
            icons: {
                primary: "ui-icon-cancel"
            },
            //Help when Click btn
            click: function () {
                $(this).dialog('close');
            }
        }];
        return buttons;
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
        this.dialog.dialog('close');
        $('#formDetail input').removeClass('border-red');
    }
}