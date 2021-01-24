'use strict';
$(document).ready(function () {
    var minDateTick = Date.parse('2021-01-10');

    var model = {
        name: ko.observable(),
        nameTouched: ko.observable(false),
        date: ko.observable(moment(new Date()).format('YYYY-MM-DD')),
        comment: ko.observable(),
        photoUrl: ko.observable(),
        showPhotoRequired: ko.observable(false)
    };
    model.onNameChange = function () {
        model.nameTouched(true);
    };
    model.isNameValid = function () {
        return model.name().length > 0;
    };
    model.showNameRequired = ko.pureComputed(function () {
        return model.nameTouched() && !model.isNameValid();
    });
    model.dateFormatted = ko.pureComputed(function () {
        return model.isDateValid()
            ? moment(model.date()).format('D. M. YYYY')
            : null;
    });
    model.showDateRequired = ko.pureComputed(function () {
        return !model.date();
    });
    model.isDateValid = function () {
        var dtStr = model.date();
        if (!dtStr) {
            return false;
        }
        try {
            var dt = Date.parse(dtStr);
            if (_.isNaN(dt)) {
                return false;
            }
            if (dt < minDateTick || dt > new Date().valueOf()) {
                return false;
            }
        } catch (ignore) {
            return false;
        }
        return true;
    };
    model.showDateInvalid = ko.pureComputed(function () {
        if (model.date()) {
            return !model.isDateValid();
        } else {
            return false;   // showDateRequired will catch this
        }
    });
    model.onPhotoChange = function (ignore, event) {
        if (event) {
            if (model.photoUrl()) {
                URL.revokeObjectURL(model.photoUrl());
            }
            if (event.target && event.target.files.length > 0) {
                model.photoUrl(URL.createObjectURL(event.target.files[0]));
                model.showPhotoRequired(false);
            } else {
                model.photoUrl(undefined);
                model.showPhotoRequired(true);
            }
        }
    };
    model.isPhotoValid = function () {
        return document.getElementById('photo').files.length > 0;
    };
    model.onSubmit = function () {
        model.name(_.trim(model.name()));
        model.comment(_.trim(model.comment()));

        var isValid = model.isNameValid() && model.isDateValid() && model.isPhotoValid();
        if (isValid && confirm('Opravdu chcete formulář odeslat? Zadaná data už později nebude možné změnit.')) {
            document.forms.result.submit();
        } else {
            model.nameTouched(true);
            if (!model.isPhotoValid()) {
                model.showPhotoRequired(true);
            }
        }
    };
    model.hasModelData = ko.pureComputed(function () {
        return (model.name() && _.trim(model.name()).length > 0)
                || model.photoUrl()
                || model.comment()
                || model.date();
    });

    ko.applyBindings(model);
});
