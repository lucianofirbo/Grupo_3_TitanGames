function qs(element) {
    return document.querySelector(element);
}

window.addEventListener('load', function() {
    let $productName = qs('#productName'),
     $productNameErrors = qs('#productNameErrors'),
     $inputPrice = qs('#inputPrice'),
     $inputPriceErrors = qs('#inputPriceErrors'),
     $description = qs('#description'),
     $descriptionErrors = qs('#descriptionErrors'),
     $minReq = qs('#minReq'),
     $minReqErrors = qs('#minReqErrors'),
     $maxReq = qs('#maxReq'),
     $maxReqErrors = qs('#maxReqErrors'),
     $selectCategory = qs('#selectCategory'),
     $categoryErrors = qs('#categoryErrors'),
     $selectSubcategory = qs('#selectSubcategory'),
     $subcategoryErrors = qs('#subcategoryErrors'),
     $fileErrors = qs('#filesErrors'),
     $file1 = qs('#file-1'),
     $imgPreview1 = qs("#file-1-preview"),
     $file2 = qs('#file-2'),
     $imgPreview2 = qs("#file-2-preview"),
     $file3 = qs('#file-3'),
     $imgPreview3 = qs("#file-3-preview"),
     $file4 = qs('#file-4'),
     $imgPreview4 = qs("#file-4-preview"),
     $file5 = qs('#file-5'),
     $imgPreview5 = qs("#file-5-preview"),
     $form = qs('#form'),
     submitErrors = qs('#submitErrors'),
    regLongName = /^.{5,}$/,
    regLongDescription = /^.{20,}$/;

    $productName.addEventListener("blur", function(){
        switch (true) {
            case !$productName.value.trim():
              $productNameErrors.innerHTML = "El campo nombre es obligatorio";
              $productName.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
              break;
            case !regLongName.test($productName.value):
              $productNameErrors.innerHTML = "Debes ingresar un nombre de más de 5 carácteres";
              $productName.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
              break;
            default:
              $productName.style.backgroundColor = 'white'
              $productNameErrors.innerHTML = "";
              break;
          }
    });

    $inputPrice.addEventListener("blur", function(){
        switch (true) {
            case !$inputPrice.value.trim():
                $inputPriceErrors.innerHTML = "Debes ingresar un precio";
                $inputPrice.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            default:
                $inputPrice.style.background = 'white'
                $inputPriceErrors.innerHTML = "";
        }
    });

    $description.addEventListener("blur", function() {
        switch (true) {
            case !$description.value.trim():
                $descriptionErrors.innerHTML = "Debe ingresar una descripción";
                $description.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            case !regLongDescription.test($description.value):
                $descriptionErrors.innerHTML = "Debe ingresar una descripción de al menos 20 caracteres";
                $description.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            default:
                $description.style.backgroundColor = 'white'
                $descriptionErrors.innerHTML = "";
        }
    });

    $minReq.addEventListener("blur", function(){
        switch (true) {
            case !$minReq.value.trim():
                $minReqErrors.innerHTML = "Debe ingresar al menos un requisito mínimo"
                $minReq.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            case !regLongName.test($minReq.value):
                $minReqErrors.innerHTML = "Debe tener más de 5 caracteres"
                $minReq.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            default:
                $minReq.style.backgroundColor = 'white'
                $minReqErrors.innerHTML = "";
                break;
            }
    });

    $maxReq.addEventListener("blur", function(){
        switch (true) {
            case !$maxReq.value.trim():
                $maxReqErrors.innerHTML = "Debe ingresar al menos un requisito máximo"
                $maxReq.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            case !regLongName.test($maxReq.value):
                $maxReqErrors.innerHTML = "Debe tener más de 5 caracteres"
                $maxReq.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                break;
            default:
                $maxReq.style.backgroundColor = 'white'
                $maxReqErrors.innerHTML = "";
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

    $selectSubcategory.addEventListener("blur", function(){
        if ( !$selectSubcategory.value.trim()) {
            $subcategoryErrors.innerHTML = "Debe seleccionar una subcategoría"
            $selectSubcategory.style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
        } else {
            $selectSubcategory.style.backgroundColor = "white"
            $subcategoryErrors.innerHTML = "";
        }
    });

    $form.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        let elementosForm = this.elements
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == "" 
                                        && elementosForm[index].name !== "offers" 
                                        && elementosForm[index].name !== "key" 
                                        && elementosForm[index].name !== "videoURL" 
                                        && elementosForm[index].name !== "recommendedProcessor" 
                                        && elementosForm[index].name !== "recommendedRam"
                                        && elementosForm[index].name !== "imagenProducto2"
                                        && elementosForm[index].name !== "imagenProducto3"
                                        && elementosForm[index].name !== "imagenProducto4"
                                        && elementosForm[index].name !== "imagenProducto5"){
                elementosForm[index].style.backgroundColor = 'rgba(255, 126, 126, 0.466)'
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;           
            }
        }   
        if(!error){
            $form.submit()
        }   
    });

    $file1.addEventListener('change', 
    function fileValidation(){
        let filePath = $file1.value,
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i 
        if(!allowefExtensions.exec(filePath)){ 
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file1.value = '';
            return false;
        }else{
            if($file1.files && $file1.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview1.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file1.files[0]);
                $fileErrors.innerHTML = '';
            }
        }
    });

    $file2.addEventListener('change', 
    function fileValidation(){
        let filePath = $file2.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i 
        if(!allowefExtensions.exec(filePath)){ 
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file2.value = '';
            return false;
        }else{
            
            if($file2.files && $file2.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview2.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file2.files[0]);
                $fileErrors.innerHTML = '';
            }
        }
    });

    $file3.addEventListener('change', 
    function fileValidation(){
        let filePath = $file3.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i 
        if(!allowefExtensions.exec(filePath)){ 
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file3.value = '';
            return false;
        }else{
            
            if($file3.files && $file3.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview3.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file3.files[0]);
                $fileErrors.innerHTML = '';
            }
        }
    });

    $file4.addEventListener('change', 
    function fileValidation(){
        let filePath = $file4.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i 
        if(!allowefExtensions.exec(filePath)){ 
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file4.value = '';
            return false;
        }else{
            
            if($file4.files && $file4.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview4.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file4.files[0]);
                $fileErrors.innerHTML = '';
            }
        }
    });

    $file5.addEventListener('change', 
    function fileValidation(){
        let filePath = $file5.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i 
        if(!allowefExtensions.exec(filePath)){ 
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file5.value = '';
            return false;
        }else{
            
            if($file5.files && $file5.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview5.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file5.files[0]);
                $fileErrors.innerHTML = '';
            }
        }
    });
});