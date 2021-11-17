function qs(element) {
    return document.querySelector(element);
}

window.addEventListener('load', function(){
    let $inputName = qs("#name")
    let $nameErrors = qs("#nameErrors"),
    
    $email = qs("#email"),
    $emailErrors = qs("#emailErrors"),

    $pass = qs("#pass"),
    $passErrors = qs("#passErrors"),

    $pass2 = qs("#pass2"),
    $pass2Errors = qs("#pass2Errors"),

    $form = qs("#form"),

    submitErrors = qs('#submitErrors')

    regLongName = /^.{3,}$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    
    $inputName.addEventListener("blur", function () {
        switch(true) {
            case !$inputName.value.trim():
                $nameErrors.innerHTML = 'Debes ingresar un nombre de usuario'
                $inputName.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            case !regLongName.test($inputName.value):
                $nameErrors.innerHTML = 'Debes ingresar un nombre de usuario de más de 3 caracteres'
                $inputName.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            default :
                $inputName.style.backgroundColor = 'white'
                $nameErrors.innerHTML = ""
                break;
        } 
    });

    $email.addEventListener('blur', function() {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'Debes ingresar en email';
                $email.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debe ingresar un email válido';
                $email.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break
            default:
                $email.style.backgroundColor = 'white'
                $emailErrors.innerHTML = ''
                break;
        }
    });

    $pass.addEventListener('blur', function() {
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = 'Debes escribir tu contraseña';
                $pass.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            case !regExPass.test($pass.value):
                $passErrors.innerHTML = 'Debes ingresar como mínimo 6 caracteres, <br> una mayúscula y un número';
                $pass.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break
            default:
                $pass.style.backgroundColor = 'white'
                $passErrors.innerHTML = ''
                break;
        }
    });

    $pass2.addEventListener('blur', function(){
        switch (true) {
            case !$pass2.value.trim():
                $pass2Errors.innerHTML = 'Debes reingresar la contraseña';
                $pass2.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            case $pass2.value != $pass.value:
                $pass2Errors.innerHTML = 'Las contraseñas no coinciden';
                $pass2.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            default:
                $pass2.style.backgroundColor = 'white'
                $pass2Errors.innerHTML = ''
                break;
        }
    });

    $form.addEventListener('submit',function(event){
        event.preventDefault();
        let error = false;
        let elementosForm = this.elements;

        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value === ""){
                elementosForm[index].style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }   
        if(!error){
            console.log('Ok');
            $form.submit()
        }    
    })
})
