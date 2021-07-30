window.onload = () => {

    document.addEventListener('click', (event) => {
        let objeto = event.target;
        let idElemento = objeto.getAttribute('id');
        console.log(objeto)
        if (idElemento === 'hamburguer-icon'){
            document.getElementById('hamburguer').style.display = 'flex'
        } else if (idElemento=== 'active2') {            
            document.getElementById('active2').style.backgroundColor = '#807c7c36'
            document.getElementById('active').style.backgroundColor = 'rgba(0, 0, 0, 0)'
            document.getElementById('active3').style.backgroundColor = 'rgba(0, 0, 0, 0)'
        } else if (idElemento=== 'active3') {            
            document.getElementById('active2').style.backgroundColor = 'rgba(0, 0, 0, 0)'
            document.getElementById('active').style.backgroundColor = 'rgba(0, 0, 0, 0)'
            document.getElementById('active3').style.backgroundColor = '#807c7c36'
        } else if (idElemento=== 'active') {            
            document.getElementById('active2').style.backgroundColor = 'rgba(0, 0, 0, 0)'
            document.getElementById('active').style.backgroundColor = '#807c7c36'
            document.getElementById('active3').style.backgroundColor = 'rgba(0, 0, 0, 0)'
        } else if(idElemento !== 'hamburguer'){
            document.getElementById('hamburguer').style.display = 'none'
        }
    })

}