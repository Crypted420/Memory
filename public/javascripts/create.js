document.querySelector('.bi-arrow-left-short').onclick = ()=>{
    window.location = '/user/login'
}
document.querySelector('#create-form').onsubmit = () => {
    document.querySelector('.create-btn').value = 'Please wait...'
}
var create_eye = document.querySelector('.create_eye');
var create_input = document.querySelector('#password-c')
var checker = false;
create_eye.onclick = () => {
    if(!checker){
        create_input.type = 'text';
        create_eye.classList.remove('bi-eye');
        create_eye.classList.add('bi-eye-slash');
        checker = true;
    }
    else{
        create_input.type = 'password';
        create_eye.classList.add('bi-eye');
        create_eye.classList.remove('bi-eye-slash');
        checker = false;

    }

}
gsap.from('.message', {
    opacity:0,
    transform: 'translateX(100px)',
    duration:1,
    ease:'elastic',
    onComplete: function(){
        gsap.to('.message', {
            opacity:0,
            ease:'power1',
            duration:1,
            delay:1
        })
    }
})

gsap.from('.mobile-message', {
    opacity:0,
    duration:1,
    ease:'power.4',
    onComplete: function(){
        gsap.to('.mobile-message', {
            opacity:0,
            ease:'power1',
            duration:1,
            delay:1
        })
    }
})