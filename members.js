// ===== MEMBERS PORTAL PASSWORD PROTECTION =====

// ⚠️ IMPORTANT: Change this password to your actual password!
const MEMBERS_PASSWORD = "atlantis2026"; // CHANGE THIS!

// Check if already logged in this session
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('atlanteanMember');
    
    if (isLoggedIn === 'true') {
        showMembersContent();
    }
});

// Password form submission
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

if (passwordForm) {
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const enteredPassword = passwordInput.value;
        
        if (enteredPassword === MEMBERS_PASSWORD) {
            // Correct password
            sessionStorage.setItem('atlanteanMember', 'true');
            showMembersContent();
        } else {
            // Wrong password
            showError('Incorrect password. Please try again or contact us for access.');
            passwordInput.value = '';
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 500);
        }
    });
}

function showMembersContent() {
    const passwordGate = document.getElementById('password-gate');
    const membersContent = document.getElementById('members-content');
    
    if (passwordGate && membersContent) {
        passwordGate.style.display = 'none';
        membersContent.classList.remove('hidden');
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 4000);
}

// Add shake animation to CSS (add this to members.css)
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    .shake {
        animation: shake 0.5s;
    }
`;
document.head.appendChild(style);
