var login_eye = document.querySelector('.login_eye');
var login_input = document.querySelector('#password-l');
var checker = false;
login_eye.onclick = () => {
    if(!checker){
        login_input.type = 'text';
        login_eye.classList.remove('bi-eye');
        login_eye.classList.add('bi-eye-slash');
        checker = true;
    }
    else{

        login_input.type = 'password';
        login_eye.classList.add('bi-eye');
        login_eye.classList.remove('bi-eye-slash');
        checker = false
    }

}

document.querySelector("#login-form").onsubmit = () => {
  document.querySelector(".password").value = "signing in..."
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
