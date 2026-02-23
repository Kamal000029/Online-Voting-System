let voteStore = JSON.parse(localStorage.getItem('election_2026')) || { "Modi": 0, "Rahul": 0, "Kejriwal": 0 };
let voterList = JSON.parse(localStorage.getItem('voted_ids')) || [];

function validateVoter() {
    const idInput = document.getElementById('voter-id').value.trim();
    const btns = document.querySelectorAll('.vote-btn');
    const error = document.getElementById('error-msg');

    if (voterList.includes(idInput)) {
        error.style.display = "block";
        btns.forEach(b => b.disabled = true);
    } else if (idInput.length > 3) {
        error.style.display = "none";
        btns.forEach(b => b.disabled = false);
    } else {
        btns.forEach(b => b.disabled = true);
    }
}

function submitVote(name) {
    const id = document.getElementById('voter-id').value.trim();

    voteStore[name]++;
    voterList.push(id);

    localStorage.setItem('election_2026', JSON.stringify(voteStore));
    localStorage.setItem('voted_ids', JSON.stringify(voterList));

    alert(`Dhanyawad! Aapne ${name} ko vote diya.`);
    document.getElementById('voter-id').value = "";
    validateVoter();
    renderResults();
}

function renderResults() {
    const statsArea = document.getElementById('live-stats');
    const total = Object.values(voteStore).reduce((a, b) => a + b, 0);

    let html = "";
    for (let name in voteStore) {
        let pct = total > 0 ? Math.round((voteStore[name] / total) * 100) : 0;
        html += `
                <div class="progress-wrapper">
                    <div class="progress-info">
                        <span>${name}</span>
                        <span>${voteStore[name]} Votes (${pct}%)</span>
                    </div>
                    <div class="bar-outer">
                        <div class="bar-inner" style="width: ${pct}%"></div>
                    </div>
                </div>
            `;
    }
    statsArea.innerHTML = html;
}

renderResults();