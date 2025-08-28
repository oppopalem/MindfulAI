document.addEventListener('DOMContentLoaded', function() {
    const noteEditor = document.getElementById('noteEditor');
    const noteListContainer = document.querySelector('.note-list');
    const newNoteBtn = document.querySelector('.new-note-btn');
    const discardBtn = document.querySelector('.discard-btn');
    const saveBtn = document.querySelector('.save-btn');

    let currentNoteId = null;

    // Fungsi untuk memuat semua catatan dari Local Storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        // Hapus semua elemen catatan yang ada (kecuali tombol "+ Catatan Baru")
        const existingNotes = document.querySelectorAll('.note-item:not(.new-note-btn)');
        existingNotes.forEach(item => item.remove());
        
        // Buat dan sisipkan elemen catatan baru
        notes.forEach(note => {
            const noteItem = createNoteItem(note);
            noteListContainer.insertBefore(noteItem, newNoteBtn);
        });
        
        // Aktifkan catatan terakhir jika ada
        if (notes.length > 0) {
            activateNote(notes[0].id);
        } else {
            noteEditor.value = '';
            currentNoteId = null;
        }
    }

    // Fungsi untuk membuat elemen HTML catatan
    function createNoteItem(note) {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.setAttribute('data-id', note.id);
        
        const noteTitle = document.createElement('p');
        noteTitle.classList.add('note-title');
        noteTitle.textContent = note.title.length > 20 ? note.title.substring(0, 20) + '...' : note.title || 'Catatan Baru';
        
        const noteDate = document.createElement('small');
        noteDate.classList.add('note-date');
        noteDate.textContent = new Date(note.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        
        noteItem.appendChild(noteTitle);
        noteItem.appendChild(noteDate);
        
        noteItem.addEventListener('click', () => {
            if (noteEditor.value.trim() !== '' && currentNoteId !== note.id) {
                if (!confirm('Catatan belum disimpan. Apakah Anda yakin ingin beralih?')) {
                    return;
                }
            }
            activateNote(note.id);
        });

        return noteItem;
    }
    
    // Fungsi untuk mengaktifkan catatan dan memuat isinya ke editor
    function activateNote(noteId) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const note = notes.find(n => n.id === noteId);

        if (note) {
            currentNoteId = note.id;
            noteEditor.value = note.content;

            document.querySelectorAll('.note-item').forEach(item => {
                item.classList.remove('active');
            });
            const activeNoteElement = document.querySelector(`[data-id="${noteId}"]`);
            if (activeNoteElement) {
                activeNoteElement.classList.add('active');
            }
        }
    }

    // Event listener untuk tombol "Simpan"
    saveBtn.addEventListener('click', () => {
        const content = noteEditor.value.trim();
        if (content === '') {
            alert('Catatan tidak boleh kosong!');
            return;
        }

        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        
        let noteTitle = content.split('\n')[0].substring(0, 50).trim() || 'Catatan Tanpa Judul';
        if (noteTitle.length > 50) {
            noteTitle = noteTitle.substring(0, 50) + '...';
        }

        if (currentNoteId) {
            const noteToUpdate = notes.find(n => n.id === currentNoteId);
            if (noteToUpdate) {
                noteToUpdate.title = noteTitle;
                noteToUpdate.content = content;
                noteToUpdate.date = new Date().toISOString();
            }
        } else {
            const newNote = {
                id: Date.now().toString(),
                title: noteTitle,
                content: content,
                date: new Date().toISOString()
            };
            notes.unshift(newNote); // Tambahkan di awal agar muncul paling atas
            currentNoteId = newNote.id;
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        alert('Catatan berhasil disimpan!');
    });

    // Event listener untuk tombol "Catatan Baru"
    newNoteBtn.addEventListener('click', () => {
        if (noteEditor.value.trim() !== '' && currentNoteId !== null) {
            if (!confirm('Catatan belum disimpan. Apakah Anda yakin ingin membuat catatan baru?')) {
                return;
            }
        }
        currentNoteId = null;
        noteEditor.value = '';
        noteEditor.focus();
        document.querySelectorAll('.note-item').forEach(item => {
            item.classList.remove('active');
        });
    });

    // Event listener untuk tombol "Buang"
    discardBtn.addEventListener('click', () => {
        if (noteEditor.value.trim() !== '') {
            if (confirm('Yakin ingin membuang catatan ini? Perubahan tidak akan disimpan.')) {
                if (currentNoteId) {
                    const notes = JSON.parse(localStorage.getItem('notes')) || [];
                    const updatedNotes = notes.filter(n => n.id !== currentNoteId);
                    localStorage.setItem('notes', JSON.stringify(updatedNotes));
                }
                currentNoteId = null;
                noteEditor.value = '';
                loadNotes();
                alert('Catatan berhasil dibuang.');
            }
        }
    });

    // Jalankan saat halaman pertama kali dimuat
    loadNotes();
});