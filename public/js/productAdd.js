function previewBeforeUpload(id) {
    document.querySelector("#"+id).addEventListener("change", function(e){
        if(e.target.files.length == 0){
            return;
        }
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        document.querySelector("#"+id+"-preview img").src = url;
    });
}

previewBeforeUpload("file-1");
previewBeforeUpload("file-2");
previewBeforeUpload("file-3");
previewBeforeUpload("file-4");
previewBeforeUpload("file-5");

/* NAVEGACIÓN POR PESTAÑAS */

const targets = document.querySelectorAll('[data-target]');
const content = document.querySelectorAll('[data-content]');

targets.forEach(target => {

    target.addEventListener('click', () => {

        content.forEach(c => {
            c.classList.remove('active')
        })

        const t = document.querySelector(target.dataset.target)
        t.classList.add('active')
    })
});