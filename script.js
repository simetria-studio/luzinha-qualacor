// Função para preencher o tamnho do height e width automaticamente
function cols_img_color(width, height){
    if(width < height){
        $('.back-3').find('.images').removeClass('col-2');
        $('.back-3').find('.colors').removeClass('col-2');
        $('.back-3').find('.images').addClass('col-4');
        $('.back-3').find('.colors').addClass('col-4');
    }else{
        $('.back-3').find('.images').removeClass('col-4');
        $('.back-3').find('.colors').removeClass('col-4');
        $('.back-3').find('.images').addClass('col-2');
        $('.back-3').find('.colors').addClass('col-2');
    }
}

// Ativa o erro
function erro(){
    var soma = 0;
    var reload_tremer = setInterval(() => {
        soma++;
        $('.back-3').addClass('tremer-left');
        $('.back-3').removeClass('tremer-right');

        setTimeout(() => {
            $('.back-3').addClass('tremer-right');
            $('.back-3').removeClass('tremer-left');

            if(soma == 6){
                clearInterval(reload_tremer);
                $('.back-3').removeClass('tremer-right');
                $('.back-3').removeClass('tremer-left');
            }
        }, 50);
    }, 100);
}

// Faz o violino dançar
function danca_violino(){
    return setInterval(() => {
        $('.rotate-left').addClass('rotate-n-30');
        $('.rotate-left').removeClass('rotate-p-30');
        $('.rotate-right').addClass('rotate-p-30');
        $('.rotate-right').removeClass('rotate-n-30');

        setTimeout(() => {
            $('.rotate-left').addClass('rotate-p-30');
            $('.rotate-left').removeClass('rotate-n-30');
            $('.rotate-right').addClass('rotate-n-30');
            $('.rotate-right').removeClass('rotate-p-30');
        }, 1500);
    }, 3000);
}

// Criando variavel vazia para adcionar o violino
var reload_rotate = '';

// Ativando funções extras
$(function(){
    var width = $(window).width();
    var height = $(window).height();

    $('.back').find('section').css({
        'width': width+'px',
        'height': height+'px'
    });

    cols_img_color(width, height);

    reload_rotate = danca_violino();
});

// Quando girar o celular girar a tela
$(window).on('orientationchange',function(){
    var width = $(window).width();
    var height = $(window).height();

    $('.back').find('section').css({
        'width': height+'px',
        'height': width+'px'
    });

    cols_img_color(width, height);
});
// Quando ouver mudança no tamnho da tela atualizar o tamnho do block
$(window).on('resize',function(){
    var width = $(window).width();
    var height = $(window).height();

    $('.back').find('section').css({
        'width': width+'px',
        'height': height+'px'
    });

    cols_img_color(width, height);
});

// Essa função serve para distribuir a imagem aleatoriamente
function img_color(){
    // Imagens de violinos com cores
    var imgs = [
        '<img data-color="#FF0000" src="./img/Ativo-2-1.svg" alt="">',
        '<img data-color="#06A429" src="./img/Ativo-2-2.svg" alt="">',
        '<img data-color="#4200FF" src="./img/Ativo-2-3.svg" alt="">',
        '<img data-color="#FEDA00" src="./img/Ativo-2-4.svg" alt="">',
        '<img data-color="#7D277E" src="./img/Ativo-2-5.svg" alt="">',
        '<img data-color="#F36D21" src="./img/Ativo-2-6.svg" alt="">'
    ];
    // Cores dos violinos
    var colors = [
        '<div class="color-block flex-center-geral"><div data-color="#4200FF" class="btn-color" style="background: #4200FF;"></div><div class="color-name">AZUL</div></div>',
        '<div class="color-block flex-center-geral"><div data-color="#FF0000" class="btn-color" style="background: #FF0000;"></div><div class="color-name">VERMELHO</div></div>',
        '<div class="color-block flex-center-geral"><div data-color="#06A429" class="btn-color" style="background: #06A429;"></div><div class="color-name">VERDE</div></div>',
        '<div class="color-block flex-center-geral"><div data-color="#F36D21" class="btn-color" style="background: #F36D21;"></div><div class="color-name">LARANJA</div></div>',
        '<div class="color-block flex-center-geral"><div data-color="#FEDA00" class="btn-color" style="background: #FEDA00;"></div><div class="color-name">AMARELO</div></div>',
        '<div class="color-block flex-center-geral"><div data-color="#7D277E" class="btn-color" style="background: #7D277E;"></div><div class="color-name">ROXO</div></div>'
    ];

    // Imagens
    for(var i=1; i < 7; i++){
        const imgPosition = Math.floor(Math.random() * imgs.length);
        $('.back-3 .img-cor-'+i).html(imgs[imgPosition]);
        imgs.splice(imgPosition, 1);
    }
    // Cores
    for(var i=1; i < 7; i++){
        const colorPosition = Math.floor(Math.random() * colors.length);
        $('.back-3 .color-'+i).html(colors[colorPosition]);
        colors.splice(colorPosition, 1);
    }
}

