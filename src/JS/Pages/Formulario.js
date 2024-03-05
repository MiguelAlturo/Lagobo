/* eslint-disable class-methods-use-this */
/**
 *      Category Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */

const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
import Globales from '../Global/General';
import Swal from 'sweetalert2';

const globales = new Globales();

export default class Formulario {
    constructor() {
        this.init();
    }

    init() {
        const self = this;
        self.initForm(self);
        self.formEvents();
    }

    formEvents() {
        $(document).on('change', '.input-field input, .input-field textarea', function(){
            if($(this).val()!=="")
                $(this).addClass("not_empty");
            else
                $(this).removeClass("not_empty");
        });
    }

    initForm(self) {
        self.getDepartmentCityData(self);
        $('.validateData').on('click', function(e) {
            e.preventDefault();
            const formSelector = $(this).parents('form').first();
            let filledForm = false;
            const bodyForm = document.querySelector('body').classList.value.split(" ")[0];
            console.log(bodyForm)
            switch(bodyForm) {
                case 'dia-sin-iva':
                    filledForm = self.isValidFormIva(formSelector, self);
                    break;
                case 'actualizacion-de-datos':
                    filledForm = self.isValidFormActualizacion(formSelector, self);
                    break;
                case 'work_with_us':
                    filledForm = self.isValidFormWorkWithUs(formSelector, self);
                    break;
                case 'v_insti':
                case 'v_mayorista':
                    filledForm = self.isValidFormVentasInstitucionales(formSelector, self);
                    break;
                case 'linea_etica':
                    filledForm = self.isValidFormLineaEtica(formSelector, self);
                    break;
            }
            console.log({filledForm});
            if (filledForm) {
                const { formName } = filledForm;
                delete filledForm.formName;
                let file = null;
                if (typeof filledForm.file !== 'undefined') {
                    file = filledForm.file;
                    delete filledForm.file
                }
                if (formName === 'LE') {
                    const { filesToSave, implicados, ...dataForm } = filledForm
                    console.log({filesToSave}, {implicados}, {dataForm});
                    const denunciaId = uuidv4();
                    for (let i = 0; i < implicados.length; i++) {
                        const jsonData = {
                            ...dataForm,
                            ...implicados[i],
                            denunciaId
                        }
                        axios.request({
                            url: `/api/dataentities/${formName}/documents`,
                            method: 'PATCH',
                            headers: {
                                'accept':'application/vnd.vtex.ds.v10+json',
                                "content-type" : "application/json",
                                "X-VTEX-API-AppToken": "TKRFZRXWTTWQNZWAJSPFIVSKORPWHNUKXYEYIUGSBCSTRUOHFVRMAPMXRHRIBBOFZMSPVXRPLXEGDYSTDIQMWIKIMGGBDYRZONUFCYMIDBADLFUTOXFTLBIQCJDPRPMN",
                                "X-VTEX-API-AppKey": "vtexappkey-lagobo-TUMZSF"
                            },
                            data: JSON.stringify(jsonData)
                        }).then(async ({ data }) => {
                            if (typeof data != 'undefined' && data.Id != '' && data.DocumentId !== '') {
                                if (filesToSave) {
                                    Swal.fire({
                                        title: 'Estamos guardando tus datos',
                                        html: 'Este proceso puede tomar hasta 5 minutos en finalizar.',
                                        timer: 300000,
                                        timerProgressBar: true,
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        allowEnterKey: false,
                                        showCloseButton: false,
                                        didOpen: () => {
                                            Swal.showLoading()
                                            self.saveFilesInMD(data.DocumentId, filesToSave, formName, self)
                                        },
                                        willClose: () => {
                                            clearInterval(timerInterval)
                                        }
                                    }).then((result) => {
                                        /* Read more about handling dismissals below */
                                        if (result.dismiss === Swal.DismissReason.timer) {
                                            Swal.fire({
                                                title: 'No hemos podido guardar tu información, por favor reinténtalo nuevamente.',
                                                showCancelButton: false,
                                                confirmButtonText:'Ok',
                                            }).then((result) => {
                                            });
                                        }
                                    })
                                } else {
                                    Swal.fire({
                                        title: '¡Hemos registrado correctamente tus datos!',
                                        showCancelButton: false,
                                        confirmButtonText: '¡Genial!',
                                    }).then((result) => {
                                        location.href = '/';
                                    });
                                }
                            }
                        }).catch((error) => {
                            Swal.fire({
                                title: 'No hemos podido guardar tu información, por favor reinténtalo nuevamente.',
                                showCancelButton: false,
                                confirmButtonText:'Ok',
                            }).then((result) => {
                            });
                        });
                    }
                } else {
                    axios.request({
                        url: `/api/dataentities/${formName}/documents`,
                        method: 'PATCH',
                        headers: {
                            'accept':'application/vnd.vtex.ds.v10+json',
                            "content-type" : "application/json",
                            "X-VTEX-API-AppToken": "TKRFZRXWTTWQNZWAJSPFIVSKORPWHNUKXYEYIUGSBCSTRUOHFVRMAPMXRHRIBBOFZMSPVXRPLXEGDYSTDIQMWIKIMGGBDYRZONUFCYMIDBADLFUTOXFTLBIQCJDPRPMN",
                            "X-VTEX-API-AppKey": "vtexappkey-lagobo-TUMZSF"
                        },
                        data: JSON.stringify(filledForm)
                    }).then(({ data }) => {
                        if (typeof data != 'undefined' && data.Id != '' && data.DocumentId !== '') {
                            if (formName === 'WU') {
                                if (file) {
                                    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    axios
                                        .post(`/api/dataentities/${formName}/documents/${data.DocumentId}/file/attachments/`, formData, config)
                                        .then((response) => {
                                            if (response.status < 300)
                                                Swal.fire({
                                                    title: '¡Hemos registrado correctamente tus datos!',
                                                    showCancelButton: false,
                                                    confirmButtonText: '¡Genial!',
                                                }).then((result) => {
                                                    location.href = '/';
                                                });
                                        })
                                        .catch((error) => {
                                            Swal.fire({
                                                icon: 'error',
                                                title: '¡Error!',
                                                text: `No hemos podido guardar tu información: ${error.request.responseText}`,
                                                showCancelButton: false,
                                                confirmButtonText: 'Ok',
                                            })
                                            console.log({error});
                                        });
                                }
                            } else {
                                Swal.fire({
                                    title: '¡Hemos registrado correctamente tus datos!',
                                    showCancelButton: false,
                                    confirmButtonText: '¡Genial!',
                                }).then((result) => {
                                    location.href = '/';
                                });
                            }
                        }
                    }).catch((error) => {
                        Swal.fire({
                            title: 'No hemos podido guardar tu información, por favor reinténtalo nuevamente.',
                            showCancelButton: false,
                            confirmButtonText:'Ok',
                        }).then((result) => {
                        });
                    });
                }
            } else {
                const element = document.querySelector('.error');
                element.scrollIntoView({ behavior: 'smooth', block: 'center'});
            }
        });
        $('.add_person').on('click', function(e) {
            e.preventDefault();
            const clone = $('.process').last().clone();
            $(`<div class="process">
                <div class="content-field copy">
                    <div class="input-field">
                        <input type="text" name="nombreImplicado" autocomplete="off">
                        <label for="nombreImplicado">Nombre*</label>
                        <em></em>
                    </div>
                </div>
                <div class="content-field">
                    <div class="input-field">
                        <input type="text" name="cargoImplicado" autocomplete="off">
                        <label for="cargoImplicado">Cargo*</label>
                        <em></em>
                    </div>
                </div>
                <div class="content-field">
                    <div class="input-field">
                        <input type="date" name="fechaDenuncia" class="not_empty" autocomplete="off">
                        <label for="fechaDenuncia">Fecha*</label>
                        <em></em>
                    </div>
                </div>
                <div class="content-field delete_person_content">
                    <a class="delete_person">X</a>
                </div>
            </div>`).insertBefore($(this));
        })
        $(document).on('click', '.delete_person, .delete_person_content', function(e) {
            e.preventDefault();
            $(this).parents('.process').remove();
        })
    }

