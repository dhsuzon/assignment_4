const cardContainer = document.getElementById('card-container');
    const totalJobCard = document.getElementById('total-job-count')
    const interviewDisplay = document.getElementById('interview-count');
    const rejectedDisplay = document.getElementById('rejected-count');
    const jobCounterText = document.getElementById('job-card-id');
    const tabButtons = document.querySelectorAll('.available-job-section button');

    const jobNotFoundMessage = `
                <div class="flex flex-col items-center justify-center w-full sm:py-20 text-center">
                    <img src="./image/jobs.png" alt="Not Found" class="w-40 mb-4 opacity-50">
                    <h2 class="text-2xl font-semibold text-[#002C5C] mt-5">No Jobs Available</h2>
                    <p class="font-normal text-[#64748B] text-base mt-1">Check back soon for new job opportunities</p>
                </div>`;

    let currentFilter = 'ALL';

    function updateDashboard() {
        const allCards = document.querySelectorAll('#card-container .card');
        const totalJobs = allCards.length;

    
        if (totalJobs === 0) {
            tabButtons.forEach(b => {
                b.style.backgroundColor = ''; 
                b.classList.remove('text-white', 'bg-[#3B82F6]');
                b.classList.add('text-[#64748B]');
            });
            
            cardContainer.innerHTML = jobNotFoundMessage;
            totalJobCard.innerText = 0;
            interviewDisplay.innerText = 0;
            rejectedDisplay.innerText = 0;
            jobCounterText.innerText = "0 jobs";
            return;
        }

        let interviewCount = 0;
        let rejectedCount = 0;

        allCards.forEach(card => {
            const statusBtn = card.querySelector('.card-body > button:not(.btn-outline, .delete-btn)');
            const status = statusBtn ? statusBtn.innerText.trim().toUpperCase() : '';

            if (status === 'INTERVIEW') interviewCount++;
            if (status === 'REJECTED') rejectedCount++;

            if (currentFilter === 'ALL' || status === currentFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

       
        const existingMsg = document.getElementById('no-data-msg');
        const isInterviewEmpty = currentFilter === 'INTERVIEW' && interviewCount === 0;
        const isRejectedEmpty = currentFilter === 'REJECTED' && rejectedCount === 0;

        if (isInterviewEmpty || isRejectedEmpty) {
            if (!existingMsg) {
                const noDataDiv = document.createElement('div');
                noDataDiv.id = 'no-data-msg';
                noDataDiv.className = "flex flex-col items-center justify-center w-full sm:py-20 text-center";
                noDataDiv.innerHTML = jobNotFoundMessage;
                cardContainer.appendChild(noDataDiv);
            }
        } else if (existingMsg) {
            existingMsg.remove();
        }

        interviewDisplay.innerText = interviewCount;
        rejectedDisplay.innerText = rejectedCount;
        totalJobCard.innerText = totalJobs;

        if (currentFilter === "ALL") {
            jobCounterText.innerText = ` ${totalJobs} jobs`;
        } else if (currentFilter === "INTERVIEW") {
            jobCounterText.innerText = `${interviewCount} of ${totalJobs} jobs`;
        } else if (currentFilter === "REJECTED") {
            jobCounterText.innerText = `${rejectedCount} of ${totalJobs} jobs`;
        };
    }

    cardContainer.addEventListener('click', function (e) {
        const target = e.target;
        const card = target.closest('.card');
        if (!card) return;

       
        if (target.closest('.delete-btn') || target.classList.contains('fa-trash-can')) {
            card.remove();
            updateDashboard();
            return;
        }

        const statusBtn = card.querySelector('.card-body > button:not(.btn-outline, .delete-btn)');
        if (!statusBtn) return;
        const btnText = target.innerText.trim().toLowerCase();

        if (btnText === 'interview') {
            statusBtn.innerText = 'INTERVIEW';
            statusBtn.className = "font-medium text-sm text-white bg-[#10B981] px-3 py-2 uppercase w-28 text-nowrap rounded-[0.25rem]";
            updateDashboard();
        }

        if (btnText === 'rejected') {
            statusBtn.innerText = 'REJECTED';
            statusBtn.className = "font-medium text-sm text-white bg-[#EF4444] px-3 py-2 uppercase w-28 text-nowrap rounded-[0.25rem]";
            updateDashboard();
        }
    });

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            if (document.querySelectorAll('#card-container .card').length === 0) return;

            tabButtons.forEach(b => {
                b.style.backgroundColor = ''; 
                b.classList.remove('text-white', 'bg-[#002C5C]', 'bg-[#3B82F6]');
                b.classList.add('text-[#64748B]');
            });

            this.style.backgroundColor = '#3B82F6';
            this.classList.remove('text-[#64748B]');
            this.classList.add('text-white');

            currentFilter = this.innerText.trim().toUpperCase();
            updateDashboard();
        });
    });

    window.addEventListener('DOMContentLoaded', () => {
        tabButtons.forEach(btn => {
            if (btn.innerText.trim().toUpperCase() === 'ALL') {
                btn.style.backgroundColor = '#3B82F6';
                btn.classList.add('text-white');
                btn.classList.remove('text-[#64748B]');
            } else {
                btn.classList.add('text-[#64748B]');
            }
        });
        updateDashboard();
    });