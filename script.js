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
    $( ".colors" ).find('.btn-color').draggable();
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
                                $('.div-correto').removeClass('d-none'); // Apesentando os parabes

                                setTimeout(()=>{
                                    $('.div-correto').css('z-index', '0'); // Zerando o z-index
                                    $('.back-1').css('z-index', '50'); // Adiconado z-index pára dar um efeito

                                    // Fazendo aparacer o botão play
                                    $('.back-1').show('slide', {}, 1000, function() {
                                        $('.back-1').css('display', 'flex'); // setando o flex o do botão, bug do jquery-ui

                                        $('.div-correto').addClass('d-none'); // Escondendo os parabens
                                        // Escondendo o joqeuinho
                                        $('.back-3').hide( 'slide', {}, 1000, function() {
                                            img_color(); // Resetando o jogo
                                            iniciar_dropp(); // iniciado a função novamente
                                            $('.div-correto').css('z-index', '50'); // Deixando em 50 o z-index
                                            $('.back-1').css('z-index', '0'); // Retirando o z-index
                                        });
                                    });
                                    $('.back-1').css('display', 'flex'); // setando o flex o do botão, bug do jquery-ui
                                }, 1500);
                            }
                        }, 300);
                    }, 300);
                }else{ // Casoa  cor não esteje certa
                    $('.div-erro').removeClass('d-none');
                    $('.back-3').effect( 'shake', {}, 500, function() {
                        $('.div-erro').addClass('d-none');
                    });
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
        $('.back-3').show( 'slide', {}, 1000, function() {
            $('.back-2').hide('slide', {}, 1000);
        });
    }, 1500);
    // Iniciar o Jogo novamente
    $(document).on('click', '.play', function(){
        reload_rotate = danca_violino();
        
        setTimeout(() => {
            $('.back-2').show( 'slide', {}, 1000, function() {
                $('.back-1').hide('slide', {}, 1000, function(){
                    setTimeout(()=>{
                        $('.back-3').show( 'slide', {}, 1000, function() {
                            $('.back-2').hide('slide', {}, 1000);
                        });
                    }, 500);
                });
            });
        }, 200);
    });
});