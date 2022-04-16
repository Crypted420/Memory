var icon = document.querySelector('.code');
var bi = document.querySelector('.biCode');
var footers = document.querySelectorAll('.footers');
var checkmate = false;
icon.addEventListener('click', ()=>{
    if(!checkmate){
        bi.classList.remove('bi-code');
        bi.classList.add('bi-x-lg');
        bi.classList.add('circle');
        bi.classList.remove('circle-rm');

        gsap.to(footers, {
            duration:1,
            transform: 'translateY(0px)',
            ease: 'back',
            yoyo:true,
            stagger:0.5
        });
        checkmate = true;
    }
    else{
        bi.classList.add('bi-code');
        bi.classList.remove('bi-x-lg');
        bi.classList.remove('circle');
        bi.classList.add('circle-rm');
        gsap.to(footers, {
            duration:1,
            opacity:0,
            ease: 'power4',
            yoyo: true,
            stagger:0.5,
            onComplete: function(){
              gsap.to(footers, {
                transform: 'translateY(100px)',
                opacity:1
            });
            }
        });
        checkmate = false; 
    }
});
document.querySelector('.header').onclick = () => window.location = '/';
