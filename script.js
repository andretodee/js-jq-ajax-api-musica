$(document).ready(function(){

    // preparo la funzione per il template di handlebars
    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);

    // preparo le variabili per il template di handlebars
    // var context = {
    //     copertina: "",
    //     titolo: "new jersey",
    //     author: "bon jovi",
    //     year: "1988"
    // };
    // var html    = template(context);

    // appendo l'html compilato con le variabili
    // $('.cds-container').append(html);

    //chiamata ajax per recuperare i dischi da visualizzare
    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/array/music',
        'method': 'get',
        'success': function(data){
            // recupero l'array che contiene tutti i dischi
            var dischi = data.response;

            // ciclo tutti i dischi
            for (var i = 0; i < dischi.length; i++) {
                // recupero il disco corrente
                var disco = dischi[i];
                // per ogni disco, recupero le varie informazioni
                var imgCopertina = disco.poster;
                var titoloDisco = disco.title;
                var autoreDisco = disco.author;
                var annoDisco = disco.year;
                var genereDisco = disco.genre;
                // creo le variabili di Handlebars
                var context = {
                    copertina: imgCopertina,
                    titolo: titoloDisco,
                    author: autoreDisco,
                    year: annoDisco,
                    genere: genereDisco
                };
                // creo il template
                var html = template(context);
                // lo appendo al contenitore dei dischi
                $('.cds-container').append(html);


            }
        },
        'error':function(){
            alert('error');
        }
    });

    // select
    // intercetto il click sulla select che per le tendine a scelta si usa il change
    $('#scegli-genere').change(function(){

        // intercetto l'option selezionato
        var genereSelezionato = $('#scegli-genere').val();

        //per ogni disco(each) verifico se il suo genere corrisponde al genere genereSelezionato
        $('.cd').each(function(){
            // intercetto il genere del disco Selezionato
            var genereDiscoSelezionato = $(this).attr('data-genere');

            //se il genere del disco è == al genere selezionato lo mostro
            if(genereDiscoSelezionato.toLowerCase() == genereSelezionato.toLowerCase()){
                $(this).fadeIn();
            } else {
                //altrimenti lo nascondo
                $(this).fadeOut();
            }
        });




    });



});
