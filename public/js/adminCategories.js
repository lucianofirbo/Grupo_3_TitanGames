const BASE_URL = "http://localhost:3000/api/";
let $subcategoriesSelect = document.querySelector('.subcategorySelect');
let $categoriesSelect = document.querySelector('.categorySelect');

function handlerCategory(id){
    fetch(`${BASE_URL}categories/${id}`)
    .then(res => res.json())
    .then(result => {
        let category = result.data
        let subcategories = category.subCategory;
        for (let index=  0; index < subcategories.length; index++){
            $subcategoriesSelect.innerHTML += `<option value="${subcategories[index].id}">${subcategories[index].name}</option>`
        }
    })
}

$categoriesSelect.addEventListener('change', function(e){
    $subcategoriesSelect.innerHTML = ""
    handlerCategory(e.target.value)
})