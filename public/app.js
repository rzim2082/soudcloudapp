
//Issue: sometimes pause does not work following next or random
//I think it has to do with a scoping issue 

$('document').ready(function(){
    //initialize and gain access to soundcloud
    SC.initialize({client_id: 'f665fc458615b821cdf1a26b6d1657f6'});

});



var jukeBox = {

   

    //state
    songList: [],
    songIndex: 0,
    keyword: '',
    //this is the access to the sc stream api
    playerMethods: undefined,
    songCount: '',
    pauseOrPlay: '',

    //event handlers that will be assigned during initialization
    // searchClick: '',
    // searchEnter: '',
    // nextClick: '',
    // pauseClick: '',
    // playClick: '',
    // randomClick: '',



    //View connections
    image: document.getElementById('image'),
    songTitle: document.getElementById('songTitle'),
    songArtist: document.getElementById('songArtist'),


    //action for search 
    searchClick: $('#search').on('click', function(){

        jukeBox.keyword = $('#input').val();
        var inp = document.getElementById('input');
        inp.value = '';
        console.log(jukeBox.keyword);
        
        SC.get('/tracks', {q: jukeBox.keyword}).then(function(response){
            
            jukeBox.songList = response;
            jukeBox.play();
            //jukeBox.songCounter();
        });

    }),

    searchEnter: $('#input').keypress(function(key){

        if(key.which === 13){

            $('#search').click();
        }

    }),

    //main play action
    play: function(){
        //console.log(jukeBox.songList[jukeBox.songIndex].id);
        //needed to reset methods because of issue with next button
        //jukeBox.playerMethods = '';
        

        SC.stream('/tracks/' + jukeBox.songList[jukeBox.songIndex].id).then(function(player){

            //gives access to the sc stream api methods
            jukeBox.playerMethods = player;
            jukeBox.playerMethods.play();
            jukeBox.playerMethods.on('finish', function(){
                jukeBox.next();
            });
            jukeBox.songCounter();
            jukeBox.renderChanges(jukeBox.songList[jukeBox.songIndex]);
        });


        
        // SC.stream('/tracks/' + jukeBox.songList[jukeBox.songIndex].id).then(function(player){

        //     //gives access to the sc stream api methods
        //     jukeBox.playerMethods = player;
        //     jukeBox.playerMethods.play();
        //     jukeBox.playerMethods.on('finish', function(){
        //         jukeBox.next();
        //     })
        //     jukeBox.songCounter();
        //     jukeBox.renderChanges(jukeBox.songList[jukeBox.songIndex]);
        // });

        

    },

    next: function(){

        if(jukeBox.songIndex === jukeBox.songList.length - 1){

            jukeBox.songIndex = 0;
            jukeBox.play();

        }else {

            jukeBox.songIndex++;
            jukeBox.play();

        }


    },

    previous: function(){

        if(jukeBox.songIndex === 0){

            jukeBox.songIndex = jukeBox.songList.length -1;
            jukeBox.play();

        }else {

            jukeBox.songIndex--;
            jukeBox.play();

        }

    },

    previousClick: $("#previous").on('click', function(){

        jukeBox.previous();

    }),

    nextClick: $('#next').on('click', function(){

        jukeBox.next();

    }),

    // pauseClick: $('#pause').on('click', function(){

    //     jukeBox.playerMethods.pause();
        
    // }),

    pauseClick: $('#pause').on('click', function(){

        jukeBox.pauseOrPlay = 'paused';
        jukeBox.playerMethods.pause();
       

    }),

    playClick: $('#play').on('click', function(){

        jukeBox.playerMethods.play();

    }),

    randomClick: $('#random').on('click', function(){

        var randomNumber = Math.floor(Math.random() * (jukeBox.songList.length - 1));
        jukeBox.songIndex = randomNumber;
        jukeBox.play();

    }),

    songCounter: function(){

        var song;
        var songs = jukeBox.songList.length - 1;


        if(jukeBox.songIndex === jukeBox.songList.length - 1){
            song = jukeBox.songIndex;
        }else{
            song = jukeBox.songIndex + 1;
        }

        $('#songCount').html('Playing song ' + song + ' of ' + songs);

    },


    //view renderer

    setImage: function(img){
        jukeBox.image.style.backgroundImage = 'url(' + img + ')';
    },

    setSongTitle: function(title){
        jukeBox.songTitle.innerHTML = title;

    },

    setArtist: function(artist){
        jukeBox.songArtist.innerHTML = artist;

    },

    renderChanges: function(obj){
        jukeBox.setImage(obj.user.avatar_url); 
        jukeBox.setSongTitle(obj.title);
        jukeBox.setArtist(obj.user.username);

    }

    // init: $('document').ready(function(){
    //     SC.initialize({client_id: 'f665fc458615b821cdf1a26b6d1657f6'});
    //     jukeBox.searchClick = $('#search').on('click', function(){

    //         jukeBox.keyword = $('#input').val();
    //         var inp = document.getElementById('input');
    //         inp.value = '';
    //         console.log(jukeBox.keyword);
            
    //         SC.get('/tracks', {q: jukeBox.keyword}).then(function(response){
                
    //             jukeBox.songList = response;
    //             jukeBox.play();
    //             //jukeBox.songCounter();
    //         });

    //     });

    //     jukeBox.searchEnter = $('#input').keypress(function(key){

    //         if(key.which === 13){

    //             $('#search').click();
    //         }

    //     });

    //     jukeBox.nextClick = $('#next').on('click', function(){

    //         jukeBox.next();

    //     });

    //     jukeBox.pauseClick = $('#pause').on('click', function(){

    //         jukeBox.playerMethods.pause();

    //     });

    //     jukeBox.playClick = $('#play').on('click', function(){

    //         jukeBox.playerMethods.play();

    //     });

    //     jukeBox.randomClick = $('#random').on('click', function(){

    //         var randomNumber = Math.floor(Math.random() * (jukeBox.songList.length - 1));
    //         jukeBox.songIndex = randomNumber;
    //         jukeBox.play();

    //     });


    // }),


}


Object.setPrototypeOf(jukeBox, SC);