    async saveFilesInMD(documentId, filesToSave, formName, self) {
        const fileNames = Object.keys(filesToSave)
        console.log({fileNames})
        for(let i = 0; i < fileNames.length; i++) {
            await self.sendFilesToMD(formName, documentId, fileNames[i], filesToSave[fileNames[i]], self)
        }
        Swal.fire({
            title: '¡Hemos registrado correctamente tus datos!',
            showCancelButton: false,
            confirmButtonText: '¡Genial!',
        }).then((result) => {
            location.href = '/';
        });
    }

    async sendFilesToMD(formName, documentId, fileName, file, self) {
        const abort = axios.CancelToken.source()
        const id = setTimeout(
            () => abort.cancel(`Timeout of 3000ms.`),
            3000
        )
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                cancelToken: abort.token
            }
        };
        const formData = new FormData();
        formData.append(fileName, file);
        return await axios
            .post(`/api/dataentities/${formName}/documents/${documentId}/${fileName}/attachments/`, formData, config)
            .then((response) => {
                console.log({response});
            })
            .catch((error) => {
                clearTimeout(id);
                console.log({error});
                return self.sendFilesToMD(formName, documentId, fileName, file, self)
            });
    }

    isValidFormIva(formSelector, self) {
        let formData = formSelector.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        let formValidate = true;
        const messages = {
            "email" : 'Ingresa un email válido',
            "nombre" : 'Ingresa tu nombre',
            "apellido" : 'Ingresa tus apellidos',
            "document" : 'Ingresa tu número de documento',
            "celular" : 'Ingresa un número de celular',
            "documentType" : 'Selecciona el tipo de documento',
            "tyc" : 'Debe aceptar los términos y condiciones',
            "tdatos" : 'Debe aceptar los TyC de tratamiento de datos'
        }
        const keysMessage = Object.keys(messages);
        keysMessage.forEach((v) => {
            if (typeof formData[v] == "undefined" || formData[v] === "" || $.trim(formData[v]) === "" ) {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                $(`[name=${v}]`).parents('.content-field').append(`<em class="error alert alert-info">${messages[v]}</em>`);
                formValidate = false;
            } else {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
            }
        });
        formData["tdatos"] = formData["tdatos"] === "true" ? true : false;
        formData["tyc"] = formData["tyc"] === "true" ? true : false;

        if (!formData["tdatos"] || !formData["tyc"])
            formValidate = false;

        if (!self.isValidEmail(formData["email"]) || formData["email"] === "") {
            formValidate = false;
            $('[name=email]').parents('.content-field').find('.alert').remove();
            $('[name=email]').parents('.content-field').append(`<em class="error alert alert-info">${messages['email']}</em>`);
        }

        if (!self.isValidText2(formData["nombre"]) || formData["nombre"] === "") {
            formValidate = false;
            $('[name=nombre]').parents('.content-field').find('.alert').remove();
            $('[name=nombre]').parents('.content-field').append(`<em class="error alert alert-info">${messages['nombre']}</em>`);
        }

        if (!self.isValidText2(formData["apellido"]) || formData["apellido"] === "") {
            formValidate = false;
            $('[name=apellido]').parents('.content-field').find('.alert').remove();
            $('[name=apellido]').parents('.content-field').append(`<em class="error alert alert-info">${messages['apellido']}</em>`);
        }

        if (!self.isValidDocument(formData["document"]) || formData["document"] === "") {
            formValidate = false;
            $('[name=document]').parents('.content-field').find('.alert').remove();
            $('[name=document]').parents('.content-field').append(`<em class="error alert alert-info">${messages['document']}</em>`);
        }

        if (!self.isValidText(formData["documentType"]) || formData["documentType"] === "") {
            formValidate = false;
            $('[name=documentType]').parents('.content-field').find('.alert').remove();
            $('[name=documentType]').parents('.content-field').append(`<em class="error alert alert-info">${messages['documentType']}</em>`);
        }

        if (!self.isValidPhone(formData["celular"]) || formData["celular"] < 0 || formData["celular"] === "") {
            formValidate = false;
            $('[name=celular]').parents('.content-field').find('.alert').remove();
            $('[name=celular]').parents('.content-field').append(`<em class="error alert alert-info">${messages["celular"]}</em>`);
        }

        if (formValidate) {
            formData["celular"] = `57${formData["celular"]}`;
            return formData;
        }
        return formValidate;
    }

    isValidFormActualizacion(formSelector, self) {
        let formData = formSelector.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        let formValidate = true;
        const messages = {
            "email" : 'Ingresa un email válido',
            "firstName" : 'Ingresa tu nombre',
            "lastName" : 'Ingresa tus apellidos',
            "document" : 'Ingresa tu número de documento',
            "phone" : 'Ingresa un número de celular',
            "documentType" : 'Selecciona el tipo de documento',
            "tyc" : 'Debe aceptar los términos y condiciones',
            "tdatos" : 'Debe aceptar los TyC de tratamiento de datos',
            "homePhone": 'Ingresa un número de teléfono',
            "address": "Ingresa tu dirección",
            "city": "Elige tu ciudad",
            "department": "Elige tu departamento",
            "gender": "Elige tu género"
        }
        const keysMessage = Object.keys(messages);
        keysMessage.forEach((v) => {
            if (typeof formData[v] == "undefined" || formData[v] === "" || $.trim(formData[v]) === "" ) {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                $(`[name=${v}]`).parents('.content-field').append(`<em class="error alert alert-info">${messages[v]}</em>`);
                formValidate = false;
            } else {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
            }
        });
        formData["tdatos"] = formData["tdatos"] === "true" ? true : false;
        formData["tyc"] = formData["tyc"] === "true" ? true : false;

        if (!formData["tdatos"] || !formData["tyc"])
            formValidate = false;

        if (!self.isValidEmail(formData["email"]) || formData["email"] === "") {
            formValidate = false;
            $('[name=email]').parents('.content-field').find('.alert').remove();
            $('[name=email]').parents('.content-field').append(`<em class="error alert alert-info">${messages['email']}</em>`);
        }

        if (!self.isValidText2(formData["firstName"]) || formData["firstName"] === "") {
            formValidate = false;
            $('[name=firstName]').parents('.content-field').find('.alert').remove();
            $('[name=firstName]').parents('.content-field').append(`<em class="error alert alert-info">${messages['firstName']}</em>`);
        }

        if (!self.isValidText2(formData["lastName"]) || formData["lastName"] === "") {
            formValidate = false;
            $('[name=lastName]').parents('.content-field').find('.alert').remove();
            $('[name=lastName]').parents('.content-field').append(`<em class="error alert alert-info">${messages['lastName']}</em>`);
        }

        if (!self.isValidDocument(formData["document"]) || formData["document"] === "") {
            formValidate = false;
            $('[name=document]').parents('.content-field').find('.alert').remove();
            $('[name=document]').parents('.content-field').append(`<em class="error alert alert-info">${messages['document']}</em>`);
        }

        if (!self.isValidText(formData["documentType"]) || formData["documentType"] === "") {
            formValidate = false;
            $('[name=documentType]').parents('.content-field').find('.alert').remove();
            $('[name=documentType]').parents('.content-field').append(`<em class="error alert alert-info">${messages['documentType']}</em>`);
        }

        if (!self.isValidPhone(formData["phone"]) || formData["phone"] < 0 || formData["phone"] === "") {
            formValidate = false;
            $('[name=phone]').parents('.content-field').find('.alert').remove();
            $('[name=phone]').parents('.content-field').append(`<em class="error alert alert-info">${messages["phone"]}</em>`);
        }

        if (!self.isValidNumber(formData["homePhone"]) || formData["homePhone"] < 0 || formData["homePhone"] === "") {
            formValidate = false;
            $('[name=homePhone]').parents('.content-field').find('.alert').remove();
            $('[name=homePhone]').parents('.content-field').append(`<em class="error alert alert-info">${messages["homePhone"]}</em>`);
        }

        if (!self.isValidText(formData["gender"]) || formData["gender"] === "") {
            formValidate = false;
            $('[name=gender]').parents('.content-field').find('.alert').remove();
            $('[name=gender]').parents('.content-field').append(`<em class="error alert alert-info">${messages['gender']}</em>`);
        }

        if (formValidate) {
            formData["phone"] = `57${formData["phone"]}`;
            return formData;
        }
        return formValidate;
    }

    isValidFormVentasInstitucionales(formSelector, self) {
        let formData = formSelector.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        let formValidate = true;
        const messages = {
            "email" : 'Ingresa un email válido',
            "firstName" : 'Ingresa tu nombre',
            "lastName" : 'Ingresa tus apellidos',
            "companyName" : 'Ingresa el nombre de la empresa',
            "city" : 'Ingresa la ciudad de la empresa',
            "phone" : 'Ingresa un número de teléfono',
            "tdatos" : 'Debe aceptar los TyC de tratamiento de datos'
        }
        const keysMessage = Object.keys(messages);
        keysMessage.forEach((v) => {
            if (typeof formData[v] == "undefined" || formData[v] === "" || $.trim(formData[v]) === "" ) {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                $(`[name=${v}]`).parents('.content-field').append(`<em class="error alert alert-info">${messages[v]}</em>`);
                formValidate = false;
            } else {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
            }
        });
        formData["tdatos"] = formData["tdatos"] === "true" ? true : false;

        if (!formData["tdatos"])
            formValidate = false;

        if (!self.isValidEmail(formData["email"]) || formData["email"] === "") {
            formValidate = false;
            $('[name=email]').parents('.content-field').find('.alert').remove();
            $('[name=email]').parents('.content-field').append(`<em class="error alert alert-info">${messages['email']}</em>`);
        }

        if (!self.isValidText2(formData["firstName"]) || formData["firstName"] === "") {
            formValidate = false;
            $('[name=firstName]').parents('.content-field').find('.alert').remove();
            $('[name=firstName]').parents('.content-field').append(`<em class="error alert alert-info">${messages['firstName']}</em>`);
        }

        if (!self.isValidText2(formData["lastName"]) || formData["lastName"] === "") {
            formValidate = false;
            $('[name=lastName]').parents('.content-field').find('.alert').remove();
            $('[name=lastName]').parents('.content-field').append(`<em class="error alert alert-info">${messages['lastName']}</em>`);
        }

        if (!self.isValidText2(formData["companyName"]) || formData["companyName"] === "") {
            formValidate = false;
            $('[name=companyName]').parents('.content-field').find('.alert').remove();
            $('[name=companyName]').parents('.content-field').append(`<em class="error alert alert-info">${messages['companyName']}</em>`);
        }

        if (!self.isValidText2(formData["city"]) || formData["city"] === "") {
            formValidate = false;
            $('[name=city]').parents('.content-field').find('.alert').remove();
            $('[name=city]').parents('.content-field').append(`<em class="error alert alert-info">${messages['city']}</em>`);
        }

        if (!self.isValidPhone(formData["phone"]) || formData["phone"] < 0 || formData["phone"] === "") {
            formValidate = false;
            $('[name=phone]').parents('.content-field').find('.alert').remove();
            $('[name=phone]').parents('.content-field').append(`<em class="error alert alert-info">${messages["phone"]}</em>`);
        }

        if (formValidate) {
            formData["phone"] = `57${formData["phone"]}`;
            return formData;
        }
        return formValidate;
    }


    isValidFormWorkWithUs(formSelector, self) {
        let formData = formSelector.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        const formDataFile = formSelector.find('input[type="file"]').prop('files');
        let formValidate = true;
        const messages = {
            "email" : 'Ingresa un email válido',
            "firstName" : 'Ingresa tu nombre',
            "lastName" : 'Ingresa tus apellidos',
            "area" : 'Ingresa el área en la que te desempeñas',
            "phone" : 'Ingresa un número de teléfono',
            "tdatos" : 'Debe aceptar los TyC de tratamiento de datos'
        }
        const keysMessage = Object.keys(messages);
        keysMessage.forEach((v) => {
            if (typeof formData[v] == "undefined" || formData[v] === "" || $.trim(formData[v]) === "" ) {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                $(`[name=${v}]`).parents('.content-field').append(`<em class="error alert alert-info">${messages[v]}</em>`);
                formValidate = false;
            } else {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
            }
        });
        formData["tdatos"] = formData["tdatos"] === "true" ? true : false;

        $('.alert').remove();

        if (!formData["tdatos"]) {
            formValidate = false;
            $('[name=tdatos]').parents('.content-field').find('.alert').remove();
            $('[name=tdatos]').parents('.content-field').append(`<em class="error alert alert-info">${messages['tdatos']}</em>`);
        } else {
            $('[name=tdatos]').parents('.content-field').find('.alert').remove();
        }

        if (!self.isValidEmail(formData["email"]) || formData["email"] === "") {
            formValidate = false;
            $('[name=email]').parents('.content-field').find('.alert').remove();
            $('[name=email]').parents('.content-field').append(`<em class="error alert alert-info">${messages['email']}</em>`);
        }

        if (!self.isValidText2(formData["firstName"]) || formData["firstName"] === "") {
            formValidate = false;
            $('[name=firstName]').parents('.content-field').find('.alert').remove();
            $('[name=firstName]').parents('.content-field').append(`<em class="error alert alert-info">${messages['firstName']}</em>`);
        }

        if (!self.isValidText2(formData["lastName"]) || formData["lastName"] === "") {
            formValidate = false;
            $('[name=lastName]').parents('.content-field').find('.alert').remove();
            $('[name=lastName]').parents('.content-field').append(`<em class="error alert alert-info">${messages['lastName']}</em>`);
        }

        if (!self.isValidText2(formData["area"]) || formData["area"] === "") {
            formValidate = false;
            $('[name=area]').parents('.content-field').find('.alert').remove();
            $('[name=area]').parents('.content-field').append(`<em class="error alert alert-info">${messages['area']}</em>`);
        }

        if (!self.isValidPhone(formData["phone"]) || formData["phone"] < 0 || formData["phone"] === "") {
            formValidate = false;
            $('[name=phone]').parents('.content-field').find('.alert').remove();
            $('[name=phone]').parents('.content-field').append(`<em class="error alert alert-info">${messages["phone"]}</em>`);
        }

        console.log(formDataFile[0])

        if (typeof formDataFile[0] === 'undefined') {
            formValidate = false;
            $('[name=file]').parents('.content-field').find('.alert').remove();
            $('[name=file]').parents('.content-field').append(`<em class="error alert alert-info">Por favor añade tu hoja de vida</em>`);
        }

        if (typeof formDataFile[0] !== 'undefined' && formDataFile[0].type !== 'application/pdf') {
            formValidate = false;
            $('[name=file]').parents('.content-field').find('.alert').remove();
            $('[name=file]').parents('.content-field').append(`<em class="error alert alert-info">Solo se permiten archivos en formato PDF</em>`);
        }

        if (formValidate) {
            formData["phone"] = `57${formData["phone"]}`;
            const newForm = {...formData, 'fileName': formDataFile[0].name, 'file': formDataFile[0]}
            return newForm;
        }
        return formValidate;
    }


    isValidFormLineaEtica(formSelector, self) {
        let formData = formSelector.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        let formValidate = true;
        const formDataFile = formSelector.find('input[type="file"]').prop('files');
        const messages = {
            "emailDenunciante" : 'Ingresa un email válido',
            "areaDenuncia" : 'Ingresa el área del implicado',
            "ciudad" : 'Ingresa la ciudad donde sucedió',
            "departamento" : 'Ingresa el departamento donde sucedió',
            "descripcion" : 'Ingresa los detalles de la denuncia',
            "nombreDenunciante" : 'Selecciona el tipo de denunciante',
            "telefonoDenunciante" : 'Ingresa un teléfono para contactarnos',
            "tipoDenuncia" : 'Elige el tipo de denuncia que se hará',
            "tdatos" : 'Debe aceptar los TyC de tratamiento de datos',
            "fechaDenuncia": 'Ingresa la fecha de lo ocurrido',
            "nombreImplicado": 'Ingresa el nombre del implicado',
            "cargoImplicado": 'Ingresa el cargo del implicado'
        }
        const keysMessage = Object.keys(messages);
        keysMessage.forEach((v) => {
            if (typeof formData[v] == "undefined" || formData[v] === "" || $.trim(formData[v]) === "" ) {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                $(`[name=${v}]`).parents('.content-field').append(`<em class="error alert alert-info">${messages[v]}</em>`);
                formValidate = false;
            } else {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
            }
        });
        formData["tdatos"] = formData["tdatos"] === "true" ? true : false;

        if (!formData["tdatos"])
            formValidate = false;

        if (!self.isValidEmail(formData["emailDenunciante"]) || formData["emailDenunciante"] === "") {
            formValidate = false;
            $('[name=emailDenunciante]').parents('.content-field').find('.alert').remove();
            $('[name=emailDenunciante]').parents('.content-field').append(`<em class="error alert alert-info">${messages['emailDenunciante']}</em>`);
        }

        if (!self.isValidText2(formData["areaDenuncia"]) || formData["areaDenuncia"] === "") {
            formValidate = false;
            $('[name=areaDenuncia]').parents('.content-field').find('.alert').remove();
            $('[name=areaDenuncia]').parents('.content-field').append(`<em class="error alert alert-info">${messages['areaDenuncia']}</em>`);
        }

        if (!self.isValidText2(formData["ciudad"]) || formData["ciudad"] === "") {
            formValidate = false;
            $('[name=ciudad]').parents('.content-field').find('.alert').remove();
            $('[name=ciudad]').parents('.content-field').append(`<em class="error alert alert-info">${messages['ciudad']}</em>`);
        }

        if (!self.isValidText2(formData["departamento"]) || formData["departamento"] === "") {
            formValidate = false;
            $('[name=departamento]').parents('.content-field').find('.alert').remove();
            $('[name=departamento]').parents('.content-field').append(`<em class="error alert alert-info">${messages['departamento']}</em>`);
        }

        if (formData["descripcion"] === "") {
            formValidate = false;
            $('[name=descripcion]').parents('.content-field').find('.alert').remove();
            $('[name=descripcion]').parents('.content-field').append(`<em class="error alert alert-info">${messages['descripcion']}</em>`);
        }

        if (!self.isValidText2(formData["nombreDenunciante"]) || formData["nombreDenunciante"] === "") {
            formValidate = false;
            $('[name=nombreDenunciante]').parents('.content-field').find('.alert').remove();
            $('[name=nombreDenunciante]').parents('.content-field').append(`<em class="error alert alert-info">${messages['nombreDenunciante']}</em>`);
        }

        const $implicados = $('.process')
        const implicados = [];
        for (let i = 0; i < $implicados.length; i++) {
            const fechaDenuncia = $($implicados[i]).find('[name=fechaDenuncia]');
            const nombreImplicado = $($implicados[i]).find('[name=nombreImplicado]');
            const cargoImplicado = $($implicados[i]).find('[name=cargoImplicado]');
            if (fechaDenuncia.val() === "") {
                formValidate = false;
                fechaDenuncia.parents('.content-field').find('.alert').remove();
                fechaDenuncia.parents('.content-field').append(`<em class="error alert alert-info">${messages['fechaDenuncia']}</em>`);
            }
    
            if (!self.isValidText2(nombreImplicado.val()) || nombreImplicado.val() === "") {
                formValidate = false;
                nombreImplicado.parents('.content-field').find('.alert').remove();
                nombreImplicado.parents('.content-field').append(`<em class="error alert alert-info">${messages['nombreImplicado']}</em>`);
            }
    
            if (!self.isValidText2(cargoImplicado.val()) || cargoImplicado.val() === "") {
                formValidate = false;
                cargoImplicado.parents('.content-field').find('.alert').remove();
                cargoImplicado.parents('.content-field').append(`<em class="error alert alert-info">${messages['cargoImplicado']}</em>`);
            }
            if (formValidate) {
                implicados.push({
                    fechaDenuncia: fechaDenuncia.val(),
                    nombreImplicado: nombreImplicado.val(),
                    cargoImplicado: cargoImplicado.val()
                })
            }
        }

        if (!self.isValidText2(formData["tipoDenuncia"]) || formData["tipoDenuncia"] === "") {
            formValidate = false;
            $('[name=tipoDenuncia]').parents('.content-field').find('.alert').remove();
            $('[name=tipoDenuncia]').parents('.content-field').append(`<em class="error alert alert-info">${messages['tipoDenuncia']}</em>`);
        }

        if (!self.isValidPhone(formData["telefonoDenunciante"]) || formData["telefonoDenunciante"] < 0 || formData["telefonoDenunciante"] === "") {
            formValidate = false;
            $('[name=telefonoDenunciante]').parents('.content-field').find('.alert').remove();
            $('[name=telefonoDenunciante]').parents('.content-field').append(`<em class="error alert alert-info">${messages["telefonoDenunciante"]}</em>`);
        }

        for (let i = 0; i < formDataFile.length; i++) {
            if (formDataFile[i].size / 1000000 > 5) {
                formValidate = false;
                $('[name=file]').parents('.content-field').find('.alert').remove();
                $('[name=file]').parents('.content-field').append(`<em class="error alert alert-info">Solo se permiten archivos en formato PDF, PNG, JPG, JPEG y de máximo 5 megas</em>`);
            }
        }
        if (formDataFile.length > 10) {
            formValidate = false;
            $('[name=file]').parents('.content-field').find('.alert').remove();
            $('[name=file]').parents('.content-field').append(`<em class="error alert alert-info">Se permiten máximo 10 adjuntos.</em>`);
        }

        if (formValidate) {
            const filesToSave = {}
            for(let i = 0; i < formDataFile.length; i++) {
                filesToSave[`soporte${i}`] = formDataFile[i]
            }
            formData["telefonoDenunciante"] = `57${formData["telefonoDenunciante"]}`;
            const newForm = {...formData, filesToSave, implicados}
            return newForm;
        }
        return formValidate;
    }

    getDepartmentCityData(self) {
        if(!sessionStorage.getItem('departamentos'))
            $.ajax({
                url: 'https://www.datos.gov.co/resource/xdk5-pm3f.json',
                data: {
                "$limit" : 5000,
                "$order" : "departamento ASC,municipio ASC"
                }
            }).done(datos => {
                console.log("datos", datos);
                let departamentos = {};
                datos.forEach( (v) => {
                    if (typeof departamentos[v.departamento] == "undefined") {
                        departamentos[v.departamento] = [];
                        departamentos[v.departamento].push({
                            nombre: v.municipio,
                            codigo: v.c_digo_dane_del_municipio
                        });
                    } else
                        departamentos[v.departamento].push({
                            nombre: v.municipio,
                            codigo: v.c_digo_dane_del_municipio
                        });
                });
                console.log("departamentos", departamentos);
                sessionStorage.setItem('departamentos',JSON.stringify(departamentos));
                self.fillSelectDepartmentCityData(departamentos);
            });
        else {
            const departamentos = JSON.parse(sessionStorage.getItem('departamentos'));
            self.fillSelectDepartmentCityData(departamentos);
        }
    }

    fillSelectDepartmentCityData(departamentos) {
        const select1 = Object.keys(departamentos);
        $('select[name=department]').empty().append('<option value="">Seleccione su departamento*</option>');
        select1.forEach(v => {
            $('select[name=department]').append(`<option value="${v}">${v}</option>`);
        });
        $('select[name=department]').on('change', function(){
            const selected = $(this).val();
            if (selected != "") {
                $(this).addClass('filled');
                $('select[name=city]').parents('.content-field').removeClass('hidden');
                //var departamentoStorage = JSON.parse(sessionStorage.getItem('departamentos'));
                $('select[name=city]').empty().append('<option value="">Seleccione su ciudad*</option>');
                $('select[name=city]').removeClass('filled');
                const cities = departamentos[selected];
                cities.forEach(v => {
                    $('select[name=city]').append(`<option value="${v.codigo} - ${v.nombre}">${$.trim(v.nombre)}</option>`);
                });
            } else {
                $(this).removeClass('filled');
                $('select[name=city]').parents('.content-field').addClass('hidden');
                $('select[name=city]').removeClass('filled');
            }
        });
        $('select[name=city], select[name=gender], select[name=documentType]').on('change',function(){
            const selected = $(this).val();
            if(selected !== "")
                $(this).addClass('filled');
            else
                $(this).removeClass('filled');
        });
    }

    isValidEmail(email) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    }

    isValidPhone(phone) {
        const phoneRegex = new RegExp("^[0-9]{10}$");
        return phoneRegex.test(phone);
    }

    isValidNumber(number) {
        const numberRegex = new RegExp("^[0-9]{1,}$");
        return numberRegex.test(number);
    }

    isValidDocument(document) {
        const documentRegex = new RegExp("^[0-9]{6,}$");
        return documentRegex.test(document);
    }

    isValidText(text) {
        const letters = /^[A-Za-z]+$/;
        return letters.test(text);
    }

    isValidText2(text) {
        const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
        return letters.test(text);
    }

    getRandomVersion() {
        var min = 0;
        var max = 1000;
        min = Math.ceil(min);
        max = Math.floor(max);
        var version = Math.floor(Math.random() * (max - min + 1)) + min;
        return '&v=' + version;
    }
}