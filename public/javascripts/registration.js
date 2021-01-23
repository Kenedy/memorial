$(document).ready(function () {
    var model = {
        name: ko.observable(),
        nameTouched: ko.observable(false),
        comment: ko.observable(),
        photoUrl: ko.observable(),
        showPhotoRequired: ko.observable(false),
    };
    model.onNameChange = function (data, event) {
        model.nameTouched(true);
    };
    model.showNameRequired = ko.pureComputed(function () {
        return model.nameTouched() && model.name().length === 0;
    }),
    model.onPhotoChange = function (data, event) {
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
    model.onSubmit = function (data, event) {
        model.name(_.trim(model.name()));
        model.comment(_.trim(model.comment()));

        let isValid = true;

        if (model.name().length === 0) {
            isValid = false;
            model.nameTouched(true);
        }

        if (document.getElementById('photo').files.length === 0) {
            model.showPhotoRequired(true);
            isValid = false;
        }

        if (isValid && confirm('Opravdu chcete formulář odeslat? Zadaná data už později nebude možné změnit.')) {
            document.forms['result'].submit();
        }
    };
    model.hasModelData = ko.pureComputed(function () {
        return (model.name() && _.trim(model.name()).length > 0)
            || model.photoUrl()
            || model.comment();
    });

    ko.applyBindings(model);
});
