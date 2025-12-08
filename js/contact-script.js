// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    // validasi form
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // get form element
        const nama = document.getElementById('nama');
        const email = document.getElementById('email');
        const pesan = document.getElementById('pesan');
        
        // reset validasi yang sbelumnya
        resetValidation();
        
        // validasi bagian form
        let isValid = true;
        
        // validasi nama
        if (!nama.value.trim()) {
            showError('nama', 'Nama tidak boleh kosong');
            isValid = false;
        } else if (nama.value.trim().length < 2) {
            showError('nama', 'Nama minimal 2 karakter');
            isValid = false;
        } else {
            showSuccess('nama');
        }
        
        // validasi email
        if (!email.value.trim()) {
            showError('email', 'Email tidak boleh kosong');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError('email', 'Format email tidak valid');
            isValid = false;
        } else {
            showSuccess('email');
        }
        
        // Validate pesan
        if (!pesan.value.trim()) {
            showError('pesan', 'Pesan tidak boleh kosong');
            isValid = false;
        } else if (pesan.value.trim().length < 10) {
            showError('pesan', 'Pesan minimal 10 karakter');
            isValid = false;
        } else {
            showSuccess('pesan');
        }
        
        // fungsi jika isi form valid maka dapat di submit
        if (isValid) {
            submitForm();
        }
    });
    
    // validasi realtime
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // clear peringatan error waktu user mengetik
            if (this.classList.contains('error')) {
                clearError(this.id);
            }
        });
    });
    
    // validasi fungsi
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        switch (fieldId) {
            case 'nama':
                if (!value) {
                    showError(fieldId, 'Nama tidak boleh kosong');
                } else if (value.length < 2) {
                    showError(fieldId, 'Nama minimal 2 karakter');
                } else {
                    showSuccess(fieldId);
                }
                break;
                
            case 'email':
                if (!value) {
                    showError(fieldId, 'Email tidak boleh kosong');
                } else if (!isValidEmail(value)) {
                    showError(fieldId, 'Format email tidak valid');
                } else {
                    showSuccess(fieldId);
                }
                break;
                
            case 'pesan':
                if (!value) {
                    showError(fieldId, 'Pesan tidak boleh kosong');
                } else if (value.length < 10) {
                    showError(fieldId, 'Pesan minimal 10 karakter');
                } else {
                    showSuccess(fieldId);
                }
                break;
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        field.classList.add('error');
        field.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function showSuccess(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.classList.remove('show');
    }
    
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        field.classList.remove('error');
        errorElement.classList.remove('show');
    }
    
    function resetValidation() {
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const errorElement = group.querySelector('.error-message');
            
            if (input) {
                input.classList.remove('error', 'success');
            }
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
    }
    
    // form pengiriman
    function submitForm() {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        // menampilkan status loading
        submitBtn.classList.add('loading');
        btnText.textContent = 'Mengirim...';
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Reset button
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Kirim Pesan';
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            contactForm.reset();
            resetValidation();
            
        }, 2000);
    }
    
    // fungsi modal
    function showSuccessModal() {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // tambah animasi
        const modalContent = successModal.querySelector('.modal-content');
        modalContent.style.animation = 'modalSlideIn 0.3s ease-out';
    }
    
    function closeModal() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Make closeModal function global
    window.closeModal = closeModal;
    
    // tambah efek label mengambang
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check if input has value on page load
            if (input.value.trim()) {
                label.classList.add('active');
            }
            
            input.addEventListener('focus', function() {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    label.classList.remove('active');
                }
            });
        }
    });
    
    // tambah penghitung karakter untuk bagian pesan
    const pesanTextarea = document.getElementById('pesan');
    if (pesanTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = '0/500';
        pesanTextarea.parentNode.appendChild(counter);
        
        pesanTextarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length}/500`;
            
            if (length > 450) {
                counter.style.color = '#e74c3c';
            } else if (length > 400) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#666';
            }
        });
    }
    
    // tambah css untuk label mengambang
    const style = document.createElement('style');
    style.textContent = `
        .form-group {
            position: relative;
        }
        
        .form-group label {
            position: absolute;
            top: 1rem;
            left: 1rem;
            color: #999;
            transition: all 0.3s ease;
            pointer-events: none;
            background: white;
            padding: 0 0.5rem;
        }
        
        .form-group label.active {
            top: -0.5rem;
            font-size: 0.8rem;
            color: #667eea;
        }
        
        .form-group input:focus + label,
        .form-group textarea:focus + label {
            top: -0.5rem;
            font-size: 0.8rem;
            color: #667eea;
        }
        
        .char-counter {
            text-align: right;
            font-size: 0.8rem;
            color: #666;
            margin-top: 0.5rem;
        }
        
        .form-group input,
        .form-group textarea {
            padding-top: 1.5rem;
        }
    `;
    document.head.appendChild(style);
}); 