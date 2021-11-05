function qs(element) {
    return document.querySelector(element);
}

window.addEventListener('load', function() {
    let $userName = qs("#userName"),
     $nameErrors = qs("#nameErrors"),
     $file = qs('#formFile'),
     $fileErrors = qs("#fileErrors"),
     $imgPreview = qs("#img-preview"),
     $form = qs("#form"),
     submitErrors = qs('#submitErrors'),
     regLongName = /^.{5,}$/;

    $userName.addEventListener("blur", function () {
        switch(true) {
            case !$userName.value.trim():
                $nameErrors.innerHTML = "Debe ingresar un nombre de usuario";
                $userName.style.backgroundColor = 'rgba(255, 126, 126, 0.466)';
                break;
            case !regLongName.test($userName.value):
                $nameErrors.innerHTML = "Debes ingresar un nombre con más de 5 caracteres"
                $userName.style.backgroundColor = 'rgba(255, 126, 126, 0.466)';
                break;
            default:
                $userName.style.backgroundColor = 'white';
                $nameErrors.innerHTML = ""
        }
     });

     $form.addEventListener('submit',function(event){
        let error = false;        
        event.preventDefault()
        let elementosForm = this.elements
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == "" 
                                    && elementosForm[index].name !== "email"
                                    && elementosForm[index].name !== "address"
                                    && elementosForm[index].name !== "postalCode"
                                    && elementosForm[index].name !== "province"
                                    && elementosForm[index].name !== "city"){
                elementosForm[index].style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                submitErrors.innerHTML = "Debes llenar los campos";
                error = true;
            }
        }    
        if(!error){
            $form.submit()
        }   
    });

    $file.addEventListener('change', 
    function fileValidation(){
        let filePath = $file.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i 
        if(!allowefExtensions.exec(filePath)){ 
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            $imgPreview.innerHTML = '';
            return false;
        }else{
            if($file.files && $file.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
            }
        }
    })
})