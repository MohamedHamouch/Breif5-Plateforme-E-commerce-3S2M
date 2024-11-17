
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Récupèration des elements de formulaire
    const subject = document.getElementById('subject');
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const subjectError = document.getElementById('subjectError');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
   
    function clear (){
        subject.value= "";
        fullName.value= "";
        email.value= "";
    }

    let formIsValid = true;
    const subjregex = /^[a-zA-Z]+$/;

    if (subject.value.trim() === '') {
        subjectError.classList.remove('hidden');
        formIsValid = false;
    } else if (!subject.value.trim().match(subjregex)) {
        subjectError.textContent = 'Please enter only letters for the subject.';
        subjectError.classList.remove('hidden');
        formIsValid = false;
    } else {
        subjectError.classList.add('hidden');
    }
    
    const fullName_regex = /^[a-zA-Z]+$/; 
    
    if (fullName.value.trim() === '') {
        nameError.classList.remove('hidden');
        formIsValid = false;
    } else if (!fullName.value.trim().match(fullName_regex)) {
        nameError.textContent = 'Please enter only letters.';
        nameError.classList.remove('hidden');
        formIsValid = false;
    } else {
        nameError.classList.add('hidden');
    }
    
   
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    if (!email.value.match(emailPattern)) {
    emailError.classList.remove('hidden');
    formIsValid = false;
    } else {
    emailError.classList.add('hidden');
    }

    if (formIsValid) {
    window.alert('Votre message a été envoyé avec succès !');
     clear();
    // document.getElementById('contactForm').reset();
    }
    });
    