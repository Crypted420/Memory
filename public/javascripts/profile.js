const edit_profile = document.getElementById('edit-profile')
const edit_profileContainer = document.querySelector('.edit-profile-container');
const editForm = document.querySelector('#edit-form');
const edit_close = document.querySelector('.edit-close');
edit_profile.addEventListener('click', ()=>{
    gsap.to(edit_profileContainer, {
        display:"flex",
        onComplete: function(){
            gsap.to(editForm, {
            duration:0.5,
            opacity:1,
            transform: "scale(1)",
            ease:"back",
            force3D: true
            })
        }
    })
});
edit_close.addEventListener('click', ()=>{
    // edit_profileContainer.style.display = 'none';
    gsap.to(editForm, {
        duration:0.5,
        opacity:0,
        transform: "scale(1.2)",
        ease:"back",
        force3D: true,
        onComplete: function(){
            gsap.to(edit_profileContainer, {
                display:"none",
                duration: 0.1,
                onComplete: function(){
                    gsap.to(editForm, {
                        transform:"scale(0.7)"
                    })
                }
            })
        }
    })
});