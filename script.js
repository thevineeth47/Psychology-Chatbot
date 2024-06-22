document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUpButton');
    const signInButton = document.getElementById('signInButton');
    const signInForm = document.getElementById('signIn');
    const signUpForm = document.getElementById('signup');
    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    const welcomeMessage = document.getElementById('welcome-message');

    const questions = [
        {
            question: "How are you feeling today?",
            options: ["Happy", "Sad", "Anxious", "Angry"]
        },
        {
            question: "What triggered your current mood?",
            options: ["Work/school", "Relationships", "Health", "Other"]
        },
        {
            question: "How would you like to cope with these feelings?",
            options: ["Talk to someone", "Exercise", "Relaxation techniques", "Other"]
        },
        {
            question: "Which statement best describes your sleep patterns?",
            options: [
                "I usually have trouble falling asleep.",
                "I wake up frequently during the night.",
                "I have difficulty staying asleep.",
                "I feel rested and refreshed most mornings."
            ]
        },
        {
            question: "How often do you experience symptoms of anxiety?",
            options: [
                "Rarely or never",
                "Occasionally, in specific situations",
                "Frequently, but it doesn't significantly impact my daily life",
                "Regularly, and it affects my ability to function"
            ]
        },
        {
            question: "How would you rate your overall mood lately?",
            options: [
                "Generally positive",
                "Neutral",
                "Frequently irritable or moody",
                "Sad or depressed most of the time"
            ]
        },
        {
            question: "Do you often feel overwhelmed by responsibilities or obligations?",
            options: [
                "Rarely",
                "Occasionally",
                "Frequently",
                "Most of the time"
            ]
        }
    ];

    const optionRatings = {
        "Happy": "good",
        "Sad": "normal",
        "Anxious": "bad",
        "Angry": "worst",
        // Add ratings for other options
    };

    let currentQuestionIndex = 0;
    const users = [];

    signUpButton.addEventListener('click', () => {
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
    });

    signInButton.addEventListener('click', () => {
        signInForm.style.display = "block";
        signUpForm.style.display = "none";
    });

    function displayMessage(message, isUser) {
        const msgContainer = document.createElement('div');
        msgContainer.classList.add(isUser ? 'user-message' : 'bot-message');
        msgContainer.textContent = message;
        chatMessages.appendChild(msgContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function askQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        displayMessage(currentQuestion.question, false);

        currentQuestion.options.forEach((option, index) => {
            displayMessage(`${index + 1}. ${option}`, false);
        });3
    }

    function handleUserResponse() {
        const userResponse = userInput.value.trim();
        if (userResponse === "") return;

        displayMessage(userResponse, true);

        const selectedOption = userResponse.toLowerCase();
        const rating = optionRatings[selectedOption];

        userInput.value = "";
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            askQuestion();
        } else {
            displayMessage("Thank you for your responses. We will process them and get back to you.", false);
            submitBtn.disabled = true;
            provideAdvice(rating);
        }
    }

    submitBtn.addEventListener('click', handleUserResponse);

    document.querySelectorAll('form[action="register.php"], form[action="login.php"]').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const action = event.target.querySelector('input[type="submit"]').name;
            if (action === "signUp") {
                handleRegister(formData);
            } else if (action === "signIn") {
                handleLogin(formData);
            }
        });
    });

    function provideAdvice(rating) {
        let advice;
        let emojis;

        switch (rating) {
            case "good":
                advice = "That's great! Keep up the positive mood! Try to engage in activities that make you happy 😊.";
                emojis = "🌟👍";
                break;
            case "normal":
                advice = "It's okay to feel this way sometimes. Make sure to take care of yourself and talk to friends or family if you need support.";
                emojis = "💬🙂";
                break;
            case "bad":
                advice = "Feeling anxious? It's important to take care of your mental health. Consider talking to a therapist or psychologist for support.";
                emojis = "🧘‍♂️💬";
                break;
            case "worst":
                advice = "Feeling angry? It's okay to seek help. Consider consulting with a mental health professional to learn coping strategies.";
                emojis = "🩺💡";
                break;
            default:
                advice = "Remember, it's okay not to be okay. Seeking support from friends, family, or professionals can help.";
                emojis = "🤗💖";
                break;
        }

        const adviceContainer = document.createElement('div');
        adviceContainer.classList.add('advice');
        adviceContainer.textContent = advice + ' ' + emojis;
        chatMessages.appendChild(adviceContainer);
    }

    function handleRegister(formData) {
        const username = formData.get('fName') + ' ' + formData.get('lName');
        const email = formData.get('email');
        const password = formData.get('password');
    
        if (username && email && password) {
            users.push({ username, email, password });
            alert("Registration successful! Please login.");
            signUpForm.style.display = "none";
            signInForm.style.display = "block";
        } else {
            alert("Please fill in all fields.");
        }
    }
    
    function handleLogin(formData) {
        const email = formData.get('email');
        const password = formData.get('password');
    
        const user = users.find(user => user.email === email && user.password === password);
    
        if (user) {
            signInForm.style.display = "none";
            chatContainer.style.display = "block";
            askQuestion();
            welcomeMessage.textContent = `Welcome to Psychological Chatbot, ${user.username}!`;
        } else {
            alert("Invalid email or password. Please try again.");
        }
    }
    
    function showRegister() {
        loginContainer.style.display = "none";
        registerContainer.style.display = "block";
    }
    
    function showLogin() {
        registerContainer.style.display = "none";
        loginContainer.style.display = "block";
    }
    
});

