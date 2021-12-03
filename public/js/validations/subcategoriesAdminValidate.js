function qs(element) {
    return document.querySelector(element);
}

window.addEventListener("load", function () {
    let $inputName = qs("#inputName"),
        $inputNameErrors = qs("#inputNameErrors"),
        $selectCategory = qs("#selectCategory"),
        $categoryErrors = qs("#categoryErrors"),
        submitErrors = qs('#submitErrrors'),
        $form = qs("#form"),
        regLongName = /^.{3,}$/

        $inputName.addEventListener('blur', function(){
            switch (true) {
                case !$inputName.value.trim():
                  $inputNameErrors.innerHTML = "El campo nombre es obligatorio";
                  $inputName.style.backgroundColor = "rgba(255, 126, 126, 0.466)";
                break;
                case !regLongName.test($inputName.value):
                  $inputNameErrors.innerHTML = "Debes ingresar un nombre de al menos 3 carácteres";
                  $inputName.style.backgroundColor = "rgba(255, 126, 126, 0.466)";
                break;
                default:
                  $inputName.style.backgroundColor = "white";
                  $inputNameErrors.innerHTML = "";
                break;
            }
        });

        $selectCategory.addEventListener("blur", function(){
            if ( !$selectCategory.value.trim()) {
                $categoryErrors.innerHTML = "Debe seleccionar una categoría"
                $selectCategory.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
            } else {
                $selectCategory.style.backgroundColor = "white"
                $categoryErrors.innerHTML = "";
            }
        });

        $form.addEventListener("submit", function (event) {
            event.preventDefault();
            let error = false;
            let elementosForm = this.elements;

            for (let index = 0; index < elementosForm.length - 1; index++) {
                if (elementosForm[index].value === "") {
                    elementosForm[index].style.backgroundColor ="rgba(255, 126, 126, 0.466)";
                    submitErrors.innerHTML = "Los campos señalados son obligatorios";
                    error = true;
                }
            }
            if(!error){
                Swal.fire({
                    title: 'Subcategoría añadida con éxito',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#8ebd00',
                    confirmButtonText: 'Ok!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $form.submit()        
                    }
                })
            }
        });
});
