$(document).ready(function () {
    var dados = [];

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        type: "get",
        data: dados,
        crossDomain: true,
        processData: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            $.each(data, function (data, usuario) {
                // $('#lista-usuarios').append('<a href="#" class="usuario list-group-item list-group-item-action" user_id = ' + usuario.id + '>' + usuario.name + '</a>');
                $('#lista-usuarios').append('<option value="' + usuario.id + '">' + usuario.name + '</option>');
            });
        },
        error: function () {
            msg.text("Erro ao fazer requisição");
        }
    });


    $.ajax({
        url: 'http://localhost:8091/debitos',
        type: "get",
        data: dados,
        processData: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            if(data.length <= 0){
                $('.side1').append('<small class="text-muted">Nenhuma divida cadastrada</small>');
            }
            $.each(data, function (data, debito) {
                url = 'https://jsonplaceholder.typicode.com/users/' + debito.id_usuario;
                $.get( url, function( usuario ) {
                    $('#usuarios_cadastrados').append('<li onclick="abrir_divida_cadastrada(' + debito.id + ')" class="list-group-item list-group-item-action usuario_cadastrado list-group-item-info" usuario_cadastrado_id ="' + usuario.id + '">' + usuario.name + '</li>');
                });
            });
        },
        error: function () {
            msg.text("Erro ao fazer requisição");
        }
    });



    $(".usuario").on("click", function () {
        $('#nome').val($('#lista-usuarios option:selected').text());

        $('#id_usuario[value]').val($(this).val());


    });   


    $(document).on( 'click', '#salvar_debito', function(e){
        e.preventDefault();
        var data = {};
        var aux = $("#valor").val();

        data['motivo'] = $("#motivo").val();
        data['id_usuario'] = $("#id_usuario").val();
        data['data'] = $("#date").val();
        data['valor'] = price_to_number(aux);

        if($('#nome').val() <= 0 || $('#motivo').val() <= 0 || $('#valor').val() <= 0 || $('#date').val() <= 0){
            swal("Campos Obrigatórios", "Todos os campos são obrigatórios", "error");
            return 0;
        }

        if($('#id_divida').val() == ''){
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8091/debitos',
                data: JSON.stringify(data),
                crossDomain: false,
                contentType:"application/json; charset=utf-8",
                success: function(result){
                    if(result != null){
                        swal("Sucesso", "Divida cadastrada com sucesso", "success");
                        setTimeout(function() {
                            window.location.reload();
                        }, 1500);
                    }else {
                        swal("Erro", "Não foi possivel cadastrar esta divida", "error");
                    }
                }
            });
        } else {
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:8091/debitos/' + $('#id_divida').val(),
                data: JSON.stringify(data),
                crossDomain: false,
                contentType:"application/json; charset=utf-8",
                success: function(result){
                    if(result != null){
                        swal("Sucesso", "Divida atualizada com sucesso", "success");
                        setTimeout(function() {
                            window.location.reload();
                        }, 1500);
                    }else {
                        swal("Erro", "Não foi possivel atualizar esta divida", "error");
                    }
                }
            });
        }
    });

    $(document).on( 'click', '#excluir_debito', function(e){
        e.preventDefault();

        if($('#id_divida').val() <= 0){
            swal("Impossível excluir", "A divida não foi selecionada", "error");
            return 0;
        }
        id_divida = $('#id_divida').val();
        url = 'http://localhost:8091/debitos/' + id_divida;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function(result){
                swal("Sucesso", "Divida excluida com sucesso", "success");
                setTimeout(function() {
                    window.location.reload();
                }, 1500);
            }
        });
    });

    $(document).on( 'click', '#cancelar', function(e){
        e.preventDefault();
        window.location.reload();
    });

    $('.date').mask('11/11/1111');
    $('.time').mask('00:00:00');
    $('.date_time').mask('00/00/0000 00:00:00');
    $('.cep').mask('00000-000');
    $('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 0000-0000');
    $('.phone_us').mask('(000) 000-0000');
    $('.mixed').mask('AAA 000-S0S');
    $('.cpf').mask('000.000.000-00', {reverse: true});
    $('.money').mask('000.000.000.000.000,00', {reverse: true});

});


function abrir_divida_cadastrada (id){
    url = 'http://localhost:8091/debitos/' + id;
    var dados = [];
    $.ajax({
        url: url,
        type: "get",
        data: dados,
        processData: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            url = 'https://jsonplaceholder.typicode.com/users/' + data.id_usuario;
            $.get( url, function( usuario ){
                $('#nome').val(usuario.name);
            });
            $('#id_divida').val(data['id']);
            $("#motivo").val(data['motivo']);
            $("#id_usuario").val(data['id_usuario']);
            $("#date").val(data['data']);
            $("#valor").val(data['valor']);
            $("#lista-usuarios").attr('disabled', 'disabled');
        },
        error: function () {
            msg.text("Erro ao fazer requisição");
        }
    });
};


function price_to_number(v){
    if(!v){return 0;}
    v=v.split('.').join('');
    v=v.split(',').join('.');
    return Number(v.replace(/[^0-9.]/g, ""));
}