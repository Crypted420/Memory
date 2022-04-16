
const person = document.querySelector('#person');
const nav = document.querySelector('.nav');
const recordBtn = document.querySelector('.new-record');
const addContainer = document.querySelector('.add-record');
const recordForm = document.querySelector('#record-form');
const recordClose = document.querySelector('#record-close');

person.addEventListener('mouseover', ()=>{
    nav.style.opacity = '1';
    nav.style.marginTop = '0px';
})
person.addEventListener('mouseout', ()=>{
    nav.style.opacity = '0';
    nav.style.marginTop = '-10px';
})
recordBtn.addEventListener('click', ()=>{
    // addContainer.style.display = 'flex';
    window.history.pushState('Home', 'Home', '/home/create')
    gsap.to(addContainer, {
        duration: 0.1,
        opacity: "1",
        display: 'flex',
        onComplete: function(){
            gsap.to(recordForm, {
                opacity:1,
                y: 0,
                duration: 1,
                ease:'elastic',
                force3D: true
            })
        }
    })
})
recordClose.addEventListener('click', ()=>{
    window.history.pushState('Home', 'Home', '/home')
    gsap.to(recordForm, {
        opacity:0,
        transform: "translateY(-10px)",
        onComplete: function(){
            gsap.to(addContainer, {
                opacity:"0",
                duration: 0.5,
                onComplete: function(){
                    gsap.to(addContainer, {
                        display: "none"
                    })
                }
            })
        }
    })
})

