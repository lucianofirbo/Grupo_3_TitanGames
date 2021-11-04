function qs(element) {
    return document.querySelector(element);
}

window.addEventListener('load', function(){
    $email = qs("#email"),
    $emailErrors = qs("#emailErrors"),
    $pass = qs("#pass"),
    $passErrors = qs("#passErrors"),
    $form = qs("#form"),
    submitErrors = qs('#submitErrors'),
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    $email.addEventListener('blur', function() {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'Debes ingresar un email';
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
            default:
                $pass.style.backgroundColor = 'white'
                $passErrors.innerHTML = ''
                break;
        }
    });

    $form.addEventListener('submit',function(event){
        let error = false;        
        event.preventDefault()
        let elementosForm = this.elements
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == ""){
                elementosForm[index].style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                submitErrors.innerHTML = "Debes llenar los campos";
                error = true;
            }
        }    
        if(!error){
            $form.submit()
        }   
    });
    
});