// Iniciado o droppable
function iniciar_dropp(){
    $( ".colors" ).find('.btn-color').draggable({
        revert: "invalid"
    });
    // Ativar evento caso esteje o botão por cima
    var totalAcertos = 0;
    $(".images").droppable({
        drop: function( event, ui ) {
            // quando a cor estiver em cima do violino
            if(ui){
                var color_img = $(this).find('img').attr('data-color'); // Pega a cor em hexadecimal
                var color = ui.draggable.attr('data-color'); // Pega a cor em hexadecimal
                // Vericamos se a cor estiver certa continua
                if(color_img == color){
                    ui.draggable.addClass('max'); // Colocamos um efeiti de auemnto
                    ui.draggable.parent().find('.color-name').css('visibility', 'hidden'); // Escondemos o nome
                    // Setamos um tempo para esconder a cor e violino
                    setTimeout(()=>{
                        ui.draggable.addClass('minus'); // Animação para diminuir
                        // Segundo tempo
                        setTimeout(()=>{
                            ui.draggable.css('visibility', 'hidden'); // Escondemos a cor
                            $(this).find('img').css('visibility', 'hidden'); // Escondemos o violino

                            totalAcertos++; // Soma quantas vezes acertou a cor
                            // Se tiver todas certas, avisa que certou todas
                            if(totalAcertos == 6){
                                totalAcertos = 0; // zeramos a contagem
                                setTimeout(()=>{
                                    // Trocamos o texto para dar o parabens
                                    $('.back-2').find('.back-title').text('Parabéns você acertou todas!');
                                    // Escondemos o jogo e abrimos o texto inicial dando os parabens
                                    $('.back-3').hide( 'slide', {}, 1000, function() {
                                        $('.back-2').show('slide', {}, 1000, function(){
                                            // Setamos outro tempo para iniciar o jogo
                                            setTimeout(()=>{
                                                $('.back-2').hide('slide', {}, 1000, function(){
                                                    // Setamos outro tempo para iniciar o jogo
                                                    $('.back-1').show('slide', {}, 1000, function() {
                                                        $('.back-1').css('display', 'flex');
                                                    });
                                                    $('.back-1').css('display', 'flex');

                                                    // Trocamos a palvra
                                                    $('.back-2').find('.back-title').text('Qual é a cor?');
    
                                                    img_color(); // Resetando o jogo
                                                });
                                            },1000);
                                        });
                                    });
                                }, 500);
                            }
                        }, 300);
                    }, 300);
                }else{ // Casoa  cor não esteje certa
                    erro();
                    iniciar_dropp();
                    // setTimeout(()=>{
                    //     $('.back-3').hide( 'slide', {}, 1000, function() {
                    //         $('.back-2').hide('slide', {}, 1000, function(){
                    //             // Setamos outro tempo para iniciar o jogo
                    //             $('.back-1').show('slide', {}, 1000, function() {
                    //                 $('.back-1').css('display', 'flex');
                    //             });
                    //             $('.back-1').css('display', 'flex');

                    //             img_color(); // Resetando o jogo
                    //         });
                    //     });
                    // },2000);
                }
            }
        }
    });
}

$(document).ready(function(){
    $(img_color()); // Chamaos a função quando carrega a pagina
    $(iniciar_dropp()); // Chamaos a função quando carrega a pagina
    // Carregando o jogo
    setTimeout(()=>{
        // Função para iniciar o jogo
        $('.back-2').hide( 'slide', {}, 1000, function() {
            $('.back-3').show('slide', {}, 1000);
        });
    }, 1500);
    // Iniciar o Jogo novamente
    $(document).on('click', '#play', function(){
        iniciar_dropp(); // iniciado a função novamente
        reload_rotate = danca_violino();
        
        $('.back-1').hide( 'slide', {}, 1000, function() {
            $('.back-2').show('slide', {}, 1000, function(){
                setTimeout(()=>{
                    $('.back-2').hide( 'slide', {}, 1000, function() {
                        $('.back-3').show('slide', {}, 1000);
                    });
                }, 1000);
            });
        });
    });
});