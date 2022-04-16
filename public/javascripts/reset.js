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
    ease:'power4',
    onComplete: function(){
        gsap.to('.mobile-message', {
            opacity:0,
            ease:'power1',
            duration:1,
            delay:3
        })
    }
})
