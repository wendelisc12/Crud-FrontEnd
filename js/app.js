function submitEdit(){
    let contato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataNascimento: document.getElementById('nascimento').value
    }

    let id = document.getElementById('id').value
    fetch('http://api.josinon.codes/api/contatos/'+id, {
        method: 'PUT',
        body: JSON.stringify(contato),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(response => {
        renderTable()
        successMessage("Seu cadastro foi editado!")
    })
}

function renderEdit(id){

    fetch('http://api.josinon.codes/api/contatos/' + id)
    .then(response => response.json())
    .then( contato => {
        rootElement = document.querySelector('#root')
        rootElement.innerHTML = `
                <form>
                    <input id="id" type="hidden" value="${contato.id}">
                    <div class="row">
                    <div class="input-field col s6">
                        <input id="nome" type="text" class="validate" value="${contato.nome}">
                        <label for="nome" class="active">Nome</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="email" type="email" class="validate" value="${contato.email}">
                        <label for="email" class="active">Email</label>
                    </div>
                    </div>
    
                    <div class="row">
                    <div class="input-field col s6">
                        <input id="telefone" type="tel" class="validate" value="${contato.telefone}">
                        <label for="telefone" class="active">Telefone</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="nascimento" type="date" class="validate" value="${contato.nascimento}">
                        <label for="nascimento" class="active">Data de Nascimento</label>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col s4"></div>
                    <div class="col s4"></div>
                    <div class="col s4">
                        <a onClick="submitEdit()" class="waves-effect waves-light btn"><i class="material-icons">save</i>  Salvar</a>
                        <a onClick= "renderTable()" class="waves-effect waves-light btn red lighten-2"><i class="material-icons">cancel</i>  Cancelar</a>
                    </div>
                        
                    </div>
    
    
    
                </form>
        `
    })


   
}

function deleteContato(id){
    fetch('http://api.josinon.codes/api/contatos/'+id, {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(response => {
        renderTable()
        successMessage("Seu cadastro foi deletado salvo!")
    })
}

function renderDetalhes(id){

    fetch('http://api.josinon.codes/api/contatos/' + id)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        rootElement = document.querySelector('#root')
        rootElement.innerHTML = `
                    <div id="detalhes-contato">
                        <ul>
                            <li><i class="material-icons" >person</i><span>Nome:  </span> <span class="detalhes"> ${response.nome}</span></li>
                            <li><i class="material-icons" >email</i> <span>Email: </span><span class="detalhes"> ${response.email}</span></li>
                            <li><i class="material-icons" >local_phone</i> <span>Telefone: </span><span class="detalhes"> ${response.telefone}</span></li>
                            <li><i class="material-icons" >date_range</i><span>Data de nascimento: </span><span class="detalhes"> ${response.dataNascimento}</span></li>
                        </ul>

                        <a onClick=renderTable() href="#" class="btn blue darken-1"><i class="material-icons ">arrow_back</i> Voltar</a>
                    </div>
        `
    })
}

function renderRows(contatos){

    let rows = ''

    for (const contato of contatos) {
        let row = `
            <tr>
                <td><a onClick=renderDetalhes(${contato.id}) href="#"> ${contato.nome} </a></td>
                <td>${contato.email}</td>
                
                <td>
                <a onClick=renderEdit(${contato.id}) href="#"><i class="material-icons">edit</i></a>
                <a onClick=deleteContato(${contato.id}) href="#"><i class="material-icons">delete</i></a>
                </td>
            </tr>
        `

        rows += row
    }
    return rows
}

function renderTable(){

    fetch('http://api.josinon.codes/api/contatos/')
    .then( response => response.json())
    .then( contatos => {
        rootElement = document.querySelector('#root')

        let rows = renderRows(contatos)

        rootElement.innerHTML = `
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Opções</th>
                    </tr>
                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>
                </table> 
        
        `
    }).catch(Erro => {
        errorMessage("Não foi possível carregar, tente novamente")
    })
}

function successMessage(message){
    M.toast( {
        html: message,
        classes: 'rounded green lighten-1'
    })
}

function errorMessage(message){
        M.toast({
          html: message,
          classes: 'rounded red lighten-1'
        })
}

function submitForm(){
    
    let contato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataNascimento: document.getElementById('nascimento').value
    }

    fetch('http://api.josinon.codes/api/contatos/', {
        method: 'POST',
        body: JSON.stringify(contato),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(response => {
        renderTable()
        successMessage("Seu cadastro foi salvo!")
    }).catch(Erro => {
        errorMessage("Não foi possível adicionar um novo contato, tente novamente")
        renderTable()
    })

}

function renderForm(){
    rootElement = document.querySelector('#root')
    rootElement.innerHTML = `
            <form>
                <div class="row">
                <div class="input-field col s6">
                    <input id="nome" type="text" class="validate">
                    <label for="nome">Nome</label>
                </div>
                <div class="input-field col s6">
                    <input id="email" type="email" class="validate">
                    <label for="email">Email</label>
                </div>
                </div>

                <div class="row">
                <div class="input-field col s6">
                    <input id="telefone" type="tel" class="validate">
                    <label for="telefone">Telefone</label>
                </div>
                <div class="input-field col s6">
                    <input id="nascimento" type="date" class="validate">
                    <label for="nascimento">Data de Nascimento</label>
                </div>
                </div>
                <div class="row">
                <div class="col s4"></div>
                <div class="col s4"></div>
                <div class="col s4">
                    <a onClick="submitForm()" class="waves-effect waves-light btn"><i class="material-icons">save</i>  Salvar</a>
                    <a onClick= "renderTable()" class="waves-effect waves-light btn red lighten-2"><i class="material-icons">cancel</i>  Cancelar</a>
                </div>
                    
                </div>



            </form>
    
    `
}


document.querySelector('#novoContato').addEventListener('click', renderForm)