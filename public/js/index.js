window.onload = () => {

    document.addEventListener('click', (event) => {
        let objeto = event.target;
        let idElemento = objeto.getAttribute('id');
        console.log(objeto)
        if (idElemento === 'hamburguer-icon'){
            document.getElementById('hamburguer').style.display = 'flex'
        } else if (idElemento=== 'active2') {       
            showHideCategories('active2', 'active', 'active3')
            showHide('top-sales', 'newest', 'discover-games')
        } else if (idElemento=== 'active3') {       
            showHideCategories('active3', 'active2', 'active')
            showHide('newest', 'top-sales', 'discover-games')
        } else if (idElemento=== 'active') {            
            showHideCategories('active', 'active2', 'active3')
            showHide('discover-games', 'newest', 'top-sales')
        } else if (idElemento === 'jajamacri') {
            document.getElementById('register-card').style.display = 'flex'
        } else if (idElemento === 'close') {
            document.getElementById('register-card').style.display = 'none'
        } else if(idElemento !== 'hamburguer') {
            document.getElementById('hamburguer').style.display = 'none'
        } 
    })

}

function showHideCategories (idShow, idHide, idHide2) {
    document.getElementById(idShow).style.backgroundColor = '#807c7c36'
    document.getElementById(idHide).style.backgroundColor = 'rgba(0, 0, 0, 0)'
    document.getElementById(idHide2).style.backgroundColor = 'rgba(0, 0, 0, 0)'
}

function showHide (idShow, idHide, idHide2) {
    document.getElementById(idShow).style.display = 'flex'
    document.getElementById(idHide).style.display = 'none'
    document.getElementById(idHide2).style.display = 'none'
}